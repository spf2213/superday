// CORS + Origin allow-list for browser-callable endpoints.
//
// Threat model: even though our paid endpoints already require a Supabase
// Bearer token (so a random site can't burn budget without the user's JWT),
// we want defense-in-depth — block requests whose Origin isn't ours so a
// compromised third-party page running in the user's browser can't call us.
//
// NOT used by /api/stripe-webhook: Stripe's servers don't send an Origin
// header and don't do CORS preflight. Signature verification is the right
// control there.
//
// Allow-list sources (union):
//   ALLOWED_ORIGINS   — comma-separated list, the canonical place to add hosts
//   PUBLIC_BASE_URL   — primary user-facing origin
//   VERCEL_URL        — auto-set per deploy, useful for preview deploys
//
// In non-production environments we also allow common localhost ports so
// `vite dev` can hit the deployed API without a config change.

function buildAllowed() {
  const list = new Set();

  const fromEnv = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  for (const o of fromEnv) list.add(o);

  if (process.env.PUBLIC_BASE_URL) list.add(process.env.PUBLIC_BASE_URL);
  if (process.env.VERCEL_URL) list.add('https://' + process.env.VERCEL_URL);

  if (process.env.NODE_ENV !== 'production') {
    list.add('http://localhost:3000');
    list.add('http://localhost:5173');
    list.add('http://127.0.0.1:5173');
  }

  return list;
}

const ALLOWED = buildAllowed();

/**
 * Apply CORS headers and gate by Origin. Call this as the FIRST line of every
 * browser-callable handler:
 *
 *   if (!applyCors(req, res)) return;
 *
 * Returns true if the handler should keep going, false if a response has
 * already been sent (preflight or rejection).
 */
export function applyCors(req, res) {
  const origin = req.headers.origin || null;

  // Same-origin requests don't send Origin (e.g. our own SPA hitting /api/*
  // on the same hostname), so we let those through unchanged.
  if (!origin) {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
      res.setHeader('Access-Control-Max-Age', '86400');
      res.status(204).end();
      return false;
    }
    return true;
  }

  if (!ALLOWED.has(origin)) {
    res.status(403).json({ error: 'Origin not allowed' });
    return false;
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.status(204).end();
    return false;
  }

  return true;
}
