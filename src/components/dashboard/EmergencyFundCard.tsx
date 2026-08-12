import React from 'react';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { UserFinancialState } from '../../types';
import { calculateEmergencyFundAnalysis } from '../../calculations/emergencyFundEngine';

interface EmergencyFundCardProps {
  userState: UserFinancialState;
}

export const EmergencyFundCard: React.FC<EmergencyFundCardProps> = ({ userState }) => {
  const emergency = calculateEmergencyFundAnalysis(userState);

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            <span>Emergency Fund Planning</span>
          </h2>
          <p className="text-xs text-slate-500">
            Target: 6 months of essential living expenses (₹{emergency.essentialMonthlyExpenses.toLocaleString('en-IN')}/mo).
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          {emergency.monthsCoveredCurrent} Months Covered
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 font-semibold">Current Fund</p>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            ₹{emergency.currentEmergencyFund.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 font-semibold">6-Month Target</p>
          <p className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">
            ₹{emergency.targetFund6Months.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 font-semibold">Target Deficit</p>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
            ₹{emergency.deficit.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Target Progress</span>
          <span>{emergency.progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all"
            style={{ width: `${emergency.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Guidance */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
        <p className="font-bold text-slate-900 dark:text-white">Liquid Parking Recommendation:</p>
        <p className="text-slate-600 dark:text-slate-300">
          Keep your emergency cushion in instant-access accounts like <strong>High-Yield Savings A/C, Liquid Mutual Funds, or Short FDs</strong>.
        </p>
        <p className="text-rose-500 font-semibold flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Do NOT store emergency money in volatile equity stocks or crypto assets!</span>
        </p>
      </div>

    </div>
  );
};
