import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const textBase = path.join(__dirname, '..', 'attached_assets', 'text', 'quizzes');

async function extractPhrasesFromBeginnerData() {
  const dataPath = path.join(__dirname, '..', 'server', 'beginner-pronoun-data.ts');
  const content = fs.readFileSync(dataPath, 'utf-8');
  
  const verbs = ['être', 'avoir', 'faire'];
  const tenses = ['Présent', 'Passé Composé', 'Futur Simple'];
  const tenseMap = {
    'Présent': 'present',
    'Passé Composé': 'passe_compose', 
    'Futur Simple': 'futur_simple'
  };
  
  let totalPhrases = 0;
  
  for (const verb of verbs) {
    for (const tense of tenses) {
      const folderTense = tenseMap[tense];
      const answersDir = path.join(textBase, 'beginner', verb, folderTense, 'answers');
      
      fs.mkdirSync(answersDir, { recursive: true });
      
      const regex = new RegExp(`"${verb}"[\\s\\S]*?"${tense}"\\s*:\\s*\\[([\\s\\S]*?)\\]\\s*,\\s*(?:\\/\\/|"[A-Z])`, 'g');
      const match = content.match(regex);
      
      if (!match) continue;
      
      const textMatches = match[0].matchAll(/text:\s*"([^"]+)"/g);
      const phrases = [...textMatches].map(m => m[1]);
      
      let questionNum = 1;
      let answerNum = 1;
      
      for (const phrase of phrases) {
        const filename = `Q${questionNum}_A${answerNum}.txt`;
        fs.writeFileSync(path.join(answersDir, filename), phrase);
        totalPhrases++;
        
        answerNum++;
        if (answerNum > 4) {
          answerNum = 1;
          questionNum++;
        }
      }
      
      console.log(`${verb} ${tense}: ${phrases.length} phrases extracted`);
    }
  }
  
  console.log(`\nTotal: ${totalPhrases} phrases extracted`);
}

extractPhrasesFromBeginnerData();
