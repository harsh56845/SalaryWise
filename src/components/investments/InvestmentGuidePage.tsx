import React, { useState } from 'react';
import { 
  TrendingUp, Shield, Award, Sparkles, HelpCircle, Calculator, 
  ArrowRight, CheckCircle2, AlertTriangle, Zap, DollarSign, PieChart, Coins
} from 'lucide-react';

interface InvestmentDetail {
  id: string;
  name: string;
  category: 'Low Risk' | 'Moderate Risk' | 'Long-Term Growth' | 'High Risk / Alt';
  emoji: string;
  def: string; // Hinglish definition in short words
  howToUse: string; // How to start/use
  realExample: string; // Real life example
  avgReturn: string; // e.g. "7.1% Tax-Free"
  riskBadge: 'Low' | 'Moderate' | 'High' | 'Very High';
  horizon: string;
  pros: string[];
  hinglishTip: string;
}

export const InvestmentGuidePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [calcAmount, setCalcAmount] = useState<number>(5000);
  const [calcYears, setCalcYears] = useState<number>(5);

  const investments: InvestmentDetail[] = [
    {
      id: 'ppf',
      name: 'Public Provident Fund (PPF)',
      category: 'Low Risk',
      emoji: '🛡️',
      def: 'Govt-backed guaranteed savings scheme with 100% tax-free returns under Section 80C.',
      howToUse: 'Open via Netbanking (SBI, HDFC, ICICI). Min ₹500/yr, Max ₹1.5 Lakh/yr.',
      realExample: 'Agar aap ₹12,500/mo (₹1.5L/yr) 15 saal deposit karein, to ₹40.6 Lakhs tax-free milenge!',
      avgReturn: '7.1% p.a. (Tax-Free)',
      riskBadge: 'Low',
      horizon: '15 Years (Lock-in)',
      pros: ['100% Capital Protection', 'EEE Tax Exemption', 'Govt Guarantee'],
      hinglishTip: 'Sabse safe long-term goal builder! Tax bachao aur tension-free compounding paao. 🎯',
    },
    {
      id: 'fd',
      name: 'Fixed Deposits (FD) & RDs',
      category: 'Low Risk',
      emoji: '🏦',
      def: 'Bank me fixed tenure ke liye money lock karke guaranteed interest earn karna.',
      howToUse: 'Bank app se 1-click me FD start karein (1 month to 10 years).',
      realExample: '₹1 Lakh ki 3-year FD at 7.5% interest ➔ ₹1.24 Lakhs guaranteed return.',
      avgReturn: '6.5% – 7.8% p.a.',
      riskBadge: 'Low',
      horizon: '1 to 5 Years',
      pros: ['Guaranteed Returns', 'Instant Overdraft Loan Facility', 'DICGC ₹5L Insurance'],
      hinglishTip: 'Short-term safety ke liye best! Senior citizens ko 0.5% extra interest milta hai. 👵',
    },
    {
      id: 'liquid-funds',
      name: 'Liquid Mutual Funds',
      category: 'Low Risk',
      emoji: '💧',
      def: 'Very short-term govt & corporate bonds me investment. High safety + instant liquidity.',
      howToUse: 'Groww / Zerodha / INDmoney app se Instant Redemption feature ke saath invest karein.',
      realExample: 'Emergency money yahan rakhein — Savings A/C se 2x zyada return aur 24 hrs me bank transfer.',
      avgReturn: '6.5% – 7.2% p.a.',
      riskBadge: 'Low',
      horizon: '0 to 1 Year',
      pros: ['Instant Liquidity', 'No Lock-in Penalty', 'Better than Savings A/C'],
      hinglishTip: 'Emergency Fund park karne ki #1 jagah! Market volatility se bilkul safe. 🛡️',
    },
    {
      id: 'sgb',
      name: 'Sovereign Gold Bonds (SGB) & Gold ETFs',
      category: 'Moderate Risk',
      emoji: '🪙',
      def: 'Govt-issued paper gold. Physical gold ke price rise + 2.5% extra annual interest!',
      howToUse: 'RBI SGB tranche issue ya stock broker app (Gold ETF) se purchase karein.',
      realExample: 'Gold rate 10% badha + RBI ka 2.5% bonus interest = Total 12.5% annual return!',
      avgReturn: '9% – 12% p.a. + 2.5% Interest',
      riskBadge: 'Moderate',
      horizon: '5 to 8 Years',
      pros: ['Zero Theft/Storage Cost', '8 Year Capital Gain Tax Exemption', '2.5% Extra Govt Bonus'],
      hinglishTip: 'Physical gold lene ki jagah SGB lo! Making charges zero aur returns highest. 🌟',
    },
    {
      id: 'nifty-50',
      name: 'Nifty 50 Index Mutual Funds',
      category: 'Long-Term Growth',
      emoji: '🚀',
      def: 'India ki top 50 strongest companies (Reliance, HDFC, TCS, Infosys) me automated equity investment.',
      howToUse: 'SIP start karein ₹500/mo via UTI, HDFC ya Navi Nifty 50 Index Fund.',
      realExample: '₹5,000/mo Monthly SIP for 10 years at 13% ➔ ₹5.8 Lakhs invested = ₹11.6 Lakhs Corpus!',
      avgReturn: '12% – 14% p.a. (Historical)',
      riskBadge: 'Moderate',
      horizon: '5+ Years',
      pros: ['Ultra-Low Expense Ratio (<0.1%)', 'India Economy Growth Rider', 'Zero Stock Selection Risk'],
      hinglishTip: 'Har beginner salary earner ki core wealth building SIP! Long-term me inflation ko beat karega. 📈',
    },
    {
      id: 'flexi-cap',
      name: 'Flexi-Cap & Multi-Cap Mutual Funds',
      category: 'Long-Term Growth',
      emoji: '📊',
      def: 'Fund manager Large, Mid aur Small companies me valuation ke basis par shift karta hai.',
      howToUse: 'Parag Parikh, Quant ya PPFAS Flexi Cap Fund me monthly SIP set up karein.',
      realExample: 'Market boom me mid-caps se high return aur crash me large-caps se protection.',
      avgReturn: '13% – 16% p.a.',
      riskBadge: 'Moderate',
      horizon: '5+ Years',
      pros: ['Dynamic Diversification', 'Expert Fund Manager', 'Global US Tech Exposure in some funds'],
      hinglishTip: 'Wealth compound karne ke liye Nifty 50 ke sath Flexi-cap fund add karein! 🔥',
    },
    {
      id: 'reits',
      name: 'REITs (Real Estate Investment Trusts)',
      category: 'High Risk / Alt',
      emoji: '🏢',
      def: 'Commercial office parks & malls ka stock market share! Monthly/Quarterly dividend payouts.',
      howToUse: 'Embassy, Mindspace ya Brookfield REIT shares Demat account se khareedein.',
      realExample: '₹1 Lakh REIT investment ➔ ~₹6,500 annual dividend cash payout + property price growth.',
      avgReturn: '7% Dividend + 4% Capital Growth',
      riskBadge: 'Moderate',
      horizon: '3 to 7 Years',
      pros: ['Real Estate Ownership without Crores', 'Regular Dividend Payouts', 'High Quality Assets'],
      hinglishTip: 'Bina property maintain kiye real estate rent earn karne ka smartest modern way! 🏡',
    },
    {
      id: 'nps',
      name: 'National Pension System (NPS)',
      category: 'Moderate Risk',
      emoji: '👴',
      def: 'Govt-sponsored retirement fund with extra ₹50,000 tax deduction under Sec 80CCD(1B).',
      howToUse: 'NPS portal par Tier-1 account open karein. Select Auto Choice equity exposure.',
      realExample: 'Extra ₹50,000 invest karke ~₹15,000 income tax instantly save karein.',
      avgReturn: '10% – 12% p.a.',
      riskBadge: 'Moderate',
      horizon: 'Till Age 60',
      pros: ['Extra ₹50K Tax Exemption', 'Low Cost Fund Management', 'Pension Annuity Output'],
      hinglishTip: 'Tax saver special! Retirement ke liye locked discipline corpus. 🎓',
    },
    {
      id: 'small-cap',
      name: 'Small-Cap Funds & Direct Equity',
      category: 'High Risk / Alt',
      emoji: '⚡',
      def: 'Emerging small companies (rank 251+) me high growth potential investment.',
      howToUse: 'Nippon/SBI Small Cap fund ya direct stock research via Tickertape.',
      realExample: 'High volatility! Bull run me +40% surge, bear market me -25% dip. 10+ year view needed.',
      avgReturn: '15% – 20% p.a. (Volatile)',
      riskBadge: 'Very High',
      horizon: '7 to 10+ Years',
      pros: ['Multi-Bagger Return Potential', 'Fastest Growing Companies'],
      hinglishTip: 'Sirf tabhi invest karein jab risk capacity high ho aur emergency fund ready ho! 🚨',
    },
  ];

  const categories = ['All', 'Low Risk', 'Moderate Risk', 'Long-Term Growth', 'High Risk / Alt'];

  const filteredInvestments = selectedCategory === 'All'
    ? investments
    : investments.filter((item) => item.category === selectedCategory);

  // Projection math
  const projectedValues = investments.map((inv) => {
    let rate = 7;
    if (inv.avgReturn.includes('12%')) rate = 13;
    if (inv.avgReturn.includes('15%')) rate = 15;
    if (inv.avgReturn.includes('7.1%')) rate = 7.1;
    if (inv.avgReturn.includes('9%')) rate = 10;

    const m = calcYears * 12;
    const r = rate / 12 / 100;
    const fv = calcAmount * ((Math.pow(1 + r, m) - 1) / r) * (1 + r);
    const invTotal = calcAmount * m;

    return {
      name: inv.name,
      emoji: inv.emoji,
      rate: `${rate}%`,
      totalInvested: Math.round(invTotal),
      futureValue: Math.round(fv),
      wealthGain: Math.round(fv - invTotal),
    };
  });

  const getRiskBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Low':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
      case 'Moderate':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-300';
      case 'High':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold border border-emerald-300 dark:border-emerald-800">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Beginner-Friendly Indian Investment Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Where to Invest Your Salary? 💰
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Simple definitions, real life examples, risk levels, and instant returns visualizer for Indian investors.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-[#131B2E] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat === 'All' ? '✨ Show All Options' : cat}
          </button>
        ))}
      </div>

      {/* INVESTMENT INSTRUMENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvestments.map((inv) => (
          <div key={inv.id} className="glass-card p-6 border-slate-200 dark:border-slate-800 space-y-4 relative flex flex-col justify-between hover:border-emerald-500/50 transition">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{inv.emoji}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getRiskBadgeColor(inv.riskBadge)}`}>
                  {inv.riskBadge} Risk
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{inv.name}</span>
                </h3>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Est Return: {inv.avgReturn}
                </p>
              </div>

              {/* Definition */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">📖 Definition:</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{inv.def}</p>
              </div>

              {/* How to Use */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">📲 How to Start:</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{inv.howToUse}</p>
              </div>

              {/* Real Example */}
              <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs space-y-1">
                <p className="font-bold text-emerald-900 dark:text-emerald-300">💡 Real Example:</p>
                <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">{inv.realExample}</p>
              </div>
            </div>

            {/* Pros Badges & Hinglish Tip */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {inv.pros.map((p, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    ✓ {p}
                  </span>
                ))}
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 text-white text-[11px] leading-relaxed">
                {inv.hinglishTip}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* INTERACTIVE PROJECTED RETURN VISUALIZER DASHBOARD */}
      <section className="glass-card p-6 sm:p-10 border-emerald-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-emerald-500" />
              <span>Projected Wealth Growth Simulator 📊</span>
            </h2>
            <p className="text-xs text-slate-500">
              See how a monthly SIP grows across different instruments over time.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300">Monthly SIP: ₹</label>
            <input
              type="number"
              value={calcAmount}
              onChange={(e) => setCalcAmount(Number(e.target.value))}
              className="w-24 p-1.5 rounded-xl bg-white dark:bg-slate-800 font-bold text-emerald-600 text-sm focus:outline-none"
            />
            <label className="font-bold text-slate-700 dark:text-slate-300 ml-2">Duration:</label>
            <select
              value={calcYears}
              onChange={(e) => setCalcYears(Number(e.target.value))}
              className="p-1.5 rounded-xl bg-white dark:bg-slate-800 font-bold text-slate-900 dark:text-white focus:outline-none"
            >
              <option value={3}>3 Years</option>
              <option value={5}>5 Years</option>
              <option value={10}>10 Years</option>
              <option value={15}>15 Years</option>
            </select>
          </div>
        </div>

        {/* Projection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectedValues.slice(0, 6).map((proj, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{proj.emoji}</span>
                  <span>{proj.name}</span>
                </span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{proj.rate}</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Total Invested:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">₹{proj.totalInvested.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Wealth Profit Gain:</span>
                  <span className="font-bold text-emerald-600">+₹{proj.wealthGain.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm pt-1 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-slate-900 dark:text-white">Est. Total Corpus:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">₹{proj.futureValue.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-500 italic text-center">
          *Illustrative projections based on historical compound averages. Market returns are non-guaranteed.
        </p>
      </section>

    </div>
  );
};
