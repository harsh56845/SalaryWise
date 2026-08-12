import React from 'react';
import { Info } from 'lucide-react';

interface HinglishTooltipProps {
  text: string;
  hinglish: string;
}

export const HinglishTooltip: React.FC<HinglishTooltipProps> = ({ text, hinglish }) => {
  const [show, setShow] = React.useState(false);

  return (
    <span className="relative inline-flex items-center ml-1">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 focus:outline-none"
        aria-label="Explanation"
      >
        <Info className="w-4 h-4" />
      </button>

      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white dark:bg-slate-800 text-xs rounded-xl shadow-xl z-50 border border-slate-700">
          <p className="font-semibold text-emerald-400 mb-1">{text}</p>
          <p className="text-slate-300 italic">{hinglish}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
        </div>
      )}
    </span>
  );
};
