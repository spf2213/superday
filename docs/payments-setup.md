# Payments setup

What you (the human) need to do once before the paywall works in production.
The code is already in place; this is purely configuration.

## 1. Run the migration

In Supabase SQL editor, paste and run [supabase/migrations/2026_05_07_subscriptions.sql](../supabase/migrations/2026_05_07_subscriptions.sql).

This creates `public.subscriptions` (user_id PK, joined to `auth.users`) and a
`subscription_is_active(uuid)` helper. RLS is on; the only client-readable
column scope is the user's own row.

## 2. Create three products in Stripe

Dashboard → Products → **Add product**. Create:

| Product            | Price          | Type                 |
| ------------------ | -------------- | -------------------- |
| Superday Weekly    | `$5` per week  | Recurring · weekly   |
| Superday Monthly   | `$15` per month| Recurring · monthly  |
| Superday Lifetime  | `$79` one-time | One-time             |

Copy the `price_…` ID from each. (Do **not** copy the product ID — the IDs we
need start with `price_`.)

The 7-day trial for weekly/monthly is set in code (see `TRIAL_DAYS` in
[api/checkout.js](../api/checkout.js)), so do **not** set a trial on the
Stripe product — they would compound.

## 3. Configure the webhook

Dashboard → Developers → Webhooks → **Add endpoint**:

- URL: `https://<your-domain>/api/stripe-webhook`
- Events to send:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.paid`
  - `invoice.payment_failed`

Copy the **Signing secret** (`whsec_…`).

## 4. Set environment variables

In Vercel project settings → Environment Variables, add:

```
STRIPE_SECRET_KEY=sk_live_...                 # or sk_test_... for staging
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_WEEKLY=price_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_LIFETIME=price_...
SUPABASE_SERVICE_ROLE_KEY=...                 # already set if mock interview works
ANTHROPIC_API_KEY=...                         # already set
```

Apply to **Production** and **Preview** as appropriate. (Use Stripe test keys
+ a separate webhook in your preview environment.)

## 5. Configure the Customer Portal

Dashboard → Settings → Billing → **Customer portal**. Enable:

- Cancel subscriptions
- Switch plans (link the Weekly and Monthly prices to the same product family if you want users to swap between them — otherwise leave plan-switching off)
- Update payment method

## 6. Test

1. Sign up with a fresh account in your test environment.
2. After email verification + sign-in you should land on `#screen-paywall`.
3. Click **Start free trial** on Monthly. Use Stripe test card `4242 4242 4242 4242`.
4. Stripe redirects back to `/?paid=1`. The page polls until the webhook lands, then routes to the dashboard.
5. Profile → **Subscription → Manage** opens the Stripe Customer Portal.
6. Cancel in the portal → next sign-in routes back to the paywall (after the period end, since Stripe sends `canceled` on the period boundary).

## How the gate works

Two enforcement points, both reading from `public.subscriptions`:

- **Client** — [app.js `hasActiveSubscription()`](../app.js): checked on every `onSignedIn`. If false, render `#screen-paywall` and nothing else.
- **Server** — [api/claude.js](../api/claude.js): same check, returns `402` if no active sub. The client's mock-interview flow handles 402 by bouncing the user to the paywall (covers the case where a sub lapses mid-session).

Stripe is the source of truth. The DB row is a denormalized cache, written
only by [api/stripe-webhook.js](../api/stripe-webhook.js) using the service
role key.
