import React from 'react';
import { TrendingUp, ShieldAlert, Sparkles, Award } from 'lucide-react';
import { UserFinancialState, InvestmentSuggestion } from '../../types';
import { generateInvestmentSuggestions } from '../../calculations/investmentSuggestions';

interface InvestmentMatrixProps {
  userState: UserFinancialState;
}

export const InvestmentMatrix: React.FC<InvestmentMatrixProps> = ({ userState }) => {
  const suggestions = generateInvestmentSuggestions(userState);

  const getRiskBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Low':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Moderate':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300';
      case 'High':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <span>Beginner Investment Suggestions</span>
          </h2>
          <p className="text-xs text-slate-500">
            Tailored investment instruments based on your risk profile, timeline, and emergency fund status.
          </p>
        </div>

        <div className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          Illustration Only — Returns Not Guaranteed
        </div>
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">
                {item.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getRiskBadgeColor(item.riskBadge)}`}>
                {item.riskBadge} Risk
              </span>
            </div>

            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {item.instruments.join(' • ')}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-900 dark:text-emerald-300">
              <p className="font-bold text-[11px] mb-0.5">💡 Hinglish Tip:</p>
              <p className="italic leading-relaxed">{item.hinglishTip}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 text-slate-300 text-xs space-y-1">
        <p className="font-bold text-amber-400 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4" />
          Financial Safety Notice:
        </p>
        <p className="text-[11px] leading-relaxed">
          This application provides educational and illustrative financial information and is not personalized investment advice. Investment decisions involve risk, and market-linked investments can lose value. Users should evaluate their own financial situation and consult a qualified financial professional where appropriate.
        </p>
      </div>

    </div>
  );
};
