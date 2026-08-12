import React from 'react';
import { Sparkles } from 'lucide-react';
import { SalaryAllocationResult, UserFinancialState } from '../../types';

interface NextSalaryPlanProps {
  allocation: SalaryAllocationResult;
  userState: UserFinancialState;
}

export const NextSalaryPlan: React.FC<NextSalaryPlanProps> = ({ allocation }) => {
  const rec = allocation.recommendedAllocation;
  const income = allocation.totalMonthlyIncome;

  const planSteps = [
    {
      step: 1,
      name: 'Essential Living Needs',
      amount: rec.needs,
      desc: 'Rent, groceries, electricity, water, internet, medical insurance.',
      color: 'border-l-blue-500 bg-blue-50/60 dark:bg-blue-950/30',
      badgeColor: 'bg-blue-600 text-white',
    },
    {
      step: 2,
      name: 'Debt & EMI Payments',
      amount: rec.debt,
      desc: 'Home, car, education EMIs or credit card pre-payments.',
      color: 'border-l-rose-500 bg-rose-50/60 dark:bg-rose-950/30',
      badgeColor: 'bg-rose-600 text-white',
    },
    {
      step: 3,
      name: 'Emergency Fund Buffer',
      amount: rec.emergency,
      desc: 'High-Yield Savings A/C or Liquid Mutual Funds.',
      color: 'border-l-amber-500 bg-amber-50/60 dark:bg-amber-950/30',
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      step: 4,
      name: 'Wealth Investments (SIPs)',
      amount: rec.investments,
      desc: 'Nifty 50 Index Funds, Flexi-Cap MFs, PPF.',
      color: 'border-l-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30',
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      step: 5,
      name: 'Financial Goal Contribution',
      amount: Math.round(rec.investments * 0.3),
      desc: 'Dedicated target bucket (Vehicle, House, Wealth).',
      color: 'border-l-purple-500 bg-purple-50/60 dark:bg-purple-950/30',
      badgeColor: 'bg-purple-600 text-white',
    },
    {
      step: 6,
      name: 'Lifestyle & Personal Wants',
      amount: rec.wants,
      desc: 'Shopping, dining out, entertainment, hobbies.',
      color: 'border-l-teal-500 bg-teal-50/60 dark:bg-teal-950/30',
      badgeColor: 'bg-teal-600 text-white',
    },
  ].filter((item) => item.amount > 0);

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6 border-emerald-500/40">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Monthly Action Roadmap</span>
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            “What should I do with my next salary?”
          </h2>
          <p className="text-xs text-slate-500">
            Clear, step-by-step ₹ allocations as soon as your salary arrives.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm shadow-md">
          Salary: ₹{income.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {planSteps.map((s) => (
          <div 
            key={s.step} 
            className={`p-4 rounded-2xl border-l-4 border-y border-r border-slate-200 dark:border-slate-800 ${s.color} space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${s.badgeColor}`}>
                Step {s.step}
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                ₹{s.amount.toLocaleString('en-IN')}
              </span>
            </div>

            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{s.name}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Hinglish Explanation Box */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1.5 text-xs">
        <p className="font-bold text-emerald-400">💡 Dynamic Summary:</p>
        <p className="text-slate-300 leading-relaxed">
          “Aapke situation ke hisaab se sabse pehle essential needs (₹{rec.needs.toLocaleString('en-IN')}) aur EMIs pay karein. Surplus mein se ₹{rec.emergency.toLocaleString('en-IN')} Emergency buffer aur ₹{rec.investments.toLocaleString('en-IN')} SIPs mein allocate karein.”
        </p>
      </div>

    </div>
  );
};
