// Creates a Stripe Checkout Session for the requested plan and returns its URL.
//
// Required env:
//   STRIPE_SECRET_KEY            — sk_live_… or sk_test_…
//   STRIPE_PRICE_WEEKLY          — price_… (recurring, weekly)
//   STRIPE_PRICE_MONTHLY         — price_… (recurring, monthly)
//   STRIPE_PRICE_LIFETIME        — price_… (one-time)
//   SUPABASE_URL or VITE_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   PUBLIC_BASE_URL (optional)   — fallback origin for redirects when the
//                                  request origin header is missing.

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const TRIAL_DAYS = 7;
const ALLOWED_PLANS = new Set(['weekly', 'monthly', 'lifetime']);

function bad(res, code, msg) {
  return res.status(code).json({ error: msg });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return bad(res, 405, 'Method not allowed');

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!stripeKey || !supabaseUrl || !serviceKey) {
    return bad(res, 500, 'Server not configured');
  }

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return bad(res, 401, 'Missing auth token');
  }
  const token = authHeader.slice(7);

  const supa = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const { data: userData, error: userErr } = await supa.auth.getUser(token);
  if (userErr || !userData?.user) return bad(res, 401, 'Invalid auth token');
  const user = userData.user;

  const { plan } = req.body || {};
  if (!ALLOWED_PLANS.has(plan)) return bad(res, 400, 'Unknown plan');

  const priceId = {
    weekly: process.env.STRIPE_PRICE_WEEKLY,
    monthly: process.env.STRIPE_PRICE_MONTHLY,
    lifetime: process.env.STRIPE_PRICE_LIFETIME
  }[plan];
  if (!priceId) return bad(res, 500, 'Plan price not configured');

  const stripe = new Stripe(stripeKey);

  // Reuse Stripe customer if we already have one (avoids creating duplicates).
  const { data: existing } = await supa
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .maybeSingle();

  let customerId = existing?.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id }
    });
    customerId = customer.id;
    await supa
      .from('subscriptions')
      .upsert(
        { user_id: user.id, stripe_customer_id: customerId, status: 'none' },
        { onConflict: 'user_id' }
      );
  }

  const origin =
    req.headers.origin ||
    process.env.PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : null);
  if (!origin) return bad(res, 500, 'Cannot determine redirect origin');

  const isLifetime = plan === 'lifetime';

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: isLifetime ? 'payment' : 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: origin + '/?paid=1',
      cancel_url: origin + '/?paid=0',
      client_reference_id: user.id,
      metadata: { supabase_user_id: user.id, plan },
      ...(isLifetime
        ? { payment_intent_data: { metadata: { supabase_user_id: user.id, plan } } }
        : {
            subscription_data: {
              trial_period_days: TRIAL_DAYS,
              metadata: { supabase_user_id: user.id, plan }
            }
          })
    });
  } catch (e) {
    console.error('stripe checkout error:', e);
    return bad(res, 502, 'Could not create checkout session');
  }

  return res.status(200).json({ url: session.url });
}
