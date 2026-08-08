---
title: "HOT Suppression and the Hidden Cost of Indexing @Version in R2DBC"
slug: hot-suppression-r2dbc-version-index
date: 2026-06-03
tags: [postgresql, spring-boot, r2dbc, performance, database]
summary: "The HOT update rate on a 9.4M-row payments table quietly dropped from 54% to 44.8% over 20 days. No errors, no alerts — just a composite index on the @Version column silently forcing full index maintenance on every write."
---

## The Signal

During a routine health check on `pg_stat_user_tables`, the HOT update rate on our core transaction table had dropped from **54% to 44.8%** over 20 days. Nothing was broken. No errors, no elevated latency alerts. Just a number trending quietly in the wrong direction.

HOT (Heap-Only Tuple) is a PostgreSQL optimisation that lets the engine skip index maintenance when a row update touches only non-indexed columns. A declining HOT rate means something indexed is being written on nearly every update — and in a payments system processing millions of state transitions per week, that adds up fast.

At 44.8%, over half of every 100 writes were paying the full cost of maintaining all 7 index trees on a 2,659 MB index footprint. I started investigating.

---

## Identifying the Offenders

`pg_stat_user_indexes` shows scan counts and average rows returned per scan. Two indexes stood out immediately:

| Index | Size | Lifetime scans | Avg rows/scan |
|---|---|---|---|
| Primary key | 215 MB | 24.3M | 53 |
| Partner transaction ID | 323 MB | 2.3M | 2 |
| Refund optimized | 687 MB | 236K | 924 |
| Hub transaction ID | 262 MB | 108K | 1 |
| Payment reference | 264 MB | 64K | 158 |
| **`transaction_un`** | **598 MB** | **291** | **39,882** |
| **`idx_txn_internal_transaction_id_version`** | **310 MB** | **664K** | **153,892** |

`transaction_un` had been scanned 291 times in its entire lifetime. The next least-used index had 63,769 scans. The other anomaly — `idx_txn_internal_transaction_id_version` — was heavily scanned but returning an average of 153,892 rows per scan, far from the 1–2 rows expected of a point-lookup index.

The name of the second index contained the root cause: it was a composite on `(internal_transaction_id, version)`. The `version` column.

---

## Root Cause: @Version Interacts With HOT in a Way Most Developers Don't Expect

The service layer is built on Spring WebFlux with R2DBC. To implement optimistic locking, the transaction entity uses Spring Data's `@Version` annotation:

```java
@Version
private Long version;
```

This is a common and correct pattern. The side effect is easy to miss: **R2DBC generates a full-row `UPDATE` on every `save()` call, regardless of which fields actually changed.** There is no dirty checking in Spring Data R2DBC — unlike Hibernate's `@DynamicUpdate`, there is no equivalent.

Every `save()` increments `version`. Every increment touches an indexed column. PostgreSQL cannot apply HOT if any indexed column is written.

```
Application calls save(transaction)
  → R2DBC generates: UPDATE SET col1=?, col2=?, ..., version=version+1 WHERE id=?
  → version incremented → indexed column changed
  → PostgreSQL: HOT not eligible
  → Full maintenance across all 7 index trees
```

The `confirmRemit` flow alone produces 3 database writes on the happy path, 4 when the external payment partner returns an error. With 7 indexes per write, that is 21–28 index tree operations per confirmed remittance — on a table processing hundreds of thousands of transactions per month.

---

## The Impact Over 20 Days

| Metric | 2026-05-14 | 2026-06-03 | Change |
|---|---|---|---|
| Total writes (cumulative) | 3,542,366 | 4,262,212 | +720K |
| HOT updates | ~1,913,000 | 1,909,002 | Flat |
| HOT rate | 54% | 44.8% | Worsening (~0.46 pp/day) |
| Full index writes | ~1,630,000 | ~2,353,000 | **+44%** |

Of the 720,000 new writes in that window, virtually none were HOT. Every new write paid the full 7-index maintenance cost. The system was degrading silently — the only observable signal was this one metric in `pg_stat_user_tables`.

The two problem indexes also accounted for **908 MB** — 34% of the total 2,659 MB index footprint — while delivering no meaningful query benefit. `transaction_un` was being maintained roughly 2,475 times per day while being queried approximately 15 times per day.

---

## The Fix: Two Concurrent Index Drops

Both indexes can be dropped without downtime using `DROP INDEX CONCURRENTLY` — PostgreSQL runs this in the background without acquiring a table lock:

```sql
-- Remove the unused uniqueness index
DROP INDEX CONCURRENTLY remittance.transaction_un;

-- Remove the write-amplification composite index
DROP INDEX CONCURRENTLY remittance.idx_txn_internal_transaction_id_version;

-- Reclaim space and refresh planner statistics
VACUUM ANALYZE remittance."transaction";
```

If either drop caused unexpected query plan degradation, both can be recreated with `CREATE INDEX CONCURRENTLY` — also zero-downtime. No application code changes required.

**Expected outcome:**

| Metric | Before | After |
|---|---|---|
| Index footprint | 2,659 MB | ~1,751 MB |
| Space reclaimed | — | 908 MB (34%) |
| Index trees per write | 7 | 5 |
| HOT rate | 44.8% | ~70–80% |

---

## The Longer Fix: Partial Updates

Dropping the index addresses the immediate problem — but the root pressure remains. R2DBC's full-entity `save()` writes all ~1069 bytes per row on every status transition. For a table this size and write volume, this generates significant WAL, large dead tuples on every update, and sustained autovacuum pressure.

The real fix is partial updates: write only the columns that actually changed.

```java
// Option A — @Query (explicit, simple)
@Modifying
@Query("""
    UPDATE transaction
    SET status = :status, updated_date = NOW(), version = :newVersion
    WHERE id = :id AND version = :currentVersion
    """)
Mono<Integer> updateStatus(@Param("id") UUID id,
                           @Param("status") String status,
                           @Param("currentVersion") Long currentVersion,
                           @Param("newVersion") Long newVersion);

// Option B — R2dbcEntityTemplate (programmatic, reusable)
r2dbcEntityTemplate
    .update(Transaction.class)
    .matching(query(where("id").is(id).and("version").is(currentVersion)))
    .apply(Update.update("status", status)
                 .set("updated_date", LocalDateTime.now())
                 .set("version", currentVersion + 1))
    .flatMap(rows -> rows == 0
        ? Mono.error(new OptimisticLockingFailureException("Concurrent update on " + id))
        : Mono.empty());
```

The tradeoff: `@Version` optimistic locking is no longer automatic — it must be handled manually in every partial update. A centralised `TransactionPatchService` solves this by enforcing version checks as a structural guarantee rather than a per-developer responsibility:

```java
@Component
public class TransactionPatchService {

    public Mono<Void> patch(UUID id, Long currentVersion, Consumer<Update> patchFn) {
        Update update = Update.update("updated_date", LocalDateTime.now())
                              .set("version", currentVersion + 1);
        patchFn.accept(update);

        return template
            .update(Transaction.class)
            .matching(query(where("id").is(id).and("version").is(currentVersion)))
            .apply(update)
            .flatMap(rows -> rows == 0
                ? Mono.error(new OptimisticLockingFailureException(
                    "Concurrent update detected for transaction " + id))
                : Mono.empty());
    }
}
```

Every caller passes a version — it is structurally impossible to forget:

```java
patchService.patch(txId, entity.getVersion(), u ->
    u.set("status", TRANSACTION_COMPLETED)
     .set("completed_date", LocalDateTime.now()));
```

Our team deferred this migration — the index drop alone buys time and directly addresses the HOT rate. But for a table growing toward partitioning, partial updates are the architectural direction.

---

## Lessons

**1. High scan count does not mean an index is healthy.**
`idx_txn_internal_transaction_id_version` had 664,925 lifetime scans — it looked active. But 153,892 average rows per scan reveals a range scan, not point lookups. Scan volume without selectivity is a red flag.

**2. HOT suppression compounds over time.**
Because HOT suppression affects all subsequent writes, not just the indexed column, the degradation accelerates as write volume grows. Catching it at 44.8% — rather than after the table has been partitioned — meant a simpler, lower-risk fix.

**3. `@Version` and HOT are incompatible if `version` is indexed.**
This is not a bug in R2DBC or PostgreSQL. It is the correct behaviour of both systems interacting in an unexpected way. The fix is at the index level: version columns should not be part of indexes used for lookups. The optimistic lock lives in the `WHERE` clause, not in the index.

**4. The only signal was a single metric.**
No errors, no SLA breach, no alerts. The write overhead would have continued compounding until payment callback latency degraded under peak load. Routine index audits with `pg_stat_user_indexes` surfaced the problem early.

---

*Based on a production incident in a Spring WebFlux + R2DBC + PostgreSQL remittance platform. Company-specific identifiers removed. Written with AI assistance (Claude Sonnet 4.6); all production data and technical analysis are the author's own.*
