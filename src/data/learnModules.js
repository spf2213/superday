export const LEARN_MODULES = [
  {
    id: 'three-statements',
    title: 'The Three Financial Statements',
    icon: '📊',
    desc: 'Master how the Income Statement, Balance Sheet, and Cash Flow Statement connect.',
    time: '15 min',
    sections: 3,
    category: 'accounting',
    content: [
      {
        title: 'Why This Matters',
        icon: '🎯',
        text: 'The three-statement linkage is the single most important concept in finance interviews. If you can\'t explain how $10 of depreciation flows through all three statements, you won\'t pass a technical round.',
        visual: {
          title: 'THE THREE STATEMENTS',
          type: 'flow',
          items: [
            { label: 'INCOME STATEMENT', val: 'Revenue → Net Income', highlight: false },
            { label: 'BALANCE SHEET', val: 'Assets = L + E', highlight: false },
            { label: 'CASH FLOW', val: 'Cash In/Out', highlight: false }
          ]
        }
      },
      {
        title: 'The Linkages',
        icon: '🔗',
        text: 'Net Income from the Income Statement flows into Retained Earnings on the Balance Sheet. It\'s also the starting point of the Cash Flow Statement. The ending cash balance from the CFS becomes Cash on the Balance Sheet.',
        formula: 'Net Income → Retained Earnings (BS) → Starting point of CFS → Ending Cash → Cash on BS',
        tip: {
          title: 'Interview Insight',
          text: 'When asked about linkages, always start with Net Income. It touches all three statements and shows you understand the flow.'
        }
      },
      {
        title: 'The Classic Test Question',
        icon: '⚡',
        text: 'How does a $10 increase in Depreciation affect all three statements? This question appears in 90% of IB interviews.',
        formula: 'IS: Pre-tax ↓$10, Tax ↓$3.50, Net Income ↓$6.50\nCFS: NI ↓$6.50 + D&A add-back +$10 = OCF ↑$3.50\nBS: PP&E ↓$10, Cash ↑$3.50, RE ↓$6.50',
        trap: {
          title: 'Common Mistake',
          text: 'Don\'t forget the tax shield! Depreciation reduces taxable income, so you save 35% (or whatever rate) in taxes. Many candidates say Net Income drops by $10 — it actually drops by $6.50.'
        }
      }
    ]
  },
  {
    id: 'dcf-basics',
    title: 'DCF Fundamentals',
    icon: '💰',
    desc: 'Understand intrinsic valuation from first principles. Why we discount, what WACC means.',
    time: '20 min',
    sections: 4,
    category: 'valuation',
    content: [
      {
        title: 'The Core Idea',
        icon: '💡',
        text: 'A DCF answers one question: What is a company worth based on the cash it will generate in the future? We project Free Cash Flows, then discount them back to today\'s value using a discount rate (WACC).',
        formula: 'Enterprise Value = Σ (FCF / (1 + WACC)^n) + Terminal Value',
        tip: {
          title: 'Intuition',
          text: '$100 today is worth more than $100 in 5 years. A DCF mathematically captures this "time value of money" by discounting future cash flows.'
        }
      },
      {
        title: 'Unlevered Free Cash Flow',
        icon: '📈',
        text: 'We use Unlevered FCF (also called Free Cash Flow to Firm) because it represents cash available to ALL investors — both debt and equity holders.',
        formula: 'UFCF = EBIT × (1 - Tax Rate) + D&A - CapEx - Δ NWC',
        trap: {
          title: 'Why "Unlevered"?',
          text: 'We exclude interest expense because WACC already accounts for the cost of debt. Including interest would double-count it.'
        }
      },
      {
        title: 'WACC Explained',
        icon: '⚖️',
        text: 'WACC (Weighted Average Cost of Capital) blends the cost of equity and cost of debt, weighted by their proportions in the capital structure.',
        formula: 'WACC = (E/V) × Re + (D/V) × Rd × (1 - Tax)',
        tip: {
          title: 'Key Insight',
          text: 'Higher WACC = higher risk = lower present value. A risky startup might have 15% WACC; a utility company might have 6%.'
        }
      },
      {
        title: 'Terminal Value',
        icon: '∞',
        text: 'Since we can\'t project cash flows forever, we calculate a Terminal Value at the end of our projection period. This often represents 60-80% of the total DCF value.',
        formula: 'Terminal Value (Gordon Growth) = Final Year FCF × (1 + g) / (WACC - g)',
        trap: {
          title: 'Sensitivity Alert',
          text: 'Small changes in the perpetual growth rate (g) dramatically change Terminal Value. Always use 2-3% max — no company grows faster than GDP forever.'
        }
      }
    ]
  },
  {
    id: 'ev-equity',
    title: 'Enterprise Value vs. Equity Value',
    icon: '🏢',
    desc: 'The difference every interviewer will test you on. When to use which.',
    time: '12 min',
    sections: 3,
    category: 'valuation',
    content: [
      {
        title: 'The Key Difference',
        icon: '🔑',
        text: 'Equity Value is what shareholders own. Enterprise Value is the total value of the business operations — what it would cost to buy the whole company and pay off its debts.',
        formula: 'Enterprise Value = Equity Value + Debt - Cash + Preferred + Minority Interest',
        tip: {
          title: 'Memory Trick',
          text: 'Think of buying a house: Equity Value = your down payment (what you own). Enterprise Value = house price (total value of the property).'
        }
      },
      {
        title: 'Which Multiple, Which Value?',
        icon: '📊',
        text: 'Match the numerator to the denominator. EV multiples use metrics available to ALL investors. Equity multiples use metrics for shareholders only.',
        visual: {
          title: 'MATCHING RULE',
          type: 'two-column',
          left: { label: 'EV MULTIPLES', items: ['EV/Revenue', 'EV/EBITDA', 'EV/EBIT'] },
          right: { label: 'EQUITY MULTIPLES', items: ['P/E', 'P/B', 'Price/FCF'] }
        },
        trap: {
          title: 'Classic Trap',
          text: 'Never use EV/Net Income or P/EBITDA. Net Income is after interest (equity holders only). EBITDA is before interest (all investors). They don\'t match!'
        }
      },
      {
        title: 'The Bridge',
        icon: '🌉',
        text: 'Moving between EV and Equity Value is critical for M&A analysis and LBO modeling.',
        formula: 'Equity Value = Enterprise Value - Debt + Cash - Preferred - Minority Interest',
        tip: {
          title: 'Interview Answer',
          text: 'When asked "walk me through EV to Equity Value" — start with EV, subtract debt (you\'d pay it off), add cash (you\'d keep it).'
        }
      }
    ]
  },
  {
    id: 'lbo-mechanics',
    title: 'LBO Model Mechanics',
    icon: '🏦',
    desc: 'How PE firms use debt to amplify returns. The math behind leveraged buyouts.',
    time: '25 min',
    sections: 4,
    category: 'lbo',
    content: [
      {
        title: 'What is an LBO?',
        icon: '🎯',
        text: 'A Leveraged Buyout is when a PE firm acquires a company using mostly debt (60-80%), operates it for 3-7 years, then sells it for a profit. The "leverage" amplifies returns.',
        tip: {
          title: 'Real-World Analogy',
          text: 'Buying a house with a mortgage is an LBO. You put down 20%, borrow 80%, make payments from rental income, then sell for (hopefully) more than you paid.'
        }
      },
      {
        title: 'Sources & Uses',
        icon: '💵',
        text: 'Every LBO starts with a Sources & Uses table. Sources = where the money comes from. Uses = where it goes.',
        visual: {
          title: 'SOURCES = USES',
          type: 'two-column',
          left: { label: 'SOURCES', items: ['Senior Debt', 'Mezzanine', 'Sponsor Equity'] },
          right: { label: 'USES', items: ['Purchase Price', 'Fees', 'Refinance Debt'] }
        }
      },
      {
        title: 'Value Creation Levers',
        icon: '⚡',
        text: 'PE firms create value through three main levers: paying down debt, growing EBITDA, and multiple expansion.',
        formula: 'IRR Drivers: (1) Debt Paydown (2) EBITDA Growth (3) Multiple Expansion',
        trap: {
          title: 'Interview Insight',
          text: 'Entry multiple has the biggest impact on IRR. Always run sensitivity on purchase price — a half-turn difference is massive.'
        }
      },
      {
        title: 'IRR Calculation',
        icon: '📈',
        text: 'PE firms target 20-25%+ IRR. The formula relates initial equity investment to exit proceeds.',
        formula: 'IRR ≈ (Exit Equity / Entry Equity)^(1/Years) - 1',
        tip: {
          title: 'Quick Math',
          text: 'To double money in 5 years = ~15% IRR. To triple it = ~25% IRR. These benchmarks help you gut-check your model.'
        }
      }
    ]
  }
];
