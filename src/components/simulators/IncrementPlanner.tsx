import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { planSalaryIncrement } from '../../calculations/scenarioSimulator';

interface IncrementPlannerProps {
  currentSalary: number;
}

export const IncrementPlanner: React.FC<IncrementPlannerProps> = ({ currentSalary }) => {
  const [newSalary, setNewSalary] = useState(currentSalary + 10000);

  const plan = planSalaryIncrement(currentSalary, newSalary);

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <span>Salary Increment Planner</span>
          </h2>
          <p className="text-xs text-slate-500">
            Got a salary raise? Prevent lifestyle inflation by pre-allocating your increment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold">Current Salary (₹)</label>
            <input
              type="number"
              disabled
              value={currentSalary}
              className="w-full mt-1 p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold">New Salary After Raise (₹)</label>
            <input
              type="number"
              value={newSalary}
              onChange={(e) => setNewSalary(Number(e.target.value))}
              className="w-full mt-1 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-600 font-bold text-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold flex justify-between">
            <span>Net Monthly Increment:</span>
            <span>₹{plan.incrementAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Suggested Split */}
        <div className="space-y-3 text-xs">
          <p className="font-bold text-slate-900 dark:text-white">Suggested Increment Split Framework:</p>
          
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex justify-between font-semibold">
            <span>🚀 Wealth Investments (60%)</span>
            <span className="font-bold text-emerald-600">₹{plan.suggestedAllocation.investments.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex justify-between font-semibold">
            <span>🎯 Financial Goals (20%)</span>
            <span className="font-bold text-purple-600">₹{plan.suggestedAllocation.goals.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex justify-between font-semibold">
            <span>🛡️ Emergency / Debt Buffer (10%)</span>
            <span className="font-bold text-amber-600">₹{plan.suggestedAllocation.emergencyDebt.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex justify-between font-semibold">
            <span>🛍️ Lifestyle Treat (10%)</span>
            <span className="font-bold text-teal-600">₹{plan.suggestedAllocation.lifestyle.toLocaleString('en-IN')}</span>
          </div>

          <p className="text-[11px] text-slate-500 italic pt-2">{plan.hinglishAdvice}</p>
        </div>

      </div>

    </div>
  );
};
