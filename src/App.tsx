import React, { useState } from 'react';
import { TabType, AppLanguage, UserPersona } from './types';
import { PERSONAS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LanguagePickerModal } from './components/LanguagePickerModal';
import { OnboardingModal } from './components/OnboardingModal';
import { HomeScreen } from './screens/HomeScreen';
import { ScamShieldScreen } from './screens/ScamShieldScreen';
import { AssistantScreen } from './screens/AssistantScreen';
import { PayScreen } from './screens/PayScreen';
import { SaveBorrowScreen } from './screens/SaveBorrowScreen';
import { LearnScreen } from './screens/LearnScreen';
import { ShieldAlert, Bot } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentPersona, setCurrentPersona] = useState<UserPersona>(PERSONAS.lakshmi);
  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>('hi');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  // Sub-tab under Help (Assistant vs Scam Shield)
  const [helpSubTab, setHelpSubTab] = useState<'assistant' | 'scam_shield'>('assistant');

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center selection:bg-amber-200">
      <div className="w-full max-w-md min-h-screen bg-slate-50 flex flex-col shadow-2xl relative">
        {/* Top Header */}
        <Header
          currentPersona={currentPersona}
          currentLanguage={currentLanguage}
          onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
          onOpenPersonaModal={() => setIsOnboardingModalOpen(true)}
          onSelectPersona={(p) => setCurrentPersona(p)}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 overflow-y-auto">
          {activeTab === 'home' && (
            <HomeScreen
              persona={currentPersona}
              language={currentLanguage}
              onNavigateTab={(t) => setActiveTab(t)}
              onOpenScamShield={() => {
                setActiveTab('help');
                setHelpSubTab('scam_shield');
              }}
              onOpenAssistant={() => {
                setActiveTab('help');
                setHelpSubTab('assistant');
              }}
            />
          )}

          {activeTab === 'pay' && (
            <PayScreen persona={currentPersona} language={currentLanguage} />
          )}

          {activeTab === 'save_borrow' && (
            <SaveBorrowScreen persona={currentPersona} language={currentLanguage} />
          )}

          {activeTab === 'learn' && <LearnScreen language={currentLanguage} />}

          {activeTab === 'help' && (
            <div className="space-y-3 pt-2">
              {/* Help Segmented Switcher */}
              <div className="flex bg-slate-200/80 p-1 rounded-2xl">
                <button
                  onClick={() => setHelpSubTab('assistant')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${helpSubTab === 'assistant'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <Bot className="w-4 h-4" />
                  <span>{currentLanguage === 'mr' ? 'लूमोपे दीदी (Voice AI)' : currentLanguage === 'bn' ? 'সহায় দিদি (Voice AI)' : currentLanguage === 'ta' ? 'சஹாய் அக்கா (Voice AI)' : currentLanguage === 'hi' ? 'लूमोपे दीदी (Voice AI)' : 'LumoPay Didi (Voice AI)'}</span>
                </button>
                <button
                  onClick={() => setHelpSubTab('scam_shield')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${helpSubTab === 'scam_shield'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>{currentLanguage === 'mr' ? 'फ्रॉड शील्ड (Scam Shield)' : currentLanguage === 'bn' ? 'ফ্রড শিল্ড (Scam Shield)' : currentLanguage === 'ta' ? 'மோசடி தடுப்பு (Scam Shield)' : currentLanguage === 'hi' ? 'फ्रॉड शील्ड (Scam Shield)' : 'Fraud Shield (Scam Shield)'}</span>
                </button>
              </div>

              {helpSubTab === 'assistant' ? (
                <AssistantScreen persona={currentPersona} language={currentLanguage} />
              ) : (
                <ScamShieldScreen language={currentLanguage} />
              )}
            </div>
          )}
        </main>

        {/* Fixed Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(t) => setActiveTab(t)}
          language={currentLanguage}
        />

        {/* Modals */}
        <LanguagePickerModal
          isOpen={isLanguageModalOpen}
          onClose={() => setIsLanguageModalOpen(false)}
          selectedLanguage={currentLanguage}
          onSelectLanguage={(lang) => setCurrentLanguage(lang)}
        />

        <OnboardingModal
          isOpen={isOnboardingModalOpen}
          onClose={() => setIsOnboardingModalOpen(false)}
          currentPersona={currentPersona}
          onSelectPersona={(p) => setCurrentPersona(p)}
          language={currentLanguage}
        />
      </div>
    </div>
  );
}

export default App;
