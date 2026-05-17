---
title: "When Adding an Index Makes Things Worse: Write Amplification in PostgreSQL"
slug: index-write-amplification
date: 2026-05-14
tags: [postgresql, performance, database, indexing]
summary: "Not all indexes help. A production investigation found that a 1 GB index on a 9.6M-row table had been maintained on every write for years — used only 166 times in total. Here's how to identify and eliminate write amplification from redundant indexes."
---

## The Case Against Adding More Indexes

When a PostgreSQL table slows down, the instinct is to add indexes. Often this is correct. Sometimes it's the exact opposite of what's needed.

During a production incident on a high-volume transaction table (~9.6M rows, ~3.5M cumulative updates), we found two indexes that were actively hurting performance:

1. A **1 GB index** that had been used 166 times in its entire lifetime (0.6 scans/day)
2. A **308 MB composite index** that averaged 151,000 rows per scan — a range scan pattern on what should be a point lookup

Together they consumed **1.37 GB (39%)** of the table's total index space and were blocking PostgreSQL's HOT (Heap-Only Tuple) update optimization on every single write.

---

## How PostgreSQL Indexes Affect Write Performance

Every B-Tree index on a table imposes a cost on every `INSERT` and `UPDATE`:

- **INSERT**: A new entry must be written into every index tree
- **UPDATE**: If any indexed column changes, its index entry is deleted and reinserted
- **HOT Update blocked**: When an indexed column is updated, PostgreSQL cannot reuse the existing page slot — it must write a new physical row and update every index that covers the changed column

For a table with 7 indexes and 3.5 million updates, each of those updates was touching up to 7 index trees. The production HOT update rate was **54%** — meaning 46% of all updates (~1.6 million operations) performed full index maintenance across all index trees.

---

## Case 1: The Unused 1 GB Index

Production stats from `pg_stat_user_indexes`:

```
index:          transaction_un
size:           1,068 MB   ← 4× the size of the primary key
idx_scan:       166        ← total lifetime scans
idx_scan/day:   ~0.6
avg_rows/scan:  32,355     ← not a point lookup; effectively a full index scan
```

This index had been maintained on every INSERT and every UPDATE since the table was created — **for 166 total queries**.

Dropping it: zero downtime with `CONCURRENTLY`, 1 GB of index space freed, every future write touches one fewer index tree.

```sql
-- Verify before dropping
SELECT indexrelname, idx_scan, idx_tup_read,
       ROUND(idx_tup_read::numeric / NULLIF(idx_scan, 0), 0) AS avg_rows_per_scan
FROM pg_stat_user_indexes
WHERE indexrelname = 'transaction_un';

-- Drop without locking writes
DROP INDEX CONCURRENTLY transaction_un;
```

---

## Case 2: The HOT-Killing Composite Index

The second index was on `(id, version)`:

```
index:          idx_txn_id_version
size:           308 MB
idx_scan:       361,725
avg_rows/scan:  151,331   ← should be 1–2 for a point lookup on a PK
```

Two problems with this index:

**Problem 1 — The primary key already covers `id` lookups.**

`id` is the primary key. PostgreSQL already performs O(log N) lookups using it. A composite index whose leading column is the primary key provides no selective benefit for point lookups — all it does is add a second index tree to maintain.

**Problem 2 — `version` is incremented on every state transition.**

Because `version` is indexed and updated on every callback and status change, every such write blocks HOT updates. PostgreSQL cannot reuse the existing page slot — it must allocate a new physical row and update both the primary key index and this composite index. At 3.5 million cumulative updates, that's 3.5 million extra index writes that didn't need to happen.

Dropping it and running `VACUUM ANALYZE` immediately after:

```sql
DROP INDEX CONCURRENTLY idx_txn_id_version;
VACUUM ANALYZE payments."transaction";
```

Expected effect: HOT rate rises from 54% to ~70–80%.

---

## How to Identify Problematic Indexes

The `pg_stat_user_indexes` view is the right tool:

```sql
SELECT
    indexrelname,
    pg_size_pretty(pg_relation_size(indexrelid)) AS size,
    idx_scan,
    idx_tup_read,
    CASE
        WHEN idx_scan = 0 THEN 'UNUSED'
        WHEN idx_tup_read / NULLIF(idx_scan, 0) > 10000 THEN 'RANGE SCAN — LOW SELECTIVITY'
        ELSE 'OK'
    END AS health
FROM pg_stat_user_indexes
WHERE schemaname = 'payments'
ORDER BY pg_relation_size(indexrelid) DESC;
```

**Warning signs:**

| Signal | Meaning |
|---|---|
| `idx_scan = 0` | Index has never been used — pure write overhead |
| `avg_rows_per_scan > 1000` | Index is used for range scans, not point lookups — may not be helping |
| Leading column is already the PK | Composite index provides no additional selectivity |
| Indexed column is updated on every write | HOT updates are blocked; write amplification guaranteed |

---

## The Wrong Response: More Indexes on Top

The team had run automation tests against a temporary table populated with dummy data, which suggested adding 3 new indexes. This methodology has fundamental flaws:

1. **Dummy data doesn't replicate production skew.** The planner makes different choices for uniformly distributed test data vs. production data clustered in a few status values.
2. **Sequential tests can't show write amplification.** Write amplification manifests under concurrent load — multiple callbacks arriving simultaneously and racing to update the same rows.
3. **Temp tables start with zero bloat.** The production issue was caused by 75 days of accumulated dead rows. A fresh temp table cannot reproduce this.

Adding 3 more indexes on top of existing write amplification would have increased index maintenance on every callback write. On top of that, if the table were partitioned, all indexes would replicate across partitions — a 12-partition table with the 1 GB unused index would carry **12 GB of dead index maintenance overhead**.

### The Correct Approach

Before proposing any index change, produce evidence from the **production system**:

1. Identify slow queries via `pg_stat_statements`
2. Run `EXPLAIN (ANALYZE, BUFFERS)` on the actual production query against the actual table
3. Check `pg_stat_user_indexes` — confirm no existing index already covers the query
4. Confirm the indexed column is **not** a high-churn UPDATE target
5. If a load test is needed, use a production data snapshot under concurrent load — not sequential automation against dummy data

---

## Summary

| Action | Outcome |
|---|---|
| Drop unused 1 GB index | 1,068 MB freed; no query impact (0.6 scans/day) |
| Drop composite index on (id, version) | 308 MB freed; HOT rate rises from 54% to ~70–80% |
| Combined | 1,376 MB (39%) of index space reclaimed; every write touches 2 fewer index trees |

Dropping indexes is reversible (`CREATE INDEX CONCURRENTLY` rebuilds online). Partitioning is not. If write amplification is confirmed by production stats, fix it before adding any structural complexity.

---

*Based on a production incident on a Spring Boot WebFlux + AWS RDS PostgreSQL platform. Company-specific identifiers removed.*
