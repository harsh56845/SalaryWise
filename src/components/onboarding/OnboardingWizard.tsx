import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, DollarSign, CreditCard, Shield, 
  Target, Award, AlertTriangle, Plus, Trash2, HelpCircle, RefreshCw, Sparkles 
} from 'lucide-react';
import { UserFinancialState, LoanItem, FinancialGoal, LoanType } from '../../types';
import { HinglishTooltip } from '../common/HinglishTooltip';
import { calculateRiskProfile } from '../../calculations/riskProfileEngine';

interface OnboardingWizardProps {
  userState: UserFinancialState;
  onChange: (newState: UserFinancialState) => void;
  onComplete: () => void;
  onLoadSampleData: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  userState,
  onChange,
  onComplete,
  onLoadSampleData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Helper updates
  const updateIncome = (field: keyof UserFinancialState, value: number) => {
    onChange({ ...userState, [field]: value });
  };

  const updateExpenseCategory = (category: keyof typeof userState.expenses, field: string, value: number) => {
    onChange({
      ...userState,
      expenses: {
        ...userState.expenses,
        [category]: {
          ...userState.expenses[category],
          [field]: value,
        },
      },
    });
  };

  // Loans helper
  const addLoan = () => {
    const newLoan: LoanItem = {
      id: `loan-${Date.now()}`,
      name: 'Credit Card / Loan',
      type: 'Credit Card',
      outstandingAmount: 50000,
      emi: 3000,
      interestRate: 36,
      remainingTenureMonths: 12,
    };
    onChange({
      ...userState,
      hasDebt: true,
      loans: [...userState.loans, newLoan],
    });
  };

  const removeLoan = (id: string) => {
    const updated = userState.loans.filter((l) => l.id !== id);
    onChange({
      ...userState,
      hasDebt: updated.length > 0,
      loans: updated,
    });
  };

  const updateLoan = (id: string, field: keyof LoanItem, value: any) => {
    const updated = userState.loans.map((l) => (l.id === id ? { ...l, [field]: value } : l));
    onChange({ ...userState, loans: updated });
  };

  // Goals helper
  const addGoal = () => {
    const newGoal: FinancialGoal = {
      id: `goal-${Date.now()}`,
      name: 'New Goal',
      targetAmount: 200000,
      currentAmount: 10000,
      targetDateMonths: 24,
      priority: 'Medium',
      category: 'Vehicle',
    };
    onChange({
      ...userState,
      goals: [...userState.goals, newGoal],
    });
  };

  const removeGoal = (id: string) => {
    onChange({
      ...userState,
      goals: userState.goals.filter((g) => g.id !== id),
    });
  };

  const updateGoal = (id: string, field: keyof FinancialGoal, value: any) => {
    const updated = userState.goals.map((g) => (g.id === id ? { ...g, [field]: value } : g));
    onChange({ ...userState, goals: updated });
  };

  // Total Essential Expenses calculation for Step 5
  const essentialMonthlyExpenses = 
    (userState.expenses.housing.rent + userState.expenses.housing.maintenance + userState.expenses.housing.electricity + userState.expenses.housing.water + userState.expenses.housing.internet + userState.expenses.housing.mobile) +
    (userState.expenses.food.groceries) +
    (userState.expenses.transport.metroBus + userState.expenses.transport.fuel) +
    (userState.expenses.family.parents + userState.expenses.family.children + userState.expenses.family.education + userState.expenses.family.medical) +
    (userState.expenses.other.insurance);

  const emergencyTarget6Months = essentialMonthlyExpenses * 6;
  const currentEmergencyFundTotal = (userState.existingEmergencyFund || 0) + (userState.bankSavings || 0);
  const emergencyProgress = emergencyTarget6Months > 0 ? Math.min(100, Math.round((currentEmergencyFundTotal / emergencyTarget6Months) * 100)) : 0;

  const totalMonthlyEmi = userState.hasDebt 
    ? userState.loans.reduce((acc, l) => acc + (l.emi || 0), 0)
    : 0;

  const steps = [
    { num: 1, title: 'Income' },
    { num: 2, title: 'Expenses' },
    { num: 3, title: 'Debt & EMIs' },
    { num: 4, title: 'Savings' },
    { num: 5, title: 'Emergency Fund' },
    { num: 6, title: 'Goals' },
    { num: 7, title: 'Risk Profile' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header & Step Indicator */}
      <div className="glass-card p-6 border-emerald-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Step {currentStep} of 7 — {steps[currentStep - 1].title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fill details accurately to get your dynamic salary allocation plan.
            </p>
          </div>

          <button
            onClick={onLoadSampleData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Load Sample Data (₹70,000)</span>
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-7 gap-2">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`h-2 rounded-full transition-all ${
                s.num === currentStep
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 ring-2 ring-emerald-500/30'
                  : s.num < currentStep
                  ? 'bg-emerald-400 dark:bg-emerald-600'
                  : 'bg-slate-200 dark:bg-slate-800'
              }`}
              title={`Go to ${s.title}`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: INCOME */}
      {currentStep === 1 && (
        <div className="glass-card p-6 sm:p-8 space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <span>Monthly Income Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Your Name / Preferred Name
              </label>
              <input
                type="text"
                value={userState.userName || 'Harsh'}
                onChange={(e) => onChange({ ...userState, userName: e.target.value })}
                placeholder="e.g. Harsh"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Monthly In-Hand Salary (₹) *
                <HinglishTooltip text="In-Hand Salary" hinglish="Tax aur PF deduct hone ke baad bank account mein jitna paisa aata hai." />
              </label>
              <input
                type="number"
                value={userState.monthlySalary || ''}
                onChange={(e) => updateIncome('monthlySalary', Number(e.target.value))}
                placeholder="e.g. 70000"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-lg text-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Other Monthly Income (₹)
                <HinglishTooltip text="Side Income" hinglish="Freelance, rental income ya side business se monthly guaranteed income." />
              </label>
              <input
                type="number"
                value={userState.otherIncome || ''}
                onChange={(e) => updateIncome('otherIncome', Number(e.target.value))}
                placeholder="e.g. 0"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Annual Bonus (₹, Optional)
              </label>
              <input
                type="number"
                value={userState.annualBonus || ''}
                onChange={(e) => updateIncome('annualBonus', Number(e.target.value))}
                placeholder="e.g. 50000"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Expected Annual Salary Growth (%)
              </label>
              <input
                type="number"
                value={userState.expectedGrowth || ''}
                onChange={(e) => updateIncome('expectedGrowth', Number(e.target.value))}
                placeholder="e.g. 10"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">
              Total Monthly Income Calculated:
            </span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
              ₹{((userState.monthlySalary || 0) + (userState.otherIncome || 0)).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}

      {/* STEP 2: MONTHLY EXPENSES */}
      {currentStep === 2 && (
        <div className="glass-card p-6 sm:p-8 space-y-8 animate-fadeIn">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Monthly Expense Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Housing */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                1. Housing & Utility (Essential)
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">Rent (₹)</label>
                  <input
                    type="number"
                    value={userState.expenses.housing.rent || ''}
                    onChange={(e) => updateExpenseCategory('housing', 'rent', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">Electricity & Water (₹)</label>
                  <input
                    type="number"
                    value={userState.expenses.housing.electricity || ''}
                    onChange={(e) => updateExpenseCategory('housing', 'electricity', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">Internet & Mobile (₹)</label>
                  <input
                    type="number"
                    value={userState.expenses.housing.internet || ''}
                    onChange={(e) => updateExpenseCategory('housing', 'internet', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">Maintenance (₹)</label>
                  <input
                    type="number"
                    value={userState.expenses.housing.maintenance || ''}
                    onChange={(e) => updateExpenseCategory('housing', 'maintenance', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Food */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                2. Food & Dining
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">Groceries (Essential)</label>
                  <input
                    type="number"
                    value={userState.expenses.food.groceries || ''}
                    onChange={(e) => updateExpenseCategory('food', 'groceries', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">Outside Dining (₹)</label>
                  <input
                    type="number"
                    value={userState.expenses.food.eatingOut || ''}
                    onChange={(e) => updateExpenseCategory('food', 'eatingOut', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">Food Delivery Apps (₹)</label>
                  <input
                    type="number"
                    value={userState.expenses.food.foodDelivery || ''}
                    onChange={(e) => updateExpenseCategory('food', 'foodDelivery', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                3. Transportation
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">Metro / Bus / Commute</label>
                  <input
                    type="number"
                    value={userState.expenses.transport.metroBus || ''}
                    onChange={(e) => updateExpenseCategory('transport', 'metroBus', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">Fuel (Petrol/CNG)</label>
                  <input
                    type="number"
                    value={userState.expenses.transport.fuel || ''}
                    onChange={(e) => updateExpenseCategory('transport', 'fuel', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                4. Lifestyle & Subscriptions
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">Shopping (₹)</label>
                  <input
                    type="number"
                    value={userState.expenses.lifestyle.shopping || ''}
                    onChange={(e) => updateExpenseCategory('lifestyle', 'shopping', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400">OTT & Subscriptions (₹)</label>
                  <input
                    type="number"
                    value={userState.expenses.lifestyle.subscriptions || ''}
                    onChange={(e) => updateExpenseCategory('lifestyle', 'subscriptions', Number(e.target.value))}
                    className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* STEP 3: DEBT & LOANS */}
      {currentStep === 3 && (
        <div className="glass-card p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-rose-500" />
                <span>Loans & Credit Card Debt</span>
              </h2>
              <p className="text-xs text-slate-500">
                High-interest debt is prioritized for repayment before aggressive market investing.
              </p>
            </div>

            <button
              onClick={addLoan}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Loan / Card</span>
            </button>
          </div>

          {userState.loans.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 text-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-slate-900 dark:text-white">No Debt Listed!</p>
              <p className="text-xs">If you have EMIs or credit card balance, click "Add Loan / Card" above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userState.loans.map((loan) => (
                <div key={loan.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={loan.name}
                      onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
                      className="font-bold text-sm bg-transparent border-b border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                    />
                    <button
                      onClick={() => removeLoan(loan.id)}
                      className="text-rose-500 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="text-slate-500">Loan Type</label>
                      <select
                        value={loan.type}
                        onChange={(e) => updateLoan(loan.id, 'type', e.target.value as LoanType)}
                        className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      >
                        <option value="Credit Card">Credit Card</option>
                        <option value="Personal Loan">Personal Loan</option>
                        <option value="Home Loan">Home Loan</option>
                        <option value="Car Loan">Car Loan</option>
                        <option value="Education Loan">Education Loan</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-500">Monthly EMI (₹)</label>
                      <input
                        type="number"
                        value={loan.emi || ''}
                        onChange={(e) => updateLoan(loan.id, 'emi', Number(e.target.value))}
                        className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-slate-500">Interest Rate (% p.a.)</label>
                      <input
                        type="number"
                        value={loan.interestRate || ''}
                        onChange={(e) => updateLoan(loan.id, 'interestRate', Number(e.target.value))}
                        className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>

                    <div>
                      <label className="text-slate-500">Outstanding (₹)</label>
                      <input
                        type="number"
                        value={loan.outstandingAmount || ''}
                        onChange={(e) => updateLoan(loan.id, 'outstandingAmount', Number(e.target.value))}
                        className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  </div>

                  {loan.type === 'Credit Card' || loan.interestRate >= 15 ? (
                    <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-[11px] flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>“Aapke credit-card / personal debt ka interest rate high hai. Is situation mein additional money ka major portion debt repayment mein allocate karna investment se zyada sensible hai.”</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 flex justify-between items-center text-xs font-semibold">
            <span>Total Monthly EMIs: ₹{totalMonthlyEmi.toLocaleString('en-IN')}</span>
            <span className={totalMonthlyEmi > (userState.monthlySalary * 0.3) ? 'text-rose-500' : 'text-emerald-500'}>
              Debt-to-Income: {userState.monthlySalary > 0 ? Math.round((totalMonthlyEmi / userState.monthlySalary) * 100) : 0}%
            </span>
          </div>
        </div>
      )}

      {/* STEP 4: SAVINGS & ASSETS */}
      {currentStep === 4 && (
        <div className="glass-card p-6 sm:p-8 space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-500" />
            <span>Current Assets & Savings</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Bank Savings Account (₹)</label>
              <input
                type="number"
                value={userState.bankSavings || ''}
                onChange={(e) => updateIncome('bankSavings', Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Existing Emergency Fund (₹)</label>
              <input
                type="number"
                value={userState.existingEmergencyFund || ''}
                onChange={(e) => updateIncome('existingEmergencyFund', Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Mutual Funds (₹)</label>
              <input
                type="number"
                value={userState.mutualFunds || ''}
                onChange={(e) => updateIncome('mutualFunds', Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Direct Stocks (₹)</label>
              <input
                type="number"
                value={userState.stocks || ''}
                onChange={(e) => updateIncome('stocks', Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Public Provident Fund - PPF (₹)</label>
              <input
                type="number"
                value={userState.ppf || ''}
                onChange={(e) => updateIncome('ppf', Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">EPF Balance (₹)</label>
              <input
                type="number"
                value={userState.epf || ''}
                onChange={(e) => updateIncome('epf', Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: EMERGENCY FUND CHECK */}
      {currentStep === 5 && (
        <div className="glass-card p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Emergency Fund Check</h2>
            <p className="text-xs text-slate-500 italic">
              “Agar aaj income band ho jaaye, aap kitne months ke expenses cover kar sakte ho?”
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-slate-400">Current Emergency Buffer</p>
                <p className="text-2xl font-extrabold text-emerald-400">₹{currentEmergencyFundTotal.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">6-Month Target Buffer</p>
                <p className="text-2xl font-extrabold text-teal-300">₹{emergencyTarget6Months.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Target Progress</p>
                <p className="text-2xl font-extrabold text-purple-400">{emergencyProgress}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Emergency Runway Progress</span>
                <span>{emergencyProgress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all"
                  style={{ width: `${emergencyProgress}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-emerald-400">Recommended Liquid Parking Options:</p>
              <p>• High-Yield Savings Account / Liquid Mutual Funds / Short-Term FDs</p>
              <p className="text-rose-400 italic">⚠️ Never keep emergency money in volatile equity stocks or crypto!</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: FINANCIAL GOALS */}
      {currentStep === 6 && (
        <div className="glass-card p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                <span>Financial Goals</span>
              </h2>
              <p className="text-xs text-slate-500">Set targets for vehicle, house, marriage, or wealth.</p>
            </div>

            <button
              onClick={addGoal}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>

          <div className="space-y-4">
            {userState.goals.map((goal) => {
              const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
              const months = Math.max(1, goal.targetDateMonths);
              const reqMonthly = Math.round(remaining / months);

              return (
                <div key={goal.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={goal.name}
                      onChange={(e) => updateGoal(goal.id, 'name', e.target.value)}
                      className="font-bold text-sm bg-transparent border-b border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                    />
                    <button onClick={() => removeGoal(goal.id)} className="text-rose-500 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="text-slate-500">Target Amount (₹)</label>
                      <input
                        type="number"
                        value={goal.targetAmount || ''}
                        onChange={(e) => updateGoal(goal.id, 'targetAmount', Number(e.target.value))}
                        className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500">Current Saved (₹)</label>
                      <input
                        type="number"
                        value={goal.currentAmount || ''}
                        onChange={(e) => updateGoal(goal.id, 'currentAmount', Number(e.target.value))}
                        className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500">Time Horizon (Months)</label>
                      <input
                        type="number"
                        value={goal.targetDateMonths || ''}
                        onChange={(e) => updateGoal(goal.id, 'targetDateMonths', Number(e.target.value))}
                        className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-slate-500">Priority</label>
                      <select
                        value={goal.priority}
                        onChange={(e) => updateGoal(goal.id, 'priority', e.target.value)}
                        className="w-full mt-1 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-semibold flex justify-between">
                    <span>Required Monthly Contribution: ₹{reqMonthly.toLocaleString('en-IN')}/mo</span>
                    <span>Remaining: ₹{remaining.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 7: RISK PROFILE */}
      {currentStep === 7 && (
        <div className="glass-card p-6 sm:p-8 space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Risk Profile Questionnaire</span>
          </h2>

          <div className="space-y-6 text-xs">
            
            {/* Q1 */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-900 dark:text-white">1. What is your investment experience?</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'beginner', label: 'Beginner (0-1 yrs)' },
                  { id: 'intermediate', label: 'Intermediate (2-4 yrs)' },
                  { id: 'experienced', label: 'Experienced (5+ yrs)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onChange({ ...userState, riskAnswers: { ...userState.riskAnswers, experience: opt.id as any } })}
                    className={`p-3 rounded-xl border text-center transition font-semibold ${
                      userState.riskAnswers.experience === opt.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-900 dark:text-white">2. If your investment drops by 15% in a market crash, how do you react?</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'sell', label: 'Panic & Sell Everything' },
                  { id: 'hold', label: 'Hold & Wait' },
                  { id: 'buy_more', label: 'Invest More (Buy the Dip)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onChange({ ...userState, riskAnswers: { ...userState.riskAnswers, lossReaction: opt.id as any } })}
                    className={`p-3 rounded-xl border text-center transition font-semibold ${
                      userState.riskAnswers.lossReaction === opt.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Risk Profile Result */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
              <span className="font-semibold text-amber-900 dark:text-amber-300">
                Calculated Risk Profile:
              </span>
              <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                {calculateRiskProfile(userState.riskAnswers)} Investor
              </span>
            </div>

          </div>
        </div>
      )}

      {/* STEP NAVIGATION BUTTONS */}
      <div className="flex items-center justify-between pt-4">
        {currentStep > 1 ? (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
        ) : <div />}

        {currentStep < 7 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition transform hover:scale-105"
          >
            <span>Generate My Salary Plan Dashboard</span>
            <Sparkles className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
