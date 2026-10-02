import React from 'react';
import { Home, Smartphone, Landmark, GraduationCap, ShieldAlert } from 'lucide-react';
import { TabType, AppLanguage } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  language: AppLanguage;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  language,
}) => {
  const tabs: { id: TabType; en: string; hi: string; ta: string; mr: string; bn: string; icon: React.ReactNode }[] = [
    { id: 'home', en: 'Home', hi: 'होम', ta: 'முகப்பு', mr: 'मुख्यपृष्ठ', bn: 'হোম', icon: <Home className="w-5 h-5" /> },
    { id: 'pay', en: 'Pay', hi: 'भुगतान', ta: 'பணம் செலுத்து', mr: 'पे', bn: 'पे', icon: <Smartphone className="w-5 h-5" /> },
    { id: 'save_borrow', en: 'Save & Borrow', hi: 'बचत व ऋण', ta: 'சேமிப்பு & கடன்', mr: 'बचत आणि कर्ज', bn: 'সঞ্চয় ও ঋণ', icon: <Landmark className="w-5 h-5" /> },
    { id: 'learn', en: 'Learn', hi: 'सीखें', ta: 'கற்றுக்கொள்', mr: 'शिका', bn: 'শিখুন', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'help', en: 'Help & Shield', hi: 'सहायता', ta: 'உதவி', mr: 'मदत', bn: 'সাহায্য', icon: <ShieldAlert className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 safe-area-bottom shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                isActive ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-amber-500 rounded-b-full shadow-xs" />
              )}
              <div className={`p-1 rounded-full transition-transform ${isActive ? 'scale-110' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[10px] leading-tight mt-0.5 truncate max-w-full px-1">
                {language === 'mr' ? tab.mr : language === 'bn' ? tab.bn : language === 'ta' ? tab.ta : language === 'hi' ? tab.hi : tab.en}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
