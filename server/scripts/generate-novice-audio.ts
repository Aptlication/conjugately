import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import { NOVICE_QUIZ_DATA } from '../novice-quiz-data.js';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const THOMAS_VOICE_ID = 'GBv7mTt0atIp3Br8iCZE';

const BASE_AUDIO_DIR = path.join(process.cwd(), 'attached_assets/audio/quizzes/novice');
const MANIFEST_PATH = path.join(process.cwd(), 'attached_assets/tts-manifest.json');
const AUDIO_DIR = path.join(process.cwd(), 'attached_assets/audio');
const RATE_LIMIT_MS = 300;

const TENSE_MAP: Record<string, string> = {
  'present': 'present',
  'passé_composé': 'passe_compose',
  'futur_simple': 'futur_simple',
};

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const ANSWERS_ONLY = args.includes('--answers-only');
const QUESTIONS_ONLY = args.includes('--questions-only');

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
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${THOMAS_VOICE_ID}`, {
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
    console.log(`  [DRY] Q${qNum}: "${text}" (${text.length} chars)`);
    totalChars += text.length;
    return;
  }

  try {
    ensureDir(dir);
    const buffer = await callElevenLabs(text);
    fs.writeFileSync(filePath, buffer);
    totalGenerated++;
    totalChars += text.length;
    console.log(`  ✅ Q${qNum}.mp3 (${buffer.length} bytes): "${text.substring(0, 50)}..."`);
    await sleep(RATE_LIMIT_MS);
  } catch (err: any) {
    console.error(`  ❌ Q${qNum} failed: ${err.message}`);
    totalErrors++;
  }
}

async function main() {
  console.log(`🎙  Novice Audio Generator — Thomas voice`);
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  if (ANSWERS_ONLY) console.log('   Answers only');
  if (QUESTIONS_ONLY) console.log('   Questions only');
  console.log('');

  if (!DRY_RUN && !API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not set');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  if (!manifest.novice_phrases) {
    manifest.novice_phrases = {};
  }
  let manifestDirty = false;

  const allAnswerTexts = new Set<string>();

  for (const verb of Object.keys(NOVICE_QUIZ_DATA)) {
    const tenses = NOVICE_QUIZ_DATA[verb];
    for (const tense of Object.keys(tenses)) {
      const tensePath = TENSE_MAP[tense] || tense;
      const questions = tenses[tense];

      console.log(`\n📚 ${verb} / ${tense} (${tensePath}) — ${questions.length} questions`);

      if (!ANSWERS_ONLY) {
        for (let i = 0; i < questions.length; i++) {
          await generateQuestionAudio(verb, tensePath, i + 1, questions[i].question);

          if (totalGenerated > 0 && totalGenerated % 20 === 0) {
            console.log(`  📊 Progress: ${totalGenerated} generated, ${totalSkipped} skipped`);
          }
        }
      }

      for (const q of questions) {
        for (const opt of q.options) {
          allAnswerTexts.add(opt);
        }
      }
    }
  }

  if (!QUESTIONS_ONLY) {
    console.log(`\n🔊 Generating ${allAnswerTexts.size} unique answer audio files...`);

    const sorted = [...allAnswerTexts].sort();
    for (const text of sorted) {
      const filename = `novice_${hashText(text)}.mp3`;
      const filePath = path.join(AUDIO_DIR, filename);

      if (manifest.novice_phrases[text] && fs.existsSync(path.join(AUDIO_DIR, manifest.novice_phrases[text]))) {
        totalSkipped++;
        continue;
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        manifest.novice_phrases[text] = filename;
        manifestDirty = true;
        totalSkipped++;
        continue;
      }

      if (DRY_RUN) {
        console.log(`  [DRY] Answer: "${text.substring(0, 50)}..." (${text.length} chars)`);
        totalChars += text.length;
        continue;
      }

      try {
        const buffer = await callElevenLabs(text);
        fs.writeFileSync(filePath, buffer);
        manifest.novice_phrases[text] = filename;
        manifestDirty = true;
        totalGenerated++;
        totalChars += text.length;
        console.log(`  ✅ "${text.substring(0, 40)}..." → ${filename} (${buffer.length} bytes)`);
        await sleep(RATE_LIMIT_MS);

        if (totalGenerated % 20 === 0) {
          manifest.generatedAt = new Date().toISOString();
          fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
          console.log('  💾 Manifest checkpoint saved');
        }
      } catch (err: any) {
        console.error(`  ❌ "${text.substring(0, 40)}..." failed: ${err.message}`);
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
  console.log('========================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
