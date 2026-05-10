// Per-topic calibration model — single source of truth read by every UX
// surface (dashboard, plan, practice, mock, diagnostic). PRD: "Per-topic
// calibration across the full level spectrum".
//
// Storage shape on the progress object:
//   progress.levels[topic] = {
//     band:        one of BANDS,
//     score:       0.00 .. 4.99 (band = floor(score)),
//     confidence:  'low' | 'medium' | 'high',
//     samples:     count of recorded signals,
//     lastUpdated: ms epoch,
//     history:     bounded array of recent signals
//   }

export const TOPICS = ['accounting', 'valuation', 'lbo', 'ma', 'markets', 'behavioral', 'brain'];
export const BANDS = ['foundations', 'beginner', 'intermediate', 'advanced', 'expert'];
export const PREP_LEVELS = ['brand_new', 'self_study', 'coursework', 'real_practice', 'working'];

const CONFIDENCE = ['low', 'medium', 'high'];

export function bandIndex(band) {
  const i = BANDS.indexOf(band);
  return i === -1 ? 1 : i;
}

export function bandFromIndex(idx) {
  const n = Math.floor(Number(idx));
  if (!Number.isFinite(n)) return BANDS[1];
  return BANDS[Math.max(0, Math.min(BANDS.length - 1, n))];
}

function bandFromScore(score) {
  if (!Number.isFinite(score) || score < 0) return BANDS[0];
  return BANDS[Math.min(BANDS.length - 1, Math.floor(score))];
}

export function distance(a, b) {
  return Math.abs(bandIndex(a) - bandIndex(b));
}

// Seed table: prep × topic → band. PRD §4.3.
const SEED_BANDS = {
  brand_new:     { accounting:'foundations',  valuation:'foundations',  lbo:'foundations',  ma:'foundations',  markets:'foundations',  behavioral:'beginner',     brain:'beginner' },
  self_study:    { accounting:'beginner',     valuation:'beginner',     lbo:'beginner',     ma:'beginner',     markets:'beginner',     behavioral:'beginner',     brain:'beginner' },
  coursework:    { accounting:'intermediate', valuation:'beginner',     lbo:'beginner',     ma:'beginner',     markets:'intermediate', behavioral:'beginner',     brain:'intermediate' },
  real_practice: { accounting:'advanced',     valuation:'intermediate', lbo:'intermediate', ma:'intermediate', markets:'intermediate', behavioral:'intermediate', brain:'intermediate' },
  working:       { accounting:'advanced',     valuation:'advanced',     lbo:'advanced',     ma:'advanced',     markets:'advanced',     behavioral:'intermediate', brain:'intermediate' }
};

const SEED_CONFIDENCE = {
  brand_new:     'low',
  self_study:    'low',
  coursework:    'medium',
  real_practice: 'medium',
  working:       'high'
};

// Timeline modifies confidence one tier in either direction. PRD §4.3.
const TIMELINE_CONFIDENCE_BUMP = {
  '2weeks':    +1,
  '1month':    +1,
  '3months':    0,
  'exploring': -1
};

function bumpConfidence(c, dir) {
  const i = CONFIDENCE.indexOf(c);
  if (i === -1) return c;
  return CONFIDENCE[Math.max(0, Math.min(CONFIDENCE.length - 1, i + dir))];
}

// Bands occupy half-open intervals [n, n+1); seeding at the midpoint gives
// promotion and demotion symmetric headroom.
function seedScore(band) {
  return bandIndex(band) + 0.5;
}

export function getSeed({ prep, timeline } = {}) {
  const bands = SEED_BANDS[prep] || SEED_BANDS.self_study;
  let conf = SEED_CONFIDENCE[prep] || 'low';
  const bump = TIMELINE_CONFIDENCE_BUMP[timeline];
  if (typeof bump === 'number' && bump !== 0) conf = bumpConfidence(conf, bump);
  const out = {};
  for (const t of TOPICS) {
    const b = bands[t] || 'beginner';
    out[t] = {
      band: b,
      score: seedScore(b),
      confidence: conf,
      samples: 0,
      lastUpdated: 0,
      history: []
    };
  }
  return out;
}

function emptyTopic() {
  const b = 'beginner';
  return { band: b, score: seedScore(b), confidence: 'low', samples: 0, lastUpdated: 0, history: [] };
}

function ensureTopic(progress, topic) {
  if (!progress.levels) progress.levels = {};
  if (!progress.levels[topic]) progress.levels[topic] = emptyTopic();
  return progress.levels[topic];
}

function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

function confidenceForSamples(samples) {
  if (samples < 5) return 'low';
  if (samples < 20) return 'medium';
  return 'high';
}

// Bounded so an active user's row doesn't bloat over months of practice.
const HISTORY_LIMIT = 50;

export function recordSignal(progress, opts) {
  if (!opts || !TOPICS.includes(opts.topic)) return null;
  if (typeof opts.correct !== 'boolean') return null;
  const lvl = ensureTopic(progress, opts.topic);

  // ∆ shrinks with sample count so the seed fully washes out around sample 20.
  const baseDelta = lvl.samples < 5 ? 0.3 : lvl.samples < 20 ? 0.15 : 0.05;
  const card = BANDS.includes(opts.cardLevel) ? opts.cardLevel : 'intermediate';
  const dist = distance(card, lvl.band);
  // |effectiveDelta| ≤ 0.6 caps the effect of a single answer (e.g. a
  // weight-3 diagnostic on a 2-band-stretch question) so one signal can't
  // jump the user past two band thresholds.
  const magnitude = Math.min(0.6, baseDelta * (1 + 0.5 * dist));
  const w = Number.isFinite(opts.weight) ? opts.weight : 1;
  const change = (opts.correct ? 1 : -1) * magnitude * w;

  const prevBand = lvl.band;
  const newScore = clamp(lvl.score + change, 0, 4.99);
  const newBand = bandFromScore(newScore);

  lvl.score = newScore;
  lvl.band = newBand;
  lvl.samples += 1;
  lvl.confidence = confidenceForSamples(lvl.samples);
  lvl.lastUpdated = Date.now();
  lvl.history.push({
    t: lvl.lastUpdated,
    cardLevel: card,
    correct: opts.correct,
    weight: w,
    delta: change,
    band: newBand,
    source: opts.source || null
  });
  if (lvl.history.length > HISTORY_LIMIT) {
    lvl.history.splice(0, lvl.history.length - HISTORY_LIMIT);
  }

  return { topic: opts.topic, prevBand, newBand, change, level: lvl };
}

export function getLevel(progress, topic) {
  return ensureTopic(progress, topic);
}

export function getAllLevels(progress) {
  const out = {};
  for (const t of TOPICS) out[t] = getLevel(progress, t);
  return out;
}

// Convert percent (0–100) from a legacy diagnostic into a band.
function pctToBand(pct) {
  if (typeof pct !== 'number' || !Number.isFinite(pct)) return null;
  if (pct < 30) return 'foundations';
  if (pct < 55) return 'beginner';
  if (pct < 75) return 'intermediate';
  if (pct < 90) return 'advanced';
  return 'expert';
}

// One-time read-only converter: legacy userBand + diagnosticScores.subs
// → per-topic levels. Idempotent — safe to call on every loadProgress. If the
// user has already answered cards under the new model, we skip rather than
// overwrite their accumulated signal.
//
// Pass the legacy fields explicitly via the second arg so the caller doesn't
// need to write them onto progress just to feed migration. Falls back to
// progress.userBand / progress.diagnosticScores for backward compatibility.
export function migrateLegacy(progress, legacy) {
  if (!progress) return null;
  if (!progress.levels) progress.levels = {};

  // If any topic has been touched under the new model, this user has moved
  // past the legacy shape — only fill in any topics that don't exist yet
  // (e.g. TOPICS gained a new entry since migration last ran).
  const anyTouched = TOPICS.some(t => progress.levels[t] && progress.levels[t].samples > 0);
  if (anyTouched) {
    for (const t of TOPICS) ensureTopic(progress, t);
    return progress.levels;
  }

  const userBandSrc = legacy?.userBand ?? progress.userBand;
  const diagSrc = legacy?.diagnosticScores ?? progress.diagnosticScores ?? null;
  const legacyBand = BANDS.includes(userBandSrc) ? userBandSrc : 'beginner';
  const subs = (diagSrc && diagSrc.subs) || {};
  const behPct = diagSrc ? diagSrc.beh : null;
  const marketsPct = diagSrc ? diagSrc.deal : null;

  for (const t of TOPICS) {
    if (progress.levels[t]) continue;
    let band = legacyBand;
    if (t === 'behavioral') band = pctToBand(behPct) || legacyBand;
    else if (t === 'markets') band = pctToBand(marketsPct) || legacyBand;
    else if (subs[t] !== undefined) band = pctToBand(subs[t]) || legacyBand;

    progress.levels[t] = {
      band,
      score: seedScore(band),
      confidence: progress.diagnosticDone ? 'medium' : 'low',
      samples: 0,
      lastUpdated: 0,
      history: []
    };
  }
  return progress.levels;
}
