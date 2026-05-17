---
title: "Never Use Integer for External Partner IDs"
slug: never-use-integer-for-partner-ids
date: 2026-05-07
tags: [java, api, integration, backend, fintech]
summary: "A partner API spec declared a field as 'Integer'. We implemented it as Java Integer. Months later the partner returned values beyond 2,147,483,647. A production hotfix across three repositories followed. The fix took one evening; the lesson is permanent."
---

## What Happened

A payment partner's API spec defined two fields as `Integer`:

```
quotation.id    : Integer
transaction.id  : Integer
```

Our adapter library implemented these as Java `Integer` (signed 32-bit, max: `2,147,483,647`).

In production, the partner began returning ID values exceeding the signed 32-bit integer range. Java silently overflowed or threw a deserialization exception. Transaction failures followed for affected payment corridors. A same-evening hotfix was required across three repositories.

---

## Why This Keeps Happening

### The spec was ambiguous

Modern API specs should be explicit about numeric ranges:

| Standard | How to be explicit |
|---|---|
| OpenAPI 3 | `format: int32` or `format: int64` |
| JSON Schema | `minimum` / `maximum` constraints |
| Protobuf | `int32`, `int64`, `uint64` |

`Integer` without a format qualifier is ambiguous. Our team followed the spec literally and chose `int32`. The partner was producing values beyond `2^31 - 1`. Neither side was wrong — the spec simply didn't define the range.

### Tests used small values

```java
// Insufficient — does not test boundaries
transaction.setId(123);

// What was needed
transaction.setId(BigInteger.valueOf(2_147_483_648L));  // int32 max + 1
```

Tests using `123` or `1122` cannot catch integer overflow. There were no test cases at or beyond `Integer.MAX_VALUE`.

### The type was defined in a shared library

Because the type lived in a shared adapter library, one wrong assumption required a coordinated hotfix across all consumers:

```
partner-adapter-lib   ← type definition
    ↓
fx-service            ← uses QuoteResponse.id
payments-service      ← uses TransactionResponse.id in mapper + submit flow
```

---

## The Hotfix

### Change 1 — adapter library: `Integer` → `BigInteger`

```java
// Before
Integer id;

// After
BigInteger id;
```

### Change 2 — consumer services: null-safety audit

The type change exposed a secondary bug. `Integer` auto-unboxed to `int` would throw `NullPointerException` early if null — easy to catch. `BigInteger` is always an object, so `.toString()` on a null `BigInteger` also throws `NullPointerException` but looks safe at a glance.

Every call site that converted the ID to a string had to be audited:

```java
// Unsafe — throws NPE if BigInteger id is null
return num.toString();
.map(Object::toString)

// Safe
return num == null ? null : num.toString();
.map(String::valueOf)
```

---

## The Lessons

### Lesson 1 — Use `String` for all external partner IDs

Identifiers returned by external APIs should be stored and passed as `String`, not as numeric types — even when the current values look numeric.

```java
// Fragile — creates a dependency on the partner's current ID range
Integer quotationId;
Long    quotationId;
BigInteger quotationId;

// Robust — no overflow, no precision loss, survives format changes
String quotationId;
```

Why `String` is always right:
- Today the value is numeric. Tomorrow it may become a UUID, an alphanumeric reference, or a 128-bit snowflake.
- Numeric types impose range constraints the partner never agreed to.
- `String` has no overflow, no precision loss, no deserialization edge cases.

> **Rule:** All external partner transaction IDs, quotation IDs, and payment references should be `String` in both adapter DTOs and internal models.

---

### Lesson 2 — Validate spec ambiguity during partner onboarding

When a vendor spec declares a field as `Integer` without an explicit format, **do not assume int32**. Raise the ambiguity formally before implementation.

Partner onboarding checklist for numeric fields:

- [ ] Is the numeric range explicitly documented (`int32` / `int64`)?
- [ ] Have we seen real production sample payloads with large values?
- [ ] Can this ID ever exceed `2,147,483,647` (int32 max)?
- [ ] Should this ID be treated as an opaque string?

If the spec is ambiguous: **request written clarification from the vendor**. This shifts accountability and protects the team if an incident occurs later.

---

### Lesson 3 — Add boundary test cases for all external numeric fields

```java
// For every numeric ID field from an external partner:
@Test
void shouldHandleInt32Overflow() {
    // int32 max + 1
    transaction.setId(BigInteger.valueOf(2_147_483_648L));
    assertThat(mapper.toInternal(transaction).getPartnerId())
        .isEqualTo("2147483648");
}

@Test
void shouldHandleLargeIds() {
    transaction.setId(new BigInteger("99999999999999999999"));
    assertThat(mapper.toInternal(transaction).getPartnerId())
        .isEqualTo("99999999999999999999");
}
```

> **Rule:** Every external numeric ID field must have at least one test case with a value exceeding `Integer.MAX_VALUE`.

---

### Lesson 4 — Type changes in shared libraries require null-safety audit in consumers

When a field type changes from `Integer` to `BigInteger` in a shared library:

- `Integer` auto-unboxed to `int` throws `NullPointerException` early and visibly — easy to catch in tests
- `BigInteger` is always an object — `.toString()` on null also throws `NullPointerException`, but looks safe and may be missed

Any shared library upgrade that changes field types must include a null-safety audit of all downstream call sites on the changed field.

---

### Lesson 5 — Isolate partner DTOs from internal models

The cascading change across three repositories happened because the partner model type was tightly coupled to the internal business flow. A proper adapter layer contains the blast radius:

```
Partner API Response (Integer id)
    ↓
Adapter Layer  ← only code that knows partner types; normalizes here
    ↓  map to String
Internal Canonical Model (String quotationId)
    ↓
Business Services (fx-service, payments-service)
```

If the internal canonical model had used `String quotationId` from the start, only the adapter layer would have needed a change. The two downstream services would have been untouched.

---

## Summary

| Standard | Applies to |
|---|---|
| External partner IDs → `String` | All partner integrations |
| Boundary test cases for numeric fields | All adapter library tests |
| Null-safety audit on type changes | All shared library upgrades |
| Written clarification for ambiguous specs | Partner onboarding process |
| Canonical internal model separate from partner DTO | All partner adapters |

---

*Based on a production hotfix in a Spring Boot microservices payment platform. Partner and company identifiers removed.*
