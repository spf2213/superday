// Stripe webhook → keeps the public.subscriptions row in sync with Stripe.
//
// Required env:
//   STRIPE_SECRET_KEY
//   STRIPE_WEBHOOK_SECRET        — whsec_… from the Stripe dashboard
//   SUPABASE_URL or VITE_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// Configure the endpoint in Stripe to send these events:
//   checkout.session.completed
//   customer.subscription.created
//   customer.subscription.updated
//   customer.subscription.deleted
//   invoice.paid
//   invoice.payment_failed

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Disable Vercel's body parsing — Stripe needs the raw bytes for signature
// verification.
export const config = { api: { bodyParser: false } };

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function planFromPriceId(priceId) {
  if (!priceId) return null;
  if (priceId === process.env.STRIPE_PRICE_WEEKLY) return 'weekly';
  if (priceId === process.env.STRIPE_PRICE_MONTHLY) return 'monthly';
  if (priceId === process.env.STRIPE_PRICE_LIFETIME) return 'lifetime';
  return null;
}

async function userIdForCustomer(supa, stripe, customerId) {
  if (!customerId) return null;
  const { data: row } = await supa
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle();
  if (row?.user_id) return row.user_id;
  // Fall back to the metadata we stamp at customer-creation time.
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer?.metadata?.supabase_user_id || null;
  } catch (_) {
    return null;
  }
}

function periodEndFromSub(sub) {
  if (!sub) return null;
  const ts = sub.current_period_end || sub.trial_end || null;
  return ts ? new Date(ts * 1000).toISOString() : null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!stripeKey || !whSecret || !supabaseUrl || !serviceKey) {
    res.status(500).json({ error: 'Server not configured' });
    return;
  }

  const stripe = new Stripe(stripeKey);
  const supa = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const sig = req.headers['stripe-signature'];
  let raw;
  try {
    raw = await readRawBody(req);
  } catch (e) {
    res.status(400).json({ error: 'Could not read body' });
    return;
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whSecret);
  } catch (e) {
    console.error('webhook signature verification failed:', e.message);
    res.status(400).json({ error: 'Invalid signature' });
    return;
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object;
        const userId = s.metadata?.supabase_user_id || s.client_reference_id;
        const customerId = typeof s.customer === 'string' ? s.customer : s.customer?.id;
        if (!userId) break;

        if (s.mode === 'payment') {
          // Lifetime — set permanent active.
          const plan = s.metadata?.plan || 'lifetime';
          await supa.from('subscriptions').upsert(
            {
              user_id: userId,
              stripe_customer_id: customerId,
              plan,
              status: 'active',
              current_period_end: null,
              cancel_at_period_end: false,
              updated_at: new Date().toISOString()
            },
            { onConflict: 'user_id' }
          );
        } else if (s.mode === 'subscription' && s.subscription) {
          // Pull the full subscription so we get the authoritative period_end.
          const subId = typeof s.subscription === 'string' ? s.subscription : s.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          const priceId = sub.items?.data?.[0]?.price?.id;
          await supa.from('subscriptions').upsert(
            {
              user_id: userId,
              stripe_customer_id: customerId,
              plan: planFromPriceId(priceId),
              status: sub.status,
              current_period_end: periodEndFromSub(sub),
              cancel_at_period_end: !!sub.cancel_at_period_end,
              updated_at: new Date().toISOString()
            },
            { onConflict: 'user_id' }
          );
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;
        const userId =
          sub.metadata?.supabase_user_id ||
          (await userIdForCustomer(supa, stripe, customerId));
        if (!userId) break;

        const priceId = sub.items?.data?.[0]?.price?.id;
        const status = event.type === 'customer.subscription.deleted' ? 'canceled' : sub.status;
        await supa.from('subscriptions').upsert(
          {
            user_id: userId,
            stripe_customer_id: customerId,
            plan: planFromPriceId(priceId),
            status,
            current_period_end: periodEndFromSub(sub),
            cancel_at_period_end: !!sub.cancel_at_period_end,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id' }
        );
        break;
      }

      case 'invoice.paid':
      case 'invoice.payment_failed': {
        // These don't carry the full sub object — just refresh from Stripe
        // so current_period_end and status stay accurate after renewals.
        const inv = event.data.object;
        const subId = typeof inv.subscription === 'string' ? inv.subscription : inv.subscription?.id;
        if (!subId) break;
        const sub = await stripe.subscriptions.retrieve(subId);
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;
        const userId =
          sub.metadata?.supabase_user_id ||
          (await userIdForCustomer(supa, stripe, customerId));
        if (!userId) break;
        const priceId = sub.items?.data?.[0]?.price?.id;
        await supa.from('subscriptions').upsert(
          {
            user_id: userId,
            stripe_customer_id: customerId,
            plan: planFromPriceId(priceId),
            status: sub.status,
            current_period_end: periodEndFromSub(sub),
            cancel_at_period_end: !!sub.cancel_at_period_end,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id' }
        );
        break;
      }

      default:
        // Ignore other events.
        break;
    }
  } catch (e) {
    console.error('webhook handler error for', event.type, e);
    // Tell Stripe to retry — non-2xx triggers a redelivery.
    res.status(500).json({ error: 'Handler error' });
    return;
  }

  res.status(200).json({ received: true });
}
