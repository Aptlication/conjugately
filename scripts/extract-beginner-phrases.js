import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const textBase = path.join(__dirname, '..', 'attached_assets', 'text', 'quizzes', 'beginner');

const tenseMap = {
  'Présent': 'present',
  'Passé Composé': 'passe_compose',
  'Futur Simple': 'futur_simple'
};

async function extractPhrases() {
  const dataModule = await import('../server/beginner-pronoun-data.ts');
  const BEGINNER_PRONOUN_QUESTIONS = dataModule.BEGINNER_PRONOUN_QUESTIONS;
  
  const allPhrases = new Set();
  const phrasesByVerbTense = {};
  
  const verbs = ['être', 'avoir', 'faire'];
  const tenses = ['Présent', 'Passé Composé', 'Futur Simple'];
  
  let totalFiles = 0;
  
  for (const verb of verbs) {
    phrasesByVerbTense[verb] = {};
    const verbData = BEGINNER_PRONOUN_QUESTIONS[verb];
    
    if (!verbData) {
      console.log(`Warning: No data found for verb "${verb}"`);
      continue;
    }
    
    for (const tense of tenses) {
      const folderTense = tenseMap[tense];
      const questions = verbData[tense];
      
      if (!questions || questions.length === 0) {
        console.log(`Warning: No questions found for ${verb} ${tense}`);
        continue;
      }
      
      const answersDir = path.join(textBase, verb, folderTense, 'answers');
      const questionsDir = path.join(textBase, verb, folderTense, 'questions');
      fs.mkdirSync(answersDir, { recursive: true });
      fs.mkdirSync(questionsDir, { recursive: true });
      
      console.log(`\n${verb} ${tense}: ${questions.length} questions`);
      
      for (let qNum = 0; qNum < questions.length; qNum++) {
        const q = questions[qNum];
        console.log(`  Q${qNum + 1}: "${q.question}"`);
        
        // Save English question text
        const qFilename = `Q${qNum + 1}.txt`;
        const qFilepath = path.join(questionsDir, qFilename);
        fs.writeFileSync(qFilepath, q.question);
        totalFiles++;
        
        for (let aNum = 0; aNum < q.answerOptions.length; aNum++) {
          const answer = q.answerOptions[aNum];
          const phrase = answer.text;
          allPhrases.add(phrase);
          
          const filename = `Q${qNum + 1}_A${aNum + 1}.txt`;
          const filepath = path.join(answersDir, filename);
          fs.writeFileSync(filepath, phrase);
          totalFiles++;
          
          const correctMark = answer.isCorrect ? ' ✓' : '';
          console.log(`    A${aNum + 1}: "${phrase}"${correctMark}`);
        }
      }
      
      console.log(`  → Created ${questions.length} question + ${questions.length * 4} answer files in ${verb}/${folderTense}/`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`Total unique French phrases: ${allPhrases.size}`);
  console.log(`Total text files created: ${totalFiles}`);
  
  const uniqueList = Array.from(allPhrases).sort();
  const listPath = path.join(__dirname, '..', 'attached_assets', 'beginner-phrases.txt');
  fs.writeFileSync(listPath, uniqueList.join('\n'));
  console.log(`Unique phrases list saved to: attached_assets/beginner-phrases.txt`);
}

extractPhrases().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
