import { createClient } from '@supabase/supabase-js';
import { QUESTIONS } from './src/data/questions.js';
import { LEARN_MODULES } from './src/data/learnModules.js';
import { setNavActive, toggleTheme } from './src/theme.js';
import './src/animations.js';

// Friendly topic labels for mock-score grouping.
const TOPIC_LABELS = {
  tech: 'Technical',
  beh:  'Behavioral',
  brain:'Brain teasers',
  deal: 'Deals & Markets'
};
/* ─── SCROLL HELPERS ─────────────────── */
function navScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ════════════════════════════════════════
   INTERACTIVE HERO PREVIEW — FULL MIRROR
════════════════════════════════════════ */
const PV_VIEWS = ['dashboard','bank','flash','mock'];
const PV_TITLES = {
  dashboard: '',
  bank:      '',
  flash:     '',
  mock:      '',
};

/* ── Nav switching ── */
function prevNav(view, el) {
  PV_VIEWS.forEach(v => {
    const pane = document.getElementById('pv-' + v);
    if (pane) pane.style.display = 'none';
    const nav = document.getElementById('pnav-' + v);
    if (nav) nav.classList.remove('ps-active');
  });
  const target = document.getElementById('pv-' + view);
  if (target) target.style.display = 'flex';
  if (el) el.classList.add('ps-active');
  const titleEl = document.getElementById('prev-title');
  if (titleEl) titleEl.textContent = PV_TITLES[view] || 'superday.app';
  if (view === 'flash' && !pvFCInit) { pvFCRender(); pvFCInit = true; }
}

/* ── Question Bank filter ── */
function pvBankFilter(el, cat) {
  if (!el) return;
  document.querySelectorAll('#pv-bank-list .pv-q-item').forEach(row => {
    row.style.display = (cat === 'all' || row.dataset.cat === cat) ? 'flex' : 'none';
  });
  document.querySelectorAll('#pv-bank .qb-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

/* ── Question Bank expand/collapse ── */
function pvToggleQ(row) {
  if (!row) return;
  const ans   = row.querySelector('.pv-ans');
  const caret = row.querySelector('.pv-caret');
  if (!ans || !caret) return;
  const open  = ans.style.display !== 'none';
  // close all
  document.querySelectorAll('#pv-bank-list .pv-q-item').forEach(r => {
    r.querySelector('.pv-ans').style.display = 'none';
    r.querySelector('.pv-caret').style.transform = '';
    r.style.background = '';
  });
  if (!open) {
    ans.style.display = 'block';
    caret.style.transform = 'rotate(180deg)';
    row.style.background = 'var(--bg-hover)';
  }
}

/* ── Flashcards ── */
const PV_FC = [
  { cat:'VALUATION',
    q:'What is the difference between equity value and enterprise value?',
    a:'Equity value = market cap (what belongs to shareholders). EV = equity value + net debt + minority interest − associates. EV is the total acquisition cost. Use EV for unlevered multiples (EV/EBITDA, EV/Revenue), equity value for levered multiples (P/E, P/B).' },
  { cat:'ACCOUNTING',
    q:'Walk me through a $10 D&A increase across all three statements.',
    a:'IS: pre-tax income ↓$10, taxes ↓$3.50, net income ↓$6.50. CFS: NI ↓$6.50 but D&A added back +$10, so OCF ↑$3.50. BS: PP&E (net) ↓$10; cash ↑$3.50; retained earnings ↓$6.50 — balances.' },
  { cat:'WACC',
    q:'What is WACC and how do you calculate each component?',
    a:'WACC = (E/V × Ke) + (D/V × Kd × (1−t)). Ke via CAPM: Rf + β(Rm−Rf). Kd = pre-tax cost of debt × (1 − tax rate). Use market values not book. Re-lever beta if using a comparable\'s beta.' },
  { cat:'LBO',
    q:'What makes a good LBO candidate?',
    a:'Stable, predictable FCF to service debt. Low capex (asset-light). Defensive market position with pricing power. Identifiable operational improvements. Clean balance sheet. Clear exit path (strategic buyer or IPO) in 3–7 years.' },
];
let pvFCIdx = 0, pvFCFlipped = false, pvFCInit = false;

function pvFCRender() {
  const c = PV_FC[pvFCIdx];
  const inner = document.getElementById('pv-fc-inner');
  if (inner) inner.style.transform = '';
  pvFCFlipped = false;
  setTimeout(() => {
    const qEl = document.getElementById('pv-fc-q');
    const aEl = document.getElementById('pv-fc-a');
    const cEl = document.getElementById('pv-fc-cat');
    const pEl = document.getElementById('pv-fc-prog');
    if (qEl) qEl.textContent = c.q;
    if (aEl) aEl.textContent = c.a;
    if (cEl) cEl.textContent = c.cat;
    if (pEl) pEl.textContent = (pvFCIdx + 1) + ' / ' + PV_FC.length;
  }, pvFCFlipped ? 250 : 0);
}
function pvFlipCard() {
  const inner = document.getElementById('pv-fc-inner');
  pvFCFlipped = !pvFCFlipped;
  if (inner) inner.style.transform = pvFCFlipped ? 'rotateY(180deg)' : '';
}
function pvFCNav(dir) {
  pvFCIdx = (pvFCIdx + dir + PV_FC.length) % PV_FC.length;
  const inner = document.getElementById('pv-fc-inner');
  if (inner) inner.style.transform = '';
  pvFCFlipped = false;
  setTimeout(pvFCRender, 0);
}

/* ── Mock Interview ── */
let pvMockRound = 0;
const PV_MOCK_REPLIES = [
  { t:8, s:9, c:7, text:'Good structure. Terminal value assumptions — especially the growth rate — have the biggest impact. Now: what discount rate would you use, and how do you derive it?' },
  { t:7, s:8, c:8, text:'Solid. Beta is the trickiest part of CAPM. Follow-up: what happens to DCF value if you increase the terminal growth rate by 100bps?' },
  { t:9, s:8, c:8, text:'Strong. WACC sensitivity is something interviewers love. One more: how do precedent transactions typically compare to comps in value, and why?' },
];
function pvBubble(side, text) {
  const wrap = document.createElement('div');
  wrap.style.cssText = side === 'user'
    ? 'display:flex;gap:7px;flex-direction:row-reverse;align-items:flex-start'
    : 'display:flex;gap:7px;align-items:flex-start';
  const av = document.createElement('div');
  av.style.cssText = side === 'user'
    ? 'width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:700;color:var(--t-2);flex-shrink:0;margin-top:1px'
    : 'width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#5E6AD2,#8b8ff8);display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:700;color:white;flex-shrink:0;margin-top:1px';
  av.textContent = side === 'user' ? 'Y' : 'AC';
  const bubble = document.createElement('div');
  bubble.style.cssText = side === 'user'
    ? 'background:var(--accent);opacity:0.88;border-radius:8px 0 8px 8px;padding:8px 10px;font-size:11px;color:white;line-height:1.55;max-width:88%'
    : 'background:rgba(255,255,255,0.05);border:1px solid var(--line);border-radius:0 8px 8px 8px;padding:8px 10px;font-size:11px;color:var(--t-2);line-height:1.55;max-width:88%';
  bubble.textContent = text;
  wrap.appendChild(av);
  wrap.appendChild(bubble);
  return { wrap, bubble };
}

function pvMockSend() {
  const input = document.getElementById('pv-mock-input');
  const chat  = document.getElementById('pv-mock-chat');
  const text  = (input.value || '').trim();
  if (!text) return;
  input.value = '';

  // User bubble
  chat.appendChild(pvBubble('user', text).wrap);
  chat.scrollTop = chat.scrollHeight;

  // Typing indicator
  const typing = document.createElement('div');
  typing.style.cssText = 'display:flex;gap:7px;align-items:flex-start';
  const tav = document.createElement('div');
  tav.style.cssText = 'width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#5E6AD2,#8b8ff8);display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:700;color:white;flex-shrink:0;margin-top:1px';
  tav.textContent = 'AC';
  const tbub = document.createElement('div');
  tbub.style.cssText = 'background:rgba(255,255,255,0.05);border:1px solid var(--line);border-radius:0 8px 8px 8px;padding:8px 12px;font-size:13px;color:var(--t-3);letter-spacing:2px';
  tbub.textContent = '···';
  typing.appendChild(tav);
  typing.appendChild(tbub);
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const r = PV_MOCK_REPLIES[pvMockRound % PV_MOCK_REPLIES.length];
    pvMockRound++;

    const reply = pvBubble('ai', r.text);
    const scores = document.createElement('div');
    scores.style.cssText = 'display:flex;gap:10px;margin-top:5px;font-size:10px;color:var(--t-3)';
    const parts = [['Technical', r.t], ['Structure', r.s], ['Confidence', r.c]];
    parts.forEach(([label, n], i) => {
      if (i > 0) scores.appendChild(document.createTextNode(' · '));
      scores.appendChild(document.createTextNode(label + ' '));
      const span = document.createElement('span');
      span.style.cssText = 'color:' + (n >= 8 ? 'var(--green)' : '#e0a820') + ';font-weight:600';
      span.textContent = n + '/10';
      scores.appendChild(span);
    });
    reply.bubble.appendChild(scores);
    chat.appendChild(reply.wrap);
    chat.scrollTop = chat.scrollHeight;
  }, 1000);
}

/* ─── ROI CALCULATOR ─────────────────── */
const PLANS = [{ name:'Weekly', cost:3.99 }, { name:'Monthly', cost:10 }, { name:'Lifetime', cost:100 }];
function calcROI() {
  const salaryEl = document.getElementById('roi-salary');
  const bonusEl  = document.getElementById('roi-bonus');
  const yearsEl = document.getElementById('roi-years');
  const planEl  = document.getElementById('roi-plan');
  if (!salaryEl || !bonusEl || !yearsEl || !planEl) return;

  const salary = parseInt(salaryEl.value) || 0;
  const bonus  = parseInt(bonusEl.value) || 0;
  const years  = parseInt(yearsEl.value) || 1;
  const planI  = parseInt(planEl.value) || 0;
  const plan   = PLANS[planI] || PLANS[0];

  const salaryLabel = document.getElementById('roi-salary-label');
  const bonusLabel = document.getElementById('roi-bonus-label');
  const yearsLabel = document.getElementById('roi-years-label');
  const planLabel = document.getElementById('roi-plan-label');
  if (salaryLabel) salaryLabel.textContent = '$' + salary.toLocaleString();
  if (bonusLabel) bonusLabel.textContent = '$' + bonus.toLocaleString();
  if (yearsLabel) yearsLabel.textContent = years + (years === 1 ? ' year' : ' years');
  if (planLabel) planLabel.textContent = plan.name;

  const totalEarn = salary * years + bonus;
  const cost = plan.cost || 1;
  const multiple = cost ? Math.round(totalEarn / cost) : 0;

  const earnEl = document.getElementById('roi-total-earn');
  const costEl = document.getElementById('roi-cost');
  const multEl = document.getElementById('roi-multiple');
  const subEl = document.getElementById('roi-sub');
  if (earnEl) earnEl.textContent = '$' + totalEarn.toLocaleString();
  if (costEl) costEl.textContent = '$' + cost.toLocaleString();
  if (multEl) multEl.textContent = multiple.toLocaleString() + '×';
  if (subEl) subEl.textContent = 'every $1 spent on Superday returns $' + (cost ? Math.round(totalEarn / cost).toLocaleString() : '0') + ' in earnings';
}

/* ─── FAQ ────────────────────────────── */
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

/* ─── LANDING DEMO: QUESTION BANK ─────── */
function demoToggleQ(el) {
  const ans = el.querySelector('.demo-q-ans');
  const caret = el.querySelector('span[style*="font-size:11px"]');
  const isOpen = ans.style.display !== 'none';
  // close all
  document.querySelectorAll('#demo-qb-list .demo-q-ans').forEach(a => a.style.display = 'none');
  document.querySelectorAll('#demo-qb-list .qb-item').forEach(i => i.style.background = '');
  if (!isOpen) {
    ans.style.display = 'block';
    el.style.background = 'rgba(94,106,210,0.06)';
  }
}
function demoFilterBank(pill, cat) {
  document.querySelectorAll('.qb-toolbar .qb-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  document.querySelectorAll('#demo-qb-list .demo-q-row').forEach(row => {
    if (cat === 'all' || row.getAttribute('data-qcat') === cat) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

/* ─── LANDING DEMO: FLASHCARDS ─────────── */
const DEMO_CARDS = [
  { cat:'Technical — Valuation', q:'What is the difference between equity value and enterprise value?',
    a:'Equity value (market cap) = what belongs to shareholders. Enterprise value = equity value + net debt (debt minus cash). EV represents the full cost to acquire the business. EV is used in operating multiples (EV/EBITDA) because EBITDA is pre-debt; equity value in equity multiples (P/E) because net income is post-debt.',
    tip:'A company can have a higher EV than equity value (net debt > 0) or lower (net cash position).' },
  { cat:'Technical — Accounting', q:'Walk me through the three financial statements.',
    a:'Income Statement: revenue minus expenses = net income. Balance Sheet: snapshot of assets = liabilities + equity. Cash Flow Statement: starts with net income, adjusts for non-cash items and working capital changes to show actual cash movement. Net income flows into retained earnings on the BS.',
    tip:'Always be ready to draw the linkages — this is the most fundamental IB concept.' },
  { cat:'Technical — Valuation', q:'Walk me through a DCF analysis.',
    a:'(1) Project unlevered FCF for 5–10 years. (2) Calculate terminal value using Gordon Growth or exit multiple. (3) Discount all cash flows at WACC. (4) Sum to get enterprise value. (5) Subtract net debt to get equity value. (6) Divide by diluted shares for implied share price.',
    tip:'Be prepared to discuss WACC components and why you pick a specific terminal growth rate.' },
  { cat:'Technical — Accounting', q:'If depreciation increases by $10, walk through the impact.',
    a:'IS: Pre-tax income ↓$10, tax expense ↓$3.50 (35% rate), net income ↓$6.50. CFS: Net income ↓$6.50 but D&A is added back (+$10), so OCF ↑$3.50. BS: PP&E ↓$10 (net of depreciation), cash ↑$3.50, retained earnings ↓$6.50 — still balances.',
    tip:'Memorise this cold — it appears in almost every technical interview.' },
  { cat:'Technical — Valuation', q:'What is WACC and how do you calculate it?',
    a:'WACC = (E/V × Ke) + (D/V × Kd × (1-t)). E = equity, D = debt, V = E+D. Ke = cost of equity via CAPM (Rf + β × ERP). Kd = cost of debt (yield to maturity). The (1-t) tax shield reflects that interest is tax-deductible. Use market values, not book values.',
    tip:'Higher beta = higher WACC = lower DCF value. Know why each component moves.' },
];
let demoFCIndex = 0, demoFCFlipped = false, demoFCOrder = [0,1,2,3,4];

function demoFCRender() {
  const catEl = document.getElementById('demo-fc-cat');
  const qEl = document.getElementById('demo-fc-q');
  if (!catEl || !qEl) return;

  const i = demoFCOrder[demoFCIndex];
  const c = DEMO_CARDS[i];
  if (!c) return;

  catEl.textContent = c.cat;
  qEl.textContent = c.q;
  const aEl = document.getElementById('demo-fc-a');
  const tipEl = document.getElementById('demo-fc-tip');
  const labelEl = document.getElementById('demo-fc-label');
  const progEl = document.getElementById('demo-fc-prog');
  if (aEl) aEl.textContent = c.a;
  if (tipEl) tipEl.textContent = 'Tip — ' + c.tip;
  const pct = Math.round((demoFCIndex / DEMO_CARDS.length) * 100);
  if (labelEl) labelEl.textContent = c.cat.split('—')[1]?.trim().toUpperCase() + ' · Card ' + (demoFCIndex+1) + ' of ' + DEMO_CARDS.length;
  if (progEl) progEl.textContent = pct + '% complete';
  // reset flip
  demoFCFlipped = false;
  const card = document.getElementById('demo-fc-card');
  if (card) card.style.transform = 'rotateY(0deg)';
}
function demoFlipCard() {
  demoFCFlipped = !demoFCFlipped;
  const card = document.getElementById('demo-fc-card');
  if (card) card.style.transform = demoFCFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
}
function demoFCNav(dir) {
  demoFCIndex = (demoFCIndex + dir + DEMO_CARDS.length) % DEMO_CARDS.length;
  demoFCRender();
}
function demoFCShuffle() {
  for (let i = demoFCOrder.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [demoFCOrder[i], demoFCOrder[j]] = [demoFCOrder[j], demoFCOrder[i]];
  }
  demoFCIndex = 0;
  demoFCRender();
}

/* ─── LANDING DEMO: MOCK INTERVIEW ──────── */
const DEMO_RESPONSES = [
  { score: { tech: 8, struct: 9, conf: 7 }, follow: 'Good. Now — what discount rate would you use, and why? Walk me through how you\'d derive your WACC.' },
  { score: { tech: 7, struct: 8, conf: 8 }, follow: 'Solid. Let\'s push further — what happens to your DCF valuation if the terminal growth rate increases by 1%?' },
  { score: { tech: 9, struct: 8, conf: 7 }, follow: 'Strong technical answer. One more — how do precedent transactions typically compare to public comps in terms of valuation, and why?' },
];
let demoChatRound = 0;

function demoChatBubble(side, text) {
  const wrap = document.createElement('div');
  wrap.className = side === 'user' ? 'chat-msg user' : 'chat-msg';
  const av = document.createElement('div');
  av.className = side === 'user' ? 'cm-av usr' : 'cm-av ai';
  av.textContent = side === 'user' ? 'Y' : 'GS';
  const bubble = document.createElement('div');
  bubble.className = side === 'user' ? 'cm-bubble usr' : 'cm-bubble ai';
  bubble.textContent = text;
  wrap.appendChild(av);
  wrap.appendChild(bubble);
  return { wrap, bubble };
}

function demoChatSend() {
  const input = document.getElementById('demo-chat-input');
  const body = document.getElementById('demo-chat-body');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  body.appendChild(demoChatBubble('user', text).wrap);
  body.scrollTop = body.scrollHeight;

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'chat-msg';
  const tav = document.createElement('div');
  tav.className = 'cm-av ai';
  tav.textContent = 'AC';
  const tbub = document.createElement('div');
  tbub.className = 'cm-bubble ai';
  for (let i = 0; i < 3; i++) {
    const d = document.createElement('span');
    d.className = 'tdot';
    tbub.appendChild(d);
  }
  typing.appendChild(tav);
  typing.appendChild(tbub);
  body.appendChild(typing);
  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const r = DEMO_RESPONSES[demoChatRound % DEMO_RESPONSES.length];
    demoChatRound++;

    const answer = demoChatBubble('ai', 'Good answer. ');
    const scoreBlock = document.createElement('div');
    scoreBlock.className = 'score-block';
    scoreBlock.style.marginTop = '6px';
    const lines = [
      ['Technical Accuracy', r.score.tech],
      ['Structure & Clarity', r.score.struct],
      ['Confidence',          r.score.conf]
    ];
    for (const [label, val] of lines) {
      const line = document.createElement('div');
      line.className = 'score-line';
      const lbl = document.createElement('span');
      lbl.className = 'sc-label';
      lbl.textContent = label;
      const v = document.createElement('span');
      v.className = 'sc-val ' + (val >= 8 ? 'sc-g' : 'sc-y');
      v.textContent = val + '/10';
      line.appendChild(lbl);
      line.appendChild(v);
      scoreBlock.appendChild(line);
    }
    answer.bubble.appendChild(scoreBlock);
    body.appendChild(answer.wrap);

    body.appendChild(demoChatBubble('ai', r.follow).wrap);
    body.scrollTop = body.scrollHeight;
  }, 1200);
}

/* ─── TOAST + LIGHTWEIGHT MODAL ────────── */
function showToast(msg, opts) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  if (opts && opts.icon) {
    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.textContent = opts.icon;
    toast.appendChild(icon);
  }
  const body = document.createElement('span');
  body.className = 'toast-msg';
  body.textContent = msg;
  toast.appendChild(body);
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  const ms = (opts && opts.ms) || 2800;
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, ms);
}

function showInfoModal(title, body) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:11000;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;padding:20px';
  const card = document.createElement('div');
  card.style.cssText = 'background:var(--bg-2);border:1px solid var(--line-2);border-radius:var(--r-lg);max-width:520px;width:100%;max-height:80vh;overflow:auto;padding:22px 24px;box-shadow:0 30px 80px rgba(0,0,0,0.4)';
  const h = document.createElement('div');
  h.style.cssText = 'font-size:15px;font-weight:600;color:var(--t);margin-bottom:10px;letter-spacing:-0.01em';
  h.textContent = title;
  const p = document.createElement('div');
  p.style.cssText = 'font-size:13px;color:var(--t-2);line-height:1.55;white-space:pre-wrap';
  p.textContent = body;
  const actions = document.createElement('div');
  actions.style.cssText = 'margin-top:18px;text-align:right';
  const close = document.createElement('button');
  close.className = 'quiz-btn primary';
  close.textContent = 'Close';
  close.addEventListener('click', () => overlay.remove());
  actions.appendChild(close);
  card.appendChild(h);
  card.appendChild(p);
  card.appendChild(actions);
  overlay.appendChild(card);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

/* ─── EXPOSE GLOBALS FOR INLINE HANDLERS ─── */
// Hoisted above Supabase init so a missing/broken Supabase client can never
// strand inline onclick="fn()" handlers as silent no-ops.
Object.assign(window, {
  addNewStory, calcROI, closeLearnModule,
  dashHeroAction,
  demoChatSend, demoFilterBank, demoFlipCard, demoFCNav, demoFCShuffle, demoToggleQ,
  doForgotPassword, doLogin, doSetNewPassword, doSignOut, doSignup,
  flipCard,
  navScrollTo, nextCard, nextLearnSection,
  openLearnModule, prevCard, prevLearnSection, prevNav,
  pvBankFilter, pvFlipCard, pvFCNav, pvMockSend, pvToggleQ, rateCard,
  saveProfileInfo, saveProfilePassword,
  sendMsg, setFlashCat, setNavActive, setStudyMode,
  showAuthTab, showForgotPassword, startCheckout, openSubscriptionPortal,
  openInlineAuth, closeInlineAuth, switchInlineAuthTab, doInlineLogin, doInlineSignup,
  showScreen, showView, shuffleFlash, smartPractice,
  askForHint, startMock, stepMockMode, syncRailOpt, endInterview,
  switchAuthTab, toggleFaq,
  toggleProfileEdit, toggleStoryPanel, toggleTheme, toggleCardWhy,
  viewStoryNote
});

/* ─── SUPABASE ────────────────────────── */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
let sb = null;
try {
  sb = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { lock: (_name, _timeout, fn) => fn() }
  });
} catch (e) {
  console.error('Supabase init failed — check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local.', e);
}

function requireSupabase() {
  if (sb) return true;
  showToast('Supabase not configured — check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local.', { icon: 'ℹ' });
  return false;
}

function renderConfigBanner() {
  if (sb) return;
  if (document.getElementById('config-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'config-banner';
  banner.setAttribute('role', 'alert');
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:12000;background:#b91c1c;color:#fff;padding:10px 16px;font:13px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.2)';
  banner.textContent = 'Supabase not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local, then restart the dev server.';
  document.body.appendChild(banner);
}

let currentUser = null;

/* ─── AUTH HELPERS ───────────────────── */
function showAuthTab(tab) {
  switchAuthTab(tab);
  showScreen('auth');
}

function switchAuthTab(tab) {
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const loginForm = document.getElementById('auth-login-form');
  const signupForm = document.getElementById('auth-signup-form');
  const forgotForm = document.getElementById('auth-forgot-form');
  const newpwForm = document.getElementById('auth-newpw-form');
  if (tabLogin) tabLogin.classList.toggle('active', tab === 'login');
  if (tabSignup) tabSignup.classList.toggle('active', tab === 'signup');
  if (loginForm) loginForm.style.display = tab === 'login' ? 'block' : 'none';
  if (signupForm) signupForm.style.display = tab === 'signup' ? 'block' : 'none';
  if (forgotForm) forgotForm.style.display = 'none';
  if (newpwForm) newpwForm.style.display = 'none';
}

function showForgotPassword() {
  const loginForm = document.getElementById('auth-login-form');
  const forgotForm = document.getElementById('auth-forgot-form');
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  if (loginForm) loginForm.style.display = 'none';
  if (forgotForm) forgotForm.style.display = 'block';
  if (tabLogin) tabLogin.classList.remove('active');
  if (tabSignup) tabSignup.classList.remove('active');
}

async function doForgotPassword() {
  const emailEl = document.getElementById('forgot-email');
  const email = emailEl ? emailEl.value.trim() : '';
  const btn = document.getElementById('forgot-btn');
  const msg = document.getElementById('forgot-msg');
  if (!email) { if (msg) showMsg(msg, 'error', 'Please enter your email.'); return; }
  if (!requireSupabase()) return;
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  const { error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin
  });
  if (btn) { btn.disabled = false; btn.textContent = 'Send reset link →'; }
  if (error) { if (msg) showMsg(msg, 'error', error.message); return; }
  if (msg) showMsg(msg, 'success', 'Check your email for a reset link.');
}

async function doSetNewPassword() {
  const pwEl = document.getElementById('newpw-password');
  const confirmEl = document.getElementById('newpw-confirm');
  const pw = pwEl ? pwEl.value : '';
  const confirm = confirmEl ? confirmEl.value : '';
  const btn = document.getElementById('newpw-btn');
  const msg = document.getElementById('newpw-msg');
  if (pw.length < 8) { if (msg) showMsg(msg, 'error', 'Password must be at least 8 characters.'); return; }
  if (pw !== confirm) { if (msg) showMsg(msg, 'error', 'Passwords do not match.'); return; }
  if (!requireSupabase()) return;
  if (btn) { btn.disabled = true; btn.textContent = 'Updating…'; }
  const { error } = await sb.auth.updateUser({ password: pw });
  if (btn) { btn.disabled = false; btn.textContent = 'Update password →'; }
  if (error) { if (msg) showMsg(msg, 'error', error.message); return; }
  if (msg) showMsg(msg, 'success', 'Password updated! Logging you in…');
  setTimeout(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) onSignedIn(session.user);
    });
  }, 1200);
}

async function doLogin() {
  const emailEl = document.getElementById('login-email');
  const passwordEl = document.getElementById('login-password');
  const email = emailEl ? emailEl.value.trim() : '';
  const password = passwordEl ? passwordEl.value : '';
  const btn = document.getElementById('login-btn');
  const msg = document.getElementById('login-msg');
  if (msg) { msg.className = 'auth-msg'; msg.textContent = ''; }
  if (!email || !password) { if (msg) showMsg(msg, 'error', 'Please fill in all fields.'); return; }
  if (!requireSupabase()) return;
  if (btn) { btn.disabled = true; btn.textContent = 'Logging in…'; }
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (btn) { btn.disabled = false; btn.textContent = 'Log in →'; }
  if (error) { if (msg) showMsg(msg, 'error', error.message); return; }
  try {
    await onSignedIn(data.user);
  } catch (e) {
    console.error('onSignedIn error:', e);
    if (msg) showMsg(msg, 'error', 'Signed in, but something went wrong loading your data. Refresh the page.');
  }
}

async function doSignup() {
  const nameEl = document.getElementById('signup-name');
  const emailEl = document.getElementById('signup-email');
  const passwordEl = document.getElementById('signup-password');
  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const password = passwordEl ? passwordEl.value : '';
  const btn = document.getElementById('signup-btn');
  const msg = document.getElementById('signup-msg');
  if (msg) { msg.className = 'auth-msg'; msg.textContent = ''; }
  if (!name || !email || !password) { if (msg) showMsg(msg, 'error', 'Please fill in all fields.'); return; }
  if (password.length < 8) { if (msg) showMsg(msg, 'error', 'Password must be at least 8 characters.'); return; }
  if (!requireSupabase()) return;
  if (btn) { btn.disabled = true; btn.textContent = 'Creating account…'; }
  const { data, error } = await sb.auth.signUp({
    email, password,
    options: {
      data: { full_name: name },
      emailRedirectTo: window.location.origin
    }
  });
  if (btn) { btn.disabled = false; btn.textContent = 'Create account →'; }
  if (error) { if (msg) showMsg(msg, 'error', error.message); return; }
  if (data.user && !data.session) {
    if (msg) showMsg(msg, 'success', 'Check your email to confirm your account, then log in.');
    return;
  }
  await onSignedIn(data.user);
}

/* ─── INLINE AUTH (hero whitespace) ───── */
function openInlineAuth(tab, prefillEmail) {
  const panel = document.getElementById('hero-auth-inline');
  const preview = document.querySelector('.hero-preview');
  if (!panel) return;
  if (preview) preview.style.display = 'none';
  panel.style.display = 'flex';
  switchInlineAuthTab(tab || 'signup');
  if (prefillEmail) {
    const target = (tab === 'login') ? 'inline-login-email' : 'inline-signup-email';
    const el = document.getElementById(target);
    if (el && !el.value) el.value = prefillEmail;
  }
  // Make sure the panel is in view on long pages.
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  // Focus the first empty field.
  setTimeout(() => {
    const first = panel.querySelector('input:not([type=hidden])');
    if (first && !first.value) first.focus();
  }, 250);
}

function closeInlineAuth() {
  const panel = document.getElementById('hero-auth-inline');
  const preview = document.querySelector('.hero-preview');
  if (panel) panel.style.display = 'none';
  if (preview) preview.style.display = '';
}

function switchInlineAuthTab(tab) {
  const tabLogin = document.getElementById('inline-tab-login');
  const tabSignup = document.getElementById('inline-tab-signup');
  const loginForm = document.getElementById('inline-login-form');
  const signupForm = document.getElementById('inline-signup-form');
  if (tabLogin) tabLogin.classList.toggle('active', tab === 'login');
  if (tabSignup) tabSignup.classList.toggle('active', tab === 'signup');
  if (loginForm) loginForm.style.display = tab === 'login' ? 'block' : 'none';
  if (signupForm) signupForm.style.display = tab === 'signup' ? 'block' : 'none';
}

async function doInlineLogin() {
  const email = document.getElementById('inline-login-email')?.value?.trim() || '';
  const password = document.getElementById('inline-login-password')?.value || '';
  const btn = document.getElementById('inline-login-btn');
  const msg = document.getElementById('inline-login-msg');
  if (msg) { msg.className = 'auth-msg'; msg.textContent = ''; }
  if (!email || !password) { if (msg) showMsg(msg, 'error', 'Please fill in all fields.'); return; }
  if (!requireSupabase()) return;
  if (btn) { btn.disabled = true; btn.textContent = 'Logging in…'; }
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (btn) { btn.disabled = false; btn.textContent = 'Log in →'; }
  if (error) { if (msg) showMsg(msg, 'error', error.message); return; }
  try {
    await onSignedIn(data.user);
  } catch (e) {
    console.error('onSignedIn error:', e);
    if (msg) showMsg(msg, 'error', 'Signed in, but something went wrong loading your data. Refresh the page.');
  }
}

async function doInlineSignup() {
  const name = document.getElementById('inline-signup-name')?.value?.trim() || '';
  const email = document.getElementById('inline-signup-email')?.value?.trim() || '';
  const password = document.getElementById('inline-signup-password')?.value || '';
  const btn = document.getElementById('inline-signup-btn');
  const msg = document.getElementById('inline-signup-msg');
  if (msg) { msg.className = 'auth-msg'; msg.textContent = ''; }
  if (!name || !email || !password) { if (msg) showMsg(msg, 'error', 'Please fill in all fields.'); return; }
  if (password.length < 8) { if (msg) showMsg(msg, 'error', 'Password must be at least 8 characters.'); return; }
  if (!requireSupabase()) return;
  if (btn) { btn.disabled = true; btn.textContent = 'Creating account…'; }
  const { data, error } = await sb.auth.signUp({
    email, password,
    options: {
      data: { full_name: name },
      emailRedirectTo: window.location.origin
    }
  });
  if (btn) { btn.disabled = false; btn.textContent = 'Create account →'; }
  if (error) { if (msg) showMsg(msg, 'error', error.message); return; }
  if (data.user && !data.session) {
    if (msg) showMsg(msg, 'success', 'Check your email to confirm your account, then log in.');
    return;
  }
  await onSignedIn(data.user);
}

async function doSignOut() {
  if (!requireSupabase()) return;
  await sb.auth.signOut();
  currentUser = null;
  progress = {
    answered: new Set(),
    activityLog: [],
    mastery: {},
    notes: [],
    questionNotes: {},
    learnProgress: {},
    mockHistory: []
  };
  // Clear mock-interview state so the next user on a shared device doesn't
  // inherit the previous user's history, session id, or rendered messages.
  mockHistory = [];
  mockActive = false;
  mockSessionId = null;
  mockQuestionsAsked = 0;
  const chatBody = document.getElementById('chat-body');
  if (chatBody) chatBody.replaceChildren();
  const ivBadge = document.getElementById('iv-badge');
  if (ivBadge) { ivBadge.className = 'iv-badge badge-idle'; ivBadge.textContent = '● IDLE'; }
  showScreen('landing');
}

function showMsg(el, type, text) {
  if (!el) return;
  el.className = 'auth-msg ' + type;
  el.textContent = text;
}

async function onSignedIn(user) {
  currentUser = user;
  const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const cap = capitalize(fullName.split(' ')[0]);
  const greetingEl = document.getElementById('greeting-name');
  const greetingWrap = document.getElementById('greeting-name-wrap');
  const sbNameEl = document.getElementById('sb-name');
  const sbAvatarEl = document.getElementById('sb-avatar');
  if (greetingEl) greetingEl.textContent = cap;
  // Reveal the ", Name" comma-prefix only once we have a real name to show.
  if (greetingWrap) greetingWrap.style.display = '';
  if (sbNameEl) sbNameEl.textContent = cap;
  if (sbAvatarEl) sbAvatarEl.textContent = cap[0].toUpperCase();
  const emailEl = document.getElementById('sb-email-display');
  if (emailEl) emailEl.textContent = user.email;

  // Subscription gate. Coming back from Stripe Checkout there's a webhook race
  // where the user is on the success URL before our DB row reflects the sub —
  // the ?paid=1 flag tells us to poll briefly instead of bouncing them.
  const params = new URLSearchParams(window.location.search);
  const expectingPaid = params.get('paid') === '1';
  let isActive = await hasActiveSubscription();
  if (!isActive && expectingPaid) {
    routeToPaywall(user);
    const msg = document.getElementById('paywall-msg');
    if (msg) { msg.style.color = 'var(--t-3)'; msg.textContent = 'Confirming your subscription…'; }
    for (let i = 0; i < 10 && !isActive; i++) {
      await new Promise(r => setTimeout(r, 1500));
      isActive = await hasActiveSubscription();
    }
    if (msg) {
      if (isActive) {
        msg.style.color = '';
        msg.textContent = '';
      } else {
        // Webhook lagged past 15s — Stripe occasionally takes longer during
        // their own incidents. Don't silently dump the user back on the
        // paywall (looks like the payment failed); show a clear message and
        // a refresh affordance. Built via DOM API, never innerHTML.
        msg.style.color = '';
        msg.textContent = 'Payment received — confirming with Stripe. This can take up to a minute.';
        const wrap = document.createElement('div');
        wrap.style.cssText = 'margin-top:12px;display:flex;justify-content:center;gap:8px;flex-wrap:wrap';
        const refreshBtn = document.createElement('button');
        refreshBtn.type = 'button';
        refreshBtn.className = 'pricing-btn ghost';
        refreshBtn.style.cssText = 'padding:8px 18px;font-size:12px';
        refreshBtn.textContent = 'Refresh';
        refreshBtn.addEventListener('click', () => window.location.reload());
        const helpLink = document.createElement('a');
        helpLink.href = 'mailto:help@superday.com';
        helpLink.textContent = 'Contact support';
        helpLink.style.cssText = 'padding:8px 18px;font-size:12px;color:var(--t-3);text-decoration:underline;align-self:center';
        wrap.appendChild(refreshBtn);
        wrap.appendChild(helpLink);
        msg.appendChild(wrap);
      }
    }
  }
  if (expectingPaid && window.history?.replaceState) {
    const u = new URL(window.location.href);
    u.searchParams.delete('paid');
    window.history.replaceState({}, '', u.toString());
  }

  if (!isActive) {
    routeToPaywall(user);
    return;
  }

  showScreen('app');
  try {
    await loadProgress();
  } catch (e) {
    console.error('loadProgress failed:', e);
  }
}

/* ─── PAYMENTS / SUBSCRIPTIONS ───────── */
async function hasActiveSubscription() {
  if (!currentUser) return false;
  try {
    const { data, error } = await sb
      .from('subscriptions')
      .select('plan,status,current_period_end')
      .eq('user_id', currentUser.id)
      .maybeSingle();
    if (error || !data) return false;
    if (data.plan === 'lifetime' && data.status === 'active') return true;
    if (data.status !== 'active' && data.status !== 'trialing') return false;
    if (data.current_period_end && new Date(data.current_period_end) <= new Date()) return false;
    return true;
  } catch (e) {
    console.error('subscription check failed:', e);
    return false;
  }
}

function routeToPaywall(user) {
  // PRD §5 Task 12: paywall must never show "signed in as ." with an empty
  // span. If we don't actually have a user, send them to auth instead — the
  // paywall has no meaningful action without a signed-in user anyway.
  if (!user) {
    showAuthTab('login');
    return;
  }
  const emailSpan = document.getElementById('paywall-email');
  if (emailSpan) emailSpan.textContent = user.email || '';
  showScreen('paywall');
}

async function startCheckout(plan) {
  const msg = document.getElementById('paywall-msg');
  const btnIds = { weekly: 'paywall-btn-weekly', monthly: 'paywall-btn-monthly', lifetime: 'paywall-btn-lifetime' };
  const btn = document.getElementById(btnIds[plan]);
  const original = btn ? btn.textContent : '';
  if (msg) { msg.style.color = ''; msg.textContent = ''; }
  if (btn) { btn.disabled = true; btn.textContent = 'Redirecting…'; }
  try {
    if (!requireSupabase()) throw new Error('Supabase not configured.');
    const { data: { session } } = await sb.auth.getSession();
    const accessToken = session?.access_token;
    if (!accessToken) throw new Error('Please sign in again.');
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken },
      body: JSON.stringify({ plan })
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.error || 'Could not start checkout.');
    }
    const { url } = await res.json();
    if (!url) throw new Error('Checkout URL missing.');
    window.location.href = url;
  } catch (e) {
    if (msg) msg.textContent = e.message || 'Could not start checkout.';
    if (btn) { btn.disabled = false; btn.textContent = original; }
  }
}

async function openSubscriptionPortal() {
  if (!requireSupabase()) return;
  try {
    const { data: { session } } = await sb.auth.getSession();
    const accessToken = session?.access_token;
    if (!accessToken) return;
    const res = await fetch('/api/portal', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    if (!res.ok) return;
    const { url } = await res.json();
    if (url) window.location.href = url;
  } catch (e) {
    console.error('portal error:', e);
  }
}

/* ─── PROGRESS PERSISTENCE ───────────────── */
async function loadProgress() {
  if (!currentUser) return;
  try {
    const { data, error } = await sb.from('progress').select('*').eq('user_id', currentUser.id).single();
    if (error && error.code === 'PGRST116') {
      await sb.from('progress').insert({ user_id: currentUser.id });
    } else if (error) {
      console.error('loadProgress query error:', error);
    }
    if (data) {
      const arr = v => Array.isArray(v) ? v : [];
      const obj = v => (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
      progress.answered = new Set(arr(data.answered));
      progress.activityLog = arr(data.activity_log);
      progress.mastery = obj(data.mastery);
      progress.notes = arr(data.notes);
      progress.questionNotes = obj(data.question_notes);
      progress.learnProgress = obj(data.learn_progress);
      progress.mockHistory = arr(data.mock_history);
    }
  } catch(e) { console.error('loadProgress error:', e); }
  updateDashStats();
  updateMasteryStats();
  // Notes button is part of the app chrome — always visible once signed in.
  document.getElementById('story-bank-btn')?.classList.add('show');
}

async function saveProgress() {
  if (!currentUser) return;
  try {
    await sb.from('progress').upsert({
      user_id: currentUser.id,
      answered: [...progress.answered],
      activity_log: progress.activityLog,
      mastery: progress.mastery,
      notes: progress.notes || [],
      question_notes: progress.questionNotes || {},
      learn_progress: progress.learnProgress || {},
      mock_history: progress.mockHistory || []
    }, { onConflict: 'user_id' });
  } catch(e) { console.error('saveProgress error:', e); }
}

/* ─── SCREENS ────────────────────────── */
function showScreen(id) {
  // Defense in depth: the app shell must never render without an authenticated
  // user. Server endpoints (/api/claude, RLS on every table) are the real gate,
  // but blocking the chrome here stops devtools-poking users from seeing UI
  // they have no way to actually use.
  if (id === 'app' && !currentUser) id = 'landing';
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById('screen-' + id);
  if (!screen) return;
  screen.classList.add('active');
  if (id === 'app') {
    const d = new Date();
    const el = document.getElementById('dash-date');
    if (el) el.textContent = d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
    updateDashStats();
    loadNews();
    // Background recheck: if the user's subscription lapsed since onSignedIn
    // (renewal failure, manual cancel from another tab, support refund), bounce
    // them. Cheap — one Supabase select. The server still 402s any /api/claude
    // call, so this is purely UX hardening.
    hasActiveSubscription().then(active => {
      if (!active && currentUser) routeToPaywall(currentUser);
    }).catch(() => {});
  }
}

function ctaSignup() {
  const ctaEmail = document.getElementById('cta-email');
  const email = ctaEmail ? ctaEmail.value.trim() : '';
  openInlineAuth('signup', email);
}

function capitalize(s) { return (s && typeof s === 'string') ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

/* ─── VIEWS ──────────────────────────── */
function showView(id) {
  document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.sb-item').forEach(n => n.classList.remove('active'));
  const view = document.getElementById('view-' + id);
  if (view) view.classList.add('active');
  const labels = { dashboard: 'Dashboard', flash: 'Flashcards', mock: 'Mock Interview', video: 'Video Interview', learn: 'Concepts', profile: 'Profile' };
  document.querySelectorAll('.sb-item').forEach(n => {
    if (n.textContent.trim().toLowerCase().includes((labels[id] || id).toLowerCase())) n.classList.add('active');
  });
  if (id === 'flash') initFlash();
  if (id === 'learn') renderLearnModules();
  if (id === 'mock') renderMockModeBanner();
  if (id === 'profile') renderProfile();
}

/* ─── PROGRESS ───────────────────────── */
// Mastery levels: 0 = new, 1 = missed, 2 = unsure, 3 = got it (mastered after 3 consecutive)
// SRS intervals in minutes: [1, 10, 60, 360, 1440, 4320, 10080] (1min to 1 week)
const SRS_INTERVALS = [1, 10, 60, 360, 1440, 4320, 10080];

let progress = {
  answered: new Set(),
  activityLog: [],
  mastery: {},
  notes: [],
  questionNotes: {},
  learnProgress: {},
  mockHistory: []
};

let studyMode = 'all'; // 'all', 'due', 'weak', 'quick'
let sessionTimer = null;
let sessionStartTime = null;

function getMastery(id) {
  if (!progress.mastery[id]) {
    progress.mastery[id] = { level: 0, streak: 0, lastSeen: null, nextDue: null };
  }
  return progress.mastery[id];
}

function getMasteryClass(id) {
  const m = getMastery(id);
  if (m.level === 0 && m.streak === 0) return 'new';
  if (m.level >= 3 || m.streak >= 3) return 'mastered';
  return 'learning';
}

function isDue(id) {
  const m = getMastery(id);
  if (!m.nextDue) return false;
  return Date.now() >= m.nextDue;
}

function isWeak(id) {
  const m = getMastery(id);
  return m.level === 1 || m.level === 2;
}

function getDueCount() {
  return QUESTIONS.filter(q => isDue(q.id)).length;
}

function getWeakCount() {
  return QUESTIONS.filter(q => isWeak(q.id)).length;
}

function updateMasteryStats() {
  let newCount = 0, learningCount = 0, masteredCount = 0;
  QUESTIONS.forEach(q => {
    const cls = getMasteryClass(q.id);
    if (cls === 'new') newCount++;
    else if (cls === 'learning') learningCount++;
    else masteredCount++;
  });
  
  const sn = document.getElementById('stat-new');
  const sl = document.getElementById('stat-learning');
  const sm = document.getElementById('stat-mastered');
  if (sn) sn.textContent = newCount;
  if (sl) sl.textContent = learningCount;
  if (sm) sm.textContent = masteredCount;
  
  // Update mode counts. "All cards" reflects whatever the current deck is —
  // category filter + sub filter + at-your-level filter — so the toolbar pill
  // count and the "Card X of Y" footer stay in lockstep.
  const mca = document.getElementById('mode-count-all');
  const mcd = document.getElementById('mode-count-due');
  const mcw = document.getElementById('mode-count-weak');
  if (mca) mca.textContent = flashDeck.length || QUESTIONS.length;
  if (mcd) mcd.textContent = getDueCount();
  if (mcw) mcw.textContent = getWeakCount();
}

function markAnswered(id) {
  progress.answered.add(id);
  const q = QUESTIONS.find(x => x.id === id);
  if (q) {
    progress.activityLog.unshift({ cat: q.cat, title: q.q, time: 'Just now' });
    if (progress.activityLog.length > 6) progress.activityLog.pop();
  }
  updateDashStats();
  saveProgress();
}

// Map a calibration topic onto the practice surface's cat/sub filter so
// clicking a Levels-tile row routes the user to the right deck.
function relativeTime(ms) {
  if (!ms || !Number.isFinite(ms)) return 'just now';
  const diff = Date.now() - ms;
  if (diff < 60_000) return 'just now';
  const min = Math.floor(diff / 60_000);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ms).toLocaleDateString();
}

// Hero "next step" + three status tiles. The hero answers "what should I do
// right now" with a small state machine over current progress; the tiles
// show at-a-glance status across all three modalities.
function updateDashStats() {
  const totalModules = LEARN_MODULES.length;
  const modulesRead = LEARN_MODULES.filter(m => (progress.learnProgress?.[m.id] || 0) >= m.sections).length;
  const totalCards = QUESTIONS.length;
  const masteredCount = QUESTIONS.filter(q => getMasteryClass(q.id) === 'mastered').length;
  const dueCount = getDueCount();
  const mocks = Array.isArray(progress.mockHistory) ? progress.mockHistory : [];
  const last = mocks[mocks.length - 1];
  const best = mocks.reduce((m, r) => r.tech > (m?.tech ?? -1) ? r : m, null);

  // Status tiles
  setText('tile-concepts-val', `${modulesRead} / ${totalModules}`);
  setBar('tile-concepts-fill', totalModules ? modulesRead / totalModules : 0);
  setText('tile-practice-val', `${masteredCount} / ${totalCards}`);
  setText('tile-practice-sub', dueCount > 0 ? `${dueCount} due now` : 'flashcards mastered');
  setBar('tile-practice-fill', totalCards ? masteredCount / totalCards : 0);
  // Mock tile shows the average tech score across all recorded mock turns —
  // a steadier signal than "best ever" (which only goes up) or "last"
  // (which spikes per session).
  const avgTech = mocks.length ? mocks.reduce((s, m) => s + (m.tech || 0), 0) / mocks.length : null;
  setText('tile-mock-val', avgTech !== null ? avgTech.toFixed(1) : '—');
  setText('tile-mock-sub', avgTech !== null ? 'avg interview score' : 'no mocks yet');
  setBar('tile-mock-fill', avgTech !== null ? avgTech / 10 : 0);

  // Hero next step
  const hero = pickHeroAction({ modulesRead, totalModules, masteredCount, dueCount, mocks });
  window._heroAction = hero.go;
  setText('dash-hero-label', hero.label);
  setText('dash-hero-action', hero.action);
  setText('dash-hero-sub', hero.sub);
  setText('dash-hero-cta', hero.cta);

  // Streak = consecutive calendar days ending today with at least one
  // answered card. One source of truth, no fabricated counters.
  const seenDays = new Set();
  for (const m of Object.values(progress.mastery || {})) {
    if (m && m.lastSeen) seenDays.add(new Date(m.lastSeen).toDateString());
  }
  const today = new Date();
  let streak = 0;
  const cursor = new Date(today);
  while (seenDays.has(cursor.toDateString())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  setText('dash-streak', streak);
  setText('dash-streak-label', streak === 1 ? 'day' : 'days');

  renderActivity();
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function setBar(id, frac) {
  const el = document.getElementById(id);
  if (el) el.style.width = Math.max(0, Math.min(1, frac)) * 100 + '%';
}

// Pick the next-step recommendation rendered in the hero card. Walks state
// in priority order: due cards → first concept → grow card base → first mock
// → keep practicing. Each branch returns label/action/sub/cta + the action
// to fire when the hero is clicked.
function pickHeroAction({ modulesRead, totalModules, masteredCount, dueCount, mocks }) {
  if (dueCount > 0) {
    return {
      label: 'REVIEW',
      action: dueCount === 1 ? '1 card due now' : `${dueCount} cards due now`,
      sub: 'Spaced repetition is the engine. These are about to slip — clear them in a few minutes.',
      cta: 'Review now →',
      go: () => { showView('flash'); setTimeout(() => setStudyMode('due'), 100); }
    };
  }
  if (modulesRead === 0) {
    return {
      label: 'START HERE',
      action: 'Read your first concept',
      sub: 'The playbook before the drills. Most modules run 10–15 minutes; pick any to begin.',
      cta: 'Open concepts →',
      go: () => showView('learn')
    };
  }
  if (masteredCount < 20) {
    return {
      label: 'BUILD YOUR BASE',
      action: 'Drill flashcards',
      sub: 'You\'ve started reading. Lock in recall before stress-testing in a mock.',
      cta: 'Start drilling →',
      go: () => showView('flash')
    };
  }
  if (!mocks.length) {
    return {
      label: 'READY',
      action: 'Take your first mock interview',
      sub: 'Closed-book, scored. The only thing that measures interview readiness.',
      cta: 'Start mock →',
      go: () => showView('mock')
    };
  }
  if (modulesRead < totalModules) {
    return {
      label: 'KEEP GOING',
      action: `Read another concept (${totalModules - modulesRead} left)`,
      sub: 'Mocks expose gaps. Reading the right concept fills them faster than drilling will.',
      cta: 'Open concepts →',
      go: () => showView('learn')
    };
  }
  return {
    label: 'PUSH HARDER',
    action: 'Run another mock',
    sub: 'You\'ve covered the curriculum. Mocks are how delivery gets sharp.',
    cta: 'Start mock →',
    go: () => showView('mock')
  };
}

// Hero CTA — wired to whatever pickHeroAction set on _heroAction last render.
function dashHeroAction() {
  if (typeof window._heroAction === 'function') window._heroAction();
}

// Dashboard primary CTA from elsewhere (kept for compatibility — unused now
// that the hero handles all routing). Falls through to the same logic.
function smartPractice() {
  dashHeroAction();
}

function renderActivity() {
  const el = document.getElementById('activity-list');
  if (!el) return;
  if (!progress.activityLog.length) {
    el.innerHTML = '<div style="padding:32px 16px;text-align:center;font-size:12.5px;color:var(--t-3)">Answer your first question to start your activity log.</div>';
    return;
  }
  const labels = { tech:'T', beh:'B', brain:'?', deal:'M', levels:'L' };
  const colors = { tech:'var(--accent-dim)', beh:'var(--green-dim)', brain:'var(--amber-dim)', deal:'var(--blue-dim)', levels:'var(--green-dim)' };
  el.innerHTML = progress.activityLog.map(a =>
    '<div class="act-item">' +
    '<div class="act-icon" style="background:' + (colors[a.cat]||'var(--bg-3)') + '">' + (labels[a.cat]||'·') + '</div>' +
    '<div class="act-text">' + (a.title.length > 55 ? a.title.slice(0,55)+'…' : a.title) + '</div>' +
    '<div class="act-time">' + a.time + '</div></div>'
  ).join('');
}

/* ─── NEWS ───────────────────────────── */
// Note: previous version asked Claude to invent headlines — actively misleading
// for an interview-prep context. Disabled until a real RSS-backed feed lands.
async function loadNews() {
  const el = document.getElementById('news-list');
  if (!el) return;
  el.replaceChildren();
  const placeholder = document.createElement('div');
  placeholder.style.cssText = 'padding:24px;text-align:center;font-size:12px;color:var(--t-3)';
  placeholder.textContent = 'Live market news coming soon.';
  el.appendChild(placeholder);
}

/* ─── FLASHCARDS ─────────────────────── */
let flashDeck = [], flashIdx = 0, flashFlipped = false;
let flashCat = 'all';
let flashSub = null;

function setStudyMode(mode) {
  studyMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => 
    b.classList.toggle('active', b.dataset.mode === mode));
  
  // Reset timer for quick mode
  if (mode === 'quick') {
    startSessionTimer();
  } else {
    stopSessionTimer();
  }
  
  buildFlashDeck();
  flashIdx = 0;
  flashFlipped = false;
  renderCard();
  updateMasteryStats();
}

function buildFlashDeck() {
  let pool = flashCat === 'all' ? [...QUESTIONS] : QUESTIONS.filter(q => q.cat === flashCat);
  if (flashSub) pool = pool.filter(q => q.sub === flashSub);

  switch(studyMode) {
    case 'due':
      pool = pool.filter(q => isDue(q.id));
      // Sort by most overdue first
      pool.sort((a, b) => {
        const mA = getMastery(a.id), mB = getMastery(b.id);
        return (mA.nextDue || 0) - (mB.nextDue || 0);
      });
      break;
    case 'weak':
      pool = pool.filter(q => isWeak(q.id));
      // Sort by lowest level first
      pool.sort((a, b) => getMastery(a.id).level - getMastery(b.id).level);
      break;
    case 'quick':
      // Random 10 cards
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      pool = pool.slice(0, 10);
      break;
    default:
      // 'all' mode - prioritize due cards, then new, then mastered
      pool.sort((a, b) => {
        const mA = getMastery(a.id), mB = getMastery(b.id);
        const dueA = isDue(a.id) ? 0 : 1;
        const dueB = isDue(b.id) ? 0 : 1;
        if (dueA !== dueB) return dueA - dueB;
        
        const clsA = getMasteryClass(a.id), clsB = getMasteryClass(b.id);
        const order = { 'new': 0, 'learning': 1, 'mastered': 2 };
        return order[clsA] - order[clsB];
      });
  }
  
  flashDeck = pool;
}

function setFlashCat(cat, opts) {
  flashCat = cat;
  // Clicking a category pill clears any sub filter set by the Levels tile.
  if (!opts || !opts.keepSub) flashSub = null;
  document.querySelectorAll('.bank-pill[data-fcat]').forEach(b =>
    b.classList.toggle('active', b.dataset.fcat === cat));
  buildFlashDeck();
  flashIdx = 0;
  flashFlipped = false;
  renderCard();
}

// Silent deck rebuild used when the underlying filter shifts (band crossings,
// "At your level" toggle). Preserves the user's current card if it's still
// in the deck after the rebuild; otherwise lands them on the nearest valid
// position.
function refreshFlashDeck() {
  const currentId = flashDeck[flashIdx]?.id;
  buildFlashDeck();
  if (currentId != null) {
    const newIdx = flashDeck.findIndex(q => q.id === currentId);
    flashIdx = newIdx >= 0
      ? newIdx
      : Math.min(flashIdx, Math.max(0, flashDeck.length - 1));
  } else {
    flashIdx = 0;
  }
  flashFlipped = false;
  renderCard();
}

function shuffleFlash() {
  for (let i = flashDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flashDeck[i], flashDeck[j]] = [flashDeck[j], flashDeck[i]];
  }
  flashIdx = 0;
  flashFlipped = false;
  renderCard();
}

function initFlash() {
  buildFlashDeck();
  updateMasteryStats();
  renderCard();
  
  // Add keyboard listeners
  document.addEventListener('keydown', handleFlashKeyboard);
}

function handleFlashKeyboard(e) {
  // Only handle if flashcard view is active
  const flashView = document.getElementById('view-flash');
  if (!flashView || !flashView.classList.contains('active')) return;
  
  // Don't handle if typing in an input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  
  switch(e.code) {
    case 'Space':
      e.preventDefault();
      flipCard();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      prevCard();
      break;
    case 'ArrowRight':
      e.preventDefault();
      nextCard();
      break;
    case 'Digit1':
    case 'Numpad1':
      if (flashFlipped) { e.preventDefault(); rateCard(1); }
      break;
    case 'Digit2':
    case 'Numpad2':
      if (flashFlipped) { e.preventDefault(); rateCard(2); }
      break;
    case 'Digit3':
    case 'Numpad3':
      if (flashFlipped) { e.preventDefault(); rateCard(3); }
      break;
  }
}

function renderCard() {
  const confBar = document.getElementById('confidence-bar');
  if (confBar) confBar.classList.remove('show');
  
  if (!flashDeck.length) {
    // No cards to show
    const cl = document.getElementById('card-cat-label');
    const qt = document.getElementById('card-q-text');
    const bt = document.getElementById('card-back-text');
    const fm = document.getElementById('flash-meta');
    if (cl) cl.textContent = '';
    if (qt) qt.textContent = studyMode === 'due' ? 'No cards due for review!' : 
                            studyMode === 'weak' ? 'No weak spots — keep it up!' : 'No cards available.';
    if (bt) bt.textContent = '';
    if (fm) fm.textContent = '0 cards';
    return;
  }
  
  const q = flashDeck[flashIdx];
  const ci = document.getElementById('card-inner');
  if (ci) { ci.classList.remove('flipped'); flashFlipped = false; }
  
  setTimeout(function() {
    const cl = document.getElementById('card-cat-label');
    const qt = document.getElementById('card-q-text');
    const bt = document.getElementById('card-back-text');
    const fm = document.getElementById('flash-meta');
    const ff = document.getElementById('flash-bar-fill');
    const fp = document.getElementById('flash-prev');
    const fn = document.getElementById('flash-next');
    
    // Show mastery indicator in category label
    const masteryClass = getMasteryClass(q.id);
    const masteryDot = masteryClass === 'mastered' ? '●' : masteryClass === 'learning' ? '◐' : '○';
    const dueIndicator = isDue(q.id) ? ' · DUE' : '';
    
    if (cl) cl.innerHTML = (TOPIC_LABELS[q.cat] || q.cat) + (q.sub ? ' — ' + q.sub.charAt(0).toUpperCase() + q.sub.slice(1) : '') +
      ' <span style="opacity:0.6">' + masteryDot + '</span>' +
      (dueIndicator ? '<span class="due-badge" style="margin-left:8px">DUE</span>' : '');
    if (qt) qt.textContent = q.q;
    if (bt) bt.textContent = q.a;
    const whyToggle = document.getElementById('card-back-why-toggle');
    const whyEl = document.getElementById('card-back-why');
    if (whyEl) {
      whyEl.textContent = q.explain || '';
      whyEl.style.display = 'none';
    }
    if (whyToggle) {
      whyToggle.style.display = q.explain ? '' : 'none';
      whyToggle.textContent = 'Why? ⌄';
    }
    if (fm) fm.textContent = 'Card ' + (flashIdx + 1) + ' of ' + flashDeck.length +
      (studyMode === 'quick' ? ' · Quick Session' : '');
    if (ff) ff.style.width = ((flashIdx + 1) / flashDeck.length * 100) + '%';
    if (fp) fp.disabled = flashIdx === 0;
    if (fn) fn.disabled = flashIdx === flashDeck.length - 1;
  }, 80);
}

function toggleCardWhy() {
  const whyEl = document.getElementById('card-back-why');
  const whyToggle = document.getElementById('card-back-why-toggle');
  if (!whyEl || !whyToggle) return;
  const open = whyEl.style.display !== 'none';
  whyEl.style.display = open ? 'none' : 'block';
  whyToggle.textContent = open ? 'Why? ⌄' : 'Why? ⌃';
}

function flipCard() {
  const ci = document.getElementById('card-inner');
  const confBar = document.getElementById('confidence-bar');
  if (!ci || !flashDeck.length) return;

  flashFlipped = !flashFlipped;
  ci.classList.toggle('flipped', flashFlipped);
  
  // Show confidence buttons when flipped
  if (confBar) confBar.classList.toggle('show', flashFlipped);
  
  if (flashFlipped && flashDeck[flashIdx]) {
    markAnswered(flashDeck[flashIdx].id);
  }
}

function rateCard(rating) {
  if (!flashDeck.length || !flashFlipped) return;

  const q = flashDeck[flashIdx];
  const m = getMastery(q.id);

  // Update mastery based on rating
  m.level = rating;
  m.lastSeen = Date.now();

  if (rating === 3) {
    // Got it - increase streak, schedule further out
    m.streak = Math.min(m.streak + 1, SRS_INTERVALS.length - 1);
  } else if (rating === 1) {
    // Missed - reset streak
    m.streak = 0;
  } else {
    // Unsure - decrease streak slightly
    m.streak = Math.max(0, m.streak - 1);
  }

  const intervalMinutes = SRS_INTERVALS[m.streak];
  m.nextDue = Date.now() + (intervalMinutes * 60 * 1000);

  saveProgress();
  updateMasteryStats();
  
  // Auto-advance to next card
  if (flashIdx < flashDeck.length - 1) {
    flashIdx++;
    renderCard();
  } else {
    // End of deck
    if (studyMode === 'quick') {
      stopSessionTimer();
      showQuickSessionComplete();
    } else {
      renderCard(); // Just re-render the last card
    }
  }
}

function showQuickSessionComplete() {
  const qt = document.getElementById('card-q-text');
  const cl = document.getElementById('card-cat-label');
  const confBar = document.getElementById('confidence-bar');
  
  if (cl) cl.textContent = 'SESSION COMPLETE';
  if (qt) qt.innerHTML = 'You finished 10 cards.<br><br>' +
    '<button class="btn-primary" onclick="setStudyMode(\'quick\')" style="font-size:13px;padding:10px 20px">Start Another Quick 10</button>';
  if (confBar) confBar.classList.remove('show');
  
  const ci = document.getElementById('card-inner');
  if (ci) ci.classList.remove('flipped');
}

function prevCard() { 
  if (flashIdx > 0) { 
    flashIdx--; 
    renderCard(); 
  } 
}

function nextCard() { 
  if (flashIdx < flashDeck.length - 1) { 
    flashIdx++; 
    renderCard(); 
  } 
}

function startSessionTimer() {
  sessionStartTime = Date.now();
  const timerEl = document.getElementById('session-timer');
  if (timerEl) timerEl.classList.add('show');
  
  sessionTimer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const timeEl = document.getElementById('session-time');
    if (timeEl) timeEl.textContent = mins + ':' + String(secs).padStart(2, '0');
  }, 1000);
}

function stopSessionTimer() {
  if (sessionTimer) {
    clearInterval(sessionTimer);
    sessionTimer = null;
  }
  const timerEl = document.getElementById('session-timer');
  if (timerEl) timerEl.classList.remove('show');
}

/* ─── MOCK INTERVIEW ─────────────────── */
let mockHistory = [], mockActive = false, mockSessionId = null, mockQuestionsAsked = 0;
const MOCK_MAX_QUESTIONS = 6;
const MOCK_MODES = ['warmup', 'vp', 'vp_curveball'];
const MOCK_MODE_LABEL = { warmup: 'Warm-up', vp: 'VP', vp_curveball: 'VP + Curveball' };

// Default mock mode keys off the user's recent technical scores. New users
// land in Warm-up; once they're scoring ≥7/10 in two of three recent mocks
// they get bumped to VP. Curveball is opt-in only.
function defaultMockMode() {
  const mocks = Array.isArray(progress.mockHistory) ? progress.mockHistory : [];
  if (mocks.length < 3) return 'warmup';
  const recent = mocks.slice(-3);
  const strong = recent.filter(m => (m.tech || 0) >= 7).length;
  return strong >= 2 ? 'vp' : 'warmup';
}

// Render the mode banner above the firm picker. Idempotent — safe to call on
// every view render (showView('mock') triggers it).
function renderMockModeBanner() {
  const select = document.getElementById('mock-mode');
  const banner = document.getElementById('mock-mode-banner');
  const text = document.getElementById('mock-mode-banner-text');
  const stepDown = document.getElementById('mock-mode-step-down');
  const stepUp = document.getElementById('mock-mode-step-up');
  if (!select || !banner || !text) return;
  // Only auto-set if the user hasn't already started a mock or hand-changed.
  if (!select.dataset.userTouched) {
    select.value = defaultMockMode();
    syncRailFromSelect('mock-mode');
  }
  // One-time listener so direct dropdown changes also refresh the banner.
  if (!select.dataset.listenerAttached) {
    select.addEventListener('change', () => {
      select.dataset.userTouched = '1';
      renderMockModeBanner();
    });
    select.dataset.listenerAttached = '1';
  }
  // The banner is hidden in the rail UI; we keep the element in the DOM so
  // this function can still attach the change listener and toggle the hint
  // button, but the visible mode selection now lives in the left rail.
  banner.style.display = 'none';
  text.textContent = `We've started you in ${MOCK_MODE_LABEL[select.value] || 'VP'}. Step up or step down manually if you'd like.`;
  const idx = MOCK_MODES.indexOf(select.value);
  if (stepDown) stepDown.disabled = idx <= 0;
  if (stepUp) stepUp.disabled = idx >= MOCK_MODES.length - 1;
  // Hint button shows only in warm-up.
  const hintBtn = document.getElementById('chat-hint');
  if (hintBtn) hintBtn.style.display = select.value === 'warmup' ? '' : 'none';
}

function stepMockMode(dir) {
  const select = document.getElementById('mock-mode');
  if (!select) return;
  const idx = MOCK_MODES.indexOf(select.value);
  const next = Math.max(0, Math.min(MOCK_MODES.length - 1, idx + dir));
  select.value = MOCK_MODES[next];
  select.dataset.userTouched = '1';
  renderMockModeBanner();
  syncRailFromSelect('mock-mode');
}

// Mirror the visible rail buttons into the hidden <select> they drive, then
// notify any listeners (renderMockModeBanner attaches one to mock-mode).
function syncRailOpt(btn, targetId) {
  const group = btn.parentElement;
  if (group) group.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === btn));
  const sel = document.getElementById(targetId);
  if (!sel) return;
  sel.value = btn.dataset.v;
  sel.dispatchEvent(new Event('change', { bubbles: true }));
}

// Update the rail's .on state to match the current value of a hidden <select>
// (used after auto-defaulting mock-mode in renderMockModeBanner).
function syncRailFromSelect(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  document.querySelectorAll(`.mr-opt button[onclick*="${selectId}"]`).forEach(b => {
    b.classList.toggle('on', b.dataset.v === sel.value);
  });
}

// Warm-up only: ask the interviewer for a hint on the current question.
async function askForHint() {
  if (!mockActive) return;
  const sendBtn = document.getElementById('chat-send');
  const hintBtn = document.getElementById('chat-hint');
  if (sendBtn) sendBtn.disabled = true;
  if (hintBtn) hintBtn.disabled = true;
  appendMsg('user', 'Could I get a small hint on this question?');
  mockHistory.push({ role: 'user', content: "Could I get a small hint on this question? Just enough to point me toward the right framework — don't give me the answer." });
  showTyping();
  const cat = document.getElementById('mock-cat')?.value || 'tech';
  const firm = document.getElementById('mock-firm')?.value || 'Goldman Sachs';
  await runMockTurn(cat, firm);
  if (hintBtn) hintBtn.disabled = false;
}

async function startMock() {
  mockActive = true;
  mockHistory = [];
  mockQuestionsAsked = 0;
  mockSessionId = null;
  const badge = document.getElementById('iv-badge');
  if (badge) { badge.className = 'iv-badge badge-live'; badge.textContent = '● LIVE'; }
  // Restore input + send button (a previous interview may have disabled them).
  const sendBtn = document.getElementById('chat-send');
  const ta = document.getElementById('chat-input');
  if (sendBtn) sendBtn.disabled = false;
  if (ta) { ta.disabled = false; ta.placeholder = 'Type your answer…'; }
  const catEl = document.getElementById('mock-cat');
  const firmEl = document.getElementById('mock-firm');
  const cat = catEl ? catEl.value : 'tech';
  const firm = firmEl ? firmEl.value : 'Goldman Sachs';
  const chatBody = document.getElementById('chat-body');
  if (chatBody) chatBody.innerHTML = '';
  // Refresh the persona header to match the chosen firm.
  const navName = document.getElementById('mock-iv-name');
  const navRole = document.getElementById('mock-iv-role');
  const navAv = document.getElementById('mock-iv-av');
  if (navName) navName.textContent = firm;
  const catLabels = { tech: 'Technical', beh: 'Behavioral', brain: 'Brain Teasers', deal: 'Deals & Markets' };
  if (navRole) navRole.textContent = (catLabels[cat] || 'Technical') + ' · VP, M&A';
  if (navAv) navAv.textContent = firmInitials(firm);

  // Show progress + end controls.
  setMockProgress(0);
  toggleEndButton(true);

  // Persist a session row (best-effort — interview still works if it fails).
  try {
    const { data, error } = await sb.from('mock_sessions').insert({
      user_id: currentUser?.id,
      category: cat,
      firm,
      messages: [],
      started_at: new Date().toISOString()
    }).select('id').single();
    if (!error) mockSessionId = data?.id || null;
  } catch (_) { /* ignore */ }

  // Kick off the interview by sending a single user message — the AI introduces itself
  // and asks question 1, per the system prompt.
  showTyping();
  mockHistory.push({ role: 'user', content: "I'm ready. Please begin." });
  await runMockTurn(cat, firm);
}

function setMockProgress(asked) {
  mockQuestionsAsked = asked;
  const el = document.getElementById('mock-progress');
  if (!el) return;
  el.style.display = '';
  el.textContent = 'Q ' + Math.min(asked, MOCK_MAX_QUESTIONS) + ' / ' + MOCK_MAX_QUESTIONS;
}

function toggleEndButton(show) {
  const btn = document.getElementById('mock-end-btn');
  if (btn) btn.style.display = show ? '' : 'none';
}

async function endInterview() {
  if (!mockActive) return;
  // Send a final user prompt so the model produces the wrap-up structure.
  if (mockQuestionsAsked >= 1) {
    const ta = document.getElementById('chat-input');
    if (ta) { ta.value = ''; ta.style.height = 'auto'; }
    appendMsg('user', "Let's wrap up here. Please give me the final wrap-up.");
    mockHistory.push({ role: 'user', content: "Let's wrap up here. Please give me the final wrap-up." });
    showTyping();
    const cat = document.getElementById('mock-cat')?.value || 'tech';
    const firm = document.getElementById('mock-firm')?.value || 'Goldman Sachs';
    await runMockTurn(cat, firm, /* forceWrap */ true);
  } else {
    finalizeMockSession('cancelled');
  }
}

function finalizeMockSession(reason) {
  mockActive = false;
  const badge = document.getElementById('iv-badge');
  if (badge) { badge.className = 'iv-badge badge-idle'; badge.textContent = '● IDLE'; }
  toggleEndButton(false);
  const sendBtn = document.getElementById('chat-send');
  const ta = document.getElementById('chat-input');
  if (sendBtn) sendBtn.disabled = true;
  if (ta) { ta.disabled = true; ta.placeholder = 'Interview complete. Click Start Interview to run another.'; }

  // Persist end timestamp + final messages list.
  if (mockSessionId) {
    sb.from('mock_sessions').update({
      messages: mockHistory,
      ended_at: new Date().toISOString()
    }).eq('id', mockSessionId).then(() => {}, () => {});
  }
}

const ALLOWED_FIRMS = ['Goldman Sachs','J.P. Morgan','Morgan Stanley','Evercore','Lazard','Blackstone'];
function firmInitials(firm) {
  const map = {
    'Goldman Sachs': 'GS',
    'J.P. Morgan': 'JPM',
    'Morgan Stanley': 'MS',
    'Evercore': 'EVR',
    'Lazard': 'LAZ',
    'Blackstone': 'BX'
  };
  return map[firm] || 'VP';
}

function aiAvatarLabel() {
  const firmEl = document.getElementById('mock-firm');
  return firmInitials(firmEl ? firmEl.value : 'Goldman Sachs');
}

function appendMsg(role, text) {
  const body = document.getElementById('chat-body');
  if (!body) return;
  const div = document.createElement('div');
  div.className = 'chat-msg' + (role==='user'?' user':'');
  const av = document.createElement('div');
  av.className = 'cm-av ' + (role==='ai'?'ai':'usr');
  av.textContent = role==='ai' ? aiAvatarLabel() : 'Y';
  const bubble = document.createElement('div');
  bubble.className = 'cm-bubble ' + (role==='ai'?'ai':'usr');
  bubble.textContent = text;
  div.appendChild(av);
  div.appendChild(bubble);
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function showTyping() {
  const body = document.getElementById('chat-body');
  if (!body) return;
  const div = document.createElement('div');
  div.className = 'chat-msg'; div.id = 'typing-indicator';
  const av = document.createElement('div');
  av.className = 'cm-av ai';
  av.textContent = aiAvatarLabel();
  const ind = document.createElement('div');
  ind.className = 'typing-indicator';
  ind.innerHTML = '<div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div>';
  div.appendChild(av);
  div.appendChild(ind);
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function removeTyping() { document.getElementById('typing-indicator')?.remove(); }

async function sendMsg() {
  if (!mockActive) return;
  const ta = document.getElementById('chat-input');
  if (!ta) return;
  const text = ta.value.trim();
  if (!text) return;
  ta.value = ''; ta.style.height = 'auto';
  const sendBtn = document.getElementById('chat-send');
  if (sendBtn) sendBtn.disabled = true;
  appendMsg('user', text);
  mockHistory.push({role:'user', content:text});
  showTyping();
  const catEl = document.getElementById('mock-cat');
  const firmEl = document.getElementById('mock-firm');
  const cat = catEl ? catEl.value : 'tech';
  const rawFirm = firmEl ? firmEl.value : 'Goldman Sachs';
  // Whitelist firm to block prompt injection via tampered <select> or direct API calls.
  const firm = ALLOWED_FIRMS.includes(rawFirm) ? rawFirm : 'Goldman Sachs';
  await runMockTurn(cat, firm);
}

async function runMockTurn(cat, firm) {
  const sendBtn = document.getElementById('chat-send');
  try {
    if (!requireSupabase()) {
      removeTyping();
      appendMsg('ai', 'Supabase is not configured — please contact support.');
      if (sendBtn) sendBtn.disabled = false;
      return;
    }
    const { data: { session } } = await sb.auth.getSession();
    const accessToken = session?.access_token;
    if (!accessToken) {
      removeTyping();
      appendMsg('ai', 'Please log in again to continue this interview.');
      if (sendBtn) sendBtn.disabled = false;
      return;
    }
    const mockMode = document.getElementById('mock-mode')?.value || 'vp';
    const res = await fetch("/api/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
      body: JSON.stringify({
        mode: "mock_interview",
        firm,
        category: cat,
        difficulty: mockMode,
        messages: mockHistory.map(m => ({ role: m.role, content: m.content }))
      })
    });
    if (res.status === 402) {
      removeTyping();
      if (sendBtn) sendBtn.disabled = false;
      // Subscription lapsed mid-session — bounce back to the paywall.
      routeToPaywall(currentUser);
      return;
    }
    if (res.status === 429) {
      removeTyping();
      appendMsg('ai', "You've hit your monthly AI usage limit. It resets on the 1st.");
      if (sendBtn) sendBtn.disabled = false;
      return;
    }
    const data = await res.json();
    removeTyping();
    const reply = data.content?.map(c=>c.text||'').join('')||'Could not get response.';
    mockHistory.push({role:'assistant',content:reply});

    // Update progress: each AI reply contains the next question (or the wrap-up).
    const isWrapUp = /WRAP-?UP\s*:/i.test(reply);
    if (!isWrapUp) setMockProgress(mockQuestionsAsked + 1);

    const scoreMatch = reply.match(/Technical:\s*(\d+)\/10.*?Structure:\s*(\d+)\/10.*?Confidence:\s*(\d+)\/10/i);

    // Mocks are the one place we record a real signal: closed-book, scored
    // by a rubric. Every scored turn appends to progress.mockHistory.
    if (scoreMatch) {
      if (!Array.isArray(progress.mockHistory)) progress.mockHistory = [];
      progress.mockHistory.push({
        ts: Date.now(),
        cat,
        firm,
        tech: parseInt(scoreMatch[1], 10),
        structure: parseInt(scoreMatch[2], 10),
        confidence: parseInt(scoreMatch[3], 10)
      });
      // Keep the last 100 turns — enough for trends, bounded so the row
      // doesn't bloat over months of practice.
      if (progress.mockHistory.length > 100) {
        progress.mockHistory.splice(0, progress.mockHistory.length - 100);
      }
      saveProgress();
    }

    const replyText = scoreMatch
      ? reply.replace(/Technical:\s*\d+\/10\s*\|\s*Structure:\s*\d+\/10\s*\|\s*Confidence:\s*\d+\/10/i, '').trim()
      : reply;
    const body = document.getElementById('chat-body');
    if (body) {
      const div = document.createElement('div');
      div.className = 'chat-msg';
      const av = document.createElement('div');
      av.className = 'cm-av ai';
      av.textContent = aiAvatarLabel();
      const bubble = document.createElement('div');
      bubble.className = 'cm-bubble ai';
      // AI text — render with line breaks but no HTML.
      replyText.split('\n').forEach((line, i) => {
        if (i > 0) bubble.appendChild(document.createElement('br'));
        bubble.appendChild(document.createTextNode(line));
      });
      if (scoreMatch) {
        const t = scoreMatch[1], s = scoreMatch[2], c = scoreMatch[3];
        const cc = n => parseInt(n)>=8?'sc-g':parseInt(n)>=6?'sc-y':'sc-r';
        const block = document.createElement('div');
        block.className = 'score-block';
        block.style.marginTop = '8px';
        const lines = [
          ['Technical Accuracy', t],
          ['Structure & Clarity', s],
          ['Confidence', c]
        ];
        lines.forEach(([label, val]) => {
          const row = document.createElement('div');
          row.className = 'score-line';
          const lbl = document.createElement('span');
          lbl.className = 'sc-label';
          lbl.textContent = label;
          const v = document.createElement('span');
          v.className = 'sc-val ' + cc(val);
          v.textContent = val + '/10';
          row.appendChild(lbl);
          row.appendChild(v);
          block.appendChild(row);
        });
        bubble.appendChild(block);
      }
      div.appendChild(av);
      div.appendChild(bubble);
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    // Persist updated messages to mock_sessions (best-effort, fire-and-forget).
    if (mockSessionId) {
      sb.from('mock_sessions').update({ messages: mockHistory })
        .eq('id', mockSessionId).then(() => {}, () => {});
    }

    // Detect wrap-up and end the session.
    if (isWrapUp) {
      finalizeMockSession('wrap_up');
      return;
    }
  } catch(e) {
    removeTyping();
    appendMsg('ai', 'Connection error. Please try again.');
  }
  if (sendBtn) sendBtn.disabled = false;
}

/* ─── STORY BANK ────────────────────── */
let storyPanelOpen = false;

function toggleStoryPanel() {
  storyPanelOpen = !storyPanelOpen;
  document.getElementById('story-panel').classList.toggle('open', storyPanelOpen);
  if (storyPanelOpen) renderStoryList();
}

function renderStoryList() {
  const list = document.getElementById('story-list');
  const notes = progress.notes || [];

  list.replaceChildren();

  if (!notes.length) {
    const empty = document.createElement('div');
    empty.className = 'story-empty';
    empty.textContent = 'No notes yet. Add notes to questions while studying to build your personal story bank.';
    list.appendChild(empty);
    return;
  }

  notes.forEach((note, i) => {
    const item = document.createElement('div');
    item.className = 'story-item';
    item.addEventListener('click', () => viewStoryNote(i));

    const cat = document.createElement('div');
    cat.className = 'story-item-cat';
    cat.textContent = note.category || 'NOTE';

    const title = document.createElement('div');
    title.className = 'story-item-title';
    title.textContent = note.title || 'Untitled';

    const preview = document.createElement('div');
    preview.className = 'story-item-note';
    const content = note.content || '';
    preview.textContent = content.length > 100 ? content.substring(0, 100) + '…' : content;

    item.appendChild(cat);
    item.appendChild(title);
    item.appendChild(preview);
    list.appendChild(item);
  });
}

function addNewStory() {
  const title = prompt('Story title (e.g., "Leadership - Club President"):');
  if (!title) return;
  
  const content = prompt('Your story (use STAR format - Situation, Task, Action, Result):');
  if (!content) return;
  
  if (!progress.notes) progress.notes = [];
  progress.notes.push({
    title,
    content,
    category: 'BEHAVIORAL',
    created: Date.now()
  });
  
  saveProgress();
  renderStoryList();
}

function addNoteToQuestion(questionId, note) {
  if (!progress.questionNotes) progress.questionNotes = {};
  progress.questionNotes[questionId] = note;
  saveProgress();
}

function viewStoryNote(index) {
  const note = progress.notes?.[index];
  if (note) {
    showInfoModal(note.title || 'Untitled', note.content || '');
  }
}

/* ─── LEARN MODULES ─────────────────── */

let currentModule = null;
let currentSection = 0;

function renderLearnModules() {
  const grid = document.getElementById('learn-modules-grid');
  if (!grid) return;
  
  grid.innerHTML = LEARN_MODULES.map(mod => {
    const moduleProgress = progress.learnProgress?.[mod.id] || 0;
    const totalSections = mod.content?.length || mod.sections || 1;
    const pct = Math.round((moduleProgress / totalSections) * 100);
    const badge = pct === 100 ? 'done' : pct > 0 ? 'progress' : 'new';
    const badgeText = pct === 100 ? '✓ DONE' : pct > 0 ? `${pct}%` : 'NEW';
    const isLocked = !mod.content;
    
    return `
      <div class="learn-module ${isLocked ? 'locked' : ''}" onclick="${isLocked ? '' : `openLearnModule('${mod.id}')`}">
        <span class="learn-module-badge ${badge}">${isLocked ? 'SOON' : badgeText}</span>
        <div class="learn-module-cat">${mod.category}</div>
        <div class="learn-module-title">${mod.title}</div>
        <div class="learn-module-desc">${mod.desc}</div>
        <div class="learn-module-meta">
          <span>${mod.time}</span>
          <span>${totalSections} sections</span>
        </div>
        <div class="learn-module-progress">
          <div class="learn-module-progress-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');
  
  // Show list, hide content
  document.getElementById('learn-modules-list').style.display = 'block';
  document.getElementById('learn-content').classList.remove('active');
}

function openLearnModule(moduleId) {
  const mod = LEARN_MODULES.find(m => m.id === moduleId);
  if (!mod || !mod.content) return;
  
  currentModule = mod;
  currentSection = 0;
  
  document.getElementById('learn-modules-list').style.display = 'none';
  document.getElementById('learn-content').classList.add('active');
  
  renderLearnSection();
}

function renderLearnSection() {
  if (!currentModule) return;
  
  const section = currentModule.content[currentSection];
  const totalSections = currentModule.content.length;
  const contentEl = document.getElementById('learn-content');
  
  let visualHtml = '';
  if (section.visual) {
    if (section.visual.type === 'flow') {
      visualHtml = `
        <div class="learn-visual">
          <div class="learn-visual-title">${section.visual.title}</div>
          <div class="learn-diagram">
            ${section.visual.items.map((item, i) => `
              <div class="learn-box ${item.highlight ? 'highlight' : ''}">
                <div class="learn-box-label">${item.label}</div>
                <div class="learn-box-val">${item.val}</div>
              </div>
              ${i < section.visual.items.length - 1 ? '<span class="learn-arrow">→</span>' : ''}
            `).join('')}
          </div>
        </div>
      `;
    } else if (section.visual.type === 'two-column') {
      visualHtml = `
        <div class="learn-visual">
          <div class="learn-visual-title">${section.visual.title}</div>
          <div class="learn-diagram" style="gap:40px">
            <div class="learn-box" style="min-width:150px">
              <div class="learn-box-label">${section.visual.left.label}</div>
              <div style="font-size:12px;color:var(--t-2);margin-top:8px">${section.visual.left.items.join('<br>')}</div>
            </div>
            <div class="learn-box" style="min-width:150px">
              <div class="learn-box-label">${section.visual.right.label}</div>
              <div style="font-size:12px;color:var(--t-2);margin-top:8px">${section.visual.right.items.join('<br>')}</div>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  contentEl.innerHTML = `
    <div class="learn-header">
      <div class="learn-back" onclick="closeLearnModule()">← Back to modules</div>
      <div class="learn-title">${currentModule.title}</div>
      <div class="learn-meta">Section ${currentSection + 1} of ${totalSections} • ${currentModule.time}</div>
    </div>
    
    <div class="learn-section">
      <div class="learn-section-title">${section.title}</div>
      <div class="learn-text">${section.text}</div>
      ${visualHtml}
      ${section.formula ? `<div class="learn-formula">${section.formula.replace(/\n/g, '<br>')}</div>` : ''}
      ${section.tip ? `
        <div class="learn-tip">
          <div class="learn-tip-title">${section.tip.title}</div>
          ${section.tip.text}
        </div>
      ` : ''}
      ${section.trap ? `
        <div class="learn-trap">
          <div class="learn-trap-title">${section.trap.title}</div>
          ${section.trap.text}
        </div>
      ` : ''}
    </div>
    
    <div class="learn-nav">
      <button class="learn-nav-btn" onclick="prevLearnSection()" ${currentSection === 0 ? 'disabled style="opacity:0.3"' : ''}>← Previous</button>
      <button class="learn-nav-btn primary" onclick="nextLearnSection()">
        ${currentSection === totalSections - 1 ? 'Complete Module ✓' : 'Next →'}
      </button>
    </div>
  `;
}

function nextLearnSection() {
  if (!currentModule) return;
  
  // Save progress
  if (!progress.learnProgress) progress.learnProgress = {};
  progress.learnProgress[currentModule.id] = Math.max(progress.learnProgress[currentModule.id] || 0, currentSection + 1);
  saveProgress();
  
  if (currentSection < currentModule.content.length - 1) {
    currentSection++;
    renderLearnSection();
  } else {
    // Module complete
    closeLearnModule();
  }
}

function prevLearnSection() {
  if (currentSection > 0) {
    currentSection--;
    renderLearnSection();
  }
}

function closeLearnModule() {
  currentModule = null;
  currentSection = 0;
  renderLearnModules();
}

/* ─── DEADLINE COUNTDOWN ─────────────── */
function updateDeadlineCountdown() {
  // IB recruiting deadlines - approximate next major deadline
  const deadlines = [
    { date: new Date('2025-03-01'), name: 'Summer 2025 SA Applications' },
    { date: new Date('2025-08-15'), name: 'FT 2026 Applications' },
    { date: new Date('2025-09-01'), name: 'Fall Recruiting' },
  ];
  
  const now = new Date();
  let nextDeadline = deadlines.find(d => d.date > now) || deadlines[0];
  
  const diffTime = nextDeadline.date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const countdownEl = document.getElementById('deadline-countdown');
  const titleEl = document.querySelector('.deadline-title');
  
  if (countdownEl) {
    if (diffDays <= 0) {
      countdownEl.textContent = 'Now!';
    } else if (diffDays === 1) {
      countdownEl.textContent = '1 day';
    } else {
      countdownEl.textContent = diffDays + ' days';
    }
  }
  
  if (titleEl && nextDeadline) {
    titleEl.textContent = nextDeadline.name;
  }
}

/* ─── INIT ───────────────────────────── */
window.addEventListener('DOMContentLoaded', async function() {
  try {
    const d = new Date();
    const el = document.getElementById('dash-date');
    if (el) el.textContent = d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
    updateDashStats();
    updateDeadlineCountdown();
    calcROI();
    demoFCRender();
  } catch (e) {
    console.error('Init error:', e);
  }

  // Show config banner immediately if Supabase failed to initialize. The
  // landing renders normally; auth actions short-circuit with a toast.
  renderConfigBanner();
  if (!sb) return;

  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const searchParams = new URLSearchParams(window.location.search);

  // Supabase sends type=recovery in hash (implicit) or query string (PKCE)
  const urlType = hashParams.get('type') || searchParams.get('type');
  const tokenHash = searchParams.get('token_hash');
  const pkceCode = searchParams.get('code');

  let pendingRecovery = urlType === 'recovery';

  // Handle expired/invalid auth links from Supabase
  if (hashParams.get('error_code') === 'otp_expired' || hashParams.get('error') === 'access_denied') {
    showScreen('auth');
    switchAuthTab('login');
    const forgotForm = document.getElementById('auth-forgot-form');
    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) loginForm.style.display = 'none';
    if (forgotForm) forgotForm.style.display = 'block';
    const msg = document.getElementById('forgot-msg');
    if (msg) showMsg(msg, 'error', 'Your reset link has expired. Request a new one below.');
  }

  function showNewPasswordForm() {
    pendingRecovery = true;
    showScreen('auth');
    ['auth-login-form','auth-signup-form','auth-forgot-form'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const newpwForm = document.getElementById('auth-newpw-form');
    if (newpwForm) newpwForm.style.display = 'block';
    document.getElementById('tab-login')?.classList.remove('active');
    document.getElementById('tab-signup')?.classList.remove('active');
  }

  // Show form immediately if URL signals recovery — blocks session restore below
  if (pendingRecovery) showNewPasswordForm();

  // Register listener FIRST so it catches events from token exchange
  sb.auth.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      showNewPasswordForm();
    } else if (event === 'SIGNED_IN' && session?.user && !pendingRecovery) {
      if (!currentUser) {
        try { await onSignedIn(session.user); } catch (e) { console.error('onSignedIn error:', e); }
      }
    } else if (event === 'SIGNED_OUT') {
      pendingRecovery = false;
      showScreen('landing');
    }
  });

  if (tokenHash) {
    // PKCE with token_hash (Supabase default for recent projects)
    try {
      await sb.auth.verifyOtp({ token_hash: tokenHash, type: urlType });
    } catch (e) {
      console.error('Token verification error:', e);
    }
  } else if (pkceCode) {
    // PKCE with code
    try {
      await sb.auth.exchangeCodeForSession(pkceCode);
    } catch (e) {
      console.error('Code exchange error:', e);
    }
  } else {
    // Returning user with stored session — show the login screen (don't
    // auto-redirect to dashboard). Browser autofills credentials, they
    // press Enter → signInWithPassword → dashboard.
    //
    // Exception: returning from Stripe Checkout (?paid=1 success, ?paid=0
    // cancel) — they're already authed and need to land in the app or
    // back on the paywall, not the login form.
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (session?.user && !pendingRecovery) {
        const paidParam = searchParams.get('paid');
        if (paidParam === '1' || paidParam === '0') {
          try { await onSignedIn(session.user); } catch (e) { console.error('onSignedIn error:', e); }
        } else {
          showAuthTab('login');
          const emailEl = document.getElementById('login-email');
          if (emailEl && !emailEl.value) emailEl.value = session.user.email;
          const passwordEl = document.getElementById('login-password');
          if (passwordEl) setTimeout(() => passwordEl.focus(), 100);
        }
      }
    } catch (e) {
      console.error('Session check error:', e);
    }
  }
});

/* ─── PROFILE ────────────────────────── */
let profileEditing = { info: false, pw: false };

function renderProfile() {
  const user = currentUser;
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest';
  const email = user?.email || 'guest mode';
  const cap = capitalize(fullName.split(' ')[0]);

  const avatarEl = document.getElementById('profile-avatar-lg');
  const nameEl = document.getElementById('profile-hero-name');
  const emailEl = document.getElementById('profile-hero-email');
  const nameInput = document.getElementById('profile-name');
  const emailInput = document.getElementById('profile-email');

  if (avatarEl) avatarEl.textContent = cap[0].toUpperCase();
  if (nameEl) nameEl.textContent = cap;
  if (emailEl) emailEl.textContent = email;
  if (nameInput) { nameInput.value = cap; nameInput.disabled = true; }
  if (emailInput) { emailInput.value = email; emailInput.disabled = true; }

  // Reset edit states
  profileEditing = { info: false, pw: false };
  const actionsInfo = document.getElementById('profile-actions-info');
  const actionsPw = document.getElementById('profile-actions-pw');
  const formPw = document.getElementById('profile-form-pw');
  const pwPlaceholder = document.getElementById('profile-pw-placeholder');
  if (actionsInfo) actionsInfo.style.display = 'none';
  if (actionsPw) actionsPw.style.display = 'none';
  if (formPw) formPw.style.display = 'none';
  if (pwPlaceholder) pwPlaceholder.style.display = 'flex';

  clearProfileMsg('info');
  clearProfileMsg('pw');
}

function toggleProfileEdit(section) {
  profileEditing[section] = !profileEditing[section];
  if (section === 'info') {
    if (!profileEditing.info) {
      renderProfile();
    } else {
      const nameInput = document.getElementById('profile-name');
      const emailInput = document.getElementById('profile-email');
      const actions = document.getElementById('profile-actions-info');
      const btn = document.getElementById('profile-edit-info-btn');
      if (nameInput && emailInput && actions && btn) {
        nameInput.disabled = false;
        emailInput.disabled = false;
        actions.style.display = 'flex';
        btn.textContent = 'Cancel';
        nameInput.focus();
      } else {
        profileEditing.info = false;
      }
    }
    clearProfileMsg('info');
  } else if (section === 'pw') {
    if (!profileEditing.pw) {
      renderProfile();
    } else {
      const formPw = document.getElementById('profile-form-pw');
      const actions = document.getElementById('profile-actions-pw');
      const placeholder = document.getElementById('profile-pw-placeholder');
      const btn = document.getElementById('profile-edit-pw-btn');
      const pwNew = document.getElementById('profile-pw-new');
      const pwConfirm = document.getElementById('profile-pw-confirm');
      if (formPw && actions && placeholder && btn) {
        formPw.style.display = 'flex';
        actions.style.display = 'flex';
        placeholder.style.display = 'none';
        btn.textContent = 'Cancel';
        if (pwNew) pwNew.value = '';
        if (pwConfirm) pwConfirm.value = '';
        if (pwNew) pwNew.focus();
      } else {
        profileEditing.pw = false;
      }
    }
    clearProfileMsg('pw');
  }
}

async function saveProfileInfo() {
  const nameEl = document.getElementById('profile-name');
  const emailEl = document.getElementById('profile-email');
  const nameVal = nameEl ? nameEl.value.trim() : '';
  const emailVal = emailEl ? emailEl.value.trim() : '';
  const msgEl = document.getElementById('profile-msg-info');

  if (!nameVal) { showProfileMsg('info', 'error', 'Name cannot be empty.'); return; }
  if (!emailVal || !emailVal.includes('@')) { showProfileMsg('info', 'error', 'Please enter a valid email.'); return; }

  if (!requireSupabase()) return;
  try {
    const updates = { data: { full_name: nameVal } };
    if (emailVal !== currentUser?.email) updates.email = emailVal;
    const { data, error } = await sb.auth.updateUser(updates);
    if (error) throw error;

    // Update UI everywhere
    const cap = capitalize(nameVal.split(' ')[0]);
    const g = document.getElementById('greeting-name');
    const n = document.getElementById('sb-name');
    const a = document.getElementById('sb-avatar');
    if (g) g.textContent = cap;
    if (n) n.textContent = cap;
    if (a) a.textContent = cap[0].toUpperCase();
    const sidebarEmail = document.getElementById('sb-email-display');
    if (sidebarEmail) sidebarEmail.textContent = emailVal;

    showProfileMsg('info', 'success', 'Profile updated successfully.');
    setTimeout(() => renderProfile(), 1500);
  } catch (e) {
    showProfileMsg('info', 'error', e.message || 'Failed to update profile.');
  }
}

async function saveProfilePassword() {
  const pwEl = document.getElementById('profile-pw-new');
  const confirmEl = document.getElementById('profile-pw-confirm');
  const pw = pwEl ? pwEl.value : '';
  const confirm = confirmEl ? confirmEl.value : '';

  if (!pw || pw.length < 8) { showProfileMsg('pw', 'error', 'Password must be at least 8 characters.'); return; }
  if (pw !== confirm) { showProfileMsg('pw', 'error', 'Passwords do not match.'); return; }
  if (!requireSupabase()) return;

  try {
    const { data, error } = await sb.auth.updateUser({ password: pw });
    if (error) throw error;
    showProfileMsg('pw', 'success', 'Password updated successfully.');
    setTimeout(() => renderProfile(), 1500);
  } catch (e) {
    showProfileMsg('pw', 'error', e.message || 'Failed to update password.');
  }
}

function showProfileMsg(section, type, text) {
  const el = document.getElementById('profile-msg-' + section);
  if (!el) return;
  el.className = 'profile-msg ' + type;
  el.textContent = text;
}
function clearProfileMsg(section) {
  const el = document.getElementById('profile-msg-' + section);
  if (el) { el.className = 'profile-msg'; el.textContent = ''; }
}

/* ─── INIT ───────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof calcROI === 'function') calcROI();
  if (typeof demoFCRender === 'function') demoFCRender();

  // Nav scroll shadow
  var nav = document.querySelector('.land-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }, { passive: true });
  }
});

