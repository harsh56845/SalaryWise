import { UserFinancialState } from '../types';

export const SAMPLE_USER_DATA: UserFinancialState = {
  userName: 'Harsh',
  monthlySalary: 70000,
  otherIncome: 0,
  annualBonus: 50000,
  expectedGrowth: 10,

  expenses: {
    housing: {
      rent: 15000,
      maintenance: 0,
      electricity: 1500,
      water: 300,
      internet: 800,
      mobile: 400,
    },
    food: {
      groceries: 5000,
      eatingOut: 1500,
      foodDelivery: 500,
    },
    transport: {
      metroBus: 1000,
      fuel: 3000,
      cab: 0,
      vehicleEMI: 0,
    },
    family: {
      parents: 0,
      children: 0,
      education: 0,
      medical: 1000,
      otherFamily: 0,
    },
    lifestyle: {
      shopping: 2000,
      entertainment: 1000,
      subscriptions: 500,
      hobbies: 500,
      travel: 0,
    },
    other: {
      insurance: 1000,
      miscellaneous: 500,
    },
  },

  hasDebt: true,
  loans: [
    {
      id: 'loan-1',
      name: 'Personal Loan',
      type: 'Personal Loan',
      outstandingAmount: 120000,
      emi: 5000,
      interestRate: 14,
      remainingTenureMonths: 28,
    },
  ],

  bankSavings: 50000,
  existingEmergencyFund: 50000,
  mutualFunds: 25000,
  stocks: 10000,
  fixedDeposit: 0,
  ppf: 15000,
  gold: 0,
  epf: 40000,
  otherInvestments: 0,

  goals: [
    {
      id: 'goal-1',
      name: '6-Month Emergency Fund',
      targetAmount: 240000,
      currentAmount: 50000,
      targetDateMonths: 12,
      priority: 'High',
      category: 'Emergency',
    },
    {
      id: 'goal-2',
      name: 'New Bike / Downpayment',
      targetAmount: 100000,
      currentAmount: 20000,
      targetDateMonths: 10,
      priority: 'Medium',
      category: 'Vehicle',
    },
  ],

  riskAnswers: {
    experience: 'intermediate',
    horizon: 'medium',
    lossReaction: 'hold',
    stability: 'stable',
    dependentsCount: 1,
  },
};
