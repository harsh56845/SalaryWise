import React, { useState } from 'react';
import { Sliders, Sparkles, TrendingUp, RefreshCw } from 'lucide-react';
import { UserFinancialState } from '../../types';
import { simulateWhatIf } from '../../calculations/scenarioSimulator';

interface WhatIfSimulatorProps {
  userState: UserFinancialState;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ userState }) => {
  const [salaryPercent, setSalaryPercent] = useState(10);
  const [rentDelta, setRentDelta] = useState(-3000);
  const [investmentDelta, setInvestmentDelta] = useState(5000);
  const [emiDelta, setEmiDelta] = useState(0);

  const result = simulateWhatIf(userState, {
    salaryChangePercent: salaryPercent,
    rentChangeAmount: rentDelta,
    investmentChangeAmount: investmentDelta,
    emiChangeAmount: emiDelta,
  });

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-500" />
            <span>“What If?” Scenario Simulator</span>
          </h2>
          <p className="text-xs text-slate-500">
            Modify your income, rent, or EMIs to preview instant future financial impact.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="space-y-5 text-xs">
          
          {/* Salary Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Salary Change (%)</label>
              <span className="text-emerald-600 font-bold">{salaryPercent > 0 ? `+${salaryPercent}%` : `${salaryPercent}%`}</span>
            </div>
            <input
              type="range"
              min="-20"
              max="50"
              step="5"
              value={salaryPercent}
              onChange={(e) => setSalaryPercent(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Rent Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Rent Adjustment (₹)</label>
              <span className="text-teal-600 font-bold">₹{rentDelta.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="-10000"
              max="10000"
              step="1000"
              value={rentDelta}
              onChange={(e) => setRentDelta(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          {/* Monthly Investment Boost Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Extra Monthly Investment (₹)</label>
              <span className="text-purple-600 font-bold">+₹{investmentDelta.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="25000"
              step="1000"
              value={investmentDelta}
              onChange={(e) => setInvestmentDelta(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

        </div>

        {/* Dynamic Simulation Result Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
              <p className="text-[11px] text-slate-400">Current Savings Rate</p>
              <p className="text-2xl font-extrabold text-slate-300">{result.originalSavingsRate}%</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/80">
              <p className="text-[11px] text-emerald-400">Simulated Savings Rate</p>
              <p className="text-2xl font-extrabold text-emerald-400">{result.newSavingsRate}%</p>
            </div>
          </div>

          <div className="text-center space-y-1">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Additional Annual Wealth Accumulated</p>
            <p className="text-3xl font-extrabold text-emerald-400">
              +₹{result.additionalAnnualSavings.toLocaleString('en-IN')} / year
            </p>
          </div>

          <p className="text-xs text-slate-300 italic leading-relaxed text-center">
            {result.summaryNote}
          </p>
        </div>

      </div>

    </div>
  );
};
