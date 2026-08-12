import React from 'react';
import { Edit3, Code2, Sparkles } from 'lucide-react';
import { SalaryAllocationResult } from '../../types';

interface TopSalaryHeaderProps {
  allocation: SalaryAllocationResult;
  onEditInputs: () => void;
}

export const TopSalaryHeader: React.FC<TopSalaryHeaderProps> = ({ allocation, onEditInputs }) => {
  const totalMonthlySavings = allocation.recommendedAllocation.emergency + allocation.recommendedAllocation.investments;
  const savingsRate = allocation.totalMonthlyIncome > 0 ? Math.round((totalMonthlySavings / allocation.totalMonthlyIncome) * 100) : 0;

  return (
    <div className="glass-card p-6 sm:p-8 border-emerald-500/30 space-y-6">
      
      {/* Salary Overview Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Code2 className="w-3.5 h-3.5" />
            <span>Designed by Harsh</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <span>₹{allocation.totalMonthlyIncome.toLocaleString('en-IN')}</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Monthly In-Hand Income
            </span>
          </h1>
        </div>

        <button
          onClick={onEditInputs}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Edit Financial Inputs</span>
        </button>
      </div>

      {/* 4 Simple Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs text-slate-500 font-semibold">Essential Expenses</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            ₹{allocation.essentialExpenses.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {Math.round((allocation.essentialExpenses / (allocation.totalMonthlyIncome || 1)) * 100)}% of income
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs text-slate-500 font-semibold">Monthly EMIs</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            ₹{allocation.totalMonthlyEmi.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            DTI Ratio: {allocation.dtiRatio}%
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
          <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">Monthly Savings & SIPs</p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            ₹{totalMonthlySavings.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
            Savings Rate: {savingsRate}%
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
          <p className="text-xs text-teal-800 dark:text-teal-300 font-semibold">Available Monthly Surplus</p>
          <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
            ₹{allocation.surplus.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium">
            Ready for allocation
          </p>
        </div>

      </div>

    </div>
  );
};
