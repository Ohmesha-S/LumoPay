import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserPersona, AppLanguage } from '../types';
import { PERSONAS } from '../data/mockData';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPersona: UserPersona;
  onSelectPersona: (p: UserPersona) => void;
  language: AppLanguage;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  currentPersona,
  onSelectPersona,
  language,
}) => {
  if (!isOpen) return null;

  const personaList = Object.values(PERSONAS);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl space-y-4 my-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {(language === 'mr' ? 'तुम्ही कोण आहात?' : language === 'bn' ? 'আপনি কে?' : language === 'ta' ? 'Who Are You?' : language === 'hi' ? 'आप कौन हैं? (Choose Persona)' : 'Who Are You?')}
            </h3>
            <p className="text-xs text-slate-500">
              {(language === 'mr' ? 'वैशिष्ट्ये तपासण्यासाठी व्यक्तिरेखा निवडा' : language === 'bn' ? 'বৈশিষ্ট্যগুলি পরীক্ষা করার জন্য একটি পার্সোনা নির্বাচন করুন' : language === 'ta' ? 'Select a persona to test tailored financial features' : language === 'hi' ? 'अनुभव के लिए अपनी पसंदीदा प्रोफाइल चुनें' : 'Select a persona to test tailored financial features')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-[68vh] overflow-y-auto no-scrollbar pr-0.5">
          {personaList.map((p) => {
            const isSelected = currentPersona.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => {
                  onSelectPersona(p);
                  onClose();
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl p-2 rounded-2xl bg-amber-100/70 border border-amber-200 flex-shrink-0">
                    {p.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {(language === 'mr' ? p.marathiName || p.name : language === 'bn' ? p.bengaliName || p.name : language === 'ta' ? p.tamilName || p.name : language === 'hi' ? p.hindiName : p.name)}
                      </h4>
                      {isSelected && (
                        <span className="text-xs font-bold text-amber-600 flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          सक्रिय
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-teal-700 mt-0.5">
                      {(language === 'mr' ? p.marathiRole || p.role : language === 'bn' ? p.bengaliRole || p.role : language === 'ta' ? p.tamilRole || p.role : language === 'hi' ? p.hindiRole : p.role)}
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                      {(language === 'mr' ? p.marathiSummary || p.summary : language === 'bn' ? p.bengaliSummary || p.summary : language === 'ta' ? p.tamilSummary || p.summary : language === 'hi' ? p.hindiSummary : p.summary)}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>
                        खाता राशि: <b className="text-slate-800">₹{p.balance.toLocaleString()}</b>
                      </span>
                      <span>
                        लक्ष्य: <b className="text-amber-700">{p.goalName.split('(')[0]}</b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-sm shadow-md hover:from-amber-700 hover:to-amber-600 transition-all flex items-center justify-center gap-2"
        >
          <span>{(language === 'mr' ? 'डॅशबोर्डवर जा' : language === 'bn' ? 'ড্যাশবোর্ডে যান' : language === 'ta' ? 'Continue to Dashboard' : language === 'hi' ? 'डैशबोर्ड पर जारी रखें' : 'Continue to Dashboard')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
