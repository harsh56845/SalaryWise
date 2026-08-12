import React from 'react';
import { UserFinancialState } from '../../types';
import { WhatIfSimulator } from './WhatIfSimulator';
import { IncrementPlanner } from './IncrementPlanner';
import { SipCalculatorComponent } from './SipCalculatorComponent';
import { GoalCalculatorComponent } from './GoalCalculatorComponent';

interface SimulatorsTabProps {
  userState: UserFinancialState;
}

export const SimulatorsTab: React.FC<SimulatorsTabProps> = ({ userState }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Financial Simulators & Calculators
        </h1>
        <p className="text-xs text-slate-500">
          Interactive planning tools for SIP growth, goal targets, salary raises, and "What-If" scenarios.
        </p>
      </div>

      <WhatIfSimulator userState={userState} />
      <IncrementPlanner currentSalary={userState.monthlySalary} />
      <SipCalculatorComponent />
      <GoalCalculatorComponent />

    </div>
  );
};
