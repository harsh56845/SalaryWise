import React, { useState } from 'react';
import { Target, Clock, ArrowRight } from 'lucide-react';
import { calculateRequiredSipForGoal } from '../../calculations/sipCalculator';

export const GoalCalculatorComponent: React.FC = () => {
  const [targetAmount, setTargetAmount] = useState(1000000); // 10 Lakhs
  const [currentSavings, setCurrentSavings] = useState(150000);
  const [returnRate, setReturnRate] = useState(12);
  const [durationMonths, setDurationMonths] = useState(60); // 5 Years

  const goal = calculateRequiredSipForGoal(targetAmount, currentSavings, returnRate, durationMonths);

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            <span>Target Goal SIP Calculator</span>
          </h2>
          <p className="text-xs text-slate-500">
            Calculate exact monthly investment required to reach any future financial goal target.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold">Target Goal Amount (₹)</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full mt-1 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-lg text-purple-600 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold">Current Corpus (₹)</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full mt-1 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold">Time Horizon (Months)</label>
              <input
                type="number"
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full mt-1 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/80 via-slate-900 to-slate-900 text-white space-y-4 border border-purple-800/50">
          <div className="space-y-1">
            <p className="text-xs text-purple-300 uppercase tracking-wider font-semibold">Required Monthly SIP Contribution</p>
            <p className="text-3xl font-extrabold text-purple-400">
              ₹{goal.requiredMonthlySip.toLocaleString('en-IN')} / mo
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span>Goal Corpus Saved</span>
              <span>{goal.progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${goal.progressPercent}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 text-xs text-slate-300 flex justify-between font-semibold">
            <span>Remaining Net Goal Deficit:</span>
            <span className="text-purple-300">₹{goal.remainingCorpusNeeded.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
