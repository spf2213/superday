export const LEARN_MODULES = [
  {
    id: 'three-statements',
    title: 'The Three Financial Statements',
    desc: 'How the income statement, balance sheet, and cash flow statement connect — the most-asked technical question in IB.',
    time: '15 min',
    sections: 3,
    category: 'accounting',
    content: [
      {
        title: 'Why this matters',
        text: 'The three-statement linkage is the single most-tested concept in finance interviews. If you cannot explain how $10 of depreciation flows through all three statements, you will not pass a technical round. Every analyst-level interviewer reaches for a version of this question.',
        visual: {
          title: 'THE THREE STATEMENTS',
          type: 'flow',
          items: [
            { label: 'INCOME STATEMENT', val: 'Revenue → Net Income', highlight: false },
            { label: 'BALANCE SHEET', val: 'Assets = L + E', highlight: false },
            { label: 'CASH FLOW', val: 'Cash In / Cash Out', highlight: false }
          ]
        }
      },
      {
        title: 'The linkages',
        text: 'Net Income from the income statement flows into Retained Earnings on the balance sheet, and is also the starting point of the cash flow statement. Ending cash on the CFS becomes Cash on the BS. Every linkage question runs through these three pipes — start with Net Income and you can usually reason your way to the answer.',
        formula: 'Net Income → Retained Earnings (BS) → Top of CFS → Ending Cash → Cash (BS)',
        tip: {
          title: 'Interview answer',
          text: 'When asked "walk me through how the statements connect," always start with Net Income. It is the only number that touches all three statements and proves you understand the flow.'
        }
      },
      {
        title: 'The classic test question',
        text: 'How does a $10 increase in depreciation affect all three statements, assuming a 35% tax rate? This question appears in roughly 9 out of 10 IB technical interviews. Run it cold and you stand out; fumble the tax shield and you are done.',
        formula: 'IS:  Pre-tax income ↓$10, Tax ↓$3.50, Net Income ↓$6.50\nCFS: NI ↓$6.50 + D&A add-back +$10 = OCF ↑$3.50\nBS:  PP&E ↓$10, Cash ↑$3.50, Retained Earnings ↓$6.50',
        trap: {
          title: 'Common mistake',
          text: 'Do not say Net Income drops by $10. It drops by $6.50, because depreciation reduces taxable income and the company saves 35% in taxes. Forgetting the tax shield is the most common way candidates blow this question.'
        }
      }
    ]
  },

  {
    id: 'working-capital',
    title: 'Working Capital',
    desc: 'What operating working capital actually is, why it shows up in DCF, and the cycle metrics interviewers expect you to know.',
    time: '12 min',
    sections: 4,
    category: 'accounting',
    content: [
      {
        title: 'What working capital actually is',
        text: 'Operating working capital is current operating assets minus current operating liabilities. Crucially, it excludes Cash and short-term Debt — those are financing items, not operating ones. Forgetting this distinction is a fast way to lose credibility on a technical question.',
        formula: 'Operating WC = Accounts Receivable + Inventory − Accounts Payable',
        tip: {
          title: 'Why exclude cash',
          text: 'Cash sitting on the balance sheet is not tied up in operations. Including it in WC inflates the number and breaks the link to operating cash needs. Same logic for short-term debt.'
        }
      },
      {
        title: 'Why it matters in a DCF',
        text: 'The change in net working capital is a line item in unlevered free cash flow. Growing companies absorb cash into WC — they need more receivables and inventory to support a bigger run rate. If you build a DCF and ignore Δ NWC, you systematically overstate FCF and the resulting valuation.',
        formula: 'UFCF = EBIT × (1 − t) + D&A − CapEx − Δ NWC'
      },
      {
        title: 'The cash conversion cycle',
        text: 'DSO (days sales outstanding) measures how long it takes to collect from customers. DIO (days inventory outstanding) measures how long inventory sits on the shelf. DPO (days payable outstanding) measures how long you take to pay suppliers. Lower CCC means cash spends less time tied up in operations.',
        formula: 'CCC = DSO + DIO − DPO',
        tip: {
          title: 'What good looks like',
          text: 'Best-in-class operators — Costco, Apple, Dell historically — run negative CCC: customers pay them before they pay suppliers. That is free working-capital financing.'
        }
      },
      {
        title: 'Interview question: WC walkthrough',
        text: 'Walk me through how a $10 increase in working capital affects all three statements. The answer is more compact than the depreciation question, and getting it cleanly is a quick credibility win.',
        formula: 'IS:  No impact (WC change is balance-sheet-only)\nCFS: Cash from operations ↓$10\nBS:  Operating WC asset ↑$10, Cash ↓$10',
        trap: {
          title: 'Trap',
          text: 'Do not say "this affects net income." A pure WC increase has zero income statement impact. The change shows up only on the cash flow statement and the balance sheet.'
        }
      }
    ]
  },

  {
    id: 'dcf-basics',
    title: 'DCF Fundamentals',
    desc: 'Intrinsic valuation from first principles — why we discount, what WACC means, and where terminal value goes wrong.',
    time: '20 min',
    sections: 4,
    category: 'valuation',
    content: [
      {
        title: 'The core idea',
        text: 'A DCF answers one question: what is a company worth based on the cash it will generate in the future? You project free cash flows, discount them back to today using a discount rate (WACC), and add a terminal value to capture cash flows beyond the projection. Every other valuation technique is a shortcut to this.',
        formula: 'Enterprise Value = Σ ( FCF_n / (1 + WACC)^n )  +  Terminal Value',
        tip: {
          title: 'Intuition',
          text: '$100 today is worth more than $100 in five years because you could invest it. A DCF is the math that captures this time value, applied to a stream of expected cash flows.'
        }
      },
      {
        title: 'Unlevered free cash flow',
        text: 'A DCF uses Unlevered FCF (also called Free Cash Flow to Firm) because it represents cash available to all investors — both debt and equity holders. We exclude interest expense from the cash flow calculation because WACC already accounts for the cost of debt; including interest would double-count the financing structure.',
        formula: 'UFCF = EBIT × (1 − Tax Rate) + D&A − CapEx − Δ NWC',
        trap: {
          title: 'Why "unlevered"',
          text: 'Levered FCF (after interest) is appropriate for an equity DCF discounted at cost of equity. Mixing UFCF with cost of equity, or LFCF with WACC, is a common error that produces nonsense valuations.'
        }
      },
      {
        title: 'WACC',
        text: 'The weighted average cost of capital blends the cost of equity and the after-tax cost of debt, weighted by their share of the capital structure. The tax adjustment on debt reflects that interest is tax-deductible — debt is cheaper than its stated rate.',
        formula: 'WACC = (E / V) × Re + (D / V) × Rd × (1 − Tax)',
        tip: {
          title: 'Order of magnitude',
          text: 'A risky early-stage software company might run a 12-15% WACC. A regulated utility runs 5-7%. Higher WACC means lower present value, so a small WACC error can swing valuation meaningfully.'
        }
      },
      {
        title: 'Terminal value',
        text: 'You cannot project cash flows forever, so you cap the projection period (usually 5-10 years) and add a Terminal Value to capture everything beyond. Terminal value typically accounts for 60-80% of total enterprise value in a DCF — which is why getting it directionally right matters more than fine-tuning the explicit forecast.',
        formula: 'Gordon Growth: TV = FCF_final × (1 + g) / (WACC − g)\nExit Multiple: TV = Terminal-year EBITDA × Exit Multiple',
        trap: {
          title: 'The growth-rate trap',
          text: 'Do not use a perpetual growth rate above 2-3%. No company grows faster than the global economy forever. Push g toward WACC and the math explodes — small inputs, huge swing in TV.'
        }
      }
    ]
  },

  {
    id: 'ev-equity',
    title: 'Enterprise Value vs. Equity Value',
    desc: 'The difference every interviewer will test you on. When to use which, and which multiples match.',
    time: '12 min',
    sections: 3,
    category: 'valuation',
    content: [
      {
        title: 'The key difference',
        text: 'Equity Value is what shareholders own — the market cap of the public stock. Enterprise Value is the total value of the operating business — what it would cost to buy the whole company free of its capital structure. The bridge between them is Debt and Cash.',
        formula: 'Enterprise Value = Equity Value + Debt − Cash + Preferred + Minority Interest',
        tip: {
          title: 'Memory trick',
          text: 'Think about buying a house. Equity Value is your down payment — what you actually own. Enterprise Value is the total purchase price of the house, including the mortgage you take on.'
        }
      },
      {
        title: 'Which multiple, which value',
        text: 'Match the numerator to the denominator. EV multiples use metrics available to ALL investors (before interest expense). Equity multiples use metrics available only to shareholders (after interest). Mixing the two produces a multiple that means nothing.',
        visual: {
          title: 'MATCHING RULE',
          type: 'two-column',
          left: { label: 'EV MULTIPLES', items: ['EV / Revenue', 'EV / EBITDA', 'EV / EBIT'] },
          right: { label: 'EQUITY MULTIPLES', items: ['P / E', 'P / Book Value', 'Price / FCF'] }
        },
        trap: {
          title: 'Classic trap',
          text: 'Never use EV / Net Income or P / EBITDA. Net Income is after interest (equity holders only). EBITDA is before interest (all investors). They live on different sides of the capital structure.'
        }
      },
      {
        title: 'The bridge',
        text: 'Walking from EV to Equity Value (and back) shows up constantly in M&A and LBO work. The logic: when you buy a company, you also assume its debt (so subtract it from the value of the equity), and you keep its cash (so add it back).',
        formula: 'Equity Value = Enterprise Value − Debt + Cash − Preferred − Minority Interest',
        tip: {
          title: 'Interview cue',
          text: 'When asked "walk me through EV to Equity Value," the right move is to start with EV, subtract debt (you would have to pay it off), add cash (you would keep it), and explain why preferred and minority interest are non-equity claims on the business.'
        }
      }
    ]
  },

  {
    id: 'trading-comps',
    title: 'Trading Comparables',
    desc: 'What the public market is paying for similar businesses right now. How to pick peers and which multiples to use.',
    time: '12 min',
    sections: 4,
    category: 'valuation',
    content: [
      {
        title: 'What comps tell you',
        text: 'Trading comparables are a relative valuation: not "what is this company worth in absolute terms," but "what is the market paying for similar businesses today." If close peers trade at 12x EV/EBITDA, the subject company should not trade at 25x without a specific reason.',
        tip: {
          title: 'When comps are most useful',
          text: 'Comps are strongest when the peer set is genuinely close and the market is functioning normally. They get noisy at extreme valuations, in thinly traded names, or right after a sector dislocation.'
        }
      },
      {
        title: 'Picking peers',
        text: 'A good comp set has 5-8 peers that share industry, geography, business model, size, and growth/margin profile. One mispicked peer — an airline in a software-comp set, say — destroys the median and the credibility of the analysis.',
        trap: {
          title: 'The "size of universe" trap',
          text: 'Junior analysts often build 30-name comp sets to feel comprehensive. The result is a meaningless median. Tighter is better; explain why each peer is in and which were excluded.'
        }
      },
      {
        title: 'Which multiples and why',
        text: 'EV/EBITDA is the workhorse — capital-structure neutral, before D&A noise. P/E is right for banks and insurers where capital structure is the business. EV/Revenue is the fallback for unprofitable growth (no earnings to put in the denominator). Match the multiple to the business model and the stage.',
        visual: {
          title: 'WHEN TO USE WHICH',
          type: 'two-column',
          left: { label: 'EV / EBITDA', items: ['Most industrials', 'Consumer', 'Healthcare', 'Most software'] },
          right: { label: 'P / E or EV / REV', items: ['Banks → P/E', 'Insurance → P/B', 'Unprofitable growth → EV/Rev'] }
        }
      },
      {
        title: 'Trap: stale metrics',
        text: 'Default to NTM (next twelve months) multiples, not LTM (trailing). The market prices on forward expectations. LTM multiples are backward-looking — useful for sanity checks, dangerous for pricing decisions, and especially misleading when the cycle inflects.',
        formula: 'LTM = last twelve months of actuals\nNTM = consensus next twelve months'
      }
    ]
  },

  {
    id: 'precedent-transactions',
    title: 'Precedent Transactions',
    desc: 'What buyers actually paid for comparable businesses, and why precedents trade higher than public comps.',
    time: '10 min',
    sections: 3,
    category: 'valuation',
    content: [
      {
        title: 'What precedents capture',
        text: 'Precedents show the price someone actually paid for a comparable business. Unlike trading comps, they include a control premium — typically 20-30% over the unaffected public-market price — because the buyer is paying for the right to set strategy and capture synergies, not for a passive minority stake.',
        tip: {
          title: 'Where the premium comes from',
          text: 'Three sources: (1) control itself, (2) synergies the buyer expects to capture, and (3) the auction dynamic — the highest of multiple bidders sets the clearing price.'
        }
      },
      {
        title: 'Strategic vs financial buyers',
        text: 'Strategics can pay more because they capture cost synergies (overlapping SG&A, redundant operations, procurement leverage). Financial buyers (private equity) are capped by their target return — typically 20-25% IRR — which limits how much equity they can put into a deal at a given price.',
        trap: {
          title: 'Watch the buyer mix',
          text: 'A precedent set dominated by strategic buyers is a poor benchmark for a PE bid. If you are advising a PE client, separate strategic and financial precedents and lean on the financial set.'
        }
      },
      {
        title: 'Timing matters',
        text: 'Pull a multi-year window — usually 3-5 years — to normalize for cycle effects. Multiples paid in 2021 (zero rates, peak activity) are not the precedent you want for a 2026 bid in a higher-rate environment. Note the deal date, the rate environment, and any unusual circumstances on every entry.',
        tip: {
          title: 'How interviewers test this',
          text: 'If asked "would you pay 15x like the 2021 precedent suggests," the right answer adjusts for environment: rates were near zero, comps were 5 turns higher, the strategic buyer paid for revenue synergies that did not materialize. Strip the premium for those factors.'
        }
      }
    ]
  },

  {
    id: 'lbo-mechanics',
    title: 'LBO Model Mechanics',
    desc: 'How PE firms use debt to amplify returns. The math behind leveraged buyouts.',
    time: '20 min',
    sections: 4,
    category: 'lbo',
    content: [
      {
        title: 'What an LBO is',
        text: 'A leveraged buyout is when a private equity firm acquires a company using mostly debt — typically 50-70% of the purchase price — operates it for 3-7 years, and sells it. The "leverage" amplifies equity returns: a small move in enterprise value translates to a large move in equity value because the debt does not move.',
        tip: {
          title: 'Real-world analogy',
          text: 'Buying a rental house with a mortgage is an LBO. You put down 20%, borrow 80%, the rental income covers the mortgage, you sell for (hopefully) more than you paid. PE does this with companies instead of houses.'
        }
      },
      {
        title: 'Sources and uses',
        text: 'Every LBO opens with a sources and uses table. Sources are where the money comes from — debt tranches plus the sponsor equity check. Uses are where it goes — purchase price plus fees plus refinancing of existing target debt. Sources must equal uses to the dollar.',
        visual: {
          title: 'SOURCES = USES',
          type: 'two-column',
          left: { label: 'SOURCES', items: ['Senior secured debt (TLB)', 'Subordinated / mezzanine', 'Sponsor equity'] },
          right: { label: 'USES', items: ['Purchase equity', 'Refinance existing debt', 'Transaction fees', 'OID / financing fees'] }
        }
      },
      {
        title: 'Three value-creation levers',
        text: 'PE returns come from three things, in roughly this order of importance: (1) EBITDA growth — operating improvements, organic and bolt-ons. (2) Multiple expansion — selling at a higher multiple than you bought. (3) Debt paydown — every dollar of debt repaid is a dollar of equity value created.',
        formula: 'Equity Value at exit = Exit EV − Debt at exit\n             ≈ Exit EBITDA × Exit Multiple − Debt at exit',
        trap: {
          title: 'Where new analysts go wrong',
          text: 'Multiple expansion is the most fragile lever — it is mostly outside the sponsor\'s control. Models that rely on it for most of the IRR are bidding the cycle, not underwriting the business.'
        }
      },
      {
        title: 'IRR math',
        text: 'PE funds typically target 20-25%+ gross IRR at the deal level. The relationship between money-on-money (MoM) and IRR is what every LBO interviewer probes. Memorize the doubles.',
        formula: 'IRR ≈ (MoM)^(1/years) − 1\n2.0x in 5 years ≈ 15% IRR\n2.5x in 5 years ≈ 20% IRR\n3.0x in 5 years ≈ 25% IRR',
        tip: {
          title: 'Quick gut-check',
          text: 'If your model shows 30% IRR over 5 years, that is a 3.7x. Stop and audit your assumptions — that level of return usually means you are underwriting heroic operating improvements, multiple expansion, or both.'
        }
      }
    ]
  },

  {
    id: 'accretion-dilution',
    title: 'Accretion / Dilution',
    desc: 'Whether an M&A deal raises or lowers acquirer EPS. The rule of thumb, the math, and why it can be misleading.',
    time: '12 min',
    sections: 4,
    category: 'ma',
    content: [
      {
        title: 'What it measures',
        text: 'Accretion / dilution analysis answers one question: does this deal raise or lower the acquirer\'s pro-forma earnings per share? Accretive means pro-forma EPS exceeds standalone EPS. Dilutive means the opposite. The number itself is one of the first things a CFO will ask about a proposed deal.',
        formula: 'Pro-forma EPS = Pro-forma Net Income / Pro-forma Shares Outstanding'
      },
      {
        title: 'The rule of thumb',
        text: 'For a 100% stock deal: accretive if the seller\'s P/E is lower than the acquirer\'s P/E. You are effectively buying earnings cheaper than your own multiple. For a 100% cash deal: accretive if the seller\'s after-tax earnings yield exceeds the after-tax cost of cash (cost of new debt or forgone interest income).',
        tip: {
          title: 'Why this works',
          text: 'In a stock deal, you issue shares at your P/E and buy earnings at the seller\'s P/E. If you are issuing at 20x and buying at 15x, you collect more EPS per share issued than you give up. The arithmetic is mechanical.'
        }
      },
      {
        title: 'The full math',
        text: 'Pro-forma Net Income equals the acquirer\'s NI plus the target\'s NI, plus after-tax synergies, minus the after-tax cost of new debt interest, minus forgone interest on cash used. Pro-forma shares equals the acquirer\'s shares plus any new shares issued in a stock deal. Divide and compare.',
        formula: 'PF NI = Acquirer NI + Target NI − Δ Interest × (1−t) + Synergies × (1−t)\nPF Shares = Acquirer Shares + New Shares Issued'
      },
      {
        title: 'Trap: accretive does not mean good',
        text: 'Accretion is an accounting outcome, not a strategic verdict. Empire builders use accretion math to justify deals that destroy long-term value through poor strategic fit, integration risk, or simple overpayment. Always ask: is this a good business decision separate from the EPS arithmetic?',
        trap: {
          title: 'How to push back as an analyst',
          text: 'In real deal teams, the analyst who says "this is accretive but the strategic logic is weak — here is why" gets noticed. A good MD wants someone who can read past the EPS line.'
        }
      }
    ]
  },

  {
    id: 'synergies-deal-rationale',
    title: 'Synergies and Deal Rationale',
    desc: 'Revenue vs cost synergies, why most M&A destroys value, and the framework for evaluating any deal.',
    time: '12 min',
    sections: 4,
    category: 'ma',
    content: [
      {
        title: 'Two kinds: revenue and cost',
        text: 'Cost synergies are credible: SG&A overlap, plant consolidation, procurement leverage, redundant systems. They are mostly under management control. Revenue synergies — cross-sell, new geographies, bundled offerings — are usually overpromised, because they require customers to act, and customers are not on the deal team.',
        tip: {
          title: 'Typical haircut',
          text: 'Sophisticated buyers haircut announced revenue synergies by 50-70% in their internal model, and apply a 1-2 year delay before they show up in cash flow. Announcing synergies and capturing them are different jobs.'
        }
      },
      {
        title: 'Why most M&A destroys value',
        text: 'Multiple long-running studies — McKinsey, KPMG, BCG — converge on a similar number: 60-70% of large deals fail to deliver the announced synergies, and a meaningful share destroy shareholder value outright. The reasons are consistent: integration is harder than modeled, key talent leaves, the strategic thesis turns out to be wrong, and the price was too high to begin with.',
        trap: {
          title: 'The buyer\'s curse',
          text: 'In a competitive auction, the winner is often the bidder who was most wrong about value. Process dynamics push prices toward the upper end of credible bids — which is exactly where deals start to destroy value.'
        }
      },
      {
        title: 'The 1-2-3 framework',
        text: 'Every deal evaluation reduces to three questions. (1) Strategic rationale: why does this acquirer want this target — and is the answer specific or aspirational? (2) Synergy value: how much, when, and is the timing credible? (3) Integration plan: who runs it and where is the operational risk? Most analyst-level deal work is reverse-engineering the second and third questions.',
        formula: '(1) Why this buyer + this target  →  strategic case\n(2) How much value + when     →  synergy case\n(3) Who runs integration       →  execution case'
      },
      {
        title: 'What an interviewer wants',
        text: 'Be ready to walk through a real deal in the news in 90 seconds: what each side wanted, the synergy story, the parts that look overpromised, and what would change your view. "I would push back on the revenue cross-sell assumption — there is no evidence those customer bases actually overlap" is a credible analyst answer.',
        tip: {
          title: 'How to prep',
          text: 'Pick two recent deals — ideally one strategic, one PE — and prep a 90-second view on each before any superday. Memorize the announced multiples and synergies, and form a position.'
        }
      }
    ]
  },

  {
    id: 'ma-process',
    title: 'M&A Process',
    desc: 'Sell-side vs buy-side, the auction timeline, and what every level on the deal team actually does.',
    time: '10 min',
    sections: 4,
    category: 'ma',
    content: [
      {
        title: 'Sell-side vs buy-side',
        text: 'Sell-side: the bank represents the seller, runs an auction, and is paid on transaction completion. Buy-side: the bank advises the buyer on bid strategy and is paid on transaction completion. Most M&A teams do both. The skills overlap; the workflow differs.',
        tip: {
          title: 'Why this matters in interviews',
          text: 'If you say "I want to do M&A," expect "sell-side or buy-side, and why." Have a real answer — most analysts touch both, but knowing the distinction signals you have done the homework.'
        }
      },
      {
        title: 'The auction (sell-side)',
        text: 'The standard auction runs roughly six to nine months on a mid-market deal. Each step is gated — moving to the next stage requires the prior to clear. Knowing the steps in order is table stakes; knowing why each exists is what separates a good answer from a checklist answer.',
        visual: {
          title: 'AUCTION TIMELINE',
          type: 'flow',
          items: [
            { label: 'TEASER', val: '1-page anonymized', highlight: false },
            { label: 'CIM', val: '50-page memo', highlight: false },
            { label: 'IOI → LOI', val: 'Bid → exclusivity', highlight: true },
            { label: 'DD + DEFINITIVE', val: 'Sign → close', highlight: false }
          ]
        }
      },
      {
        title: 'Roles on a deal',
        text: 'Analyst: builds the model, owns the data room, drafts marketing materials, lives in Excel and PowerPoint. Associate: owns the model, runs the data room day-to-day, manages the analyst, drafts client-facing materials. VP: client interface, drives the process, owns the timeline. MD: client relationship, deal origination, strategic counsel. Pretending to do MD work as an analyst is transparent and embarrassing.',
        tip: {
          title: 'How to talk about it',
          text: 'Interviewers want analysts who understand the value chain. "I would own the data room and the model, and support the associate on materials" beats "I would help with the deal."'
        }
      },
      {
        title: 'Trap: process questions test understanding, not memorization',
        text: 'When asked "walk me through an M&A process," the bad version is a checklist recital. The good version explains why each step exists. The LOI matters because that is when exclusivity kicks in and the bidding competition ends. The CIM matters because that is when bidders form a real value view, not the teaser-stage hunch.',
        trap: {
          title: 'A real failure mode',
          text: '"I would read the CIM, then we send the LOI, then due diligence." — too mechanical. "The CIM lets bidders sharpen their valuation, which surfaces in IOIs; once we have IOIs we can pick a short list to invite to management presentations." — that is process literacy.'
        }
      }
    ]
  },

  {
    id: 'rates-and-curve',
    title: 'Rates and the Yield Curve',
    desc: 'Why interest rates drive valuations, what the curve shape signals, and where rates sit in the current cycle.',
    time: '12 min',
    sections: 4,
    category: 'markets',
    content: [
      {
        title: 'Why rates matter',
        text: 'Interest rates are the discount rate on every DCF, the cost of debt in every LBO, and the cap rate on every real estate deal. When rates move, valuations move with them. A 100 basis point rise in the 10-year treasury can compress equity multiples 10-15% across the market — not because companies got worse, but because the denominator changed.',
        formula: 'Equity Multiple ∝ 1 / (Cost of Capital − Growth)\nRise in rates → rise in cost of capital → multiple compression'
      },
      {
        title: 'The yield curve',
        text: 'The yield curve plots government bond yields against maturities. Normal: upward-sloping — investors demand a term premium for tying up money longer. Inverted: short-term yields exceed long-term, which usually signals expected rate cuts and slower growth ahead. The 2s10s spread (10-year minus 2-year) is the single most-watched signal in markets.',
        tip: {
          title: 'Track record',
          text: 'Every US recession in the past 50 years has been preceded by a 2s10s inversion. The lag is 6-18 months and varies, but the directional signal is strikingly consistent.'
        }
      },
      {
        title: 'Where we are now',
        text: 'As of early 2026, the Fed cut rates through late 2025 after the 2024 inflation episode resolved. The 10-year sits in the 4.0-4.5% range, the curve has re-steepened from its 2023-24 inversion, and deal volume is rising off the 2023 trough. For any markets-leaning interview, know the current Fed Funds target and 10-year yield to within 25 basis points.',
        trap: {
          title: 'Do not freelance',
          text: 'If you are unsure of the current rate, say "I last checked at X — has it moved?" — the interviewer respects that. Inventing a number is unrecoverable.'
        }
      },
      {
        title: 'The pitch test',
        text: 'When an interviewer asks about rates, link your answer to a thesis. "Rates are still elevated relative to the 2010s, so PE returns rely more on EBITDA growth than multiple expansion — that favors operationally-focused sponsors over financial engineers" is a substantive answer. "Rates went up" is not.',
        tip: {
          title: 'Build two views',
          text: 'Have one rates view that is bullish for valuations, one that is bearish, and know which conditions trigger each. Interviewers test reasoning, not predictions.'
        }
      }
    ]
  },

  {
    id: 'stock-pitch',
    title: 'The Stock Pitch',
    desc: 'How to structure a pitch in 90 seconds, what makes it credible, and the failure modes that mark you as junior.',
    time: '10 min',
    sections: 4,
    category: 'markets',
    content: [
      {
        title: 'The structure',
        text: 'Name and ticker. Direction (long or short). Three catalysts that are specific and time-bound. Two or three risks with downside scenarios. Target price and timeframe. Total: 90 seconds. If you cannot compress the pitch to 90 seconds, you do not yet have a thesis — you have a story.',
        formula: 'Pitch = Name + Direction + 3 catalysts + 2-3 risks + Target + Timeframe',
        tip: {
          title: 'Write it down',
          text: 'Type your pitch on one page, force it under 200 words, time yourself reading it. The discipline of compression is most of what makes a pitch sharp.'
        }
      },
      {
        title: 'What makes it credible',
        text: 'Specific drivers, not "secular trends." Contrarian where possible — there is no edge in pitching the consensus view of a name everyone covers. Downside-aware — every long thesis should include a "what would change my mind" answer that is more than risk-disclosure boilerplate.',
        trap: {
          title: 'Common failure modes',
          text: '(1) Pitching the consensus — no edge, nothing to discuss. (2) No catalyst — "good company" is not a thesis. (3) No entry/exit logic — when do you buy, when do you sell, why now? (4) Pitching a name you have followed for one week.'
        }
      },
      {
        title: 'Pick something current',
        text: 'Pitch a name you have actually followed for six months or more. Be ready to discuss the most recent earnings print and the next one. If the interviewer asks "what was the last quarter\'s revenue growth" or "what guidance did they give for next year" and you do not know, the pitch is dead — and so is your credibility for the rest of the interview.',
        tip: {
          title: 'Build a watch list',
          text: 'Maintain a 3-5 name watch list well before recruiting. Read each company\'s earnings transcripts as they happen. By interview season, you will have months of context that no last-week prep can replicate.'
        }
      },
      {
        title: 'When the pitch goes wrong',
        text: 'Interviewers will push back on your thesis — that is the test. The right move is to acknowledge the point, not retreat. "You are right that channel inventory is a risk; I would lose conviction if next quarter\'s sell-through misses by more than 5%." Disagreement is fine; defensive flinching is not.',
        trap: {
          title: 'Do not fold',
          text: 'If you abandon your thesis the moment an interviewer questions it, you signal you did not really believe it. Pre-mortem your weakest assumptions before the interview so you have a real answer ready.'
        }
      }
    ]
  },

  {
    id: 'why-ib-why-firm',
    title: 'Why IB / Why This Firm',
    desc: 'How to architect the answer that does not sound like every other candidate. The version with specific evidence.',
    time: '10 min',
    sections: 4,
    category: 'behavioral',
    content: [
      {
        title: 'The architecture',
        text: 'Three reasons, each backed by a specific past experience or interest. Not "I want to learn" — that is true of every job. Specific: "after leading the M&A research project for our investment club, I want to do this work full-time, not write about it from the side." A specific reason cannot be cut and pasted to a different firm or industry.',
        tip: {
          title: 'The "swap test"',
          text: 'Read your "why IB" answer aloud, swap "investment banking" for "consulting" or "corporate strategy," and check whether the answer still makes sense. If it does, it is not really about IB — it is generic. Rewrite until at least two of your three reasons fail the swap test.'
        }
      },
      {
        title: 'Why you',
        text: 'Three pieces. Transferable skills: analytical work, work ethic, prior projects that map to deal-team output. Distinctive angle: a non-finance interest, an unusual experience, a perspective the room does not already have. What you bring: specific ways you will add value as an analyst — owning the data room, building a clean model, running a sharp comp set — not platitudes about teamwork.',
        trap: {
          title: 'Avoid the laundry list',
          text: 'Three concrete claims beat ten generic ones. "I am hard-working, detail-oriented, a strong communicator, a team player, results-driven" is the exact rhythm interviewers tune out. Pick three things, prove each.'
        }
      },
      {
        title: 'Why this firm',
        text: 'Three layers. Culture and people: cite a coffee chat by first name and what they told you. Deals: name two deals the firm did, explain why they interest you, what you would have wanted to work on. Group fit: if asked "why M&A specifically," "I like the strategic thinking" is weak; "I like that the auction timeline forces a decision every week — there is no place to hide" is real.',
        tip: {
          title: 'How to do the homework',
          text: 'Before any superday, do at least three coffee chats with people at the firm and read its last four major deal announcements. The investment is small; the credibility gap with candidates who skip this is large.'
        }
      },
      {
        title: 'Trap: cut-and-paste answers',
        text: 'Every interviewer in IB has heard the same generic answers a thousand times. The unspoken question behind "why this firm" is whether you actually did the work. Make at least 30% of your answer un-swappable — cite something only true of this firm, this group, this person you talked to. That is what is remembered after you leave the room.',
        trap: {
          title: 'Smell test',
          text: 'If you can say your "why firm" answer out loud and it could plausibly be anyone\'s, it is generic. The fix is always more specificity, not more polish.'
        }
      }
    ]
  },

  {
    id: 'story-structure',
    title: 'Behavioral Stories',
    desc: 'STAR, the stories that scale, and how to handle the weakness question without humblebrag.',
    time: '10 min',
    sections: 4,
    category: 'behavioral',
    content: [
      {
        title: 'STAR',
        text: 'Situation, Task, Action, Result. The most-taught behavioral framework, and it works. Most candidates over-index on Situation (background) and under-index on Action (what YOU specifically did) and Result (what changed because of it). The interviewer cares most about Action and Result.',
        formula: 'S — context (1 sentence)\nT — what was at stake (1 sentence)\nA — what YOU did (the bulk of the story)\nR — what changed (1-2 sentences, with numbers if you have them)',
        tip: {
          title: 'The single-most-skipped letter',
          text: 'A is the part of STAR most candidates get wrong. "We" answers a different question. Interviewers are evaluating you, not your team. Stay in first person.'
        }
      },
      {
        title: 'Picking stories that scale',
        text: 'A good behavioral story should answer four or more questions. The story of leading a difficult team project can answer leadership, conflict, failure, lesson-learned, and work-ethic — five common prompts from a single base story. Build a portfolio of 3-4 such stories so you are not scrambling for new material on every interview loop.',
        tip: {
          title: 'How to test a story',
          text: 'Write the story once. Then list every behavioral prompt it can answer. If the answer is one or two prompts, the story is not load-bearing — replace it with one that scales.'
        }
      },
      {
        title: 'The weakness question',
        text: 'Name a real weakness, not "I work too hard" or "I care too much." Name what you are doing about it, with specifics. Show early evidence the work is paying off. Structure: weakness → evidence it is real → action you are taking → early result.',
        formula: 'Weakness  →  Evidence it is real  →  Action  →  Early result',
        trap: {
          title: 'The humblebrag is transparent',
          text: 'Interviewers have heard "perfectionist" five times today. They roll their eyes silently and you do not see it. Pick a real weakness. The credibility upside outweighs the imagined downside.'
        }
      },
      {
        title: '90 seconds maximum',
        text: 'Interviewers begin tuning out around the two-minute mark. If your story takes longer, it has too much Situation and not enough Result. Practice with a stopwatch. Cut the backstory; cut the secondary characters; keep the Action and the Result tight.',
        tip: {
          title: 'A simple drill',
          text: 'Tell your story to a friend. Have them time it. If it is over 90 seconds, cut the first 20 and tell it again. Repeat until you can hit the Result in time.'
        }
      }
    ]
  }
];
