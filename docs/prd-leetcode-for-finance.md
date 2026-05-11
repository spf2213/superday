# PRD: Superday as LeetCode for Finance Interviews

**Status:** Draft
**Owner:** Sebastian
**Last updated:** 2026-05-11

---

## TL;DR

Superday today is a polished learn-practice-mock app with solid scaffolding (284 questions, 15 learn modules, AI-powered chat mocks, per-topic level tracking) but it is not yet shaped like LeetCode. The visual system is strong; the information architecture and content depth are not. This document defines what "LeetCode for Finance" means concretely for Superday, where the gaps are, and a phased plan to close them.

**One-line bet:** Build a browseable Problem Bank with firm tags, status dots, and curated sets before investing further in AI mocks. The bank is the shape; mocks are the premium tier on top.

---

## Vision

The default destination for finance interview prep — used by every undergrad targeting Wall Street the way LeetCode is used by every CS undergrad targeting tech. A user lands on Superday daily, drills problems, sees their gaps light up, and walks into a Goldman superday feeling like they've already had the conversation.

**The pitch in a sentence:** Every IB/PE technical and behavioral question worth knowing, organized by firm and topic, with a free-response grading loop tight enough to drill on.

---

## Current state assessment

### What's built (MVP-grade)

- **Question bank:** 284 questions across accounting (40), LBO (38), M&A (34), valuation (38), behavioral, and brain teasers. Each has a model answer, an explanation, three distractors, an interview tip, and a difficulty band. Source: [src/data/questions.js](src/data/questions.js).
- **Learn modules:** 15 modules covering three-statement linkage, DCF, EV vs. equity, comps, LBO mechanics, accretion/dilution, M&A process, rates, stock pitches, behavioral frameworks. Blog-post depth (150–300 words per section), with diagrams and trap callouts. Source: [src/data/learnModules.js](src/data/learnModules.js).
- **Flashcard practice:** 3D card-flip UX, color-coded confidence buttons (Missed / Unsure / Got it) with keyboard shortcuts. Filters by topic and user level. Source: [app.js](app.js), [styles.css:1258](styles.css:1258).
- **Mock interview:** Claude-powered text chat. Left rail with firm/category/difficulty pickers, chat canvas with scored 6-question session, persisted to Supabase. Per-question scoring across Technical / Structure / Confidence.
- **AI evaluation:** Claude Sonnet 4.6, single-prompt rubric (1–10 scale, calibrated to user's per-topic band). Monthly budget cap of $20/user enforced via [api/claude.js](api/claude.js).
- **Progress tracking:** Per-topic band stored in Supabase `progress.levels` JSONB. Mock history persisted. Dashboard shows mastered flashcard count, avg mock score, and per-topic band badges.
- **Visual system:** Geist typography, dark/light theme, glass-morphism, smooth easing, consistent design tokens. Reads like a SaaS product, not a side project.

### What's stubbed or missing

- **Firm specificity:** Firm dropdown in mock UI is cosmetic. Zero firm-tagged questions, zero firm-specific rubrics or deal history.
- **Volume:** 284 questions is closer to a study guide than a drill platform. LeetCode-feel needs 800–1500.
- **Problem Bank screen:** Questions are buried inside flashcard mode. No browseable, filterable, sortable list of problems.
- **Per-question status:** Confidence rating data exists but is not surfaced as a "fill in the grid" completion signal.
- **Topic mastery visualization:** `progress.levels` is rendered as one badge, not as 8–10 topic cards with progress bars.
- **Activity heatmap / streaks:** Streak commit exists but no visible implementation. No daily contribution graph.
- **Daily problem:** Not implemented.
- **Curated sets:** No "Top 50 IB Technicals," no firm-specific drills, no themed lists.
- **Spaced repetition:** Stubbed (`due` flag exists, no scheduling logic).
- **Submission moment:** Muted feedback when a user nails a hard question — green button, no celebration beat.
- **Mobile nav:** Breakpoint at 720px but no explicit hamburger or mobile-first nav pattern.
- **Loading / error states:** Plain "Loading…" text; no skeletons; no surfaced error UI.

**Overall position:** ~35–40% of the way to LeetCode-for-Finance. Visual polish is real. Information architecture and content depth are the gaps.

---

## Goals

1. **Reshape the IA around problems, not modes.** A Problem Bank screen becomes the primary destination, with status dots driving completionism.
2. **Make firm specificity real.** Every question tagged by firm and frequency; curated firm-specific sets at the top of the bank.
3. **Break the LLM-cost ceiling on practice volume.** Bulk drilling moves to multiple-choice + self-graded rubrics (free); AI grading reserved for mocks and free-response premium.
4. **Install habit hooks.** Daily question, activity heatmap, streak surfacing — the parts of LeetCode that make it sticky.
5. **Scale the bank to 800–1500 questions** with real firm attribution.

## Non-goals (for this PRD)

- Video or voice mock interviews (long-term roadmap, not v1).
- Community / discussion forums (LeetCode has these; defer until DAU justifies moderation cost).
- Leaderboards and contests (defer).
- Native mobile app (responsive web only).
- Expanding beyond IB/PE into S&T, ER, quant, consulting (stay focused).

---

## The strategic tension we cannot wave away

**Code is objectively checkable; finance prose isn't.** LeetCode lets a user submit a solution 100 times a day for free because a test runner returns a verdict in milliseconds. Superday's only grader is Claude, and at Sonnet 4.6 pricing with a $20/user/month cap, the budget supports roughly 1,000 graded responses per user per month — not 10,000.

This means the LeetCode model does not directly port. The fix is **tiered grading**:

| Tier | Format | Grading | Cost | Use case |
|------|--------|---------|------|----------|
| Bulk drill | Multiple choice | Deterministic (correct answer in JSON) | $0 | 80% of daily practice |
| Self-grade | Free response | User scores own answer against rubric reveal | $0 | Behavioral, conceptual |
| AI mock | Free response in interview context | Claude scores with calibrated rubric | $$$ | Premium tier, weekly cadence |

Every product decision below assumes this tiering. The Problem Bank is the bulk-drill engine; mocks remain the differentiator on top.

---

## Requirements

### R1. Problem Bank screen (the LeetCode unlock)

A new top-level view replacing the current "Practice" tab as the primary drill destination.

**Layout:**
- Dense table or card list of all questions in the bank.
- Columns: status dot, title, topic, difficulty, firm tags, frequency, last attempted.
- Filters in a left rail: firm (multi-select), topic, difficulty, status (todo/attempted/solved), tag (e.g., "favorites," "weak spots").
- Search bar across question title and content.
- Default sort: frequency descending, then difficulty ascending.

**Status dot states (per user):**
- Grey: not attempted
- Red: marked "Missed"
- Amber: marked "Unsure"
- Green: marked "Got it"

Persist to Supabase per `(user_id, question_id)`.

**Acceptance criteria:**
- All 284 existing questions render in the bank.
- Filters and search update the list client-side under 100ms for the current bank size.
- Status dots persist across sessions and across devices.
- Clicking a row opens the Problem Detail screen (R2).

### R2. Problem Detail screen

Replaces the card-flip for serious drilling. (Flashcard mode can stay for quick review of saved questions.)

**Layout (split view on desktop, stacked on mobile):**
- **Prompt panel:** question, topic tag, difficulty pill, firm tags, "asked at" attribution.
- **Answer panel:** user input area (textarea for free response, or MC buttons for objective questions).
- **Reveal section** (after submit): model answer, explanation, common wrong answers, interview tip, linked learn module.
- **Footer:** confidence buttons (Missed / Unsure / Got it), "Next problem" CTA, "Save to list" action.

**Tabs in answer panel:**
- Description (default)
- Editorial (model answer + explanation + linked learn module)
- Notes (user's own notes, persisted)

**Acceptance criteria:**
- User can submit a response, see the model answer, self-rate, and advance to next in under 5 clicks.
- "Linked learn module" deep-links to the relevant lesson in [src/data/learnModules.js](src/data/learnModules.js).

### R3. Firm tagging schema

**Data model (added to questions.js or migrated to Supabase):**

```js
{
  id: "lbo_basic_001",
  q: "...",
  a: "...",
  topic: "lbo",
  difficulty: 2,
  askedAt: [
    { firm: "GS", year: 2024, frequency: "high" },
    { firm: "BX", year: 2023, frequency: "medium" }
  ],
  tags: ["paper-lbo", "irr-math"]
}
```

**Acceptance criteria:**
- All questions in the bank have at least a `topic` and `tags` array; firm attribution is added incrementally.
- Filter by firm in the Problem Bank returns the union of questions tagged for that firm.
- Curated "asked at GS" set is a saved filter, not a separate data structure.

### R4. Topic mastery cards on dashboard

Replace the current three big tiles (Learn / Practice / Test) with a topic-card grid.

**Each card shows:**
- Topic name (Accounting, DCF, LBO, M&A, Comps, Behavioral, Brain Teasers, etc.)
- Progress: X / Y solved (status = green)
- Current band badge (Foundations / Beginner / Intermediate / Advanced / Expert)
- Inline mini-bar: % of bank attempted
- Click → Problem Bank pre-filtered to that topic

**Acceptance criteria:**
- Renders 8–12 topic cards depending on bank coverage.
- Pulls live from `progress.levels` and per-question status (R1).
- Single click from dashboard → filtered drill list.

### R5. Activity heatmap + daily problem

**Heatmap:**
- Yearly contribution graph on dashboard or profile, GitHub-style.
- One cell per day, color intensity = number of questions attempted that day.
- Pulls from a new `attempts` table or aggregates from `progress.mockHistory` + new per-question attempt logs.

**Daily problem:**
- Hero card on dashboard: "Today's Question."
- Resets at user's local midnight.
- Solving it increments streak; missing a day breaks it.
- Selection rule: surface a question from the user's weakest topic at one band above their current level.

**Acceptance criteria:**
- Heatmap reflects real activity within 60 seconds of submission.
- Daily problem persists across the calendar day; same question shown until midnight.
- Streak count updates atomically on first daily attempt.

### R6. Curated sets

A small set of named lists rendered at the top of the Problem Bank:

- **Core sets:** "Top 50 IB Technicals," "Behavioral Greatest Hits," "Brain Teasers Every Banker Sees," "Paper LBO Bootcamp," "DCF in 20 Questions."
- **Firm sets:** "Goldman Sachs M&A 2024," "Blackstone PE 2024," etc. (built as content fills in).
- **User sets:** "My Favorites," "Weak Spots" (auto-generated from red/amber status).

**Acceptance criteria:**
- Curated sets are saved filters / tagged question collections, not duplicated data.
- A user can browse a set and drill through it linearly with a "Next in set" CTA.
- "Weak Spots" auto-populates from red/amber statuses, no user action needed.

### R7. Bank expansion to 800–1500 questions

This is content work, not engineering — but it gates the LeetCode feel.

**Coverage targets:**
- Accounting: 150
- DCF / Valuation: 200
- LBO (including paper LBOs): 200
- M&A / Accretion-Dilution: 150
- Comps / Precedents: 100
- Markets / Rates / Macro: 100
- Behavioral (including "why this firm" variants): 200
- Brain teasers: 100
- Restructuring: 50
- FIG / specialty (stretch): 50

Each question must include model answer, explanation, three distractors (for MC mode), tags, and at least one firm attribution where credible.

### R8. Submission moment + microinteraction polish

Small but meaningful UX upgrades:

- **Submission moment:** when a user marks "Got it" on a hard question, brief celebratory beat — score counter ticks up, status dot animates green, optional sound, streak increments visibly.
- **Loading skeletons:** replace `Loading...` text in [index.html](index.html) with skeleton placeholders matching final layout.
- **Mock chat affordances:** typing indicator while Claude generates, message timestamps, "thinking…" state.
- **Mobile nav:** explicit hamburger pattern at <720px, sidebar slide-in.
- **Error states:** real error UI for API failures (rate limit hit, network error, budget cap reached), not silent failures.

### R9. Tiered grading enforcement

Code-level guardrails so the AI budget doesn't blow up.

- Bulk-drill questions render as MC by default; "free response" is a deliberate toggle.
- Self-grade flow: user types a response, hits "Show model answer," compares, self-rates. Zero API calls.
- AI grading reserved for: mock interview turns, "Grade my answer" premium action (rate-limited per day per user).
- Budget cap remains $20/user/month, enforced in [api/claude.js](api/claude.js).

---

## Phasing

### Phase 1 — The shape (4–6 weeks)

Goal: make Superday *feel* like LeetCode without yet having the content depth.

- R1: Problem Bank screen
- R2: Problem Detail screen
- R3: Firm tagging schema (data model + retrofit existing 284 questions with topic/tags, firm tags added opportunistically)
- R4: Topic mastery cards on dashboard
- R9: Tiered grading enforcement (so bulk drill is free)

**Exit criteria:** A user can land on the dashboard, see topic cards, click Accounting, browse 40 questions with status dots, drill one, self-rate, and see their progress update — all without a Claude API call.

### Phase 2 — Stickiness (3–4 weeks)

Goal: install the habit hooks.

- R5: Activity heatmap + daily problem
- R6: Curated sets (core sets, no firm sets yet)
- R8: Submission moment + microinteraction polish

**Exit criteria:** A user returning the next day sees a streak count, a new daily question, and a heatmap with yesterday's cell filled in.

### Phase 3 — Content depth (8–12 weeks, ongoing)

Goal: scale the bank and add firm specificity.

- R7: Bank expansion to 800–1500
- R6 (firm sets): "Goldman Sachs M&A 2024," etc., as content lands

**Exit criteria:** Bank passes 800 questions with at least 200 having credible firm attribution.

### Phase 4 — AI mock as premium (parallel to Phase 3)

Goal: position mocks as the premium tier on top of free bulk drill, not the core.

- Pricing/paywall surface update.
- Rate-limit "Grade my answer" per day.
- Mock interview UX polish (per R8).

---

## Open questions

1. **Question data location:** keep in [src/data/questions.js](src/data/questions.js) as static bundle, or migrate to Supabase for hot updates? Static is faster and free; Supabase enables firm-set editing without redeploys.
2. **Firm attribution sourcing:** crowdsource from beta users? Buy a known dataset? Author manually from M&I / Wall Street Oasis / Reddit threads? Legal posture on each.
3. **MC distractors quality:** current `wrong` array in questions.js is 3 distractors; are they good enough for serious MC mode or does each need a rewrite pass?
4. **Daily problem selection algorithm:** weakest-topic + one-band-up is the simple rule; do we A/B against "spaced repetition due item" or "next in user's current curated set"?
5. **Streak grace period:** strict daily, or one freeze per week? LeetCode allows freezes; rigid streaks lose users to one bad day.
6. **What counts as "solved"?** Green confidence rating self-reported, or does an MC question require correct answer? Self-rated risks inflated mastery.

---

## Success metrics

**Leading indicators (Phase 1–2):**
- DAU / WAU ratio (target: >0.4 within 60 days post-launch)
- Questions attempted per active day (target: median ≥5)
- % of users with a 7-day streak (target: >15%)

**Lagging indicators (Phase 3+):**
- Bank size: 800 by end of Phase 3
- % of questions with firm attribution: >25%
- Self-reported interview outcome ("I got the offer") via post-superday survey
- Paid conversion rate from free Problem Bank → AI mock tier

**Cost guardrails:**
- Anthropic spend stays ≤ $20/user/month per the existing cap.
- p95 Problem Bank render <100ms client-side.

---

## What this PRD deliberately leaves out

- The exact visual design of the Problem Bank table — to be specced separately against existing design tokens in [styles.css](styles.css).
- Pricing changes — the AI-mock-as-premium model implies a pricing rethink, handled in a separate doc.
- Marketing / launch plan.
- A full content style guide for the 500+ new questions — referenced in Phase 3 but authored separately.
