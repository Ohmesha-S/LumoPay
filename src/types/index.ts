export type AppLanguage = 'hi' | 'en' | 'mr' | 'bn' | 'ta';

export interface LanguageInfo {
  code: AppLanguage;
  name: string;
  nativeName: string;
}

export interface UserPersona {
  id: string;
  name: string;
  hindiName: string;
  tamilName?: string;
  marathiName?: string;
  bengaliName?: string;
  role: string;
  hindiRole: string;
  tamilRole?: string;
  marathiRole?: string;
  bengaliRole?: string;
  avatar: string;
  balance: number;
  upiId: string;
  trustScore: number;
  dailyTurnover: number;
  summary: string;
  hindiSummary: string;
  tamilSummary?: string;
  marathiSummary?: string;
  bengaliSummary?: string;
  goalName: string;
  goalTarget: number;
  goalCurrent: number;
  weeklyEarned: number;
  weeklySpent: number;
}

export interface Transaction {
  id: string;
  title: string;
  hindiTitle: string;
  tamilTitle?: string;
  marathiTitle?: string;
  bengaliTitle?: string;
  amount: number;
  isCredit: boolean;
  partyName: string;
  time: string;
  category: string;
}

export interface ScamAnalysisResult {
  riskLevel: 'HIGH_RISK' | 'SUSPICIOUS' | 'SAFE';
  confidenceScore: number;
  warningHindi: string;
  warningEnglish: string;
  warningTamil?: string;
  warningMarathi?: string;
  warningBengali?: string;
  redFlags: string[];
  recommendedAction: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type TabType = 'home' | 'pay' | 'save_borrow' | 'learn' | 'help';
