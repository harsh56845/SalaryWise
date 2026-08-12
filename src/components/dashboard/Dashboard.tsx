import React from 'react';
import { UserFinancialState } from '../../types';
import { calculateSalaryAllocation } from '../../calculations/allocationEngine';
import { calculateFinancialHealthScore } from '../../calculations/healthScoreEngine';

import { TopSalaryHeader } from './TopSalaryHeader';
import { AllocationDonut } from './AllocationDonut';
import { HealthScoreCard } from './HealthScoreCard';
import { NextSalaryPlan } from './NextSalaryPlan';
import { EmergencyFundCard } from './EmergencyFundCard';
import { InvestmentMatrix } from './InvestmentMatrix';
import { ExpenseOptimizer } from './ExpenseOptimizer';
import { GoalsOverview } from './GoalsOverview';
import { ActionChecklist } from './ActionChecklist';
import { PdfReportExporter } from '../common/PdfReportExporter';

interface DashboardProps {
  userState: UserFinancialState;
  onEditInputs: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userState, onEditInputs }) => {
  const allocation = calculateSalaryAllocation(userState);
  const health = calculateFinancialHealthScore(userState);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner with Header & Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Personalized Financial Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time monthly salary plan, health score, and investment guidance • Built by Harsh.
          </p>
        </div>

        <PdfReportExporter userState={userState} />
      </div>

      {/* Top Summary Header Card */}
      <TopSalaryHeader allocation={allocation} onEditInputs={onEditInputs} />

      {/* "What Should I Do With My Next Salary?" Primary Section */}
      <NextSalaryPlan allocation={allocation} userState={userState} />

      {/* Allocation Donut & Financial Health Score */}
      <div className="grid grid-cols-1 gap-8">
        <AllocationDonut allocation={allocation} />
        <HealthScoreCard health={health} />
      </div>

      {/* Emergency Fund & Expense Optimizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EmergencyFundCard userState={userState} />
        <ExpenseOptimizer userState={userState} />
      </div>

      {/* Investment Suggestions Matrix */}
      <InvestmentMatrix userState={userState} />

      {/* Financial Goals Overview */}
      <GoalsOverview userState={userState} />

      {/* Monthly Action Routine Checklist */}
      <ActionChecklist />

    </div>
  );
};
