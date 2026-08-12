import { UserFinancialState, SalaryAllocationResult } from '../types';

export function calculateSalaryAllocation(state: UserFinancialState): SalaryAllocationResult {
  const totalMonthlyIncome = Math.max(0, (state.monthlySalary || 0) + (state.otherIncome || 0));

  // 1. Expense Breakdown Categorization
  const h = state.expenses.housing;
  const f = state.expenses.food;
  const t = state.expenses.transport;
  const fam = state.expenses.family;
  const l = state.expenses.lifestyle;
  const o = state.expenses.other;

  // Essential Needs: Housing, Groceries, Essential Transport, Family Education/Medical, Insurance
  const essentialExpenses = 
    (h.rent + h.maintenance + h.electricity + h.water + h.internet + h.mobile) +
    (f.groceries) +
    (t.metroBus + t.fuel) +
    (fam.parents + fam.children + fam.education + fam.medical) +
    (o.insurance);

  // Non-Essential Needs / Comforts
  const nonEssentialExpenses = 
    (f.eatingOut + f.foodDelivery) +
    (t.cab) +
    (fam.otherFamily) +
    (l.shopping + l.entertainment + l.subscriptions);

  // Optional / Luxury Wants
  const optionalExpenses = 
    (l.hobbies + l.travel) +
    (o.miscellaneous);

  const totalExpenses = essentialExpenses + nonEssentialExpenses + optionalExpenses;

  // 2. Debt & EMI Analysis
  const totalMonthlyEmi = state.hasDebt 
    ? state.loans.reduce((acc, loan) => acc + (loan.emi || 0), 0)
    : 0;

  const dtiRatio = totalMonthlyIncome > 0 ? (totalMonthlyEmi / totalMonthlyIncome) * 100 : 0;

  // High interest debt check (Credit cards, personal loans with >12% interest)
  const highInterestLoans = state.hasDebt 
    ? state.loans.filter(loan => loan.type === 'Credit Card' || loan.interestRate >= 13)
    : [];
  const highInterestEmi = highInterestLoans.reduce((acc, loan) => acc + (loan.emi || 0), 0);

  // 3. Emergency Fund Readiness
  const targetEmergencyFund = essentialExpenses * 6;
  const currentEmergencyFund = (state.existingEmergencyFund || 0) + (state.bankSavings || 0);
  const emergencyFundComplete = currentEmergencyFund >= targetEmergencyFund;

  // 4. Calculate Net Surplus Available for Allocation
  const surplus = totalMonthlyIncome - totalExpenses - totalMonthlyEmi;

  // Reasoning array
  const reasoning: string[] = [];

  // Dynamic Percentage Allocation Logic
  let needsPercent = 50;
  let debtPercent = 0;
  let emergencyPercent = 15;
  let investmentPercent = 25;
  let wantsPercent = 10;

  // Edge Case: Zero Income
  if (totalMonthlyIncome === 0) {
    return {
      totalMonthlyIncome: 0,
      essentialExpenses,
      nonEssentialExpenses,
      optionalExpenses,
      totalExpenses,
      totalMonthlyEmi,
      dtiRatio: 0,
      surplus: 0,
      recommendedAllocation: {
        needs: 0, needsPercent: 0,
        debt: 0, debtPercent: 0,
        emergency: 0, emergencyPercent: 0,
        investments: 0, investmentsPercent: 0,
        wants: 0, wantsPercent: 0,
      },
      allocationReasoning: ['Please enter a valid monthly income to generate your plan.']
    };
  }

  // Edge Case: Expenses + EMIs exceed Income
  if (totalExpenses + totalMonthlyEmi > totalMonthlyIncome) {
    const deficit = (totalExpenses + totalMonthlyEmi) - totalMonthlyIncome;
    reasoning.push(
      `⚠️ Aapke monthly expenses and EMIs (₹${(totalExpenses + totalMonthlyEmi).toLocaleString('en-IN')}) aapki monthly income (₹${totalMonthlyIncome.toLocaleString('en-IN')}) se ₹${deficit.toLocaleString('en-IN')} zyada hain.`
    );
    reasoning.push(
      'Priority #1: Cut down optional lifestyle expenses and non-essential food deliveries immediately to stop net cash outflow.'
    );
  }

  // Actual Actuals vs Standard 50/25/15/10
  const actualNeedsPercent = (essentialExpenses / totalMonthlyIncome) * 100;
  const actualEmiPercent = (totalMonthlyEmi / totalMonthlyIncome) * 100;

  // Baseline adjustment
  needsPercent = Math.min(65, Math.max(40, Math.round(actualNeedsPercent)));

  if (state.hasDebt && totalMonthlyEmi > 0) {
    if (highInterestLoans.length > 0) {
      debtPercent = Math.max(Math.round(actualEmiPercent), 20);
      reasoning.push(
        '⚡ High-interest debt (Credit Card / Personal Loan) detected! Allocating additional surplus toward debt pre-payment is more profitable than aggressive market investing.'
      );
    } else {
      debtPercent = Math.round(actualEmiPercent);
      reasoning.push(
        `✓ Regular EMIs constitute ${debtPercent}% of your income. Stay consistent on timely payments.`
      );
    }
  } else {
    debtPercent = 0;
  }

  // Emergency Fund Allocation Rule
  if (emergencyFundComplete) {
    emergencyPercent = 0;
    reasoning.push(
      '🎉 Emergency Fund target (6x essential expenses) fully achieved! Emergency allocation redirected toward wealth-building investments and financial goals.'
    );
  } else {
    const progress = targetEmergencyFund > 0 ? (currentEmergencyFund / targetEmergencyFund) * 100 : 0;
    if (progress < 40) {
      emergencyPercent = 20;
      reasoning.push(
        `🚨 Emergency fund abhi incomplete (${Math.round(progress)}%). Emergency buffer allocation ko 20% tak prioritize kiya gaya hai.`
      );
    } else {
      emergencyPercent = 12;
      reasoning.push(
        `🛡️ Emergency fund progress at ${Math.round(progress)}%. Continuing steady allocation of 12% to reach ₹${targetEmergencyFund.toLocaleString('en-IN')}.`
      );
    }
  }

  // Adjust Wants and Investments to match 100% total
  let remainingForInvAndWants = 100 - needsPercent - debtPercent - emergencyPercent;
  
  if (remainingForInvAndWants < 10) {
    // High cost of living scenario
    wantsPercent = 5;
    investmentPercent = Math.max(5, remainingForInvAndWants - wantsPercent);
    if (actualNeedsPercent > 60) {
      reasoning.push(
        '⚠️ Essential needs consume over 60% of your income. Consider reviewing housing or transport expenses to free up investment capital.'
      );
    }
  } else {
    wantsPercent = Math.min(15, Math.max(5, Math.round(remainingForInvAndWants * 0.25)));
    investmentPercent = Math.max(0, remainingForInvAndWants - wantsPercent);
  }

  // Convert percentages to exact INR amounts
  const needsAmount = Math.round((totalMonthlyIncome * needsPercent) / 100);
  const debtAmount = Math.round((totalMonthlyIncome * debtPercent) / 100);
  const emergencyAmount = Math.round((totalMonthlyIncome * emergencyPercent) / 100);
  const investmentsAmount = Math.round((totalMonthlyIncome * investmentPercent) / 100);
  const wantsAmount = Math.max(0, totalMonthlyIncome - (needsAmount + debtAmount + emergencyAmount + investmentsAmount));

  if (investmentsAmount > 0 && emergencyFundComplete) {
    reasoning.push(
      `🚀 Monthly investment budget of ₹${investmentsAmount.toLocaleString('en-IN')} is ready to be deployed into SIPs and long-term equity/debt funds.`
    );
  }

  return {
    totalMonthlyIncome,
    essentialExpenses,
    nonEssentialExpenses,
    optionalExpenses,
    totalExpenses,
    totalMonthlyEmi,
    dtiRatio: Math.round(dtiRatio * 10) / 10,
    surplus,
    recommendedAllocation: {
      needs: needsAmount,
      needsPercent,
      debt: debtAmount,
      debtPercent,
      emergency: emergencyAmount,
      emergencyPercent,
      investments: investmentsAmount,
      investmentsPercent: investmentPercent,
      wants: wantsAmount,
      wantsPercent: Math.round((wantsAmount / totalMonthlyIncome) * 100),
    },
    allocationReasoning: reasoning,
  };
}
