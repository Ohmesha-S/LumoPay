import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  PhoneCall,
  Volume2,
  Copy,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { AppLanguage, ScamAnalysisResult } from '../types';
import { SAMPLE_SCAMS } from '../data/mockData';
import { analyzeScamWithGemini } from '../services/geminiService';
import { speakText } from '../services/voiceService';

interface ScamShieldScreenProps {
  language: AppLanguage;
  onBack?: () => void;
}

export const ScamShieldScreen: React.FC<ScamShieldScreenProps> = ({ language }) => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScamAnalysisResult | null>(null);

  const handleAnalyze = async (textToScan?: string) => {
    const text = textToScan || inputText;
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    try {
      const res = await analyzeScamWithGemini(text, language);
      setResult(res);
      // Auto-read in Hindi if High Risk
      if (res.riskLevel === 'HIGH_RISK') {
        speakText(res.warningHindi, 'hi');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectSample = (sample: (typeof SAMPLE_SCAMS)[0]) => {
    setInputText(sample.sampleText);
    handleAnalyze(sample.sampleText);
  };

  const handleVoiceReadout = () => {
    if (!result) return;
    const text = (language === 'mr' ? result.warningMarathi || result.warningEnglish : language === 'bn' ? result.warningBengali || result.warningEnglish : language === 'ta' ? result.warningTamil || result.warningEnglish : language === 'hi' ? result.warningHindi : result.warningEnglish);
    speakText(text, language);
  };

  return (
    <div className="space-y-4 pb-20 pt-2">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-700 via-rose-600 to-rose-800 p-5 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-base">
                {(language === 'mr' ? 'लूमोपे फ्रॉड शील्ड' : language === 'bn' ? 'সহায় ফ্রড শিল্ড' : language === 'ta' ? 'சஹாய் மோசடி தடுப்பு' : language === 'hi' ? 'सहाए फ्रॉड शील्ड (AI Scam Shield)' : 'LumoPay Fraud Shield')}
              </h2>
              <p className="text-xs text-rose-100">Powered by Gemini AI</p>
            </div>
          </div>
          <a
            href="tel:1930"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-rose-700 font-extrabold text-xs shadow-sm hover:bg-rose-50 active:scale-95 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1930</span>
          </a>
        </div>
        <p className="text-xs text-rose-50 leading-relaxed pt-1">
          {(language === 'mr' ? 'Check suspicious SMS or WhatsApp messages before sending money or clicking links.' : language === 'bn' ? 'Check suspicious SMS or WhatsApp messages before sending money or clicking links.' : language === 'ta' ? 'Check suspicious SMS or WhatsApp messages before sending money or clicking links.' : language === 'hi' ? 'पैसे भेजने या लिंक पर क्लिक करने से पहले संदिग्ध एसएमएस या व्हाट्सएप संदेश की जांच करें।' : 'Check suspicious SMS or WhatsApp messages before sending money or clicking links.')}
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <label className="block text-xs font-bold text-slate-800">
          {(language === 'mr' ? 'Paste Suspicious Message or Payment Link' : language === 'bn' ? 'Paste Suspicious Message or Payment Link' : language === 'ta' ? 'Paste Suspicious Message or Payment Link' : language === 'hi' ? 'संदिग्ध संदेश यहाँ पेस्ट करें (Paste Message)' : 'Paste Suspicious Message or Payment Link')}
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            (language === 'mr' ? 'e.g. "You won KBC lucky draw", "Enter PIN to receive cash"...' : language === 'bn' ? 'e.g. "You won KBC lucky draw", "Enter PIN to receive cash"...' : language === 'ta' ? 'e.g. "You won KBC lucky draw", "Enter PIN to receive cash"...' : language === 'hi' ? 'उदा. "लॉटरी जीत गए हैं", "बिजली कट जाएगी", "पैसे लेने के लिए पिन डालें"...' : 'e.g. "You won KBC lucky draw", "Enter PIN to receive cash"...')
          }
          rows={3}
          className="w-full rounded-xl border border-slate-200 p-3 text-xs leading-relaxed focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
        />

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAnalyze()}
            disabled={isAnalyzing || !inputText.trim()}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>जांच जारी है (Scanning)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{(language === 'mr' ? 'जेमिनी AI सह पडताळा' : language === 'bn' ? 'জেমিনি AI দিয়ে যাচাই করুন' : language === 'ta' ? 'ஜெமினி AI உடன் சரிபார்க்கவும்' : language === 'hi' ? 'एआई से जांचें (Check with AI)' : 'Verify with Gemini AI')}</span>
              </>
            )}
          </button>
          {inputText && (
            <button
              onClick={() => {
                setInputText('');
                setResult(null);
              }}
              className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600"
            >
              साफ करें
            </button>
          )}
        </div>
      </div>

      {/* Preset Indian Scams */}
      <div className="space-y-2">
        <span className="text-xs font-extrabold text-slate-700">
          {(language === 'mr' ? 'सामान्य फसवणूक नमुने:' : language === 'bn' ? 'সাধারণ প্রতারণার নমুনা:' : language === 'ta' ? 'பொதுவான மோசடி உதாரணங்கள்:' : language === 'hi' ? 'सामान्य धोखाधड़ी के उदाहरण (Try Samples):' : 'Common Fraud Samples:')}
        </span>
        <div className="grid grid-cols-1 gap-2">
          {SAMPLE_SCAMS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(s)}
              className="text-left p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 hover:bg-rose-50/30 transition-all shadow-2xs group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 group-hover:text-rose-700">
                  {(language === 'mr' ? s.marathiTitle || s.title : language === 'bn' ? s.bengaliTitle || s.title : language === 'ta' ? s.tamilTitle || s.title : language === 'hi' ? s.hindiTitle : s.title)}
                </span>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  टेस्ट करें
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 italic">
                "{s.sampleText}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Scan Results Card */}
      {result && (
        <div
          className={`rounded-2xl p-4 border-2 shadow-sm space-y-3.5 animate-in fade-in slide-in-from-bottom-2 ${
            result.riskLevel === 'HIGH_RISK'
              ? 'bg-rose-50/90 border-rose-500 text-rose-950'
              : result.riskLevel === 'SUSPICIOUS'
              ? 'bg-amber-50/90 border-amber-500 text-amber-950'
              : 'bg-emerald-50/90 border-emerald-500 text-emerald-950'
          }`}
        >
          {/* Risk Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {result.riskLevel === 'HIGH_RISK' ? (
                <div className="p-2 rounded-xl bg-rose-600 text-white">
                  <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                </div>
              ) : result.riskLevel === 'SUSPICIOUS' ? (
                <div className="p-2 rounded-xl bg-amber-500 text-white">
                  <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-emerald-600 text-white">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
              )}
              <div>
                <div className="text-sm font-black">
                  {result.riskLevel === 'HIGH_RISK'
                    ? 'अत्यधिक जोखिम (100% FRAUD RISK)'
                    : result.riskLevel === 'SUSPICIOUS'
                    ? 'संदेहास्पद (SUSPICIOUS)'
                    : 'सुरक्षित (SAFE)'}
                </div>
                <div className="text-[11px] font-medium opacity-80">
                  AI Confidence: {result.confidenceScore}%
                </div>
              </div>
            </div>

            <button
              onClick={handleVoiceReadout}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-300 shadow-2xs text-xs font-bold hover:bg-slate-50 active:scale-95 text-slate-800"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>बोलकर सुनें</span>
            </button>
          </div>

          {/* Warning Message */}
          <div className="bg-white/80 rounded-xl p-3 border border-slate-200/60">
            <p className="text-xs font-bold leading-relaxed">
              {(language === 'mr' ? result.warningMarathi || result.warningEnglish : language === 'bn' ? result.warningBengali || result.warningEnglish : language === 'ta' ? result.warningTamil || result.warningEnglish : language === 'hi' ? result.warningHindi : result.warningEnglish)}
            </p>
          </div>

          {/* Red Flags List */}
          {result.redFlags.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-80">
                खतरे के मुख्य संकेत (Red Flags):
              </span>
              <ul className="space-y-1 text-xs">
                {result.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 flex-shrink-0" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Callout */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
            <span className="text-slate-800 max-w-[200px]">
              {result.recommendedAction}
            </span>
            <a
              href="tel:1930"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-700 text-white font-extrabold shadow-xs hover:bg-rose-800"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>1930 साइबर हेल्प</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
