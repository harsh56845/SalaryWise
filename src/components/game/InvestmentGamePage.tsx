import React, { useState } from 'react';
import { 
  Gamepad2, Trophy, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, 
  RotateCcw, ArrowRight, DollarSign, Award, Heart, CheckCircle2, Zap, Shuffle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameState {
  playerName: string;
  monthlySalary: number;
  year: number; // Year 1 to 5
  netWorth: number;
  emergencyFund: number;
  monthlySip: number;
  debtAmount: number;
  happiness: number; // 0-100
  historyLogs: Array<{ year: number; event: string; impact: string }>;
  isGameOver: boolean;
  shuffledEvents: LifeEvent[];
}

interface LifeEvent {
  id: string;
  title: string;
  emoji: string;
  description: string;
  options: Array<{
    text: string;
    action: (prev: GameState) => GameState;
  }>;
}

// Master pool of 12+ exciting Indian life events
const EVENT_POOL: LifeEvent[] = [
  {
    id: 'crypto-ipl',
    title: 'Crypto Hype & IPL Betting Temptation! 🚀',
    emoji: '🎰',
    description: 'Your colleagues are bragging about 5x gains in meme crypto coins & IPL fantasy leagues. What do you do?',
    options: [
      {
        text: '💎 Stay disciplined: Stick to Nifty 50 Index Fund SIPs',
        action: (s) => ({
          ...s,
          netWorth: Math.round(s.netWorth + s.monthlySip * 12 * 1.14),
          happiness: Math.min(100, s.happiness + 5),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Ignored speculative hype & stuck to Index Funds.', impact: '+14% steady compounding gain!' }
          ]
        })
      },
      {
        text: '🪙 Smart Compromise: Put 15% surplus in Sovereign Gold Bonds',
        action: (s) => ({
          ...s,
          netWorth: Math.round(s.netWorth + s.monthlySip * 12 * 1.12 + 15000),
          happiness: Math.min(100, s.happiness + 8),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Diversified into Gold Bonds (SGB).', impact: 'Hedged portfolio with +2.5% extra interest.' }
          ]
        })
      },
      {
        text: '🎰 High Risk Gamble: Put ₹30,000 into speculative crypto coins',
        action: (s) => {
          const win = Math.random() > 0.5;
          const delta = win ? 60000 : -25000;
          return {
            ...s,
            netWorth: Math.max(0, s.netWorth + delta),
            happiness: win ? Math.min(100, s.happiness + 15) : Math.max(0, s.happiness - 20),
            historyLogs: [
              ...s.historyLogs,
              { year: s.year, event: 'Gambled in speculative meme coins.', impact: win ? 'Jackpot! +₹60,000 profit!' : 'Crash! Lost ₹25,000!' }
            ]
          };
        }
      }
    ]
  },
  {
    id: 'wedding',
    title: 'Big Family Wedding / Grand Celebration! 💒',
    emoji: '💍',
    description: 'A major family wedding is coming up. Expenses are expected to be around ₹2.5 Lakhs.',
    options: [
      {
        text: '👍 Smart Budget Wedding: Keep celebration elegant & save corpus',
        action: (s) => ({
          ...s,
          netWorth: s.netWorth + (s.monthlySip * 12 * 1.10),
          happiness: Math.min(100, s.happiness + 10),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Hosted smart budget celebration within means.', impact: 'Zero debt incurred! Compounding continues.' }
          ]
        })
      },
      {
        text: '💳 Take ₹2 Lakh Personal Loan at 16% interest rate',
        action: (s) => ({
          ...s,
          debtAmount: s.debtAmount + 200000,
          happiness: Math.max(0, s.happiness - 15),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Took ₹2 Lakh Personal Loan for grand wedding.', impact: 'Added high-interest monthly EMI burden!' }
          ]
        })
      },
      {
        text: '💰 Liquidate 50% of Equity Portfolio',
        action: (s) => ({
          ...s,
          netWorth: Math.round(s.netWorth * 0.5),
          happiness: Math.max(0, s.happiness - 5),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Sold 50% equity portfolio for celebration.', impact: 'Lost 5 years of compound growth momentum.' }
          ]
        })
      }
    ]
  },
  {
    id: 'goa-trip',
    title: 'Europe / Goa Vacation Plan with Friends! ✈️',
    emoji: '🌴',
    description: 'Friends are planning a dream vacation. Cost is ₹60,000.',
    options: [
      {
        text: '💧 Plan Ahead: Save ₹10,000/mo for 6 months in Liquid Fund then go',
        action: (s) => ({
          ...s,
          netWorth: s.netWorth + (s.monthlySip * 12 * 1.10) - 60000,
          happiness: Math.min(100, s.happiness + 20),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Planned vacation via dedicated liquid savings.', impact: 'Enjoyed trip with 100% peace of mind!' }
          ]
        })
      },
      {
        text: '💳 Swiped Credit Card on No-Cost EMI',
        action: (s) => ({
          ...s,
          debtAmount: s.debtAmount + 60000,
          happiness: Math.max(0, s.happiness - 5),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Took No-Cost EMI for vacation.', impact: 'Added ₹5,000/mo extra EMI stress.' }
          ]
        })
      },
      {
        text: '🛑 Skip trip & double SIP allocation instead',
        action: (s) => ({
          ...s,
          netWorth: s.netWorth + (s.monthlySip * 12 * 1.25),
          monthlySip: s.monthlySip + 5000,
          happiness: Math.max(0, s.happiness - 10),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Skipped trip to boost wealth SIPs.', impact: 'High net worth growth, but missed fun memory.' }
          ]
        })
      }
    ]
  },
  {
    id: 'diwali-bonus',
    title: 'Diwali Festive Bonus! 🪔',
    emoji: '🎁',
    description: 'Your company awards you a annual bonus of ₹1,00,000!',
    options: [
      {
        text: '🚀 70/30 Rule: 70% to Index Mutual Funds + 30% Festive Shopping',
        action: (s) => ({
          ...s,
          netWorth: s.netWorth + 70000 + (s.monthlySip * 12 * 1.12),
          happiness: Math.min(100, s.happiness + 15),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Invested 70% Diwali bonus into Mutual Funds.', impact: '+₹70,000 lump sum boost to wealth!' }
          ]
        })
      },
      {
        text: '📱 Buy Latest Flagship Smartphone & Electronics',
        action: (s) => ({
          ...s,
          happiness: Math.min(100, s.happiness + 10),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Spent 100% bonus on gadgets.', impact: 'Zero net worth increase from bonus.' }
          ]
        })
      },
      {
        text: '🛡️ Deposit 100% into 6-Month Emergency Cushion',
        action: (s) => ({
          ...s,
          emergencyFund: s.emergencyFund + 100000,
          happiness: Math.min(100, s.happiness + 10),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Fortified emergency fund with full bonus.', impact: '6-month emergency buffer 100% secured!' }
          ]
        })
      }
    ]
  },
  {
    id: 'bear-crash',
    title: 'Stock Market Bear Crash (-25% Dip)! 🐻',
    emoji: '📉',
    description: 'Global recession news causes Indian stock market to drop -25%.',
    options: [
      {
        text: '🚀 "Buy the Dip!" — Double monthly SIP amount',
        action: (s) => ({
          ...s,
          netWorth: Math.round(s.netWorth * 0.85 + s.monthlySip * 12 * 1.35),
          monthlySip: s.monthlySip + 5000,
          happiness: Math.min(100, s.happiness + 5),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Aggressively bought the market crash dip!', impact: 'Unlocked maximum long-term compounding boost!' }
          ]
        })
      },
      {
        text: '🧘 Hold Steady: Continue existing SIP without panicking',
        action: (s) => ({
          ...s,
          netWorth: Math.round(s.netWorth * 0.90 + s.monthlySip * 12 * 1.12),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Stayed disciplined during market crash.', impact: 'Portfolio absorbed volatility smoothly.' }
          ]
        })
      },
      {
        text: '😰 Panic Sell: Redeem equity portfolio to Savings A/C',
        action: (s) => ({
          ...s,
          netWorth: Math.round(s.netWorth * 0.70),
          monthlySip: 0,
          happiness: Math.max(0, s.happiness - 20),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Panic sold at market bottom!', impact: 'Incurred 30% permanent loss.' }
          ]
        })
      }
    ]
  },
  {
    id: 'bull-run',
    title: 'Super Indian Bull Market Rally (+30%)! 🐂',
    emoji: '📈',
    description: 'India\'s GDP growth booms! Nifty 50 hits all-time highs with +30% annual gain.',
    options: [
      {
        text: '💎 Rebalance: Shift 15% gain to Sovereign Gold Bonds & FDs',
        action: (s) => {
          const gain = Math.round(s.netWorth * 0.30);
          return {
            ...s,
            netWorth: s.netWorth + gain,
            emergencyFund: s.emergencyFund + 40000,
            happiness: Math.min(100, s.happiness + 15),
            historyLogs: [
              ...s.historyLogs,
              { year: s.year, event: 'Rebalanced bull run profits into Gold & Fixed Income.', impact: `Net worth surged by +₹${gain.toLocaleString('en-IN')}` }
            ]
          };
        }
      },
      {
        text: '🔥 Ride Compounding: Keep 100% in Equity Mutual Funds',
        action: (s) => {
          const gain = Math.round(s.netWorth * 0.32);
          return {
            ...s,
            netWorth: s.netWorth + gain,
            historyLogs: [
              ...s.historyLogs,
              { year: s.year, event: 'Rode 100% equity compounding during bull rally.', impact: `Net worth surged by +₹${gain.toLocaleString('en-IN')}` }
            ]
          };
        }
      },
      {
        text: '🏎️ Sell stocks & buy expensive luxury sports bike',
        action: (s) => ({
          ...s,
          netWorth: Math.round(s.netWorth * 0.7),
          happiness: Math.min(100, s.happiness + 10),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Sold equity portfolio for luxury bike.', impact: 'Reduced long-term wealth compounding corpus.' }
          ]
        })
      }
    ]
  },
  {
    id: 'job-hike',
    title: 'Job Appraisal & +25% Salary Raise! 💼',
    emoji: '🌟',
    description: 'Your annual appraisal lands! Monthly salary increases by +25%.',
    options: [
      {
        text: '🚀 60/20 Rule: Increase SIPs by 60% of raise amount',
        action: (s) => {
          const raise = Math.round(s.monthlySalary * 0.25);
          const extraSip = Math.round(raise * 0.60);
          return {
            ...s,
            monthlySalary: s.monthlySalary + raise,
            monthlySip: s.monthlySip + extraSip,
            netWorth: s.netWorth + (extraSip * 12 * 1.15),
            happiness: Math.min(100, s.happiness + 15),
            historyLogs: [
              ...s.historyLogs,
              { year: s.year, event: 'Allocated 60% raise to SIPs to avoid lifestyle inflation!', impact: `Increased Monthly SIP by +₹${extraSip.toLocaleString('en-IN')}` }
            ]
          };
        }
      },
      {
        text: '🏡 Rent Luxury Apartment in Prime Location',
        action: (s) => {
          const raise = Math.round(s.monthlySalary * 0.25);
          return {
            ...s,
            monthlySalary: s.monthlySalary + raise,
            happiness: Math.min(100, s.happiness + 10),
            historyLogs: [
              ...s.historyLogs,
              { year: s.year, event: 'Spent entire raise on premium rent.', impact: 'Zero increase in monthly investments.' }
            ]
          };
        }
      }
    ]
  },
  {
    id: 'medical-emergency',
    title: 'Sudden Medical / Car Repair Emergency! 🚑',
    emoji: '🚨',
    description: 'Unforeseen hospital bill or car damage of ₹50,000 arises.',
    options: [
      {
        text: '🛡️ Cover via Medical Insurance & Emergency Cushion',
        action: (s) => {
          const hasFund = s.emergencyFund >= 50000;
          return {
            ...s,
            emergencyFund: Math.max(0, s.emergencyFund - 50000),
            happiness: hasFund ? s.happiness : s.happiness - 10,
            historyLogs: [
              ...s.historyLogs,
              { year: s.year, event: 'Handled emergency with liquid buffer.', impact: hasFund ? 'Zero debt incurred!' : 'Emergency buffer drained!' }
            ]
          };
        }
      },
      {
        text: '💳 Swiped Credit Card at 36% Annual Interest',
        action: (s) => ({
          ...s,
          debtAmount: s.debtAmount + 50000,
          happiness: Math.max(0, s.happiness - 20),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Used high-interest credit card for emergency.', impact: 'Added ₹50,000 high-interest debt!' }
          ]
        })
      }
    ]
  },
  {
    id: 'tax-saving',
    title: 'Tax Season — Sec 80C Deadline! 📝',
    emoji: '🧾',
    description: 'Financial year end! You have ₹1.5 Lakh tax saving limit available under Sec 80C.',
    options: [
      {
        text: '🎯 Split into ELSS Tax Saver Funds + PPF (EEE Tax Free)',
        action: (s) => ({
          ...s,
          netWorth: s.netWorth + 150000 + (s.monthlySip * 12 * 1.12),
          happiness: Math.min(100, s.happiness + 15),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Saved ₹46,800 income tax via ELSS & PPF.', impact: 'Maximized tax efficiency & compounding!' }
          ]
        })
      },
      {
        text: '🏦 Buy Traditional LIC Endowment Policy (4% return)',
        action: (s) => ({
          ...s,
          netWorth: s.netWorth + 75000,
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Bought low-yield traditional insurance policy.', impact: 'Saved tax, but returns barely beat inflation (4%).' }
          ]
        })
      },
      {
        text: '❌ Ignore Tax Planning & Pay Penalty Tax',
        action: (s) => ({
          ...s,
          happiness: Math.max(0, s.happiness - 10),
          historyLogs: [
            ...s.historyLogs,
            { year: s.year, event: 'Missed tax saving deadline.', impact: 'Paid unnecessary ₹35,000 extra income tax.' }
          ]
        })
      }
    ]
  }
];

// Helper to shuffle array (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const InvestmentGamePage: React.FC = () => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>('Harsh');
  const [salaryInput, setSalaryInput] = useState<number>(70000);
  const [sipInput, setSipInput] = useState<number>(15000);

  const [gameState, setGameState] = useState<GameState>({
    playerName: 'Harsh',
    monthlySalary: 70000,
    year: 1,
    netWorth: 100000,
    emergencyFund: 50000,
    monthlySip: 15000,
    debtAmount: 0,
    happiness: 85,
    historyLogs: [],
    isGameOver: false,
    shuffledEvents: [],
  });

  const startGame = () => {
    // Pick 5 random shuffled events from the master pool of 10+ events
    const randomEvents = shuffleArray(EVENT_POOL).slice(0, 5);

    setGameState({
      playerName: nameInput || 'Harsh',
      monthlySalary: salaryInput || 70000,
      year: 1,
      netWorth: (sipInput * 12) + 50000,
      emergencyFund: 50000,
      monthlySip: sipInput || 15000,
      debtAmount: 0,
      happiness: 90,
      historyLogs: [
        { year: 1, event: 'Started Financial Life Journey!', impact: `Initial Salary: ₹${salaryInput.toLocaleString('en-IN')}/mo • 5 Random Scenarios Loaded!` }
      ],
      isGameOver: false,
      shuffledEvents: randomEvents,
    });
    setHasStarted(true);
  };

  const handleOptionClick = (optionAction: (prev: GameState) => GameState) => {
    const nextState = optionAction(gameState);
    const nextYear = gameState.year + 1;

    if (nextYear > 5) {
      // Trigger festive confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      setGameState({
        ...nextState,
        year: 5,
        isGameOver: true,
      });
    } else {
      setGameState({
        ...nextState,
        year: nextYear,
      });
    }
  };

  const getRankTitle = (nw: number) => {
    if (nw > 1800000) return { title: "👑 Legend Wealth Master (Top 1%)", color: "text-amber-400 font-extrabold" };
    if (nw > 1000000) return { title: "🥇 Disciplined Crorepati in Making", color: "text-emerald-400 font-bold" };
    if (nw > 500000) return { title: "🥈 Smart Saver & Investor", color: "text-teal-400 font-bold" };
    return { title: "🥉 Financial Survivor", color: "text-slate-300" };
  };

  const currentEvent = gameState.shuffledEvents[gameState.year - 1] || EVENT_POOL[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-extrabold shadow-md">
          <Gamepad2 className="w-4 h-4" />
          <span>SalaryWise Dynamic Life Game 🎮</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Play the 5-Year Salary Game!
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Every playthrough reshuffles 12+ real-world Indian financial life events! Can you build a ₹18+ Lakh corpus in 5 years?
        </p>
      </div>

      {/* GAME SETUP SCREEN */}
      {!hasStarted ? (
        <div className="glass-card p-6 sm:p-10 space-y-6 border-purple-500/40">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Character & Game Setup</span>
            </h2>

            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center gap-1">
              <Shuffle className="w-3.5 h-3.5" />
              <span>Random Scenario Reshuffle Active</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Player Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Harsh"
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Salary (₹)</label>
              <input
                type="number"
                value={salaryInput}
                onChange={(e) => setSalaryInput(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Starting Monthly SIP (₹)</label>
              <input
                type="number"
                value={sipInput}
                onChange={(e) => setSipInput(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-purple-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white font-extrabold text-base shadow-xl flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>Start Reshuffled 5-Year Life Game</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        /* GAMEPLAY DISPLAY */
        <div className="space-y-6">
          
          {/* STATS DASHBOARD BAR */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white grid grid-cols-2 sm:grid-cols-4 gap-4 shadow-xl border border-slate-800">
            <div>
              <p className="text-[11px] text-slate-400 font-semibold">Player</p>
              <p className="text-lg font-bold text-emerald-400">{gameState.playerName}</p>
              <p className="text-[10px] text-slate-400">Year {gameState.year} / 5</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-semibold">Net Worth Corpus</p>
              <p className="text-xl font-extrabold text-emerald-400">₹{gameState.netWorth.toLocaleString('en-IN')}</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-semibold">Monthly SIP</p>
              <p className="text-xl font-extrabold text-teal-300">₹{gameState.monthlySip.toLocaleString('en-IN')}/mo</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-semibold">Peace of Mind Index</p>
              <p className="text-xl font-extrabold text-purple-400">{gameState.happiness}% ❤️</p>
            </div>
          </div>

          {/* GAME OVER RESULTS SCREEN */}
          {gameState.isGameOver ? (
            <div className="glass-card p-8 text-center space-y-6 border-emerald-500/50 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 text-white">
              <span className="text-6xl">🏆</span>
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold">5-Year Game Completed!</h2>
                <p className={`text-xl ${getRankTitle(gameState.netWorth).color}`}>
                  {getRankTitle(gameState.netWorth).title}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/80 max-w-md mx-auto space-y-2 text-sm">
                <p className="flex justify-between">
                  <span>Final Net Worth Accumulation:</span>
                  <span className="font-extrabold text-emerald-400">₹{gameState.netWorth.toLocaleString('en-IN')}</span>
                </p>
                <p className="flex justify-between">
                  <span>Emergency Cushion Saved:</span>
                  <span className="font-bold text-teal-300">₹{gameState.emergencyFund.toLocaleString('en-IN')}</span>
                </p>
                <p className="flex justify-between">
                  <span>Outstanding Debt Remaining:</span>
                  <span className="font-bold text-rose-400">₹{gameState.debtAmount.toLocaleString('en-IN')}</span>
                </p>
              </div>

              <button
                onClick={startGame}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 mx-auto transition cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                <span>Play Again with Reshuffled Scenarios!</span>
              </button>
            </div>
          ) : (
            /* CURRENT DYNAMIC EVENT CARD */
            <div className="glass-card p-6 sm:p-8 space-y-6 border-purple-500/40">
              <div className="space-y-2">
                <span className="text-4xl">{currentEvent.emoji}</span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Year {gameState.year}: {currentEvent.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentEvent.description}
                </p>
              </div>

              {/* 3-4 Action Choices */}
              <div className="space-y-3 pt-2">
                <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Choose your financial move:</p>
                {currentEvent.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(opt.action)}
                    className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 font-semibold text-xs text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between cursor-pointer"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* HISTORY LOGS */}
          <div className="p-6 rounded-2xl glass-card space-y-3 text-xs">
            <h3 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Life History Timeline</span>
            </h3>

            <div className="space-y-2">
              {gameState.historyLogs.map((log, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Year {log.year}: </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{log.event}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">{log.impact}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
