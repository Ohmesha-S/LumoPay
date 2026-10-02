// Web Speech API wrapper for Voice Synthesis and Voice Recognition with comprehensive error boundaries

export const speakText = (text: string, langCode: string = 'hi') => {
  try {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    window.speechSynthesis.cancel(); // Stop active utterance safely

    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    let targetLang = 'en-IN';
    if (langCode === 'hi') targetLang = 'hi-IN';
    if (langCode === 'ta') targetLang = 'ta-IN';
    if (langCode === 'mr') targetLang = 'mr-IN';
    if (langCode === 'bn') targetLang = 'bn-IN';

    // Pick best matching voice
    try {
      const voices = window.speechSynthesis.getVoices();
      
      const voice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes(targetLang.toLowerCase()) ||
          v.lang.toLowerCase().includes(langCode) ||
          v.lang.toLowerCase().includes('en')
      );
      if (voice) {
        utterance.voice = voice;
      }
    } catch (e) {
      // Voice lookup might fail in restricted sandbox, ignore safely
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.lang = targetLang;

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('speechSynthesis.speak caught safely:', err);
  }
};

export const stopSpeech = () => {
  try {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } catch (err) {
    console.warn('stopSpeech error:', err);
  }
};

export class SpeechInputService {
  private recognition: any = null;
  public isListening: boolean = false;
  public isSupported: boolean = false;

  constructor() {
    try {
      if (typeof window !== 'undefined') {
        const SpeechRecognitionClass =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognitionClass) {
          this.recognition = new SpeechRecognitionClass();
          this.recognition.continuous = false;
          this.recognition.interimResults = false;
          this.isSupported = true;
        }
      }
    } catch (e) {
      console.warn('SpeechRecognition initialization safely ignored:', e);
      this.recognition = null;
      this.isSupported = false;
    }
  }

  public start(
    onResult: (text: string) => void,
    onEnd: () => void,
    onError: (error: string) => void,
    lang: string = 'hi-IN'
  ) {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser. Please type your message.');
      onEnd();
      return;
    }

    try {
      this.recognition.lang = lang;
      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        try {
          const transcript = event.results?.[0]?.[0]?.transcript;
          if (transcript) onResult(transcript);
        } catch (e) {
          console.warn('Result parse error:', e);
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        onError(event?.error || 'Voice input error');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
    } catch (e: any) {
      console.warn('Recognition start caught safely:', e);
      this.isListening = false;
      onError('Unable to access microphone in preview frame.');
      onEnd();
    }
  }

  public stop() {
    try {
      if (this.recognition && this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      }
    } catch (e) {
      console.warn('Recognition stop error:', e);
    }
  }
}
