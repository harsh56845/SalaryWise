import React from 'react';
import { ShieldAlert, Heart, Lock, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#070A10] border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Creator info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="SalaryWise Logo" 
                className="w-8 h-8 rounded-lg object-cover border border-emerald-500/30" 
              />
              <span className="text-lg font-bold text-slate-900 dark:text-white">SalaryWise</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <Code2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Created by Harsh</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Plan Your Salary. Build Your Future.<br />
              Personalized salary allocation & financial health planner built by Harsh for Indian professionals.
            </p>
          </div>

          {/* Col 2: Smart Framework */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Salary Framework
            </h4>
            <ul className="space-y-1.5 text-slate-500 dark:text-slate-400">
              <li>Essential Needs (50%)</li>
              <li>Wealth Investments (25%)</li>
              <li>Emergency Runway (15%)</li>
              <li>Lifestyle & Wants (10%)</li>
            </ul>
          </div>

          {/* Col 3: Privacy & Security */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Privacy & Data
            </h4>
            <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
              <Lock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p>
                100% Client-Side Private. Your financial numbers are calculated strictly inside your browser. No sensitive data is transmitted.
              </p>
            </div>
          </div>

          {/* Col 4: Educational Disclaimer */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 uppercase tracking-wider text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5" />
              Important Disclaimer
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              SalaryWise provides educational and illustrative financial information and is not personalized investment advice. Investment decisions involve market risk.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SalaryWise • Designed & Built with <Heart className="w-3 h-3 text-rose-500 inline mx-0.5 fill-current" /> by <strong className="text-slate-900 dark:text-white font-bold">Harsh</strong>.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-emerald-500 transition cursor-pointer">Educational Platform</span>
            <span>•</span>
            <span className="hover:text-emerald-500 transition cursor-pointer">INR (₹) Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
