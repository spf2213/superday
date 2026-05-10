// Claude proxy — authenticated, rate-limited, prompt-constructed server-side.
//
// Required environment variables (set in Vercel project settings):
//   ANTHROPIC_API_KEY            — Anthropic console key (server-only)
//   SUPABASE_SERVICE_ROLE_KEY    — Supabase service role key (NEVER ship to client)
//   SUPABASE_URL or VITE_SUPABASE_URL — Supabase project URL
//
// Required Supabase table: public.api_usage (see migration in checklist).

import { createClient } from '@supabase/supabase-js';
import { applyCors } from '../lib/cors.js';

const ALLOWED_FIRMS = new Set([
  'Goldman Sachs',
  'J.P. Morgan',
  'Morgan Stanley',
  'Evercore',
  'Lazard',
  'Blackstone'
]);

const ALLOWED_MODES = new Set(['mock_interview']);

const ALLOWED_CATEGORIES = {
  tech: 'technical (accounting, valuation, M&A, LBO)',
  beh: 'behavioral / fit',
  brain: 'brain teasers',
  deal: 'deals, markets, and current events'
};

// Per-topic calibration vocab — keep in lockstep with src/levels.js. The
// server doesn't import the client module to stay self-contained, but it
// validates against the same enum.
const ALLOWED_TOPICS = new Set([
  'accounting', 'valuation', 'lbo', 'ma', 'markets', 'behavioral', 'brain'
]);
const ALLOWED_BANDS = new Set([
  'foundations', 'beginner', 'intermediate', 'advanced', 'expert'
]);
const ALLOWED_DIFFICULTIES = new Set(['warmup', 'vp', 'vp_curveball']);

const DIFFICULTY_DESCRIPTIONS = {
  warmup:       'Warm-up: this candidate is early in their prep. Be encouraging and patient. If they look stuck, it\'s OK to nudge with a small hint or restate the question more concretely. Score generously and emphasise progress.',
  vp:           'VP: standard VP-level interview. Direct, rigorous, no hand-holding. Score per the rubric.',
  vp_curveball: 'VP + Curveball: this candidate is operating at expert level. Push them. Use unusual fact patterns, multi-step setups, and probing follow-ups. Score per the rubric, with the bar set for expert.'
};

const TOPIC_LABELS_SERVER = {
  accounting: 'accounting',
  valuation:  'valuation',
  lbo:        'LBO',
  ma:         'M&A',
  markets:    'markets / deals',
  behavioral: 'behavioral / fit',
  brain:      'brain teasers'
};

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 900;
const MAX_HISTORY_MESSAGES = 30;

// Sonnet 4.6 pricing — keep in cents for integer math.
const INPUT_CENTS_PER_MTOK = 300;   // $3.00
const OUTPUT_CENTS_PER_MTOK = 1500; // $15.00

const MONTHLY_BUDGET_CENTS = 2000; // $20/user/month

// Per-user rate limits. Tuned so a determined user can't burn through the
// $20 monthly cap in a single bad afternoon, while still allowing a normal
// 6-question mock interview (≤ 12 calls) to complete uninterrupted.
const MAX_CALLS_PER_MINUTE = 10;
const MAX_CALLS_PER_DAY    = 100;

// Hard cap on a single Anthropic call. The server kills the upstream
// connection if it stalls, so a slow Claude doesn't hold a Vercel function
// hostage and so the user gets a clean error instead of a hung request.
const ANTHROPIC_TIMEOUT_MS = 30_000;

function bad(res, code, msg) {
  return res.status(code).json({ error: msg });
}

function isSubscriptionActive(row) {
  if (!row) return false;
  if (row.plan === 'lifetime' && row.status === 'active') return true;
  if (row.status !== 'active' && row.status !== 'trialing') return false;
  if (row.current_period_end && new Date(row.current_period_end) <= new Date()) return false;
  return true;
}

function currentYyyymm() {
  const d = new Date();
  return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0');
}

function buildSystemPrompt(mode, firm, category, difficulty, levels) {
  if (mode === 'mock_interview') {
    const categoryDescription = ALLOWED_CATEGORIES[category] || ALLOWED_CATEGORIES.tech;
    const difficultyLine = DIFFICULTY_DESCRIPTIONS[difficulty] || DIFFICULTY_DESCRIPTIONS.vp;

    // Inline the per-topic levels so the model can pick a topic per question
    // and sample at that topic's band ± 0–1. PRD §5 Task 11 step 3.
    const levelLines = levels
      ? Object.entries(levels).map(([t, b]) => `- ${TOPIC_LABELS_SERVER[t] || t}: ${b}`).join('\n')
      : null;

    return [
      'You are a Vice President in M&A at ' + firm + '.',
      'You are interviewing a candidate for a junior banker (analyst) role.',
      'The interview focuses on: ' + categoryDescription + '.',
      '',
      'INTERVIEW MODE:',
      difficultyLine,
      '',
      ...(levelLines ? [
        "CANDIDATE'S CURRENT PER-TOPIC LEVELS (from their accumulated practice):",
        levelLines,
        '',
        "QUESTION SELECTION RULES:",
        "- Each question must target a single topic from the list above.",
        "- Pick the topic for the next question, then choose its difficulty at that topic's band ± 0–1 (e.g., a candidate at advanced LBO gets intermediate, advanced, or expert LBO questions; a candidate at foundations valuation gets foundations or beginner valuation questions).",
        "- Vary topics across the 6 questions so the candidate is tested across the relevant area, not drilled on one thing.",
        "- For technical interviews, weight questions toward whichever topics are at intermediate or below — those are where the candidate has the most room to grow.",
        '',
        "SCORING RULES:",
        "- Score relative to the candidate's level for THAT topic, not against an absolute VP standard. A beginner-level LBO question for a beginner-LBO candidate at 7/10 is genuinely solid for their level — don't punish them for not delivering an advanced answer to a beginner question.",
        '- In Part 2, briefly acknowledge the topic and the band you sampled at (e.g., "This was an intermediate-level valuation question — solid framing on WACC, missing the unlevered-beta step a 9/10 would include.").',
        ''
      ] : []),
      'Run a rigorous, realistic 6-question interview.',
      '',
      'BEFORE THE FIRST QUESTION:',
      'Briefly introduce yourself in one sentence (no name — just "I\'m a VP in M&A at ' + firm + '"), then ask question 1.',
      '',
      "AFTER EVERY CANDIDATE ANSWER (questions 1 through 6), respond with EXACTLY this 4-part structure, in order, with a blank line between parts:",
      '',
      'PART 1 — Score line, no markdown, exactly this format:',
      'Technical: X/10 | Structure: X/10 | Confidence: X/10',
      '',
      'PART 2 — One short paragraph (2-4 sentences) starting with "What would make this stronger:". Be specific. Name the concept the candidate omitted, the framework they should have used, or the precise word/number that was wrong. Reference what a 9/10 answer would have included for THAT topic at THAT band. Confident but kind: direct, not snarky, not coddling.',
      '',
      'PART 3 — Decide the next move based on the answer:',
      "- If the candidate showed surface knowledge but missed nuance, DRILL DEEPER: ask a follow-up that probes the specific gap you named in part 2.",
      "- If the candidate's answer was weak or incorrect, PUSHBACK: challenge them to reconsider with a pointed question (e.g., \"Are you sure? What happens if X — does your answer still hold?\").",
      "- If the candidate scored 8+ across the board, MOVE ON: pick a different topic and sample one band higher than the previous question's topic, within their band ± 1.",
      '',
      'PART 4 — The next question on its own line, beginning with the candidate\'s next ordinal ("Question 2:", "Question 3:", etc.). Do not number questions 1 or include "Question 1:" before the very first question.',
      '',
      'AFTER THE 6TH QUESTION HAS BEEN ANSWERED AND SCORED, INSTEAD OF PARTS 3 AND 4, end your message with:',
      'WRAP-UP:',
      '- Strengths: <one sentence>',
      '- Areas to focus on: <one sentence>',
      '- Overall band: <Beginner | Developing | Strong | Excellent>',
      '',
      'SCORING RUBRIC (calibrated to the topic\'s band):',
      "- 9-10: Crisp, complete, right framework, sharp edge for the band you sampled at.",
      '- 7-8: Solid; minor gaps or hedging.',
      '- 5-6: Surface-level; missed the key insight.',
      '- 3-4: Incorrect or confused on a core concept.',
      '- 1-2: No real attempt or fundamentally wrong.',
      '',
      'STYLE: confident but kind. Direct. Specific. Concrete. Plain text only — no markdown, no asterisks for bold or italics, no headings (other than the literal label "WRAP-UP:"), no bullet lists outside the WRAP-UP section.'
    ].join('\n');
  }
  return null;
}

export default async function handler(req, res) {
  if (!applyCors(req, res)) return;
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

  // 2. Subscription gate. No paid plan → no API access.
  const { data: subRow } = await supa
    .from('subscriptions')
    .select('plan,status,current_period_end')
    .eq('user_id', userId)
    .maybeSingle();
  if (!isSubscriptionActive(subRow)) {
    return bad(res, 402, 'A paid subscription is required.');
  }

  // 3. Validate request shape.
  const { mode, firm, category, messages, difficulty, levels } = req.body || {};
  if (!ALLOWED_MODES.has(mode)) return bad(res, 400, 'Unknown mode');
  if (mode === 'mock_interview') {
    if (!ALLOWED_FIRMS.has(firm)) return bad(res, 400, 'Unknown firm');
    if (category && !ALLOWED_CATEGORIES[category]) return bad(res, 400, 'Unknown category');
    if (difficulty && !ALLOWED_DIFFICULTIES.has(difficulty)) return bad(res, 400, 'Unknown difficulty');
    if (levels !== undefined) {
      if (typeof levels !== 'object' || levels === null || Array.isArray(levels)) {
        return bad(res, 400, 'Bad levels payload');
      }
      for (const [t, b] of Object.entries(levels)) {
        if (!ALLOWED_TOPICS.has(t)) return bad(res, 400, 'Unknown level topic');
        if (typeof b !== 'string' || !ALLOWED_BANDS.has(b)) return bad(res, 400, 'Unknown level band');
      }
    }
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

  // 4. Pre-call budget check.
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

  // 5. Per-user rate limit. The RPC also records the call atomically so we
  //    don't get races between concurrent requests from the same user.
  try {
    const { data: rl, error: rlErr } = await supa.rpc('check_api_rate_limit', {
      p_user_id: userId,
      p_max_per_min: MAX_CALLS_PER_MINUTE,
      p_max_per_day: MAX_CALLS_PER_DAY
    });
    if (rlErr) {
      // Fail closed: if we can't rate-limit, don't burn budget.
      return bad(res, 503, 'Rate limiter unavailable, please retry');
    }
    const decision = Array.isArray(rl) ? rl[0] : rl;
    if (decision && decision.allowed === false) {
      const retry = decision.retry_after_seconds || 60;
      res.setHeader('Retry-After', String(retry));
      return bad(
        res,
        429,
        decision.scope === 'day'
          ? "Daily AI limit reached. Try again tomorrow."
          : "You're sending requests too fast. Take a breath and try again in a moment."
      );
    }
  } catch (_) {
    return bad(res, 503, 'Rate limiter unavailable, please retry');
  }

  // 6. Make the Anthropic call with a hard timeout so a slow upstream can't
  //    hold the function hostage.
  const system = buildSystemPrompt(mode, firm, category, difficulty, levels);
  const ctrl = new AbortController();
  const timeoutId = setTimeout(() => ctrl.abort(), ANTHROPIC_TIMEOUT_MS);
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
      }),
      signal: ctrl.signal
    });
  } catch (e) {
    clearTimeout(timeoutId);
    if (e?.name === 'AbortError') {
      return bad(res, 504, 'Upstream timed out, please retry');
    }
    return bad(res, 502, 'Upstream connection failed');
  }
  clearTimeout(timeoutId);

  const data = await upstream.json();

  // 7. Best-effort usage accounting (don't block response on this).
  const inputTokens = data?.usage?.input_tokens || 0;
  const outputTokens = data?.usage?.output_tokens || 0;
  const costCents = Math.ceil(
    (inputTokens * INPUT_CENTS_PER_MTOK + outputTokens * OUTPUT_CENTS_PER_MTOK) / 1_000_000
  );
  if (costCents > 0) {
    // Await so the write lands before the function returns — Vercel will
    // kill pending promises after the response is sent otherwise.
    try {
      await supa.rpc('increment_api_usage', {
        p_user_id: userId,
        p_yyyymm: yyyymm,
        p_cents: costCents
      });
    } catch (_) {
      // Don't block the user on accounting failure.
    }
  }

  return res.status(upstream.status).json(data);
}
