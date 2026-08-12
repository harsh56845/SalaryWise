import React, { useState } from 'react';
import { Calendar, CheckSquare, Square, Clock } from 'lucide-react';

export const ActionChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    's1': true,
    's2': true,
    'd1': false,
    'm1': false,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    {
      title: 'Salary Day (Day 1)',
      icon: Calendar,
      color: 'text-emerald-500',
      items: [
        { id: 's1', label: 'Transfer emergency savings buffer to liquid fund / savings A/C' },
        { id: 's2', label: 'Pay essential bills (Rent, Electricity, Internet)' },
        { id: 's3', label: 'Allocate SIP mutual fund investment amounts' },
        { id: 's4', label: 'Allocate goal savings contribution' },
      ],
    },
    {
      title: 'During Month (Days 2 - 25)',
      icon: Clock,
      color: 'text-teal-500',
      items: [
        { id: 'd1', label: 'Track weekly expenses on groceries & food delivery' },
        { id: 'd2', label: 'Avoid impulse credit card spending on non-essentials' },
        { id: 'd3', label: 'Stay within allocated lifestyle budget' },
      ],
    },
    {
      title: 'Month End (Days 26 - 30)',
      icon: CheckSquare,
      color: 'text-purple-500',
      items: [
        { id: 'm1', label: 'Review total monthly actual spending vs budget' },
        { id: 'm2', label: 'Verify achieved savings rate' },
        { id: 'm3', label: 'Update financial goal progress counters' },
      ],
    },
  ];

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Monthly Action Checklist
        </h2>
        <p className="text-xs text-slate-500">
          Disciplined monthly routine to maintain financial stability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((sec, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className={`font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 ${sec.color}`}>
              <sec.icon className="w-4 h-4" />
              <span>{sec.title}</span>
            </h3>

            <div className="space-y-2">
              {sec.items.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className="w-full text-left flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition text-xs"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className={isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200 font-medium'}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
