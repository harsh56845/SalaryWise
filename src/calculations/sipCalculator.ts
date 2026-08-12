export interface SipCalculationResult {
  monthlyInvestment: number;
  expectedReturnRate: number;
  durationYears: number;
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
  growthChartData: Array<{ year: number; invested: number; returns: number; totalValue: number }>;
}

export function calculateSip(
  monthlyInvestment: number,
  expectedReturnRate: number,
  durationYears: number
): SipCalculationResult {
  const p = Math.max(0, monthlyInvestment);
  const r = Math.max(0, expectedReturnRate);
  const years = Math.max(1, durationYears);
  const months = years * 12;

  const monthlyRate = r / 12 / 100;
  let futureValue = 0;

  if (monthlyRate === 0) {
    futureValue = p * months;
  } else {
    futureValue = p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  }

  const totalInvested = p * months;
  const estimatedReturns = Math.max(0, futureValue - totalInvested);

  // Generate Year-by-Year Growth Chart Data
  const growthChartData: Array<{ year: number; invested: number; returns: number; totalValue: number }> = [];

  for (let y = 1; y <= years; y++) {
    const m = y * 12;
    let fvYear = 0;
    if (monthlyRate === 0) {
      fvYear = p * m;
    } else {
      fvYear = p * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
    }
    const invYear = p * m;
    const retYear = Math.max(0, fvYear - invYear);
    growthChartData.push({
      year: y,
      invested: Math.round(invYear),
      returns: Math.round(retYear),
      totalValue: Math.round(fvYear),
    });
  }

  return {
    monthlyInvestment: p,
    expectedReturnRate: r,
    durationYears: years,
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    futureValue: Math.round(futureValue),
    growthChartData,
  };
}

export function calculateRequiredSipForGoal(
  targetAmount: number,
  currentSavings: number,
  expectedReturnRate: number,
  durationMonths: number
): {
  remainingCorpusNeeded: number;
  requiredMonthlySip: number;
  progressPercent: number;
} {
  const target = Math.max(0, targetAmount);
  const current = Math.max(0, currentSavings);
  const r = Math.max(0, expectedReturnRate);
  const months = Math.max(1, durationMonths);
  const monthlyRate = r / 12 / 100;

  // Future value of current savings
  const futureValueOfCurrentSavings = current * Math.pow(1 + monthlyRate, months);
  const remainingCorpusNeeded = Math.max(0, target - futureValueOfCurrentSavings);

  let requiredMonthlySip = 0;
  if (remainingCorpusNeeded > 0) {
    if (monthlyRate === 0) {
      requiredMonthlySip = remainingCorpusNeeded / months;
    } else {
      requiredMonthlySip = (remainingCorpusNeeded * monthlyRate) / (((Math.pow(1 + monthlyRate, months) - 1)) * (1 + monthlyRate));
    }
  }

  const progressPercent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 100;

  return {
    remainingCorpusNeeded: Math.round(remainingCorpusNeeded),
    requiredMonthlySip: Math.round(requiredMonthlySip),
    progressPercent,
  };
}
