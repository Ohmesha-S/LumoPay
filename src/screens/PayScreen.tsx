import React, { useState } from 'react';
import { Send, QrCode, Phone, CheckCircle2, AlertCircle, Smartphone } from 'lucide-react';
import { UserPersona, AppLanguage } from '../types';
import { speakText } from '../services/voiceService';

interface PayScreenProps {
  persona: UserPersona;
  language: AppLanguage;
}

export const PayScreen: React.FC<PayScreenProps> = ({ persona, language }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showKeypad123, setShowKeypad123] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    setPaymentSuccess(true);
    const text =
      (language === 'mr' ? `Successfully paid Rupees ${amount} to ${recipient || 'merchant'}.` : language === 'bn' ? `Successfully paid Rupees ${amount} to ${recipient || 'merchant'}.` : language === 'ta' ? `Successfully paid Rupees ${amount} to ${recipient || 'merchant'}.` : language === 'hi' ? `₹${amount} रुपये ${recipient || 'व्यापारी'} को सफलतापूर्वक भेजे गए।` : `Successfully paid Rupees ${amount} to ${recipient || 'merchant'}.`);
    speakText(text, language);

    setTimeout(() => {
      setPaymentSuccess(false);
      setRecipient('');
      setAmount('');
    }, 4000);
  };

  return (
    <div className="space-y-4 pb-20 pt-2">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            {(language === 'mr' ? 'पेमेंट हब' : language === 'bn' ? 'পেমেন্ট হাব' : language === 'ta' ? 'பணம் செலுத்தும் மையம்' : language === 'hi' ? 'भुगतान केंद्र (Payments)' : 'Payments Hub')}
          </h2>
          <p className="text-xs text-slate-500">
            {(language === 'mr' ? 'यूपीआय, क्यूआर आणि फीचर फोन 123PAY' : language === 'bn' ? 'ইউপিআই, কিউআর এবং ফিচার ফোন 123PAY' : language === 'ta' ? 'யுபிஐ, கியூஆர் மற்றும் பீச்சர் போன் 123PAY' : language === 'hi' ? 'यूपीआई, क्यूआर व फीचर फोन 123PAY' : 'UPI, QR Code & Feature Phone 123PAY')}
          </p>
        </div>

        <button
          onClick={() => setShowKeypad123(!showKeypad123)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
            showKeypad123
              ? 'bg-amber-600 text-white border-amber-600'
              : 'bg-white text-slate-700 border-slate-300'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>
            {(language === 'mr' ? '123PAY इंटरनेटशिवाय' : language === 'bn' ? '123PAY ইন্টারনেট ছাড়া' : language === 'ta' ? '123PAY இணையம் இல்லாமல்' : language === 'hi' ? '123PAY बिना इंटरनेट' : '123PAY without internet')}
          </span>
        </button>
      </div>

      {paymentSuccess && (
        <div className="rounded-2xl bg-emerald-500 text-white p-4 shadow-lg flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
          <div>
            <h4 className="font-extrabold text-sm">
              {(language === 'mr' ? 'पेमेंट यशस्वी!' : language === 'bn' ? 'পেমেন্ট সফল!' : language === 'ta' ? 'பணம் செலுத்துதல் வெற்றி!' : language === 'hi' ? 'भुगतान सफल! (Payment Successful)' : 'Payment Successful!')}
            </h4>
            <p className="text-xs text-emerald-100">
              {(language === 'mr' ? `₹${amount} ${recipient || 'Merchant'} ला हस्तांतरित केले गेले.` : language === 'bn' ? `₹${amount} ${recipient || 'Merchant'}-কে স্থানান্তরিত করা হয়েছে।` : language === 'ta' ? `₹${amount} ${recipient || 'Merchant'} க்கு மாற்றப்பட்டது.` : language === 'hi' ? `₹${amount} ${recipient || 'Merchant'} को हस्तांतरित कर दिए गए।` : `₹${amount} transferred to ${recipient || 'Merchant'}.`)}
            </p>
          </div>
        </div>
      )}

      {showKeypad123 ? (
        /* Feature Phone 123PAY Interactive Keypad Simulator */
        <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-amber-400">NPCI 123PAY SIMULATOR</span>
              <h3 className="text-sm font-bold">
                {(language === 'mr' ? 'इंटरनेटशिवाय फीचर फोन कॉलिंग' : language === 'bn' ? 'ইন্টারনেট ছাড়াই ফিচার ফোন কলিং' : language === 'ta' ? 'இணையம் இல்லாமல் அம்சம் தொலைபேசி அழைப்பு' : language === 'hi' ? 'बिना इंटरनेट फीचर फोन कॉलिंग' : 'Offline Feature Phone Calling')}
              </h3>
            </div>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              IVR *99#
            </span>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-4 text-center font-mono space-y-1">
            <p className="text-xs text-slate-400">
              {(language === 'mr' ? 'डायल करा (Dial without smartphone):' : language === 'bn' ? 'ডায়াল করুন (Dial without smartphone):' : language === 'ta' ? 'அழைக்கவும் (Dial without smartphone):' : language === 'hi' ? 'डायल करें (Dial without smartphone):' : 'Dial without smartphone:')}
            </p>
            <p className="text-xl font-bold text-amber-400 tracking-wider">080 4516 3666</p>
            <p className="text-[11px] text-emerald-400">
              {(language === 'mr' ? 'भाषा निवडा > बँक निवडा > पे करा' : language === 'bn' ? 'ভাষা নির্বাচন করুন > ব্যাঙ্ক নির্বাচন করুন > পে করুন' : language === 'ta' ? 'மொழி தேர்ந்தெடு > வங்கி தேர்ந்தெடு > பணம் செலுத்து' : language === 'hi' ? 'भाषा चुनें > बैंक चुनें > भुगतान करें' : 'Select Language > Select Bank > Pay')}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
              <button
                key={k}
                onClick={() =>
                  speakText((language === 'mr' ? `Button ${k}` : language === 'bn' ? `Button ${k}` : language === 'ta' ? `Button ${k}` : language === 'hi' ? `बटन ${k}` : `Button ${k}`), language)
                }
                className="py-3 bg-slate-800 hover:bg-slate-700 active:bg-amber-600 rounded-xl text-base font-bold text-center shadow-inner"
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Send Money Form */
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">
            {(language === 'mr' ? 'UPI आयडी किंवा मोबाईलवर पाठवा' : language === 'bn' ? 'UPI আইডি বা মোবাইলে পাঠান' : language === 'ta' ? 'UPI ஐடி அல்லது மொபைலுக்கு அனுப்பு' : language === 'hi' ? 'सीधा भुगतान करें (Direct Send)' : 'Send to UPI ID or Mobile')}
          </h3>

          <form onSubmit={handlePay} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {(language === 'mr' ? 'फोन नंबर किंवा UPI आयडी' : language === 'bn' ? 'ফোন নম্বর বা UPI আইডি' : language === 'ta' ? 'தொலைபேசி எண் அல்லது UPI ஐடி' : language === 'hi' ? 'फोन नंबर या यूपीआई आईडी' : 'Phone Number or UPI ID')}
              </label>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="9876543210 or user@lumopay"
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {(language === 'mr' ? 'रक्कम (INR)' : language === 'bn' ? 'পরিমাণ (INR)' : language === 'ta' ? 'தொகை (INR)' : language === 'hi' ? 'राशि (रुपये में)' : 'Amount (INR)')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  max="100000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="500"
                  className="w-full rounded-xl border border-slate-200 pl-7 p-2.5 text-sm font-bold focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{(language === 'mr' ? 'पैसे पाठवा' : language === 'bn' ? 'টাকা পাঠান' : language === 'ta' ? 'பணம் அனுப்பு' : language === 'hi' ? 'पैसे भेजें (Pay Securely)' : 'Send Money')}</span>
            </button>
          </form>
        </div>
      )}

      {/* Receive QR Section */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">
          {(language === 'mr' ? 'माझा व्यापारी QR' : language === 'bn' ? 'আমার মার্চেন্ট QR' : language === 'ta' ? 'எனது வியாபாரி QR' : language === 'hi' ? 'दुकान का क्यूआर कोड (Receive Payment)' : 'My Merchant QR')}
        </h3>
        <div className="mx-auto w-40 h-40 bg-slate-50 border-2 border-dashed border-amber-300 rounded-2xl flex flex-col items-center justify-center p-2 relative shadow-inner">
          <QrCode className="w-24 h-24 text-slate-800" />
          <span className="text-[10px] font-bold text-slate-600 mt-1 font-mono">
            {persona.upiId}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          {(language === 'mr' ? 'ग्राहक हा कोड स्कॅन करून थेट तुमच्या खात्यात पैसे पाठवू शकतात.' : language === 'bn' ? 'গ্রাহকরা এই কোড স্ক্যান করে সরাসরি আপনার অ্যাকাউন্টে টাকা পাঠাতে পারেন।' : language === 'ta' ? 'வாடிக்கையாளர்கள் இந்தக் குறியீட்டை ஸ்கேன் செய்து நேரடியாக உங்கள் கணக்கிற்கு பணம் அனுப்பலாம்.' : language === 'hi' ? 'ग्राहक इस कोड को स्कैन करके सीधे आपके खाते में पैसे भेज सकते हैं।' : 'Customers can scan this code to send money directly to your account.')}
        </p>
      </div>
    </div>
  );
};
