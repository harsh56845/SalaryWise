import React from 'react';
import { PieChart as PieIcon, AlertTriangle, TrendingDown, CheckCircle2 } from 'lucide-react';
import { UserFinancialState } from '../../types';
import { calculateSalaryAllocation } from '../../calculations/allocationEngine';

interface ExpenseOptimizerProps {
  userState: UserFinancialState;
}

export const ExpenseOptimizer: React.FC<ExpenseOptimizerProps> = ({ userState }) => {
  const allocation = calculateSalaryAllocation(userState);
  const income = allocation.totalMonthlyIncome || 1;

  const housingTotal = Object.values(userState.expenses.housing).reduce((a, b) => a + b, 0);
  const foodTotal = Object.values(userState.expenses.food).reduce((a, b) => a + b, 0);
  const transportTotal = Object.values(userState.expenses.transport).reduce((a, b) => a + b, 0);
  const lifestyleTotal = Object.values(userState.expenses.lifestyle).reduce((a, b) => a + b, 0);

  const housingPct = Math.round((housingTotal / income) * 100);
  const foodPct = Math.round((foodTotal / income) * 100);
  const transportPct = Math.round((transportTotal / income) * 100);
  const lifestylePct = Math.round((lifestyleTotal / income) * 100);

  // Suggestions
  const foodDelivery = userState.expenses.food.foodDelivery || 0;
  const subscriptions = userState.expenses.lifestyle.subscriptions || 0;
  const eatingOut = userState.expenses.food.eatingOut || 0;

  const potentialSavings = Math.round(foodDelivery * 0.7 + subscriptions * 0.5 + eatingOut * 0.4);

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-teal-500" />
            <span>Expense Breakdown & Optimization</span>
          </h2>
          <p className="text-xs text-slate-500">
            Identify high-spending categories and unlock extra monthly savings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-semibold">Housing & Bills</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">₹{housingTotal.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-400">{housingPct}% of salary</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-semibold">Food & Dining</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">₹{foodTotal.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-400">{foodPct}% of salary</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-semibold">Transportation</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">₹{transportTotal.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-400">{transportPct}% of salary</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-semibold">Lifestyle & Subscriptions</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">₹{lifestyleTotal.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-400">{lifestylePct}% of salary</p>
        </div>
      </div>

      {/* Actionable Cost-Cutting Suggestions */}
      <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-teal-900 dark:text-teal-300 flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-teal-500" />
            <span>Actionable Monthly Expense Trim Options</span>
          </span>
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
            Potential Savings: ₹{potentialSavings.toLocaleString('en-IN')}/mo
          </span>
        </div>

        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          {foodDelivery > 0 && (
            <li className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-800">
              <span>Reduce online food delivery frequency</span>
              <span className="font-bold text-emerald-600">Save ~₹{Math.round(foodDelivery * 0.7).toLocaleString('en-IN')}</span>
            </li>
          )}
          {subscriptions > 0 && (
            <li className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-800">
              <span>Audit & cancel unused OTT subscriptions</span>
              <span className="font-bold text-emerald-600">Save ~₹{Math.round(subscriptions * 0.5).toLocaleString('en-IN')}</span>
            </li>
          )}
          {eatingOut > 0 && (
            <li className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-800">
              <span>Limit weekend dining out to twice a month</span>
              <span className="font-bold text-emerald-600">Save ~₹{Math.round(eatingOut * 0.4).toLocaleString('en-IN')}</span>
            </li>
          )}
        </ul>
      </div>

    </div>
  );
};
