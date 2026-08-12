import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, User, HelpCircle, ShieldAlert } from 'lucide-react';
import { UserFinancialState } from '../../types';
import { calculateSalaryAllocation } from '../../calculations/allocationEngine';
import { calculateFinancialHealthScore } from '../../calculations/healthScoreEngine';

interface SalaryWiseCopilotProps {
  userState: UserFinancialState;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const SalaryWiseCopilot: React.FC<SalaryWiseCopilotProps> = ({ userState, isOpen, onClose }) => {
  const allocation = calculateSalaryAllocation(userState);
  const health = calculateFinancialHealthScore(userState);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Namaste! Main aapka SalaryWise Financial Assistant hu. Aapke live monthly salary (₹${userState.monthlySalary.toLocaleString('en-IN')}) aur expenses ke basis par mujhse financial query poochiye!`,
    },
  ]);

  const presets = [
    'Can I afford a ₹20,000 phone?',
    'Should I prioritize my loan or investment?',
    'How long will it take to build my emergency fund?',
    'Where is most of my salary going?',
    'What happens if my salary increases by ₹10,000?',
  ];

  const generateAiAnswer = (q: string): string => {
    const query = q.toLowerCase();
    const salary = userState.monthlySalary;
    const surplus = allocation.surplus;
    const rec = allocation.recommendedAllocation;
    const totalEmi = allocation.totalMonthlyEmi;

    if (query.includes('phone') || query.includes('afford')) {
      if (surplus > 15000 && rec.emergency > 0) {
        return `Aapki monthly in-hand salary ₹${salary.toLocaleString('en-IN')} aur monthly surplus ₹${surplus.toLocaleString('en-IN')} hai. ₹20,000 ka phone 2-3 months ke lifestyle budget (₹${rec.wants.toLocaleString('en-IN')}/mo) se cash par khareedna sensible hoga. High-interest No-Cost EMI se bachne ki koshish karein!`;
      } else {
        return `Abhi aapka monthly surplus ₹${surplus.toLocaleString('en-IN')} hai aur emergency fund target incomplete hai. ₹20,000 ka phone abhi emergency buffer impact kar sakta hai. 2 months wait karke cash budget accumulate karein.`;
      }
    }

    if (query.includes('loan') || query.includes('debt') || query.includes('credit card')) {
      if (userState.hasDebt && totalEmi > 0) {
        return `Aapka current monthly EMI ₹${totalEmi.toLocaleString('en-IN')} (DTI: ${allocation.dtiRatio}%) hai. Agar aapke pass Credit Card ya Personal loan (>12% interest) hai, to 36% interest se bachne ke liye pehle debt repayment ko priority dein. Market return guarantee nahi hote, lekin debt clear karna 100% guaranteed savings hai!`;
      } else {
        return `Aap filhaal debt-free hain! Clear credit history aur zero EMI stress hone ki wajah se aap surplus amount ko direct SIPs aur Long-Term Equity index funds mein allocate kar sakte hain.`;
      }
    }

    if (query.includes('emergency')) {
      const currentFund = (userState.existingEmergencyFund || 0) + (userState.bankSavings || 0);
      const target6M = allocation.essentialExpenses * 6;
      const deficit = Math.max(0, target6M - currentFund);
      const monthlyAlloc = rec.emergency > 0 ? rec.emergency : 5000;
      const months = Math.ceil(deficit / monthlyAlloc);

      return `Essential monthly expenses: ₹${allocation.essentialExpenses.toLocaleString('en-IN')}. 6-Month Emergency Target = ₹${target6M.toLocaleString('en-IN')}. Current buffer = ₹${currentFund.toLocaleString('en-IN')}. Monthly ₹${monthlyAlloc.toLocaleString('en-IN')} allocate karne par lagbhag ${months} months mein emergency fund complete ho jaayega!`;
    }

    if (query.includes('going') || query.includes('expenses')) {
      return `Aapki salary ka largest portion essential living needs mein jaha raha hai (₹${allocation.essentialExpenses.toLocaleString('en-IN')}, i.e. ${Math.round((allocation.essentialExpenses / salary) * 100)}% of income). Total EMIs consume ₹${totalEmi.toLocaleString('en-IN')}.`;
    }

    if (query.includes('10,000') || query.includes('increase') || query.includes('salary increase')) {
      return `Agar aapki salary ₹10,000 se badhti hai, to lifestyle inflation avoid karne ke liye: ₹6,000 Investments (60%), ₹2,000 Goals (20%), ₹1,000 Emergency/Debt (10%), aur ₹1,000 Lifestyle treat (10%) mein allocate karein!`;
    }

    // Default intelligent response
    return `Aapki monthly income ₹${salary.toLocaleString('en-IN')} hai. Financial Health Score is ${health.totalScore}/100 (${health.rating}). Recommended monthly investment budget is ₹${rec.investments.toLocaleString('en-IN')}. Focus on maintaining 6-month emergency buffer and steady Index Fund SIPs!`;
  };

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = { sender: 'user', text: q };
    const aiAnswer: Message = { sender: 'ai', text: generateAiAnswer(q) };

    setMessages((prev) => [...prev, userMsg, aiAnswer]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full sm:w-[450px] h-full bg-white dark:bg-[#0B0F17] border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-300" />
            <div>
              <h3 className="font-bold text-sm">SalaryWise Copilot</h3>
              <p className="text-[10px] text-purple-200">AI Assistant • Live Session Context Active</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white font-semibold rounded-tr-none'
                    : 'bg-slate-100 dark:bg-[#131B2E] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preset Chips */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 overflow-x-auto whitespace-nowrap flex gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:border-purple-500 transition shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your salary plan..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
