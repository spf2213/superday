import { createClient } from '@supabase/supabase-js';
import { QUESTIONS } from './src/data/questions.js';
import { LEARN_MODULES } from './src/data/learnModules.js';
import { setNavActive, toggleTheme } from './src/theme.js';
import { renderKnowledgeMap, mapZoom, mapFitAll, mapResetView, setMapDeps } from './src/map.js';
import './src/animations.js';
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
function pvMockSend() {
  const input = document.getElementById('pv-mock-input');
  const chat  = document.getElementById('pv-mock-chat');
  const text  = (input.value || '').trim();
  if (!text) return;
  input.value = '';

  // User bubble
  chat.innerHTML += `
    <div style="display:flex;gap:7px;flex-direction:row-reverse;align-items:flex-start">
      <div style="width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:700;color:var(--t-2);flex-shrink:0;margin-top:1px">Y</div>
      <div style="background:var(--accent);opacity:0.88;border-radius:8px 0 8px 8px;padding:8px 10px;font-size:11px;color:white;line-height:1.55;max-width:88%">${text.replace(/</g,'&lt;')}</div>
    </div>`;
  chat.scrollTop = chat.scrollHeight;

  // Typing indicator
  const typId = 'pvtyp_' + Date.now();
  chat.innerHTML += `
    <div id="${typId}" style="display:flex;gap:7px;align-items:flex-start">
      <div style="width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#5E6AD2,#8b8ff8);display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:700;color:white;flex-shrink:0;margin-top:1px">AC</div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid var(--line);border-radius:0 8px 8px 8px;padding:8px 12px;font-size:13px;color:var(--t-3);letter-spacing:2px">···</div>
    </div>`;
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    const typ = document.getElementById(typId);
    if (typ) typ.remove();
    const r = PV_MOCK_REPLIES[pvMockRound % PV_MOCK_REPLIES.length];
    pvMockRound++;
    const sc = (n) => `<span style="color:${n>=8?'var(--green)':'#e0a820'};font-weight:600">${n}/10</span>`;
    const scores = `<div style="display:flex;gap:10px;margin-top:5px;font-size:10px;color:var(--t-3)">Technical ${sc(r.t)} · Structure ${sc(r.s)} · Confidence ${sc(r.c)}</div>`;
    chat.innerHTML += `
      <div style="display:flex;gap:7px;align-items:flex-start">
        <div style="width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#5E6AD2,#8b8ff8);display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:700;color:white;flex-shrink:0;margin-top:1px">AC</div>
        <div style="background:rgba(255,255,255,0.05);border:1px solid var(--line);border-radius:0 8px 8px 8px;padding:8px 10px;font-size:11px;color:var(--t-2);line-height:1.55;max-width:88%">
          ${r.text}${scores}
        </div>
      </div>`;
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
  if (tipEl) tipEl.textContent = '💡 ' + c.tip;
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
function demoChatSend() {
  const input = document.getElementById('demo-chat-input');
  const body = document.getElementById('demo-chat-body');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  // Add user message
  body.innerHTML += `<div class="chat-msg user"><div class="cm-av usr">Y</div><div class="cm-bubble usr">${text}</div></div>`;
  body.scrollTop = body.scrollHeight;
  // Typing indicator
  const typingId = 'demo-typing-' + Date.now();
  body.innerHTML += `<div class="chat-msg" id="${typingId}"><div class="cm-av ai">AC</div><div class="cm-bubble ai"><span class="tdot"></span><span class="tdot"></span><span class="tdot"></span></div></div>`;
  body.scrollTop = body.scrollHeight;
  setTimeout(() => {
    const typing = document.getElementById(typingId);
    if (typing) typing.remove();
    const r = DEMO_RESPONSES[demoChatRound % DEMO_RESPONSES.length];
    demoChatRound++;
    const scoreHtml = `<div class="score-block" style="margin-top:6px">
      <div class="score-line"><span class="sc-label">Technical Accuracy</span><span class="sc-val ${r.score.tech>=8?'sc-g':'sc-y'}">${r.score.tech}/10</span></div>
      <div class="score-line"><span class="sc-label">Structure & Clarity</span><span class="sc-val ${r.score.struct>=8?'sc-g':'sc-y'}">${r.score.struct}/10</span></div>
      <div class="score-line"><span class="sc-label">Confidence</span><span class="sc-val ${r.score.conf>=8?'sc-g':'sc-y'}">${r.score.conf}/10</span></div>
    </div>`;
    body.innerHTML += `<div class="chat-msg"><div class="cm-av ai">AC</div><div class="cm-bubble ai">Good answer. ${scoreHtml}</div></div>`;
    body.innerHTML += `<div class="chat-msg"><div class="cm-av ai">AC</div><div class="cm-bubble ai">${r.follow}</div></div>`;
    body.scrollTop = body.scrollHeight;
  }, 1200);
}

/* ─── SUPABASE ────────────────────────── */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY env vars.');
}
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

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
  if (btn) { btn.disabled = true; btn.textContent = 'Updating…'; }
  const { error } = await sb.auth.updateUser({ password: pw });
  if (btn) { btn.disabled = false; btn.textContent = 'Update password →'; }
  if (error) { if (msg) showMsg(msg, 'error', error.message); return; }
  if (msg) showMsg(msg, 'success', 'Password updated! Logging you in…');
  setTimeout(() => {
    const { data: { session } } = sb.auth.getSession().then(({ data: { session } }) => {
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
  if (btn) { btn.disabled = true; btn.textContent = 'Logging in…'; }
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (btn) { btn.disabled = false; btn.textContent = 'Log in →'; }
  if (error) { if (msg) showMsg(msg, 'error', error.message); return; }
  await onSignedIn(data.user);
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
  await sb.auth.signOut();
  currentUser = null;
  progress = {
    answered: new Set(),
    activityLog: [],
    mastery: {},
    diagnosticDone: false,
    userBand: 'intermediate',
    diagnosticScores: null,
    onrampComplete: false,
    userProfile: null,
    notes: [],
    questionNotes: {},
    completedTasks: [],
    learnProgress: {},
    completedCases: []
  };
  showScreen('landing');
}

function showMsg(el, type, text) {
  if (!el) return;
  el.className = 'auth-msg ' + type;
  el.textContent = text;
}

async function onSignedIn(user) {
  currentUser = user;
  const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const cap = capitalize(name);
  const greetingEl = document.getElementById('greeting-name');
  const sbNameEl = document.getElementById('sb-name');
  const sbAvatarEl = document.getElementById('sb-avatar');
  if (greetingEl) greetingEl.textContent = cap;
  if (sbNameEl) sbNameEl.textContent = cap;
  if (sbAvatarEl) sbAvatarEl.textContent = cap[0].toUpperCase();
  const emailEl = document.getElementById('sb-email-display');
  if (emailEl) emailEl.textContent = user.email;
  await loadProgress();
  showScreen('app');
}

/* ─── PROGRESS PERSISTENCE ───────────────── */
async function loadProgress() {
  if (!currentUser) return;
  try {
    const { data, error } = await sb.from('progress').select('*').eq('user_id', currentUser.id).single();
    
    if (error && error.code === 'PGRST116') {
      // No row exists yet — create one
      await sb.from('progress').insert({ user_id: currentUser.id });
    }
    
    if (data) {
      progress.answered = new Set(data.answered || []);
      progress.activityLog = data.activity_log || [];
      progress.mastery = data.mastery || {};
      progress.diagnosticDone = data.diagnostic_done || false;
      progress.userBand = data.user_band || 'intermediate';
      progress.diagnosticScores = data.diagnostic_scores || null;
      progress.onrampComplete = data.onramp_complete || false;
      progress.userProfile = data.user_profile || null;
      progress.notes = data.notes || [];
      progress.questionNotes = data.question_notes || {};
      progress.completedTasks = data.completed_tasks || [];
      progress.learnProgress = data.learn_progress || {};
      progress.completedCases = data.completed_cases || [];
    }
  } catch(e) { console.error('loadProgress error:', e); }
  updateDashStats();
  updateMasteryStats();
  renderPrepPlan();
  
  if (progress.onrampComplete) {
    const btn = document.getElementById('story-bank-btn');
    if (btn) btn.classList.add('show');
  }
  if (!progress.diagnosticDone) {
    setTimeout(checkFirstVisit, 500);
  }
}

async function saveProgress() {
  if (!currentUser) return;
  try {
    await sb.from('progress').upsert({
      user_id: currentUser.id,
      answered: [...progress.answered],
      activity_log: progress.activityLog,
      mastery: progress.mastery,
      diagnostic_done: progress.diagnosticDone,
      user_band: progress.userBand,
      diagnostic_scores: progress.diagnosticScores,
      onramp_complete: progress.onrampComplete,
      user_profile: progress.userProfile,
      notes: progress.notes || [],
      question_notes: progress.questionNotes || {},
      completed_tasks: progress.completedTasks || [],
      learn_progress: progress.learnProgress || {},
      completed_cases: progress.completedCases || []
    }, { onConflict: 'user_id' });
  } catch(e) { console.error('saveProgress error:', e); }
}

/* ─── SCREENS ────────────────────────── */
function showScreen(id) {
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
  }
}

function ctaSignup() {
  const ctaEmail = document.getElementById('cta-email');
  const email = ctaEmail ? ctaEmail.value.trim() : '';
  if (email) {
    const signupEmail = document.getElementById('signup-email');
    if (signupEmail) signupEmail.value = email;
  }
  showAuthTab('signup');
}

function capitalize(s) { return (s && typeof s === 'string') ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

/* ─── VIEWS ──────────────────────────── */
function showView(id) {
  document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.sb-item').forEach(n => n.classList.remove('active'));
  const view = document.getElementById('view-' + id);
  if (view) view.classList.add('active');
  const labels = {dashboard:'Dashboard',bank:'Question Bank',flash:'Flashcards',mock:'Mock Interview',quiz:'Quiz Mode',map:'Knowledge Map',learn:'Concepts',profile:'Profile'};
  document.querySelectorAll('.sb-item').forEach(n => {
    if (n.textContent.trim().toLowerCase().includes((labels[id]||id).toLowerCase()))
      n.classList.add('active');
  });
  if (id === 'bank') renderBank();
  if (id === 'flash') initFlash();
  if (id === 'map') renderKnowledgeMap();
  if (id === 'quiz') showQuizSetup();
  if (id === 'learn') renderLearnModules();
  if (id === 'profile') renderProfile();
}

function filterBankNav(cat) {
  showView('bank');
  setTimeout(() => filterBank(cat), 50);
}

/* ─── PROGRESS ───────────────────────── */
// Mastery levels: 0 = new, 1 = missed, 2 = unsure, 3 = got it (mastered after 3 consecutive)
// SRS intervals in minutes: [1, 10, 60, 360, 1440, 4320, 10080] (1min to 1 week)
const SRS_INTERVALS = [1, 10, 60, 360, 1440, 4320, 10080];

let progress = { 
  answered: new Set(), 
  activityLog: [],
  mastery: {},
  diagnosticDone: false,
  userBand: 'intermediate',
  diagnosticScores: null,
  onrampComplete: false,
  userProfile: null,
  notes: [],
  questionNotes: {},
  completedTasks: [],
  learnProgress: {},
  completedCases: []
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
  
  // Update mode counts
  const mca = document.getElementById('mode-count-all');
  const mcd = document.getElementById('mode-count-due');
  const mcw = document.getElementById('mode-count-weak');
  if (mca) mca.textContent = QUESTIONS.length;
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

function updateDashStats() {
  const total = QUESTIONS.length;
  const ans = progress.answered.size;
  const ka = document.getElementById('kpi-answered');
  const kt = document.getElementById('kpi-total');
  const kaf = document.getElementById('kpi-answered-fill');
  if (ka) ka.textContent = ans;
  if (kt) kt.textContent = total;
  if (kaf) kaf.style.width = (ans/total*100) + '%';

  const cats = ['tech','beh','brain','deal'];
  const done = cats.filter(c => QUESTIONS.filter(q=>q.cat===c).some(q=>progress.answered.has(q.id)));
  const kc = document.getElementById('kpi-cats');
  const kcf = document.getElementById('kpi-cats-fill');
  if (kc) kc.textContent = done.length;
  if (kcf) kcf.style.width = (done.length/4*100) + '%';

  // Due for review
  const dueCount = getDueCount();
  const kd = document.getElementById('kpi-due');
  const kdf = document.getElementById('kpi-due-fill');
  if (kd) kd.textContent = dueCount;
  if (kdf) kdf.style.width = (dueCount/total*100) + '%';

  // Mastered count
  const masteredCount = QUESTIONS.filter(q => getMasteryClass(q.id) === 'mastered').length;
  const km = document.getElementById('kpi-mastered');
  const kmf = document.getElementById('kpi-mastered-fill');
  if (km) km.textContent = masteredCount;
  if (kmf) kmf.style.width = (masteredCount/total*100) + '%';

  // Update practice button text
  const practiceBtn = document.getElementById('practice-btn-text');
  if (practiceBtn) {
    if (dueCount > 0) {
      practiceBtn.textContent = 'Review ' + dueCount + ' due cards →';
    } else if (masteredCount < total) {
      practiceBtn.textContent = 'Continue learning →';
    } else {
      practiceBtn.textContent = 'Practice today →';
    }
  }

  const days = ['M','T','W','T','F','S','S'];
  const idx = (new Date().getDay()+6)%7;
  const sd = document.getElementById('streak-dots');
  if (sd) sd.innerHTML = days.map((d,i) => {
    const cls = i < idx ? 'done' : i === idx ? 'today' : 'empty';
    return '<div class="s-dot ' + cls + '">' + d + '</div>';
  }).join('');
  const ks = document.getElementById('kpi-streak');
  if (ks) ks.textContent = idx + 1;

  cats.forEach(c => {
    const pool = QUESTIONS.filter(q=>q.cat===c);
    const n = pool.filter(q=>progress.answered.has(q.id)).length;
    const pct = Math.round(n/pool.length*100);
    const pe = document.getElementById('pct-'+c);
    const fe = document.getElementById('fill-'+c);
    const ce = document.getElementById('count-'+c);
    if (pe) pe.textContent = pct+'%';
    if (fe) fe.style.width = pct+'%';
    if (ce) ce.textContent = n + ' of ' + pool.length + ' answered';
  });
  renderActivity();
}

function smartPractice() {
  const dueCount = getDueCount();
  if (dueCount > 0) {
    goToDueReview();
  } else {
    showView('flash');
  }
}

function goToDueReview() {
  showView('flash');
  setTimeout(() => setStudyMode('due'), 100);
}

function renderActivity() {
  const el = document.getElementById('activity-list');
  if (!el) return;
  if (!progress.activityLog.length) {
    el.innerHTML = '<div style="padding:32px 16px;text-align:center;font-size:12.5px;color:var(--t-3)">No activity yet — start practicing.</div>';
    return;
  }
  const icons = { tech:'📊', beh:'💬', brain:'🧠', deal:'📈' };
  const colors = { tech:'var(--accent-dim)', beh:'var(--green-dim)', brain:'var(--amber-dim)', deal:'var(--blue-dim)' };
  el.innerHTML = progress.activityLog.map(a =>
    '<div class="act-item">' +
    '<div class="act-icon" style="background:' + (colors[a.cat]||'var(--bg-3)') + '">' + (icons[a.cat]||'📋') + '</div>' +
    '<div class="act-text">' + (a.title.length > 55 ? a.title.slice(0,55)+'…' : a.title) + '</div>' +
    '<div class="act-time">' + a.time + '</div></div>'
  ).join('');
}

/* ─── NEWS ───────────────────────────── */
async function loadNews() {
  const el = document.getElementById('news-list');
  if (!el) return;
  try {
    const res = await fetch("/api/claude", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        model:"claude-haiku-4-5-20251001",
        max_tokens:800,
        messages:[{role:"user",content:"Generate 5 realistic market news headlines for today (" + new Date().toDateString() + ") relevant to IB candidates. Cover M&A, capital markets, macro, deals. Return ONLY a JSON array: [{tag,headline,time}]. tag: M&A|MARKETS|RATES|DEALS|MACRO. time: Xm ago or Xh ago. No markdown."}]
      })
    });
    const data = await res.json();
    const raw = data.content?.map(c=>c.text||'').join('')||'[]';
    const items = JSON.parse(raw.replace(/```json|```/g,'').trim());
    el.innerHTML = items.map(n =>
      '<div class="news-item-row">' +
      '<span class="news-tag-pill">' + n.tag + '</span>' +
      '<span class="news-hl">' + n.headline + '</span>' +
      '<span class="news-time-sm">' + n.time + '</span></div>'
    ).join('');
  } catch(e) {
    el.innerHTML = '<div style="padding:24px;text-align:center;font-size:12px;color:var(--t-3)">Market news unavailable.</div>';
  }
}

/* ─── QUESTION BANK ──────────────────── */
let bankCat = 'all', bankSub = 'all';

function catLabel(c) {
  return {tech:'Technical',beh:'Behavioral',brain:'Brain Teaser',deal:'Deals & Markets'}[c]||c;
}

function filterBank(cat) {
  bankCat = cat; bankSub = 'all';
  document.querySelectorAll('.bank-pill[data-cat]').forEach(b =>
    b.classList.toggle('active', b.dataset.cat === cat));
  const subRow = document.getElementById('subtopic-row');
  if (subRow) {
    subRow.classList.toggle('show', cat === 'tech');
    document.querySelectorAll('.bank-pill[data-sub]').forEach(b =>
      b.classList.toggle('active', b.dataset.sub === 'all'));
  }
  renderBank();
}

function filterSub(sub) {
  bankSub = sub;
  document.querySelectorAll('.bank-pill[data-sub]').forEach(b =>
    b.classList.toggle('active', b.dataset.sub === sub));
  renderBank();
}

function renderBank() {
  const search = (document.getElementById('bank-search')?.value||'').toLowerCase();
  let qs = bankCat === 'all' ? QUESTIONS : QUESTIONS.filter(q => q.cat === bankCat);
  if (bankCat === 'tech' && bankSub !== 'all') qs = qs.filter(q => q.sub === bankSub);
  if (search) qs = qs.filter(q => q.q.toLowerCase().includes(search)||q.a.toLowerCase().includes(search));
  const el = document.getElementById('q-list');
  if (!el) return;

  if (bankCat === 'tech' && bankSub === 'all' && !search) {
    const acc = qs.filter(q=>q.sub==='accounting');
    const val = qs.filter(q=>q.sub==='valuation');
    const lbo = qs.filter(q=>q.sub==='lbo');
    const ma = qs.filter(q=>q.sub==='ma');
    el.innerHTML = renderGroup('Accounting', acc, 0) + renderGroup('Valuation', val, acc.length) + renderGroup('LBO', lbo, acc.length + val.length) + renderGroup('M&A', ma, acc.length + val.length + lbo.length);
    return;
  }
  el.innerHTML = qs.map((q,i) => renderQRow(q,i)).join('');
}

function renderGroup(title, qs, offset) {
  if (!qs.length) return '';
  return '<div class="q-group-header"><span class="q-group-title">' + title + '</span><span class="q-group-count">' + qs.length + ' questions</span><div class="q-group-line"></div></div>' +
    qs.map((q,i) => renderQRow(q, offset+i)).join('');
}

function renderQRow(q, i) {
  const pillClass = {tech:'qp-tech',beh:'qp-beh',brain:'qp-brain',deal:'qp-deal'}[q.cat]||'qp-tech';
  const subLabels = {accounting:'Accounting', valuation:'Valuation', lbo:'LBO', ma:'M&A'};
  const tag = q.sub
    ? '<span class="q-pill ' + pillClass + '">' + (subLabels[q.sub] || q.sub) + '</span>'
    : '<span class="q-pill ' + pillClass + '">' + catLabel(q.cat) + '</span>';
  const masteryClass = getMasteryClass(q.id);
  const masteryDot = '<span class="mastery-dot ' + masteryClass + '" title="' + 
    (masteryClass === 'mastered' ? 'Mastered' : masteryClass === 'learning' ? 'Learning' : 'New') + '"></span>';
  return '<div class="q-row" id="qr-' + q.id + '" onclick="toggleQ(' + q.id + ')">' +
    '<div class="q-head">' + masteryDot + '<span class="q-num">' + String(i+1).padStart(2,'0') + '</span>' +
    '<span class="q-text">' + q.q + '</span>' + tag +
    '<span class="q-caret">⌄</span></div>' +
    '<div class="q-body"><div class="q-body-label">Model Answer</div>' +
    '<div class="q-body-answer">' + q.a + '</div>' +
    '<div class="q-body-tip"><strong>Interview tip:</strong> ' + q.tip + '</div></div></div>';
}

function toggleQ(id) {
  const el = document.getElementById('qr-'+id);
  if (!el) return;
  el.classList.toggle('open');
  if (el.classList.contains('open')) markAnswered(id);
}

/* ─── FLASHCARDS ─────────────────────── */
let flashDeck = [], flashIdx = 0, flashFlipped = false;
let flashCat = 'all';

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

function setFlashCat(cat) {
  flashCat = cat;
  document.querySelectorAll('.bank-pill[data-fcat]').forEach(b =>
    b.classList.toggle('active', b.dataset.fcat === cat));
  buildFlashDeck();
  flashIdx = 0;
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
    
    if (cl) cl.innerHTML = catLabel(q.cat) + (q.sub ? ' — ' + q.sub.charAt(0).toUpperCase() + q.sub.slice(1) : '') + 
      ' <span style="opacity:0.6">' + masteryDot + '</span>' + 
      (dueIndicator ? '<span class="due-badge" style="margin-left:8px">DUE</span>' : '');
    if (qt) qt.textContent = q.q;
    if (bt) bt.textContent = q.a;
    if (fm) fm.textContent = 'Card ' + (flashIdx + 1) + ' of ' + flashDeck.length + 
      (studyMode === 'quick' ? ' · Quick Session' : '');
    if (ff) ff.style.width = ((flashIdx + 1) / flashDeck.length * 100) + '%';
    if (fp) fp.disabled = flashIdx === 0;
    if (fn) fn.disabled = flashIdx === flashDeck.length - 1;
  }, 80);
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
  
  // Calculate next due time
  const intervalMinutes = SRS_INTERVALS[m.streak];
  m.nextDue = Date.now() + (intervalMinutes * 60 * 1000);
  
  // Save and move to next card
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
  if (qt) qt.innerHTML = '🎉 You finished 10 cards!<br><br>' +
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
let mockHistory = [], mockActive = false;

function startMock() {
  mockActive = true;
  const badge = document.getElementById('iv-badge');
  if (badge) { badge.className = 'iv-badge badge-live'; badge.textContent = '● LIVE'; }
  mockHistory = [];
  const catEl = document.getElementById('mock-cat');
  const firmEl = document.getElementById('mock-firm');
  const cat = catEl ? catEl.value : 'tech';
  const firm = firmEl ? firmEl.value : 'Goldman Sachs';
  const chatBody = document.getElementById('chat-body');
  if (chatBody) chatBody.innerHTML = '';
  appendMsg('ai', 'Welcome. I\'m Alex Chen, VP in M&A at ' + firm + '. This is a technical interview — I\'ll ask you questions and score each answer. Ready? Let\'s start.');
  setTimeout(function() { askQuestion(cat); }, 800);
}

function askQuestion(cat) {
  const pool = QUESTIONS.filter(q=>q.cat===cat);
  const q = pool[Math.floor(Math.random()*pool.length)];
  mockHistory.push({role:'assistant', content:q.q});
  appendMsg('ai', q.q);
}

function appendMsg(role, text) {
  const body = document.getElementById('chat-body');
  if (!body) return;
  const div = document.createElement('div');
  div.className = 'chat-msg' + (role==='user'?' user':'');
  div.innerHTML = '<div class="cm-av ' + (role==='ai'?'ai':'usr') + '">' + (role==='ai'?'AC':'Y') + '</div>' +
    '<div class="cm-bubble ' + (role==='ai'?'ai':'usr') + '">' + text + '</div>';
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function showTyping() {
  const body = document.getElementById('chat-body');
  if (!body) return;
  const div = document.createElement('div');
  div.className = 'chat-msg'; div.id = 'typing-indicator';
  div.innerHTML = '<div class="cm-av ai">AC</div><div class="typing-indicator"><div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div></div>';
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
  const firm = firmEl ? firmEl.value : 'Goldman Sachs';
  try {
    const res = await fetch("/api/claude", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        model:"claude-sonnet-4-6",
        max_tokens:600,
        system: "You are Alex Chen, VP in M&A at " + firm + ". Conduct a rigorous IB interview. After the candidate's answer, give brief feedback and scores: 'Technical: X/10 | Structure: X/10 | Confidence: X/10'. Then ask a follow-up. Keep it concise and challenging.",
        messages: mockHistory.map(m=>({role:m.role,content:m.content}))
      })
    });
    const data = await res.json();
    removeTyping();
    const reply = data.content?.map(c=>c.text||'').join('')||'Could not get response.';
    mockHistory.push({role:'assistant',content:reply});
    const scoreMatch = reply.match(/Technical:\s*(\d+)\/10.*?Structure:\s*(\d+)\/10.*?Confidence:\s*(\d+)\/10/i);
    let displayReply = reply.replace(/\n/g,'<br>');
    if (scoreMatch) {
      const t=scoreMatch[1], s=scoreMatch[2], c=scoreMatch[3];
      const cc = n => parseInt(n)>=8?'sc-g':parseInt(n)>=6?'sc-y':'sc-r';
      const sh = '<div class="score-block" style="margin-top:8px">' +
        '<div class="score-line"><span class="sc-label">Technical Accuracy</span><span class="sc-val ' + cc(t) + '">' + t + '/10</span></div>' +
        '<div class="score-line"><span class="sc-label">Structure &amp; Clarity</span><span class="sc-val ' + cc(s) + '">' + s + '/10</span></div>' +
        '<div class="score-line"><span class="sc-label">Confidence</span><span class="sc-val ' + cc(c) + '">' + c + '/10</span></div></div>';
      displayReply = reply.replace(/Technical:\s*\d+\/10.*?Confidence:\s*\d+\/10/i,'').replace(/\n/g,'<br>') + sh;
    }
    const body = document.getElementById('chat-body');
    if (body) {
      const div = document.createElement('div');
      div.className = 'chat-msg';
      div.innerHTML = '<div class="cm-av ai">AC</div><div class="cm-bubble ai">' + displayReply + '</div>';
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }
  } catch(e) {
    removeTyping();
    appendMsg('ai', 'Connection error. Please try again.');
  }
  if (sendBtn) sendBtn.disabled = false;
}

/* ─── QUIZ MODE ─────────────────────── */
let quizQuestions = [];
let quizIndex = 0;
let quizCorrect = 0;
let quizAnswered = false;
let quizMistakes = [];

function startQuiz() {
  const catEl = document.getElementById('quiz-cat-select');
  const countEl = document.getElementById('quiz-count-select');
  const diffEl = document.getElementById('quiz-diff-select');
  const cat = catEl ? catEl.value : 'all';
  const countVal = countEl ? countEl.value : '10';
  const diff = diffEl ? diffEl.value : 'all';
  
  // Filter questions that have MCQ options
  let pool = QUESTIONS.filter(q => q.wrong && q.wrong.length > 0);
  
  if (cat !== 'all') {
    pool = pool.filter(q => q.cat === cat);
  }
  
  if (diff !== 'all') {
    pool = pool.filter(q => q.difficulty === parseInt(diff));
  }
  
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  
  // Limit count
  const count = countVal === 'all' ? pool.length : Math.min(parseInt(countVal), pool.length);
  quizQuestions = pool.slice(0, count);
  quizIndex = 0;
  quizCorrect = 0;
  quizMistakes = [];
  quizAnswered = false;
  
  const setupEl = document.getElementById('quiz-setup');
  const activeEl = document.getElementById('quiz-active');
  const resultsEl = document.getElementById('quiz-results');
  if (setupEl) setupEl.style.display = 'none';
  if (activeEl) activeEl.style.display = 'block';
  if (resultsEl) resultsEl.style.display = 'none';
  
  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (quizIndex >= quizQuestions.length) {
    showQuizResults();
    return;
  }
  
  const q = quizQuestions[quizIndex];
  quizAnswered = false;
  
  // Update progress
  const progressFill = document.getElementById('quiz-progress-fill');
  const progressText = document.getElementById('quiz-progress-text');
  if (progressFill) progressFill.style.width = ((quizIndex) / quizQuestions.length * 100) + '%';
  if (progressText) progressText.textContent = (quizIndex + 1) + ' / ' + quizQuestions.length;
  
  // Category label
  const catLabels = {tech: 'TECHNICAL', beh: 'BEHAVIORAL', deal: 'DEALS & MARKETS', brain: 'BRAIN TEASER'};
  const subLabels = {accounting: ' — ACCOUNTING', valuation: ' — VALUATION', lbo: ' — LBO', ma: ' — M&A'};
  const currentCat = document.getElementById('quiz-current-cat');
  const currentQ = document.getElementById('quiz-current-question');
  if (currentCat) currentCat.textContent = (catLabels[q.cat] || 'TECHNICAL') + (subLabels[q.sub] || '');
  if (currentQ) currentQ.textContent = q.q;
  
  // Shuffle answers
  const answers = [
    { text: q.a, correct: true },
    { text: q.wrong[0], correct: false },
    { text: q.wrong[1], correct: false },
    { text: q.wrong[2], correct: false }
  ].filter(a => a.text);
  
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  
  const letters = ['A', 'B', 'C', 'D'];
  const answersEl = document.getElementById('quiz-answers');
  if (answersEl) answersEl.innerHTML = answers.map((a, i) => 
    `<div class="quiz-answer" data-correct="${a.correct}" onclick="selectQuizAnswer(this)">
      <span class="quiz-letter">${letters[i]}</span>
      <span>${a.text}</span>
    </div>`
  ).join('');
  
  // Hide feedback and actions
  const feedbackEl = document.getElementById('quiz-feedback');
  const actionsEl = document.getElementById('quiz-actions');
  if (feedbackEl) feedbackEl.className = 'quiz-feedback';
  if (actionsEl) actionsEl.style.display = 'none';
}

function selectQuizAnswer(el) {
  if (quizAnswered) return;
  quizAnswered = true;
  
  const isCorrect = el.dataset.correct === 'true';
  const q = quizQuestions[quizIndex];
  
  // Mark all answers
  document.querySelectorAll('.quiz-answer').forEach(a => {
    a.classList.add('disabled');
    if (a.dataset.correct === 'true') {
      a.classList.add('correct');
    } else if (a === el && !isCorrect) {
      a.classList.add('incorrect');
    }
  });
  
  // Update score and mastery
  if (isCorrect) {
    quizCorrect++;
    rateCardById(q.id, 3); // Got it
  } else {
    quizMistakes.push(q);
    rateCardById(q.id, 1); // Missed
  }
  
  // Show feedback
  const feedback = document.getElementById('quiz-feedback');
  if (feedback) {
    feedback.className = 'quiz-feedback show ' + (isCorrect ? 'correct' : 'incorrect');
    feedback.innerHTML = `
    <div class="quiz-feedback-title">${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</div>
    <div class="quiz-feedback-text">${isCorrect ? '' : '<strong>Correct answer:</strong> ' + q.a}</div>
  `;
  }
  
  // Show next button
  const actionsEl = document.getElementById('quiz-actions');
  if (actionsEl) actionsEl.style.display = 'flex';
}

function rateCardById(id, rating) {
  const m = getMastery(id);
  m.level = rating;
  m.lastSeen = Date.now();
  if (rating === 3) {
    m.streak = Math.min(m.streak + 1, SRS_INTERVALS.length - 1);
  } else if (rating === 1) {
    m.streak = 0;
  } else {
    m.streak = Math.max(0, m.streak - 1);
  }
  const intervalMinutes = SRS_INTERVALS[m.streak];
  m.nextDue = Date.now() + (intervalMinutes * 60 * 1000);
  saveProgress();
}

function nextQuizQuestion() {
  quizIndex++;
  renderQuizQuestion();
}

function showQuizResults() {
  const activeEl = document.getElementById('quiz-active');
  const resultsEl = document.getElementById('quiz-results');
  if (activeEl) activeEl.style.display = 'none';
  if (resultsEl) resultsEl.style.display = 'block';
  
  const pct = quizQuestions.length ? Math.round(quizCorrect / quizQuestions.length * 100) : 0;
  const scoreEl = document.getElementById('quiz-final-score');
  const correctEl = document.getElementById('quiz-correct-count');
  const incorrectEl = document.getElementById('quiz-incorrect-count');
  const totalEl = document.getElementById('quiz-total-count');
  if (scoreEl) scoreEl.textContent = pct + '%';
  if (correctEl) correctEl.textContent = quizCorrect;
  if (incorrectEl) incorrectEl.textContent = quizQuestions.length - quizCorrect;
  if (totalEl) totalEl.textContent = quizQuestions.length;
  
  updateMasteryStats();
  updateDashStats();
}

function showQuizSetup() {
  const setupEl = document.getElementById('quiz-setup');
  const activeEl = document.getElementById('quiz-active');
  const resultsEl = document.getElementById('quiz-results');
  if (setupEl) setupEl.style.display = 'block';
  if (activeEl) activeEl.style.display = 'none';
  if (resultsEl) resultsEl.style.display = 'none';
}

function reviewQuizMistakes() {
  if (!quizMistakes.length) {
    alert('No mistakes to review!');
    return;
  }
  // Go to flashcards with just the mistakes
  flashDeck = [...quizMistakes];
  flashIdx = 0;
  flashFlipped = false;
  showView('flash');
  renderCard();
}

/* ─── DIAGNOSTIC ASSESSMENT ─────────── */
let diagQuestions = [];
let diagIndex = 0;
let diagScores = { tech: 0, beh: 0, deal: 0 };
let diagCounts = { tech: 0, beh: 0, deal: 0 };

function checkFirstVisit() {
  if (!progress.diagnosticDone && currentUser) {
    document.getElementById('diagnostic-overlay').classList.add('show');
  }
}

function startDiagnostic() {
  // Select 12 questions: 2 accounting, 2 valuation, 1 M&A, 1 LBO, 2 beh, 2 deal, 2 brain
  const techAcc = QUESTIONS.filter(q => q.cat === 'tech' && q.sub === 'accounting' && q.wrong).slice(0, 2);
  const techVal = QUESTIONS.filter(q => q.cat === 'tech' && q.sub === 'valuation' && q.wrong).slice(0, 2);
  const techMA = QUESTIONS.filter(q => q.cat === 'tech' && q.sub === 'ma' && q.wrong).slice(0, 1);
  const techLBO = QUESTIONS.filter(q => q.cat === 'tech' && q.sub === 'lbo' && q.wrong).slice(0, 1);
  const beh = QUESTIONS.filter(q => q.cat === 'beh' && q.wrong).slice(0, 2);
  const deal = QUESTIONS.filter(q => q.cat === 'deal' && q.wrong).slice(0, 2);
  const brain = QUESTIONS.filter(q => q.cat === 'brain' && q.wrong).slice(0, 2);
  
  diagQuestions = [...techAcc, ...techVal, ...techMA, ...techLBO, ...beh, ...deal, ...brain];
  
  // Shuffle
  for (let i = diagQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [diagQuestions[i], diagQuestions[j]] = [diagQuestions[j], diagQuestions[i]];
  }
  
  diagIndex = 0;
  diagScores = { tech: 0, beh: 0, deal: 0, brain: 0 };
  diagCounts = { tech: 0, beh: 0, deal: 0, brain: 0 };
  
  document.getElementById('diagnostic-welcome').style.display = 'none';
  document.getElementById('diagnostic-active').style.display = 'block';
  document.getElementById('diagnostic-results').style.display = 'none';
  
  renderDiagQuestion();
}

function renderDiagQuestion() {
  if (diagIndex >= diagQuestions.length) {
    showDiagResults();
    return;
  }
  
  const q = diagQuestions[diagIndex];
  
  document.getElementById('diag-progress-fill').style.width = ((diagIndex) / diagQuestions.length * 100) + '%';
  document.getElementById('diag-progress-text').textContent = (diagIndex + 1) + ' / ' + diagQuestions.length;
  
  const catLabels = {tech: 'TECHNICAL', beh: 'BEHAVIORAL', deal: 'MARKETS', brain: 'BRAIN TEASER'};
  document.getElementById('diag-cat').textContent = catLabels[q.cat] || 'QUESTION';
  document.getElementById('diag-question').textContent = q.q;
  
  const answers = [
    { text: q.a, correct: true },
    { text: q.wrong[0], correct: false },
    { text: q.wrong[1], correct: false },
    { text: q.wrong[2], correct: false }
  ].filter(a => a.text);
  
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  
  const letters = ['A', 'B', 'C', 'D'];
  document.getElementById('diag-answers').innerHTML = answers.map((a, i) => 
    `<div class="quiz-answer" data-correct="${a.correct}" onclick="selectDiagAnswer(this, '${q.cat}')">
      <span class="quiz-letter">${letters[i]}</span>
      <span>${a.text}</span>
    </div>`
  ).join('');
}

function selectDiagAnswer(el, cat) {
  const isCorrect = el.dataset.correct === 'true';
  
  diagCounts[cat]++;
  if (isCorrect) diagScores[cat]++;
  
  // Brief visual feedback
  el.classList.add(isCorrect ? 'correct' : 'incorrect');
  document.querySelectorAll('#diag-answers .quiz-answer').forEach(a => a.style.pointerEvents = 'none');
  
  setTimeout(() => {
    diagIndex++;
    renderDiagQuestion();
  }, 500);
}

function showDiagResults() {
  document.getElementById('diagnostic-active').style.display = 'none';
  document.getElementById('diagnostic-results').style.display = 'block';
  
  const total = diagScores.tech + diagScores.beh + diagScores.deal;
  const maxTotal = diagCounts.tech + diagCounts.beh + diagCounts.deal;
  const pct = Math.round(total / maxTotal * 100);
  
  // Determine band
  let band, bandClass, recommendation;
  if (pct >= 90) {
    band = 'EXPERT'; bandClass = 'expert';
    recommendation = 'You have strong fundamentals. Focus on edge cases, advanced LBO concepts, and mock interviews to sharpen your delivery.';
  } else if (pct >= 70) {
    band = 'ADVANCED'; bandClass = 'advanced';
    recommendation = 'Solid foundation. Identify your weak spots and drill those areas. Consider more practice with timed quizzes.';
  } else if (pct >= 40) {
    band = 'INTERMEDIATE'; bandClass = 'intermediate';
    recommendation = 'Good start. Focus on building core accounting and valuation knowledge before moving to complex topics.';
  } else {
    band = 'BEGINNER'; bandClass = 'beginner';
    recommendation = 'We recommend starting with the fundamentals. Work through accounting basics, then progress to valuation concepts.';
  }
  
  document.getElementById('diag-band').textContent = band;
  document.getElementById('diag-band').className = 'diagnostic-band ' + bandClass;
  document.getElementById('diag-score').textContent = pct + '%';
  
  const techPct = diagCounts.tech ? Math.round(diagScores.tech / diagCounts.tech * 100) : 0;
  const behPct = diagCounts.beh ? Math.round(diagScores.beh / diagCounts.beh * 100) : 0;
  const dealPct = diagCounts.deal ? Math.round(diagScores.deal / diagCounts.deal * 100) : 0;
  
  document.getElementById('diag-tech-score').textContent = techPct + '%';
  document.getElementById('diag-beh-score').textContent = behPct + '%';
  document.getElementById('diag-deal-score').textContent = dealPct + '%';
  document.getElementById('diag-recommendation').textContent = recommendation;
  
  // Save diagnostic results
  progress.diagnosticDone = true;
  progress.userBand = bandClass;
  progress.diagnosticScores = { tech: techPct, beh: behPct, deal: dealPct, overall: pct };
  saveProgress();
}

function skipDiagnostic() {
  progress.diagnosticDone = true;
  progress.userBand = 'intermediate';
  saveProgress();
  closeDiagnostic();
}

function closeDiagnostic() {
  document.getElementById('diagnostic-overlay').classList.remove('show');
  // If user came from landing with no auth via direct diagnostic button
  if (window._directDiagnostic) {
    window._directDiagnostic = false;
    showAuthTab('signup');
    return;
  }
  updateDashStats();
  updateMasteryStats();
  
  // Show on-ramp for new users who haven't set up their profile
  if (!progress.onrampComplete) {
    setTimeout(() => {
      document.getElementById('onramp-overlay').classList.add('show');
    }, 300);
  }
}

/* Direct diagnostic from landing page (no auth required) */
function startDirectDiagnostic() {
  window._directDiagnostic = true;
  // Show save results email capture and back button
  const saveEl = document.getElementById('diag-save-results');
  if (saveEl) saveEl.style.display = 'block';
  const backBtn = document.getElementById('diag-back-to-landing');
  if (backBtn) backBtn.style.display = '';
  // Show the diagnostic overlay
  document.getElementById('diagnostic-overlay').classList.add('show');
  // Reset state
  document.getElementById('diagnostic-welcome').style.display = '';
  document.getElementById('diagnostic-active').style.display = 'none';
  document.getElementById('diagnostic-results').style.display = 'none';
}

function saveDiagEmail() {
  const email = document.getElementById('diag-email')?.value;
  if (email) {
    try { localStorage.setItem('sd_diag_email', email); } catch(e) {}
    const saveEl = document.getElementById('diag-save-results');
    if (saveEl) saveEl.innerHTML = '<div style="font-size:12px;color:var(--green);text-align:center">✓ Saved! Create an account to access your personalized plan.</div>';
  }
}

function closeDiagnosticToLanding() {
  document.getElementById('diagnostic-overlay').classList.remove('show');
  window._directDiagnostic = false;
  showScreen('landing');
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
  
  if (!notes.length) {
    list.innerHTML = '<div class="story-empty">No notes yet. Add notes to questions while studying to build your personal story bank.</div>';
    return;
  }
  
  list.innerHTML = notes.map((note, i) => `
    <div class="story-item" onclick="viewStoryNote(${i})">
      <div class="story-item-cat">${note.category || 'NOTE'}</div>
      <div class="story-item-title">${note.title || 'Untitled'}</div>
      <div class="story-item-note">${(note.content || '').substring(0, 100)}${note.content?.length > 100 ? '...' : ''}</div>
    </div>
  `).join('');
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
    alert(`${note.title}\n\n${note.content}`);
  }
}

/* ─── BEGINNER ON-RAMP ──────────────── */
let onrampStep = 1;
let onrampData = { background: null, timeline: null, banks: [] };

function selectOnramp(el, field, value) {
  // Single select - deselect others
  el.parentElement.querySelectorAll('.onramp-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  onrampData[field] = value;
}

function toggleOnrampMulti(el, field, value) {
  el.classList.toggle('selected');
  if (!onrampData[field]) onrampData[field] = [];
  
  if (el.classList.contains('selected')) {
    if (!onrampData[field].includes(value)) onrampData[field].push(value);
  } else {
    onrampData[field] = onrampData[field].filter(v => v !== value);
  }
}

function nextOnrampStep() {
  if (onrampStep < 4) {
    document.getElementById('onramp-step-' + onrampStep).classList.remove('active');
    onrampStep++;
    document.getElementById('onramp-step-' + onrampStep).classList.add('active');
    updateOnrampDots();
    
    if (onrampStep === 4) {
      generateOnrampSummary();
    }
  }
}

function prevOnrampStep() {
  if (onrampStep > 1) {
    document.getElementById('onramp-step-' + onrampStep).classList.remove('active');
    onrampStep--;
    document.getElementById('onramp-step-' + onrampStep).classList.add('active');
    updateOnrampDots();
  }
}

function updateOnrampDots() {
  document.querySelectorAll('.onramp-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'done');
    if (i + 1 === onrampStep) dot.classList.add('active');
    if (i + 1 < onrampStep) dot.classList.add('done');
  });
}

function generateOnrampSummary() {
  const summaryEl = document.getElementById('onramp-summary');
  let summary = '';
  
  const timelineLabels = {
    '2weeks': '2-week intensive plan',
    '1month': '4-week structured plan',
    '3months': 'comprehensive 12-week plan',
    'exploring': 'exploratory learning path'
  };
  
  const backgroundLabels = {
    'finance': 'finance background',
    'econ': 'economics background',
    'stem': 'STEM background',
    'other': 'non-finance background'
  };
  
  summary = `Based on your ${backgroundLabels[onrampData.background] || 'profile'}, we've created a ${timelineLabels[onrampData.timeline] || 'personalized plan'}`;
  
  if (onrampData.banks?.length) {
    summary += ` focused on your target banks.`;
  } else {
    summary += ` covering all major bank interview styles.`;
  }
  
  summaryEl.textContent = summary;
}

function completeOnramp() {
  progress.onrampComplete = true;
  progress.userProfile = onrampData;
  saveProgress();
  
  document.getElementById('onramp-overlay').classList.remove('show');
  updateDashStats();
  renderPrepPlan();
  
  // Show story bank button in app
  document.getElementById('story-bank-btn').classList.add('show');
}

/* ─── PREP PLAN ─────────────────────── */
function renderPrepPlan() {
  const container = document.getElementById('prep-plan-container');
  if (!container) return;
  
  const profile = progress.userProfile || {};
  const timeline = profile.timeline || '1month';
  
  // Generate tasks based on timeline
  const tasks = generatePrepTasks(timeline);
  
  const timelineLabels = {
    '2weeks': '2 WEEKS',
    '1month': '1 MONTH',
    '3months': '3 MONTHS',
    'exploring': 'FLEXIBLE'
  };
  
  container.innerHTML = `
    <div class="prep-plan-card">
      <div class="prep-plan-header">
        <div class="prep-plan-title">
          📋 Your Prep Plan
          <span class="prep-plan-badge">${timelineLabels[timeline] || '1 MONTH'}</span>
        </div>
        <span class="prep-plan-edit" onclick="showOnramp()">Edit plan</span>
      </div>
      <div class="prep-plan-tasks">
        ${tasks.map((task, i) => `
          <div class="prep-task">
            <div class="prep-task-check ${progress.completedTasks?.includes(i) ? 'done' : ''}" onclick="togglePrepTask(${i})">✓</div>
            <span class="prep-task-text">${task.text}</span>
            <span class="prep-task-time">${task.time}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function generatePrepTasks(timeline) {
  const baseTasks = [
    { text: 'Complete diagnostic assessment', time: '5 min' },
    { text: 'Master 3-statement linkages', time: '20 min' },
    { text: 'Practice 10 accounting questions', time: '15 min' },
    { text: 'Learn DCF fundamentals', time: '25 min' },
    { text: 'Complete 1 mock interview', time: '30 min' },
  ];
  
  if (timeline === '2weeks') {
    return [
      { text: 'Speed drill: Accounting fundamentals', time: '15 min' },
      { text: 'High-yield: Top 20 technical questions', time: '30 min' },
      { text: 'Mock interview practice', time: '25 min' },
      { text: 'Behavioral story prep', time: '20 min' },
    ];
  } else if (timeline === '3months') {
    return [
      ...baseTasks,
      { text: 'Deep dive: LBO modeling concepts', time: '30 min' },
      { text: 'Market news review', time: '10 min' },
      { text: 'Peer mock interview', time: '45 min' },
    ];
  }
  
  return baseTasks;
}

function togglePrepTask(index) {
  if (!progress.completedTasks) progress.completedTasks = [];
  
  if (progress.completedTasks.includes(index)) {
    progress.completedTasks = progress.completedTasks.filter(i => i !== index);
  } else {
    progress.completedTasks.push(index);
  }
  
  saveProgress();
  renderPrepPlan();
}

function showOnramp() {
  onrampStep = 1;
  document.querySelectorAll('.onramp-step').forEach(s => s.classList.remove('active'));
  document.getElementById('onramp-step-1').classList.add('active');
  updateOnrampDots();
  document.getElementById('onramp-overlay').classList.add('show');
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
        <span class="learn-module-badge ${badge}">${isLocked ? '🔒 SOON' : badgeText}</span>
        <div class="learn-module-icon">${mod.icon}</div>
        <div class="learn-module-title">${mod.title}</div>
        <div class="learn-module-desc">${mod.desc}</div>
        <div class="learn-module-meta">
          <span>⏱ ${mod.time}</span>
          <span>📄 ${totalSections} sections</span>
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
      <div class="learn-section-title">
        <span class="learn-section-icon">${section.icon}</span>
        ${section.title}
      </div>
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

  let pendingRecovery = false;

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

  // Register listener FIRST so it catches events from exchangeCodeForSession
  sb.auth.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      showNewPasswordForm();
    } else if (event === 'SIGNED_IN' && session?.user && !pendingRecovery) {
      try { await onSignedIn(session.user); } catch (e) { console.error('onSignedIn error:', e); }
    } else if (event === 'SIGNED_OUT') {
      pendingRecovery = false;
      showScreen('landing');
    }
  });

  // PKCE flow: exchange code from URL — fires onAuthStateChange above
  const pkceCode = new URLSearchParams(window.location.search).get('code');
  if (pkceCode) {
    try {
      await sb.auth.exchangeCodeForSession(pkceCode);
    } catch (e) {
      console.error('Code exchange error:', e);
    }
  } else {
    // Implicit flow: restore existing session from hash or storage
    try {
      const { data: { session } } = await sb.auth.getSession();
      const hashType = new URLSearchParams(window.location.hash.slice(1)).get('type');
      if (session?.user && hashType !== 'recovery') {
        await onSignedIn(session.user);
      } else if (hashType === 'recovery') {
        showNewPasswordForm();
      }
    } catch (e) {
      console.error('Auth session restore error:', e);
    }
  }
});

/* ─── PROFILE ────────────────────────── */
let profileEditing = { info: false, pw: false };

function renderProfile() {
  const user = currentUser;
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest';
  const email = user?.email || 'guest mode';
  const cap = capitalize(name);

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

  try {
    const updates = { data: { full_name: nameVal } };
    if (emailVal !== currentUser?.email) updates.email = emailVal;
    const { data, error } = await sb.auth.updateUser(updates);
    if (error) throw error;

    // Update UI everywhere
    const cap = capitalize(nameVal);
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

  if (!pw || pw.length < 6) { showProfileMsg('pw', 'error', 'Password must be at least 6 characters.'); return; }
  if (pw !== confirm) { showProfileMsg('pw', 'error', 'Passwords do not match.'); return; }

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


/* ─── WIRE MODULE DEPENDENCIES ──────── */
setMapDeps({ getMasteryClass, showView });

/* ─── EXPOSE GLOBALS FOR INLINE HANDLERS ─── */
// Temporary: needed because index.html uses onclick="fn()" attributes.
// These will be removed when we migrate to addEventListener.
Object.assign(window, {
  addNewStory, calcROI, closeDiagnostic,
  closeDiagnosticToLanding, closeLearnModule, completeOnramp, demoChatSend,
  demoFilterBank, demoFlipCard, demoFCNav, demoFCShuffle, demoToggleQ,
  doForgotPassword, doLogin, doSetNewPassword, doSignOut, doSignup, filterBank, filterBankNav, filterSub,
  flipCard, goToDueReview, mapFitAll, mapResetView, mapZoom,
  navScrollTo, nextCard, nextLearnSection, nextOnrampStep, nextQuizQuestion,
  openLearnModule, prevCard, prevLearnSection, prevOnrampStep, prevNav,
  pvBankFilter, pvFlipCard, pvFCNav, pvMockSend, pvToggleQ, rateCard,
  renderBank, reviewQuizMistakes, saveProfileInfo,
  saveProfilePassword, selectDiagAnswer, selectOnramp, selectQuizAnswer,
  sendMsg, setFlashCat, setNavActive,
  setStudyMode, showAuthTab, showForgotPassword, showOnramp, showQuizSetup,
  showScreen, showView, shuffleFlash, skipDiagnostic, smartPractice,
  startDiagnostic, startDirectDiagnostic, startMock,
  startQuiz, switchAuthTab, toggleFaq, toggleOnrampMulti,
  togglePrepTask, toggleProfileEdit, toggleQ, toggleStoryPanel, toggleTheme,
  viewStoryNote
});
