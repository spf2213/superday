-- Closed-beta access path. /api/beta-signup creates accounts whose
-- subscription row has plan = 'beta', status = 'active'. The existing
-- subscription_is_active() helper already accepts that shape (status
-- 'active' + current_period_end null), so we only need to widen the
-- plan CHECK to include 'beta'.

alter table public.subscriptions
  drop constraint if exists subscriptions_plan_check;

alter table public.subscriptions
  add constraint subscriptions_plan_check
  check (plan in ('weekly','monthly','lifetime','beta'));
