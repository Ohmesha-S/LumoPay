import { ScamAnalysisResult } from '../types';

const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

export async function analyzeScamWithGemini(
  content: string,
  userLanguage: string = 'hi'
): Promise<ScamAnalysisResult> {
  // If API key is configured, invoke Gemini API directly
  if (GEMINI_API_KEY && GEMINI_API_KEY.length > 5) {
    try {
      const prompt = `You are LumoPay Fraud Shield, an AI security expert protecting underserved rural and street vendors in India from financial scams and UPI frauds.
Analyze this message or transaction request:
"${content}"

Provide output in JSON format with exactly these keys:
{
  "riskLevel": "HIGH_RISK" or "SUSPICIOUS" or "SAFE",
  "confidenceScore": number between 1 and 100,
  "warningHindi": "Direct, empathetic warning in simple Hindi that a street vendor can understand easily without complex jargon",
  "warningEnglish": "Clear plain explanation in English",
  "warningTamil": "Same warning in simple spoken Tamil",
  "warningMarathi": "Same warning in simple spoken Marathi",
  "warningBengali": "Same warning in simple spoken Bengali",
  "redFlags": ["point 1", "point 2"],
  "recommendedAction": "Actionable advice in simple words (e.g. Do not enter PIN, Call 1930)"
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanText);
          return {
            riskLevel: parsed.riskLevel || 'HIGH_RISK',
            confidenceScore: parsed.confidenceScore || 95,
            warningHindi: parsed.warningHindi || 'सावधान! यह धोखाधड़ी का संदेश लगता है। किसी भी लिंक पर क्लिक न करें।',
            warningEnglish: parsed.warningEnglish || 'Warning! This looks like a scam attempt.',
            warningTamil: parsed.warningTamil,
            warningMarathi: parsed.warningMarathi,
            warningBengali: parsed.warningBengali,
            redFlags: parsed.redFlags || ['Unverified sender', 'Demanding money or PIN'],
            recommendedAction: parsed.recommendedAction || 'Do not click or enter PIN. Block sender.'
          };
        }
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to smart local analyzer', e);
    }
  }

  // Smart Offline/Built-in financial scam detection rules (protecting against common Indian fraud patterns)
  await new Promise(r => setTimeout(r, 600)); // natural micro-delay

  const lower = content.toLowerCase();
  const isPinDemand = lower.includes('pin') || lower.includes('पिन') || lower.includes('enter pin');
  const isLottery = lower.includes('kbc') || lower.includes('lottery') || lower.includes('won') || lower.includes('25,00,000') || lower.includes('लॉटरी');
  const isElectricity = lower.includes('electricity') || lower.includes('power') || lower.includes('bill') || lower.includes('बिजली') || lower.includes('disconnected');
  const isUrgentLink = lower.includes('bit.ly') || lower.includes('apk') || lower.includes('click') || lower.includes('immediately');

  if (isPinDemand) {
    return {
      riskLevel: 'HIGH_RISK',
      confidenceScore: 99,
      warningHindi: 'खतरा! पैसे प्राप्त करने के लिए कभी भी यूपीआई पिन (PIN) नहीं डाला जाता। यह 100% बैंक खाता खाली करने की ठगी है!',
      warningEnglish: 'DANGER! You NEVER need to enter your UPI PIN to receive money. This is an attempt to drain your account!',
      redFlags: [
        'पैसे लेने के बहाने पिन (UPI PIN) मांगा जा रहा है',
        'फर्जी रिवर्स पेमेंट लिंक भेजा गया है',
        'धमकी या जल्दबाजी पैदा की जा रही है'
      ],
      recommendedAction: 'तुरंत इस व्यक्ति को ब्लॉक करें। कभी भी पिन न डालें। हेल्पलाइन 1930 पर शिकायत करें।'
    };
  }

  if (isLottery) {
    return {
      riskLevel: 'HIGH_RISK',
      confidenceScore: 98,
      warningHindi: 'सावधान! फर्जी लॉटरी/केबीसी का झांसा है। कोई भी सरकारी संस्था या बैंक पुरस्कार देने के लिए एडवांस फीस नहीं मांगता।',
      warningEnglish: 'FRAUD ALERT! Fake lottery scheme. Genuine prizes never ask for advance processing fees.',
      redFlags: [
        'अनजानी लॉटरी में लाखों रुपये जीतने का लालच',
        'प्रोसेसिंग फीस या टैक्स के नाम पर पैसे की मांग',
        'असुरक्षित संदिग्ध लिंक (bit.ly)'
      ],
      recommendedAction: 'कोई भी रुपया ट्रांसफर न करें। इस नंबर को तुरंत ब्लॉक करें।'
    };
  }

  if (isElectricity) {
    return {
      riskLevel: 'HIGH_RISK',
      confidenceScore: 96,
      warningHindi: 'सावधान! बिजली विभाग कभी भी किसी व्यक्तिगत मोबाइल नंबर से बिजली काटने की धमकी या एपीके (APK) डाउनलोड करने को नहीं कहता।',
      warningEnglish: 'High Risk! Electricity board never threatens immediate disconnection via personal mobile numbers or suspicious APKs.',
      redFlags: [
        'निजी मोबाइल नंबर से बिजली काटने की धमकी',
        'अज्ञात ऐप या एपीके (APK) डाउनलोड करने का दबाव',
        'जल्दबाजी और रात 9:30 बजे की समयसीमा'
      ],
      recommendedAction: 'दिए गए नंबर पर कॉल न करें। अपने बिजली दफ्तर के आधिकारिक काउंटर पर ही पता करें।'
    };
  }

  if (isUrgentLink) {
    return {
      riskLevel: 'SUSPICIOUS',
      confidenceScore: 85,
      warningHindi: 'संदेहास्पद संदेश! इस संदेश में अज्ञात शॉर्ट लिंक या ऐप है। इसे खोलने पर आपका फोन हैक हो सकता है।',
      warningEnglish: 'Suspicious! Contains unverified short links or unknown application download requests.',
      redFlags: ['अज्ञात स्रोत से आया लिंक', 'अत्यधिक जल्दबाजी की भाषा'],
      recommendedAction: 'लिंक पर क्लिक न करें। केवल बैंक की आधिकारिक ऐप का इस्तेमाल करें।'
    };
  }

  return {
    riskLevel: 'SAFE',
    confidenceScore: 90,
    warningHindi: 'यह संदेश सामान्य प्रतीत होता है। इसमें कोई तत्काल यूपीआई पिन या संदिग्ध लिंक नहीं मिला है।',
    warningEnglish: 'This message appears normal. No obvious financial scam patterns detected.',
    redFlags: [],
    recommendedAction: 'हमेशा सतर्क रहें। अपना गुप्त ओटीपी या बैंक पासवर्ड किसी को न बताएं।'
  };
}

export async function askLumoPayAssistant(
  question: string,
  userPersonaName: string,
  userLanguage: string = 'hi'
): Promise<string> {
  if (GEMINI_API_KEY && GEMINI_API_KEY.length > 5) {
    try {
      const languageMap: Record<string, string> = {
        hi: 'Hindi (simple, warm spoken Hindi with clear financial terms)',
        ta: 'Tamil (simple, warm spoken Tamil)',
        mr: 'Marathi (simple, warm spoken Marathi)',
        bn: 'Bengali (simple, warm spoken Bengali)',
        en: 'English (simple, clear English)'
      };
      const langRequested = languageMap[userLanguage] || 'English';

      const prompt = `You are LumoPay Didi (लूमोपे दीदी), a caring, wise, and trusted financial advisor for underserved Indian micro-entrepreneurs, street vendors, delivery riders, and rural women.
Speaking to: ${userPersonaName}
Language requested: ${langRequested}
User Question: "${question}"

Provide practical, simple, direct guidance in 2-3 sentences. Focus on government schemes (PM SVANidhi, Mudra, Jan Dhan), escaping 10%/mo informal moneylenders, SHG savings, and avoiding UPI PIN frauds. MUST respond strictly in the requested language.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      }
    } catch (e) {
      console.warn('Gemini chat failed, fallback to local knowledge', e);
    }
  }

  // Realistic built-in financial intelligence
  await new Promise(r => setTimeout(r, 500));

  const q = question.toLowerCase();
  if (q.includes('pin') || q.includes('पिन') || q.includes('पैसे लेने')) {
    return 'याद रखिए, किसी से भी पैसे लेने (क्रेडिट) के लिए कभी भी यूपीआई पिन दर्ज नहीं करना होता है! पिन केवल आपके खाते से पैसे कटने (डेबिट) पर ही डाला जाता है। अगर कोई पैसे देने के लिए पिन मांगे, तो तुरंत मना कर दें।';
  }
  if (q.includes('loan') || q.includes('लोन') || q.includes('svanidhi') || q.includes('स्वनिधि')) {
    return 'रेहड़ी-पटरी और छोटे व्यापारियों के लिए पीएम स्वनिधि योजना में बिना गारंटी ₹10,000 का सस्ता लोन मिलता है, जिस पर 7% ब्याज सब्सिडी मिलती है। साहूकार के 10% मासिक ब्याज से बचने के लिए नजदीकी बैंक या सीएससी (CSC) केंद्र पर आधार कार्ड ले जाएं।';
  }
  if (q.includes('shg') || q.includes('समूह') || q.includes('बचत') || q.includes('chit')) {
    return 'महिला स्वयं लूमोपेता समूह (SHG) में हर महीने थोड़ी-थोड़ी बचत करने से आपातकाल में बहुत कम ब्याज (1-2% वार्षिक) पर लोन मिल जाता है। यह साहूकारों से परिवार को बचाने का सबसे सुरक्षित तरीका है।';
  }

  return 'नमस्ते! मैं लूमोपे दीदी हूँ। आप मुझसे सरकारी लोन (पीएम स्वनिधि, मुद्रा), बैंक खाता, यूपीआई सुरक्षा या बचत योजनाओं के बारे में कभी भी अपनी भाषा में पूछ सकते हैं।';
}
