import { UserFinancialState, InvestmentSuggestion, RiskCategory } from '../types';
import { calculateEmergencyFundAnalysis } from './emergencyFundEngine';
import { calculateRiskProfile } from './riskProfileEngine';

export function generateInvestmentSuggestions(state: UserFinancialState): InvestmentSuggestion[] {
  const risk: RiskCategory = calculateRiskProfile(state.riskAnswers);
  const emergency = calculateEmergencyFundAnalysis(state);
  const isEmergencyFundNeeded = emergency.progressPercent < 100;
  const hasHighDebt = state.hasDebt && state.loans.some(l => l.type === 'Credit Card' || l.interestRate >= 13);

  const suggestions: InvestmentSuggestion[] = [];

  // If High Interest Debt exists, High Priority Alert Recommendation
  if (hasHighDebt) {
    suggestions.push({
      category: 'Low Risk',
      instruments: ['High-Yield Savings A/C', 'Credit Card Debt Repayment'],
      recommendedPercentage: 50,
      description: 'Prioritize paying off credit cards or personal loans before aggressive market investments.',
      hinglishTip: 'Credit card ka interest rate 36-42% annual ho sakta hai. Is debt ko clear karna market se guarantee return lene jaisa hai!',
      suitability: 'Urgent Debt Prepayment',
      riskBadge: 'Low',
    });
  }

  // Emergency Buffer Priority if incomplete
  if (isEmergencyFundNeeded) {
    suggestions.push({
      category: 'Low Risk',
      instruments: ['High-Interest Bank Savings Account', 'Liquid Mutual Funds', 'Short-Term Fixed Deposits'],
      recommendedPercentage: isEmergencyFundNeeded ? 35 : 15,
      description: 'Capital preservation instruments with instant liquidity for unannounced emergencies.',
      hinglishTip: 'Emergency money equity stocks mein nahi rakhna chahiye, kyuki market drop hone par instant loss ho sakta hai.',
      suitability: 'Immediate Capital Protection & Liquidity',
      riskBadge: 'Low',
    });
  }

  // Moderate Risk / Debt & Hybrid Funds
  if (risk === 'Conservative' || isEmergencyFundNeeded) {
    suggestions.push({
      category: 'Moderate Risk',
      instruments: ['Public Provident Fund (PPF)', 'Arbitrage Funds', 'Conservative Hybrid Funds', 'Fixed Deposit (FD)'],
      recommendedPercentage: risk === 'Conservative' ? 45 : 30,
      description: 'Stable fixed-income and tax-efficient hybrid instruments suitable for 3-5 year horizons.',
      hinglishTip: 'PPF EEE tax benefits deta hai (Guaranteed 7.1% tax-free returns under Sec 80C). Low risk investors ke liye best hai.',
      suitability: '3 to 5 Year Goals & Capital Security',
      riskBadge: 'Moderate',
    });
  } else {
    suggestions.push({
      category: 'Moderate Risk',
      instruments: ['Aggressive Hybrid Funds', 'Dynamic Asset Allocation Funds', 'Multi-Asset Allocation Funds'],
      recommendedPercentage: 25,
      description: 'Balanced mix of equity and debt that automatically rebalances based on market valuations.',
      hinglishTip: 'Hybrid funds market volatility ko absorb kar lete hain aur smooth long-term compounding dete hain.',
      suitability: '3 to 7 Year Goals',
      riskBadge: 'Moderate',
    });
  }

  // Long-Term Growth / Index & Equity MFs
  if (risk === 'Aggressive') {
    suggestions.push({
      category: 'Long-Term Growth',
      instruments: ['Nifty 50 Index Funds', 'Nifty Next 50 Index Funds', 'Flexi-Cap Mutual Funds', 'Mid-Cap Funds'],
      recommendedPercentage: 55,
      description: 'Diversified equity index and flexi-cap funds for long-term wealth creation (7+ years).',
      hinglishTip: 'Index funds low expense ratio ke saath India ki top 50 companies mein invest karte hain. Beginner long-term wealth ke liye top recommendation!',
      suitability: '7+ Years Long-Term Wealth Accumulation',
      riskBadge: 'High',
    });

    suggestions.push({
      category: 'Higher Risk',
      instruments: ['Small-Cap Equity Funds', 'Sector/Thematic Mutual Funds', 'Direct Stock SIPs'],
      recommendedPercentage: 15,
      description: 'High volatility, high potential growth instruments for seasoned investors with strong conviction.',
      hinglishTip: 'Small-cap aur direct stocks mein sharp market dips dekhne ko mil sakte hain. Tabhi invest karein jab risk tolerance high ho.',
      suitability: '10+ Years Aggressive Wealth Multiplier',
      riskBadge: 'Very High',
    });
  } else if (risk === 'Moderate') {
    suggestions.push({
      category: 'Long-Term Growth',
      instruments: ['Nifty 50 Index Funds', 'Flexi-Cap Funds', 'Large & Mid-Cap Funds'],
      recommendedPercentage: 45,
      description: 'Core equity mutual funds for beating inflation over 5-10 year horizons.',
      hinglishTip: 'Flexi-cap funds fund manager ko market conditions ke according Large, Mid aur Small caps mein shift hone ki freedom dete hain.',
      suitability: '5+ Years Wealth Building',
      riskBadge: 'High',
    });
  } else {
    // Conservative
    suggestions.push({
      category: 'Long-Term Growth',
      instruments: ['Nifty 50 Index Funds', 'Large-Cap Mutual Funds'],
      recommendedPercentage: 20,
      description: 'Conservative exposure to India\'s top blue-chip companies for inflation-beating long term growth.',
      hinglishTip: 'Top 50 companies economy growth ke sath compounding returns generate karti hain.',
      suitability: '5+ Years Inflation Protection',
      riskBadge: 'Moderate',
    });
  }

  // Gold & Alternatives
  suggestions.push({
    category: 'Gold / Alternative',
    instruments: ['Sovereign Gold Bonds (SGB)', 'Gold ETFs', 'Gold Mutual Funds', 'REITs (Real Estate Investment Trusts)'],
    recommendedPercentage: 10,
    description: 'Hedge against currency depreciation and systemic inflation.',
    hinglishTip: 'Gold portfolio mein 5-10% allocation rakhna market crash ke time protection deta hai.',
    suitability: 'Portfolio Diversification & Inflation Protection',
    riskBadge: 'Moderate',
  });

  return suggestions;
}
