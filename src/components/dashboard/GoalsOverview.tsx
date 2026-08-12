import React from 'react';
import { Target, Flag, Clock } from 'lucide-react';
import { UserFinancialState } from '../../types';

interface GoalsOverviewProps {
  userState: UserFinancialState;
}

export const GoalsOverview: React.FC<GoalsOverviewProps> = ({ userState }) => {
  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            <span>Financial Goals Overview</span>
          </h2>
          <p className="text-xs text-slate-500">
            Track milestones and required monthly SIP contributions.
          </p>
        </div>
      </div>

      {userState.goals.length === 0 ? (
        <p className="text-xs text-slate-400 italic">No financial goals configured yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userState.goals.map((g) => {
            const progress = g.targetAmount > 0 ? Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100)) : 0;
            const remaining = Math.max(0, g.targetAmount - g.currentAmount);
            const reqMonthly = Math.round(remaining / Math.max(1, g.targetDateMonths));

            return (
              <div key={g.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{g.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {g.priority} Priority
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Target</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{g.targetAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Current Corpus</span>
                    <span className="font-bold text-emerald-500">₹{g.currentAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-purple-500 h-full rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-right font-bold text-purple-600 dark:text-purple-400">{progress}% Completed</p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{g.targetDateMonths} mos</span>
                  </span>
                  <span className="text-purple-600 dark:text-purple-400">
                    Req SIP: ₹{reqMonthly.toLocaleString('en-IN')}/mo
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
