const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'translate-ui.cjs',
  'translate-all.cjs',
  'src/services/geminiService.ts',
  'src/screens/ScamShieldScreen.tsx',
  'src/screens/PayScreen.tsx',
  'src/screens/HomeScreen.tsx',
  'src/screens/AssistantScreen.tsx',
  'src/data/mockData.ts',
  'src/components/Header.tsx',
  'src/components/ErrorBoundary.tsx',
  'src/App.tsx',
  'settings.gradle.kts',
  'package.json',
  'package-lock.json',
  'metadata.json',
  'index.html',
  'build.gradle.kts'
];

for (const file of filesToUpdate) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace specific strings
    content = content.replace(/Sahaay \(सहाय\)/g, 'LumoPay');
    content = content.replace(/सहाय/g, 'लूमोपे'); // Optional, replace Hindi Sahaay with LumoPay transliteration or keep it, let's keep it simple. Actually let's just replace the English ones first. Wait, let me not do the Hindi one unless necessary, but "Sahaay (सहाय)" -> "LumoPay" is safe.
    
    // Replace Sahaay with LumoPay
    content = content.replace(/Sahaay/g, 'LumoPay');
    content = content.replace(/sahaay/g, 'lumopay');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.warn(`File not found: ${file}`);
  }
}
