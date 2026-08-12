import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, ShieldAlert, Sparkles } from 'lucide-react';
import { calculateSip } from '../../calculations/sipCalculator';

export const SipCalculatorComponent: React.FC = () => {
  const [monthlySip, setMonthlySip] = useState(15000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  const sip = calculateSip(monthlySip, returnRate, years);

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-500" />
            <span>Interactive SIP Compound Growth Calculator</span>
          </h2>
          <p className="text-xs text-slate-500">
            Calculate estimated future corpus wealth generated via systematic investment plans.
          </p>
        </div>

        <div className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
          Illustration Only — Actual returns can be higher or lower
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Controls */}
        <div className="space-y-6 text-xs">
          
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Monthly Investment (₹)</label>
              <span className="text-emerald-600 font-extrabold text-sm">₹{monthlySip.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlySip}
              onChange={(e) => setMonthlySip(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Expected Annual Return (% p.a.)</label>
              <span className="text-teal-600 font-extrabold text-sm">{returnRate}%</span>
            </div>
            <input
              type="range"
              min="4"
              max="20"
              step="0.5"
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Investment Duration (Years)</label>
              <span className="text-purple-600 font-extrabold text-sm">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="text-[10px] text-slate-500 font-semibold">Total Invested</p>
              <p className="font-extrabold text-sm text-slate-900 dark:text-white">₹{sip.totalInvested.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <p className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold">Est. Returns</p>
              <p className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">₹{sip.estimatedReturns.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <p className="text-[10px] text-teal-800 dark:text-teal-300 font-semibold">Future Value</p>
              <p className="font-extrabold text-sm text-teal-600 dark:text-teal-400">₹{sip.futureValue.toLocaleString('en-IN')}</p>
            </div>
          </div>

        </div>

        {/* Growth Area Chart */}
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sip.growthChartData}>
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false}
                tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`} 
              />
              <Tooltip 
                formatter={(val: any) => `₹${Number(val).toLocaleString('en-IN')}`}
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
              />
              <Area type="monotone" dataKey="totalValue" name="Total Wealth" stroke="#10B981" fill="#10B981" fillOpacity={0.2} strokeWidth={2} />
              <Area type="monotone" dataKey="invested" name="Invested Capital" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};
