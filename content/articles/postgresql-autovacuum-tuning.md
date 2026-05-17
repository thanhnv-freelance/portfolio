---
title: "PostgreSQL Autovacuum: The Hidden Bottleneck in High-Churn Tables"
slug: postgresql-autovacuum-tuning
date: 2026-05-14
tags: [postgresql, performance, database, backend]
summary: "The default autovacuum configuration works fine for small tables. For tables with millions of rows and frequent updates, it silently accumulates dead rows until query performance collapses. Here's what I learned diagnosing a production incident on a 9M-row table."
---

## The Situation

A `transaction` table with ~9.6 million rows and ~12 GB of data (including audit) started showing performance degradation during high-concurrency callback processing. Queries that used to complete in under 100ms were taking 3–4 seconds. The table had indexes. The queries looked correct. PostgreSQL just got slow.

The investigation revealed the root causes were **not** missing indexes. They were autovacuum misconfiguration and redundant indexes causing write amplification. This post covers the autovacuum lessons.

---

## Lesson 1 — The Default Scale Factor Is Too Conservative for Large Tables

PostgreSQL's global default is:

```
autovacuum_vacuum_scale_factor = 0.2  (20%)
autovacuum_vacuum_threshold    = 50   (rows)
```

Vacuum triggers when: `dead_rows > (live_rows × scale_factor) + threshold`

For a small 10,000-row table, this triggers at 2,000 dead rows — reasonable. But for a 9.6M-row table:

```
trigger point = (9,614,094 × 0.2) + 50 = 1,922,869 dead rows
```

Nearly **2 million dead rows** before cleanup runs. In practice, our table was sitting at ~800,000 dead rows for over 75 days — clearly degraded, but never crossing the threshold that would trigger a vacuum.

### The Fix

Apply a per-table override to use a much tighter threshold:

```sql
ALTER TABLE payments."transaction" SET (
  autovacuum_vacuum_scale_factor = 0.02,
  autovacuum_vacuum_threshold    = 50000
);
```

This triggers vacuum at ~240,000 dead rows (2%) instead of ~1.9M (20%). For tables with millions of rows and frequent updates, this is the correct starting point.

After the autovacuum eventually ran, save time dropped from **3.5 seconds to under 1 second** — confirming dead tuple bloat was the bottleneck.

### Rule

> For tables with millions of rows and frequent UPDATE operations, the default 20% scale factor is far too conservative. Apply a per-table override of 1–2%, or use a fixed threshold.

---

## Lesson 2 — ANALYZE and VACUUM Are Independent Daemons with Independent Thresholds

This one trips up a lot of teams. We noticed `last_autoanalyze` was only 12 days old and assumed the table was healthy. But `last_autovacuum` was 75 days old.

**ANALYZE** updates the query planner's statistics. It helps PostgreSQL choose better execution plans.

**VACUUM** physically removes dead rows and reclaims page slots for HOT (Heap-Only Tuple) updates.

These are two separate background daemons with separate thresholds. A table can have fresh planner statistics but still be drowning in dead rows. And vice versa.

During the degradation window, the query planner was making decisions based on statistics that were 10+ days stale — while the table itself had been accumulating dead rows for months.

### The Fix

Always set both thresholds together when tuning a high-churn table:

```sql
ALTER TABLE payments."transaction" SET (
  autovacuum_vacuum_scale_factor   = 0.02,
  autovacuum_vacuum_threshold      = 50000,
  autovacuum_analyze_scale_factor  = 0.01,  -- often forgotten
  autovacuum_analyze_threshold     = 10000
);
```

The `autovacuum_analyze_scale_factor` defaults to **0.1 (10%)** globally — which for a 9M-row table means autoanalyze only fires after ~900,000 row changes. Setting it to 1% drops that to ~100,000.

### Rule

> Monitor `last_autovacuum` and `last_autoanalyze` separately. A recent analyze does not indicate a healthy vacuum cycle. Always configure both thresholds when tuning.

Diagnostic query:

```sql
SELECT
    relname AS table_name,
    n_live_tup   AS live_rows,
    n_dead_tup   AS dead_rows,
    ROUND(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 2) AS dead_pct,
    last_autovacuum,
    last_autoanalyze
FROM pg_stat_user_tables
WHERE n_dead_tup > 0
ORDER BY n_dead_tup DESC
LIMIT 10;
```

---

## Lesson 3 — HOT Updates Are Blocked by Indexes on Updated Columns

PostgreSQL has a feature called **HOT (Heap-Only Tuple)** updates. When a row is updated and the updated columns are not indexed, PostgreSQL can reuse the same page slot — no index maintenance required, dramatically less I/O.

HOT updates are blocked when:
- The updated column is indexed, OR
- The table page has no free space

In our case, a composite index on `(id, version)` was blocking HOT updates on every single row write, because `version` is incremented on every state transition. With 3.5 million cumulative updates, that's 3.5 million unnecessary full index tree writes.

Production evidence:

```
HOT update rate:   54%
→ 46% of 3.5M updates (~1.6M operations) performed full index maintenance
→ avg_tuples_per_scan: 151,000  (a healthy point-lookup index reads 1–2)
```

The fix: drop the index. The primary key already covered all lookups. The composite index was pure write overhead.

```sql
DROP INDEX CONCURRENTLY idx_txn_id_version;
VACUUM ANALYZE payments."transaction";
```

### Rule

> Before adding an index on a frequently updated column, check whether it will block HOT updates. If the column is modified on every state transition, the index write cost almost certainly outweighs the read benefit. Profile with `EXPLAIN ANALYZE` on the production table first.

---

## Lesson 4 — Race Conditions Between Services Are Application-Layer Problems

During the investigation we also identified a race condition: callback notifications from a payment partner were arriving before the initial transaction record had committed to the database, causing "record not found" errors.

The proposed fix was to add an index to speed up the lookup. This was the wrong diagnosis.

A faster `SELECT` on a row that doesn't exist yet still returns empty. The problem wasn't lookup speed — the row wasn't committed yet. No index resolves a write timing problem.

The correct solutions:

| Approach | Description |
|---|---|
| **Reactive retry with backoff** | Use `retryWhen` / `repeatWhenEmpty` in WebFlux with exponential backoff — waits adaptively for the record to appear |
| **Early write** | Write the lookup key to the DB immediately after receiving the partner response, before any downstream processing. The callback handler always finds the row. |
| **Atomic upsert** | `INSERT ... ON CONFLICT DO UPDATE` — whichever operation arrives first handles creation safely |

### Rule

> Race conditions between services are application-layer timing problems. Database indexes improve read performance but cannot resolve a write that hasn't committed yet. Retry with exponential backoff or rethink the write ordering.

---

## Monitoring Checklist

```sql
-- Dead row bloat per table
SELECT relname, n_live_tup, n_dead_tup,
       ROUND(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 2) AS dead_pct,
       last_autovacuum, last_autoanalyze
FROM pg_stat_user_tables
WHERE n_dead_tup > 0
ORDER BY n_dead_tup DESC;

-- Index efficiency (avg_rows_per_scan >> 1 = problem)
SELECT indexrelname, idx_scan,
       ROUND(idx_tup_read::numeric / NULLIF(idx_scan, 0), 0) AS avg_rows_per_scan
FROM pg_stat_user_indexes
ORDER BY idx_tup_read DESC;

-- Current autovacuum settings
SELECT name, setting FROM pg_settings
WHERE name LIKE '%autovacuum%' ORDER BY name;
```

---

*This post is based on a real production incident on a Spring Boot WebFlux + AWS RDS PostgreSQL stack. All company-specific identifiers have been removed.*
