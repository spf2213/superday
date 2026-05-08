// Returns a Stripe Customer Portal URL for the current user so they can
// cancel, switch plans, or update billing.
//
// Required env (same as /api/checkout):
//   STRIPE_SECRET_KEY
//   SUPABASE_URL or VITE_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   PUBLIC_BASE_URL (optional)

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { applyCors } from '../lib/cors.js';

function bad(res, code, msg) {
  return res.status(code).json({ error: msg });
}

export default async function handler(req, res) {
  if (!applyCors(req, res)) return;
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
  const userId = userData.user.id;

  const { data: row } = await supa
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .maybeSingle();
  if (!row?.stripe_customer_id) return bad(res, 404, 'No customer record');

  const origin =
    req.headers.origin ||
    process.env.PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : null);
  if (!origin) return bad(res, 500, 'Cannot determine return URL');

  const stripe = new Stripe(stripeKey);
  let session;
  try {
    session = await stripe.billingPortal.sessions.create({
      customer: row.stripe_customer_id,
      return_url: origin + '/'
    });
  } catch (e) {
    console.error('stripe portal error:', e);
    return bad(res, 502, 'Could not open portal');
  }

  return res.status(200).json({ url: session.url });
}
