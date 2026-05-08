-- Run this in the Supabase SQL editor after the subscriptions migration.
--
-- Two tables and two RPCs that protect the Anthropic budget:
--   public.api_usage          — cumulative spend per user per month, in cents.
--                               Read by /api/claude before each call and
--                               incremented after the call completes.
--   public.api_request_log    — one row per call, used for sliding-window
--                               rate limiting (per-minute and per-day).
--
-- Both tables are written exclusively by the service role from the API
-- handler. Users can read their own api_usage row so the dashboard can
-- show "$X of $20 used this month".

-- ─── api_usage ──────────────────────────────────────────────────────────────
create table if not exists public.api_usage (
  user_id    uuid    not null references auth.users(id) on delete cascade,
  yyyymm     text    not null check (yyyymm ~ '^[0-9]{4}-[0-9]{2}$'),
  cents      integer not null default 0 check (cents >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, yyyymm)
);

alter table public.api_usage enable row level security;

drop policy if exists "api_usage_self_read" on public.api_usage;
create policy "api_usage_self_read"
  on public.api_usage
  for select
  using (auth.uid() = user_id);

-- Atomic upsert + increment. Called by /api/claude with the cost of the
-- just-completed Anthropic request.
create or replace function public.increment_api_usage(
  p_user_id uuid,
  p_yyyymm  text,
  p_cents   integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_cents is null or p_cents <= 0 then
    return;
  end if;

  insert into public.api_usage (user_id, yyyymm, cents, updated_at)
  values (p_user_id, p_yyyymm, p_cents, now())
  on conflict (user_id, yyyymm) do update
    set cents      = public.api_usage.cents + excluded.cents,
        updated_at = now();
end;
$$;

revoke all on function public.increment_api_usage(uuid, text, integer) from public;

-- ─── api_request_log ────────────────────────────────────────────────────────
-- One row per Anthropic call, ~24h retention. Used by check_api_rate_limit
-- to enforce per-minute and per-day caps without an external store.
create table if not exists public.api_request_log (
  id         bigserial primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists api_request_log_user_time_idx
  on public.api_request_log (user_id, created_at desc);

alter table public.api_request_log enable row level security;
-- No policies: only the service role (which bypasses RLS) ever touches this.

-- Sliding-window check + record. Returns:
--   { allowed: bool, retry_after_seconds: int, scope: 'minute'|'day'|null }
--
-- Caller passes the limits so they can be tuned without a migration. If
-- allowed, a new row is inserted as part of the same call so the counters
-- stay consistent under concurrency.
create or replace function public.check_api_rate_limit(
  p_user_id      uuid,
  p_max_per_min  integer,
  p_max_per_day  integer
)
returns table (allowed boolean, retry_after_seconds integer, scope text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_minute_count integer;
  v_day_count    integer;
  v_oldest_min   timestamptz;
  v_oldest_day   timestamptz;
begin
  -- Opportunistic cleanup: drop rows older than 24h. Cheap because of the
  -- (user_id, created_at desc) index. Keeps the table bounded.
  delete from public.api_request_log
   where user_id = p_user_id
     and created_at < now() - interval '24 hours';

  select count(*), min(created_at)
    into v_minute_count, v_oldest_min
    from public.api_request_log
   where user_id = p_user_id
     and created_at >= now() - interval '1 minute';

  if v_minute_count >= p_max_per_min then
    return query select
      false,
      greatest(1, ceil(extract(epoch from (v_oldest_min + interval '1 minute' - now())))::int),
      'minute'::text;
    return;
  end if;

  select count(*), min(created_at)
    into v_day_count, v_oldest_day
    from public.api_request_log
   where user_id = p_user_id;

  if v_day_count >= p_max_per_day then
    return query select
      false,
      greatest(60, ceil(extract(epoch from (v_oldest_day + interval '24 hours' - now())))::int),
      'day'::text;
    return;
  end if;

  insert into public.api_request_log (user_id) values (p_user_id);

  return query select true, 0, null::text;
end;
$$;

revoke all on function public.check_api_rate_limit(uuid, integer, integer) from public;
