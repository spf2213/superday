-- Run this once in the Supabase SQL editor.
--
-- One row per user. Stripe is the source of truth; this row is a denormalized
-- cache updated by the /api/stripe-webhook handler. The api/claude.js gate and
-- the client-side paywall both read from here.

create table if not exists public.subscriptions (
  user_id            uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text unique,
  plan               text check (plan in ('weekly','monthly','lifetime')),
  status             text not null default 'none'
                     check (status in ('none','trialing','active','past_due','canceled','incomplete')),
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  -- Lifetime never expires; weekly/monthly do. The is_active() helper handles both.
  updated_at         timestamptz not null default now()
);

-- Helper used by RLS and by the API. Lifetime is always active.
create or replace function public.subscription_is_active(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.subscriptions s
    where s.user_id = p_user_id
      and (
        s.plan = 'lifetime' and s.status = 'active'
        or s.status in ('trialing','active')
           and (s.current_period_end is null or s.current_period_end > now())
      )
  );
$$;

alter table public.subscriptions enable row level security;

-- Users can read their own row (used by the client to know which screen to show).
-- Writes go exclusively through the service role from the Stripe webhook.
drop policy if exists "subscriptions_self_read" on public.subscriptions;
create policy "subscriptions_self_read"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);
