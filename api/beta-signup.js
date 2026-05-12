// Beta signup — closed-beta invite code grants free access without Stripe.
//
// Required environment variables (set in Vercel project settings):
//   SUPABASE_SERVICE_ROLE_KEY    — service role; used for admin user create + sub upsert
//   SUPABASE_URL or VITE_SUPABASE_URL
//   BETA_INVITE_CODE             — shared invite code given out to the closed-beta cohort

import { createClient } from '@supabase/supabase-js';
import { applyCors } from '../lib/cors.js';

const PASSWORD_MIN = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(res, code, msg) {
  return res.status(code).json({ error: msg });
}

function isValidEmail(s) {
  return typeof s === 'string' && s.length <= 254 && EMAIL_RE.test(s);
}

// Constant-time string compare so the beta code can't be timing-leaked.
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export default async function handler(req, res) {
  if (!applyCors(req, res)) return;
  if (req.method !== 'POST') return bad(res, 405, 'Method not allowed');

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const betaCode = process.env.BETA_INVITE_CODE;
  if (!supabaseUrl || !serviceKey || !betaCode) {
    return bad(res, 500, 'Server not configured');
  }

  const { code, email, password, name } = req.body || {};
  if (typeof code !== 'string' || !code.trim()) return bad(res, 400, 'Missing invite code');
  if (!safeEqual(code.trim(), betaCode.trim())) {
    return bad(res, 401, "That invite code isn't valid.");
  }

  if (!isValidEmail(email)) return bad(res, 400, 'Please enter a valid email.');
  if (typeof password !== 'string' || password.length < PASSWORD_MIN) {
    return bad(res, 400, `Password must be at least ${PASSWORD_MIN} characters.`);
  }
  if (typeof name !== 'string' || !name.trim()) return bad(res, 400, 'Please enter your name.');

  const supa = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  // email_confirm: true → skip the confirmation email round-trip so beta
  // users can sign in immediately after the form submits.
  const { data: createData, error: createErr } = await supa.auth.admin.createUser({
    email: email.trim(),
    password,
    email_confirm: true,
    user_metadata: { full_name: name.trim() }
  });
  if (createErr || !createData?.user) {
    const msg = createErr?.message || 'Could not create your account.';
    const status = /already|registered|exists/i.test(msg) ? 409 : 400;
    return bad(res, status, msg);
  }

  const userId = createData.user.id;
  const { error: subErr } = await supa.from('subscriptions').upsert(
    {
      user_id: userId,
      plan: 'beta',
      status: 'active',
      current_period_end: null,
      cancel_at_period_end: false,
      updated_at: new Date().toISOString()
    },
    { onConflict: 'user_id' }
  );
  if (subErr) {
    // The auth user landed but the subscription row didn't — clean up so the
    // address can be re-used on retry rather than 409-ing forever.
    try { await supa.auth.admin.deleteUser(userId); } catch (_) {}
    return bad(res, 500, 'Could not grant beta access. Please try again.');
  }

  return res.status(200).json({ ok: true });
}
