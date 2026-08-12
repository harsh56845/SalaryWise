import { UserFinancialState } from '../types';
import { calculateSalaryAllocation } from './allocationEngine';

export interface WhatIfDeltaInput {
  salaryChangePercent: number; // e.g. +10, -5
  rentChangeAmount: number; // e.g. -5000
  investmentChangeAmount: number; // e.g. +5000
  emiChangeAmount: number; // e.g. -3000
}

export interface WhatIfSimulationResult {
  originalSalary: number;
  newSalary: number;
  originalSavingsRate: number;
  newSavingsRate: number;
  originalAnnualSavings: number;
  newAnnualSavings: number;
  additionalAnnualSavings: number;
  summaryNote: string;
}

export function simulateWhatIf(
  baseState: UserFinancialState,
  input: WhatIfDeltaInput
): WhatIfSimulationResult {
  const baseResult = calculateSalaryAllocation(baseState);

  // Deep clone state to apply deltas
  const modifiedState: UserFinancialState = JSON.parse(JSON.stringify(baseState));

  // Apply salary delta
  const salaryMultiplier = 1 + (input.salaryChangePercent / 100);
  modifiedState.monthlySalary = Math.round(baseState.monthlySalary * salaryMultiplier);

  // Apply rent delta
  modifiedState.expenses.housing.rent = Math.max(0, baseState.expenses.housing.rent + input.rentChangeAmount);

  // Apply EMI delta
  if (modifiedState.loans.length > 0) {
    modifiedState.loans[0].emi = Math.max(0, baseState.loans[0].emi + input.emiChangeAmount);
  }

  const modifiedResult = calculateSalaryAllocation(modifiedState);

  // Calculate annual savings comparison
  const baseMonthlySavings = baseResult.recommendedAllocation.emergency + baseResult.recommendedAllocation.investments;
  const newMonthlySavings = modifiedResult.recommendedAllocation.emergency + modifiedResult.recommendedAllocation.investments + Math.max(0, input.investmentChangeAmount);

  const originalAnnualSavings = baseMonthlySavings * 12;
  const newAnnualSavings = newMonthlySavings * 12;
  const additionalAnnualSavings = newAnnualSavings - originalAnnualSavings;

  const originalSavingsRate = baseResult.totalMonthlyIncome > 0 ? Math.round((baseMonthlySavings / baseResult.totalMonthlyIncome) * 100) : 0;
  const newSavingsRate = modifiedResult.totalMonthlyIncome > 0 ? Math.round((newMonthlySavings / modifiedResult.totalMonthlyIncome) * 100) : 0;

  let summaryNote = '';
  if (additionalAnnualSavings > 0) {
    summaryNote = `🎉 In changes se aapki annual savings ₹${additionalAnnualSavings.toLocaleString('en-IN')} se badh jayegi! Savings rate ${originalSavingsRate}% se badhkar ${newSavingsRate}% ho jaayega.`;
  } else if (additionalAnnualSavings < 0) {
    summaryNote = `⚠️ Warning: In changes se aapki annual savings ₹${Math.abs(additionalAnnualSavings).toLocaleString('en-IN')} kam ho sakti hai.`;
  } else {
    summaryNote = 'No net change in annual savings.';
  }

  return {
    originalSalary: baseState.monthlySalary,
    newSalary: modifiedState.monthlySalary,
    originalSavingsRate,
    newSavingsRate,
    originalAnnualSavings,
    newAnnualSavings,
    additionalAnnualSavings,
    summaryNote,
  };
}

export interface IncrementPlannerResult {
  currentSalary: number;
  newSalary: number;
  incrementAmount: number;
  suggestedAllocation: {
    investments: number;
    investmentsPercent: number;
    goals: number;
    goalsPercent: number;
    emergencyDebt: number;
    emergencyDebtPercent: number;
    lifestyle: number;
    lifestylePercent: number;
  };
  hinglishAdvice: string;
}

export function planSalaryIncrement(
  currentSalary: number,
  newSalary: number
): IncrementPlannerResult {
  const curr = Math.max(0, currentSalary);
  const next = Math.max(curr, newSalary);
  const incrementAmount = next - curr;

  // Recommended split rule to avoid lifestyle inflation:
  // 60% Investments & Wealth
  // 20% Goals
  // 10% Emergency / Debt Buffer
  // 10% Lifestyle Treat
  const inv = Math.round(incrementAmount * 0.60);
  const goals = Math.round(incrementAmount * 0.20);
  const emgDebt = Math.round(incrementAmount * 0.10);
  const lifestyle = Math.max(0, incrementAmount - (inv + goals + emgDebt));

  const hinglishAdvice = incrementAmount > 0
    ? `Aapke ₹${incrementAmount.toLocaleString('en-IN')} increment ka 60% (₹${inv.toLocaleString('en-IN')}) directly SIPs mein prioritize karne se lifestyle inflation avoid hoga aur wealth fast grow karegi!`
    : 'Enter your new salary to calculate how to allocate your increment.';

  return {
    currentSalary: curr,
    newSalary: next,
    incrementAmount,
    suggestedAllocation: {
      investments: inv,
      investmentsPercent: 60,
      goals,
      goalsPercent: 20,
      emergencyDebt: emgDebt,
      emergencyDebtPercent: 10,
      lifestyle,
      lifestylePercent: 10,
    },
    hinglishAdvice,
  };
}
