import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { UserPersona, AppLanguage, ChatMessage } from '../types';
import { askLumoPayAssistant } from '../services/geminiService';
import { speakText, SpeechInputService } from '../services/voiceService';

interface AssistantScreenProps {
  persona: UserPersona;
  language: AppLanguage;
}

export const AssistantScreen: React.FC<AssistantScreenProps> = ({ persona, language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        (language === 'mr' ? `Hello ${persona.name}! I am LumoPay Didi, your financial guide. Feel free to speak or type any questions about loans, savings, or UPI safety.` : language === 'bn' ? `Hello ${persona.name}! I am LumoPay Didi, your financial guide. Feel free to speak or type any questions about loans, savings, or UPI safety.` : language === 'ta' ? `Hello ${persona.name}! I am LumoPay Didi, your financial guide. Feel free to speak or type any questions about loans, savings, or UPI safety.` : language === 'hi' ? `राम-राम ${persona.name}! मैं लूमोपे दीदी हूँ। आप मुझसे सरकारी योजनाओं (पीएम स्वनिधि), बचत, यूपीआई सुरक्षा या किसी भी बैंक समस्या के बारे में बोलकर या लिखकर पूछ सकते हैं।` : `Hello ${persona.name}! I am LumoPay Didi, your financial guide. Feel free to speak or type any questions about loans, savings, or UPI safety.`),
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const speechServiceRef = useRef<SpeechInputService | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    speechServiceRef.current = new SpeechInputService();
    return () => {
      speechServiceRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customQuery?: string) => {
    const query = customQuery || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const answer = await askLumoPayAssistant(query, persona.name, language);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: answer,
        timestamp: 'Now',
      };
      setMessages((prev) => [...prev, assistantMsg]);
      // Speak the answer aloud
      speakText(answer, language);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      speechServiceRef.current?.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechServiceRef.current?.start(
        (transcript) => {
          setIsListening(false);
          setInputText(transcript);
          handleSend(transcript);
        },
        () => setIsListening(false),
        (err) => {
          setIsListening(false);
          console.warn(err);
        },
        (language === 'mr' ? 'mr-IN' : language === 'bn' ? 'bn-IN' : language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN')
      );
    }
  };

  const QUICK_QUESTIONS = [
    {
      hi: 'क्या पैसे लेने के लिए यूपीआई पिन डालना होता है?',
      en: 'Do I need UPI PIN to receive money?',
    },
    {
      hi: 'पीएम स्वनिधि ₹10,000 लोन कैसे मिलेगा?',
      en: 'How to apply for PM SVANidhi ₹10,000 loan?',
    },
    {
      hi: 'महिला स्वयं लूमोपेता समूह (SHG) के क्या फायदे हैं?',
      en: 'What are the benefits of SHG circles?',
    },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] pt-1 pb-4">
      {/* Top Didi Info Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-2xs">
            👵🏽
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm text-slate-900">
                {(language === 'mr' ? 'LumoPay Didi AI' : language === 'bn' ? 'LumoPay Didi AI' : language === 'ta' ? 'LumoPay Didi AI' : language === 'hi' ? 'लूमोपे दीदी (LumoPay Didi)' : 'LumoPay Didi AI')}
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-teal-700 font-semibold">
              {(language === 'mr' ? 'Voice Companion • Always Ready' : language === 'bn' ? 'Voice Companion • Always Ready' : language === 'ta' ? 'Voice Companion • Always Ready' : language === 'hi' ? 'आवाज से पूछें • सदैव उपलब्ध' : 'Voice Companion • Always Ready')}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            speakText(
              (language === 'mr' ? 'Hello! I am LumoPay Didi. You can press the mic button below to ask any financial question.' : language === 'bn' ? 'Hello! I am LumoPay Didi. You can press the mic button below to ask any financial question.' : language === 'ta' ? 'Hello! I am LumoPay Didi. You can press the mic button below to ask any financial question.' : language === 'hi' ? 'नमस्ते! मैं लूमोपे दीदी हूँ। आप नीचे माइक दबाकर अपनी आवाज में कोई भी सवाल पूछ सकते हैं।' : 'Hello! I am LumoPay Didi. You can press the mic button below to ask any financial question.'),
              language
            )
          }
          className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
          title="Intro Voice"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Scrollable Box */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs flex-shrink-0 ${
                  isUser
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-teal-700 text-white font-bold text-sm'
                }`}
              >
                {isUser ? persona.avatar : '👵🏽'}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs relative ${
                  isUser
                    ? 'bg-amber-600 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-xs'
                }`}
              >
                <p className="font-medium whitespace-pre-wrap">{m.text}</p>
                {!isUser && (
                  <button
                    onClick={() => speakText(m.text, language)}
                    className="mt-2 flex items-center gap-1 text-[10px] font-bold text-teal-700 hover:text-teal-900 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 w-fit"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>बोलकर सुनें</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs italic pl-9">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
            <span>दीदी सोच रही हैं (Thinking)...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Question Pills */}
      <div className="py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-shrink-0">
        {QUICK_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(language === 'hi' ? q.hi : q.en)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-all flex-shrink-0"
          >
            {language === 'hi' ? q.hi : q.en}
          </button>
        ))}
      </div>

      {/* Input Bar with Voice Listening Pulse */}
      <div className="relative pt-1 flex-shrink-0">
        {isListening && (
          <div className="absolute -top-12 left-0 right-0 mx-auto w-fit px-4 py-1.5 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg animate-bounce">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span>दीदी आपकी आवाज सुन रही हैं... (Listening)</span>
          </div>
        )}

        <div className="flex items-center gap-2 bg-white rounded-2xl border border-slate-300 p-1.5 shadow-sm">
          {/* Voice Input Mic Button */}
          <button
            onClick={toggleVoiceInput}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-md ring-4 ring-rose-200'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs active:scale-95'
            }`}
            title="Speak Question"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              (language === 'mr' ? 'Tap mic to speak or type here...' : language === 'bn' ? 'Tap mic to speak or type here...' : language === 'ta' ? 'Tap mic to speak or type here...' : language === 'hi' ? 'माइक दबाकर बोलें या यहाँ लिखें...' : 'Tap mic to speak or type here...')
            }
            className="flex-1 text-xs px-2 py-2 text-slate-800 placeholder-slate-400 focus:outline-none"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 disabled:opacity-40 flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
