// Market Pulse — server-side proxy to a finance news provider.
//
// We hit Finnhub's /news endpoint (free tier: 60 req/min, finance-native
// categories) and return a trimmed, normalized list. Caching is handled at
// Vercel's edge via Cache-Control headers, so a single upstream request
// serves every user for 5 minutes.
//
// Required environment variable (set in Vercel project settings):
//   FINNHUB_API_KEY — free key from https://finnhub.io
//
// If the key is missing the endpoint returns 503 with no body cached, so
// the dashboard renders an honest "feed not configured" state rather than
// faking a LIVE pulse.

import { applyCors } from '../lib/cors.js';

const FINNHUB_BASE = 'https://finnhub.io/api/v1';
const MAX_ITEMS = 12;

export default async function handler(req, res) {
  if (!applyCors(req, res)) return;
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method not allowed' });
  }

  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ error: 'market news not configured' });
  }

  try {
    const url = `${FINNHUB_BASE}/news?category=general&token=${encodeURIComponent(apiKey)}`;
    const upstream = await fetch(url, {
      headers: { 'user-agent': 'Superday/1.0 (+https://superday.app)' }
    });
    if (!upstream.ok) {
      console.error('Finnhub returned', upstream.status);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(502).json({ error: 'upstream news failed' });
    }

    const items = await upstream.json();
    if (!Array.isArray(items)) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(502).json({ error: 'unexpected upstream response' });
    }

    const trimmed = items
      .filter(i => i && i.headline && i.url)
      .slice(0, MAX_ITEMS)
      .map(i => ({
        headline: String(i.headline).slice(0, 240),
        source: i.source ? String(i.source).slice(0, 64) : null,
        datetime: typeof i.datetime === 'number' ? i.datetime : null,
        url: String(i.url),
        category: i.category ? String(i.category).slice(0, 32) : 'general'
      }));

    // Edge cache: one upstream call feeds every user for 5 min, then a
    // background revalidation absorbs the next 5 min of traffic on stale
    // content. Finnhub free tier (60 req/min) is comfortable even under
    // a thundering herd because Vercel's CDN collapses requests.
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ items: trimmed, fetched_at: Date.now() });
  } catch (e) {
    console.error('market-news error:', e);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({ error: 'market news fetch failed' });
  }
}
