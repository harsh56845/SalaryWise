import { UserFinancialState, FinancialHealthResult, HealthScoreBreakdownItem } from '../types';
import { calculateSalaryAllocation } from './allocationEngine';

export function calculateFinancialHealthScore(state: UserFinancialState): FinancialHealthResult {
  const allocation = calculateSalaryAllocation(state);
  const totalIncome = allocation.totalMonthlyIncome;

  if (totalIncome === 0) {
    return {
      totalScore: 0,
      rating: 'NEEDS ATTENTION',
      breakdown: [],
      positivePoints: [],
      warningPoints: ['Please enter your monthly income to compute your financial health score.'],
    };
  }

  const positivePoints: string[] = [];
  const warningPoints: string[] = [];
  const breakdown: HealthScoreBreakdownItem[] = [];

  // 1. Expense Management (Max 20 Points)
  const essentialRatio = (allocation.essentialExpenses / totalIncome) * 100;
  let expenseScore = 0;
  let expenseStatus: 'good' | 'warning' | 'critical' = 'good';
  let expenseReason = '';

  if (essentialRatio <= 45) {
    expenseScore = 20;
    expenseReason = `Excellent essential expense control (${Math.round(essentialRatio)}% of income).`;
    positivePoints.push('✓ Essential expenses are well under 45% of total salary');
  } else if (essentialRatio <= 60) {
    expenseScore = 14;
    expenseStatus = 'warning';
    expenseReason = `Moderate essential expense burden (${Math.round(essentialRatio)}% of income).`;
    positivePoints.push('✓ Controlled essential spending structure');
  } else {
    expenseScore = 6;
    expenseStatus = 'critical';
    expenseReason = `High essential expense burden (${Math.round(essentialRatio)}% of income).`;
    warningPoints.push('⚠ Essential expenses consume over 60% of monthly income');
  }
  breakdown.push({ category: 'Expense Control', maxPoints: 20, score: expenseScore, status: expenseStatus, reason: expenseReason });

  // 2. Emergency Fund Buffer (Max 20 Points)
  const targetEmergencyFund = allocation.essentialExpenses * 6;
  const currentEmergencyFund = (state.existingEmergencyFund || 0) + (state.bankSavings || 0);
  const monthsCovered = allocation.essentialExpenses > 0 
    ? Math.round((currentEmergencyFund / allocation.essentialExpenses) * 10) / 10
    : 0;

  let emergencyScore = 0;
  let emergencyStatus: 'good' | 'warning' | 'critical' = 'good';
  let emergencyReason = '';

  if (monthsCovered >= 6) {
    emergencyScore = 20;
    emergencyReason = `Fully funded emergency cushion (${monthsCovered} months of expenses saved).`;
    positivePoints.push(`✓ Emergency fund fully covers ${monthsCovered} months of expenses`);
  } else if (monthsCovered >= 3) {
    emergencyScore = 12;
    emergencyStatus = 'warning';
    emergencyReason = `Partial emergency buffer (${monthsCovered} months saved, target 6 months).`;
    positivePoints.push(`✓ Emergency fund started (${monthsCovered} months saved)`);
    warningPoints.push('⚠ Emergency fund is under 6 months of essential expenses');
  } else {
    emergencyScore = 5;
    emergencyStatus = 'critical';
    emergencyReason = `Inadequate emergency runway (${monthsCovered} months saved).`;
    warningPoints.push('⚠ Critical: Less than 3 months of emergency fund saved');
  }
  breakdown.push({ category: 'Emergency Fund', maxPoints: 20, score: emergencyScore, status: emergencyStatus, reason: emergencyReason });

  // 3. Debt Management (Max 20 Points)
  let debtScore = 0;
  let debtStatus: 'good' | 'warning' | 'critical' = 'good';
  let debtReason = '';

  const dti = allocation.dtiRatio;
  const creditCardLoan = state.hasDebt && state.loans.some(l => l.type === 'Credit Card' && l.outstandingAmount > 0);

  if (!state.hasDebt || dti === 0) {
    debtScore = 20;
    debtReason = 'Zero debt! Outstanding debt management.';
    positivePoints.push('✓ Debt-free! Zero monthly EMI burden');
  } else if (dti <= 20 && !creditCardLoan) {
    debtScore = 16;
    debtReason = `Healthy EMI to income ratio (${dti}%).`;
    positivePoints.push(`✓ Healthy debt-to-income ratio (${dti}%)`);
  } else if (dti <= 40 && !creditCardLoan) {
    debtScore = 10;
    debtStatus = 'warning';
    debtReason = `Moderate debt burden (${dti}% EMI ratio).`;
    warningPoints.push(`⚠ EMI occupies ${dti}% of income (ideal is under 20%)`);
  } else {
    debtScore = 4;
    debtStatus = 'critical';
    debtReason = `High debt stress (${dti}% EMI ratio${creditCardLoan ? ' with high-interest credit card debt' : ''}).`;
    if (creditCardLoan) {
      warningPoints.push('⚠ High-interest credit card debt detected — prioritize repayment');
    } else {
      warningPoints.push(`⚠ Debt-to-income ratio is high (${dti}%)`);
    }
  }
  breakdown.push({ category: 'Debt Control', maxPoints: 20, score: debtScore, status: debtStatus, reason: debtReason });

  // 4. Savings Rate (Max 15 Points)
  const totalMonthlySavings = allocation.recommendedAllocation.emergency + allocation.recommendedAllocation.investments;
  const savingsRate = Math.round((totalMonthlySavings / totalIncome) * 100);

  let savingsScore = 0;
  let savingsStatus: 'good' | 'warning' | 'critical' = 'good';
  let savingsReason = '';

  if (savingsRate >= 30) {
    savingsScore = 15;
    savingsReason = `Exceptional monthly savings rate (${savingsRate}%).`;
    positivePoints.push(`✓ Strong savings & investment rate (${savingsRate}%)`);
  } else if (savingsRate >= 20) {
    savingsScore = 11;
    savingsStatus = 'good';
    savingsReason = `Solid savings rate (${savingsRate}%).`;
    positivePoints.push(`✓ Good monthly savings rate (${savingsRate}%)`);
  } else if (savingsRate >= 10) {
    savingsScore = 6;
    savingsStatus = 'warning';
    savingsReason = `Moderate savings rate (${savingsRate}%).`;
    warningPoints.push(`⚠ Monthly savings rate is ${savingsRate}% (aim for 25%+)`);
  } else {
    savingsScore = 2;
    savingsStatus = 'critical';
    savingsReason = `Low savings rate (${savingsRate}%).`;
    warningPoints.push('⚠ Low monthly savings capability');
  }
  breakdown.push({ category: 'Savings Rate', maxPoints: 15, score: savingsScore, status: savingsStatus, reason: savingsReason });

  // 5. Investment Discipline (Max 15 Points)
  const currentInvestmentsTotal = (state.mutualFunds || 0) + (state.stocks || 0) + (state.ppf || 0) + (state.epf || 0) + (state.gold || 0) + (state.fixedDeposit || 0);
  let invScore = 0;
  let invStatus: 'good' | 'warning' | 'critical' = 'good';
  let invReason = '';

  if (currentInvestmentsTotal > totalIncome * 3) {
    invScore = 15;
    invReason = 'Strong asset portfolio accumulated relative to monthly salary.';
    positivePoints.push('✓ Solid wealth accumulation foundation started');
  } else if (currentInvestmentsTotal > 0) {
    invScore = 10;
    invReason = 'Active investment assets present in portfolio.';
    positivePoints.push('✓ Existing investment assets present');
  } else {
    invScore = 3;
    invStatus = 'warning';
    invReason = 'No long-term investments recorded yet.';
    warningPoints.push('⚠ Investment portfolio needs expansion');
  }
  breakdown.push({ category: 'Investment Portfolio', maxPoints: 15, score: invScore, status: invStatus, reason: invReason });

  // 6. Goal Planning (Max 10 Points)
  const hasGoals = state.goals && state.goals.length > 0;
  let goalScore = 0;
  let goalStatus: 'good' | 'warning' | 'critical' = 'good';
  let goalReason = '';

  if (hasGoals) {
    goalScore = 10;
    goalReason = `${state.goals.length} structured financial goals tracked.`;
    positivePoints.push(`✓ Clear financial goals defined (${state.goals.length} goals)`);
  } else {
    goalScore = 2;
    goalStatus = 'warning';
    goalReason = 'No active financial goals configured.';
    warningPoints.push('⚠ Define specific financial goals for long-term target planning');
  }
  breakdown.push({ category: 'Goal Planning', maxPoints: 10, score: goalScore, status: goalStatus, reason: goalReason });

  // Sum total score
  const totalScore = Math.min(100, Math.max(0, expenseScore + emergencyScore + debtScore + savingsScore + invScore + goalScore));

  let rating: 'NEEDS ATTENTION' | 'FAIR' | 'GOOD' | 'EXCELLENT' = 'FAIR';
  if (totalScore >= 80) rating = 'EXCELLENT';
  else if (totalScore >= 65) rating = 'GOOD';
  else if (totalScore >= 45) rating = 'FAIR';
  else rating = 'NEEDS ATTENTION';

  return {
    totalScore,
    rating,
    breakdown,
    positivePoints,
    warningPoints,
  };
}
