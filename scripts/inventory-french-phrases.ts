import { NOVICE_QUIZ_DATA } from '../server/novice-quiz-data';
import { ELEMENTARY_PRESENT_QUESTIONS, ELEMENTARY_PASSE_COMPOSE_QUESTIONS, ELEMENTARY_FUTURE_SIMPLE_QUESTIONS } from '../server/elementary-quiz-data';
import { INTERMEDIATE_QUIZ_DATA } from '../server/intermediate-quiz-data';
import { BEGINNER_PRONOUN_QUESTIONS } from '../server/beginner-pronoun-data';

const uniquePhrases = new Set<string>();

function extractFromSimpleData(data: Record<string, any>) {
  for (const key of Object.keys(data)) {
    const items = data[key];
    if (Array.isArray(items)) {
      for (const q of items) {
        if (Array.isArray(q.options)) {
          for (const opt of q.options) {
            if (typeof opt === 'string') {
              uniquePhrases.add(opt);
            }
          }
        }
      }
    } else if (typeof items === 'object') {
      extractFromSimpleData(items);
    }
  }
}

function extractFromBeginnerData(data: Record<string, Record<string, any[]>>) {
  for (const verb of Object.keys(data)) {
    const verbData = data[verb];
    for (const tense of Object.keys(verbData)) {
      const questions = verbData[tense];
      if (Array.isArray(questions)) {
        for (const q of questions) {
          if (q.answerOptions && Array.isArray(q.answerOptions)) {
            for (const opt of q.answerOptions) {
              if (opt.text) {
                uniquePhrases.add(opt.text);
              }
            }
          }
        }
      }
    }
  }
}

console.log('Extracting French phrases from quiz data...\n');

extractFromSimpleData(NOVICE_QUIZ_DATA);
console.log(`After novice data: ${uniquePhrases.size} unique phrases`);

extractFromSimpleData(ELEMENTARY_PRESENT_QUESTIONS);
extractFromSimpleData(ELEMENTARY_PASSE_COMPOSE_QUESTIONS);
extractFromSimpleData(ELEMENTARY_FUTURE_SIMPLE_QUESTIONS);
console.log(`After elementary data: ${uniquePhrases.size} unique phrases`);

extractFromSimpleData(INTERMEDIATE_QUIZ_DATA);
console.log(`After intermediate data: ${uniquePhrases.size} unique phrases`);

extractFromBeginnerData(BEGINNER_PRONOUN_QUESTIONS);
console.log(`After beginner data: ${uniquePhrases.size} unique phrases`);

console.log(`\n=== TOTAL: ${uniquePhrases.size} unique French phrases ===`);

const avgAudioSize = 22 * 1024;
const estimatedTotalMB = (uniquePhrases.size * avgAudioSize) / (1024 * 1024);
console.log(`Estimated audio storage: ~${estimatedTotalMB.toFixed(1)} MB (at ~22KB per phrase)`);

const sortedPhrases = Array.from(uniquePhrases).sort();
console.log(`\nFirst 20 phrases:`);
sortedPhrases.slice(0, 20).forEach((p, i) => console.log(`  ${i + 1}. ${p}`));

export { uniquePhrases, sortedPhrases };
