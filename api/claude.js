// Claude proxy — authenticated, rate-limited, prompt-constructed server-side.
//
// Required environment variables (set in Vercel project settings):
//   ANTHROPIC_API_KEY            — Anthropic console key (server-only)
//   SUPABASE_SERVICE_ROLE_KEY    — Supabase service role key (NEVER ship to client)
//   SUPABASE_URL or VITE_SUPABASE_URL — Supabase project URL
//
// Required Supabase table: public.api_usage (see migration in checklist).

import { createClient } from '@supabase/supabase-js';

const ALLOWED_FIRMS = new Set([
  'Goldman Sachs',
  'J.P. Morgan',
  'Morgan Stanley',
  'Evercore',
  'Lazard',
  'Blackstone'
]);

const ALLOWED_MODES = new Set(['mock_interview']);

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 600;
const MAX_HISTORY_MESSAGES = 30;

// Sonnet 4.6 pricing — keep in cents for integer math.
const INPUT_CENTS_PER_MTOK = 300;   // $3.00
const OUTPUT_CENTS_PER_MTOK = 1500; // $15.00

const MONTHLY_BUDGET_CENTS = 2000; // $20/user/month

function bad(res, code, msg) {
  return res.status(code).json({ error: msg });
}

function currentYyyymm() {
  const d = new Date();
  return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0');
}

function buildSystemPrompt(mode, firm) {
  if (mode === 'mock_interview') {
    return 'You are a VP in M&A at ' + firm + '. Conduct a rigorous IB interview. ' +
      "After the candidate's answer, give brief feedback and scores in this exact format: " +
      "'Technical: X/10 | Structure: X/10 | Confidence: X/10'. Then ask a follow-up. " +
      'Keep it concise and challenging. ' +
      'Use plain text only — no markdown, no asterisks for bold or italics, no headings, no bullet lists.';
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return bad(res, 405, 'Method not allowed');

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!apiKey || !supabaseUrl || !serviceKey) {
    return bad(res, 500, 'Server not configured');
  }

  // 1. Auth — require a Supabase user JWT.
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

  // 2. Validate request shape.
  const { mode, firm, messages } = req.body || {};
  if (!ALLOWED_MODES.has(mode)) return bad(res, 400, 'Unknown mode');
  if (mode === 'mock_interview' && !ALLOWED_FIRMS.has(firm)) {
    return bad(res, 400, 'Unknown firm');
  }
  if (!Array.isArray(messages) || !messages.length) {
    return bad(res, 400, 'No messages');
  }
  if (messages.length > MAX_HISTORY_MESSAGES) {
    return bad(res, 400, 'Conversation too long');
  }
  for (const m of messages) {
    if (m?.role !== 'user' && m?.role !== 'assistant') {
      return bad(res, 400, 'Bad message role');
    }
    if (typeof m.content !== 'string' || m.content.length > 8000) {
      return bad(res, 400, 'Bad message content');
    }
  }

  // 3. Pre-call budget check.
  const yyyymm = currentYyyymm();
  const { data: usageRow } = await supa
    .from('api_usage')
    .select('cents')
    .eq('user_id', userId)
    .eq('yyyymm', yyyymm)
    .maybeSingle();
  const spentCents = usageRow?.cents || 0;
  if (spentCents >= MONTHLY_BUDGET_CENTS) {
    return bad(res, 429, "You've hit your monthly AI usage limit. Resets on the 1st.");
  }

  // 4. Make the Anthropic call.
  const system = buildSystemPrompt(mode, firm);
  let upstream;
  try {
    upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system,
        messages
      })
    });
  } catch (e) {
    return bad(res, 502, 'Upstream connection failed');
  }

  const data = await upstream.json();

  // 5. Best-effort usage accounting (don't block response on this).
  const inputTokens = data?.usage?.input_tokens || 0;
  const outputTokens = data?.usage?.output_tokens || 0;
  const costCents = Math.ceil(
    (inputTokens * INPUT_CENTS_PER_MTOK + outputTokens * OUTPUT_CENTS_PER_MTOK) / 1_000_000
  );
  if (costCents > 0) {
    // Use the SQL function increment_api_usage so concurrent calls don't lose writes.
    supa.rpc('increment_api_usage', {
      p_user_id: userId,
      p_yyyymm: yyyymm,
      p_cents: costCents
    }).then(() => {}, () => {});
  }

  return res.status(upstream.status).json(data);
}
