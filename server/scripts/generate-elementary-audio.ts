import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import {
  ELEMENTARY_PRESENT_QUESTIONS,
  ELEMENTARY_PASSE_COMPOSE_QUESTIONS,
  ELEMENTARY_FUTURE_SIMPLE_QUESTIONS,
} from '../elementary-quiz-data.js';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AUDREY_VOICE_ID = 'McVZB9hVxVSk3Equu8EH';

const BASE_AUDIO_DIR = path.join(process.cwd(), 'attached_assets/audio/quizzes/elementary');
const MANIFEST_PATH = path.join(process.cwd(), 'attached_assets/tts-manifest.json');
const AUDIO_DIR = path.join(process.cwd(), 'attached_assets/audio');
const RATE_LIMIT_MS = 300;

const TENSE_DATA: Record<string, typeof ELEMENTARY_PRESENT_QUESTIONS> = {
  present: ELEMENTARY_PRESENT_QUESTIONS,
  passe_compose: ELEMENTARY_PASSE_COMPOSE_QUESTIONS,
  futur_simple: ELEMENTARY_FUTURE_SIMPLE_QUESTIONS,
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
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${AUDREY_VOICE_ID}`, {
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
    return;
  }

  try {
    ensureDir(dir);
    const buffer = await callElevenLabs(text);
    fs.writeFileSync(filePath, buffer);
    totalGenerated++;
    totalChars += text.length;
    console.log(`  ✅ Q${qNum}.mp3 (${buffer.length}b): "${text.substring(0, 55)}..."`);
    await sleep(RATE_LIMIT_MS);
  } catch (err: any) {
    console.error(`  ❌ Q${qNum} failed: ${err.message}`);
    totalErrors++;
  }
}

async function main() {
  console.log(`🎙  Elementary Audio Generator — Audrey voice`);
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  if (ANSWERS_ONLY) console.log('   Answers only');
  if (QUESTIONS_ONLY) console.log('   Questions only');
  console.log('');

  if (!DRY_RUN && !API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not set');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  if (!manifest.elementary_phrases) {
    manifest.elementary_phrases = {};
  }
  let manifestDirty = false;

  const allAnswerTexts = new Set<string>();

  for (const [tensePath, verbData] of Object.entries(TENSE_DATA)) {
    for (const [verb, questions] of Object.entries(verbData)) {
      console.log(`\n📚 ${verb} / ${tensePath} — ${questions.length} questions`);

      if (!ANSWERS_ONLY) {
        for (let i = 0; i < questions.length; i++) {
          await generateQuestionAudio(verb, tensePath, i + 1, questions[i].question);
        }
      }

      for (const q of questions) {
        for (const opt of q.answerOptions) {
          allAnswerTexts.add(opt.text);
        }
      }
    }
  }

  if (!QUESTIONS_ONLY) {
    console.log(`\n🔊 Processing ${allAnswerTexts.size} unique answer phrases...`);

    const sorted = [...allAnswerTexts].sort();
    for (const text of sorted) {
      const filename = `elem_${hashText(text)}.mp3`;
      const filePath = path.join(AUDIO_DIR, filename);

      if (manifest.elementary_phrases[text] && fs.existsSync(path.join(AUDIO_DIR, manifest.elementary_phrases[text]))) {
        totalSkipped++;
        continue;
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        manifest.elementary_phrases[text] = filename;
        manifestDirty = true;
        totalSkipped++;
        continue;
      }

      if (DRY_RUN) {
        totalChars += text.length;
        continue;
      }

      try {
        const buffer = await callElevenLabs(text);
        fs.writeFileSync(filePath, buffer);
        manifest.elementary_phrases[text] = filename;
        manifestDirty = true;
        totalGenerated++;
        totalChars += text.length;
        console.log(`  ✅ "${text.substring(0, 40)}" → ${filename} (${buffer.length}b)`);
        await sleep(RATE_LIMIT_MS);

        if (totalGenerated % 30 === 0) {
          manifest.generatedAt = new Date().toISOString();
          fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
          console.log('  💾 Manifest checkpoint saved');
        }
      } catch (err: any) {
        console.error(`  ❌ "${text.substring(0, 40)}" failed: ${err.message}`);
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
