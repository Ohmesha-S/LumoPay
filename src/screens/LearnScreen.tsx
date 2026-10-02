import React from 'react';
import { GraduationCap, Volume2, CheckCircle2, PlayCircle } from 'lucide-react';
import { AppLanguage } from '../types';
import { speakText } from '../services/voiceService';

interface LearnScreenProps {
  language: AppLanguage;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({ language }) => {
  const LESSONS = [
    {
      id: 'l1',
      title: 'यूपीआई का स्वर्णिम नियम (Golden Rule of UPI)',
      subtitle: 'पैसे लेने के लिए कभी भी पिन नहीं लगता!',
      duration: '45 सेकंड',
      audioText:
        'ध्यान से सुनिए: जब भी कोई ग्राहक या व्यक्ति आपको पैसे भेजता है, तो आपको कोई भी पिन या पासवर्ड नहीं डालना होता है। पिन सिर्फ आपके खाते से पैसे कटने पर ही डाला जाता है। अगर कोई कहे कि पैसे लेने के लिए पिन दर्ज करो, तो वह 100% धोखेबाज है!',
    },
    {
      id: 'l2',
      title: 'बैंक एसएमएस पढ़ना सीखें (SMS Decoding)',
      subtitle: 'CREDITED मतलब पैसा आया, DEBITED मतलब पैसा कटा',
      duration: '60 सेकंड',
      audioText:
        'बैंक के एसएमएस में दो मुख्य शब्द होते हैं: अगर सी.आर. या क्रेडिटेड लिखा है, तो इसका मतलब आपके खाते में पैसे आ गए हैं। अगर डी.आर. या डेबिटेड लिखा है, तो इसका मतलब आपके खाते से पैसे कट गए हैं।',
    },
    {
      id: 'l3',
      title: 'साहूकार बनाम सरकारी लोन (Save on Interest)',
      subtitle: '10% प्रति माह ब्याज से परिवार कैसे बचाएं',
      duration: '60 सेकंड',
      audioText:
        'स्थानीय साहूकार 10 प्रतिशत मासिक ब्याज लेते हैं जो साल का 120 प्रतिशत बन जाता है। जबकि पीएम स्वनिधि योजना में सरकार सिर्फ 7 प्रतिशत वार्षिक ब्याज पर लोन देती है। समय पर चुकाने पर आपको सब्सिडी भी वापस मिलती है।',
    },
  ];

  return (
    <div className="space-y-4 pb-20 pt-2">
      <div>
        <h2 className="text-lg font-black text-slate-900">
          {(language === 'mr' ? 'आर्थिक साक्षरता' : language === 'bn' ? 'আর্থিক সাক্ষরতা' : language === 'ta' ? 'நிதி கல்வி' : language === 'hi' ? 'वित्तीय पाठशाला (Audio Lessons)' : 'Financial Literacy')}
        </h2>
        <p className="text-xs text-slate-500">
          {(language === 'mr' ? '60-सेकंद ऑडिओ धडे' : language === 'bn' ? '60-সেকেন্ডের অডিও পাঠ' : language === 'ta' ? '60 வினாடி ஆடியோ பாடங்கள்' : language === 'hi' ? '60 सेकंड के बोलकर सिखाने वाले पाठ' : '60-second bite-sized audio lessons')}
        </p>
      </div>

      <div className="space-y-3">
        {LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {lesson.duration}
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 mt-1.5">{lesson.title}</h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">{lesson.subtitle}</p>
              </div>

              <button
                onClick={() => speakText(lesson.audioText, language)}
                className="w-11 h-11 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center flex-shrink-0 shadow-md transition-all"
                title="Listen to lesson"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3 text-xs text-slate-700 leading-relaxed font-normal border border-slate-100">
              "{lesson.audioText}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
