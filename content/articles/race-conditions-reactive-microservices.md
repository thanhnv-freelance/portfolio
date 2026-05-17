---
title: "Race Conditions in Reactive Microservices: Beyond the Sleep Workaround"
slug: race-conditions-reactive-microservices
date: 2026-05-14
tags: [java, spring-boot, webflux, microservices, architecture]
summary: "A hard-coded sleep in a Lambda callback handler masking a timing race between a DB write and an external notification. Three ways to actually fix it — and why adding a database index doesn't help."
---

## The Symptom

After a payment submission succeeds, the partner fires a callback notification almost immediately. The backend's callback handler throws an exception because it can't find the transaction record. The workaround in the notification handler:

```python
DELAY_SECONDS = 4

if notification_type in {"BIS018", "BIS007"}:
    time.sleep(DELAY_SECONDS)
```

This masks the problem but doesn't fix it. Under load — when the database is busy with concurrent writes — the write takes longer than 4 seconds and the race fires again.

---

## The Exact Race

```
[Backend async thread]                         [External partner]

callSubmitPayment(request)
  │                                            Partner processes payment
  │◄──── response with transaction ID ─────── Partner returns reference ID
  │
  ▼
handleSubmitSuccess()
  → entity.setPartnerTransactionId(...)
  → entity.setStatus(COMPLETED)
  → repository.save(entity)   ← DB write in progress  Partner fires callback immediately
                                                         │
                                                         ▼
                                                  notification-handler receives callback
                                                  time.sleep(4s)      ← workaround
                                                         │
                                                         ▼
                                                  call handleCallback(partnerTxnId)
                                                  findByPartnerTransactionId(id)
                                                         │
                              DB write still running ───►  ROW NOT FOUND → exception
```

**The critical insight:** the partner fires its callback the moment *their* processing completes — which is the same moment your backend begins writing the partner's transaction ID to the database. The 4-second sleep is a bet that your DB write finishes within 4 seconds, which is not guaranteed under load.

---

## Why a Database Index Doesn't Help

The proposed fix in this case was to add an index on `partner_transaction_id` to speed up the lookup. This is the wrong diagnosis.

A database index improves `SELECT` performance when the row exists. The race condition is a **write timing problem** — the row doesn't exist yet when the callback arrives.

| | Index | Race Condition |
|---|---|---|
| What it solves | Slow `SELECT` when row exists | Row not yet committed when `SELECT` runs |
| Effect here | None — faster lookup on a missing row still returns empty | Requires the write to complete before the read |

Adding an index on `partner_transaction_id` is a valid general performance improvement — but it is a completely separate concern from this issue. The exception is thrown not because the lookup is slow, but because the row isn't there.

---

## Three Actual Solutions

### Option 1 — Retry with backoff in the callback handler (backend)

Add `repeatWhenEmpty` inside `handleCallback` so it waits adaptively until the record appears, instead of failing immediately:

```java
// Before — fails immediately if row not found
transactionRepository.findByPartnerTransactionId(request.getTransactionId())
    .switchIfEmpty(Mono.error(new NotFoundException(...)));

// After — retries with incremental backoff
transactionRepository.findByPartnerTransactionId(request.getTransactionId())
    .repeatWhenEmpty(flux -> flux
        .zipWith(Flux.range(1, 5))
        .flatMap(t -> Mono.delay(Duration.ofSeconds(t.getT2())))
    )
    .switchIfEmpty(Mono.error(new NotFoundException(...)));
```

The retry stops the moment the row appears. No fixed sleep anywhere. The Lambda handler can be simplified to a single call with no delay.

| | |
|---|---|
| Fixes root cause | Partially — tolerates the race |
| Lambda change needed | Remove the sleep |
| Risk | Holds a reactive subscription during retry; needs a timeout cap |

---

### Option 2 — Save the lookup key before processing (root-cause fix)

The race exists because the partner's transaction ID is written inside `handleSubmitSuccess` — the same operation that competes with the callback. If you write just the lookup key to the DB immediately after receiving the partner's response (before any status update), the callback handler always finds the row:

```
callSubmitPayment(request)
  │◄──── response with partnerTransactionId ──── Partner returns ID
  │
  ▼
savePartnerTransactionId(entity)  ← minimal write, blocking, completes fast
  │
  ▼
handleSubmitSuccess()             ← full status update, can be async
  → entity.setStatus(COMPLETED)
  → repository.save(entity)
```

The callback handler finds the record immediately. `handleCallback` needs to handle the case where status is still `PENDING` — either wait, return `200` without processing, or return `202 Accepted`.

| | |
|---|---|
| Fixes root cause | Yes — eliminates the race |
| Lambda sleep needed | No |
| Extra DB writes | One additional minimal write per submission |
| Complexity | Callback handler must tolerate intermediate status |

---

### Option 3 — Replace fixed sleep with retry loop in the notification handler

A lower-risk immediate fix: replace `time.sleep(4)` with a retry loop that calls the backend immediately and retries on `404`:

```python
MAX_RETRIES = 5
BACKOFF_SECONDS = [1, 2, 3, 4, 5]

for attempt in range(MAX_RETRIES):
    response = call_backend_callback_api(callback_data)
    if response.status_code == 404:
        time.sleep(BACKOFF_SECONDS[attempt])
        continue
    break
```

**Requires**: the backend to return `404` specifically when the transaction is not found, rather than `500`. If the backend conflates "not found" with "internal error", the retry loop can't distinguish them.

| | |
|---|---|
| Eliminates fixed delay | Yes — only waits when actually needed |
| Backend change needed | Must distinguish 404 from 500 |
| Risk | Partner callback has a response timeout — retries must complete within it |

---

## Recommended Phasing

**Immediate**: Implement Option 3 in the notification handler — remove the fixed sleep, add retry-on-404. Also ensure the backend returns `404` for "not found" vs `500` for real errors.

**Short-term**: Implement Option 1 in `handleCallback` — move retry logic to the backend. The notification handler becomes a simple forwarding call with no retry logic.

**Long-term**: Implement Option 2 — write the partner transaction ID as a separate early commit. This eliminates the race entirely and makes both the notification handler and the callback handler simple again.

---

## Broader Pattern: Application-Layer Timing Problems

Race conditions between services are not database problems. They're timing problems that require application-layer solutions:

| Pattern | When to use |
|---|---|
| Retry with exponential backoff | The race window is short; you can afford to retry |
| Early write of lookup key | You control the write ordering on the originating side |
| Idempotent upsert | `INSERT ... ON CONFLICT DO UPDATE` — safe regardless of which operation arrives first |
| Optimistic locking + retry | Concurrent updates on the same row; catch `OptimisticLockingFailureException` and reload |

Adding a database index to solve a write timing problem is category confusion. Indexes help reads. Write ordering is an architectural decision.

---

*Based on a production incident in a Spring Boot WebFlux + AWS Lambda callback architecture. Company-specific identifiers removed.*
