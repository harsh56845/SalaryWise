import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { SalaryAllocationResult } from '../../types';
import { HinglishTooltip } from '../common/HinglishTooltip';

interface AllocationDonutProps {
  allocation: SalaryAllocationResult;
}

export const AllocationDonut: React.FC<AllocationDonutProps> = ({ allocation }) => {
  const rec = allocation.recommendedAllocation;

  const data = [
    { name: 'Essential Needs', value: rec.needs, color: '#3B82F6', percent: rec.needsPercent },
    { name: 'Debt & EMIs', value: rec.debt, color: '#F43F5E', percent: rec.debtPercent },
    { name: 'Emergency Fund', value: rec.emergency, color: '#F59E0B', percent: rec.emergencyPercent },
    { name: 'Wealth Investments', value: rec.investments, color: '#10B981', percent: rec.investmentsPercent },
    { name: 'Lifestyle & Wants', value: rec.wants, color: '#8B5CF6', percent: rec.wantsPercent },
  ].filter((item) => item.value > 0);

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Personalized Salary Allocation
          </h2>
          <p className="text-xs text-slate-500">
            Dynamic distribution based on your debt, expenses, and emergency runway.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Donut Chart */}
        <div className="h-64 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => `₹${Number(value).toLocaleString('en-IN')}`}
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute text-center pointer-events-none">
            <p className="text-[10px] uppercase font-bold text-slate-400">Monthly Salary</p>
            <p className="text-lg font-extrabold text-slate-900 dark:text-white">
              ₹{(allocation.totalMonthlyIncome || 0).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="space-y-3">
          {data.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-900 dark:text-white">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-900 dark:text-white">₹{item.value.toLocaleString('en-IN')}</span>
                  <span className="text-slate-400 font-normal ml-2">({item.percent}%)</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all" 
                  style={{ width: `${item.percent}%`, backgroundColor: item.color }} 
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Explanations */}
      {allocation.allocationReasoning.length > 0 && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2 text-xs">
          <p className="font-bold text-emerald-900 dark:text-emerald-300">Why this recommendation?</p>
          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
            {allocation.allocationReasoning.map((reason, i) => (
              <li key={i} className="leading-relaxed">• {reason}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
