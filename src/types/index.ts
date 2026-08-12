export type LoanType = 'Home Loan' | 'Personal Loan' | 'Car Loan' | 'Education Loan' | 'Credit Card' | 'Other';

export interface LoanItem {
  id: string;
  name: string;
  type: LoanType;
  outstandingAmount: number;
  emi: number;
  interestRate: number;
  remainingTenureMonths: number;
}

export interface HousingExpenses {
  rent: number;
  maintenance: number;
  electricity: number;
  water: number;
  internet: number;
  mobile: number;
}

export interface FoodExpenses {
  groceries: number;
  eatingOut: number;
  foodDelivery: number;
}

export interface TransportExpenses {
  metroBus: number;
  fuel: number;
  cab: number;
  vehicleEMI: number;
}

export interface FamilyExpenses {
  parents: number;
  children: number;
  education: number;
  medical: number;
  otherFamily: number;
}

export interface LifestyleExpenses {
  shopping: number;
  entertainment: number;
  subscriptions: number;
  hobbies: number;
  travel: number;
}

export interface OtherExpenses {
  insurance: number;
  miscellaneous: number;
}

export interface ExpensesState {
  housing: HousingExpenses;
  food: FoodExpenses;
  transport: TransportExpenses;
  family: FamilyExpenses;
  lifestyle: LifestyleExpenses;
  other: OtherExpenses;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDateMonths: number;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Emergency' | 'Vehicle' | 'House' | 'Education' | 'Marriage' | 'Vacation' | 'Retirement' | 'Wealth' | 'Other';
}

export interface RiskProfileAnswers {
  experience: 'beginner' | 'intermediate' | 'experienced';
  horizon: 'short' | 'medium' | 'long';
  lossReaction: 'sell' | 'hold' | 'buy_more';
  stability: 'stable' | 'moderate' | 'unstable';
  dependentsCount: number;
}

export type RiskCategory = 'Conservative' | 'Moderate' | 'Aggressive';

export interface UserFinancialState {
  userName: string; // Personalization: "Harsh"
  monthlySalary: number;
  otherIncome: number;
  annualBonus: number;
  expectedGrowth: number;

  expenses: ExpensesState;

  hasDebt: boolean;
  loans: LoanItem[];

  bankSavings: number;
  existingEmergencyFund: number;
  mutualFunds: number;
  stocks: number;
  fixedDeposit: number;
  ppf: number;
  gold: number;
  epf: number;
  otherInvestments: number;

  goals: FinancialGoal[];

  riskAnswers: RiskProfileAnswers;
}

export interface SalaryAllocationResult {
  totalMonthlyIncome: number;
  essentialExpenses: number;
  nonEssentialExpenses: number;
  optionalExpenses: number;
  totalExpenses: number;
  totalMonthlyEmi: number;
  dtiRatio: number;
  surplus: number;

  recommendedAllocation: {
    needs: number;
    needsPercent: number;
    debt: number;
    debtPercent: number;
    emergency: number;
    emergencyPercent: number;
    investments: number;
    investmentsPercent: number;
    wants: number;
    wantsPercent: number;
  };
  
  allocationReasoning: string[];
}

export interface HealthScoreBreakdownItem {
  category: string;
  maxPoints: number;
  score: number;
  status: 'good' | 'warning' | 'critical';
  reason: string;
}

export interface FinancialHealthResult {
  totalScore: number;
  rating: 'NEEDS ATTENTION' | 'FAIR' | 'GOOD' | 'EXCELLENT';
  breakdown: HealthScoreBreakdownItem[];
  positivePoints: string[];
  warningPoints: string[];
}

export interface EmergencyFundAnalysis {
  essentialMonthlyExpenses: number;
  targetFund6Months: number;
  targetFund12Months: number;
  currentEmergencyFund: number;
  progressPercent: number;
  monthsCoveredCurrent: number;
  deficit: number;
  monthlyRecommendation: number;
}

export interface InvestmentSuggestion {
  category: 'Low Risk' | 'Moderate Risk' | 'Long-Term Growth' | 'Higher Risk' | 'Gold / Alternative';
  instruments: string[];
  recommendedPercentage: number;
  description: string;
  hinglishTip: string;
  suitability: string;
  riskBadge: 'Low' | 'Moderate' | 'High' | 'Very High';
}
