import React, { useState } from 'react';
import { Landmark, TrendingUp, Users, PiggyBank, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserPersona, AppLanguage } from '../types';

interface SaveBorrowScreenProps {
  persona: UserPersona;
  language: AppLanguage;
}

export const SaveBorrowScreen: React.FC<SaveBorrowScreenProps> = ({ persona, language }) => {
  const [loanAmount, setLoanAmount] = useState(10000);

  // Formal PM SVANidhi (7% annual) vs Informal Moneylender (10% monthly)
  const formalMonthlyInterest = (loanAmount * 0.07) / 12;
  const moneylenderMonthlyInterest = loanAmount * 0.10; // 10% per month
  const monthlySavings = moneylenderMonthlyInterest - formalMonthlyInterest;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="space-y-4 pb-20 pt-2">
      {/* Title */}
      <div>
        <h2 className="text-lg font-black text-slate-900">
          {(language === 'mr' ? 'बचत आणि कर्ज' : language === 'bn' ? 'সঞ্চয় ও ঋণ' : language === 'ta' ? 'சேமிப்பு & சிறு கடன்' : language === 'hi' ? 'बचत व सरकारी ऋण (Save & Borrow)' : 'Savings & Micro-Credit')}
        </h2>
        <p className="text-xs text-slate-500">
          {(language === 'mr' ? 'पीएम स्वनिधीसह 10% सावकारांपासून वाचा' : language === 'bn' ? 'পিএম স্বনিধির সাথে 10% মহাজন থেকে বাঁচুন' : language === 'ta' ? 'பிரதமர் ஸ்வநிதி மூலம் 10% வட்டிக்காரர்களிடம் இருந்து தப்பிக்கவும்' : language === 'hi' ? 'साहूकार के चंगुल से मुक्ति और डिजिटल गुल्लक' : 'Escape 10%/mo moneylenders with PM SVANidhi')}
        </p>
      </div>

      {/* Interactive Loan Reality Check Slider */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                {(language === 'mr' ? 'पीएम स्वनिधी कर्ज' : language === 'bn' ? 'পিএম স্বনিধি ঋণ' : language === 'ta' ? 'பிரதமர் ஸ்வநிதி கடன்' : language === 'hi' ? 'पीएम स्वनिधि लोन कैलकुलेटर' : 'PM SVANidhi Loan')}
              </h3>
              <p className="text-[11px] text-teal-700 font-semibold">
                {(language === 'mr' ? 'कोणत्याही हमीशिवाय (Zero Collateral)' : language === 'bn' ? 'কোনো গ্যারান্টি ছাড়াই (Zero Collateral)' : language === 'ta' ? 'எந்த உத்திரவாதமும் இல்லாமல் (Zero Collateral)' : language === 'hi' ? 'बिना किसी गारंटी के (Zero Collateral)' : 'Zero Collateral')}
              </p>
            </div>
          </div>
          <span className="text-xs font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            {(language === 'mr' ? '7% व्याज' : language === 'bn' ? '7% সুদ' : language === 'ta' ? '7% வட்டி' : language === 'hi' ? '7% ब्याज' : '7% Interest')}
          </span>
        </div>

        {/* Loan Amount Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              {(language === 'mr' ? 'कर्जाची रक्कम (Loan Needed):' : language === 'bn' ? 'ঋণের পরিমাণ (Loan Needed):' : language === 'ta' ? 'கடன் தொகை (Loan Needed):' : language === 'hi' ? 'ऋण राशि (Loan Needed):' : 'Loan Needed:')}
            </span>
            <span className="text-base font-black text-amber-600">₹{loanAmount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="5000"
            max="50000"
            step="1000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-amber-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>₹5,000</span>
            <span>₹25,000</span>
            <span>₹50,000</span>
          </div>
        </div>

        {/* Moneylender vs Bank Loan Reality Check */}
        <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-4 space-y-3">
          <div className="text-xs font-black text-slate-800">
            {(language === 'mr' ? 'तुलना:' : language === 'bn' ? 'তুলনা:' : language === 'ta' ? 'ஒப்பீடு:' : language === 'hi' ? 'ब्याज की सीधी तुलना (Interest Reality Check):' : 'Comparison:')}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white rounded-xl p-2.5 border border-slate-200 space-y-1">
              <span className="text-[10px] text-rose-700 font-bold block">
                {(language === 'mr' ? 'सावकार (10% दरमहा)' : language === 'bn' ? 'মহাজন (প্রতি মাসে 10%)' : language === 'ta' ? 'கந்து வட்டி (மாதம் 10%)' : language === 'hi' ? 'साहूकार (10% प्रति माह)' : 'Moneylender (10%/mo)')}
              </span>
              <span className="text-sm font-extrabold text-rose-600">
                {(language === 'mr' ? `₹${Math.round(moneylenderMonthlyInterest)}/महिना` : language === 'bn' ? `₹${Math.round(moneylenderMonthlyInterest)}/মাস` : language === 'ta' ? `₹${Math.round(moneylenderMonthlyInterest)}/மாதம்` : language === 'hi' ? `₹${Math.round(moneylenderMonthlyInterest)}/माह` : `₹${Math.round(moneylenderMonthlyInterest)}/mo`)}
              </span>
              <span className="text-[10px] text-slate-400 block">
                {(language === 'mr' ? `वार्षिक ₹${Math.round(moneylenderMonthlyInterest * 12)}` : language === 'bn' ? `বার্ষিক ₹${Math.round(moneylenderMonthlyInterest * 12)}` : language === 'ta' ? `ஆண்டுக்கு ₹${Math.round(moneylenderMonthlyInterest * 12)}` : language === 'hi' ? `वार्षिक ₹${Math.round(moneylenderMonthlyInterest * 12)}` : `Yearly ₹${Math.round(moneylenderMonthlyInterest * 12)}`)}
              </span>
            </div>

            <div className="bg-white rounded-xl p-2.5 border border-emerald-300 space-y-1">
              <span className="text-[10px] text-emerald-800 font-bold block">
                {(language === 'mr' ? 'पीएम स्वनिधी (7% वार्षिक)' : language === 'bn' ? 'পিএম স্বনিধি (7% বার্ষিক)' : language === 'ta' ? 'பிஎம் ஸ்வநிதி (7% ஆண்டு)' : language === 'hi' ? 'पीएम स्वनिधि (7% वार्षिक)' : 'PM SVANidhi (7% p.a.)')}
              </span>
              <span className="text-sm font-extrabold text-emerald-700">
                {(language === 'mr' ? `₹${Math.round(formalMonthlyInterest)}/महिना` : language === 'bn' ? `₹${Math.round(formalMonthlyInterest)}/মাস` : language === 'ta' ? `₹${Math.round(formalMonthlyInterest)}/மாதம்` : language === 'hi' ? `₹${Math.round(formalMonthlyInterest)}/माह` : `₹${Math.round(formalMonthlyInterest)}/mo`)}
              </span>
              <span className="text-[10px] text-slate-400 block">
                {(language === 'mr' ? `वार्षिक फक्त ₹${Math.round(formalMonthlyInterest * 12)}` : language === 'bn' ? `বার্ষিক মাত্র ₹${Math.round(formalMonthlyInterest * 12)}` : language === 'ta' ? `ஆண்டுக்கு ₹${Math.round(formalMonthlyInterest * 12)} மட்டுமே` : language === 'hi' ? `वार्षिक सिर्फ ₹${Math.round(formalMonthlyInterest * 12)}` : `Yearly only ₹${Math.round(formalMonthlyInterest * 12)}`)}
              </span>
            </div>
          </div>

          {/* Savings Highlight */}
          <div className="bg-emerald-600 text-white rounded-xl p-3 flex items-center justify-between text-xs font-bold shadow-xs">
            <span>
              {(language === 'mr' ? 'तुमची थेट बचत (Your Savings):' : language === 'bn' ? 'আপনার সরাসরি সঞ্চয় (Your Savings):' : language === 'ta' ? 'உங்கள் நேரடி சேமிப்பு (Your Savings):' : language === 'hi' ? 'आपकी सीधी बचत (Your Savings):' : 'Your Savings:')}
            </span>
            <span className="text-base font-black">
              {(language === 'mr' ? `₹${Math.round(yearlySavings).toLocaleString()} / वर्ष` : language === 'bn' ? `₹${Math.round(yearlySavings).toLocaleString()} / বছর` : language === 'ta' ? `₹${Math.round(yearlySavings).toLocaleString()} / ஆண்டு` : language === 'hi' ? `₹${Math.round(yearlySavings).toLocaleString()} / वर्ष` : `₹${Math.round(yearlySavings).toLocaleString()} / yr`)}
            </span>
          </div>
        </div>

        <button className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all active:scale-95">
          {(language === 'mr' ? 'CSC बँक मित्र द्वारे अर्ज करा' : language === 'bn' ? 'CSC ব্যাঙ্ক মিত্রের মাধ্যমে আবেদন করুন' : language === 'ta' ? 'CSC வங்கி மித்ரா மூலம் விண்ணப்பிக்கவும்' : language === 'hi' ? 'सीएससी / बैंक मित्र से आवेदन करें' : 'Apply via CSC Bank Mitra')}
        </button>
      </div>

      {/* SHG Community Chit Circles */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              {(language === 'mr' ? 'SHG चिट फंड सर्कल' : language === 'bn' ? 'SHG চিট ফান্ড সার্কেল' : language === 'ta' ? 'சுய உதவி குழு சீட்டு' : language === 'hi' ? 'महिला स्वयं सहायता समूह (SHG Circle)' : 'SHG Chit Fund Circle')}
            </h3>
            <p className="text-[11px] text-slate-500">12 सदस्यों का मासिक बचत गट</p>
          </div>
        </div>

        <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">मासिक योगदान:</span>
            <span className="font-bold text-teal-900">₹1,000 / सदस्य</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">कुल जमा राशि पूल:</span>
            <span className="font-bold text-teal-900">₹12,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">अगली किश्त तिथि:</span>
            <span className="font-bold text-amber-700">10 तारीख</span>
          </div>
        </div>
      </div>
    </div>
  );
};
