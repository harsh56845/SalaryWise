import React from 'react';
import { Award, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { FinancialHealthResult } from '../../types';

interface HealthScoreCardProps {
  health: FinancialHealthResult;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ health }) => {
  const getBadgeColor = (rating: string) => {
    switch (rating) {
      case 'EXCELLENT':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
      case 'GOOD':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-300';
      case 'FAIR':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300';
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" />
            <span>Financial Health Score</span>
          </h2>
          <p className="text-xs text-slate-500">Comprehensive score evaluated out of 100 points across 6 financial metrics.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{health.totalScore}</span>
          <span className="text-sm font-bold text-slate-400">/ 100</span>
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getBadgeColor(health.rating)}`}>
            {health.rating}
          </span>
        </div>
      </div>

      {/* 6 Category Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {health.breakdown.map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-900 dark:text-white">{item.category}</span>
              <span className={item.status === 'good' ? 'text-emerald-500' : item.status === 'warning' ? 'text-amber-500' : 'text-rose-500'}>
                {item.score} / {item.maxPoints} pts
              </span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  item.status === 'good' ? 'bg-emerald-500' : item.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${(item.score / item.maxPoints) * 100}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{item.reason}</p>
          </div>
        ))}
      </div>

      {/* Strengths & Warnings Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Positive Checklist */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2 text-xs">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Key Strengths (✓)</span>
          </h4>
          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
            {health.positivePoints.length > 0 ? (
              health.positivePoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span>{pt}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">No major strengths recorded yet.</li>
            )}
          </ul>
        </div>

        {/* Warning Checklist */}
        <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2 text-xs">
          <h4 className="font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Actionable Warnings (⚠)</span>
          </h4>
          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
            {health.warningPoints.length > 0 ? (
              health.warningPoints.map((wpt, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span>{wpt}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">No critical warnings! Keep maintaining your financial discipline.</li>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};
