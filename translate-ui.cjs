const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const dictionary = {
  // HomeScreen
  'Verified': 'சரிபார்க்கப்பட்டது',
  'Total Bank Balance': 'மொத்த வங்கி இருப்பு',
  'Listen': 'கேட்க',
  'Send': 'அனுப்பு',
  'Receive QR': 'க்யூஆர் பெறு',
  'Goal Jar': 'சேமிப்பு உண்டியல்',
  'Scam Shield': 'மோசடி தடுப்பு',
  'Ask LumoPay Didi': 'சஹாய் அக்காவிடம் கேள்',
  'Weekly Earned': 'வாராந்திர வருமானம்',
  'Weekly Spent': 'வாராந்திர செலவு',
  'Crucial UPI Safety Rule': 'முக்கியமான UPI பாதுகாப்பு விதி',
  'Recent Transactions': 'சமீபத்திய பரிவர்த்தனைகள்',
  'View All': 'அனைத்தையும் காண்க',
  
  // PayScreen
  'Payments Hub': 'பணம் செலுத்தும் மையம்',
  'UPI, QR Code & Feature Phone 123PAY': 'யுபிஐ, கியூஆர் மற்றும் பீச்சர் போன் 123PAY',
  'Payment Successful!': 'பணம் செலுத்துதல் வெற்றி!',
  'Send to UPI ID or Mobile': 'UPI ஐடி அல்லது மொபைலுக்கு அனுப்பு',
  'Phone Number or UPI ID': 'தொலைபேசி எண் அல்லது UPI ஐடி',
  'Amount (INR)': 'தொகை (INR)',
  'Send Money': 'பணம் அனுப்பு',
  'My Merchant QR': 'எனது வியாபாரி QR',

  // SaveBorrow
  'Savings & Micro-Credit': 'சேமிப்பு & சிறு கடன்',
  'Escape 10%/mo moneylenders with PM SVANidhi': 'பிரதமர் ஸ்வநிதி மூலம் 10% வட்டிக்காரர்களிடம் இருந்து தப்பிக்கவும்',
  'PM SVANidhi Loan': 'பிரதமர் ஸ்வநிதி கடன்',
  'Comparison:': 'ஒப்பீடு:',
  'Apply via CSC Bank Mitra': 'CSC வங்கி மித்ரா மூலம் விண்ணப்பிக்கவும்',
  'SHG Chit Fund Circle': 'சுய உதவி குழு சீட்டு',

  // ScamShield
  'LumoPay Fraud Shield': 'சஹாய் மோசடி தடுப்பு',
  'Verify with Gemini AI': 'ஜெமினி AI உடன் சரிபார்க்கவும்',
  'Common Fraud Samples:': 'பொதுவான மோசடி உதாரணங்கள்:',

  // Learn
  'Financial Literacy': 'நிதி கல்வி',
  '60-second bite-sized audio lessons': '60 வினாடி ஆடியோ பாடங்கள்'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace simple string literals
  // Pattern: language === 'hi' ? 'Hindi' : 'English'
  const stringPattern = /language\s*===\s*'hi'\s*\?\s*'([^']+)'\s*:\s*'([^']+)'/g;
  content = content.replace(stringPattern, (match, hindi, english) => {
    changed = true;
    const tamil = dictionary[english] || english;
    return `(language === 'ta' ? '${tamil}' : language === 'hi' ? '${hindi}' : '${english}')`;
  });

  // Replace template literals with single quotes inside
  const tplPattern = /language\s*===\s*'hi'\s*\?\s*`([^`]+)`\s*:\s*`([^`]+)`/g;
  content = content.replace(tplPattern, (match, hindi, english) => {
    changed = true;
    const tamil = dictionary[english] || english;
    return `(language === 'ta' ? \`${tamil}\` : language === 'hi' ? \`${hindi}\` : \`${english}\`)`;
  });

  // Replace variable properties: persona.hindiName : persona.name
  const propPattern1 = /language\s*===\s*'hi'\s*\?\s*([a-zA-Z0-9_]+)\.hindi([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)/g;
  content = content.replace(propPattern1, (match, obj1, prop1, obj2, prop2) => {
    changed = true;
    return `(language === 'ta' ? ${obj2}.tamil${prop1} || ${obj2}.${prop2} : language === 'hi' ? ${obj1}.hindi${prop1} : ${obj2}.${prop2})`;
  });

  // Replace tx.hindiTitle : tx.title
  const propPattern2 = /language\s*===\s*'hi'\s*\?\s*tx\.hindiTitle\s*:\s*tx\.title/g;
  content = content.replace(propPattern2, (match) => {
    changed = true;
    return `(language === 'ta' ? tx.tamilTitle || tx.title : language === 'hi' ? tx.hindiTitle : tx.title)`;
  });

  // Scam result warnings
  const propPattern3 = /language\s*===\s*'hi'\s*\?\s*result\.warningHindi\s*:\s*result\.warningEnglish/g;
  content = content.replace(propPattern3, (match) => {
    changed = true;
    return `(language === 'ta' ? result.warningTamil || result.warningEnglish : language === 'hi' ? result.warningHindi : result.warningEnglish)`;
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
console.log('Done mapping UI strings.');
