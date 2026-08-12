import React, { useState } from 'react';
import { Moon, Sun, Menu, X, RefreshCw, Bot, Code2, Gamepad2 } from 'lucide-react';

interface HeaderProps {
  currentTab: 'landing' | 'wizard' | 'dashboard' | 'simulators' | 'investments' | 'game';
  onNavigate: (tab: 'landing' | 'wizard' | 'dashboard' | 'simulators' | 'investments' | 'game') => void;
  onLoadSampleData: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAiCopilot: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onLoadSampleData,
  darkMode,
  onToggleDarkMode,
  onOpenAiCopilot,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Creator Attribution */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('landing')}>
            <img 
              src="/logo.jpg" 
              alt="SalaryWise Logo" 
              className="w-10 h-10 rounded-xl object-cover border border-emerald-500/40 shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform" 
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
                  SalaryWise
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <Code2 className="w-3 h-3 text-emerald-500" />
                  <span>By Harsh</span>
                </span>
              </div>
              <span className="block text-[10px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Plan Your Salary. Build Your Future.
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-[#131B2E] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentTab === 'landing'
                  ? 'bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('wizard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentTab === 'wizard'
                  ? 'bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Salary Planner
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentTab === 'dashboard'
                  ? 'bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => onNavigate('game')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentTab === 'game'
                  ? 'bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Salary Game 🎮
            </button>

            <button
              onClick={() => onNavigate('investments')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentTab === 'investments'
                  ? 'bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Investment Hub 🚀
            </button>

            <button
              onClick={() => onNavigate('simulators')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentTab === 'simulators'
                  ? 'bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Simulators
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Sample Data */}
            <button
              onClick={onLoadSampleData}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition"
              title="Load demo data for ₹70,000 salary"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sample Data</span>
            </button>

            {/* AI Copilot */}
            <button
              onClick={onOpenAiCopilot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-sm transition"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Dark Mode"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] px-4 py-3 space-y-2">
          <div className="px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Code2 className="w-4 h-4" />
            <span>Created by Harsh</span>
          </div>
          <button
            onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => { onNavigate('wizard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Calculate Salary Plan
          </button>
          <button
            onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            My Dashboard
          </button>
          <button
            onClick={() => { onNavigate('game'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
          >
            Salary Game 🎮
          </button>
          <button
            onClick={() => { onNavigate('investments'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Investment Hub 🚀
          </button>
          <button
            onClick={() => { onNavigate('simulators'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Simulators
          </button>
          <button
            onClick={() => { onLoadSampleData(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60"
          >
            ⚡ Load Sample Data (₹70,000)
          </button>
        </div>
      )}
    </header>
  );
};
