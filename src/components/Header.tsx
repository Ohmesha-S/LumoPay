import React from 'react';
import { Globe, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { UserPersona, AppLanguage } from '../types';
import { PERSONAS } from '../data/mockData';

interface HeaderProps {
  currentPersona: UserPersona;
  currentLanguage: AppLanguage;
  onOpenLanguageModal: () => void;
  onOpenPersonaModal: () => void;
  onSelectPersona: (p: UserPersona) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPersona,
  currentLanguage,
  onOpenLanguageModal,
  onOpenPersonaModal,
  onSelectPersona,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-2.5 shadow-sm">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-sm">
            ₹
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">LumoPay</span>
              <span className="text-teal-700 font-bold text-xs bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                लूमोपे
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              {currentLanguage === 'mr' ? 'आर्थिक समावेशन' : currentLanguage === 'bn' ? 'আর্থিক অন্তর্ভুক্তি' : currentLanguage === 'ta' ? 'நிதி உள்ளடக்கம்' : currentLanguage === 'hi' ? 'वित्तीय समावेशन साथी' : 'Financial Inclusion'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Demo Persona Switcher Pill */}
          <button
            onClick={onOpenPersonaModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-all active:scale-95 shadow-2xs"
            title="Switch Demo Persona"
          >
            <span className="text-sm">{currentPersona.avatar}</span>
            <span className="max-w-[70px] truncate">{currentPersona.name.split(' ')[0]}</span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-200/60 px-1 rounded">
              Demo
            </span>
          </button>

          {/* Language Selector Button */}
          <button
            onClick={onOpenLanguageModal}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center"
            title="Change Language"
          >
            <Globe className="w-4 h-4 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
