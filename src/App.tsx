import React, { useState, useEffect } from 'react';
import { UserFinancialState } from './types';
import { SAMPLE_USER_DATA } from './data/sampleUser';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { Dashboard } from './components/dashboard/Dashboard';
import { SimulatorsTab } from './components/simulators/SimulatorsTab';
import { InvestmentGuidePage } from './components/investments/InvestmentGuidePage';
import { InvestmentGamePage } from './components/game/InvestmentGamePage';
import { SalaryWiseCopilot } from './components/ai/SalaryWiseCopilot';

const LOCAL_STORAGE_KEY = 'salarywise_user_financial_state_v2';

export function App() {
  const [currentTab, setCurrentTab] = useState<'landing' | 'wizard' | 'dashboard' | 'simulators' | 'investments' | 'game'>('landing');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState<boolean>(false);

  // Initialize financial state from localStorage or sample user
  const [userState, setUserState] = useState<UserFinancialState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SAMPLE_USER_DATA;
      }
    }
    return SAMPLE_USER_DATA;
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userState));
  }, [userState]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLoadSampleData = () => {
    setUserState(SAMPLE_USER_DATA);
    setCurrentTab('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        onLoadSampleData={handleLoadSampleData}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onStartOnboarding={() => setCurrentTab('wizard')}
            onLoadSampleData={handleLoadSampleData}
          />
        )}

        {currentTab === 'wizard' && (
          <OnboardingWizard
            userState={userState}
            onChange={setUserState}
            onComplete={() => setCurrentTab('dashboard')}
            onLoadSampleData={handleLoadSampleData}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            userState={userState}
            onEditInputs={() => setCurrentTab('wizard')}
          />
        )}

        {currentTab === 'game' && (
          <InvestmentGamePage />
        )}

        {currentTab === 'investments' && (
          <InvestmentGuidePage />
        )}

        {currentTab === 'simulators' && (
          <SimulatorsTab userState={userState} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Financial Copilot Modal */}
      <SalaryWiseCopilot
        userState={userState}
        isOpen={isAiCopilotOpen}
        onClose={() => setIsAiCopilotOpen(false)}
      />

    </div>
  );
}

export default App;
