import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Volume2,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Send,
  PiggyBank,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { UserPersona, AppLanguage } from '../types';
import { MOCK_TRANSACTIONS } from '../data/mockData';
import { speakText } from '../services/voiceService';

interface HomeScreenProps {
  persona: UserPersona;
  language: AppLanguage;
  onNavigateTab: (tab: any) => void;
  onOpenScamShield: () => void;
  onOpenAssistant: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  persona,
  language,
  onNavigateTab,
  onOpenScamShield,
  onOpenAssistant,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const transactions = MOCK_TRANSACTIONS[persona.id] || [];

  const handleSpeakBalance = () => {
    const text =
      (language === 'mr' ? `नमस्कार ${persona.name}। तुमची एकूण शिल्लक ${persona.balance.toLocaleString()} रुपये आहे. या आठवड्यात तुम्ही ${persona.weeklyEarned} रुपये कमवले आणि ${persona.weeklySpent} रुपये खर्च केले.` : 
       language === 'bn' ? `নমস্কার ${persona.name}। আপনার মোট ব্যালেন্স ${persona.balance.toLocaleString()} টাকা। এই সপ্তাহে আপনি ${persona.weeklyEarned} টাকা আয় করেছেন এবং ${persona.weeklySpent} টাকা ব্যয় করেছেন।` : 
       language === 'ta' ? `வணக்கம் ${persona.name}। உங்கள் மொத்த இருப்பு ${persona.balance.toLocaleString()} ரூபாய். இந்த வாரம் நீங்கள் ${persona.weeklyEarned} ரூபாய் சம்பாதித்தீர்கள் மற்றும் ${persona.weeklySpent} ரூபாய் செலவழித்தீர்கள்.` : 
       language === 'hi' ? `नमस्ते ${persona.name}। आपके खाते में कुल राशि ${persona.balance.toLocaleString()} रुपये है। इस सप्ताह आपने ${persona.weeklyEarned} रुपये कमाए और ${persona.weeklySpent} रुपये खर्च किए।` : 
       `Hello ${persona.name}. Your total balance is Rupees ${persona.balance.toLocaleString()}. This week you earned ${persona.weeklyEarned} Rupees and spent ${persona.weeklySpent} Rupees.`);
    speakText(text, language);
  };

  const handleSpeakTip = () => {
    const tipText =
      (language === 'mr' ? 'महत्त्वाचा सुरक्षा नियम: पैसे मिळवण्यासाठी तुम्हाला कधीही तुमचा UPI पिन टाकण्याची गरज नाही. पिन फक्त पैसे पाठवण्यासाठी आहे.' : 
       language === 'bn' ? 'গুরুত্বপূর্ণ সুরক্ষা নিয়ম: টাকা পাওয়ার জন্য আপনাকে কখনই আপনার UPI পিন লিখতে হবে না। পিন শুধুমাত্র টাকা পাঠানোর জন্য।' : 
       language === 'ta' ? 'முக்கியமான பாதுகாப்பு விதி: பணம் பெற உங்கள் UPI பின்னை உள்ளிட வேண்டியதில்லை. பணம் அனுப்ப மட்டுமே பின்.' : 
       language === 'hi' ? 'याद रखें: किसी भी व्यक्ति से पैसे प्राप्त करने के लिए कभी भी यूपीआई पिन नहीं डाला जाता है। पिन सिर्फ पैसे भेजने पर लगता है।' : 
       'Important safety rule: You never need to enter your UPI PIN to receive money. PIN is only for sending money.');
    speakText(tipText, language);
  };

  return (
    <div className="space-y-4 pb-20 pt-2">
      {/* Persona Header Card */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="text-2xl p-1.5 rounded-xl bg-amber-100/70 border border-amber-200">
            {persona.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-extrabold text-slate-900 text-sm">
                {(language === 'mr' ? persona.marathiName || persona.name : language === 'bn' ? persona.bengaliName || persona.name : language === 'ta' ? persona.tamilName || persona.name : language === 'hi' ? persona.hindiName : persona.name)}
              </h2>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                {(language === 'mr' ? 'सत्यापित' : language === 'bn' ? 'যাচাইকৃত' : language === 'ta' ? 'சரிபார்க்கப்பட்டது' : language === 'hi' ? 'सत्यापित' : 'Verified')}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {(language === 'mr' ? persona.marathiRole || persona.role : language === 'bn' ? persona.bengaliRole || persona.role : language === 'ta' ? persona.tamilRole || persona.role : language === 'hi' ? persona.hindiRole : persona.role)}
            </p>
          </div>
        </div>

        {/* Trust Score */}
        <div className="text-right">
          <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{persona.trustScore}/100</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Trust Score</p>
        </div>
      </div>

      {/* Hero Balance Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 p-5 text-white shadow-lg">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-amber-100 uppercase tracking-wider">
                {(language === 'mr' ? 'एकूण बँक शिल्लक' : language === 'bn' ? 'মোট ব্যাঙ্ক ব্যালেন্স' : language === 'ta' ? 'மொத்த வங்கி இருப்பு' : language === 'hi' ? 'कुल बैंक बैलेंस' : 'Total Bank Balance')}
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors text-amber-100"
                aria-label="Toggle Balance Visibility"
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Voice Audio Speaker */}
            <button
              onClick={handleSpeakBalance}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all text-xs font-semibold active:scale-95"
              title="Listen in your language"
            >
              <Volume2 className="w-4 h-4 text-white" />
              <span>{(language === 'mr' ? 'ऐका' : language === 'bn' ? 'শুনুন' : language === 'ta' ? 'கேட்க' : language === 'hi' ? 'सुनें' : 'Listen')}</span>
            </button>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black tracking-tight">
              {showBalance ? `₹${persona.balance.toLocaleString('en-IN')}` : '₹ • • • •'}
            </span>
            <span className="text-xs text-amber-100 font-medium">INR</span>
          </div>

          <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs text-amber-100">
            <span className="font-mono text-[11px] truncate max-w-[200px]">{persona.upiId}</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
              NPCI • 100% Safe
            </span>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-white/10 blur-lg pointer-events-none" />
      </div>

      {/* Quick Primary Actions */}
      <div className="grid grid-cols-4 gap-2.5">
        <button
          onClick={() => onNavigateTab('pay')}
          className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-amber-400 hover:bg-amber-50/50 transition-all active:scale-95"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Send className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800 mt-2">
            {(language === 'mr' ? 'पाठवा' : language === 'bn' ? 'পাঠান' : language === 'ta' ? 'அனுப்பு' : language === 'hi' ? 'भेजें' : 'Send')}
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('pay')}
          className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-400 hover:bg-teal-50/50 transition-all active:scale-95"
        >
          <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800 mt-2">
            {(language === 'mr' ? 'QR मिळवा' : language === 'bn' ? 'QR प्राप्त করুন' : language === 'ta' ? 'க்யூஆர் பெறு' : language === 'hi' ? 'क्यूआर' : 'Receive QR')}
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('save_borrow')}
          className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-400 hover:bg-indigo-50/50 transition-all active:scale-95"
        >
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <PiggyBank className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800 mt-2">
            {(language === 'mr' ? 'गोल जार' : language === 'bn' ? 'লক্ষ্য পাত্র' : language === 'ta' ? 'சேமிப்பு உண்டியல்' : language === 'hi' ? 'बचत गुल्लक' : 'Goal Jar')}
          </span>
        </button>

        <button
          onClick={onOpenScamShield}
          className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-rose-400 hover:bg-rose-50/50 transition-all active:scale-95"
        >
          <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800 mt-2">
            {(language === 'mr' ? 'स्कॅम शील्ड' : language === 'bn' ? 'স্ক্যাম শিল্ড' : language === 'ta' ? 'மோசடி தடுப்பு' : language === 'hi' ? 'फ्रॉड शील्ड' : 'Scam Shield')}
          </span>
        </button>
      </div>

      {/* Voice Assistant Callout Banner */}
      <div
        onClick={onOpenAssistant}
        className="rounded-2xl bg-gradient-to-r from-teal-800 via-teal-700 to-teal-900 p-4 text-white shadow-md cursor-pointer hover:shadow-lg transition-all border border-teal-600/40 relative overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-xl">
              👵🏽
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-white">
                  {(language === 'mr' ? 'लूमोपे दीदीला विचारा' : language === 'bn' ? 'সহায় দিদিকে জিজ্ঞাসা করুন' : language === 'ta' ? 'சஹாய் அக்காவிடம் கேள்' : language === 'hi' ? 'लूमोपे दीदी से बोलें' : 'Ask LumoPay Didi')}
                </span>
                <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded">
                  AI Voice
                </span>
              </div>
              <p className="text-xs text-teal-100 mt-0.5">
                {(language === 'mr' ? 'Speak freely about loans, savings, or check scams' : language === 'bn' ? 'Speak freely about loans, savings, or check scams' : language === 'ta' ? 'Speak freely about loans, savings, or check scams' : language === 'hi' ? 'लोन, बचत, या संदिग्ध फोन कॉल के बारे में बोलकर पूछें' : 'Speak freely about loans, savings, or check scams')}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-teal-200 flex-shrink-0" />
        </div>
      </div>

      {/* Weekly Cash Flow & Savings Goal */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold">
            <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
            <span>{(language === 'mr' ? 'साप्ताहिक कमाई' : language === 'bn' ? 'সাপ্তাহिक আয়' : language === 'ta' ? 'வாராந்திர வருமானம்' : language === 'hi' ? 'सप्ताहिक कमाई' : 'Weekly Earned')}</span>
          </div>
          <div className="text-xl font-extrabold text-emerald-900">
            ₹{persona.weeklyEarned.toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] text-emerald-700">UPI + Cash Sales</p>
        </div>

        <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-rose-800 text-xs font-bold">
            <ArrowUpRight className="w-4 h-4 text-rose-600" />
            <span>{(language === 'mr' ? 'साप्ताहिक खर्च' : language === 'bn' ? 'সাপ্তাহিক ব্যয়' : language === 'ta' ? 'வாராந்திர செலவு' : language === 'hi' ? 'सप्ताहिक खर्च' : 'Weekly Spent')}</span>
          </div>
          <div className="text-xl font-extrabold text-rose-900">
            ₹{persona.weeklySpent.toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] text-rose-700">Supplies & Fuel</p>
        </div>
      </div>

      {/* Goal Jar Progress */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <span className="font-bold text-slate-800 text-xs">{persona.goalName}</span>
          </div>
          <span className="text-xs font-black text-amber-600">
            ₹{persona.goalCurrent.toLocaleString()} / ₹{persona.goalTarget.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (persona.goalCurrent / persona.goalTarget) * 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>{Math.round((persona.goalCurrent / persona.goalTarget) * 100)}% पूरा हुआ</span>
          <span className="text-teal-700 font-bold">रोजाना ₹50 ऑटो-सेव</span>
        </div>
      </div>

      {/* Daily Fraud Prevention Tip */}
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-amber-950 text-xs">
              {(language === 'mr' ? 'महत्त्वाचा UPI सुरक्षा नियम' : language === 'bn' ? 'গুরুত্বপূর্ণ UPI নিরাপত্তা নিয়ম' : language === 'ta' ? 'முக்கியமான UPI பாதுகாப்பு விதி' : language === 'hi' ? 'सुरक्षा नियम (Safety Rule)' : 'Crucial UPI Safety Rule')}
            </h4>
            <button
              onClick={handleSpeakTip}
              className="text-amber-800 p-1 hover:bg-amber-100 rounded-full"
              title="Listen to tip"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-amber-900 mt-1 leading-relaxed">
            {(language === 'mr' ? 'Remember: You NEVER need to enter your PIN to receive money from a customer or anyone else.' : language === 'bn' ? 'Remember: You NEVER need to enter your PIN to receive money from a customer or anyone else.' : language === 'ta' ? 'Remember: You NEVER need to enter your PIN to receive money from a customer or anyone else.' : language === 'hi' ? 'याद रखें: ग्राहक या किसी भी व्यक्ति से पैसे प्राप्त करने के लिए कभी भी पिन (PIN) दर्ज नहीं करना होता है।' : 'Remember: You NEVER need to enter your PIN to receive money from a customer or anyone else.')}
          </p>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm">
            {(language === 'mr' ? 'अलीकडील व्यवहार' : language === 'bn' ? 'সাম্প্রতিক লেনদেন' : language === 'ta' ? 'சமீபத்திய பரிவர்த்தனைகள்' : language === 'hi' ? 'हाल का हिसाब-किताब' : 'Recent Transactions')}
          </h3>
          <span className="text-xs text-amber-700 font-bold cursor-pointer hover:underline">
            {(language === 'mr' ? 'सर्व पहा' : language === 'bn' ? 'সব দেখুন' : language === 'ta' ? 'அனைத்தையும் காண்க' : language === 'hi' ? 'सभी देखें' : 'View All')}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((tx) => (
            <div key={tx.id} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    tx.isCredit ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {tx.isCredit ? (
                    <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {(language === 'ta' ? tx.tamilTitle || tx.title : language === 'mr' ? tx.marathiTitle || tx.title : language === 'bn' ? tx.bengaliTitle || tx.title : language === 'hi' ? tx.hindiTitle : tx.title)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {tx.partyName} • {tx.time}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-sm font-black ${
                    tx.isCredit ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {tx.isCredit ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                </div>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                  {tx.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
