import React, { useState } from 'react';
import { 
  ArrowRight, TrendingUp, PieChart, ChevronDown, ChevronUp, 
  Sparkles, CheckCircle2, RefreshCw, Calculator, HelpCircle, Code2 
} from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onLoadSampleData: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartOnboarding, onLoadSampleData }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Kya ye application 50/30/20 rule blindly use karta hai?",
      a: "Nahi! 50/30/20 rule baseline framework hai. SalaryWise aapke high-interest debt, actual expenses, emergency buffer status, aur goals ke basis par dynamic allocation calculate karta hai."
    },
    {
      q: "Kya emergency fund ko equity stocks mein invest kar sakte hain?",
      a: "Nahi! Emergency fund ka purpose return earn karna nahi, balki emergency mein bina loss ke instantly accessible rehna hai. Isko Savings Account, Liquid Funds, ya Short FDs mein rakhna chahiye."
    },
    {
      q: "Agar meri salary ₹20,000 ya ₹30,000 hai, to kya main plan kar sakta hu?",
      a: "Bilkul! Low income brackets mein application sabse pehle Essential Needs aur Basic Emergency Buffer build karne ko prioritize karta hai, aggressive stocks ke bajaye."
    },
    {
      q: "Mera data safe hai kya?",
      a: "Yes! Aapka saara calculation aapke browser ke andar (100% Client-Side) hota hai. Hum kisi bhi server pe aapka bank details store nahi karte."
    },
    {
      q: "Credit Card EMI hone par investment start karein ya debt pay off karein?",
      a: "Credit card par 36-42% annual interest lagta hai. Is situation mein extra surplus ko debt repayment mein allocate karna kisi bhi market investment se zyada profitable hota hai."
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          {/* Creator & Fintech Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-sm">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span>Created & Designed by Harsh</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span>INR (₹) Salary Engine</span>
            </div>
          </div>

          {/* Main Heading & Logo */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex justify-center mb-2">
              <img 
                src={logoImg} 
                alt="SalaryWise Logo" 
                className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xl shadow-emerald-600/30 transform hover:scale-105 transition-transform" 
              />
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Is your salary disappearing <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
                every month?
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Enter your salary and expenses. Get a personalized plan for spending, saving, emergency funds, debt clearance, and beginner investments.
            </p>
            
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 italic">
              “Meri salary ka best use kya hona chahiye?” — Simple answer in 2 minutes.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Calculate My Salary Plan</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onLoadSampleData}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-base flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-emerald-500" />
              <span>Try with Sample Data (₹70,000)</span>
            </button>
          </div>

          {/* VISUAL SALARY FLOWCHART */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-xl">
              <p className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-6">
                Smart Financial Flow Architecture
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: "1. SALARY", color: "from-emerald-600 to-teal-600 text-white" },
                  { name: "2. NEEDS", color: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200" },
                  { name: "3. DEBT / EMIs", color: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300" },
                  { name: "4. EMERGENCY", color: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300" },
                  { name: "5. INVESTMENTS", color: "bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300" },
                  { name: "6. GOALS", color: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300" },
                ].map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3.5 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-sm ${step.color}`}
                  >
                    <span>{step.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How SalaryWise Works</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            3 simple steps to transform your monthly salary from random spending into wealth creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Input Income & Expenses",
              desc: "Enter your monthly salary, rent, food, EMIs, and existing savings buffer. Takes under 2 minutes.",
              icon: Calculator,
              color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50"
            },
            {
              step: "02",
              title: "Dynamic Allocation Engine",
              desc: "Our engine evaluates high-interest debt, emergency runway, and goals to calculate your exact monthly percentages.",
              icon: PieChart,
              color: "text-teal-500 bg-teal-50 dark:bg-teal-950/50"
            },
            {
              step: "03",
              title: "Action Plan & Suggestions",
              desc: "Get a clear step-by-step monthly action plan, financial health score (0-100), and safe investment options.",
              icon: TrendingUp,
              color: "text-purple-500 bg-purple-50 dark:bg-purple-950/50"
            }
          ].map((item, index) => (
            <div key={index} className="glass-card p-8 relative group hover:border-emerald-500/50 transition">
              <span className="text-4xl font-extrabold text-slate-200 dark:text-slate-800 absolute top-4 right-6 pointer-events-none">
                {item.step}
              </span>
              <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY NOT BLIND 50/30/20 RULE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 border-emerald-500/30 bg-gradient-to-br from-emerald-900/10 via-slate-900/40 to-slate-900/80">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Personalized Financial Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Why rigid 50/30/20 rules fail Indian salaries
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                If you have a high-interest credit card debt or zero emergency savings, investing 20% in equity stocks is financial risk. SalaryWise dynamically adjusts allocations based on your real financial situation:
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>High Credit Card Debt:</strong> Shifts surplus to debt repayment first.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>No Emergency Fund:</strong> Prioritizes 6-month liquid cushion.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Completed Runway:</strong> Shifts emergency money directly to high-growth SIPs.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-semibold text-slate-400">Scenario</span>
                <span className="font-semibold text-slate-400">SalaryWise Smart Allocation</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="font-bold text-amber-400">Scenario A: High Credit Card Debt</p>
                  <p className="text-slate-300">Needs 50% | Debt 25% | Emergency 15% | Investments 5% | Wants 5%</p>
                </div>
                <div>
                  <p className="font-bold text-emerald-400">Scenario B: Emergency Fund Completed</p>
                  <p className="text-slate-300">Needs 50% | Investments 35% | Goals 10% | Wants 5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON SALARY MISTAKES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Common Salary Mistakes to Avoid</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            Aapki salary kidhar gayab ho jaati hai? Recognize these 4 costly mistakes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Investing without Emergency Fund",
              desc: "Market crash me immediate paisa chahiye to loss me stocks sell karne padte hain.",
              badge: "Mistake #1"
            },
            {
              title: "Paying Minimum Credit Card EMI",
              desc: "36-42% interest rate aapke wealth growth ko silently destroy karta hai.",
              badge: "Mistake #2"
            },
            {
              title: "Lifestyle Inflation on Increments",
              desc: "Salary badhte hi rent aur shopping double ho jana while savings stay zero.",
              badge: "Mistake #3"
            },
            {
              title: "Emergency Money in Direct Stocks",
              desc: "Emergency funds capital preservation ke liye hote hain, volatile returns ke liye nahi.",
              badge: "Mistake #4"
            }
          ].map((m, idx) => (
            <div key={idx} className="glass-card p-6 border-rose-200 dark:border-rose-900/30 space-y-3">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                {m.badge}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{m.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-7 h-7 text-emerald-500" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Everything you need to know about SalaryWise planning.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between font-semibold text-slate-900 dark:text-white text-sm cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-emerald-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to take control of your monthly salary?
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
            Get your personalized salary allocation, emergency fund roadmap, and health score in 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartOnboarding}
              className="px-8 py-4 rounded-2xl bg-white text-emerald-900 font-extrabold text-base shadow-lg hover:bg-slate-100 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              Calculate My Salary Plan Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
