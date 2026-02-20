const QUESTIONS = [

  // ══════════════════════════════════════
  // TECHNICAL — ACCOUNTING (40 questions, id 100-139)
  // ══════════════════════════════════════

  {id:100,cat:'tech',sub:'accounting',q:"What are the three main financial statements?",a:"The Income Statement, Balance Sheet, and Cash Flow Statement.",wrong:["Income Statement, Balance Sheet, and Statement of Shareholders\u2019 Equity.","Profit & Loss Statement, Balance Sheet, and Trial Balance.","Balance Sheet, Cash Flow Statement, and Budget Report."],tip:"This is the #1 most common opening question. Know it cold.",difficulty:1},
  {id:101,cat:'tech',sub:'accounting',q:"How are the three financial statements linked together?",a:"Net income from the Income Statement flows into the Cash Flow Statement (as operating cash flow) and into retained earnings on the Balance Sheet; the Cash Flow Statement\u2019s ending cash balance becomes cash on the Balance Sheet.",wrong:["They are not connected at all; each statement is independent.","Only the Income Statement and Balance Sheet are linked.","Net income from the Cash Flow Statement updates the Income Statement directly."],tip:"Always start with net income \u2014 it touches all three statements.",difficulty:1},
  {id:102,cat:'tech',sub:'accounting',q:"What is working capital and how is it calculated?",a:"Working capital is the difference between a company\u2019s current assets and its current liabilities.",wrong:["It\u2019s the company\u2019s total assets minus total liabilities.","It equals cash on hand plus inventory.","It\u2019s current assets plus current liabilities."],tip:"Positive working capital means the company can cover short-term obligations.",difficulty:1},
  {id:103,cat:'tech',sub:'accounting',q:"If depreciation increases by $10 (40% tax rate), how does it affect the financial statements?",a:"Net income falls by $6 (because $10 depreciation reduces EBIT, saving $4 in taxes at 40%), cash increases by $4 (adding back depreciation), and on the Balance Sheet cash is up $4, PP&E is down $10, and retained earnings is down $6.",wrong:["Net income increases by $4 and cash flow is unchanged.","Net income drops by $10 and cash drops by $10.","Only the Balance Sheet is affected: PP&E down $10 and equity down $10."],tip:"Memorise this cold \u2014 it appears in almost every technical interview.",difficulty:1},
  {id:104,cat:'tech',sub:'accounting',q:"What is the difference between cash accounting and accrual accounting?",a:"Cash accounting recognizes revenue and expenses only when cash is received or paid, whereas accrual accounting recognizes revenue when earned and expenses when incurred, regardless of when cash changes hands.",wrong:["There is no difference \u2013 both record transactions the same way.","Cash accounting records only cash transactions; accrual records only credit.","Accrual accounting waits for cash collection, unlike cash accounting."],tip:"Public companies must use accrual accounting under GAAP/IFRS.",difficulty:1},
  {id:105,cat:'tech',sub:'accounting',q:"How can a company have positive net income but go bankrupt?",a:"If net income is not translating to cash \u2013 for example, working capital deterioration (revenues tied up in accounts receivable) or large debt obligations can drain cash despite accounting profits.",wrong:["That\u2019s impossible \u2013 positive net income always means the company is fine.","Only if the accounting is incorrect; otherwise it cannot happen.","This only happens if the company spends too much on advertising."],tip:"Cash is king \u2014 profitability doesn\u2019t guarantee solvency.",difficulty:1},
  {id:106,cat:'tech',sub:'accounting',q:"What is EBITDA and why is it important?",a:"EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization. It measures operating performance and serves as a proxy for operating cash flow by excluding interest, taxes, and non-cash charges.",wrong:["EBITDA is the same as net income.","EBITDA equals net income plus all expenses.","EBITDA is earnings after all expenses including interest and taxes."],tip:"EBITDA is used in EV/EBITDA multiples because it\u2019s capital-structure-neutral.",difficulty:1},
  {id:107,cat:'tech',sub:'accounting',q:"How does an increase in accounts receivable affect cash flow?",a:"If AR rises, revenue and net income increase, but no cash is received \u2013 it uses cash (reducing operating cash flow) because cash collection is delayed.",wrong:["It increases both net income and cash immediately.","It has no impact on cash flow.","It only affects the Balance Sheet by moving cash into receivables."],tip:"Rising AR is a red flag for cash flow quality \u2014 revenue growth without collection.",difficulty:1},
  {id:108,cat:'tech',sub:'accounting',q:"What is the difference between accounts payable and accrued expenses?",a:"Both are current liabilities, but AP is typically for invoiced purchases on credit, while accrued expenses are incurred but not yet invoiced expenses (like salaries or utilities).",wrong:["They mean exactly the same thing with no distinction.","Accounts payable are long-term debts, accrued expenses are short-term.","Accrued expenses are already paid in cash, whereas AP are not."],tip:"Think: AP has an invoice, accrued expenses are estimated/accumulated.",difficulty:2},
  {id:109,cat:'tech',sub:'accounting',q:"If you could only use one financial statement to evaluate a company, which would you choose?",a:"The Cash Flow Statement \u2013 because it shows actual cash generation, providing a true picture of liquidity. It\u2019s more telling than the IS (which includes non-cash items) or BS (a snapshot).",wrong:["The Income Statement, because it shows the company\u2019s profit directly.","The Balance Sheet, because it shows the company\u2019s net worth.","It doesn\u2019t matter; all statements give the same information."],tip:"Justify your choice by explaining what the others miss.",difficulty:2},
  {id:110,cat:'tech',sub:'accounting',q:"What is goodwill and how is it created?",a:"Goodwill is an intangible asset that represents the excess amount paid in an acquisition over the fair market value of the target\u2019s net identifiable assets.",wrong:["Goodwill is the value of a company\u2019s reputation without any specific transaction.","Goodwill arises when you pay less than fair value of assets.","Goodwill is created whenever market value exceeds book value."],tip:"Goodwill only appears through acquisitions, never organically.",difficulty:2},
  {id:111,cat:'tech',sub:'accounting',q:"What is a deferred tax liability, and why might one be created?",a:"A DTL arises when a company\u2019s accounting profit is higher than its taxable profit (e.g., due to accelerated depreciation for tax), so taxes are owed in the future.",wrong:["It\u2019s when a company overpays taxes and expects a refund.","It\u2019s the same as accounts payable for taxes.","It means the company hasn\u2019t paid taxes for several years."],tip:"The most common cause is accelerated depreciation for tax vs. straight-line for books.",difficulty:2},
  {id:112,cat:'tech',sub:'accounting',q:"Why is debt often considered a cheaper source of financing than equity?",a:"Because interest on debt is tax-deductible (creating a tax shield) and debt investors have priority in repayment (lower risk), debt usually has a lower required return than equity.",wrong:["Equity is cheaper since dividends are optional.","Debt is cheaper because you never have to pay it back.","Equity financing always lowers WACC compared to debt."],tip:"The tax shield is the key reason \u2014 interest expense reduces taxable income.",difficulty:2},
  {id:113,cat:'tech',sub:'accounting',q:"What is net working capital?",a:"NWC = Current Assets \u2013 Current Liabilities. It indicates how much short-term resources the company has tied up in operations versus short-term obligations.",wrong:["It\u2019s just cash available for operations.","It\u2019s total assets minus total liabilities.","It\u2019s current assets plus current liabilities."],tip:"For DCF purposes, NWC changes affect free cash flow calculations.",difficulty:2},
  {id:114,cat:'tech',sub:'accounting',q:"How do you calculate enterprise value (EV)?",a:"EV = Equity Value (market cap) + total debt + preferred stock + minority interest \u2013 cash.",wrong:["EV = Equity Value minus total debt.","EV = Total assets minus total liabilities.","EV = Equity Value + cash \u2013 debt."],tip:"Remember: you ADD debt and SUBTRACT cash. An acquirer assumes debt but gets the cash.",difficulty:2},
  {id:115,cat:'tech',sub:'accounting',q:"What is the difference between enterprise value and equity value?",a:"Equity value represents the shareholders\u2019 stake, whereas enterprise value represents total value to all investors (equity plus net debt), reflecting the full cost to acquire the business.",wrong:["They are the same in all cases.","Equity value includes debt while EV does not.","Equity value is always smaller than enterprise value."],tip:"A company with net cash can have EV less than equity value.",difficulty:2},
  {id:116,cat:'tech',sub:'accounting',q:"How do the financial statements reflect an equity issuance of $50?",a:"No impact on the IS. On the CFS, cash increases by $50 from financing. On the BS, cash increases by $50 and Shareholders\u2019 Equity increases by $50.",wrong:["Net income increases by $50 since cash is received.","Liabilities increase by $50 because new shares are like debt.","It decreases equity by $50 due to dilution."],tip:"Equity issuances never touch the Income Statement.",difficulty:3},
  {id:117,cat:'tech',sub:'accounting',q:"If a company raises $100 in new debt, what is the impact on the financial statements?",a:"Immediately, no change to net income. Cash increases by $100 from financing, and on the BS cash is up $100 and debt (liability) is up $100.",wrong:["Net income goes up because the company has more cash.","Liabilities don\u2019t change since debt brings in cash.","Equity increases by $100 because the company has more funds."],tip:"Debt affects the IS only when interest expense is incurred in future periods.",difficulty:3},
  {id:118,cat:'tech',sub:'accounting',q:"Why are capital expenditures treated differently from operating expenses?",a:"CapEx is capitalized (recorded as an asset) because it provides benefit over multiple periods, whereas OpEx benefits only the current period and is expensed immediately.",wrong:["They are both expensed immediately.","CapEx is expensed later to save on taxes.","Operating expenses can be capitalized if the company wants."],tip:"Capitalizing vs. expensing affects both IS and BS timing.",difficulty:3},
  {id:119,cat:'tech',sub:'accounting',q:"What is retained earnings?",a:"Retained earnings is the cumulative net income minus any dividends paid to shareholders. It represents profits reinvested in the business over time.",wrong:["It is the company\u2019s cash balance available for dividends.","It\u2019s the initial capital founders invested.","Retained earnings reset to zero every year after dividends."],tip:"Retained earnings links the IS to the BS every single period.",difficulty:3},
  {id:120,cat:'tech',sub:'accounting',q:"What is the difference between LIFO and FIFO inventory methods?",a:"FIFO assumes oldest inventory sold first; LIFO assumes newest sold first. When prices rise, LIFO shows higher COGS and lower net income (tax benefit), while FIFO shows lower COGS and higher net income.",wrong:["LIFO and FIFO always produce the same net income.","FIFO is only for perishable goods.","LIFO shows lower COGS than FIFO when prices rise."],tip:"IFRS prohibits LIFO; only GAAP allows it.",difficulty:2},
  {id:121,cat:'tech',sub:'accounting',q:"What is a deferred tax asset (DTA)?",a:"A DTA arises when a company has paid more taxes in cash than it owes per its books (e.g., net operating loss carryforwards). It represents future tax savings.",wrong:["It is a liability the company owes the government.","It means the company avoided paying taxes illegally.","It\u2019s the same as a tax refund already received."],tip:"DTAs are the mirror image of DTLs \u2014 they reduce future taxes owed.",difficulty:2},
  {id:122,cat:'tech',sub:'accounting',q:"What is the difference between gross profit and operating profit?",a:"Gross profit = Revenue minus COGS. Operating profit (EBIT) = Gross profit minus operating expenses (SG&A, R&D, D&A). Operating profit reflects the full cost of running the business.",wrong:["They are the same thing with different names.","Gross profit is after all expenses including taxes.","Operating profit includes interest expense and taxes."],tip:"Gross margin \u2192 production efficiency; operating margin \u2192 overall business efficiency.",difficulty:1},
  {id:123,cat:'tech',sub:'accounting',q:"What is the revenue recognition principle?",a:"Revenue should be recognized when earned (goods/services delivered) and realizable (collection reasonably assured), not necessarily when cash is received.",wrong:["Revenue is recognized only when cash hits the bank.","Revenue can be recognized at any time the company chooses.","Revenue is recognized when a contract is signed."],tip:"Under ASC 606, revenue is recognized when performance obligations are satisfied.",difficulty:1},
  {id:124,cat:'tech',sub:'accounting',q:"If inventory increases by $20, how does that affect the cash flow statement?",a:"An increase in inventory is a use of cash (negative adjustment in operating cash flow), because the company spent cash to buy inventory not yet sold.",wrong:["It increases operating cash flow because the company has more assets.","No effect on cash flow since inventory is on the BS only.","It reduces cash from financing activities."],tip:"Inventory buildup ties up cash \u2014 it\u2019s a working capital drag.",difficulty:2},
  {id:125,cat:'tech',sub:'accounting',q:"What is the difference between capitalizing and expensing a cost?",a:"Capitalizing records a cost as a BS asset and depreciates/amortizes it over its useful life. Expensing records the full cost immediately on the IS, reducing current-period income.",wrong:["No difference in the long run.","Capitalizing always increases net income permanently.","Expensing is only used for costs under $1,000."],tip:"Capitalizing shifts expense recognition to future periods.",difficulty:2},
  {id:126,cat:'tech',sub:'accounting',q:"What is the statement of shareholders\u2019 equity?",a:"It shows changes in equity accounts over a period: beginning equity, plus net income, minus dividends, plus/minus OCI and stock issuances/repurchases, equals ending equity.",wrong:["It is just another name for the balance sheet.","It only tracks stock price changes over time.","It shows total shareholder investment and nothing else."],tip:"This reconciles the equity section of the BS period over period.",difficulty:2},
  {id:127,cat:'tech',sub:'accounting',q:"How does a stock buyback affect the financial statements?",a:"Cash decreases (BS), treasury stock increases (reducing equity), shares outstanding decrease. On the CFS, it\u2019s a financing outflow. No impact on the IS.",wrong:["Net income increases because there are fewer shares.","Total equity increases because the company invests in itself.","It only affects the IS through EPS."],tip:"Buybacks reduce shares outstanding, increasing EPS even if NI stays flat.",difficulty:3},
  {id:128,cat:'tech',sub:'accounting',q:"What is an operating lease vs. a finance lease?",a:"Under ASC 842, both create a right-of-use asset and liability on the BS. A finance lease front-loads expense (amortization + interest). An operating lease records a single straight-line expense.",wrong:["Operating leases are off-balance-sheet under current rules.","Finance leases have no balance sheet impact.","There is no distinction under modern accounting."],tip:"Post-ASC 842, operating leases are ON the balance sheet \u2014 a major rule change.",difficulty:3},
  {id:129,cat:'tech',sub:'accounting',q:"What is diluted earnings per share (EPS)?",a:"Diluted EPS = Net Income / (Basic Shares + all potentially dilutive securities like stock options, convertible bonds, warrants). It shows worst-case EPS if all convertibles are exercised.",wrong:["It is the same as basic EPS.","It only includes currently outstanding shares.","Diluted EPS is always higher than basic EPS."],tip:"Diluted EPS is always \u2264 basic EPS. Use the treasury stock method for options.",difficulty:3},
  {id:130,cat:'tech',sub:'accounting',q:"What is other comprehensive income (OCI)?",a:"OCI captures gains/losses that bypass the IS and go directly to equity on the BS. Examples: unrealized gains on AFS securities, foreign currency translation, pension adjustments.",wrong:["It is another name for net income.","OCI items appear on the IS below the line.","It includes all revenue not from core operations."],tip:"OCI bridges net income and comprehensive income \u2014 know the key items.",difficulty:3},
  {id:131,cat:'tech',sub:'accounting',q:"How does a write-down of inventory affect the three statements?",a:"IS: COGS increases, reducing net income. CFS: NI decreases but the write-down is non-cash and added back \u2014 net cash impact is zero. BS: Inventory decreases, retained earnings decrease.",wrong:["Cash decreases by the write-down amount.","It only affects the balance sheet.","Net income increases because expenses are removed."],tip:"Write-downs are non-cash \u2014 same concept as depreciation flowing through the statements.",difficulty:3},
  {id:132,cat:'tech',sub:'accounting',q:"What is the matching principle in accounting?",a:"Expenses should be recognized in the same period as the revenues they help generate. If you sell a product in Q1, its production cost should also be recorded in Q1.",wrong:["Expenses are recorded whenever cash is paid.","Revenue and expenses are matched by calendar year only.","The matching principle only applies to manufacturing companies."],tip:"A core tenet of accrual accounting that prevents income distortion.",difficulty:1},
  {id:133,cat:'tech',sub:'accounting',q:"What is the difference between tangible and intangible assets?",a:"Tangible assets have physical form (buildings, equipment). Intangible assets lack physical substance (patents, goodwill, software). Tangibles are depreciated; finite-life intangibles are amortized.",wrong:["Intangible assets are always more valuable.","Tangible assets cannot lose value.","Goodwill is a tangible asset."],tip:"Goodwill and indefinite-life intangibles are tested for impairment, not amortized.",difficulty:1},
  {id:134,cat:'tech',sub:'accounting',q:"If accounts payable increases, what happens to cash flow?",a:"An increase in AP preserves cash (the company delays payments). This is a positive adjustment (source of cash) on the operating section of the CFS.",wrong:["Cash flow decreases because the company owes more.","No effect on cash flow.","It reduces cash from financing activities."],tip:"AP increase = cash benefit. The company got goods/services but hasn\u2019t paid yet.",difficulty:1},
  {id:135,cat:'tech',sub:'accounting',q:"What is depreciation and why does it matter?",a:"Depreciation is the systematic allocation of a tangible asset\u2019s cost over its useful life. It\u2019s a non-cash expense that reduces taxable income (tax shield) and reflects asset wear.",wrong:["Depreciation is a cash expense paid to maintain equipment.","It increases the value of assets over time.","Depreciation only applies to buildings."],tip:"Key insight: depreciation reduces taxes but doesn\u2019t require cash outflow, so it increases FCF.",difficulty:1},
  {id:136,cat:'tech',sub:'accounting',q:"What are the three sections of the Cash Flow Statement?",a:"Operating activities (day-to-day business), Investing activities (buying/selling long-term assets), and Financing activities (debt, equity, dividends).",wrong:["Revenue activities, expense activities, and investment activities.","There are only two sections: inflows and outflows.","Operating, marketing, and administrative activities."],tip:"Interviewers will ask you to classify specific items into these three buckets.",difficulty:1},
  {id:137,cat:'tech',sub:'accounting',q:"What is the difference between straight-line and accelerated depreciation?",a:"Straight-line spreads cost evenly over the asset\u2019s life. Accelerated methods front-load more depreciation early, resulting in lower taxable income and a larger initial tax shield.",wrong:["Both methods result in the same annual expense.","Accelerated depreciation totals more expense over the life.","Straight-line is only for tax purposes."],tip:"Companies often use straight-line for books and accelerated for taxes \u2014 creating DTLs.",difficulty:2},
  {id:138,cat:'tech',sub:'accounting',q:"How does a $10 prepaid expense affect the financial statements?",a:"When cash is paid: Cash -$10, prepaid asset +$10 (BS). When recognized later: prepaid -$10, expense hits IS reducing NI. No cash impact at recognition.",wrong:["Net income drops by $10 immediately when cash is paid.","Prepaid expenses are never on the balance sheet.","It only affects the income statement."],tip:"Prepaid expenses are assets until consumed \u2014 the timing difference is key.",difficulty:2},
  {id:139,cat:'tech',sub:'accounting',q:"What is the asset purchase vs. stock purchase distinction in an acquisition?",a:"In an asset purchase, the buyer selects specific assets/liabilities and can step up the tax basis. In a stock purchase, the buyer acquires all shares and all assets/liabilities. Buyers prefer asset deals for tax benefits; sellers prefer stock deals for capital gains treatment.",wrong:["There is no practical difference.","Asset purchases always cost more.","Stock purchases allow choosing which liabilities to assume."],tip:"Buyers like asset deals for the depreciation tax benefit; sellers like stock deals for cleaner capital gains.",difficulty:3},

  // ══════════════════════════════════════
  // TECHNICAL \u2014 VALUATION (35 questions, id 140-174)
  // ══════════════════════════════════════

  {id:140,cat:'tech',sub:'valuation',q:"Why would you use multiple methods to value a company?",a:"Different methods rely on different assumptions and yield different values, providing a range and cross-check. Precedent transactions and DCF often produce higher values than comparables.",wrong:["One method is enough if done correctly.","To confuse the valuation.","Because no method is reliable, so you try many at random."],tip:"The football field chart shows all methods side-by-side for this reason.",difficulty:1},
  {id:141,cat:'tech',sub:'valuation',q:"What is discounted cash flow (DCF) analysis?",a:"A DCF estimates a company\u2019s intrinsic value by projecting future free cash flows and discounting them to present value using WACC. The sum of PV of projected FCFs and the terminal value gives enterprise value.",wrong:["Valuing a company based only on past profits.","Multiplying earnings by the P/E ratio.","A method to value stock options."],tip:"DCF is the most theoretically sound method because it values what the company will generate.",difficulty:1},
  {id:142,cat:'tech',sub:'valuation',q:"How do you calculate WACC?",a:"WACC = Cost of Equity \u00d7 (% Equity) + Cost of Debt \u00d7 (% Debt) \u00d7 (1 \u2013 Tax Rate). Weight each component by its proportion of total capital using market values.",wrong:["It\u2019s just the average interest rate on all loans.","It equals the cost of equity.","Take the average of past stock returns."],tip:"Use market values (not book values) for the weightings.",difficulty:1},
  {id:143,cat:'tech',sub:'valuation',q:"How do you calculate the cost of equity?",a:"Typically using CAPM: Cost of Equity = Risk-free rate + Beta \u00d7 (Market risk premium).",wrong:["It\u2019s just the dividend yield.","Use the company\u2019s debt interest rate.","There is no way to calculate it."],tip:"Risk-free rate = typically 10-year Treasury yield.",difficulty:1},
  {id:144,cat:'tech',sub:'valuation',q:"What is Beta in finance?",a:"Beta measures a stock\u2019s volatility relative to the market. A beta of 1.3 means the stock is 30% more volatile than the overall market.",wrong:["Beta is the company\u2019s cost of debt.","Beta is an absolute measure of bankruptcy risk.","Negative beta means the price can\u2019t go down."],tip:"Higher beta \u2192 higher cost of equity \u2192 higher WACC \u2192 lower DCF value.",difficulty:1},
  {id:145,cat:'tech',sub:'valuation',q:"What is enterprise value and how is it calculated?",a:"EV is the total value of a firm\u2019s core operations to all capital providers. EV = Equity Value + Debt + Preferred Stock + Minority Interest \u2013 Cash.",wrong:["EV is just market capitalization.","EV = Total Assets \u2013 Total Liabilities.","EV = Equity Value plus cash plus debt."],tip:"Think of EV as the price tag to buy the entire business.",difficulty:1},
  {id:146,cat:'tech',sub:'valuation',q:"What is equity value (market value of equity)?",a:"Equity value = share price \u00d7 diluted shares outstanding. It represents the total market value of the shareholders\u2019 ownership.",wrong:["It\u2019s the book value of equity on the BS.","It\u2019s the liquidation value.","It always equals EV minus debt."],tip:"Always use diluted shares, not basic shares, for equity value in IB.",difficulty:1},
  {id:147,cat:'tech',sub:'valuation',q:"How do you get from equity value to enterprise value?",a:"Equity Value + Debt + Preferred Stock + Minority Interest \u2013 Cash = Enterprise Value.",wrong:["Add cash and subtract debt from equity value.","EV and equity value are unrelated.","Multiply equity value by the P/E ratio."],tip:"The bridge: Equity Value \u2192 +Debt \u2192 +Preferred \u2192 +Minority \u2192 \u2013Cash = EV.",difficulty:2},
  {id:148,cat:'tech',sub:'valuation',q:"What are some valuation techniques beyond the main three?",a:"Liquidation Value, Replacement Cost, LBO Analysis, Sum-of-the-Parts, future share price analysis, and dividend discount models.",wrong:["Only DCF, comps, and precedents exist.","CAPM or Gordon Growth alone are valuations.","Only financial ratios like ROE count as valuations."],tip:"LBO analysis sets a floor valuation \u2014 what a financial buyer could pay.",difficulty:2},
  {id:149,cat:'tech',sub:'valuation',q:"What is the purpose of the terminal value in a DCF?",a:"The terminal value represents the company\u2019s value beyond the projection period. Calculated via Gordon Growth (TV = FCF\u00d7(1+g)/(WACC\u2013g)) or exit multiple. It often constitutes 60-80% of DCF value.",wrong:["It\u2019s an arbitrary plug number.","It\u2019s the cash on hand at the end.","It\u2019s the sum of FCFs during the projection period."],tip:"Terminal value dominates DCF output \u2014 sensitize it carefully.",difficulty:2},
  {id:150,cat:'tech',sub:'valuation',q:"How are unlevered free cash flows calculated?",a:"UFCF = EBIT \u00d7 (1 \u2013 Tax Rate) + D&A \u2013 Change in NWC \u2013 CapEx.",wrong:["Net income plus interest expense.","Operating CF plus interest income minus dividends.","EBITDA minus taxes and all financing costs."],tip:"UFCF is pre-debt so it can be discounted at WACC.",difficulty:2},
  {id:151,cat:'tech',sub:'valuation',q:"What is the difference between market value and book value of equity?",a:"Book value = shareholders\u2019 equity on the BS (historical costs). Market value = stock price \u00d7 shares, which factors in future growth and can differ substantially from book value.",wrong:["They are always the same.","Market value is usually lower than book value.","Book value includes intangibles\u2019 market value."],tip:"Tech companies often have market value many times book value.",difficulty:2},
  {id:152,cat:'tech',sub:'valuation',q:"What does the P/E ratio tell you?",a:"P/E = Equity Value / Net Income (or price/EPS). It indicates how much investors pay per dollar of earnings. Higher P/E suggests high growth expectations or overvaluation.",wrong:["P/E is earnings divided by price.","A high P/E always means overvalued.","P/E accounts for debt and equals EV/EBITDA."],tip:"P/E is an equity-level metric; EV/EBITDA is enterprise-level. Don\u2019t mix them.",difficulty:2},
  {id:153,cat:'tech',sub:'valuation',q:"Why might two companies with the same earnings have different P/E ratios?",a:"Due to differences in expected growth, risk, and earnings quality. Higher growth or lower risk commands a higher P/E.",wrong:["If earnings are the same, P/E must be the same.","One must have misreported earnings.","It only happens if a stock price is temporarily wrong."],tip:"P/E captures forward expectations, not just current performance.",difficulty:2},
  {id:154,cat:'tech',sub:'valuation',q:"What is EV/EBITDA and why is it used?",a:"EV/EBITDA is Enterprise Value divided by EBITDA. It compares company value relative to operating earnings, independent of capital structure and taxes.",wrong:["EV/EBITDA is the same as P/E.","It isn\u2019t widely used.","A higher EV/EBITDA is always better."],tip:"EV/EBITDA is the most widely used multiple in IB because it normalizes across capital structures.",difficulty:2},
  {id:155,cat:'tech',sub:'valuation',q:"How do interest rates affect a company\u2019s valuation?",a:"Higher rates increase discount rates/cost of capital, lowering present value of future cash flows and reducing valuations. They also make debt more expensive.",wrong:["Valuations are independent of interest rate changes.","Rising rates always increase valuations.","Interest rates don\u2019t affect DCF calculations."],tip:"Interest rates affect both WACC and terminal value.",difficulty:3},
  {id:156,cat:'tech',sub:'valuation',q:"What is an IPO?",a:"An Initial Public Offering is the first time a private company offers shares to the public, allowing it to raise equity capital from public investors.",wrong:["It\u2019s a type of bond issued by a private company.","It\u2019s the process of going private.","IPO stands for Instant Profit Opportunity."],tip:"IB banks underwrite IPOs \u2014 this is a core part of ECM.",difficulty:1},
  {id:157,cat:'tech',sub:'valuation',q:"What are comparable companies analysis (comps)?",a:"Comps involves selecting similar publicly traded companies and using their trading multiples (EV/EBITDA, P/E) to estimate the target\u2019s value. It provides a market-based valuation.",wrong:["Comps means comparing to the company\u2019s own prior years.","It\u2019s the same as precedent transactions.","You only look at one comparable company."],tip:"The art of comps is choosing the right peer set \u2014 similar size, growth, margins, geography.",difficulty:1},
  {id:158,cat:'tech',sub:'valuation',q:"What are precedent transactions?",a:"Precedent transaction analysis looks at prices paid in past M&A deals for similar companies. It typically yields higher values than comps because prices include control premiums.",wrong:["It\u2019s the same as comps using trading multiples.","It only looks at transactions from the last 30 days.","Precedent transactions give the lowest valuation."],tip:"Precedent transactions include a control premium (usually 20-40% above trading price).",difficulty:2},
  {id:159,cat:'tech',sub:'valuation',q:"Which valuation method typically gives the highest value?",a:"Precedent transactions typically give the highest (due to control premiums), followed by DCF, then comps. However, this varies by situation.",wrong:["Comps always give the highest value.","DCF always gives the lowest value.","All methods give the same result."],tip:"Typical range (low to high): Comps \u2192 DCF \u2192 Precedent Transactions.",difficulty:2},
  {id:160,cat:'tech',sub:'valuation',q:"What is a control premium?",a:"The extra amount a buyer pays above market price to gain control of a company. It reflects the value of decision-making power. Typically 20-40%.",wrong:["It\u2019s a discount for minority stakes.","It\u2019s the IB advisory fee.","Control premiums don\u2019t exist."],tip:"Control premiums explain why precedent transactions yield higher values than comps.",difficulty:2},
  {id:161,cat:'tech',sub:'valuation',q:"What is a liquidity discount?",a:"A liquidity discount reduces the value of assets that can\u2019t be easily sold (e.g., private company shares). Private companies are typically valued at a 15-30% discount to public peers.",wrong:["It\u2019s a premium for highly liquid assets.","It only applies to real estate.","A liquidity discount increases private company valuations."],tip:"When using public comps to value a private company, apply a liquidity discount.",difficulty:3},
  {id:162,cat:'tech',sub:'valuation',q:"What is the Gordon Growth Model?",a:"TV = FCF \u00d7 (1+g) / (r\u2013g), where g is the long-term growth rate and r is the discount rate. The growth rate should not exceed long-term GDP/inflation growth (~2-3%).",wrong:["It projects revenue growth over 5-10 years.","The growth rate can exceed the discount rate.","It\u2019s only used for dividend-paying stocks."],tip:"If g \u2265 r, the formula breaks \u2014 terminal growth rate must be conservative.",difficulty:2},
  {id:163,cat:'tech',sub:'valuation',q:"What is a sum-of-the-parts (SOTP) valuation?",a:"SOTP values each business segment independently using the most appropriate method for each, then sums the parts. Useful for diversified conglomerates.",wrong:["It\u2019s the same as comps.","Divide total revenue by number of segments.","SOTP only applies to companies in multiple countries."],tip:"SOTP can reveal a conglomerate discount \u2014 where the whole trades for less than the parts.",difficulty:3},
  {id:164,cat:'tech',sub:'valuation',q:"When would you use EV/Revenue instead of EV/EBITDA?",a:"When a company has negative or very low EBITDA (e.g., high-growth tech or early-stage companies), making EBITDA-based multiples meaningless.",wrong:["EV/Revenue is never used.","Only when EBITDA is extremely high.","EV/Revenue is only for retail companies."],tip:"SaaS and high-growth tech are often valued on EV/Revenue.",difficulty:3},
  {id:165,cat:'tech',sub:'valuation',q:"What is the difference between levered and unlevered free cash flow?",a:"Unlevered FCF = cash flow to all investors (before debt payments), discounted at WACC. Levered FCF = cash flow to equity only (after debt payments), discounted at cost of equity.",wrong:["They are the same number.","Levered FCF is always higher.","Unlevered FCF subtracts all interest and debt repayments."],tip:"Use unlevered FCF for enterprise value (most common in IB); levered FCF for equity value directly.",difficulty:2},
  {id:166,cat:'tech',sub:'valuation',q:"What is a sensitivity analysis in a DCF?",a:"A sensitivity analysis tests how changes in key assumptions (WACC, terminal growth, revenue growth, margins) impact valuation. Typically shown as a data table.",wrong:["It finds the single correct valuation.","It only tests one variable.","Sensitivity analysis is optional and not used in practice."],tip:"The classic DCF output is a WACC vs. terminal growth rate sensitivity table.",difficulty:2},
  {id:167,cat:'tech',sub:'valuation',q:"Why might you choose a 10-year projection period instead of 5?",a:"A longer period suits high-growth companies that need more time to reach steady state. A 5-year period works for mature, stable businesses.",wrong:["Always use 10 years because it\u2019s more accurate.","The projection period doesn\u2019t matter since TV dominates.","5-year projections are never acceptable."],tip:"Longer projections reduce terminal value\u2019s share but require more assumptions.",difficulty:3},
  {id:168,cat:'tech',sub:'valuation',q:"What is the difference between trailing and forward multiples?",a:"Trailing multiples use historical (LTM) financials; forward multiples use projected (NTM) financials. Forward multiples are generally preferred.",wrong:["They always give the same result.","Trailing multiples use next year\u2019s numbers.","Forward multiples are less commonly used."],tip:"In IB pitch books, forward multiples (NTM) are standard.",difficulty:2},
  {id:169,cat:'tech',sub:'valuation',q:"What adjustments might you make to EBITDA?",a:"Remove non-recurring charges (restructuring, litigation), add back stock-based comp, normalize owner compensation (private cos), and adjust for one-time items to get \u2018adjusted EBITDA.\u2019",wrong:["EBITDA should never be adjusted.","Only adjust for D&A.","Adjustments are only for public companies."],tip:"Adjusted EBITDA can significantly differ from reported \u2014 always understand what\u2019s being adjusted.",difficulty:3},
  {id:170,cat:'tech',sub:'valuation',q:"How do you select comparable companies?",a:"Select peers based on: same industry/sector, similar business model, comparable size, similar growth rates, geographic overlap, and comparable margin profiles. Typically 5-10 peers.",wrong:["Just pick the 5 largest companies in the country.","Only market cap matters.","Use any companies with the same P/E ratio."],tip:"A bad comp set ruins the analysis. Justify your selections.",difficulty:2},
  {id:171,cat:'tech',sub:'valuation',q:"What is a football field chart?",a:"A horizontal bar chart showing valuation ranges from different methods (DCF, comps, precedent transactions, LBO). It displays where ranges overlap to determine a fair value range.",wrong:["A chart for sports investments.","It only shows DCF output.","An SEC-required document."],tip:"The football field is a key page in every IB pitch book.",difficulty:1},
  {id:172,cat:'tech',sub:'valuation',q:"Why do we subtract cash when calculating enterprise value?",a:"Cash reduces the effective acquisition cost. When a buyer purchases a company, they get the cash, offsetting the price. EV represents the net price of operations.",wrong:["Cash is added because more cash means more value.","Cash isn\u2019t part of the EV calculation.","Cash is a liability."],tip:"Think of buying a house with $50k in a safe inside \u2014 the net cost is the price minus $50k.",difficulty:1},
  {id:173,cat:'tech',sub:'valuation',q:"What is the difference between equity value multiples and enterprise value multiples?",a:"Equity multiples (P/E, P/Book) use metrics after debt. EV multiples (EV/EBITDA, EV/Revenue) use metrics for all capital providers. You must match numerator to denominator.",wrong:["They are interchangeable.","EV multiples only apply to private companies.","Equity multiples already account for debt."],tip:"Golden rule: never divide equity value by an unlevered metric, or EV by a levered metric.",difficulty:2},
  {id:174,cat:'tech',sub:'valuation',q:"What is an LBO floor valuation?",a:"An LBO floor estimates the minimum price a PE firm would pay, based on target returns (20-25% IRR). It sets a floor because if the company can support leverage at that price, it has at least that much value.",wrong:["It\u2019s the maximum a strategic buyer would pay.","It\u2019s the liquidation value of assets.","LBO floor is always higher than DCF."],tip:"LBO floor is usually the lowest valuation method.",difficulty:3},

  // ══════════════════════════════════════
  // TECHNICAL — LBO (35 questions, id 175-209)
  // ══════════════════════════════════════

  {id:175,cat:'tech',sub:'lbo',q:"What is a leveraged buyout (LBO)?",a:"An LBO is the acquisition of a company using a significant amount of borrowed money (debt/leverage), with the target\u2019s assets and cash flows often serving as collateral.",wrong:["It\u2019s when a company buys back its own stock.","It\u2019s any merger between two public companies.","It\u2019s a government-backed loan for small businesses."],tip:"PE firms typically use 60-70% debt financing in an LBO.",difficulty:1},
  {id:176,cat:'tech',sub:'lbo',q:"What are the key characteristics of a good LBO candidate?",a:"Strong, predictable cash flows; low CapEx requirements; market-leading position; potential for operational improvements; defensible margins; low cyclicality; strong management.",wrong:["High-growth, unprofitable tech startups.","Companies with very cyclical revenue and thin margins.","Any company with a very high stock price."],tip:"Cash flow stability is #1 \u2014 the company must service heavy debt loads.",difficulty:1},
  {id:177,cat:'tech',sub:'lbo',q:"What are the main sources of returns in an LBO?",a:"(1) Debt paydown using company cash flows, (2) EBITDA/earnings growth, (3) Multiple expansion. Typically about 1/3 each.",wrong:["Returns come only from increasing the stock price.","The only source is cost-cutting.","Returns depend entirely on interest rates."],tip:"In LBO modeling interviews, you must quantify each source of value creation.",difficulty:1},
  {id:178,cat:'tech',sub:'lbo',q:"What is the typical holding period for an LBO investment?",a:"Typically 3-7 years, with 5 years being the most common assumption in models.",wrong:["LBO firms hold for 20+ years.","The typical period is less than 1 year.","It varies from 1 month to 50 years."],tip:"Most PE fund lifespans are 10 years, with exits in years 3-7.",difficulty:1},
  {id:179,cat:'tech',sub:'lbo',q:"How do you calculate internal rate of return (IRR)?",a:"IRR is the discount rate at which NPV of all cash flows equals zero. In an LBO, it\u2019s the annualized return from initial equity investment to exit equity value.",wrong:["IRR = total profit divided by initial investment.","IRR is the same as WACC.","Divide exit equity by entry equity."],tip:"PE firms target 20-25%+ IRR. Doubling money in 3 years \u2248 26% IRR; in 5 years \u2248 15% IRR.",difficulty:1},
  {id:180,cat:'tech',sub:'lbo',q:"What is the difference between IRR and MOIC?",a:"IRR is the annualized percentage return (time-weighted). MOIC is total cash returned / total cash invested (e.g., 3.0x = tripled your money). Same MOIC over different periods gives different IRRs.",wrong:["They are the same metric.","MOIC is always higher than IRR.","MOIC accounts for time value of money."],tip:"A 3.0x MOIC in 3 years \u2248 44% IRR, but in 7 years \u2248 17% IRR.",difficulty:2},
  {id:181,cat:'tech',sub:'lbo',q:"What types of debt are typically used in an LBO?",a:"Senior secured debt (revolver, term loans), subordinated/mezzanine debt, high-yield bonds, and sometimes seller financing. Senior debt has lowest cost but strictest covenants.",wrong:["Only one type of bank loan.","LBOs use equity, not debt.","Government bonds are the primary source."],tip:"The debt is layered like a capital stack \u2014 senior at the top, equity at the bottom.",difficulty:2},
  {id:182,cat:'tech',sub:'lbo',q:"What is a revolving credit facility (revolver)?",a:"A revolver is a line of credit that can be drawn and repaid as needed, like a corporate credit card. Used for short-term working capital needs; sits at the top of the debt stack.",wrong:["It\u2019s a term loan with fixed repayment.","It\u2019s always fully drawn at closing.","A revolver is equity disguised as debt."],tip:"Model the revolver as a \u2018plug\u2019 \u2014 it flexes to cover cash shortfalls.",difficulty:2},
  {id:183,cat:'tech',sub:'lbo',q:"What is a debt covenant?",a:"Contractual restrictions from lenders. Maintenance covenants require ongoing ratio compliance (e.g., Debt/EBITDA < 5x). Incurrence covenants only apply when the company takes specific actions.",wrong:["Covenants are optional guidelines.","They only apply to equity investors.","Covenants are penalties paid in bankruptcy."],tip:"Covenant-lite (cov-lite) deals have fewer restrictions \u2014 increasingly common.",difficulty:2},
  {id:184,cat:'tech',sub:'lbo',q:"What is a dividend recapitalization?",a:"A dividend recap is when the PE-owned company issues additional debt to pay a special dividend to the PE sponsor. It allows extracting returns without selling the company.",wrong:["It\u2019s when a company reinvests dividends into new shares.","It\u2019s converting debt into equity.","It means stopping dividends entirely."],tip:"Dividend recaps allow sponsors to reduce cash-at-risk and boost IRR/MOIC.",difficulty:3},
  {id:185,cat:'tech',sub:'lbo',q:"Walk me through the basic mechanics of an LBO model.",a:"(1) Set purchase price and sources/uses. (2) Project revenue, EBITDA, FCF. (3) Model debt paydown. (4) Calculate exit EV (exit EBITDA \u00d7 exit multiple). (5) Subtract remaining debt for exit equity. (6) Calculate IRR and MOIC.",wrong:["Build a DCF and discount at WACC.","Only model the income statement.","An LBO model only has two steps: buy and sell."],tip:"The sources & uses table is the foundation \u2014 it must balance exactly.",difficulty:1},
  {id:186,cat:'tech',sub:'lbo',q:"What does the sources and uses table show?",a:"Sources show where money comes from (senior debt, mezz, equity). Uses show where it goes (purchase equity, refinance existing debt, fees). Total sources must equal total uses.",wrong:["It only shows the debt used.","Sources show revenue and uses show expenses.","It\u2019s optional in LBO models."],tip:"Always start your LBO model with sources & uses. If it doesn\u2019t balance, something is wrong.",difficulty:1},
  {id:187,cat:'tech',sub:'lbo',q:"How does leverage amplify returns in an LBO?",a:"By using debt to fund most of the purchase, the PE firm puts up less equity. If value increases, the gain accrues entirely to equity holders while debt stays fixed. Leverage also amplifies losses.",wrong:["Leverage has no impact on returns.","More debt always means higher returns with no added risk.","Leverage only benefits debt holders."],tip:"Buy for $100, use $70 debt/$30 equity. Sell for $120. Equity gain = $20/$30 = 67% vs. 20% unlevered.",difficulty:2},
  {id:188,cat:'tech',sub:'lbo',q:"What is the difference between senior debt and subordinated debt?",a:"Senior debt has repayment priority (lower risk, lower rate, stricter covenants). Subordinated/mezzanine debt is repaid after senior (higher risk, higher rate). In bankruptcy, senior lenders are paid first.",wrong:["No difference in repayment priority.","Sub debt has lower interest rates.","Senior debt is always unsecured."],tip:"Capital stack: Senior secured \u2192 Senior unsecured \u2192 Sub/Mezz \u2192 Equity.",difficulty:2},
  {id:189,cat:'tech',sub:'lbo',q:"What is an exit strategy in an LBO?",a:"Common exits: (1) Sale to strategic buyer (highest price), (2) Secondary buyout (another PE firm), (3) IPO, (4) Dividend recapitalization (partial exit).",wrong:["PE firms never exit; they hold forever.","The only exit is an IPO.","Exit strategy is the bankruptcy plan."],tip:"Strategic sales typically command the highest multiple because of synergies.",difficulty:2},
  {id:190,cat:'tech',sub:'lbo',q:"What is the debt-to-EBITDA ratio (leverage ratio)?",a:"Debt/EBITDA measures how many years of EBITDA it would take to pay off all debt. Entry leverage is typically 4-6x; the goal is to reduce to 2-3x at exit.",wrong:["It\u2019s EBITDA divided by debt.","A higher ratio is always healthier.","It measures return on equity."],tip:"Banks set maximum leverage ratios as covenants. Exceeding them triggers default.",difficulty:1},
  {id:191,cat:'tech',sub:'lbo',q:"How does multiple expansion work in an LBO?",a:"Multiple expansion occurs when exit EV/EBITDA is higher than entry multiple (e.g., buying at 8x, selling at 10x). Can happen from improved growth, better margins, or market conditions.",wrong:["It means revenue multiplied over the period.","It only happens when rates go up.","It\u2019s guaranteed in every LBO."],tip:"Conservative models assume no multiple expansion \u2014 returns should work at constant multiples.",difficulty:2},
  {id:192,cat:'tech',sub:'lbo',q:"What is a management rollover in an LBO?",a:"When existing management reinvests (rolls over) a portion of their equity into the new transaction alongside the PE firm. This aligns incentives and reduces the PE firm\u2019s equity check.",wrong:["It\u2019s when the PE firm replaces the entire management team.","Management loans money to the PE firm.","Replacing the CEO every few years."],tip:"Rollover is typically 10-30% of management\u2019s existing stake.",difficulty:3},
  {id:193,cat:'tech',sub:'lbo',q:"What is a credit facility?",a:"A lending agreement between a company and one or more financial institutions. It can include revolving credit lines, term loans, and letters of credit. In LBOs, it provides the bulk of senior financing.",wrong:["A building where banks store cash.","Another term for equity.","It can only be used once and not renewed."],tip:"Credit facilities are negotiated pre-closing with detailed terms and covenants.",difficulty:1},
  {id:194,cat:'tech',sub:'lbo',q:"What is PIK (payment-in-kind) interest?",a:"PIK interest is accrued interest added to the principal balance of debt rather than paid in cash. It conserves cash but increases total debt burden over time.",wrong:["PIK interest is paid immediately in cash.","It reduces the principal balance.","PIK means the lender forgives the interest."],tip:"PIK toggle notes give the option to pay cash or PIK \u2014 flexibility at a higher rate.",difficulty:3},
  {id:195,cat:'tech',sub:'lbo',q:"What happens if an LBO company cannot service its debt?",a:"It defaults. Lenders can accelerate the debt, negotiate restructuring, or force bankruptcy. Equity holders (PE firm) can lose their entire investment as debt holders have priority.",wrong:["The PE firm can ignore debt obligations.","Default has no consequences.","The government will bail out the PE firm."],tip:"This is the key LBO risk \u2014 excessive leverage can wipe out equity if cash flows decline.",difficulty:2},
  {id:196,cat:'tech',sub:'lbo',q:"What is the interest coverage ratio?",a:"Interest Coverage = EBITDA / Interest Expense. Measures how easily a company can pay interest from operating earnings. Higher is better. Lenders require minimum 2.0x.",wrong:["It\u2019s the interest rate on the company\u2019s debt.","It\u2019s Net Income divided by Total Debt.","A lower ratio is preferred by lenders."],tip:"Below 1.0x means the company can\u2019t cover interest from operations \u2014 major red flag.",difficulty:2},
  {id:197,cat:'tech',sub:'lbo',q:"How do you calculate the equity contribution in an LBO?",a:"Equity = Purchase price + transaction fees + financing fees \u2013 total debt raised. It\u2019s the residual. Typically 30-40% of total deal value.",wrong:["Equity contribution equals total debt raised.","It\u2019s always exactly 50%.","EBITDA times the leverage ratio."],tip:"Lower equity contribution \u2192 higher leverage \u2192 higher potential IRR but more risk.",difficulty:2},
  {id:198,cat:'tech',sub:'lbo',q:"What is an add-on acquisition in PE?",a:"An add-on (bolt-on) is when a PE portfolio company acquires a smaller company for synergies, geographic expansion, or product extension. It\u2019s a buy-and-build strategy.",wrong:["Buying an additional stake in a public company.","Adding more debt to an existing investment.","Add-ons are only done during exit."],tip:"Add-ons are often bought at lower multiples, creating arbitrage value.",difficulty:2},
  {id:199,cat:'tech',sub:'lbo',q:"What is the difference between a term loan A (TLA) and term loan B (TLB)?",a:"TLA has scheduled amortization (gradual repayment, 5-7 years) and lower rates. TLB is mostly bullet repayment (at maturity, 7 years) with minimal amortization (1%/year) and higher rates.",wrong:["There is no difference.","TLA has higher rates than TLB.","TLB is repaid first."],tip:"TLBs are more common in LBOs because they preserve cash flow.",difficulty:3},
  {id:200,cat:'tech',sub:'lbo',q:"How does a PE firm typically add value to a portfolio company?",a:"Operational improvements, revenue growth, management upgrades, strategic add-on acquisitions, working capital optimization, and governance improvements.",wrong:["They only cut costs and fire employees.","PE firms provide no value.","Value creation comes exclusively from leverage."],tip:"Value creation plans are central to PE deal theses \u2014 must go beyond just debt paydown.",difficulty:1},
  {id:201,cat:'tech',sub:'lbo',q:"What is a paper LBO?",a:"A simplified LBO analysis done by hand during an interview. You estimate purchase price, debt structure, project cash flows, calculate exit value, and derive IRR/MOIC with simple math.",wrong:["A written exam about LBO theory.","An LBO involving a paper company.","A legal document signed at closing."],tip:"Practice paper LBOs until you can do them in 10-15 minutes.",difficulty:2},
  {id:202,cat:'tech',sub:'lbo',q:"What is the cash-on-cash return (MOIC)?",a:"MOIC = Exit equity value / Initial equity invested. E.g., invest $100M, receive $300M = 3.0x.",wrong:["It\u2019s the same as IRR.","It\u2019s total revenue during the holding period.","It\u2019s operating cash flow yield."],tip:"MOIC doesn\u2019t consider timing \u2014 3.0x in 3 years is much better than 3.0x in 10 years.",difficulty:1},
  {id:203,cat:'tech',sub:'lbo',q:"Why do PE firms use leverage instead of all equity?",a:"Leverage amplifies returns because: (1) less equity at risk, (2) interest is tax-deductible (tax shield), (3) debt repayment using company CF creates forced value creation.",wrong:["Because equity investors won\u2019t invest in PE.","Leverage reduces risk.","Banks force them to borrow."],tip:"The tax shield alone can add significant value \u2014 interest reduces taxable income.",difficulty:1},
  {id:204,cat:'tech',sub:'lbo',q:"What is a recapitalization?",a:"A restructuring of a company\u2019s debt-to-equity ratio. In PE, this often means adding debt to pay equity (dividend recap) or refinancing debt at better terms.",wrong:["Issuing new shares for the first time.","It only happens during an IPO.","Recapitalization means bankruptcy."],tip:"Recaps can improve returns by returning capital early, boosting IRR.",difficulty:2},
  {id:205,cat:'tech',sub:'lbo',q:"What is EBITDA-to-free-cash-flow conversion?",a:"The percentage of EBITDA that becomes FCF after taxes, CapEx, working capital changes, etc. A higher conversion rate (60-70%+) indicates better cash generation and debt serviceability.",wrong:["Always 100% since EBITDA equals cash flow.","Conversion rate doesn\u2019t matter in LBO analysis.","It\u2019s net income divided by EBITDA."],tip:"High conversion is a hallmark of strong LBO candidates \u2014 look for asset-light businesses.",difficulty:3},
  {id:206,cat:'tech',sub:'lbo',q:"What is a public-to-private transaction?",a:"A P2P transaction is when a PE firm acquires all outstanding shares of a public company, delists it, and takes it private. Requires a premium over the current share price.",wrong:["A private company going public via IPO.","Moving headquarters from public to private space.","P2P only happens in developing countries."],tip:"P2P deals require a tender offer and typically a 20-40% premium over market.",difficulty:2},
  {id:207,cat:'tech',sub:'lbo',q:"How does working capital affect an LBO model?",a:"NWC changes directly impact FCF. An increase consumes cash (negative for debt paydown); a decrease releases cash (positive). Companies with negative NWC cycles are ideal LBO candidates.",wrong:["Working capital has no impact on LBO returns.","Only inventory matters.","Working capital is only relevant for year 1."],tip:"Model NWC as a percentage of revenue \u2014 small changes significantly impact FCF and IRR.",difficulty:3},
  {id:208,cat:'tech',sub:'lbo',q:"What is a club deal?",a:"When multiple PE firms jointly invest in an LBO, sharing equity, risk, and returns. Allows firms to pursue larger transactions than a single fund could handle.",wrong:["An investment in nightclub businesses.","A company with a loyalty program.","Club deals are illegal under antitrust laws."],tip:"Club deals became controversial after 2008 due to concerns about PE collusion on bid prices.",difficulty:3},
  {id:209,cat:'tech',sub:'lbo',q:"What is the difference between a platform investment and a bolt-on?",a:"A platform is the PE firm\u2019s initial, larger acquisition that serves as the foundation. Bolt-ons are smaller companies acquired by the platform for scale, new markets, or capabilities.",wrong:["They are the same thing.","A bolt-on is always larger than the platform.","Platform investments are only in tech."],tip:"Buy-and-build: acquire platform at fair multiple, do bolt-ons at lower multiples.",difficulty:2},

  // ══════════════════════════════════════
  // TECHNICAL — M&A (30 questions, id 210-239)
  // ══════════════════════════════════════

  {id:210,cat:'tech',sub:'ma',q:"What is a merger vs. an acquisition?",a:"A merger combines two companies into one new entity. An acquisition is when one company buys another. In practice, most \u2018mergers\u2019 are actually acquisitions where one party has control.",wrong:["They are exactly the same thing.","A merger always involves three+ companies.","An acquisition means only buying a minority stake."],tip:"In IB, the terms are often used interchangeably, but know the technical distinction.",difficulty:1},
  {id:211,cat:'tech',sub:'ma',q:"What are the main types of M&A buyers?",a:"Strategic buyers (same/related industry, seek synergies) and financial buyers (PE firms, seek financial returns). Strategic buyers typically pay more due to synergies.",wrong:["All buyers are the same.","Only banks can be M&A buyers.","Financial buyers always pay more."],tip:"Strategic buyers justify higher prices because synergies offset the premium.",difficulty:1},
  {id:212,cat:'tech',sub:'ma',q:"What are synergies in M&A?",a:"Additional value from combining two companies. Revenue synergies: cross-selling, market expansion. Cost synergies: eliminating duplicates, economies of scale. Cost synergies are more reliable and valued more highly.",wrong:["Synergies are the IB advisory fees.","They always materialize as projected.","Revenue synergies are easier to achieve."],tip:"Rule of thumb: cost synergies valued at 75-100% probability; revenue synergies at 25-50%.",difficulty:1},
  {id:213,cat:'tech',sub:'ma',q:"What is accretion/dilution analysis?",a:"Determines whether an M&A transaction will increase (accrete) or decrease (dilute) the acquirer\u2019s EPS. If the target\u2019s P/E is lower than the acquirer\u2019s, the deal is typically accretive.",wrong:["It measures whether the target\u2019s revenue changes.","It only applies to stock-for-stock deals.","Accretion means the deal destroys value."],tip:"Quick test: acquirer P/E > target P/E in a stock deal \u2192 likely accretive.",difficulty:2},
  {id:214,cat:'tech',sub:'ma',q:"How do you determine the purchase price in an acquisition?",a:"Through multiple valuation methods: comps, precedent transactions, DCF, and LBO analysis. Also considers strategic value, synergies, competitive dynamics, and negotiating leverage.",wrong:["Just offer book value of assets.","The current stock price is always the purchase price.","Only one valuation method is used."],tip:"The price typically falls within the range from the football field chart.",difficulty:1},
  {id:215,cat:'tech',sub:'ma',q:"What is a stock deal vs. a cash deal in M&A?",a:"Cash deal: acquirer pays with cash (may need debt financing). Stock deal: acquirer issues new shares to target shareholders. Cash is cleaner; stock avoids cash outlay but dilutes shareholders.",wrong:["No practical difference.","Cash deals always need more regulatory approval.","Stock deals aren\u2019t allowed for public companies."],tip:"Overvalued stock \u2192 prefer stock deal; undervalued \u2192 prefer cash deal.",difficulty:2},
  {id:216,cat:'tech',sub:'ma',q:"What is goodwill created in an acquisition?",a:"Goodwill = Purchase Price \u2013 Fair Market Value of Net Identifiable Assets. It represents the premium paid, reflecting brand value, customer relationships, and expected synergies.",wrong:["Goodwill equals the target\u2019s book value.","Goodwill decreases with a higher price.","It\u2019s the profit made on the deal at closing."],tip:"If goodwill becomes impaired, it must be written down \u2014 a non-cash IS charge.",difficulty:2},
  {id:217,cat:'tech',sub:'ma',q:"What is the difference between a hostile and a friendly acquisition?",a:"Friendly: negotiated and board-approved. Hostile: bypasses the board via tender offer to shareholders or proxy fight. Hostile deals require a higher premium.",wrong:["There is no such thing as hostile acquisitions.","Hostile acquisitions are illegal.","Friendly acquisitions always have a lower price."],tip:"Know common defenses: poison pills, staggered boards, white knights.",difficulty:2},
  {id:218,cat:'tech',sub:'ma',q:"What is a tender offer?",a:"A public bid made directly to shareholders to buy their shares at a premium. It can be used in both friendly and hostile acquisitions.",wrong:["An offer to buy a company\u2019s debt.","It\u2019s the same as an IPO.","Tender offers can only be used in friendly deals."],tip:"Tender offers bypass the board and go straight to shareholders.",difficulty:2},
  {id:219,cat:'tech',sub:'ma',q:"What is a poison pill (shareholder rights plan)?",a:"An anti-takeover defense that lets existing shareholders buy additional shares at a discount if an unwanted acquirer reaches a certain ownership threshold. This dilutes the hostile bidder\u2019s stake.",wrong:["A clause forcing the company to accept any takeover.","A payment to the hostile bidder to go away.","Poison pills are illegal."],tip:"Poison pills force the acquirer to negotiate with the board rather than go hostile.",difficulty:3},
  {id:220,cat:'tech',sub:'ma',q:"What is due diligence in M&A?",a:"Comprehensive investigation of the target: financials (audits, QoE), legal (contracts, litigation), tax, commercial (market, customers), and operational areas.",wrong:["A quick glance at the annual report.","Due diligence is only done by the target.","It only covers financial statements."],tip:"Quality of earnings (QoE) reports are critical \u2014 they adjust EBITDA for non-recurring items.",difficulty:1},
  {id:221,cat:'tech',sub:'ma',q:"What is a definitive agreement in M&A?",a:"The legally binding contract between acquirer and target that sets all terms: price, structure, reps & warranties, closing conditions, termination provisions, and breakup fees.",wrong:["It\u2019s the initial non-binding letter of interest.","It\u2019s filed only with the SEC.","It can be changed at any time without consequences."],tip:"The merger agreement is the culmination of negotiation \u2014 every word matters legally.",difficulty:2},
  {id:222,cat:'tech',sub:'ma',q:"What is a breakup fee (termination fee)?",a:"A penalty (typically 1-3% of deal value) paid by the target if it walks away (e.g., accepts a competing offer). Reverse breakup fees protect the target if the acquirer can\u2019t close.",wrong:["The fee paid to investment banks.","Always 50% of deal value.","Paid regardless of whether the deal closes."],tip:"Breakup fees balance commitment with flexibility.",difficulty:2},
  {id:223,cat:'tech',sub:'ma',q:"What is an exchange ratio in a stock-for-stock merger?",a:"The number of acquirer shares each target shareholder receives. E.g., 0.5x ratio means each target share converts into 0.5 acquirer shares.",wrong:["It\u2019s the ratio of debt to equity in the deal.","Exchange ratios are only for international M&A.","It\u2019s target shares divided by acquirer shares."],tip:"Fixed exchange ratio locks the ratio; floating adjusts based on stock price changes.",difficulty:3},
  {id:224,cat:'tech',sub:'ma',q:"What are the main steps in a sell-side M&A process?",a:"(1) Hire IB, (2) prepare CIM, (3) contact potential buyers, (4) receive IOIs, (5) management presentations, (6) receive final bids, (7) negotiate with top bidders, (8) sign definitive agreement, (9) close.",wrong:["The company just lists itself for sale online.","Only one step: the board votes.","The process starts with due diligence."],tip:"This process takes 6-12 months. Analysts spend heavily on the CIM.",difficulty:2},
  {id:225,cat:'tech',sub:'ma',q:"What is a CIM (Confidential Information Memorandum)?",a:"A detailed marketing document describing the target\u2019s business, financials, growth prospects, and investment highlights. Shared with potential buyers who signed an NDA.",wrong:["It\u2019s a public SEC filing.","It\u2019s a one-page summary.","CIMs are only for IPOs."],tip:"Creating the CIM is one of the most time-intensive tasks for junior analysts.",difficulty:1},
  {id:226,cat:'tech',sub:'ma',q:"What is a fairness opinion?",a:"A professional assessment by an IB that states whether the transaction price is fair to shareholders from a financial point of view. Helps the board fulfill its fiduciary duty.",wrong:["A legal ruling by a judge.","It guarantees shareholder profit.","Required by law in every M&A deal."],tip:"Fairness opinions protect boards from lawsuits.",difficulty:2},
  {id:227,cat:'tech',sub:'ma',q:"What is the difference between a vertical and horizontal merger?",a:"Horizontal: same industry, same stage of production (e.g., two banks). Vertical: different stages of the supply chain (e.g., manufacturer acquires distributor).",wrong:["Horizontal mergers are always larger.","Vertical mergers combine unrelated industries.","No practical difference."],tip:"Third type: conglomerate merger \u2014 unrelated industries (less common today).",difficulty:1},
  {id:228,cat:'tech',sub:'ma',q:"Why might an acquirer prefer to pay with stock instead of cash?",a:"Stock conserves cash, shares the risk of overpaying, avoids acquisition debt, and is advantageous when the acquirer believes its stock is overvalued.",wrong:["Stock is always cheaper than cash.","No advantage to paying with stock.","Stock is only possible for private companies."],tip:"Acquirers using overvalued stock to buy are making a smart trade.",difficulty:2},
  {id:229,cat:'tech',sub:'ma',q:"What regulatory approvals are needed for M&A deals?",a:"Antitrust (DOJ/FTC in US, EC in Europe), Hart-Scott-Rodino filing (above threshold), CFIUS review for foreign acquirers of US companies, and industry-specific regulators.",wrong:["No approvals are needed.","Only the SEC needs to approve.","Only required for international deals."],tip:"Antitrust risk can kill deals \u2014 DOJ/FTC reviews are mandatory above ~$110M.",difficulty:2},
  {id:230,cat:'tech',sub:'ma',q:"What is a material adverse change (MAC) clause?",a:"A clause allowing the acquirer to walk away if the target experiences a significant negative change (e.g., financial deterioration) between signing and closing.",wrong:["It forces the deal to close regardless.","MAC clauses only apply after close.","It protects the target, not the acquirer."],tip:"Courts generally interpret MAC clauses narrowly \u2014 hard to invoke.",difficulty:3},
  {id:231,cat:'tech',sub:'ma',q:"What is a reverse merger?",a:"A private company acquires a public shell company to become publicly traded without a traditional IPO. Faster and cheaper but carries stigma and scrutiny.",wrong:["A large company acquires a smaller one.","Undoing a completed merger.","The same as a hostile takeover."],tip:"Many Chinese companies used reverse mergers to list in the US, attracting regulatory attention.",difficulty:3},
  {id:232,cat:'tech',sub:'ma',q:"What is a white knight?",a:"A friendly acquirer that a target seeks out to make a competing bid against a hostile acquirer. Preferred because it offers better terms or is a more desirable partner.",wrong:["It\u2019s the hostile acquirer.","A legal term for SEC involvement.","Someone who invests in the acquirer, not the target."],tip:"Other defenses: white squire (buys large minority stake), pac-man defense (target bids for acquirer).",difficulty:3},
  {id:233,cat:'tech',sub:'ma',q:"What is the role of an investment bank in M&A?",a:"Sell-side: prepare materials, identify buyers, manage process, negotiate, provide fairness opinion. Buy-side: identify targets, perform valuation/DD, advise on bid strategy, arrange financing.",wrong:["Banks only provide loans for M&A.","Investment banks aren\u2019t involved in M&A.","Banks only work sell-side."],tip:"M&A advisory is the highest-profile IB activity. Fees are 1-2% of deal value.",difficulty:1},
  {id:234,cat:'tech',sub:'ma',q:"What is a leveraged recapitalization as an M&A defense?",a:"A target takes on significant debt to pay a special dividend or buy back shares, making itself less attractive to a hostile acquirer by increasing leverage and reducing borrowing capacity.",wrong:["It\u2019s the same as an LBO.","It makes the company more attractive to acquirers.","It involves issuing new equity."],tip:"It\u2019s a \u2018scorched earth\u2019 defense \u2014 makes the target harder to finance.",difficulty:3},
  {id:235,cat:'tech',sub:'ma',q:"When would a deal be accretive to the acquirer?",a:"When the target\u2019s earnings yield exceeds the acquirer\u2019s cost of financing. In an all-stock deal, this means buying at a lower P/E. In a cash deal, the target\u2019s earnings yield exceeds after-tax cost of debt.",wrong:["Whenever the target is profitable.","Accretion doesn\u2019t depend on financing.","Always accretive if synergies are expected."],tip:"Acquirer P/E 20x buying target at P/E 10x with stock \u2192 accretive.",difficulty:3},
  {id:236,cat:'tech',sub:'ma',q:"What is an earn-out in an acquisition?",a:"A contingent portion of the purchase price based on the target achieving performance milestones (e.g., revenue/EBITDA targets) after closing. Bridges valuation gaps between buyer and seller.",wrong:["The total profit from the acquisition.","Earn-outs are paid upfront at closing.","The acquirer earning back its investment via dividends."],tip:"Earn-outs are common for private companies, especially founder-led businesses.",difficulty:2},
  {id:237,cat:'tech',sub:'ma',q:"What is a go-shop period?",a:"A window (typically 30-60 days) after signing where the target can actively solicit competing bids. If a better offer emerges, the target can terminate with a reduced breakup fee.",wrong:["When the acquirer shops for financing.","It occurs before any agreement.","Go-shops are mandatory in all deals."],tip:"Go-shops help boards demonstrate they sought the best price for shareholders.",difficulty:3},
  {id:238,cat:'tech',sub:'ma',q:"What is purchase price allocation (PPA)?",a:"Allocating the purchase price across the target\u2019s identifiable tangible assets, intangible assets (brand, technology), and liabilities at fair values. The residual becomes goodwill.",wrong:["How the price is split between cash and stock.","PPA only applies to goodwill.","It\u2019s the same as the sources and uses table."],tip:"PPA matters because identified intangible assets (and their amortization) affect future earnings.",difficulty:3},
  {id:239,cat:'tech',sub:'ma',q:"What is a no-shop clause?",a:"Prohibits the target from soliciting competing bids after signing. Protects the acquirer but typically includes a fiduciary out for unsolicited superior proposals.",wrong:["It means the deal can\u2019t be discussed publicly.","No-shop clauses prevent closing.","It prohibits the acquirer from pursuing other deals."],tip:"No-shop with a fiduciary out is standard \u2014 the board must fulfill its duties.",difficulty:3},

  // ══════════════════════════════════════
  // BRAIN TEASERS (25 questions, id 240-264)
  // ══════════════════════════════════════

  {id:240,cat:'brain',q:"How many golf balls fit in a school bus?",a:"A school bus interior is about 500,000 cubic inches. A golf ball is ~2.5 cubic inches. With ~65% packing efficiency: roughly 130,000. (Acceptable range: 100,000-500,000 depending on assumptions.)",wrong:["Exactly 1,000.","About 50 \u2013 one for each seat.","Over 10 million."],tip:"The exact number matters less than your structured approach. State assumptions clearly.",difficulty:2},
  {id:241,cat:'brain',q:"You have 8 balls, one is heavier. You have a balance scale. What is the minimum number of weighings?",a:"2 weighings. Split into groups of 3, 3, and 2. Weigh the two groups of 3: if balanced, the heavy ball is in the group of 2 (one more weighing). If unbalanced, take the heavier group of 3, weigh 1 vs 1.",wrong:["7 weighings (compare each pair).","1 weighing is always enough.","4 weighings minimum."],tip:"Think about what information each weighing gives you. Eliminate groups, not individuals.",difficulty:2},
  {id:242,cat:'brain',q:"If you flip a fair coin until you get heads, what is the expected number of flips?",a:"2 flips. This is a geometric distribution with p = 0.5. Expected value = 1/p = 1/0.5 = 2.",wrong:["1 flip, because there\u2019s a 50% chance each time.","10 flips on average.","It\u2019s impossible to calculate."],tip:"The formula E = 1/p applies to any geometric distribution. For p=0.5, E=2.",difficulty:2},
  {id:243,cat:'brain',q:"How would you estimate the number of gas stations in the United States?",a:"~330M people, ~200M drivers, each fills up ~weekly. A station serves ~250 cars/day. 200M/week \u00f7 7 = ~29M/day. 29M \u00f7 250 \u2248 ~115,000 stations. (Actual: ~150,000.)",wrong:["About 1,000.","Over 5 million.","Exactly 50,000."],tip:"Start with population, estimate demand, then supply. Walk through step by step.",difficulty:2},
  {id:244,cat:'brain',q:"What is the sum of numbers from 1 to 100?",a:"5,050. Formula: n(n+1)/2 = 100 \u00d7 101 / 2 = 5,050. (Gauss trick: 50 pairs of 101.)",wrong:["10,000.","1,000.","5,000."],tip:"Know this formula: n(n+1)/2. It appears in many variations.",difficulty:1},
  {id:245,cat:'brain',q:"A stock drops 20% on Monday and rises 20% on Tuesday. Is it back to its original price?",a:"No. $100 \u2192 $80 (\u221220%) \u2192 $96 (+20%). The stock is down 4%. Equal percentage gains and losses are not symmetric.",wrong:["Yes, it returns exactly to original price.","It would be above original due to compounding.","It depends on the starting price."],tip:"A loss requires a larger percentage gain to recover (20% loss needs 25% gain).",difficulty:1},
  {id:246,cat:'brain',q:"How many piano tuners are there in Chicago?",a:"~1M households, ~5% have pianos = 50,000 pianos. Tuned 1-2x/year = ~75,000 tunings. A tuner does ~1,000/year. 75,000 \u00f7 1,000 = ~75 tuners.",wrong:["Over 10,000.","Exactly 10.","About 5,000."],tip:"Classic Fermi estimation. Estimate demand then supply.",difficulty:2},
  {id:247,cat:'brain',q:"You have two ropes that each take 1 hour to burn at non-uniform rates. How do you measure 45 minutes?",a:"Light Rope 1 from both ends and Rope 2 from one end. When Rope 1 burns out (30 min), light the other end of Rope 2. It has 30 min left; burning from both ends = 15 min. Total: 45 min.",wrong:["Cut one rope into 3/4 length.","Burn both from one end and mark the 3/4 point.","Impossible with non-uniform burning."],tip:"Key insight: burning from both ends halves remaining time regardless of burn rate.",difficulty:3},
  {id:248,cat:'brain',q:"If you have $100 and win 10% then lose 10% repeatedly, what happens over time?",a:"You lose money. Each cycle: 1.10 \u00d7 0.90 = 0.99, a 1% loss per cycle. Your balance approaches zero over time. This is volatility drag.",wrong:["You stay at $100 forever.","You slowly gain money.","It depends on which comes first."],tip:"Symmetrical percentage swings are not actually symmetric \u2014 same concept as the 20/20 question.",difficulty:2},
  {id:249,cat:'brain',q:"How would you estimate annual revenue of a busy Manhattan Starbucks?",a:"Open 14 hrs/day, ~40 customers/hr = 560/day. Average ticket $6. Daily: $3,360. Annual: ~$1.2M.",wrong:["About $50,000/year.","Over $100 million.","About $10 million."],tip:"Work from customer traffic and average spend. Show your math.",difficulty:2},
  {id:250,cat:'brain',q:"What is the probability of getting at least one 6 when rolling two dice?",a:"1 \u2013 P(no 6s) = 1 \u2013 (5/6)\u00b2 = 1 \u2013 25/36 = 11/36 \u2248 30.6%.",wrong:["Exactly 1/3 or 33%.","1/6 because each die has 1/6 chance.","2/6 = 1/3 by adding 1/6 + 1/6."],tip:"Use the complement: P(at least one) = 1 \u2013 P(none). Don\u2019t add probabilities directly.",difficulty:1},
  {id:251,cat:'brain',q:"How would you estimate the weight of the Statue of Liberty?",a:"Copper skin (~2.4mm thick, ~2,000 sq meters = ~50 tons) + iron/steel framework (~125 tons) = roughly 200-250 tons total. (Actual: ~225 tons.)",wrong:["About 10 pounds.","Over 1 million tons.","Exactly 1,000 tons."],tip:"Break it into components: copper skin, steel frame, and concrete pedestal.",difficulty:3},
  {id:252,cat:'brain',q:"A jar has 100 coins: 99 fair, 1 double-headed. You pick one randomly, flip it 5 times, all heads. Probability it\u2019s the double-headed coin?",a:"~24.4%. By Bayes\u2019: P(double|5H) = P(5H|double)\u00d7P(double) / P(5H) = (1)(1/100) / [(1/100)(1) + (99/100)(1/32)] = 32/131 \u2248 24.4%.",wrong:["Definitely 100%.","Still 1/100 since we picked randomly.","50% because we either have it or not."],tip:"This tests Bayesian reasoning. Five heads is strong evidence but not proof.",difficulty:3},
  {id:253,cat:'brain',q:"How many windows are in New York City?",a:"NYC has ~1M buildings. Average ~50 windows per building (mix of skyscrapers and brownstones). ~50 million windows. Including vehicles: 50-100 million total.",wrong:["About 1,000.","Exactly 1 billion.","About 500."],tip:"Segment: residential buildings, commercial, transportation. Estimate each.",difficulty:2},
  {id:254,cat:'brain',q:"If you roll a fair die, what is the expected number of rolls to see all six faces?",a:"14.7 rolls. Coupon collector\u2019s problem: sum of 6/(6-k) for k=0..5 = 6/6 + 6/5 + 6/4 + 6/3 + 6/2 + 6/1 = 14.7.",wrong:["Exactly 6 rolls.","About 36 rolls.","Impossible to calculate."],tip:"Formula: n \u00d7 H(n) where H(n) is the harmonic series sum.",difficulty:3},
  {id:255,cat:'brain',q:"How much does a Boeing 747 weigh?",a:"Empty weight ~178,000 kg (~392,000 lbs). Maximum takeoff weight ~412,000 kg (~910,000 lbs). Estimate: a large metal tube, 70m long \u2192 ~200 tons empty.",wrong:["About the same as a car (~2 tons).","Over 10 million pounds.","Approximately 5,000 pounds."],tip:"Anchor: a car weighs ~2 tons, a 747 is ~100-200 cars \u2192 200-400 tons.",difficulty:2},
  {id:256,cat:'brain',q:"What is 17 \u00d7 23 in your head?",a:"391. Method: 17 \u00d7 20 + 17 \u00d7 3 = 340 + 51 = 391. Or: (20\u20133)(20+3) = 400\u20139 = 391.",wrong:["351.","413.","371."],tip:"Mental math: break numbers into easier components or use difference of squares.",difficulty:1},
  {id:257,cat:'brain',q:"You are offered a bet: flip a coin, heads you win $2, tails you lose $1. Should you take it?",a:"Yes. EV = 0.5\u00d7$2 + 0.5\u00d7(\u2013$1) = +$0.50 per flip. Positive expected value \u2192 take the bet.",wrong:["No, because you could lose.","Expected value is zero.","Only if you flip exactly once."],tip:"Always calculate expected value for probability decisions. Positive EV \u2192 take the bet.",difficulty:1},
  {id:258,cat:'brain',q:"How many square feet of pizza is consumed in the US each year?",a:"330M people \u00d7 75% eat pizza \u00d7 40 occasions/year \u00d7 2 slices \u00d7 25 sq in/slice = ~500B sq in = ~3.5 billion sq ft.",wrong:["About 1,000 sq ft.","About 100 billion sq ft.","Less than 1 million sq ft."],tip:"Size from per-capita consumption and work up systematically.",difficulty:2},
  {id:259,cat:'brain',q:"Two trains 100 miles apart head toward each other at 50 mph. A fly at 75 mph bounces between them. How far does the fly travel?",a:"75 miles. The trains close at 100 mph combined, meeting in 1 hour. The fly travels 75 mph \u00d7 1 hour = 75 miles.",wrong:["100 miles.","50 miles.","150 miles."],tip:"Focus on total time, not the fly\u2019s path. Time = distance \u00f7 combined speed.",difficulty:1},
  {id:260,cat:'brain',q:"What is 15% of 80?",a:"12. Shortcut: 10% of 80 = 8, plus 5% of 80 = 4, total = 12. Or: 15% of 80 = 80% of 15 = 12.",wrong:["8.","15.","10."],tip:"Percentage flip trick: X% of Y = Y% of X. Choose whichever is easier.",difficulty:1},
  {id:261,cat:'brain',q:"Revenue grows from $80M to $100M over 3 years. What is the approximate CAGR?",a:"~7.7%. CAGR = (100/80)^(1/3) \u2013 1 = (1.25)^(0.333) \u2013 1 \u2248 7.7%.",wrong:["25% because total growth is 25%.","8.33% (25% \u00f7 3).","About 15%."],tip:"Rule of 72: to double money at X% takes roughly 72/X years.",difficulty:2},
  {id:262,cat:'brain',q:"You have a 3-gallon jug and 5-gallon jug. How do you measure exactly 4 gallons?",a:"Fill 5-gal. Pour into 3-gal until full (2 left in 5-gal). Empty 3-gal. Pour 2 gal from 5 into 3. Fill 5-gal again. Pour from 5 into 3 (needs 1 gal). Left with 4 gal in the 5-gal jug.",wrong:["Fill both jugs (gives 8).","Impossible with these sizes.","Fill 5-gal and pour out 1 gallon."],tip:"Work backwards from the answer. Use jugs to create intermediate quantities.",difficulty:2},
  {id:263,cat:'brain',q:"If you double a penny every day for 30 days, how much do you end up with?",a:"About $5.4 million. $0.01 \u00d7 2^29 = $5,368,709.12. This illustrates exponential growth.",wrong:["About $30.","About $1,000.","About $100,000."],tip:"2^10 \u2248 1,000, so 2^30 \u2248 1 billion. Exponential growth is counterintuitive.",difficulty:1},
  {id:264,cat:'brain',q:"How would you estimate the number of barbers in Toronto?",a:"~6.5M metro population. ~50% get barber haircuts every 6 weeks = ~28M haircuts/year. A barber does ~2,080/year. 28M \u00f7 2,080 \u2248 ~13,500 barbers.",wrong:["About 50.","Over 1 million.","Exactly 500."],tip:"Demand side (haircuts needed) \u00f7 supply side (haircuts per barber).",difficulty:2},

  // ══════════════════════════════════════
  // BEHAVIORAL (35 questions, id 265-299)
  // ══════════════════════════════════════

  {id:265,cat:'beh',q:"Why do you want to work in investment banking?",a:"Explain genuine interest: passion for finance/deals, the fast-paced learning environment, and opportunity to work on major transactions. Link it to your background and skills.",wrong:["\u201cBecause the pay and bonuses are great.\u201d","\u201cI\u2019m not really sure; I just applied because everyone else did.\u201d","\u201cI want to go into consulting, but I need a job for now.\u201d"],tip:"Be specific about what draws you to IB vs. other finance roles.",difficulty:1},
  {id:266,cat:'beh',q:"Why do you want to join our bank specifically?",a:"Mention specific qualities: strong industry group, culture, recent deals led, and how those align with your interests. Show you\u2019ve done research on the bank.",wrong:["\u201cYour office is close to my house.\u201d","\u201cI don\u2019t know much about your bank\u2019s differences.\u201d","\u201cBecause I got rejected by the others; this is my backup.\u201d"],tip:"Mention 2-3 specific deals, people, or culture aspects unique to that bank.",difficulty:1},
  {id:267,cat:'beh',q:"What qualities make a good investment banker?",a:"Strong analytical/quantitative skills, attention to detail, communication, ability to handle pressure and long hours, teamwork, time management, and work ethic.",wrong:["Being a lone wolf who doesn\u2019t communicate.","Prioritizing 9-to-5 work-life balance above all.","Low attention to detail but good at delegating."],tip:"Back each quality with a brief personal example.",difficulty:1},
  {id:268,cat:'beh',q:"How do you handle stress and long working hours?",a:"Explain your approach: prioritizing tasks, staying organized, maintaining a positive attitude, using breaks/exercise. Emphasize past success with intense workloads.",wrong:["\u201cI never feel stress; I just ignore deadlines.\u201d","\u201cI usually get very anxious under pressure.\u201d","\u201cI tend to burn out quickly.\u201d"],tip:"Use a real example: \u2018During finals and my internship overlap, I...\u2019",difficulty:1},
  {id:269,cat:'beh',q:"Tell me about a time you resolved a conflict with a team member.",a:"Use STAR method: describe the context, disagreement, constructive resolution (communication/compromise), and positive result. Emphasize teamwork and listening.",wrong:["\u201cI got into a big argument and let someone else deal with it.\u201d","\u201cI ignored the person until the project was over.\u201d","\u201cThe conflict derailed the project.\u201d"],tip:"STAR: Situation, Task, Action, Result. Practice for all behavioral answers.",difficulty:1},
  {id:270,cat:'beh',q:"What is your greatest weakness?",a:"Mention a genuine weakness that isn\u2019t a core job requirement, and discuss how you\u2019re actively improving. Show self-awareness and growth.",wrong:["\u201cI don\u2019t have any weaknesses.\u201d","\u201cI work too hard.\u201d (clich\u00e9)","\u201cI\u2019m bad at accounting and Excel.\u201d (critical skill)"],tip:"The follow-up action is what interviewers want to hear.",difficulty:1},
  {id:271,cat:'beh',q:"What is your greatest strength?",a:"Highlight 2-3 relevant strengths (analytical skills, work ethic, fast learner) with brief examples. Connect to the demands of the analyst role.",wrong:["\u201cI\u2019m better than anyone here at everything.\u201d","\u201cI will bring in business immediately.\u201d (unrealistic for an analyst)","\u201cI need a job very badly.\u201d"],tip:"Tailor strengths to the specific role: analytical rigor, attention to detail.",difficulty:2},
  {id:272,cat:'beh',q:"Describe a failure or mistake and what you learned.",a:"Discuss a specific error. Take responsibility, explain what happened, focus on lessons learned and how you\u2019ve improved. Emphasize the positive change that resulted.",wrong:["\u201cI\u2019ve never made any significant mistake.\u201d","Describe a failure but blame others entirely.","A huge failure with no lesson learned."],tip:"Vulnerability plus growth = strong answer.",difficulty:2},
  {id:273,cat:'beh',q:"Where do you see yourself in 5 years?",a:"Show commitment to the career: developing expertise as an associate, taking on leadership \u2013 hopefully at this firm. Shows ambition and some flexibility.",wrong:["\u201cProbably doing something completely different.\u201d","\u201cI haven\u2019t thought about it.\u201d","\u201cRetired on a beach.\u201d"],tip:"It\u2019s okay to mention PE/HF as exit ops \u2014 interviewers expect it.",difficulty:2},
  {id:274,cat:'beh',q:"Tell me about a time you disagreed with a superior.",a:"Choose a respectful disagreement. Explain diplomatic approach (gathering data, suggesting alternatives). Emphasize respect and the positive outcome.",wrong:["\u201cI told my boss he was wrong in front of everyone.\u201d","\u201cI ignored my manager and did it my way.\u201d","\u201cI never voice disagreements with superiors.\u201d"],tip:"This tests your ability to push back constructively \u2014 critical for junior bankers.",difficulty:2},
  {id:275,cat:'beh',q:"Describe a time you demonstrated leadership.",a:"Provide an example where you took initiative and led a team/project. Explain the situation, your actions (organizing, motivating, delegating), and the successful result.",wrong:["\u201cI avoid leadership roles.\u201d","Focus on how others didn\u2019t listen and it failed.","\u201cI haven\u2019t had any opportunity to lead.\u201d"],tip:"Leadership doesn\u2019t require a title. Taking initiative in a group project counts.",difficulty:2},
  {id:276,cat:'beh',q:"Give an example of meeting a tight deadline.",a:"Explain context (multiple assignments, last-minute request). Describe prioritization, time invested, and resources leveraged to succeed. Highlight work ethic and organization.",wrong:["\u201cI missed the deadline, but it wasn\u2019t my fault.\u201d","\u201cI panicked and couldn\u2019t complete the work.\u201d","\u201cI\u2019ve never been in a deadline situation.\u201d"],tip:"Banking is all about tight deadlines. Show you thrive under pressure.",difficulty:2},
  {id:277,cat:'beh',q:"What do you do for fun outside of work?",a:"Mention genuine hobbies (sports, music, travel) that show you\u2019re well-rounded. Highlight interests involving challenge or commitment.",wrong:["\u201cNothing \u2013 I only eat, sleep, and work.\u201d","\u201cI like to party.\u201d","\u201cI just browse social media all day.\u201d"],tip:"This is a culture fit question. Be genuine but interesting.",difficulty:2},
  {id:278,cat:'beh',q:"What achievement are you most proud of?",a:"Choose something meaningful (academic, professional, personal). Describe why it was challenging, its impact, and why it matters to you.",wrong:["\u201cI haven\u2019t achieved much.\u201d","\u201cGetting this interview.\u201d","Something unrelated and inappropriate."],tip:"Pick something that required sustained effort and had a measurable outcome.",difficulty:2},
  {id:279,cat:'beh',q:"Give an example of going above and beyond.",a:"Describe proactively taking on extra tasks or working extra hours to ensure success. Explain what you did beyond expectations and the positive outcome.",wrong:["\u201cI stick exactly to my job description.\u201d","\u201cI stayed late but nothing got done.\u201d","\u201cI don\u2019t go beyond what\u2019s required unless paid more.\u201d"],tip:"Show initiative and hustle \u2014 two traits every bank wants.",difficulty:3},
  {id:280,cat:'beh',q:"How would your coworkers describe you?",a:"Dependable, hard-working, positive under pressure. Give an example: \u201cIn my last project, I took on extra work to meet our deadline and teammates appreciated it.\u201d",wrong:["\u201cThey\u2019d say I like to take all the credit.\u201d","\u201cI prefer to work alone and not communicate.\u201d","\u201cThey\u2019d say I\u2019m not very reliable.\u201d"],tip:"Your self-assessment should match what a reference would say.",difficulty:3},
  {id:281,cat:'beh',q:"Describe managing multiple tasks simultaneously.",a:"Explain balancing several commitments: how you organized time, set priorities, delegated, and handled everything successfully. Emphasize time management.",wrong:["\u201cI get overwhelmed and miss deadlines.\u201d","\u201cI focus on one thing and ignore the rest.\u201d","\u201cI\u2019ve never multitasked before.\u201d"],tip:"IB analysts juggle multiple deals simultaneously \u2014 critical to demonstrate.",difficulty:3},
  {id:282,cat:'beh',q:"How did you respond to constructive criticism?",a:"Example: \u201cMy manager pointed out model errors. I listened, acknowledged mistakes, asked for tips, and double-checked everything going forward. My accuracy improved.\u201d",wrong:["\u201cI got defensive and argued.\u201d","\u201cI generally ignore criticism.\u201d","\u201cI don\u2019t receive criticism; my work is perfect.\u201d"],tip:"Coachability is huge in banking. Show you take feedback and act on it.",difficulty:3},
  {id:283,cat:'beh',q:"Do you prefer to work independently or in a team?",a:"Both. Enjoy collaboration for complex projects but also self-driven for independent tasks. In banking you need both: teamwork on deals, autonomy in analyses.",wrong:["\u201cI only like working alone.\u201d","\u201cI prefer teams so I can rely on others.\u201d","\u201cI\u2019m indifferent and have no experience with either.\u201d"],tip:"The right answer is always both. Give a quick example of each.",difficulty:3},
  {id:284,cat:'beh',q:"How do you handle mistakes in your work?",a:"Take responsibility immediately. Notify the team if significant, work to correct the error, and implement processes to prevent recurrence. Treat mistakes as learning opportunities.",wrong:["\u201cI try to cover it up so no one finds out.\u201d","\u201cI get very flustered and it affects my work.\u201d","\u201cI haven\u2019t made any mistakes.\u201d"],tip:"Owning mistakes quickly and fixing them is valued more than never making them.",difficulty:3},
  {id:285,cat:'beh',q:"Tell me about a time you had to learn something quickly.",a:"Describe a situation where you had to rapidly acquire a new skill or knowledge domain. Explain your approach (self-study, mentorship, practice) and how you successfully applied what you learned.",wrong:["\u201cI learn slowly and that\u2019s just how I am.\u201d","\u201cI asked someone else to do it for me.\u201d","\u201cI waited until formal training was provided.\u201d"],tip:"Banking requires constant learning on the job. Show you\u2019re a fast, proactive learner.",difficulty:2},
  {id:286,cat:'beh',q:"What recent deal or market event have you been following?",a:"Pick a specific recent M&A transaction, IPO, or market event. Explain the parties involved, deal rationale, valuation, and your perspective on whether it was a good deal.",wrong:["\u201cI don\u2019t follow any market events or deals.\u201d","\u201cI saw something on social media but don\u2019t remember details.\u201d","Name a deal with no understanding of the details."],tip:"Prepare 2-3 recent deals before every interview. Show genuine interest in finance.",difficulty:1},
  {id:287,cat:'beh',q:"Why should we hire you over other candidates?",a:"Highlight your unique combination of skills, experiences, and qualities. Be specific about what differentiates you: relevant internships, technical skills, industry knowledge, or unique perspectives.",wrong:["\u201cI\u2019m the best candidate, period.\u201d","\u201cI\u2019m not sure; everyone has similar qualifications.\u201d","\u201cBecause I need this job more than others.\u201d"],tip:"Don\u2019t compare yourself to others negatively. Focus on your unique value proposition.",difficulty:2},
  {id:288,cat:'beh',q:"What industry or sector interests you most and why?",a:"Choose a sector (TMT, healthcare, energy, consumer, etc.) and explain why: personal interest, relevant experience, market dynamics you find compelling. Show genuine knowledge of the space.",wrong:["\u201cWhichever one pays the most.\u201d","\u201cI don\u2019t have any preference or interest in a specific sector.\u201d","\u201cReal estate because I watch HGTV.\u201d"],tip:"Research the bank\u2019s strongest groups and align your interest if possible.",difficulty:1},
  {id:289,cat:'beh',q:"How do you stay organized when managing a heavy workload?",a:"Describe specific systems: to-do lists, prioritization frameworks (urgency vs. importance), calendar blocking, regular check-ins with team. Give a concrete example.",wrong:["\u201cI just try to remember everything.\u201d","\u201cI only focus on whatever seems most urgent in the moment.\u201d","\u201cI\u2019ve never had a heavy workload to manage.\u201d"],tip:"Analysts manage multiple workstreams simultaneously. Show you have a system.",difficulty:1},
  {id:290,cat:'beh',q:"What would you do if you were given a task you didn\u2019t know how to complete?",a:"First, try to figure it out using available resources (online research, past examples, manuals). If stuck, ask a colleague or senior team member for guidance. Show initiative but also willingness to ask for help.",wrong:["\u201cI\u2019d wait for someone to teach me.\u201d","\u201cI\u2019d tell my boss I can\u2019t do it.\u201d","\u201cI\u2019d guess and hope for the best.\u201d"],tip:"The ideal approach: attempt it first, then ask smart questions. Shows initiative and humility.",difficulty:1},
  {id:291,cat:'beh',q:"Tell me about a time you had to persuade someone to see your point of view.",a:"Describe a specific situation where you used data, logic, or empathy to convince someone. Explain the approach, how you listened to their perspective, and the outcome.",wrong:["\u201cI just kept arguing until they gave in.\u201d","\u201cI went to their boss to overrule them.\u201d","\u201cI\u2019ve never needed to persuade anyone.\u201d"],tip:"Persuasion is a key skill in banking \u2014 from client pitches to internal decisions.",difficulty:2},
  {id:292,cat:'beh',q:"Describe a time you had to work with someone difficult.",a:"Explain the situation, what made the person difficult, and how you adapted your approach to work effectively. Focus on the outcome and what you learned about collaboration.",wrong:["\u201cI avoided them completely.\u201d","\u201cI complained to management about them.\u201d","\u201cI\u2019ve never worked with anyone difficult.\u201d"],tip:"You\u2019ll work with many personalities in banking. Show you can adapt.",difficulty:2},
  {id:293,cat:'beh',q:"What is your biggest risk you\u2019ve ever taken?",a:"Describe a calculated risk (changing career paths, starting a project, making an investment) where you weighed pros/cons and committed. Explain the outcome and what you learned.",wrong:["\u201cI don\u2019t take risks.\u201d","\u201cI gambled and lost everything.\u201d","Something reckless with no thought process."],tip:"Show that you\u2019re thoughtful about risk-taking, not reckless.",difficulty:3},
  {id:294,cat:'beh',q:"How do you handle a situation where you have too much work and not enough time?",a:"Prioritize by urgency and importance, communicate proactively with your team about timelines, ask for help or delegate where possible, and focus on delivering the highest-impact work first.",wrong:["\u201cI just work until I collapse.\u201d","\u201cI miss deadlines on the less important tasks.\u201d","\u201cI\u2019ve never been in that situation.\u201d"],tip:"Proactive communication about capacity is critical \u2014 surprises are worse than asking for help.",difficulty:2},
  {id:295,cat:'beh',q:"Tell me about a time you made an impact on a team or organization.",a:"Describe a specific contribution that had measurable results: improved a process, led a successful initiative, or delivered outstanding work that was recognized.",wrong:["\u201cI just did my assigned work, nothing more.\u201d","\u201cI can\u2019t think of a time I made an impact.\u201d","Describe an impact with no specific details or results."],tip:"Quantify your impact whenever possible: saved X hours, improved Y by Z%.",difficulty:2},
  {id:296,cat:'beh',q:"What would you do if you disagreed with your analyst team about how to approach a model?",a:"Present your perspective with supporting logic and data. Listen to the team\u2019s rationale. If still disagreeing, propose testing both approaches or escalating to a senior team member for guidance. Maintain respect and focus on getting the right answer.",wrong:["\u201cI\u2019d just do it my way without telling them.\u201d","\u201cI\u2019d go along with whatever they say to avoid conflict.\u201d","\u201cI\u2019d immediately escalate to a VP.\u201d"],tip:"Analytical disagreements are healthy and common. Show you can advocate while remaining collaborative.",difficulty:3},
  {id:297,cat:'beh',q:"What motivates you?",a:"Discuss intrinsic motivators: intellectual challenge, learning, working on high-stakes projects, being part of a team that delivers results. Connect to why IB appeals to you specifically.",wrong:["\u201cMoney is my only motivation.\u201d","\u201cI\u2019m not really sure what motivates me.\u201d","\u201cFear of failure.\u201d"],tip:"Be genuine but professional. Interviewers want to see you\u2019re driven by more than just compensation.",difficulty:1},
  {id:298,cat:'beh',q:"If you had to pitch a stock right now, which would you pick and why?",a:"Choose a stock you know well. Provide a brief investment thesis: what the company does, why it\u2019s undervalued or has growth potential, key catalysts, and risks. Show structured thinking.",wrong:["\u201cI don\u2019t know anything about stocks.\u201d","Name a stock with no supporting analysis.","\u201cWhatever is trending on social media.\u201d"],tip:"Prepare 1-2 stock pitches before interviews. Show you can think like an investor.",difficulty:2},
  {id:299,cat:'beh',q:"Do you have any questions for me?",a:"Always say yes. Ask thoughtful questions about the interviewer\u2019s experience, the team\u2019s current deal flow, culture, mentorship opportunities, or recent strategic changes at the firm.",wrong:["\u201cNo, I think I\u2019m good.\u201d","\u201cHow much will I get paid?\u201d","\u201cHow soon can I get promoted?\u201d"],tip:"Prepare 3-5 questions before every interview. This is your chance to show genuine interest and intelligence.",difficulty:1},

  {id:300,cat:'deal',q:"What is inflation?",a:"A general increase in the price level of goods and services, decreasing the purchasing power of money.",wrong:["A one-time price jump in a single good.","A general decrease in prices.","Another term for economic growth."],tip:"The Fed targets ~2% annual inflation as healthy.",difficulty:1},
  {id:301,cat:'deal',q:"What is deflation?",a:"A general decline in prices, often from reduced money supply or demand. Opposite of inflation, with increased purchasing power.",wrong:["Prices rising faster than normal.","A temporary drop in one item.","Very low but positive inflation."],tip:"Deflation discourages spending and increases real debt burdens.",difficulty:1},
  {id:302,cat:'deal',q:"What is monetary policy?",a:"Actions by a central bank to control money supply and influence interest rates to achieve stable prices and growth.",wrong:["Government spending and taxation decisions.","Printing money to pay off debt only.","Issuing stocks and bonds to the public."],tip:"The Fed\u2019s main tool is the federal funds rate.",difficulty:1},
  {id:303,cat:'deal',q:"What is fiscal policy?",a:"Government spending and taxation used to influence economic conditions \u2013 e.g., increasing spending or cutting taxes to stimulate growth.",wrong:["Central bank interest rate actions.","Financial industry regulations.","Controlling inflation via money supply."],tip:"Fiscal policy = Congress/government. Monetary policy = the Fed.",difficulty:1},
  {id:304,cat:'deal',q:"How do rising interest rates affect the economy?",a:"Higher rates increase borrowing costs, reducing spending and investment, slowing growth and helping curb inflation.",wrong:["Higher rates always cause faster growth.","No significant impact.","Only affect the stock market."],tip:"Higher rates \u2192 costlier borrowing \u2192 less spending \u2192 slower growth.",difficulty:1},
  {id:305,cat:'deal',q:"How do interest rates affect bond prices?",a:"Inversely: when rates rise, bond prices fall; when rates fall, bond prices rise.",wrong:["Higher rates cause bond prices to rise.","They don\u2019t affect bonds since coupons are fixed.","Bond prices move in the same direction as rates."],tip:"Duration measures sensitivity \u2014 longer-duration bonds are more affected.",difficulty:1},
  {id:306,cat:'deal',q:"What is a yield curve, and what does an inverted yield curve indicate?",a:"A graph of yields at different maturities. An inverted curve (short-term rates > long-term) often signals recession expectations.",wrong:["It shows stock returns; inversion means prices will rise.","It graphs inflation; inversion means deflation.","It graphs GDP; inversion means hypergrowth."],tip:"An inverted yield curve has preceded every US recession in the last 50 years.",difficulty:1},
  {id:307,cat:'deal',q:"What is Gross Domestic Product (GDP)?",a:"Total monetary value of all final goods and services produced within a country in a given period.",wrong:["A country\u2019s tax collections.","Exports minus imports.","The total money supply."],tip:"GDP = C + I + G + (X\u2013M).",difficulty:1},
  {id:308,cat:'deal',q:"What is the Fed\u2019s dual mandate?",a:"Maximum employment and stable prices (low, stable inflation).",wrong:["Balance the federal budget.","Devalue the currency intentionally.","Control stock and housing prices."],tip:"These goals can conflict \u2014 fighting inflation can increase unemployment.",difficulty:2},
  {id:309,cat:'deal',q:"What is quantitative easing (QE)?",a:"Central bank purchases of bonds/securities to inject liquidity, increase money supply, and lower long-term rates.",wrong:["Government tax cuts during recession.","Quickly raising rates to combat inflation.","Direct payments to citizens."],tip:"QE was used after 2008 and during COVID-19.",difficulty:2},
  {id:310,cat:'deal',q:"How does a strong dollar affect US companies?",a:"Makes US exports more expensive abroad (hurting exporters), reduces dollar value of foreign earnings, but makes imports cheaper.",wrong:["A strong dollar helps all exporters.","It causes import prices to rise.","No impact on multinationals."],tip:"Multinational companies with foreign revenue are negatively impacted.",difficulty:2},
  {id:311,cat:'deal',q:"What is the difference between nominal and real interest rates?",a:"Nominal rate is unadjusted for inflation. Real rate = nominal minus inflation, reflecting true purchasing power of return.",wrong:["They are the same.","Nominal is after inflation adjustment.","Nominal rates are always lower."],tip:"If inflation > nominal rate, real rate is negative.",difficulty:2},
  {id:312,cat:'deal',q:"What is stagflation?",a:"Stagnant economic growth combined with high inflation \u2014 high unemployment and high prices simultaneously.",wrong:["Hyperinflation during a boom.","A standard recession.","Deflation and high growth."],tip:"Stagflation is particularly hard to address because fixing one problem worsens the other.",difficulty:2},
  {id:313,cat:'deal',q:"How is a recession defined?",a:"Commonly as two consecutive quarters of declining GDP \u2014 a significant economic downturn.",wrong:["Stock market falling 20%.","Any single quarter of GDP decline.","High inflation plus high unemployment."],tip:"The NBER officially declares recessions based on multiple factors.",difficulty:2},
  {id:314,cat:'deal',q:"What is the unemployment rate?",a:"Percentage of the labor force that is jobless but actively seeking work. A lagging indicator.",wrong:["Percentage of total population without a job.","Working-age people not working, regardless of search.","Unemployed divided by total population."],tip:"The labor force excludes retirees, students, and those not seeking work.",difficulty:2},
  {id:315,cat:'deal',q:"What is the Consumer Price Index (CPI)?",a:"An index measuring average price changes for a consumer basket of goods and services \u2014 a key inflation indicator.",wrong:["Producer price index.","Stock price index for consumer companies.","A consumer confidence measure."],tip:"Core CPI excludes food and energy \u2014 what the Fed watches most.",difficulty:2},
  {id:316,cat:'deal',q:"What is a budget deficit?",a:"When government spending exceeds revenue in a given period.",wrong:["When exports exceed imports.","Any time debt increases.","The trade gap."],tip:"Deficits are funded by issuing government bonds.",difficulty:2},
  {id:317,cat:'deal',q:"What is the national debt?",a:"Total government debt \u2014 the accumulation of past budget deficits, net of surpluses.",wrong:["Money printed each year.","Total money in circulation.","Combined citizen debt."],tip:"Debt-to-GDP ratio matters more than the absolute number.",difficulty:2},
  {id:318,cat:'deal',q:"What is hyperinflation?",a:"Extremely rapid, out-of-control inflation \u2014 prices rising so fast money loses value daily. Above ~50% per month.",wrong:["Any inflation above 5%.","Alternating deflation and inflation.","Prices doubling over a decade."],tip:"Examples: Zimbabwe (2008), Weimar Germany (1920s), Venezuela (2018).",difficulty:3},
  {id:319,cat:'deal',q:"How can central banks reduce inflation?",a:"Contractionary monetary policy: raising interest rates and reducing money supply to cool spending.",wrong:["By lowering interest rates.","By printing more money.","They cannot influence inflation."],tip:"Volcker raised rates to ~20% in early 1980s to break US inflation.",difficulty:2},
  {id:320,cat:'deal',q:"What is an exchange rate?",a:"The price of one currency in terms of another. E.g., 1 USD = 0.90 EUR.",wrong:["The barter exchange rate for goods.","Interest rate parity between countries.","Converting commodities into money."],tip:"Driven by interest rate differentials, trade balances, and economic strength.",difficulty:1},
  {id:321,cat:'deal',q:"What is a trade deficit?",a:"When imports exceed exports \u2014 buying more from abroad than selling.",wrong:["When exports exceed imports.","The government budget deficit.","A weak currency."],tip:"The US has run a trade deficit for decades.",difficulty:2},
  {id:322,cat:'deal',q:"What are emerging markets?",a:"Economies in rapid growth/industrialization with some developed characteristics but not yet fully developed. E.g., China, India, Brazil.",wrong:["All non-North-American/European countries.","Any market currently rising.","New industries in developed economies."],tip:"Higher growth but also higher risk (political, currency, regulatory).",difficulty:2},
  {id:323,cat:'deal',q:"What is a depression vs. a recession?",a:"A depression is a severe, prolonged downturn \u2014 much worse than a recession. Sharp GDP fall (10%+) and years of high unemployment.",wrong:["They are the same.","Depression = stock crash; recession = GDP.","Depression = any recession in a developing country."],tip:"The Great Depression: US GDP fell ~30%, unemployment hit 25%.",difficulty:3},
  {id:324,cat:'deal',q:"How do tariffs affect the economy?",a:"Make imports expensive, protecting domestic industries but raising consumer prices. Countries may retaliate, slowing trade.",wrong:["Tariffs only generate revenue.","Tariffs always help with no downsides.","Tariffs mainly affect exports."],tip:"Understand trade-offs between domestic protection and economic efficiency.",difficulty:2},
  {id:325,cat:'deal',q:"What is the S&P 500?",a:"A market-cap-weighted index tracking 500 of the largest US publicly traded companies. The best single gauge of US large-cap equity performance.",wrong:["The 500 most expensive stocks.","A bond index.","A list of the 500 oldest companies."],tip:"Market-cap weighted \u2014 larger companies influence the index more.",difficulty:1},
  {id:326,cat:'deal',q:"What is the Federal Funds Rate?",a:"The rate at which banks lend reserves to each other overnight. The Fed\u2019s primary monetary policy tool that influences all other rates.",wrong:["The rate the government pays on bonds.","The consumer mortgage rate.","The Fed\u2019s profit margin."],tip:"When the Fed \u2018raises rates,\u2019 they\u2019re raising this target.",difficulty:1},
  {id:327,cat:'deal',q:"What is a credit spread?",a:"The yield difference between a corporate bond and a risk-free government bond of the same maturity. Reflects the credit risk premium.",wrong:["The bid-ask spread.","The difference between two stock prices.","The bank\u2019s loan margin."],tip:"Spreads widen during stress (investors demand more for risk).",difficulty:2},

  {id:328,cat:'deal',q:"What is a hedge fund?",a:"A pooled investment fund that employs various strategies (long/short equity, macro, event-driven, etc.) to generate returns. Typically open to accredited investors and charges \u20182 and 20\u2019 fees (2% management, 20% performance).",wrong:["A fund that only invests in hedges and agriculture.","The same thing as a mutual fund.","A government-run savings program."],tip:"Key difference from PE: hedge funds invest in liquid securities; PE buys whole companies.",difficulty:1},
  {id:329,cat:'deal',q:"What is private equity?",a:"An asset class where firms raise capital from investors to acquire, improve, and eventually sell companies for profit. PE firms typically buy controlling stakes, hold for 3-7 years, and use leverage to amplify returns.",wrong:["Any investment in a private company.","The same as venture capital.","A stock exchange for private companies."],tip:"PE vs. VC: PE buys mature companies with leverage; VC funds early-stage startups with equity.",difficulty:1},
  {id:330,cat:'deal',q:"What is venture capital?",a:"Financing provided to early-stage, high-growth potential companies in exchange for equity. VCs fund startups too risky for traditional bank lending, expecting most investments to fail but a few to return 10-100x.",wrong:["The same as private equity.","Loans provided by the government to entrepreneurs.","Any investment in technology companies."],tip:"VC investment stages: Seed \u2192 Series A \u2192 B \u2192 C \u2192 etc. Each round is larger.",difficulty:1},
  {id:331,cat:'deal',q:"What is a bond rating and why does it matter?",a:"A grade assigned by rating agencies (Moody\u2019s, S&P, Fitch) that reflects a bond issuer\u2019s creditworthiness. Investment grade (BBB/Baa and above) vs. high yield (below BBB/Baa). It determines the interest rate the issuer must pay.",wrong:["It measures how profitable a company is.","All bonds have the same rating.","Ratings only apply to government bonds."],tip:"A downgrade from investment grade to high yield (\u2018fallen angel\u2019) can trigger forced selling.",difficulty:2},
  {id:332,cat:'deal',q:"What is a stock split?",a:"When a company divides its existing shares into multiple new shares. A 2-for-1 split doubles shares outstanding and halves the price per share. Total market cap stays the same.",wrong:["It increases the company\u2019s total value.","It means the company is splitting into two separate entities.","Stock splits always indicate financial trouble."],tip:"Companies split stocks to make shares more accessible to retail investors.",difficulty:1},
  {id:333,cat:'deal',q:"What is market capitalization?",a:"Market cap = Share Price \u00d7 Shares Outstanding. It represents the total market value of a company\u2019s equity. Companies are classified as large-cap (>$10B), mid-cap ($2-10B), or small-cap (<$2B).",wrong:["It\u2019s the same as enterprise value.","It\u2019s the total revenue of the company.","Market cap includes the company\u2019s debt."],tip:"Market cap is equity value only \u2014 it doesn\u2019t include debt.",difficulty:1},
  {id:334,cat:'deal',q:"What is a short sale?",a:"Selling borrowed shares with the expectation of buying them back at a lower price. The short seller profits from the price decline. Risk is theoretically unlimited (stock can rise indefinitely).",wrong:["Selling a stock you own for a quick profit.","Buying a stock and holding it for a short time.","A sale at a discount to attract buyers."],tip:"Short selling is controversial but serves an important market function: price discovery.",difficulty:2},
  {id:335,cat:'deal',q:"What is the difference between a bull market and a bear market?",a:"A bull market is a prolonged period of rising stock prices (generally +20% from lows). A bear market is a prolonged decline (generally -20% from highs). Named after how the animals attack (bull thrusts up, bear swipes down).",wrong:["Bull and bear markets alternate every year.","A bull market means one stock is rising; bear means one is falling.","They are the same thing."],tip:"The longest bull market in US history lasted from 2009 to 2020.",difficulty:1},
  {id:336,cat:'deal',q:"What is an asset class?",a:"A group of investments with similar characteristics and behavior: equities (stocks), fixed income (bonds), real estate, commodities, cash/cash equivalents, and alternatives (PE, hedge funds, crypto).",wrong:["Only stocks and bonds are asset classes.","An asset class is a type of financial statement.","Asset classes all move in the same direction."],tip:"Diversification across asset classes reduces portfolio risk \u2014 they have different risk/return profiles.",difficulty:1},
  {id:337,cat:'deal',q:"What is quantitative tightening (QT)?",a:"The reverse of QE: the central bank reduces its balance sheet by letting bonds mature without reinvestment or actively selling them. This removes liquidity from the financial system and tightens monetary conditions.",wrong:["The same as raising interest rates.","When the government tightens its budget.","Printing more money to tighten inflation."],tip:"QT is the Fed\u2019s second tool (alongside rate hikes) for tightening monetary policy.",difficulty:3},
  {id:338,cat:'deal',q:"What is the difference between the Dow Jones, S&P 500, and NASDAQ?",a:"The Dow Jones tracks 30 large \u2018blue chip\u2019 stocks (price-weighted). The S&P 500 tracks 500 large-cap stocks (market-cap-weighted). The NASDAQ Composite tracks all stocks on the NASDAQ exchange (tech-heavy).",wrong:["They all track exactly the same stocks.","The Dow is the most comprehensive index.","NASDAQ only includes FAANG stocks."],tip:"The S&P 500 is the most commonly used benchmark for US equity performance.",difficulty:1},
  {id:339,cat:'deal',q:"What is a Special Purpose Acquisition Company (SPAC)?",a:"A blank-check company that raises money through an IPO to acquire an existing company, effectively taking the target public without a traditional IPO process.",wrong:["A government agency that acquires failing companies.","A type of mutual fund.","A company that specializes in acquisitions for others."],tip:"SPACs boomed in 2020-2021 but have since faced regulatory scrutiny and poor performance.",difficulty:2},
  {id:340,cat:'deal',q:"What is the current state of the M&A market?",a:"M&A activity is cyclical, driven by factors like interest rates, economic growth, CEO confidence, stock market levels, and available financing. Higher rates and economic uncertainty reduce deal volume; strong markets increase it.",wrong:["M&A volume is always constant year to year.","M&A only happens in bull markets.","Interest rates have no effect on M&A activity."],tip:"Be ready to discuss current M&A trends in your interview \u2014 search recent headlines.",difficulty:2},
  {id:341,cat:'deal',q:"What is ESG investing?",a:"Environmental, Social, and Governance investing considers non-financial factors alongside financial returns: climate impact, labor practices, board diversity, executive compensation, etc.",wrong:["It\u2019s the same as investing in energy stocks.","ESG is a government regulation, not an investing style.","ESG funds always outperform traditional funds."],tip:"ESG has become a major theme in M&A due diligence and investment committee discussions.",difficulty:2},
  {id:342,cat:'deal',q:"What is a leveraged loan?",a:"A loan extended to companies that already carry significant debt or have lower credit ratings (below investment grade). These loans have floating interest rates and are often used to finance LBOs.",wrong:["Any loan from a bank.","A loan that requires no collateral.","A government-backed student loan."],tip:"The leveraged loan market is closely tied to PE/LBO activity.",difficulty:2},
  {id:343,cat:'deal',q:"What are the main investment banking divisions?",a:"M&A Advisory, Equity Capital Markets (ECM), Debt Capital Markets (DCM), Leveraged Finance, and Restructuring. Supporting groups include industry coverage groups and product specialists.",wrong:["Sales, marketing, and accounting.","There\u2019s only one division in an investment bank.","Retail banking, commercial banking, and insurance."],tip:"IB is just one part of a full-service bank that also includes S&T, asset management, etc.",difficulty:1},
  {id:344,cat:'deal',q:"What is restructuring in investment banking?",a:"Advising financially distressed companies on options: debt restructuring, asset sales, bankruptcy proceedings, creditor negotiations, or turnaround strategies.",wrong:["Reorganizing the bank\u2019s own internal structure.","Only relevant when a company is completely bankrupt.","The same as M&A advisory."],tip:"Restructuring is countercyclical \u2014 it\u2019s busiest during recessions when M&A slows.",difficulty:2},
  {id:345,cat:'deal',q:"What is Equity Capital Markets (ECM)?",a:"The IB division that helps companies raise equity capital through IPOs, follow-on offerings, secondary offerings, and convertible bonds. ECM bridges the capital markets and advisory functions.",wrong:["A stock exchange where equities are traded.","The same as M&A advisory.","A division that only manages equity portfolios."],tip:"ECM bankers focus on pricing, timing, and structuring equity issuances.",difficulty:2},
  {id:346,cat:'deal',q:"What is Debt Capital Markets (DCM)?",a:"The IB division that helps companies and governments raise debt capital by issuing bonds and loans. DCM bankers advise on structure, pricing, timing, and investor distribution.",wrong:["A division that collects debts.","The bond trading desk.","A government agency managing national debt."],tip:"DCM deals tend to be more frequent but smaller in fee per deal compared to M&A.",difficulty:2},
  {id:347,cat:'deal',q:"What is the difference between the buy-side and sell-side?",a:"Sell-side: investment banks that provide services (M&A advice, research, trading) to clients. Buy-side: firms that invest capital (PE, hedge funds, mutual funds, pension funds) to generate returns.",wrong:["Buy-side buys stocks; sell-side sells them.","They are the same thing.","Buy-side refers to M&A buyers; sell-side to M&A sellers."],tip:"IB analysts are sell-side. Many exit to the buy-side (PE, hedge funds) after 2 years.",difficulty:1},
  {id:348,cat:'deal',q:"What is the current interest rate environment and how does it affect IB?",a:"Interest rates significantly impact IB: low rates boost LBO/M&A activity (cheap financing), while high rates reduce deal flow (expensive debt). Rate expectations drive market sentiment and client decision-making.",wrong:["Interest rates don\u2019t affect investment banking.","Only the equity markets matter for IB.","IB revenue is completely independent of the economy."],tip:"Stay current on the Fed\u2019s rate decisions and their impact on deal activity.",difficulty:2},
  {id:349,cat:'deal',q:"What is a yield to maturity (YTM)?",a:"The total expected return on a bond if held until maturity, accounting for coupon payments and the difference between current price and par value. It\u2019s the discount rate that equates the PV of all future cash flows to the current bond price.",wrong:["The coupon rate stated on the bond.","The current annual dividend yield.","The rate of return only in the first year."],tip:"YTM is the bond equivalent of IRR \u2014 it\u2019s the annualized total return.",difficulty:3},
];

/* ─── THEME ──────────────────────────── */
function setNavActive(el) {
  document.querySelectorAll('#nav-links .nav-link').forEach(l => l.classList.remove('nav-active'));
  el.classList.add('nav-active');
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label-app');
  if (icon) icon.textContent = isDark ? '☀' : '☽';
  if (label) label.textContent = isDark ? 'LIGHT' : 'DARK';
}

/* ─── GUEST LOGIN (testing bypass) ───── */
function guestLogin() {
  const greeting = document.getElementById('greeting-name');
  const sbName = document.getElementById('sb-name');
  const sbAvatar = document.getElementById('sb-avatar');
  if (greeting) greeting.textContent = 'there';
  if (sbName) sbName.textContent = 'Guest';
  if (sbAvatar) sbAvatar.textContent = 'G';
  const emailEl = document.getElementById('sb-email-display');
  if (emailEl) emailEl.textContent = 'guest mode';
  showScreen('app');
}

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
const SUPABASE_URL = 'https://tetpqitwoprytartedxy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRldHBxaXR3b3ByeXRhcnRlZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMTI4NDgsImV4cCI6MjA4NjY4ODg0OH0.DOHqrfIaOlUROyZCDDISZfmTSfXOjfYu3cDYijAY44E';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
  if (tabLogin) tabLogin.classList.toggle('active', tab === 'login');
  if (tabSignup) tabSignup.classList.toggle('active', tab === 'signup');
  if (loginForm) loginForm.style.display = tab === 'login' ? 'block' : 'none';
  if (signupForm) signupForm.style.display = tab === 'signup' ? 'block' : 'none';
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
    options: { data: { full_name: name } }
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
    completedCases: [],
    streakDays: [],
    dailyGoal: 5,
    badges: [],
    _perfectQuiz: false
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
      progress.streakDays = data.streak_days || [];
      progress.dailyGoal = data.daily_goal || 5;
      progress.badges = data.badges || [];
      progress._perfectQuiz = data.perfect_quiz || false;
      applySaved = data.saved_firms || [];
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
      completed_cases: progress.completedCases || [],
      streak_days: progress.streakDays || [],
      daily_goal: progress.dailyGoal || 5,
      badges: progress.badges || [],
      perfect_quiz: progress._perfectQuiz || false,
      saved_firms: applySaved || []
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

/* ─── TOAST NOTIFICATIONS ───────────── */
function showToast(message, icon, duration) {
  duration = duration || 3000;
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = (icon ? '<span class="toast-icon">' + icon + '</span>' : '') +
    '<span class="toast-msg">' + message + '</span>';
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ─── VIEWS ──────────────────────────── */
function showView(id) {
  if (typeof caseTimerInterval !== 'undefined') clearInterval(caseTimerInterval);
  document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.sb-item').forEach(n => n.classList.remove('active'));
  const view = document.getElementById('view-' + id);
  if (view) view.classList.add('active');
  const labels = {dashboard:'Dashboard',bank:'Question Bank',flash:'Flashcards',mock:'Mock Interview',quiz:'Quiz Mode',map:'Knowledge Map',learn:'Concepts',cases:'Mini-Cases',apply:'Internship Tracker',profile:'Profile'};
  document.querySelectorAll('.sb-item').forEach(n => {
    if (n.textContent.trim().toLowerCase().includes((labels[id]||id).toLowerCase()))
      n.classList.add('active');
  });
  if (id === 'bank') renderBank();
  if (id === 'flash') initFlash();
  if (id === 'map') renderKnowledgeMap();
  if (id === 'quiz') showQuizSetup();
  if (id === 'learn') renderLearnModules();
  if (id === 'cases') renderCasesGrid();
  if (id === 'apply') renderApplyTracker();
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
  completedCases: [],
  streakDays: [],
  dailyGoal: 5,
  badges: [],
  _perfectQuiz: false
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
  recordDailyActivity();
  updateDashStats();
  checkBadges();
  saveProgress();
}

function updateDashStats() {
  const total = QUESTIONS.length;
  const ans = progress.answered.size;
  const circumference = 2 * Math.PI * 26; // 163.36 for r=26

  // Answered ring
  const ka = document.getElementById('kpi-answered');
  const kt = document.getElementById('kpi-total');
  const ringAnswered = document.getElementById('ring-answered');
  if (ka) ka.textContent = ans;
  if (kt) kt.textContent = total;
  if (ringAnswered) ringAnswered.style.strokeDashoffset = circumference * (1 - ans / total);

  // Mastered ring
  const masteredCount = QUESTIONS.filter(q => getMasteryClass(q.id) === 'mastered').length;
  const km = document.getElementById('kpi-mastered');
  const ringMastered = document.getElementById('ring-mastered');
  if (km) km.textContent = masteredCount;
  if (ringMastered) ringMastered.style.strokeDashoffset = circumference * (1 - masteredCount / total);

  // Due count (for CTA text)
  const dueCount = getDueCount();

  // Update practice button text
  const practiceBtn = document.getElementById('practice-btn-text');
  if (practiceBtn) {
    if (dueCount > 0) {
      practiceBtn.textContent = 'Review ' + dueCount + ' due cards';
    } else if (masteredCount < total) {
      practiceBtn.textContent = 'Continue Learning';
    } else {
      practiceBtn.textContent = 'Practice Today';
    }
  }

  // Category progress
  const cats = ['tech','beh','brain','deal'];
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
  renderDashPipeline();
  renderAnalytics();
  renderBadges();
  updateDailyGoal();
  renderLearningPath();
  updateStreakDisplay();
}

/* ─── ANALYTICS ─────────────────────── */
function getSubcategoryStats() {
  const subs = ['accounting','valuation','lbo','ma'];
  const stats = {};
  subs.forEach(sub => {
    const pool = QUESTIONS.filter(q => q.sub === sub);
    const attempted = pool.filter(q => progress.mastery[q.id] && progress.mastery[q.id].lastSeen);
    const correct = attempted.filter(q => progress.mastery[q.id].level === 3);
    const mastered = pool.filter(q => getMasteryClass(q.id) === 'mastered');
    const learning = pool.filter(q => getMasteryClass(q.id) === 'learning');
    stats[sub] = {
      total: pool.length,
      attempted: attempted.length,
      correct: correct.length,
      accuracy: attempted.length > 0 ? Math.round(correct.length / attempted.length * 100) : null,
      mastered: mastered.length,
      learning: learning.length
    };
  });
  const weakest = Object.entries(stats)
    .filter(([_, s]) => s.attempted >= 3)
    .sort((a, b) => a[1].accuracy - b[1].accuracy)[0];
  stats._weakest = weakest ? { sub: weakest[0], ...weakest[1] } : null;
  return stats;
}

function renderAnalytics() {
  const statsEl = document.getElementById('subcategory-stats');
  const calloutEl = document.getElementById('weak-area-callout');
  const panelEl = document.getElementById('analytics-panel');
  if (!statsEl || !calloutEl || !panelEl) return;
  const stats = getSubcategoryStats();
  const hasData = ['accounting','valuation','lbo','ma'].some(s => stats[s].attempted > 0);
  if (!hasData) { panelEl.style.display = 'none'; return; }
  panelEl.style.display = 'block';
  const subLabels = { accounting:'Accounting', valuation:'Valuation', lbo:'LBO', ma:'M&A' };
  const subColors = { accounting:'var(--accent)', valuation:'var(--blue)', lbo:'var(--amber)', ma:'var(--green)' };
  statsEl.innerHTML = ['accounting','valuation','lbo','ma'].map(sub => {
    const s = stats[sub];
    const pct = s.accuracy !== null ? s.accuracy : 0;
    return '<div class="subcat-row">' +
      '<div class="subcat-label">' + subLabels[sub] + '</div>' +
      '<div class="subcat-bar-wrap"><div class="subcat-bar" style="width:' + pct + '%;background:' + subColors[sub] + '"></div></div>' +
      '<div class="subcat-pct">' + (s.accuracy !== null ? pct + '%' : '--') + '</div>' +
      '<div class="subcat-detail">' + s.mastered + '/' + s.total + ' mastered</div></div>';
  }).join('');
  if (stats._weakest) {
    const w = stats._weakest;
    const modules = CONCEPT_MAP[w.sub] || [];
    const moduleLink = modules[0] ? 'onclick="showView(\'learn\');setTimeout(()=>openLearnModule(\'' + modules[0] + '\'),100)"' : 'onclick="showView(\'learn\')"';
    calloutEl.innerHTML = '<div class="weak-callout">' +
      'Your weakest area is <strong>' + subLabels[w.sub] + '</strong> (' + w.accuracy + '% accuracy). ' +
      '<a ' + moduleLink + ' style="color:var(--accent);cursor:pointer;text-decoration:underline">Review ' + subLabels[w.sub] + ' concepts</a></div>';
  } else {
    calloutEl.innerHTML = '';
  }
}

/* ─── GAMIFICATION ──────────────────── */
const BADGES = [
  { id:'first-10', title:'Getting Started', desc:'Answer 10 questions', icon:'🌱', check:()=>progress.answered.size>=10 },
  { id:'first-50', title:'Committed', desc:'Answer 50 questions', icon:'📚', check:()=>progress.answered.size>=50 },
  { id:'first-100', title:'Century', desc:'Answer 100 questions', icon:'💯', check:()=>progress.answered.size>=100 },
  { id:'all-250', title:'Completionist', desc:'Answer all 250 questions', icon:'👑', check:()=>progress.answered.size>=250 },
  { id:'streak-3', title:'On a Roll', desc:'3-day streak', icon:'✨', check:()=>calculateStreak()>=3 },
  { id:'streak-7', title:'Week Warrior', desc:'7-day streak', icon:'⚡', check:()=>calculateStreak()>=7 },
  { id:'streak-30', title:'Monthly Master', desc:'30-day streak', icon:'🏆', check:()=>calculateStreak()>=30 },
  { id:'acc-master', title:'Accounting Pro', desc:'Master all accounting questions', icon:'📊', check:()=>QUESTIONS.filter(q=>q.sub==='accounting').every(q=>getMasteryClass(q.id)==='mastered') },
  { id:'val-master', title:'Valuation Expert', desc:'Master all valuation questions', icon:'💰', check:()=>QUESTIONS.filter(q=>q.sub==='valuation').every(q=>getMasteryClass(q.id)==='mastered') },
  { id:'lbo-master', title:'LBO Specialist', desc:'Master all LBO questions', icon:'🏦', check:()=>QUESTIONS.filter(q=>q.sub==='lbo').every(q=>getMasteryClass(q.id)==='mastered') },
  { id:'ma-master', title:'M&A Guru', desc:'Master all M&A questions', icon:'🔄', check:()=>QUESTIONS.filter(q=>q.sub==='ma').every(q=>getMasteryClass(q.id)==='mastered') },
  { id:'perfect-quiz', title:'Perfect Score', desc:'100% on a 10+ question quiz', icon:'🎯', check:()=>progress._perfectQuiz },
  { id:'all-cats', title:'Well-Rounded', desc:'Practice all 4 categories', icon:'🌐', check:()=>['tech','beh','brain','deal'].every(c=>QUESTIONS.filter(q=>q.cat===c).some(q=>progress.answered.has(q.id))) },
  { id:'concepts-5', title:'Scholar', desc:'Complete 5 concept modules', icon:'📖', check:()=>{ const lp=progress.learnProgress||{}; return Object.keys(lp).filter(k=>{const mod=LEARN_MODULES.find(m=>m.id===k);return mod&&mod.content&&lp[k]>=mod.content.length;}).length>=5; } }
];

function checkBadges() {
  if (!progress.badges) progress.badges = [];
  let newBadge = false;
  BADGES.forEach(badge => {
    if (!progress.badges.includes(badge.id) && badge.check()) {
      progress.badges.push(badge.id);
      newBadge = true;
      showToast('Badge earned: ' + badge.title + '!', badge.icon, 5000);
    }
  });
  if (newBadge) saveProgress();
}

function renderBadges() {
  const grid = document.getElementById('badge-grid');
  const panel = document.getElementById('badges-panel');
  const countEl = document.getElementById('badge-count');
  if (!grid || !panel) return;
  const earned = progress.badges || [];
  if (earned.length === 0 && progress.answered.size < 5) { panel.style.display = 'none'; return; }
  panel.style.display = 'block';
  if (countEl) countEl.textContent = earned.length + '/' + BADGES.length;
  grid.innerHTML = BADGES.map(b => {
    const isEarned = earned.includes(b.id);
    return '<div class="badge-item ' + (isEarned ? 'earned' : 'locked') + '" title="' + b.desc + '">' +
      '<span class="badge-icon">' + (isEarned ? b.icon : '🔒') + '</span>' +
      '<span class="badge-name">' + b.title + '</span></div>';
  }).join('');
}

function calculateStreak() {
  const days = progress.streakDays || [];
  if (days.length === 0) return 0;
  const sorted = [...days].sort().reverse();
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const dateStr = d.toISOString().split('T')[0];
    if (sorted.includes(dateStr)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else if (i === 0) {
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function recordDailyActivity() {
  const today = new Date().toISOString().split('T')[0];
  if (!progress.streakDays) progress.streakDays = [];
  if (!progress.streakDays.includes(today)) {
    progress.streakDays.push(today);
    const streak = calculateStreak();
    const milestones = [3, 7, 14, 30];
    milestones.forEach(m => {
      if (streak === m) showToast(streak + '-day streak! Keep going!', streak >= 30 ? '🏆' : streak >= 14 ? '🔥' : streak >= 7 ? '⚡' : '✨', 4000);
    });
  }
}

function updateStreakDisplay() {
  const streak = calculateStreak();
  const ks = document.getElementById('kpi-streak');
  if (ks) ks.textContent = streak;

  // Hero streak badge
  const heroStreakNum = document.getElementById('hero-streak-num');
  if (heroStreakNum) heroStreakNum.textContent = streak;

  // Streak ring (show streak out of 7 as a visual week indicator)
  const circumference = 2 * Math.PI * 26;
  const ringStreak = document.getElementById('ring-streak');
  if (ringStreak) ringStreak.style.strokeDashoffset = circumference * (1 - Math.min(streak, 7) / 7);

  // Weekly dots
  const days = ['M','T','W','T','F','S','S'];
  const sd = document.getElementById('streak-dots');
  if (sd) {
    const today = new Date();
    sd.innerHTML = days.map((d, i) => {
      const check = new Date(today);
      const dayOfWeek = (today.getDay() + 6) % 7;
      check.setDate(check.getDate() - (dayOfWeek - i));
      const dateStr = check.toISOString().split('T')[0];
      const practiced = (progress.streakDays || []).includes(dateStr);
      const isToday = i === dayOfWeek;
      const cls = practiced ? 'done' : isToday ? 'today' : 'empty';
      return '<div class="s-dot ' + cls + '">' + d + '</div>';
    }).join('');
  }
}

function updateDailyGoal() {
  const today = new Date().toISOString().split('T')[0];
  let todayCount = 0;
  Object.values(progress.mastery).forEach(m => {
    if (m.lastSeen) {
      const d = new Date(m.lastSeen).toISOString().split('T')[0];
      if (d === today) todayCount++;
    }
  });
  const goal = progress.dailyGoal || 5;
  const pct = Math.min(100, Math.round(todayCount / goal * 100));
  const fillEl = document.getElementById('daily-goal-fill');
  const textEl = document.getElementById('daily-goal-text');
  const labelEl = document.getElementById('daily-goal-label');
  if (fillEl) fillEl.style.width = pct + '%';
  if (textEl) textEl.textContent = todayCount >= goal ? 'Daily goal reached! Great work.' : 'Answer ' + (goal - todayCount) + ' more to hit your goal.';
  if (labelEl) labelEl.textContent = todayCount + '/' + goal + ' today';

  // Hero goal ring (circumference for r=20 = 125.66)
  var heroRing = document.getElementById('hero-goal-ring');
  var heroText = document.getElementById('hero-goal-text');
  if (heroRing) heroRing.style.strokeDashoffset = 125.66 * (1 - pct / 100);
  if (heroText) heroText.textContent = todayCount + '/' + goal;

  if (todayCount >= goal && !sessionStorage.getItem('goal_celebrated_' + today)) {
    showToast('Daily goal reached! Well done.', '🎯', 4000);
    sessionStorage.setItem('goal_celebrated_' + today, '1');
  }
}

/* ─── LEARNING PATH ─────────────────── */
function renderLearningPath() {
  const container = document.getElementById('learning-path-container');
  if (!container) return;
  const band = progress.userBand || 'intermediate';
  const lp = progress.learnProgress || {};
  const paths = {
    beginner: ['three-statements','working-capital','revenue-recognition','depreciation-noncash','dcf-basics','ev-equity','comps-analysis'],
    intermediate: ['dcf-basics','ev-equity','comps-analysis','precedent-transactions','lbo-mechanics','accretion-dilution','ma-process'],
    advanced: ['terminal-value-sensitivity','debt-structures','lbo-returns','merger-consequences','accretion-dilution'],
    expert: ['debt-structures','lbo-returns','terminal-value-sensitivity','merger-consequences']
  };
  const recommendedPath = paths[band] || paths.intermediate;
  const nextModule = recommendedPath.find(modId => {
    const mod = LEARN_MODULES.find(m => m.id === modId);
    if (!mod || !mod.content) return false;
    const completed = lp[modId] || 0;
    return completed < mod.content.length;
  });
  if (!nextModule) { container.innerHTML = ''; return; }
  const mod = LEARN_MODULES.find(m => m.id === nextModule);
  const completedCount = lp[nextModule] || 0;
  const totalSections = mod.content.length;
  container.innerHTML = '<div class="learning-path-card">' +
    '<div class="lp-title">Up Next: <strong>' + mod.title + '</strong></div>' +
    '<div class="lp-sub">' + mod.desc + '</div>' +
    '<div class="lp-progress">' + completedCount + '/' + totalSections + ' sections completed</div>' +
    '<button class="dash-today-btn" onclick="showView(\'learn\');setTimeout(()=>openLearnModule(\'' + mod.id + '\'),100)" style="margin-top:8px;font-size:12px">' +
    (completedCount > 0 ? 'Continue' : 'Start') + ' →</button></div>';
}

function renderDashPipeline() {
  const el = document.getElementById('dash-pipeline');
  if (!el || typeof INTERNSHIP_DATA === 'undefined') return;
  
  const today = new Date();
  const open = INTERNSHIP_DATA.filter(d => d.status === 'open');
  const upcoming = INTERNSHIP_DATA.filter(d => d.status === 'upcoming');
  const closed = INTERNSHIP_DATA.filter(d => d.status === 'closed');
  
  // Find urgently closing (within 14 days) sorted soonest first
  const closing = open
    .map(d => ({ ...d, daysLeft: Math.ceil((new Date(d.deadline) - today) / (1000*60*60*24)) }))
    .filter(d => d.daysLeft >= 0 && d.daysLeft <= 21)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4);
  
  const savedCount = (typeof applySaved !== 'undefined') ? applySaved.length : 0;
  
  let urgentRows = '';
  if (closing.length) {
    urgentRows = closing.map(d => {
      const dlClass = d.daysLeft <= 7 ? 'urgent' : 'soon';
      const dlText = d.daysLeft === 0 ? 'Today' : d.daysLeft === 1 ? '1 day left' : d.daysLeft + ' days left';
      return '<div class="pipeline-urgent-row" onclick="showView(\'apply\')">' +
        getFirmLogoHTML(d, 26, 'pipeline-urgent-logo') +
        '<div class="pipeline-urgent-info">' +
          '<div class="pipeline-urgent-firm">' + d.firm + '</div>' +
          '<div class="pipeline-urgent-div">' + d.division + '</div>' +
        '</div>' +
        '<span class="pipeline-urgent-deadline ' + dlClass + '">' + dlText + '</span>' +
        '<a class="pipeline-urgent-apply" href="' + d.url + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">Apply</a>' +
      '</div>';
    }).join('');
  } else {
    urgentRows = '<div class="pipeline-empty">No urgent deadlines right now — you\'re ahead of the curve.</div>';
  }
  
  el.innerHTML = `
    <div class="pipeline-header">
      <span class="pipeline-title">⊞ Application Pipeline <span class="pipeline-badge" style="background:var(--accent-dim);color:var(--accent)">SUMMER 2027</span></span>
      <span class="dp-action" onclick="showView('apply')">Full tracker →</span>
    </div>
    <div class="pipeline-summary">
      <div class="pipeline-summary-item" onclick="showView('apply')">
        <div class="pipeline-summary-val" style="color:var(--green)">${open.length}</div>
        <div class="pipeline-summary-label">Open now</div>
      </div>
      <div class="pipeline-summary-item" onclick="showView('apply')">
        <div class="pipeline-summary-val" style="color:var(--amber)">${upcoming.length}</div>
        <div class="pipeline-summary-label">Upcoming</div>
      </div>
      <div class="pipeline-summary-item" onclick="showView('apply')">
        <div class="pipeline-summary-val">${savedCount}</div>
        <div class="pipeline-summary-label">Saved</div>
      </div>
    </div>
    ${closing.length ? '<div style="padding:6px 16px 2px;font-size:10px;color:var(--t-3);font-family:\'Geist Mono\',monospace;letter-spacing:0.06em;text-transform:uppercase">Closing soon</div>' : ''}
    <div class="pipeline-urgents">
      ${urgentRows}
    </div>
  `;
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
  el.innerHTML = progress.activityLog.slice(0, 3).map(a =>
    '<div class="act-item">' +
    '<div class="act-icon" style="background:' + (colors[a.cat]||'var(--bg-3)') + '">' + (icons[a.cat]||'📋') + '</div>' +
    '<div class="act-text">' + (a.title.length > 55 ? a.title.slice(0,55)+'…' : a.title) + '</div>' +
    '<div class="act-time">' + a.time + '</div></div>'
  ).join('');
}

/* ─── NEWS ───────────────────────────── */
const NEWS_POOL = [
  {tag:'M&A',headline:'Goldman Sachs advises on $12B cross-border pharma merger'},
  {tag:'MARKETS',headline:'S&P 500 closes at record high amid strong earnings season'},
  {tag:'RATES',headline:'Fed signals potential rate hold at next FOMC meeting'},
  {tag:'DEALS',headline:'JP Morgan leads $3.5B leveraged loan for PE-backed tech firm'},
  {tag:'MACRO',headline:'US GDP growth revised upward to 2.8% for Q4'},
  {tag:'M&A',headline:'Strategic acquirer pays 35% premium in hostile bid for industrial co'},
  {tag:'DEALS',headline:'Record high-yield issuance as companies refinance ahead of maturity wall'},
  {tag:'MARKETS',headline:'Tech sector rotation drives NASDAQ volatility this week'},
  {tag:'MACRO',headline:'CPI comes in below expectations, boosting rate-cut sentiment'},
  {tag:'M&A',headline:'PE consortium explores $8B take-private of mid-cap retailer'},
  {tag:'RATES',headline:'10-year Treasury yield drops 15bps on soft jobs data'},
  {tag:'DEALS',headline:'Morgan Stanley prices $2B convertible bond for AI startup'},
  {tag:'MACRO',headline:'Euro-area PMI signals manufacturing recovery for third straight month'},
  {tag:'M&A',headline:'Activist investor pushes for strategic review at consumer goods company'},
  {tag:'MARKETS',headline:'IPO market rebounds with three high-profile listings this week'},
  {tag:'DEALS',headline:'Citi leads $5B syndicated credit facility for energy major'},
  {tag:'RATES',headline:'BoE holds rates steady, cites persistent services inflation'},
  {tag:'MACRO',headline:'US unemployment claims fall to six-month low'},
  {tag:'M&A',headline:'Cross-border healthcare deal collapses over antitrust concerns'},
  {tag:'MARKETS',headline:'Small-cap rally extends gains as risk appetite returns'},
  {tag:'DEALS',headline:'Evercore advises on landmark $6B infrastructure privatization'},
  {tag:'MACRO',headline:'China cuts reserve requirement ratio to support slowing economy'},
  {tag:'M&A',headline:'Media sector sees uptick in consolidation amid streaming wars'},
  {tag:'RATES',headline:'Market prices in 75bps of cuts over the next 12 months'},
  {tag:'DEALS',headline:'Lazard advises on $4B carve-out spin-off for conglomerate'}
];

function loadNews() {
  const el = document.getElementById('news-list');
  if (!el) return;
  const cached = localStorage.getItem('superday_news');
  const cacheTime = localStorage.getItem('superday_news_time');
  if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < 30*60*1000) {
    el.innerHTML = cached; return;
  }
  const today = new Date().toDateString();
  let seed = 0;
  for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i);
  const shuffled = [...NEWS_POOL].map((item,idx) => ({item, sort:(seed*31+idx*7)%997}))
    .sort((a,b) => a.sort - b.sort).map(x => x.item);
  const items = shuffled.slice(0,5);
  const times = ['12m ago','34m ago','1h ago','2h ago','3h ago'];
  const html = items.map((n,i) =>
    '<div class="news-item-row">' +
    '<span class="news-tag-pill">' + n.tag + '</span>' +
    '<span class="news-hl">' + n.headline + '</span>' +
    '<span class="news-time-sm">' + times[i] + '</span></div>'
  ).join('');
  el.innerHTML = html;
  localStorage.setItem('superday_news', html);
  localStorage.setItem('superday_news_time', Date.now().toString());
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
  mockCurrentQ = null;
  mockAskedIds = [];
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
  const pool = QUESTIONS.filter(q=>q.cat===cat && !mockAskedIds.includes(q.id));
  const usePool = pool.length > 0 ? pool : QUESTIONS.filter(q=>q.cat===cat);
  const q = usePool[Math.floor(Math.random()*usePool.length)];
  mockCurrentQ = q;
  mockAskedIds.push(q.id);
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

let mockCurrentQ = null;
let mockAskedIds = [];

function scoreMockAnswer(userText, correctAnswer) {
  var userWords = userText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(function(w) { return w.length > 2; });
  var ansWords = correctAnswer.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(function(w) { return w.length > 2; });
  var keyTerms = ansWords.filter(function(w) {
    return !['the','and','are','for','that','this','with','from','have','has','its','not','but','can','will','was','were','been','they','their','what','when','how','which','would','could','should','also','than','more','into','over','such','about'].includes(w);
  });
  if (keyTerms.length === 0) return { tech: 5, structure: 5, confidence: 5 };
  var matched = 0;
  keyTerms.forEach(function(term) {
    if (userWords.some(function(uw) { return uw === term || uw.includes(term) || term.includes(uw); })) matched++;
  });
  var coverage = matched / keyTerms.length;
  var tech = Math.min(10, Math.max(2, Math.round(coverage * 10)));
  var wordCount = userWords.length;
  var structure = wordCount >= 20 ? Math.min(10, 6 + Math.floor(Math.random() * 3)) : wordCount >= 10 ? Math.min(9, 5 + Math.floor(Math.random() * 3)) : Math.min(7, 3 + Math.floor(Math.random() * 3));
  var confidence = wordCount >= 15 ? Math.min(10, 5 + Math.floor(Math.random() * 4)) : Math.min(8, 4 + Math.floor(Math.random() * 3));
  if (tech >= 7) { structure = Math.max(structure, 6); confidence = Math.max(confidence, 6); }
  return { tech: tech, structure: structure, confidence: confidence };
}

function getMockFeedback(scores, correctAnswer, tip) {
  var feedbacks = [];
  if (scores.tech >= 8) {
    feedbacks.push('Strong answer — you hit the key points accurately.');
  } else if (scores.tech >= 6) {
    feedbacks.push('Decent attempt, but you missed some important details.');
  } else if (scores.tech >= 4) {
    feedbacks.push('You\'re on the right track but need to be more precise.');
  } else {
    feedbacks.push('That needs work. Let me walk you through the right approach.');
  }
  if (scores.tech < 8) {
    feedbacks.push('The model answer is: ' + correctAnswer);
  }
  if (tip && scores.tech < 7) {
    feedbacks.push('Tip: ' + tip);
  }
  if (scores.structure <= 5) {
    feedbacks.push('Try to structure your answer more clearly — use a framework or walk through it step by step.');
  }
  return feedbacks.join('<br><br>');
}

async function sendMsg() {
  if (!mockActive) return;
  var ta = document.getElementById('chat-input');
  if (!ta) return;
  var text = ta.value.trim();
  if (!text) return;
  ta.value = ''; ta.style.height = 'auto';
  var sendBtn = document.getElementById('chat-send');
  if (sendBtn) sendBtn.disabled = true;
  appendMsg('user', text);
  mockHistory.push({role:'user', content:text});
  showTyping();

  var catEl = document.getElementById('mock-cat');
  var cat = catEl ? catEl.value : 'tech';

  // Simulate brief thinking delay
  await new Promise(function(r) { setTimeout(r, 800 + Math.random() * 1200); });
  removeTyping();

  // Score the answer against the current question
  var scores = { tech: 6, structure: 6, confidence: 6 };
  if (mockCurrentQ) {
    scores = scoreMockAnswer(text, mockCurrentQ.a);
  }

  // Build feedback
  var feedback = getMockFeedback(scores, mockCurrentQ ? mockCurrentQ.a : '', mockCurrentQ ? mockCurrentQ.tip : '');

  // Score display
  var cc = function(n) { return n >= 8 ? 'sc-g' : n >= 6 ? 'sc-y' : 'sc-r'; };
  var scoreHTML = '<div class="score-block" style="margin-top:8px">' +
    '<div class="score-line"><span class="sc-label">Technical Accuracy</span><span class="sc-val ' + cc(scores.tech) + '">' + scores.tech + '/10</span></div>' +
    '<div class="score-line"><span class="sc-label">Structure &amp; Clarity</span><span class="sc-val ' + cc(scores.structure) + '">' + scores.structure + '/10</span></div>' +
    '<div class="score-line"><span class="sc-label">Confidence</span><span class="sc-val ' + cc(scores.confidence) + '">' + scores.confidence + '/10</span></div></div>';

  // Pick next question (avoid repeats within session)
  var pool = QUESTIONS.filter(function(q) { return q.cat === cat && !mockAskedIds.includes(q.id); });
  if (pool.length === 0) {
    mockAskedIds = [];
    pool = QUESTIONS.filter(function(q) { return q.cat === cat; });
  }
  var nextQ = pool[Math.floor(Math.random() * pool.length)];
  mockAskedIds.push(nextQ.id);
  mockCurrentQ = nextQ;

  var followUp = '<br><br>Next question: ' + nextQ.q;

  var displayReply = feedback + scoreHTML + followUp;
  mockHistory.push({role:'assistant', content: feedback + ' Next question: ' + nextQ.q});

  var body = document.getElementById('chat-body');
  if (body) {
    var div = document.createElement('div');
    div.className = 'chat-msg';
    div.innerHTML = '<div class="cm-av ai">AC</div><div class="cm-bubble ai">' + displayReply + '</div>';
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
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
  
  if (pct === 100 && quizQuestions.length >= 10) {
    progress._perfectQuiz = true;
  }
  updateMasteryStats();
  updateDashStats();
  checkBadges();
  saveProgress();
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

/* ─── KNOWLEDGE MAP ─────────────────── */
/* ─── SVG ICON LIBRARY FOR MAP ──────── */
const MAP_ICONS = {
  target: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  chart: `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  chat: `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  trending: `<svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  dollar: `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  building: `<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="2"/><line x1="15" y1="22" x2="15" y2="2"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`,
  file: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
  calculator: `<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="16" y2="18"/></svg>`,
  layers: `<svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  scale: `<svg viewBox="0 0 24 24"><line x1="12" y1="3" x2="12" y2="21"/><polyline points="4 7 12 3 20 7"/><line x1="4" y1="7" x2="4" y2="13"/><line x1="20" y1="7" x2="20" y2="13"/><path d="M4 13a4 4 0 0 0 4-4"/><path d="M20 13a4 4 0 0 1-4-4"/></svg>`,
  hash: `<svg viewBox="0 0 24 24"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
  scroll: `<svg viewBox="0 0 24 24"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></svg>`,
  compass: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  users: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  award: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  globe: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  barChart: `<svg viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  handshake: `<svg viewBox="0 0 24 24"><path d="M11 17l-5-5"/><path d="M20 7l-9 9-4-4"/><path d="M4 12l3-3"/><path d="M15 6l5 5"/><polyline points="2 15 7 10"/><polyline points="17 2 22 7"/></svg>`,
};

const KNOWLEDGE_NODES = [
  // Central node
  { id: 'center', title: 'IB Interview', icon: 'target', x: 1500, y: 1000, central: true },
  
  // Main categories (ring 1) — spaced wide for pan/scroll
  { id: 'tech', title: 'Technical', icon: 'chart', x: 1500, y: 500, parent: 'center', cat: 'tech' },
  { id: 'beh', title: 'Behavioral', icon: 'chat', x: 2200, y: 800, parent: 'center', cat: 'beh' },
  { id: 'deal', title: 'Markets', icon: 'trending', x: 1500, y: 1500, parent: 'center', cat: 'deal' },
  { id: 'brain', title: 'Brain Teasers', icon: 'hash', x: 800, y: 800, parent: 'center', cat: 'brain' },
  
  // Technical subtopics (ring 2)
  { id: 'accounting', title: 'Accounting', icon: 'clipboard', x: 900, y: 300, parent: 'tech', sub: 'accounting' },
  { id: 'valuation', title: 'Valuation', icon: 'dollar', x: 1500, y: 200, parent: 'tech', sub: 'valuation' },
  { id: 'lbo', title: 'LBO', icon: 'building', x: 2100, y: 300, parent: 'tech', sub: 'lbo' },
  { id: 'ma-tech', title: 'M&A', icon: 'handshake', x: 2400, y: 500, parent: 'tech', sub: 'ma' },
  
  // Accounting topics (ring 3)
  { id: 'acc-fs', title: '3 Statements', icon: 'file', x: 500, y: 180, parent: 'accounting', sub: 'accounting' },
  { id: 'acc-wc', title: 'Working Capital', icon: 'refresh', x: 700, y: 100, parent: 'accounting', sub: 'accounting' },
  
  // Valuation topics (ring 3)
  { id: 'val-dcf', title: 'DCF', icon: 'calculator', x: 1200, y: 50, parent: 'valuation', sub: 'valuation' },
  { id: 'val-comps', title: 'Comps', icon: 'layers', x: 1500, y: 30, parent: 'valuation', sub: 'valuation' },
  { id: 'val-wacc', title: 'WACC', icon: 'scale', x: 1800, y: 50, parent: 'valuation', sub: 'valuation' },
  
  // LBO topics (ring 3)
  { id: 'lbo-model', title: 'LBO Model', icon: 'hash', x: 2400, y: 150, parent: 'lbo', sub: 'lbo' },
  { id: 'lbo-debt', title: 'Debt Structure', icon: 'scroll', x: 2550, y: 350, parent: 'lbo', sub: 'lbo' },
  
  // M&A topics (ring 3)
  { id: 'ma-process', title: 'M&A Process', icon: 'file', x: 2700, y: 450, parent: 'ma-tech', sub: 'ma' },
  { id: 'ma-accrdil', title: 'Accretion/Dilution', icon: 'scale', x: 2650, y: 650, parent: 'ma-tech', sub: 'ma' },
  
  // Brain Teaser topics (ring 2)
  { id: 'brain-market', title: 'Market Sizing', icon: 'globe', x: 400, y: 650, parent: 'brain', cat: 'brain' },
  { id: 'brain-math', title: 'Mental Math', icon: 'calculator', x: 350, y: 900, parent: 'brain', cat: 'brain' },
  { id: 'brain-logic', title: 'Logic Puzzles', icon: 'compass', x: 450, y: 1100, parent: 'brain', cat: 'brain' },
  
  // Behavioral topics (ring 2)
  { id: 'beh-fit', title: 'Why IB', icon: 'compass', x: 2550, y: 650, parent: 'beh', cat: 'beh' },
  { id: 'beh-team', title: 'Teamwork', icon: 'users', x: 2650, y: 850, parent: 'beh', cat: 'beh' },
  { id: 'beh-lead', title: 'Leadership', icon: 'award', x: 2550, y: 1050, parent: 'beh', cat: 'beh' },
  
  // Markets topics (ring 2)
  { id: 'macro', title: 'Macro', icon: 'globe', x: 1000, y: 1650, parent: 'deal', cat: 'deal' },
  { id: 'rates', title: 'Rates & Bonds', icon: 'barChart', x: 1500, y: 1750, parent: 'deal', cat: 'deal' },
  { id: 'deal-ib', title: 'IB Industry', icon: 'building', x: 2000, y: 1650, parent: 'deal', cat: 'deal' },
];

/* ─── MAP STATE ─────────────────────── */
let mapState = { x: 0, y: 0, scale: 1, dragging: false, startX: 0, startY: 0, startPanX: 0, startPanY: 0 };
const MAP_MIN_SCALE = 0.25;
const MAP_MAX_SCALE = 2.5;

function renderKnowledgeMap() {
  const container = document.getElementById('map-container');
  const canvas = document.getElementById('map-canvas');
  const svg = document.getElementById('map-svg');
  if (!canvas || !svg) return;
  
  // Clear existing nodes (keep grid)
  canvas.querySelectorAll('.map-node').forEach(n => n.remove());
  svg.innerHTML = '';
  
  // Draw curved edges
  KNOWLEDGE_NODES.forEach(node => {
    if (!node.parent) return;
    const parent = KNOWLEDGE_NODES.find(n => n.id === node.parent);
    if (!parent) return;
    
    const nodeStatus = getNodeStatus(node);
    const parentStatus = getNodeStatus(parent);
    const isActive = nodeStatus !== 'new' || parentStatus !== 'new';
    
    // Glow layer
    const glow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = buildCurve(parent.x, parent.y, node.x, node.y);
    glow.setAttribute('d', d);
    glow.setAttribute('class', 'map-edge-glow' + (isActive ? ' active' : ''));
    svg.appendChild(glow);
    
    // Main edge
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'map-edge' + (isActive ? ' active' : ''));
    svg.appendChild(path);
  });
  
  // Draw nodes
  KNOWLEDGE_NODES.forEach(node => {
    const div = document.createElement('div');
    div.className = 'map-node';
    if (node.central) div.classList.add('central');
    
    const status = getNodeStatus(node);
    if (status === 'mastered') div.classList.add('mastered');
    else if (status === 'learning') div.classList.add('learning');
    
    const progress = getNodeProgress(node);
    const color = node.central ? 'var(--accent)' : 
                  status === 'mastered' ? 'var(--green)' : 
                  status === 'learning' ? 'var(--amber)' : 'var(--bg-4)';
    
    const iconSvg = MAP_ICONS[node.icon] || MAP_ICONS.target;
    
    div.innerHTML = `
      <div class="map-node-inner">
        <div class="map-node-icon-wrap">${iconSvg}</div>
        <div class="map-node-title">${node.title}</div>
        <div class="map-node-sub">${progress.done}/${progress.total}</div>
        <div class="map-node-progress">
          <div class="map-node-progress-fill" style="width:${progress.pct}%;background:${color}"></div>
        </div>
      </div>
    `;
    
    div.style.left = node.x + 'px';
    div.style.top = node.y + 'px';
    div.style.transform = 'translate(-50%, -50%)';
    
    if (!node.central) {
      div.onclick = (e) => {
        e.stopPropagation();
        if (node.sub) {
          document.getElementById('quiz-cat-select').value = 'tech';
          showView('quiz');
        } else if (node.cat) {
          document.getElementById('quiz-cat-select').value = node.cat;
          showView('quiz');
        }
      };
    }
    
    canvas.appendChild(div);
  });
  
  // Init pan/zoom
  mapInitView();
  mapUpdateMinimap();
}

function buildCurve(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const offset = dist * 0.15;
  // Perpendicular offset for a gentle curve
  const nx = -dy / dist * offset;
  const ny = dx / dist * offset;
  return `M${x1},${y1} Q${mx + nx},${my + ny} ${x2},${y2}`;
}

function mapInitView() {
  const container = document.getElementById('map-container');
  if (!container) return;
  const cw = container.offsetWidth;
  const ch = container.offsetHeight;
  // Center on the main node
  mapState.scale = 0.55;
  mapState.x = cw / 2 - 1500 * mapState.scale;
  mapState.y = ch / 2 - 1000 * mapState.scale;
  mapApplyTransform();
}

function mapApplyTransform() {
  const canvas = document.getElementById('map-canvas');
  if (!canvas) return;
  canvas.style.transform = `translate(${mapState.x}px, ${mapState.y}px) scale(${mapState.scale})`;
  const label = document.getElementById('map-zoom-label');
  if (label) label.textContent = Math.round(mapState.scale * 100) + '%';
  mapUpdateMinimap();
}

function mapZoom(delta, cx, cy) {
  const container = document.getElementById('map-container');
  if (!container) return;
  const oldScale = mapState.scale;
  mapState.scale = Math.min(MAP_MAX_SCALE, Math.max(MAP_MIN_SCALE, mapState.scale + delta));
  
  // Zoom toward point (or center)
  if (cx === undefined) {
    cx = container.offsetWidth / 2;
    cy = container.offsetHeight / 2;
  }
  const ratio = mapState.scale / oldScale;
  mapState.x = cx - ratio * (cx - mapState.x);
  mapState.y = cy - ratio * (cy - mapState.y);
  mapApplyTransform();
}

function mapFitAll() {
  const container = document.getElementById('map-container');
  if (!container) return;
  const cw = container.offsetWidth;
  const ch = container.offsetHeight;
  // Bounding box of all nodes
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  KNOWLEDGE_NODES.forEach(n => {
    if (n.x < minX) minX = n.x;
    if (n.y < minY) minY = n.y;
    if (n.x > maxX) maxX = n.x;
    if (n.y > maxY) maxY = n.y;
  });
  const pad = 120;
  minX -= pad; minY -= pad; maxX += pad; maxY += pad;
  const bw = maxX - minX;
  const bh = maxY - minY;
  mapState.scale = Math.min(cw / bw, ch / bh, 1.2);
  mapState.x = (cw - bw * mapState.scale) / 2 - minX * mapState.scale;
  mapState.y = (ch - bh * mapState.scale) / 2 - minY * mapState.scale;
  mapApplyTransform();
}

function mapResetView() { mapInitView(); }

// Pan/zoom event wiring
(function() {
  let raf;
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('map-container');
    if (!container) return;
    
    // Mouse drag to pan
    container.addEventListener('mousedown', e => {
      if (e.target.closest('.map-node') || e.target.closest('.map-hud') || e.target.closest('.map-legend') || e.target.closest('.map-minimap')) return;
      mapState.dragging = true;
      mapState.startX = e.clientX;
      mapState.startY = e.clientY;
      mapState.startPanX = mapState.x;
      mapState.startPanY = mapState.y;
      container.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', e => {
      if (!mapState.dragging) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        mapState.x = mapState.startPanX + (e.clientX - mapState.startX);
        mapState.y = mapState.startPanY + (e.clientY - mapState.startY);
        mapApplyTransform();
      });
    });
    window.addEventListener('mouseup', () => {
      mapState.dragging = false;
      const container = document.getElementById('map-container');
      if (container) container.style.cursor = '';
    });
    
    // Scroll to zoom
    container.addEventListener('wheel', e => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const delta = -e.deltaY * 0.001 * mapState.scale;
      mapZoom(delta, cx, cy);
    }, { passive: false });
    
    // Touch support
    let lastTouchDist = 0;
    let lastTouchCenter = null;
    container.addEventListener('touchstart', e => {
      if (e.target.closest('.map-node') || e.target.closest('.map-hud')) return;
      if (e.touches.length === 1) {
        mapState.dragging = true;
        mapState.startX = e.touches[0].clientX;
        mapState.startY = e.touches[0].clientY;
        mapState.startPanX = mapState.x;
        mapState.startPanY = mapState.y;
      } else if (e.touches.length === 2) {
        mapState.dragging = false;
        lastTouchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        lastTouchCenter = { x: (e.touches[0].clientX + e.touches[1].clientX) / 2, y: (e.touches[0].clientY + e.touches[1].clientY) / 2 };
      }
    }, { passive: false });
    container.addEventListener('touchmove', e => {
      e.preventDefault();
      if (e.touches.length === 1 && mapState.dragging) {
        mapState.x = mapState.startPanX + (e.touches[0].clientX - mapState.startX);
        mapState.y = mapState.startPanY + (e.touches[0].clientY - mapState.startY);
        mapApplyTransform();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        const delta = (dist - lastTouchDist) * 0.003;
        const rect = container.getBoundingClientRect();
        const cx = lastTouchCenter.x - rect.left;
        const cy = lastTouchCenter.y - rect.top;
        mapZoom(delta, cx, cy);
        lastTouchDist = dist;
      }
    }, { passive: false });
    container.addEventListener('touchend', () => { mapState.dragging = false; });
  });
})();

function mapUpdateMinimap() {
  const minimapCanvas = document.getElementById('minimap-canvas');
  const viewport = document.getElementById('minimap-viewport');
  const container = document.getElementById('map-container');
  if (!minimapCanvas || !viewport || !container) return;
  
  const ctx = minimapCanvas.getContext('2d');
  const mw = 160, mh = 100;
  const worldW = 3000, worldH = 2000;
  const sx = mw / worldW, sy = mh / worldH;
  
  ctx.clearRect(0, 0, mw, mh);
  
  // Draw edges
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--line-2').trim() || 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 0.5;
  KNOWLEDGE_NODES.forEach(node => {
    if (!node.parent) return;
    const parent = KNOWLEDGE_NODES.find(n => n.id === node.parent);
    if (!parent) return;
    ctx.beginPath();
    ctx.moveTo(parent.x * sx, parent.y * sy);
    ctx.lineTo(node.x * sx, node.y * sy);
    ctx.stroke();
  });
  
  // Draw dots
  KNOWLEDGE_NODES.forEach(node => {
    const status = getNodeStatus(node);
    ctx.fillStyle = node.central ? '#5E6AD2' : status === 'mastered' ? '#2CB67D' : status === 'learning' ? '#E09A3B' : 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.arc(node.x * sx, node.y * sy, node.central ? 3 : 2, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Viewport rect
  const cw = container.offsetWidth;
  const ch = container.offsetHeight;
  const vx = (-mapState.x / mapState.scale) * sx;
  const vy = (-mapState.y / mapState.scale) * sy;
  const vw = (cw / mapState.scale) * sx;
  const vh = (ch / mapState.scale) * sy;
  viewport.style.left = Math.max(0, vx) + 'px';
  viewport.style.top = Math.max(0, vy) + 'px';
  viewport.style.width = Math.min(mw, vw) + 'px';
  viewport.style.height = Math.min(mh, vh) + 'px';
}

function getNodeStatus(node) {
  const questions = getNodeQuestions(node);
  if (!questions.length) return 'new';
  
  const mastered = questions.filter(q => getMasteryClass(q.id) === 'mastered').length;
  const learning = questions.filter(q => getMasteryClass(q.id) === 'learning').length;
  
  if (mastered === questions.length) return 'mastered';
  if (mastered > 0 || learning > 0) return 'learning';
  return 'new';
}

function getNodeProgress(node) {
  const questions = getNodeQuestions(node);
  if (!questions.length) return { done: 0, total: 0, pct: 0 };
  
  const mastered = questions.filter(q => getMasteryClass(q.id) === 'mastered').length;
  return {
    done: mastered,
    total: questions.length,
    pct: Math.round((mastered / questions.length) * 100)
  };
}

function getNodeQuestions(node) {
  if (node.central) return QUESTIONS;
  if (node.sub) return QUESTIONS.filter(q => q.sub === node.sub);
  if (node.cat) return QUESTIONS.filter(q => q.cat === node.cat);
  return [];
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
const LEARN_MODULES = [
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
  },
  {
    id: 'accretion-dilution',
    title: 'Accretion / Dilution',
    icon: '🔄',
    desc: 'Will an acquisition increase or decrease EPS? The M&A math you must know.',
    time: '15 min',
    sections: 3,
    category: 'ma',
    content: [
      {
        title: 'What is Accretion / Dilution?',
        icon: '🎯',
        text: 'An accretion/dilution analysis determines whether a proposed acquisition will increase (accrete) or decrease (dilute) the acquirer\'s Earnings Per Share (EPS). If pro forma EPS > acquirer\'s standalone EPS, the deal is accretive. If lower, it\'s dilutive. This is one of the first things a board asks about any deal.',
        visual: {
          title: 'ACCRETIVE vs. DILUTIVE',
          type: 'two-column',
          left: { label: 'ACCRETIVE', items: ['Pro Forma EPS > Standalone EPS', 'Deal adds value per share', 'Generally favorable to shareholders'] },
          right: { label: 'DILUTIVE', items: ['Pro Forma EPS < Standalone EPS', 'Deal reduces value per share', 'Must justify with strategic rationale'] }
        },
        tip: {
          title: 'Quick P/E Test',
          text: 'If the acquirer\'s P/E is higher than the target\'s P/E, an all-stock deal is accretive. If lower, it\'s dilutive. This shortcut works because a high P/E buyer is "paying" less in earnings per dollar of price.'
        }
      },
      {
        title: 'The Math Step by Step',
        icon: '🔢',
        text: 'Step 1: Calculate combined Net Income (acquirer NI + target NI + synergies - new interest expense if debt-financed - any incremental D&A from write-ups). Step 2: Calculate new shares outstanding (acquirer shares + any new shares issued to target shareholders). Step 3: Pro Forma EPS = Combined NI / New Shares. Step 4: Compare to acquirer\'s standalone EPS.',
        formula: 'Pro Forma EPS = (Acquirer NI + Target NI + Synergies - Financing Costs) / (Acquirer Shares + New Shares Issued)',
        trap: {
          title: 'Common Mistake',
          text: 'Candidates forget to subtract the financing cost of debt used to fund the deal. If you borrow $500M at 5%, that\'s $25M in pre-tax interest expense reducing combined NI. After tax at 25%, that\'s ~$19M less in earnings.'
        }
      },
      {
        title: 'Advanced Considerations',
        icon: '⚡',
        text: 'Real-world accretion/dilution analysis is more nuanced. You must account for: (1) the mix of cash vs. stock consideration, (2) synergies and their phase-in timeline, (3) transaction costs and fees, (4) goodwill creation and any asset write-ups that create incremental D&A, and (5) the forgone interest income on cash used. A deal can be dilutive in Year 1 but accretive by Year 3 once synergies are realized.',
        tip: {
          title: 'Interview Delivery',
          text: 'Structure your answer: "First I\'d calculate combined earnings, adjusting for synergies and financing costs. Then I\'d calculate new share count. Finally I\'d compare pro forma EPS to standalone." This shows a methodical approach.'
        }
      }
    ]
  },
  {
    id: 'working-capital',
    title: 'Working Capital Deep Dive',
    icon: '💵',
    desc: 'AR, AP, Inventory — how they affect cash flow and why bankers obsess over NWC.',
    time: '12 min',
    sections: 3,
    category: 'accounting',
    content: [
      {
        title: 'Components of NWC',
        icon: '🧩',
        text: 'Net Working Capital (NWC) = Current Assets minus Current Liabilities. The main components are Accounts Receivable (money owed to you by customers), Inventory (goods waiting to be sold), and Accounts Payable (money you owe suppliers). Other items include prepaid expenses, accrued liabilities, and deferred revenue.',
        formula: 'NWC = Current Assets - Current Liabilities\nOperating NWC = (AR + Inventory) - (AP + Accrued Liabilities)',
        visual: {
          title: 'NWC COMPONENTS',
          type: 'two-column',
          left: { label: 'CURRENT ASSETS', items: ['Accounts Receivable', 'Inventory', 'Prepaid Expenses'] },
          right: { label: 'CURRENT LIABILITIES', items: ['Accounts Payable', 'Accrued Expenses', 'Deferred Revenue'] }
        }
      },
      {
        title: 'NWC and Cash Flow',
        icon: '💧',
        text: 'Changes in NWC directly impact operating cash flow. An increase in NWC uses cash (you\'re tying up more money in operations). A decrease in NWC frees cash. This is why a fast-growing company can be profitable but cash-strapped — revenue growth drives AR and inventory higher, consuming cash.',
        visual: {
          title: 'NWC IMPACT ON CASH',
          type: 'flow',
          items: [
            { label: 'AR INCREASES', val: 'Cash decreases (uncollected revenue)', highlight: true },
            { label: 'INVENTORY INCREASES', val: 'Cash decreases (bought but unsold)', highlight: true },
            { label: 'AP INCREASES', val: 'Cash increases (delayed payment)', highlight: false }
          ]
        },
        trap: {
          title: 'Sign Convention',
          text: 'The most common mistake: getting the sign wrong. On the CFS, an INCREASE in a current asset is a NEGATIVE adjustment (uses cash). An INCREASE in a current liability is POSITIVE (source of cash). Remember: assets up = cash down.'
        }
      },
      {
        title: 'NWC in Financial Models',
        icon: '📊',
        text: 'In DCF models, NWC is typically projected as a percentage of revenue. If NWC has historically been 10% of revenue, you project future NWC at ~10% and calculate the year-over-year change to include in Free Cash Flow. Some businesses have negative NWC (like subscription companies that collect cash before delivering services) — this means growth actually generates cash.',
        formula: 'Projected NWC = Revenue x NWC-as-%-of-Revenue\nChange in NWC = Current Year NWC - Prior Year NWC\nFCF impact: subtract change in NWC (increase = cash outflow)',
        tip: {
          title: 'Interview Insight',
          text: 'If asked "name a company with negative working capital," think Amazon (collects from customers immediately, pays suppliers on 60-90 day terms) or insurance companies (collect premiums before paying claims).'
        }
      }
    ]
  },
  {
    id: 'revenue-recognition',
    title: 'Revenue Recognition & Accruals',
    icon: '📋',
    desc: 'When does revenue count? Accrual vs cash accounting and the ASC 606 framework.',
    time: '15 min',
    sections: 3,
    category: 'accounting',
    content: [
      {
        title: 'Accrual vs. Cash Basis',
        icon: '⚖️',
        text: 'Under cash accounting, you record revenue when cash arrives and expenses when cash leaves. Under accrual accounting (required by GAAP/IFRS for public companies), you record revenue when earned and expenses when incurred, regardless of cash timing. This means a company can report high revenue but have no cash if customers haven\'t paid yet.',
        visual: {
          title: 'CASH vs. ACCRUAL',
          type: 'two-column',
          left: { label: 'CASH BASIS', items: ['Record when cash received', 'Simple but misleading', 'Used by small businesses'] },
          right: { label: 'ACCRUAL BASIS', items: ['Record when earned/incurred', 'Matches revenue to effort', 'Required for public companies'] }
        },
        tip: {
          title: 'Why It Matters',
          text: 'Accrual accounting is why the Cash Flow Statement exists — it reconciles accounting profit back to actual cash movement.'
        }
      },
      {
        title: 'ASC 606: Five-Step Model',
        icon: '📝',
        text: 'ASC 606 (IFRS 15 internationally) provides a unified framework for when to recognize revenue. The five steps are: (1) Identify the contract, (2) Identify performance obligations, (3) Determine the transaction price, (4) Allocate the price to obligations, (5) Recognize revenue when/as obligations are satisfied.',
        visual: {
          title: 'ASC 606 FIVE STEPS',
          type: 'flow',
          items: [
            { label: 'STEP 1', val: 'Identify the contract with the customer', highlight: false },
            { label: 'STEP 2', val: 'Identify performance obligations', highlight: false },
            { label: 'STEP 3', val: 'Determine transaction price', highlight: false },
            { label: 'STEP 4', val: 'Allocate price to obligations', highlight: false },
            { label: 'STEP 5', val: 'Recognize when obligations satisfied', highlight: true }
          ]
        }
      },
      {
        title: 'Common Revenue Traps',
        icon: '⚠️',
        text: 'Deferred revenue (a liability) arises when a company collects cash before delivering goods/services — common in SaaS, subscriptions, and gift cards. Unbilled revenue (an asset) occurs when services have been performed but not yet invoiced. Understanding these timing differences is critical for analyzing cash flow quality.',
        visual: {
          title: 'TIMING DIFFERENCES',
          type: 'two-column',
          left: { label: 'DEFERRED REVENUE', items: ['Cash received early', 'Liability on Balance Sheet', 'Example: annual SaaS subscription'] },
          right: { label: 'UNBILLED REVENUE', items: ['Service delivered, not invoiced', 'Asset on Balance Sheet', 'Example: consulting work in progress'] }
        },
        trap: {
          title: 'Interview Trap',
          text: 'If asked "is deferred revenue good or bad?" — it\'s actually good! It means customers are paying you in advance. Growing deferred revenue is a sign of business momentum, especially in SaaS.'
        }
      }
    ]
  },
  {
    id: 'depreciation-noncash',
    title: 'Depreciation & Non-Cash Charges',
    icon: '📉',
    desc: 'Why non-cash charges matter for valuation, taxes, and free cash flow.',
    time: '12 min',
    sections: 3,
    category: 'accounting',
    content: [
      {
        title: 'What Are Non-Cash Charges?',
        icon: '💡',
        text: 'Non-cash charges are expenses on the Income Statement that don\'t involve actual cash outflow. The most common are: Depreciation (allocating tangible asset cost over useful life), Amortization (same for intangible assets), Stock-Based Compensation (value of equity grants to employees), and Impairment/Write-Downs (reducing asset value to fair market value).',
        visual: {
          title: 'NON-CASH CHARGES THROUGH THE STATEMENTS',
          type: 'flow',
          items: [
            { label: 'INCOME STATEMENT', val: 'Reduces pre-tax income (expense)', highlight: false },
            { label: 'CASH FLOW STATEMENT', val: 'Added back in operating section', highlight: true },
            { label: 'BALANCE SHEET', val: 'Reduces asset value (accumulated depreciation)', highlight: false }
          ]
        }
      },
      {
        title: 'Depreciation Methods',
        icon: '📐',
        text: 'Straight-line depreciation spreads the cost evenly: (Cost - Salvage Value) / Useful Life = annual expense. Accelerated methods (double-declining balance, MACRS for tax) front-load more expense in early years. Companies often use straight-line for book reporting and accelerated for tax returns, creating a Deferred Tax Liability.',
        formula: 'Straight-Line: Annual Dep = (Cost - Salvage) / Useful Life\nDouble-Declining: Annual Dep = 2 x (1/Life) x Book Value',
        visual: {
          title: 'STRAIGHT-LINE vs. ACCELERATED',
          type: 'two-column',
          left: { label: 'STRAIGHT-LINE', items: ['Equal expense each year', 'Used for book (GAAP) reporting', 'Higher taxable income early on'] },
          right: { label: 'ACCELERATED', items: ['Higher expense in early years', 'Used for tax reporting', 'Creates deferred tax liability'] }
        },
        trap: {
          title: 'DTL Creation',
          text: 'When book depreciation < tax depreciation, the company reports higher income on books than on tax returns, creating a DTL. This reverses in later years when book depreciation > tax depreciation.'
        }
      },
      {
        title: 'Impact on Valuation',
        icon: '💰',
        text: 'D&A matters for valuation because EBITDA adds it back — making EBITDA a pre-depreciation measure of operating performance. In FCF calculations, D&A is added back (non-cash) but CapEx is subtracted (the actual cash spent on assets). The tax shield from depreciation (D&A x Tax Rate) increases cash flow without any real cash expense.',
        formula: 'Tax Shield = Depreciation x Tax Rate\nFCF = EBIT(1-T) + D&A - CapEx - Change in NWC\nNote: D&A add-back partially offset by CapEx subtraction',
        tip: {
          title: 'Adjusted EBITDA Warning',
          text: 'In M&A, companies present "Adjusted EBITDA" that adds back SBC, restructuring, and one-time items. Always scrutinize what\'s being added back — aggressive add-backs inflate the multiple and overstate operating performance.'
        }
      }
    ]
  },
  {
    id: 'comps-analysis',
    title: 'Comparable Companies Analysis',
    icon: '📊',
    desc: 'How to select peers, spread comps, and derive a market-based valuation.',
    time: '20 min',
    sections: 4,
    category: 'valuation',
    content: [
      {
        title: 'What Are Comps?',
        icon: '🎯',
        text: 'Comparable companies analysis (comps) values a company by looking at how similar publicly traded companies are valued. You calculate trading multiples (like EV/EBITDA or P/E) for a set of peer companies, then apply those multiples to the target\'s financials. It\'s a market-based, relative valuation — it tells you what the market is willing to pay for businesses like yours.',
        visual: {
          title: 'COMPS PROCESS',
          type: 'flow',
          items: [
            { label: 'STEP 1', val: 'Select peer group', highlight: false },
            { label: 'STEP 2', val: 'Calculate trading multiples', highlight: false },
            { label: 'STEP 3', val: 'Determine relevant statistics', highlight: false },
            { label: 'STEP 4', val: 'Apply to target', highlight: true }
          ]
        },
        tip: {
          title: 'When to Use',
          text: 'Comps are best for quick, market-based valuations. They reflect current market sentiment but can be distorted by market bubbles or crashes.'
        }
      },
      {
        title: 'Selecting the Peer Group',
        icon: '🔍',
        text: 'The peer group should include 5-10 companies that are truly comparable. Key criteria: same industry/sector, similar business model, comparable size (revenue, market cap), similar growth rates, overlapping geographies, and comparable margin profiles. A bad peer set ruins the entire analysis — this is where the "art" comes in.',
        visual: {
          title: 'GOOD vs. BAD PEER SELECTION',
          type: 'two-column',
          left: { label: 'STRONG CRITERIA', items: ['Same industry sub-sector', 'Similar revenue scale (0.5x-2x)', 'Comparable growth & margins', 'Same geographic exposure'] },
          right: { label: 'WEAK CRITERIA', items: ['Same broad sector only', 'Vastly different size', 'Different business models', 'Different growth stages'] }
        }
      },
      {
        title: 'Spreading Comps',
        icon: '📋',
        text: '"Spreading comps" means building a table of key metrics for each peer: Enterprise Value, Equity Value, Revenue, EBITDA, EBIT, Net Income, and the resulting multiples (EV/Revenue, EV/EBITDA, P/E). Use forward (NTM) estimates from consensus, not trailing numbers. Calculate the mean and median of each multiple.',
        formula: 'Key Multiples:\nEV/Revenue = Enterprise Value / Revenue\nEV/EBITDA = Enterprise Value / EBITDA\nP/E = Share Price / Earnings Per Share',
        tip: {
          title: 'Mean vs. Median',
          text: 'Use the median, not the mean. Outliers (one peer trading at 25x EBITDA when others are at 8-10x) will skew the mean. The median gives you the middle value and is more representative.'
        }
      },
      {
        title: 'Applying Comps to the Target',
        icon: '🎯',
        text: 'Apply the median (or selected range of) multiples to the target\'s corresponding metric. For example: if median EV/EBITDA is 9.0x and the target\'s EBITDA is $200M, implied EV = $1.8B. Then bridge from EV to equity value. Always present a range, not a point estimate.',
        formula: 'Implied Enterprise Value = Median Multiple x Target Metric\nImplied Equity Value = Implied EV - Net Debt\nImplied Share Price = Implied Equity Value / Diluted Shares',
        trap: {
          title: 'Stale Data',
          text: 'Comps reflect current market conditions. If the market is in a bubble, all multiples are elevated and your valuation will be inflated. Always note market conditions and consider using a range of historical averages alongside current multiples.'
        }
      }
    ]
  },
  {
    id: 'precedent-transactions',
    title: 'Precedent Transactions',
    icon: '🤝',
    desc: 'Valuing a company based on what buyers have paid for similar businesses.',
    time: '15 min',
    sections: 3,
    category: 'valuation',
    content: [
      {
        title: 'What Are Precedent Transactions?',
        icon: '🎯',
        text: 'Precedent transactions analysis looks at prices paid in past M&A deals for comparable companies. Unlike comps (which use current trading multiples), precedents capture what buyers actually paid, including a control premium. This typically yields higher valuations than comps because acquirers pay above market price to gain control.',
        visual: {
          title: 'COMPS vs. PRECEDENTS',
          type: 'two-column',
          left: { label: 'TRADING COMPS', items: ['Current market multiples', 'Minority stake implied', 'No control premium', 'More data points available'] },
          right: { label: 'PRECEDENT TRANSACTIONS', items: ['Historical deal multiples', 'Control stake implied', 'Includes 20-40% premium', 'Fewer relevant data points'] }
        }
      },
      {
        title: 'Finding and Screening Deals',
        icon: '🔍',
        text: 'Search for relevant transactions using databases (Capital IQ, Bloomberg, Dealogic). Screen by: same industry, similar deal size, recent transactions (ideally within 3-5 years), and similar deal type (strategic vs. financial buyer). For each deal, calculate the implied multiples: EV/Revenue, EV/EBITDA at the transaction price.',
        formula: 'Implied Premium = (Offer Price - Unaffected Price) / Unaffected Price\nImplied EV/EBITDA = Transaction Enterprise Value / LTM EBITDA',
        tip: {
          title: 'Control Premium',
          text: 'The control premium (typically 20-40%) reflects the value of owning 100% of a company: the ability to make strategic decisions, realize synergies, and control cash flows. It explains why precedents yield higher values than comps.'
        }
      },
      {
        title: 'Interpreting Results',
        icon: '📈',
        text: 'Precedent transaction multiples are influenced by deal-specific factors: competitive bidding processes drive prices up, distressed sales drive them down, synergy expectations vary by buyer. Always contextualize each deal — a precedent from a low-rate environment may not apply in a high-rate one. Present a range and explain the key transactions.',
        trap: {
          title: 'Stale Deals',
          text: 'Old transactions (5+ years) may reflect very different market conditions (interest rates, regulatory environment, industry dynamics). Weight recent deals more heavily and note the macro context of older precedents.'
        }
      }
    ]
  },
  {
    id: 'terminal-value-sensitivity',
    title: 'Terminal Value & Sensitivity',
    icon: '♾️',
    desc: 'The two methods for terminal value and why sensitivity analysis is critical.',
    time: '15 min',
    sections: 3,
    category: 'valuation',
    content: [
      {
        title: 'Two Methods for Terminal Value',
        icon: '🔀',
        text: 'Terminal Value captures a company\'s value beyond the explicit projection period (typically 5-10 years). Method 1: Gordon Growth Model — assumes FCFs grow at a constant rate forever. Method 2: Exit Multiple — applies a multiple (e.g., EV/EBITDA) to the final year\'s metric. Both should give roughly similar results; if they diverge significantly, revisit your assumptions.',
        visual: {
          title: 'GORDON GROWTH vs. EXIT MULTIPLE',
          type: 'two-column',
          left: { label: 'GORDON GROWTH', items: ['TV = FCF x (1+g) / (WACC - g)', 'Growth rate must be < WACC', 'Use 2-3% (GDP-level growth)', 'More theoretically sound'] },
          right: { label: 'EXIT MULTIPLE', items: ['TV = Final Year EBITDA x Multiple', 'Multiple from comps analysis', 'More practical and intuitive', 'Circular if using current comps'] }
        }
      },
      {
        title: 'Why Terminal Value Dominates',
        icon: '⚠️',
        text: 'Terminal Value typically represents 60-80% of total Enterprise Value in a DCF. This means your valuation is highly sensitive to terminal assumptions — a small change in growth rate or exit multiple can swing the valuation by 20%+. This is both the power and weakness of DCF: most of the value comes from the least certain assumptions.',
        formula: 'If WACC = 10% and g = 3%:\nTV = $100M x 1.03 / (0.10 - 0.03) = $1,471M\n\nIf g changes to 2.5%:\nTV = $100M x 1.025 / (0.10 - 0.025) = $1,367M\n(7% drop in TV from just 0.5% change in g)',
        tip: {
          title: 'Interview Insight',
          text: 'When asked "what are the weaknesses of a DCF?" — the dominance of terminal value is the top answer. Show you understand this by always presenting a sensitivity table.'
        }
      },
      {
        title: 'Building a Sensitivity Table',
        icon: '📊',
        text: 'A sensitivity table (or data table) shows how implied valuation changes across a range of key assumptions. The classic DCF sensitivity table uses WACC on one axis and terminal growth rate (or exit multiple) on the other. This gives stakeholders a range of outcomes rather than a single point estimate.',
        formula: 'Typical ranges:\nWACC: base +/- 1-2% (e.g., 8% to 12%)\nTerminal Growth: 1.5% to 3.5%\nExit Multiple: base +/- 1-2x (e.g., 7x to 11x EBITDA)',
        trap: {
          title: 'The g >= WACC Error',
          text: 'If terminal growth rate equals or exceeds WACC, the Gordon Growth formula produces infinity or negative values — mathematically impossible. Terminal growth should always be well below WACC, anchored to long-term nominal GDP growth (2-3%).'
        }
      }
    ]
  },
  {
    id: 'debt-structures',
    title: 'Debt Structures & Covenants',
    icon: '🏗️',
    desc: 'The capital stack, debt instruments, and covenant mechanics in leveraged finance.',
    time: '20 min',
    sections: 4,
    category: 'lbo',
    content: [
      {
        title: 'The Capital Stack',
        icon: '📊',
        text: 'The capital stack ranks all sources of financing by seniority — who gets paid first in bankruptcy. Senior secured debt sits at the top (lowest risk, lowest return), followed by senior unsecured, subordinated/mezzanine, preferred equity, and common equity at the bottom (highest risk, highest return). In an LBO, the stack is typically 50-70% debt.',
        visual: {
          title: 'CAPITAL STACK (TOP = FIRST PAID)',
          type: 'flow',
          items: [
            { label: 'SENIOR SECURED', val: 'Revolver + Term Loans (lowest cost)', highlight: false },
            { label: 'SENIOR UNSECURED', val: 'High-yield bonds (6-10% coupon)', highlight: false },
            { label: 'SUBORDINATED / MEZZ', val: 'Mezzanine debt (10-15%, often with warrants)', highlight: false },
            { label: 'PREFERRED EQUITY', val: 'Fixed dividends, equity-like (8-12%)', highlight: false },
            { label: 'COMMON EQUITY', val: 'PE sponsor + management (target 20-25% IRR)', highlight: true }
          ]
        }
      },
      {
        title: 'Types of Debt Instruments',
        icon: '📝',
        text: 'Revolving Credit Facility (Revolver): a line of credit drawn as needed, like a corporate credit card — used for working capital. Term Loan A (TLA): amortizing bank loan with scheduled principal payments. Term Loan B (TLB): institutional loan with minimal amortization (1% annual) and a bullet payment at maturity — the workhorse of LBO financing. High-Yield Bonds: fixed-rate bonds sold to institutional investors, typically unsecured.',
        visual: {
          title: 'TERM LOAN A vs. TERM LOAN B',
          type: 'two-column',
          left: { label: 'TERM LOAN A', items: ['From banks (relationship lenders)', 'Amortizing (scheduled payments)', 'Shorter maturity (5-7 years)', 'Tighter covenants'] },
          right: { label: 'TERM LOAN B', items: ['From institutional investors (CLOs)', 'Minimal amortization (1%/year)', 'Longer maturity (7-8 years)', 'Fewer covenants (cov-lite)'] }
        }
      },
      {
        title: 'Covenants and Terms',
        icon: '⚖️',
        text: 'Covenants are contractual restrictions that protect lenders. Maintenance covenants require ongoing compliance (e.g., Debt/EBITDA must stay below 5.0x, tested quarterly). Incurrence covenants only apply when the borrower takes a specific action (e.g., can\'t take on more debt unless leverage stays below 6.0x). The trend toward "cov-lite" deals means fewer maintenance covenants.',
        visual: {
          title: 'MAINTENANCE vs. INCURRENCE',
          type: 'two-column',
          left: { label: 'MAINTENANCE', items: ['Tested every quarter', 'Must comply continuously', 'Example: Debt/EBITDA < 5.0x', 'Breach triggers default'] },
          right: { label: 'INCURRENCE', items: ['Tested only upon specific action', 'More borrower-friendly', 'Example: can\'t issue debt if > 6.0x', 'Only restricts new actions'] }
        },
        tip: {
          title: 'Cov-Lite Trend',
          text: 'Most leveraged loans today are cov-lite (incurrence only). This gives PE sponsors more operational flexibility but means lenders have fewer early-warning triggers if performance deteriorates.'
        }
      },
      {
        title: 'PIK and Other Features',
        icon: '🔧',
        text: 'PIK (Payment-In-Kind) interest: instead of cash interest, the borrower can pay by adding to the principal balance. This preserves cash flow but increases total debt. Other features: call protection (penalty for early repayment), make-whole provisions (compensate lender for lost interest), and OID (Original Issue Discount — bonds issued below par, increasing effective yield).',
        formula: 'PIK Example:\n$100M loan at 10% PIK for 5 years\nYear 1: Balance grows to $110M\nYear 5: Balance = $100M x (1.10)^5 = $161M\nNo cash interest paid, but debt grew by $61M',
        trap: {
          title: 'PIK Danger',
          text: 'PIK preserves cash flow for operations and debt paydown on senior tranches, but the compounding effect means total debt keeps growing. This can destroy equity returns if the business doesn\'t grow fast enough.'
        }
      }
    ]
  },
  {
    id: 'lbo-returns',
    title: 'LBO Returns Analysis',
    icon: '📈',
    desc: 'IRR vs. MOIC, the three value creation levers, and paper LBO technique.',
    time: '15 min',
    sections: 3,
    category: 'lbo',
    content: [
      {
        title: 'IRR vs. MOIC',
        icon: '📊',
        text: 'IRR (Internal Rate of Return) is the annualized percentage return, accounting for time. MOIC (Multiple on Invested Capital) is total cash returned divided by total cash invested. A 3.0x MOIC means you tripled your money. The key difference: MOIC ignores time, IRR doesn\'t. PE firms target 20-25%+ IRR and 2.5-3.0x+ MOIC.',
        visual: {
          title: 'IRR vs. MOIC',
          type: 'two-column',
          left: { label: 'IRR', items: ['Annualized % return', 'Time-weighted', 'Quick exit boosts IRR', 'Target: 20-25%+'] },
          right: { label: 'MOIC', items: ['Total cash multiple', 'Not time-weighted', '3.0x = same whether 3 or 7 yrs', 'Target: 2.5-3.0x+'] }
        },
        formula: 'MOIC = Exit Equity Value / Initial Equity Investment\nIRR approx = (MOIC)^(1/Years) - 1\n\n3.0x over 3 years = ~44% IRR\n3.0x over 5 years = ~25% IRR\n3.0x over 7 years = ~17% IRR'
      },
      {
        title: 'Three Value Creation Levers',
        icon: '⚡',
        text: 'PE firms create returns through three levers, each contributing roughly one-third: (1) Debt Paydown — using company cash flow to reduce debt, increasing equity value without any growth. (2) EBITDA Growth — growing earnings through revenue growth, margin expansion, or operational improvements. (3) Multiple Expansion — selling at a higher EV/EBITDA multiple than the purchase multiple.',
        visual: {
          title: 'VALUE CREATION BRIDGE',
          type: 'flow',
          items: [
            { label: 'ENTRY EQUITY', val: '$500M (purchase at 8.0x EBITDA)', highlight: false },
            { label: 'DEBT PAYDOWN', val: '+$200M equity from reducing debt', highlight: false },
            { label: 'EBITDA GROWTH', val: '+$300M from growing EBITDA to $250M', highlight: false },
            { label: 'MULTIPLE EXPANSION', val: '+$250M from selling at 9.0x vs 8.0x', highlight: false },
            { label: 'EXIT EQUITY', val: '$1,250M = 2.5x MOIC', highlight: true }
          ]
        }
      },
      {
        title: 'Paper LBO Walkthrough',
        icon: '📝',
        text: 'In interviews, you may get a "paper LBO" — a simplified LBO done by hand in 5-10 minutes. Framework: (1) Purchase price = EBITDA x entry multiple. (2) Debt vs equity split using leverage ratio. (3) Project EBITDA growth over hold period. (4) Estimate cumulative debt paydown from free cash flow. (5) Exit equity = Exit EV minus remaining debt. (6) Compute MOIC and IRR.',
        formula: 'Quick Paper LBO:\nEntry: $200M EBITDA x 10x = $2B EV\nDebt: 60% x $2B = $1.2B | Equity: $800M\nEBITDA grows 8%/yr to $294M at Year 5\nDebt paydown: ~$50M/yr, $950M remaining\nExit: $294M x 10x = $2.94B - $950M = $1.99B equity\nMOIC = $1.99B / $800M = 2.5x\nIRR approx = (2.5)^(1/5) - 1 = ~20%',
        tip: {
          title: 'Time Management',
          text: 'In a paper LBO, round everything. Use simple growth rates, estimate debt paydown as EBITDA minus interest minus taxes minus CapEx. Interviewers care about your framework and intuition, not decimal precision.'
        }
      }
    ]
  },
  {
    id: 'ma-process',
    title: 'M&A Process & Deal Structures',
    icon: '🏛️',
    desc: 'How sell-side and buy-side M&A deals work from start to close.',
    time: '25 min',
    sections: 4,
    category: 'ma',
    content: [
      {
        title: 'Buy-Side vs. Sell-Side',
        icon: '⚖️',
        text: 'In sell-side M&A, the bank represents the company being sold. The bank runs a competitive auction process to maximize price. In buy-side M&A, the bank advises the acquirer on finding targets, valuation, deal structuring, and negotiation. Most IB analysts work on sell-side mandates, which generate higher fees.',
        visual: {
          title: 'SELL-SIDE vs. BUY-SIDE',
          type: 'two-column',
          left: { label: 'SELL-SIDE (REPRESENTING SELLER)', items: ['Run competitive auction', 'Prepare marketing materials', 'Maximize sale price', 'Higher fees (success-based)'] },
          right: { label: 'BUY-SIDE (REPRESENTING BUYER)', items: ['Screen and evaluate targets', 'Conduct due diligence', 'Negotiate lowest price', 'Lower fees (retainer + success)'] }
        }
      },
      {
        title: 'The Sell-Side Process',
        icon: '📋',
        text: 'A sell-side M&A process typically runs 4-6 months through these phases: (1) Engage the bank and sign NDA. (2) Prepare the CIM and financial model. (3) Contact potential buyers. (4) Receive Indications of Interest (IOIs). (5) Select shortlisted bidders for management presentations. (6) Open data room for due diligence. (7) Receive final bids (LOIs). (8) Negotiate definitive agreement. (9) Sign and close.',
        visual: {
          title: 'SELL-SIDE TIMELINE',
          type: 'flow',
          items: [
            { label: 'PHASE 1', val: 'Preparation: CIM, teaser, buyer list (4-6 weeks)', highlight: false },
            { label: 'PHASE 2', val: 'Marketing: outreach, IOIs, shortlist (4-6 weeks)', highlight: false },
            { label: 'PHASE 3', val: 'Diligence: data room, mgmt presentations (4-6 weeks)', highlight: false },
            { label: 'PHASE 4', val: 'Negotiation: final bids, definitive agreement (2-4 weeks)', highlight: false },
            { label: 'PHASE 5', val: 'Closing: regulatory approval, funding (4-12 weeks)', highlight: true }
          ]
        }
      },
      {
        title: 'Key M&A Documents',
        icon: '📄',
        text: 'NDA (Non-Disclosure Agreement): signed before any information is shared. Teaser: a 1-2 page anonymous summary to gauge interest. CIM (Confidential Information Memorandum): the 50-100 page pitch book covering business overview, financials, and growth strategy. IOI (Indication of Interest): non-binding first bid with price range. LOI (Letter of Intent): more detailed, semi-binding bid with key terms. Definitive Agreement: the final, legally binding purchase agreement.',
        tip: {
          title: 'Analyst Work',
          text: 'As a first-year analyst, you\'ll spend significant time on the CIM (formatting, data, charts) and the financial model. Understanding these documents inside-out shows you know what the job actually involves.'
        }
      },
      {
        title: 'Deal Structure Considerations',
        icon: '🔧',
        text: 'Key structural decisions include: Cash vs. Stock consideration — cash is clean but requires financing; stock avoids cash outlay but dilutes existing shareholders. Asset Purchase vs. Stock Purchase — asset deals let buyers cherry-pick assets and step up the tax basis; stock deals are simpler but assume all liabilities. Earnouts — deferred payments contingent on future performance, bridging valuation gaps.',
        visual: {
          title: 'BUYER vs. SELLER PREFERENCES',
          type: 'two-column',
          left: { label: 'BUYER PREFERS', items: ['Asset purchase (tax benefits)', 'Stock consideration (preserve cash)', 'Lower price + earnout', 'Representations & warranties'] },
          right: { label: 'SELLER PREFERS', items: ['Stock purchase (cleaner, cap gains)', 'Cash consideration (certain value)', 'Higher certain price, no earnout', 'Limited reps & warranties'] }
        }
      }
    ]
  },
  {
    id: 'merger-consequences',
    title: 'Merger Consequences Analysis',
    icon: '🔬',
    desc: 'Synergies, goodwill, purchase accounting, and integration risks.',
    time: '15 min',
    sections: 3,
    category: 'ma',
    content: [
      {
        title: 'Synergies in Detail',
        icon: '🤝',
        text: 'Synergies are the additional value created by combining two companies. Cost synergies (easier to achieve) come from eliminating redundancies: duplicate HQ, overlapping salesforces, combined purchasing power. Revenue synergies (harder, less certain) come from cross-selling, new market access, or combined product offerings. Synergies justify paying a premium — without them, the acquirer is overpaying.',
        visual: {
          title: 'COST vs. REVENUE SYNERGIES',
          type: 'two-column',
          left: { label: 'COST SYNERGIES', items: ['Headcount reduction', 'Facility consolidation', 'Procurement savings', 'Achievability: 70-80%'] },
          right: { label: 'REVENUE SYNERGIES', items: ['Cross-selling opportunities', 'New market access', 'Pricing power', 'Achievability: 20-40%'] }
        },
        formula: 'NPV of Synergies = Annual Synergies / WACC (if perpetual)\n\nExample: $50M annual cost savings at 10% WACC\nNPV = $50M / 0.10 = $500M synergy value'
      },
      {
        title: 'Goodwill & Purchase Accounting',
        icon: '📊',
        text: 'When a company is acquired, the buyer must allocate the purchase price to the target\'s assets at Fair Market Value (FMV). Any excess over the FMV of net identifiable assets becomes Goodwill — an intangible asset on the balance sheet. Goodwill is not amortized but is tested annually for impairment. If the acquisition underperforms, goodwill is written down.',
        formula: 'Goodwill = Purchase Price - FMV of Net Identifiable Assets\n\nExample: Pay $1B for company with $300M net assets at FMV\nGoodwill = $1B - $300M = $700M',
        trap: {
          title: 'Asset Write-Ups',
          text: 'When assets are written up to FMV in purchase accounting, the higher basis creates incremental depreciation/amortization. This reduces pro forma earnings and is often missed in accretion/dilution analysis.'
        }
      },
      {
        title: 'Integration Risks',
        icon: '⚠️',
        text: 'Post-merger integration is the #1 reason acquisitions fail. Key risks include: cultural clash (different management styles), customer attrition (especially relationship-driven sales), key employee departure, IT system integration (costly and time-consuming), and synergy shortfalls. Studies show 50-70% of acquisitions destroy shareholder value.',
        tip: {
          title: 'Interview Application',
          text: 'If asked "what could go wrong with this deal?" — don\'t just discuss valuation. Discuss operational integration risks, cultural fit, customer retention, and regulatory hurdles. This shows real-world awareness beyond the model.'
        }
      }
    ]
  }
];

const CONCEPT_MAP = {
  'accounting': ['three-statements','working-capital','revenue-recognition','depreciation-noncash'],
  'valuation': ['dcf-basics','ev-equity','comps-analysis','precedent-transactions','terminal-value-sensitivity'],
  'lbo': ['lbo-mechanics','debt-structures','lbo-returns'],
  'ma': ['accretion-dilution','ma-process','merger-consequences']
};

const MODULE_PREREQS = {
  'working-capital': ['three-statements'],
  'revenue-recognition': ['three-statements'],
  'depreciation-noncash': ['three-statements'],
  'dcf-basics': ['three-statements'],
  'ev-equity': ['three-statements'],
  'comps-analysis': ['ev-equity'],
  'precedent-transactions': ['comps-analysis'],
  'terminal-value-sensitivity': ['dcf-basics'],
  'lbo-mechanics': ['dcf-basics','ev-equity'],
  'debt-structures': ['lbo-mechanics'],
  'lbo-returns': ['lbo-mechanics'],
  'accretion-dilution': ['ev-equity'],
  'ma-process': ['ev-equity'],
  'merger-consequences': ['ma-process','accretion-dilution']
};

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

  const prereqs = MODULE_PREREQS[moduleId];
  if (prereqs && prereqs.length > 0) {
    const incomplete = prereqs.filter(pid => {
      const pmod = LEARN_MODULES.find(m => m.id === pid);
      if (!pmod || !pmod.content) return false;
      const completed = (progress.learnProgress || {})[pid] || 0;
      return completed < pmod.content.length;
    });
    if (incomplete.length > 0) {
      const names = incomplete.map(pid => LEARN_MODULES.find(m => m.id === pid)?.title).filter(Boolean).join(', ');
      showToast('Tip: Consider completing "' + names + '" first.', '💡', 5000);
    }
  }

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
    // Module complete — show celebration screen
    checkBadges();
    showModuleCompleteScreen();
  }
}

function showModuleCompleteScreen() {
  const contentEl = document.getElementById('learn-content');
  if (!contentEl || !currentModule) return;
  const cat = currentModule.category;
  const relatedCount = QUESTIONS.filter(q => q.sub === cat).length;
  const subLabels = { accounting:'Accounting', valuation:'Valuation', lbo:'LBO', ma:'M&A' };
  contentEl.innerHTML =
    '<div class="learn-header">' +
    '<div class="learn-back" onclick="closeLearnModule()">← Back to modules</div>' +
    '<div class="learn-title">' + currentModule.title + '</div></div>' +
    '<div class="learn-section" style="text-align:center;padding:48px 24px">' +
    '<div style="font-size:48px;margin-bottom:16px">🎉</div>' +
    '<div style="font-size:18px;font-weight:600;margin-bottom:8px">Module Complete!</div>' +
    '<div style="font-size:13px;color:var(--t-2);margin-bottom:24px">You finished "' + currentModule.title + '". Now put that knowledge to work.</div>' +
    '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
    '<button class="quiz-btn primary" onclick="closeLearnModule();showView(\'flash\')" style="padding:10px 20px;font-size:12.5px">' +
    'Practice Flashcards (' + relatedCount + ' ' + (subLabels[cat]||'') + ' questions) →</button>' +
    '<button class="quiz-btn ghost" onclick="closeLearnModule();showView(\'quiz\')" style="padding:10px 20px;font-size:12.5px">' +
    'Take a Quiz →</button>' +
    '<button class="quiz-btn ghost" onclick="closeLearnModule()" style="padding:10px 20px;font-size:12.5px">' +
    'Back to Modules</button></div></div>';
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

/* ─── MINI-CASES ─────────────────────── */
const MINI_CASES = [
  {
    id: 'dcf-quick',
    type: 'DCF',
    title: 'Quick DCF Valuation',
    desc: 'Calculate Enterprise Value given projected cash flows and WACC.',
    time: '5 min',
    difficulty: 1,
    scenario: 'A company has projected Free Cash Flows of $100M in Year 1, growing at 5% annually. WACC is 10%. The terminal growth rate is 2%. Calculate the Enterprise Value.',
    data: [
      { label: 'Year 1 FCF', value: '$100M' },
      { label: 'FCF Growth', value: '5%' },
      { label: 'WACC', value: '10%' },
      { label: 'Terminal Growth', value: '2%' }
    ],
    inputs: [
      { id: 'y1_pv', label: 'Year 1 FCF PV', answer: 91, unit: '$M', hint: '100 / 1.10' },
      { id: 'y2_pv', label: 'Year 2 FCF PV', answer: 87, unit: '$M', hint: '105 / 1.10²' },
      { id: 'y3_pv', label: 'Year 3 FCF PV', answer: 83, unit: '$M', hint: '110.25 / 1.10³' },
      { id: 'tv', label: 'Terminal Value (Y3)', answer: 1406, unit: '$M', hint: 'Y4 FCF / (WACC - g)' },
      { id: 'tv_pv', label: 'PV of Terminal Value', answer: 1056, unit: '$M', hint: 'TV / 1.10³' },
      { id: 'ev', label: 'Enterprise Value', answer: 1317, unit: '$M', hint: 'Sum of all PVs' }
    ]
  },
  {
    id: 'accretion',
    type: 'M&A',
    title: 'Accretion/Dilution Analysis',
    desc: 'Determine if a proposed acquisition is accretive or dilutive to EPS.',
    time: '7 min',
    difficulty: 2,
    scenario: 'Acquirer has 100M shares, $500M Net Income (EPS = $5.00). Target has $50M Net Income. Purchase price is $750M, all stock deal at $25/share. Cost of debt is 5%, tax rate 25%.',
    data: [
      { label: 'Acquirer Shares', value: '100M' },
      { label: 'Acquirer Net Income', value: '$500M' },
      { label: 'Target Net Income', value: '$50M' },
      { label: 'Purchase Price', value: '$750M' }
    ],
    inputs: [
      { id: 'new_shares', label: 'New Shares Issued', answer: 30, unit: 'M', hint: '$750M / $25' },
      { id: 'total_shares', label: 'Total Shares Post-Deal', answer: 130, unit: 'M', hint: '100 + 30' },
      { id: 'combined_ni', label: 'Combined Net Income', answer: 550, unit: '$M', hint: '500 + 50' },
      { id: 'new_eps', label: 'Pro Forma EPS', answer: 4.23, unit: '$', hint: '550 / 130', tolerance: 0.05 },
      { id: 'accretive', label: 'Accretive (1) or Dilutive (0)?', answer: 0, unit: '', hint: 'Compare to $5.00' }
    ]
  },
  {
    id: 'lbo-returns',
    type: 'LBO',
    title: 'LBO Returns Calculation',
    desc: 'Calculate IRR and MOIC for a leveraged buyout.',
    time: '8 min',
    difficulty: 2,
    scenario: 'PE firm acquires company for $500M at 8x EBITDA ($62.5M EBITDA). Uses 60% debt, 40% equity. After 5 years, exits at 9x EBITDA. EBITDA grows to $85M. Debt is paid down to $150M.',
    data: [
      { label: 'Entry Price', value: '$500M' },
      { label: 'Entry EBITDA', value: '$62.5M' },
      { label: 'Entry Multiple', value: '8.0x' },
      { label: 'Equity Check', value: '$200M (40%)' }
    ],
    inputs: [
      { id: 'exit_ev', label: 'Exit Enterprise Value', answer: 765, unit: '$M', hint: '85 × 9' },
      { id: 'exit_equity', label: 'Exit Equity Value', answer: 615, unit: '$M', hint: '765 - 150 debt' },
      { id: 'moic', label: 'MOIC (Multiple on Invested Capital)', answer: 3.08, unit: 'x', hint: '615 / 200', tolerance: 0.05 },
      { id: 'irr', label: 'Approx. IRR', answer: 25, unit: '%', hint: '~25% for 3x in 5 years', tolerance: 3 }
    ]
  },
  {
    id: 'wacc-calc',
    type: 'Valuation',
    title: 'WACC Calculation',
    desc: 'Calculate Weighted Average Cost of Capital from components.',
    time: '4 min',
    difficulty: 1,
    scenario: 'Company has $400M equity (market value) and $100M debt. Cost of equity is 12%, cost of debt is 6%, tax rate is 25%.',
    data: [
      { label: 'Equity Value', value: '$400M' },
      { label: 'Debt Value', value: '$100M' },
      { label: 'Cost of Equity', value: '12%' },
      { label: 'Cost of Debt', value: '6%' }
    ],
    inputs: [
      { id: 'total_cap', label: 'Total Capital', answer: 500, unit: '$M', hint: '400 + 100' },
      { id: 'equity_weight', label: 'Equity Weight', answer: 80, unit: '%', hint: '400 / 500' },
      { id: 'debt_weight', label: 'Debt Weight', answer: 20, unit: '%', hint: '100 / 500' },
      { id: 'after_tax_debt', label: 'After-Tax Cost of Debt', answer: 4.5, unit: '%', hint: '6% × (1 - 25%)' },
      { id: 'wacc', label: 'WACC', answer: 10.5, unit: '%', hint: '(80% × 12%) + (20% × 4.5%)', tolerance: 0.2 }
    ]
  }
];

let currentCase = null;
let caseStartTime = null;
let caseTimerInterval = null;

function renderCasesGrid() {
  const grid = document.getElementById('cases-grid');
  if (!grid) return;
  
  grid.innerHTML = MINI_CASES.map(c => {
    const completed = progress.completedCases?.includes(c.id);
    const diffClass = c.difficulty === 1 ? 'easy' : c.difficulty === 3 ? 'hard' : '';
    
    return `
      <div class="case-card ${completed ? '' : ''}" onclick="startCase('${c.id}')">
        <div class="case-header">
          <div class="case-type">${c.type}</div>
          <div class="case-title">${c.title}</div>
        </div>
        <div class="case-body">
          <div class="case-desc">${c.desc}</div>
          <div class="case-meta">
            <div class="case-meta-item">⏱ ${c.time}</div>
            <div class="case-meta-item">
              <div class="case-difficulty ${diffClass}">
                <span class="${c.difficulty >= 1 ? 'active' : ''}"></span>
                <span class="${c.difficulty >= 2 ? 'active' : ''}"></span>
                <span class="${c.difficulty >= 3 ? 'active' : ''}"></span>
              </div>
            </div>
            ${completed ? '<div class="case-meta-item" style="color:var(--green)">✓ Done</div>' : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  document.getElementById('cases-list').style.display = 'block';
  document.getElementById('case-exercise').classList.remove('active');
}

function startCase(caseId) {
  const c = MINI_CASES.find(x => x.id === caseId);
  if (!c) return;
  
  currentCase = c;
  caseStartTime = Date.now();
  
  document.getElementById('cases-list').style.display = 'none';
  const exercise = document.getElementById('case-exercise');
  exercise.classList.add('active');
  
  exercise.innerHTML = `
    <div class="learn-back" onclick="closeCase()">← Back to cases</div>
    
    <div class="case-scenario">
      <div class="case-scenario-title">
        <span>${c.type}</span> — ${c.title}
        <span class="case-timer" id="case-timer" style="margin-left:auto">⏱ 0:00</span>
      </div>
      <div class="case-scenario-text">${c.scenario}</div>
      
      <table class="case-data-table">
        <tr><th>Given Data</th><th>Value</th></tr>
        ${c.data.map(d => `<tr><td>${d.label}</td><td>${d.value}</td></tr>`).join('')}
      </table>
    </div>
    
    <div class="learn-section">
      <div class="learn-section-title">Your Calculations</div>
      ${c.inputs.map(inp => `
        <div class="case-input-row">
          <span class="case-input-label">${inp.label}</span>
          <input type="number" class="case-input" id="case-${inp.id}" step="0.01" placeholder="?">
          <span class="case-unit">${inp.unit}</span>
        </div>
        <div class="case-hint" id="hint-${inp.id}" style="display:none">💡 ${inp.hint}</div>
      `).join('')}
      
      <div class="case-actions">
        <button class="quiz-btn ghost" onclick="showCaseHints()">Show Hints</button>
        <button class="quiz-btn primary" onclick="checkCaseAnswers()">Check Answers →</button>
      </div>
      
      <div id="case-result"></div>
    </div>
  `;
  
  // Start timer
  caseTimerInterval = setInterval(updateCaseTimer, 1000);
}

function updateCaseTimer() {
  const elapsed = Math.floor((Date.now() - caseStartTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timerEl = document.getElementById('case-timer');
  if (timerEl) timerEl.textContent = `⏱ ${mins}:${secs.toString().padStart(2, '0')}`;
}

function showCaseHints() {
  currentCase.inputs.forEach(inp => {
    document.getElementById(`hint-${inp.id}`).style.display = 'block';
  });
}

function checkCaseAnswers() {
  if (!currentCase) return;
  
  clearInterval(caseTimerInterval);
  let correct = 0;
  
  currentCase.inputs.forEach(inp => {
    const inputEl = document.getElementById(`case-${inp.id}`);
    const userVal = parseFloat(inputEl.value);
    const tolerance = inp.tolerance || 0.5;
    
    if (Math.abs(userVal - inp.answer) <= tolerance) {
      inputEl.classList.add('correct');
      inputEl.classList.remove('incorrect');
      correct++;
    } else {
      inputEl.classList.add('incorrect');
      inputEl.classList.remove('correct');
    }
  });
  
  const total = currentCase.inputs.length;
  const pct = Math.round((correct / total) * 100);
  const success = pct >= 80;
  
  if (success) {
    if (!progress.completedCases) progress.completedCases = [];
    if (!progress.completedCases.includes(currentCase.id)) {
      progress.completedCases.push(currentCase.id);
      saveProgress();
    }
  }
  
  document.getElementById('case-result').innerHTML = `
    <div class="case-result ${success ? 'success' : 'fail'}">
      <div class="case-result-icon">${success ? '🎉' : '📚'}</div>
      <div class="case-result-title">${success ? 'Great job!' : 'Keep practicing'}</div>
      <div class="case-result-sub">${correct}/${total} correct (${pct}%)</div>
      <button class="quiz-btn ${success ? 'primary' : 'ghost'}" style="margin-top:16px" onclick="closeCase()">
        ${success ? 'Next Case →' : 'Try Again'}
      </button>
    </div>
  `;
}

function closeCase() {
  clearInterval(caseTimerInterval);
  currentCase = null;
  renderCasesGrid();
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

  try {
    const { data: { session } } = await sb.auth.getSession();
    if (session?.user) {
      await onSignedIn(session.user);
    }
  } catch (e) {
    console.error('Auth session restore error:', e);
  }

  try {
    sb.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try { await onSignedIn(session.user); } catch (e) { console.error('onSignedIn error:', e); }
      } else if (event === 'SIGNED_OUT') {
        showScreen('landing');
      }
    });
  } catch (e) {
    console.error('Auth listener error:', e);
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

/* ─── INTERNSHIP TRACKER ────────────── */
const INTERNSHIP_DATA = [
  { firm:'J.P. Morgan', abbr:'JPM', division:'Investment Banking', type:'BB', status:'open', deadline:'2026-03-14', location:'New York, NY', url:'https://careers.jpmorgan.com', logoDomain:'jpmorgan.com' },
  { firm:'Goldman Sachs', abbr:'GS', division:'Investment Banking', type:'BB', status:'open', deadline:'2026-03-21', location:'New York, NY', url:'https://www.goldmansachs.com/careers', logoDomain:'goldmansachs.com' },
  { firm:'Morgan Stanley', abbr:'MS', division:'Investment Banking', type:'BB', status:'upcoming', deadline:'2026-04-01', location:'New York, NY', url:'https://www.morganstanley.com/careers', logoDomain:'morganstanley.com' },
  { firm:'Bank of America', abbr:'BofA', division:'Global Corporate & IB', type:'BB', status:'open', deadline:'2026-03-07', location:'New York, NY', url:'https://campus.bankofamerica.com', logoDomain:'bankofamerica.com' },
  { firm:'Citigroup', abbr:'C', division:'Banking, Capital Markets', type:'BB', status:'open', deadline:'2026-03-10', location:'New York, NY', url:'https://www.citigroup.com/careers', logoDomain:'citigroup.com' },
  { firm:'Barclays', abbr:'BCS', division:'Investment Banking', type:'BB', status:'open', deadline:'2026-02-28', location:'New York, NY', url:'https://joinus.barclays.com', logoDomain:'barclays.com' },
  { firm:'Deutsche Bank', abbr:'DB', division:'Investment Banking', type:'BB', status:'open', deadline:'2026-03-01', location:'New York, NY', url:'https://careers.db.com', logoDomain:'db.com' },
  { firm:'UBS', abbr:'UBS', division:'Global Banking', type:'BB', status:'closed', deadline:'2026-01-31', location:'New York, NY', url:'https://www.ubs.com/careers', logoDomain:'ubs.com' },
  { firm:'HSBC', abbr:'HSBC', division:'Global Banking & Markets', type:'BB', status:'closed', deadline:'2026-02-01', location:'New York, NY', url:'https://www.hsbc.com/careers', logoDomain:'hsbc.com' },
  { firm:'Lazard', abbr:'LAZ', division:'Financial Advisory', type:'EB', status:'open', deadline:'2026-03-15', location:'New York, NY', url:'https://www.lazard.com/careers', logoDomain:'lazard.com' },
  { firm:'Evercore', abbr:'EVR', division:'Advisory', type:'EB', status:'open', deadline:'2026-03-20', location:'New York, NY', url:'https://www.evercore.com/careers', logoDomain:'evercore.com' },
  { firm:'Centerview Partners', abbr:'CV', division:'Advisory', type:'EB', status:'open', deadline:'2026-03-31', location:'New York, NY', url:'https://www.centerviewpartners.com/careers', logoDomain:'centerviewpartners.com' },
  { firm:'Moelis & Co.', abbr:'MC', division:'Advisory', type:'EB', status:'open', deadline:'2026-03-08', location:'New York, NY', url:'https://www.moelis.com/careers', logoDomain:'moelis.com' },
  { firm:'PJT Partners', abbr:'PJT', division:'Advisory', type:'EB', status:'upcoming', deadline:'2026-04-15', location:'New York, NY', url:'https://www.pjtpartners.com/careers', logoDomain:'pjtpartners.com' },
  { firm:'Perella Weinberg', abbr:'PWP', division:'Advisory', type:'EB', status:'open', deadline:'2026-03-12', location:'New York, NY', url:'https://www.pwpartners.com/careers', logoDomain:'pwpartners.com' },
  { firm:'Rothschild & Co.', abbr:'RCo', division:'Global Advisory', type:'EB', status:'closed', deadline:'2026-02-10', location:'New York, NY', url:'https://www.rothschildandco.com/careers', logoDomain:'rothschildandco.com' },
  { firm:'Houlihan Lokey', abbr:'HL', division:'Corporate Finance', type:'MM', status:'open', deadline:'2026-03-18', location:'Los Angeles, CA', url:'https://www.hl.com/careers', logoDomain:'hl.com' },
  { firm:'Jefferies', abbr:'JEF', division:'Investment Banking', type:'MM', status:'open', deadline:'2026-03-05', location:'New York, NY', url:'https://www.jefferies.com/careers', logoDomain:'jefferies.com' },
  { firm:'William Blair', abbr:'WB', division:'Investment Banking', type:'MM', status:'open', deadline:'2026-03-25', location:'Chicago, IL', url:'https://www.williamblair.com/careers', logoDomain:'williamblair.com' },
  { firm:'Raymond James', abbr:'RJ', division:'Investment Banking', type:'MM', status:'open', deadline:'2026-04-01', location:'St. Petersburg, FL', url:'https://www.raymondjames.com/careers', logoDomain:'raymondjames.com' },
  { firm:'Baird', abbr:'RWB', division:'Investment Banking', type:'MM', status:'upcoming', deadline:'2026-04-10', location:'Milwaukee, WI', url:'https://www.rwbaird.com/careers', logoDomain:'rwbaird.com' },
  { firm:'Lincoln International', abbr:'LI', division:'Advisory', type:'MM', status:'open', deadline:'2026-03-22', location:'Chicago, IL', url:'https://www.lincolninternational.com/careers', logoDomain:'lincolninternational.com' },
  { firm:'Guggenheim Securities', abbr:'GUG', division:'Investment Banking', type:'MM', status:'upcoming', deadline:'2026-04-20', location:'New York, NY', url:'https://www.guggenheimpartners.com/careers', logoDomain:'guggenheimpartners.com' },
  { firm:'KKR', abbr:'KKR', division:'Capital Markets', type:'Other', status:'upcoming', deadline:'2026-04-05', location:'New York, NY', url:'https://www.kkr.com/careers', logoDomain:'kkr.com' },
  { firm:'Blackstone', abbr:'BX', division:'Advisory', type:'Other', status:'upcoming', deadline:'2026-05-01', location:'New York, NY', url:'https://www.blackstone.com/careers', logoDomain:'blackstone.com' },
  { firm:'Apollo Global', abbr:'APO', division:'Capital Markets', type:'Other', status:'upcoming', deadline:'2026-04-15', location:'New York, NY', url:'https://www.apollo.com/careers', logoDomain:'apollo.com' },
];

function getFirmLogoHTML(d, size, cssClass) {
  size = size || 28;
  cssClass = cssClass || 'apply-firm-logo';
  var logoUrl = 'https://logo.clearbit.com/' + d.logoDomain + '?size=' + (size * 2);
  return '<img src="' + logoUrl + '" alt="' + d.abbr + '" width="' + size + '" height="' + size + '" ' +
    'style="border-radius:6px;object-fit:contain;background:var(--bg-1);flex-shrink:0;border:1px solid var(--line)" ' +
    'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" loading="lazy"/>' +
    '<div class="' + cssClass + '" style="display:none">' + d.abbr.substring(0, 3) + '</div>';
}

let applyFilter = 'all';
let applyTypeFilter = 'all';
let applySortField = 'deadline';
let applySortDir = 1;
let applySaved = [];

function setApplyFilter(f, el) {
  applyFilter = f;
  document.querySelectorAll('#apply-filters .bank-pill').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderApplyTracker();
}
function setApplyType(t, el) {
  applyTypeFilter = t;
  document.querySelectorAll('#apply-type-filters .bank-pill').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderApplyTracker();
}
function sortApply(field) {
  if (applySortField === field) applySortDir *= -1;
  else { applySortField = field; applySortDir = 1; }
  renderApplyTracker();
}
function toggleApplySave(firm) {
  const idx = applySaved.indexOf(firm);
  if (idx >= 0) applySaved.splice(idx, 1);
  else applySaved.push(firm);
  try { saveProgress(); } catch(e) {}
  renderApplyTracker();
}

function renderApplyTracker() {
  const search = (document.getElementById('apply-search')?.value || '').toLowerCase();
  const today = new Date();

  let data = INTERNSHIP_DATA.filter(d => {
    if (search && !d.firm.toLowerCase().includes(search) && !d.division.toLowerCase().includes(search) && !d.type.toLowerCase().includes(search)) return false;
    if (applyFilter === 'open' && d.status !== 'open') return false;
    if (applyFilter === 'closed' && d.status !== 'closed') return false;
    if (applyFilter === 'upcoming' && d.status !== 'upcoming') return false;
    if (applyFilter === 'saved' && !applySaved.includes(d.firm)) return false;
    if (applyTypeFilter !== 'all' && d.type !== applyTypeFilter) return false;
    return true;
  });

  data.sort((a, b) => {
    let va, vb;
    if (applySortField === 'firm') { va = a.firm; vb = b.firm; }
    else if (applySortField === 'status') {
      const order = { open: 0, upcoming: 1, closed: 2 };
      va = order[a.status]; vb = order[b.status];
    } else { va = a.deadline; vb = b.deadline; }
    if (va < vb) return -1 * applySortDir;
    if (va > vb) return 1 * applySortDir;
    return 0;
  });

  const openCount = INTERNSHIP_DATA.filter(d => d.status === 'open').length;
  const closedCount = INTERNSHIP_DATA.filter(d => d.status === 'closed').length;
  const upcomingCount = INTERNSHIP_DATA.filter(d => d.status === 'upcoming').length;
  const closingSoon = INTERNSHIP_DATA.filter(d => {
    if (d.status !== 'open') return false;
    const diff = (new Date(d.deadline) - today) / (1000*60*60*24);
    return diff >= 0 && diff <= 14;
  }).length;

  const statsEl = document.getElementById('apply-stats');
  if (statsEl) statsEl.innerHTML = `
    <div class="apply-stat-card">
      <div class="apply-stat-label">Open Now</div>
      <div class="apply-stat-val" style="color:var(--green)">${openCount}</div>
      <div class="apply-stat-sub">Accepting applications</div>
    </div>
    <div class="apply-stat-card">
      <div class="apply-stat-label">Closing Soon</div>
      <div class="apply-stat-val" style="color:var(--red)">${closingSoon}</div>
      <div class="apply-stat-sub">Within 14 days</div>
    </div>
    <div class="apply-stat-card">
      <div class="apply-stat-label">Upcoming</div>
      <div class="apply-stat-val" style="color:var(--amber)">${upcomingCount}</div>
      <div class="apply-stat-sub">Not yet open</div>
    </div>
    <div class="apply-stat-card">
      <div class="apply-stat-label">Closed</div>
      <div class="apply-stat-val">${closedCount}</div>
      <div class="apply-stat-sub">Deadline passed</div>
    </div>
  `;

  const tbody = document.getElementById('apply-tbody');
  if (!tbody) return;
  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--t-3)">No internships match your filters.</td></tr>';
  } else {
    tbody.innerHTML = data.map(d => {
      const isSaved = applySaved.includes(d.firm);
      const dl = new Date(d.deadline);
      const diff = Math.ceil((dl - today) / (1000*60*60*24));
      const deadlineStr = dl.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
      const deadlineClass = (d.status === 'open' && diff >= 0 && diff <= 14) ? 'apply-deadline-soon' : '';
      const deadlineExtra = (d.status === 'open' && diff >= 0 && diff <= 14) ? ' · ' + diff + 'd' : '';
      const typeClass = d.type === 'BB' ? 'type-bb' : d.type === 'EB' ? 'type-eb' : d.type === 'MM' ? 'type-mm' : 'type-other';
      const typeLabel = d.type === 'BB' ? 'Bulge Bracket' : d.type === 'EB' ? 'Elite Boutique' : d.type === 'MM' ? 'Mid-Market' : d.type;
      const statusClass = 'status-' + d.status;
      const statusLabel = d.status.charAt(0).toUpperCase() + d.status.slice(1);
      const linkBtn = d.status === 'closed'
        ? '<span class="apply-link-btn disabled">Closed</span>'
        : d.status === 'upcoming'
        ? '<span class="apply-link-btn disabled">Soon</span>'
        : '<a class="apply-link-btn" href="' + d.url + '" target="_blank" rel="noopener">Apply →</a>';

      return '<tr>' +
        '<td><button class="apply-star-btn ' + (isSaved?'saved':'') + '" onclick="toggleApplySave(\'' + d.firm.replace(/'/g,"\\'") + '\')">' + (isSaved?'★':'☆') + '</button></td>' +
        '<td><div class="apply-firm">' + getFirmLogoHTML(d, 28) + '<span class="apply-firm-name">' + d.firm + '</span></div></td>' +
        '<td class="apply-division">' + d.division + '</td>' +
        '<td><span class="apply-type-badge ' + typeClass + '">' + typeLabel + '</span></td>' +
        '<td><span class="apply-status ' + statusClass + '">' + statusLabel + '</span></td>' +
        '<td><span class="apply-deadline ' + deadlineClass + '">' + deadlineStr + deadlineExtra + '</span></td>' +
        '<td class="apply-location">' + d.location + '</td>' +
        '<td>' + linkBtn + '</td>' +
        '</tr>';
    }).join('');
  }
}

/* ─── SCROLL ANIMATION ENGINE ─────────── */
(function() {
  // Reduced-motion check
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    document.querySelectorAll('[data-reveal]').forEach(function(el) {
      el.classList.add('revealed');
    });
    return;
  }

  // Set up stagger children: parent[data-stagger-children] → each direct child gets data-reveal + incremental delay
  document.querySelectorAll('[data-stagger-children]').forEach(function(parent) {
    var baseDelay = parseInt(parent.getAttribute('data-stagger-children')) || 80;
    Array.from(parent.children).forEach(function(child, i) {
      if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', 'up');
      child.setAttribute('data-delay', String(i * baseDelay));
    });
  });

  // Apply transition-delay from data-delay attributes
  document.querySelectorAll('[data-delay]').forEach(function(el) {
    var d = parseInt(el.getAttribute('data-delay')) || 0;
    if (d > 0) el.style.transitionDelay = d + 'ms';
  });

  // Main observer
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
        // Trigger CTA glow breathing
        var cta = entry.target.closest('.cta-section');
        if (cta) cta.classList.add('cta-visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe all reveal elements
  document.querySelectorAll('[data-reveal]').forEach(function(el) {
    observer.observe(el);
  });

  // Stats band observer (enhanced with counter animation)
  var statsEl = document.getElementById('stats-inner');
  if (statsEl) {
    var statsObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          statsObs.unobserve(entry.target);
          animateCounters();
        }
      });
    }, { threshold: 0.2 });
    statsObs.observe(statsEl);
  }

  // Counter animation for stat numbers
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(function(el) {
      var text = el.textContent.trim();
      var match = text.match(/^[\$]?(\d+)/);
      if (!match) return;
      var target = parseInt(match[1]);
      var prefix = text.match(/^\$/) ? '$' : '';
      var suffix = text.replace(/^[\$]?\d+/, '');
      var duration = 1400;
      var start = performance.now();
      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(target * eased);
        el.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  // Subtle parallax on hero glow following scroll
  var heroGlow = document.querySelector('.hero-glow');
  if (heroGlow) {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrollY = window.pageYOffset || document.documentElement.scrollTop;
          if (scrollY < 900) {
            heroGlow.style.transform = 'translateX(-50%) translateY(' + (scrollY * 0.18) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
})();

/* ─── INIT ───────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof calcROI === 'function') calcROI();
  if (typeof renderApplyTracker === 'function') renderApplyTracker();
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
