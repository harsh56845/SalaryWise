import { UserFinancialState, EmergencyFundAnalysis } from '../types';

export function calculateEmergencyFundAnalysis(state: UserFinancialState): EmergencyFundAnalysis {
  // Calculate essential monthly expenses
  const h = state.expenses.housing;
  const f = state.expenses.food;
  const t = state.expenses.transport;
  const fam = state.expenses.family;
  const o = state.expenses.other;

  const essentialMonthlyExpenses = 
    (h.rent + h.maintenance + h.electricity + h.water + h.internet + h.mobile) +
    (f.groceries) +
    (t.metroBus + t.fuel) +
    (fam.parents + fam.children + fam.education + fam.medical) +
    (o.insurance);

  const targetFund6Months = essentialMonthlyExpenses * 6;
  const targetFund12Months = essentialMonthlyExpenses * 12;

  const currentEmergencyFund = (state.existingEmergencyFund || 0) + (state.bankSavings || 0);

  const monthsCoveredCurrent = essentialMonthlyExpenses > 0
    ? Math.round((currentEmergencyFund / essentialMonthlyExpenses) * 10) / 10
    : 0;

  const progressPercent = targetFund6Months > 0
    ? Math.min(100, Math.round((currentEmergencyFund / targetFund6Months) * 100))
    : 100;

  const deficit = Math.max(0, targetFund6Months - currentEmergencyFund);

  // Recommended monthly contribution to reach target in 12 months
  const monthlyRecommendation = deficit > 0 ? Math.round(deficit / 12) : 0;

  return {
    essentialMonthlyExpenses,
    targetFund6Months,
    targetFund12Months,
    currentEmergencyFund,
    progressPercent,
    monthsCoveredCurrent,
    deficit,
    monthlyRecommendation,
  };
}
