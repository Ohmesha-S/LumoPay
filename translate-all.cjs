const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const dictionary = {
  // HomeScreen
  'Verified': { mr: 'सत्यापित', bn: 'যাচাইকৃত' },
  'Total Bank Balance': { mr: 'एकूण बँक शिल्लक', bn: 'মোট ব্যাঙ্ক ব্যালেন্স' },
  'Listen': { mr: 'ऐका', bn: 'শুনুন' },
  'Send': { mr: 'पाठवा', bn: 'পাঠান' },
  'Receive QR': { mr: 'QR मिळवा', bn: 'QR प्राप्त করুন' },
  'Goal Jar': { mr: 'गोल जार', bn: 'লক্ষ্য পাত্র' },
  'Scam Shield': { mr: 'स्कॅम शील्ड', bn: 'স্ক্যাম শিল্ড' },
  'Ask LumoPay Didi': { mr: 'लूमोपे दीदीला विचारा', bn: 'সহায় দিদিকে জিজ্ঞাসা করুন' },
  'Weekly Earned': { mr: 'साप्ताहिक कमाई', bn: 'সাপ্তাহिक আয়' },
  'Weekly Spent': { mr: 'साप्ताहिक खर्च', bn: 'সাপ্তাহিক ব্যয়' },
  'Crucial UPI Safety Rule': { mr: 'महत्त्वाचा UPI सुरक्षा नियम', bn: 'গুরুত্বপূর্ণ UPI নিরাপত্তা নিয়ম' },
  'Recent Transactions': { mr: 'अलीकडील व्यवहार', bn: 'সাম্প্রতিক লেনদেন' },
  'View All': { mr: 'सर्व पहा', bn: 'সব দেখুন' },
  'LumoPay Didi (Voice AI)': { mr: 'लूमोपे दीदी (Voice AI)', bn: 'সহায় দিদি (Voice AI)' },
  'Fraud Shield (Scam Shield)': { mr: 'फ्रॉड शील्ड (Scam Shield)', bn: 'ফ্রড শিল্ড (Scam Shield)' },

  // PayScreen
  'Payments Hub': { mr: 'पेमेंट हब', bn: 'পেমেন্ট হাব' },
  'UPI, QR Code & Feature Phone 123PAY': { mr: 'यूपीआय, क्यूआर आणि फीचर फोन 123PAY', bn: 'ইউপিআই, কিউআর এবং ফিচার ফোন 123PAY' },
  'Payment Successful!': { mr: 'पेमेंट यशस्वी!', bn: 'পেমেন্ট সফল!' },
  'Send to UPI ID or Mobile': { mr: 'UPI आयडी किंवा मोबाईलवर पाठवा', bn: 'UPI আইডি বা মোবাইলে পাঠান' },
  'Phone Number or UPI ID': { mr: 'फोन नंबर किंवा UPI आयडी', bn: 'ফোন নম্বর বা UPI আইডি' },
  'Amount (INR)': { mr: 'रक्कम (INR)', bn: 'পরিমাণ (INR)' },
  'Send Money': { mr: 'पैसे पाठवा', bn: 'টাকা পাঠান' },
  'My Merchant QR': { mr: 'माझा व्यापारी QR', bn: 'আমার মার্চেন্ট QR' },

  // SaveBorrow
  'Savings & Micro-Credit': { mr: 'बचत आणि कर्ज', bn: 'সঞ্চয় ও ঋণ' },
  'Escape 10%/mo moneylenders with PM SVANidhi': { mr: 'पीएम स्वनिधीसह 10% सावकारांपासून वाचा', bn: 'পিএম স্বনিধির সাথে 10% মহাজন থেকে বাঁচুন' },
  'PM SVANidhi Loan': { mr: 'पीएम स्वनिधी कर्ज', bn: 'পিএম স্বনিধি ঋণ' },
  'Comparison:': { mr: 'तुलना:', bn: 'তুলনা:' },
  'Apply via CSC Bank Mitra': { mr: 'CSC बँक मित्र द्वारे अर्ज करा', bn: 'CSC ব্যাঙ্ক মিত্রের মাধ্যমে আবেদন করুন' },
  'SHG Chit Fund Circle': { mr: 'SHG चिट फंड सर्कल', bn: 'SHG চিট ফান্ড সার্কেল' },

  // ScamShield
  'LumoPay Fraud Shield': { mr: 'लूमोपे फ्रॉड शील्ड', bn: 'সহায় ফ্রড শিল্ড' },
  'Verify with Gemini AI': { mr: 'जेमिनी AI सह पडताळा', bn: 'জেমিনি AI দিয়ে যাচাই করুন' },
  'Common Fraud Samples:': { mr: 'सामान्य फसवणूक नमुने:', bn: 'সাধারণ প্রতারণার নমুনা:' },

  // Learn
  'Financial Literacy': { mr: 'आर्थिक साक्षरता', bn: 'আর্থিক সাক্ষরতা' },
  '60-second bite-sized audio lessons': { mr: '60-सेकंद ऑडिओ धडे', bn: '60-সেকেন্ডের অডিও পাঠ' },
  'Financial Inclusion': { mr: 'आर्थिक समावेशन', bn: 'আর্থিক অন্তর্ভুক্তি' },

  // Onboarding
  'Who Are You?': { mr: 'तुम्ही कोण आहात?', bn: 'আপনি কে?' },
  'Select a persona to test tailored financial features': { mr: 'वैशिष्ट्ये तपासण्यासाठी व्यक्तिरेखा निवडा', bn: 'বৈশিষ্ট্যগুলি পরীক্ষা করার জন্য একটি পার্সোনা নির্বাচন করুন' },
  'Continue to Dashboard': { mr: 'डॅशबोर्डवर जा', bn: 'ড্যাশবোর্ডে যান' }
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Pattern: (language === 'ta' ? 'taStr' : language === 'hi' ? 'hiStr' : 'enStr')
  const strRegex = /\(language === 'ta' \? '([^']+)' : language === 'hi' \? '([^']+)' : '([^']+)'\)/g;
  content = content.replace(strRegex, (match, taStr, hiStr, enStr) => {
    changed = true;
    const mr = dictionary[enStr]?.mr || enStr;
    const bn = dictionary[enStr]?.bn || enStr;
    return `(language === 'mr' ? '${mr}' : language === 'bn' ? '${bn}' : language === 'ta' ? '${taStr}' : language === 'hi' ? '${hiStr}' : '${enStr}')`;
  });

  // Also replace Header manually modified:
  // {currentLanguage === 'ta' ? 'ta' : currentLanguage === 'hi' ? 'hi' : 'en'}
  const headerRegex = /currentLanguage === 'ta' \? '([^']+)' : currentLanguage === 'hi' \? '([^']+)' : '([^']+)'/g;
  content = content.replace(headerRegex, (match, taStr, hiStr, enStr) => {
    changed = true;
    const mr = dictionary[enStr]?.mr || enStr;
    const bn = dictionary[enStr]?.bn || enStr;
    return `currentLanguage === 'mr' ? '${mr}' : currentLanguage === 'bn' ? '${bn}' : currentLanguage === 'ta' ? '${taStr}' : currentLanguage === 'hi' ? '${hiStr}' : '${enStr}'`;
  });

  // Template literals
  const tplRegex = /\(language === 'ta' \? `([^`]+)` : language === 'hi' \? `([^`]+)` : `([^`]+)`\)/g;
  content = content.replace(tplRegex, (match, taStr, hiStr, enStr) => {
    changed = true;
    const mr = dictionary[enStr]?.mr || enStr;
    const bn = dictionary[enStr]?.bn || enStr;
    return `(language === 'mr' ? \`${mr}\` : language === 'bn' ? \`${bn}\` : language === 'ta' ? \`${taStr}\` : language === 'hi' ? \`${hiStr}\` : \`${enStr}\`)`;
  });

  // Persona properties
  const propPattern1 = /\(language === 'ta' \? ([a-zA-Z0-9_]+)\.tamil([a-zA-Z0-9_]+) \|\| ([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+) : language === 'hi' \? ([a-zA-Z0-9_]+)\.hindi([a-zA-Z0-9_]+) : ([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\)/g;
  content = content.replace(propPattern1, (match, obj1, prop1, obj2, prop2, obj3, prop3, obj4, prop4) => {
    changed = true;
    return `(language === 'mr' ? ${obj2}.marathi${prop1} || ${obj2}.${prop2} : language === 'bn' ? ${obj2}.bengali${prop1} || ${obj2}.${prop2} : language === 'ta' ? ${obj2}.tamil${prop1} || ${obj2}.${prop2} : language === 'hi' ? ${obj3}.hindi${prop3} : ${obj4}.${prop4})`;
  });

  // tx properties
  const propPattern2 = /\(language === 'ta' \? tx\.tamilTitle \|\| tx\.title : language === 'hi' \? tx\.hindiTitle : tx\.title\)/g;
  content = content.replace(propPattern2, (match) => {
    changed = true;
    return `(language === 'mr' ? tx.marathiTitle || tx.title : language === 'bn' ? tx.bengaliTitle || tx.title : language === 'ta' ? tx.tamilTitle || tx.title : language === 'hi' ? tx.hindiTitle : tx.title)`;
  });

  // Scam result warnings
  const propPattern3 = /\(language === 'ta' \? result\.warningTamil \|\| result\.warningEnglish : language === 'hi' \? result\.warningHindi : result\.warningEnglish\)/g;
  content = content.replace(propPattern3, (match) => {
    changed = true;
    return `(language === 'mr' ? result.warningMarathi || result.warningEnglish : language === 'bn' ? result.warningBengali || result.warningEnglish : language === 'ta' ? result.warningTamil || result.warningEnglish : language === 'hi' ? result.warningHindi : result.warningEnglish)`;
  });
  
  // App.tsx hardcoded that I missed initially
  const appVoiceRegex = /\{currentLanguage === 'ta' \? '([^']+)' : currentLanguage === 'hi' \? '([^']+)' : '([^']+)'\}/g;
  content = content.replace(appVoiceRegex, (match, taStr, hiStr, enStr) => {
    changed = true;
    const mr = dictionary[enStr]?.mr || enStr;
    const bn = dictionary[enStr]?.bn || enStr;
    return `{currentLanguage === 'mr' ? '${mr}' : currentLanguage === 'bn' ? '${bn}' : currentLanguage === 'ta' ? '${taStr}' : currentLanguage === 'hi' ? '${hiStr}' : '${enStr}'}`;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walk(directoryPath);
console.log('Done mapping all languages.');
