import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import { INTERMEDIATE_QUIZ_DATA } from '../intermediate-quiz-data.js';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const PETER_VOICE_ID = 't4fHUMAMZxaaV2inHOnb';

const BASE_AUDIO_DIR = path.join(process.cwd(), 'attached_assets/audio/quizzes/intermediate');
const MANIFEST_PATH = path.join(process.cwd(), 'attached_assets/tts-manifest.json');
const AUDIO_DIR = path.join(process.cwd(), 'attached_assets/audio');
const RATE_LIMIT_MS = 300;

// dataKey = key in INTERMEDIATE_QUIZ_DATA; audioPath = directory name on disk
const TENSES: Array<{ dataKey: string; audioPath: string }> = [
  { dataKey: 'present', audioPath: 'present' },
  { dataKey: 'passé_composé', audioPath: 'passe_compose' },
  { dataKey: 'futur_simple', audioPath: 'futur_simple' },
  { dataKey: 'imparfait', audioPath: 'imparfait' },
];

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const ANSWERS_ONLY = args.includes('--answers-only');
const QUESTIONS_ONLY = args.includes('--questions-only');
const VERB_FILTER = args.find(a => a.startsWith('--verb='))?.replace('--verb=', '');
const TENSE_FILTER = args.find(a => a.startsWith('--tense='))?.replace('--tense=', '');

let totalGenerated = 0;
let totalSkipped = 0;
let totalErrors = 0;
let totalChars = 0;

function hashText(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

async function callElevenLabs(text: string): Promise<Buffer> {
  if (!API_KEY) throw new Error('ELEVENLABS_API_KEY not set');
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${PETER_VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API ${response.status}: ${errorText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function generateQuestionAudio(verb: string, tensePath: string, qNum: number, text: string): Promise<void> {
  const dir = path.join(BASE_AUDIO_DIR, verb, tensePath, 'questions');
  const filePath = path.join(dir, `Q${qNum}.mp3`);

  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
    totalSkipped++;
    return;
  }

  if (DRY_RUN) {
    totalChars += text.length;
    console.log(`  [DRY] Q${qNum}: "${text.substring(0, 60)}"`);
    return;
  }

  try {
    ensureDir(dir);
    const buffer = await callElevenLabs(text);
    fs.writeFileSync(filePath, buffer);
    totalGenerated++;
    totalChars += text.length;
    console.log(`  ✅ Q${qNum}.mp3 (${buffer.length}b): "${text.substring(0, 55)}"`);
    await sleep(RATE_LIMIT_MS);
  } catch (err: any) {
    console.error(`  ❌ Q${qNum} failed: ${err.message}`);
    totalErrors++;
  }
}

async function main() {
  console.log(`🎙  Intermediate Audio Generator — Peter voice (${PETER_VOICE_ID})`);
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  if (ANSWERS_ONLY) console.log('   Answers only');
  if (QUESTIONS_ONLY) console.log('   Questions only');
  if (VERB_FILTER) console.log(`   Verb filter: ${VERB_FILTER}`);
  if (TENSE_FILTER) console.log(`   Tense filter: ${TENSE_FILTER}`);
  console.log('');

  if (!DRY_RUN && !API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not set');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  if (!manifest.intermediate_phrases) {
    manifest.intermediate_phrases = {};
  }
  let manifestDirty = false;

  const allAnswerTexts = new Set<string>();
  const verbs = Object.keys(INTERMEDIATE_QUIZ_DATA);

  // === QUESTION AUDIO ===
  for (const verb of verbs) {
    if (VERB_FILTER && verb !== VERB_FILTER) continue;
    const verbData = INTERMEDIATE_QUIZ_DATA[verb];

    for (const { dataKey, audioPath } of TENSES) {
      if (TENSE_FILTER && audioPath !== TENSE_FILTER) continue;
      const questions = verbData[dataKey];
      if (!questions || questions.length === 0) continue;

      console.log(`\n📚 ${verb} / ${audioPath} — ${questions.length} questions`);

      if (!ANSWERS_ONLY) {
        for (let i = 0; i < questions.length; i++) {
          await generateQuestionAudio(verb, audioPath, i + 1, questions[i].question);
        }
      }

      // Collect answer texts (option A = correct answer)
      for (const q of questions) {
        const correctIndex = ['A','B','C','D'].indexOf(q.answer);
        if (correctIndex >= 0 && q.options[correctIndex]) {
          allAnswerTexts.add(q.options[correctIndex]);
        }
      }
    }
  }

  // === ANSWER AUDIO ===
  if (!QUESTIONS_ONLY) {
    console.log(`\n🔊 Processing ${allAnswerTexts.size} unique answer phrases...`);

    const sorted = [...allAnswerTexts].sort();
    for (const text of sorted) {
      const filename = `intr_${hashText(text)}.mp3`;
      const filePath = path.join(AUDIO_DIR, filename);

      if (manifest.intermediate_phrases[text] && fs.existsSync(path.join(AUDIO_DIR, manifest.intermediate_phrases[text]))) {
        totalSkipped++;
        continue;
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        manifest.intermediate_phrases[text] = filename;
        manifestDirty = true;
        totalSkipped++;
        continue;
      }

      if (DRY_RUN) {
        totalChars += text.length;
        console.log(`  [DRY] "${text.substring(0, 50)}"`);
        continue;
      }

      try {
        const buffer = await callElevenLabs(text);
        fs.writeFileSync(filePath, buffer);
        manifest.intermediate_phrases[text] = filename;
        manifestDirty = true;
        totalGenerated++;
        totalChars += text.length;
        console.log(`  ✅ "${text.substring(0, 45)}" → ${filename} (${buffer.length}b)`);
        await sleep(RATE_LIMIT_MS);

        if (totalGenerated % 30 === 0) {
          manifest.generatedAt = new Date().toISOString();
          fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
          console.log('  💾 Manifest checkpoint saved');
        }
      } catch (err: any) {
        console.error(`  ❌ "${text.substring(0, 45)}" failed: ${err.message}`);
        totalErrors++;
      }
    }
  }

  if (!DRY_RUN && manifestDirty) {
    manifest.generatedAt = new Date().toISOString();
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('\n💾 Final manifest saved');
  }

  console.log('\n========================================');
  console.log(`✅ Generated:   ${totalGenerated} files`);
  console.log(`⏭  Skipped:    ${totalSkipped} files`);
  console.log(`❌ Errors:      ${totalErrors}`);
  console.log(`📊 Chars used:  ${totalChars}`);
  if (DRY_RUN) {
    console.log(`\n📋 DRY RUN SUMMARY:`);
    console.log(`   Question files would generate: check counts above`);
    console.log(`   Answer phrases: ${allAnswerTexts.size} unique`);
  }
  console.log('========================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
