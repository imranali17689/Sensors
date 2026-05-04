# Open Spot — Database Documentation

> **Project:** Open Spot (UTampa Parking Occupancy System)
> **Platform:** Supabase (PostgreSQL 17)
> **Region:** us-east-1

---

## Architecture Overview

```
┌──────────────┐       ┌──────────────┐       ┌──────────────────┐
│  Raspberry Pi │──────▶│   Supabase   │◀──────│  Next.js Frontend│
│  (Hardware)   │ INSERT│  (PostgreSQL)│ SELECT│  (Dashboard)     │
│               │ events│              │ only  │                  │
└──────────────┘       └──────────────┘       └──────────────────┘
     Uses:                                          Uses:
     SERVICE ROLE KEY                          PUBLISHABLE KEY
     (full access,                             (read-only,
      bypasses RLS)                             subject to RLS)
```

---

## Tables

### `Events`

Logs every vehicle IN/OUT detection from the hardware sensor.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| `id` | `bigint` | NO | auto-increment | Primary key |
| `direction` | `text` | NO | — | Must be `'IN'` or `'OUT'` |
| `timestamp` | `timestamptz` | YES | — | When the sensor detected the event (stored in UTC) |
| `created_at` | `timestamptz` | YES | `now()` | When the row was inserted |

### `garage_status`

Single-row table holding the live occupancy state of the garage.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| `id` | `smallint` | NO | — | Primary key (always `1`) |
| `occupied` | `integer` | NO | — | Must be `>= 0` and `<= capacity` |
| `available` | `integer` | YES | — | Must be `>= 0` |
| `capacity` | `integer` | NO | — | Must be `>= 0` |
| `updated_at` | `timestamptz` | YES | `now()` | Auto-refreshed by trigger on every UPDATE |
| `garage_name` | `text` | YES | `'Grand'` | Name of the garage |
| `parking_type` | `text` | YES | `'student'` | Parking category |

### `camera`

Registry of cameras installed at garage entry/exit points.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| `id` | `bigint` | NO | auto-increment | Primary key |
| `name` | `text` | NO | `'Main Camera'` | Display name |
| `model` | `text` | YES | — | Camera model |
| `location` | `text` | YES | — | Where installed |
| `status` | `text` | NO | `'ACTIVE'` | Must be `'ACTIVE'`, `'INACTIVE'`, or `'MAINTENANCE'` |
| `installed_at` | `timestamptz` | YES | `now()` | Install date |
| `updated_at` | `timestamptz` | YES | `now()` | Last modified |

### `parkinglog`

Daily aggregation of parking activity for historical trend tracking.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| `id` | `bigint` | NO | auto-increment | Primary key |
| `log_date` | `date` | NO | — | One row per day (UNIQUE) |
| `total_in` | `integer` | NO | `0` | Total IN events that day |
| `total_out` | `integer` | NO | `0` | Total OUT events that day |
| `peak_occupancy` | `integer` | YES | — | Highest occupied count that day |
| `created_at` | `timestamptz` | YES | `now()` | Row creation time |

---

## Views

### `events_est`

Converts UTC timestamps to Eastern Time (`America/New_York`). Automatically handles EST/EDT daylight saving.

```sql
SELECT id, direction,
  (timestamp AT TIME ZONE 'America/New_York') AS timestamp,
  (created_at AT TIME ZONE 'America/New_York') AS created_at
FROM "Events";
```

Query `events_est` instead of `Events` when displaying times on the frontend.

---

## Functions

### `update_updated_at()`

Trigger function that auto-refreshes `updated_at` to `now()` on every row update. Attached to `garage_status` via `trg_garage_status_updated_at` (fires BEFORE UPDATE).

### `update_sensor_state()`

Trigger function that adjusts `garage_status` when an event is inserted. Increments `occupied` on `'IN'`, decrements on `'OUT'`, and recalculates `available` based on `capacity`.

### `update_zone_state()`

Multi-zone version of the sensor state function. Validates that a sensor belongs to the correct zone, enforces capacity bounds (cannot go below 0 or exceed max), and updates zone status to `'FULL'` or `'OPEN'`. References `sensors`, `zone_state`, and `parking_zone` tables for future multi-garage expansion.

### `check_email_domain()`

Auth hook that restricts signups to UTampa emails only. Allows `@spartans.ut.edu` (students) and `@ut.edu` (faculty). Rejects all other domains. Runs as `SECURITY DEFINER` and reads email from the auth event payload at `event->'user'->>'email'`.

---

## Indexes

| Table | Index | Column | Purpose |
|-------|-------|--------|---------|
| `Events` | `idx_events_timestamp` | `timestamp` | Fast time-range queries |
| `Events` | `idx_events_direction` | `direction` | Fast IN/OUT filtering |
| `parkinglog` | `idx_parkinglog_log_date` | `log_date` | Fast date lookups |
| `parkinglog` | `parkinglog_log_date_unique` | `log_date` | Enforces one row per day |

---

## Constraints

| Table | Constraint | Rule |
|-------|-----------|------|
| `Events` | `events_direction_check` | `direction` must be `'IN'` or `'OUT'` |
| `garage_status` | `garage_status_occupied_nonnegative` | `occupied >= 0` |
| `garage_status` | `garage_status_available_nonnegative` | `available >= 0` |
| `garage_status` | `garage_status_capacity_nonnegative` | `capacity >= 0` |
| `garage_status` | `garage_status_occupied_within_capacity` | `occupied <= capacity` |
| `parkinglog` | `parkinglog_log_date_unique` | One row per `log_date` |

---

## Row Level Security

RLS is enabled on all 4 tables. The service role key bypasses RLS entirely.

| Table | Policy | Command | Role |
|-------|--------|---------|------|
| `Events` | Allow read for all users | SELECT | anon |
| `Events` | Allow insert for all users | INSERT | anon |
| `garage_status` | Allow select for anon garage status | SELECT | anon |
| `garage_status` | Allow update for anon | UPDATE | anon |
| `parkinglog` | authenticated users can read parkinglog | SELECT | authenticated |
| `camera` | *(none)* | — | — |

---

## Access Model

| Role | Description | Key Type |
|------|-------------|----------|
| **anon** | Frontend dashboard — public, read-only access | Publishable key (visible in browser) |
| **authenticated** | Logged-in UTampa team members (`@spartans.ut.edu`, `@ut.edu`) | Publishable key + auth session |
| **service_role** | Raspberry Pi hardware — full access, bypasses all RLS | Service role key (secret, server-side only) |

---

## Data Flow

```
1. Car enters/exits garage
        │
        ▼
2. Raspberry Pi camera detects direction (IN/OUT)
        │
        ▼
3. Pi INSERTs into "Events" table
        │
        ▼
4. Trigger fires update_sensor_state()
   → Updates garage_status (occupied, available)
   → Trigger fires update_updated_at()
   → Refreshes updated_at timestamp
        │
        ▼
5. Frontend queries garage_status
   → Displays live occupancy on dashboard
   → Uses events_est view for Eastern time display
```

---

*Last updated: May 4, 2026*
*Database Developer: Anthony Eccleston*
