/**
 * Beginner Audio Generation Script
 * Generates ElevenLabs audio for all beginner verb/tense quiz content.
 *
 * Questions → English voice → Q{n}.mp3 in questions/ folder
 * Answers  → French voice (Léa) → added to tts-manifest.json
 *
 * Usage: tsx server/scripts/generate-beginner-audio.ts
 * Options:
 *   --dry-run   Show what would be generated without calling API
 *   --verb=être Only process a specific verb
 *   --tense=Présent Only process a specific tense
 */

import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import { BEGINNER_PRONOUN_QUESTIONS } from '../beginner-pronoun-data.js';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const FRENCH_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';  // Léa - native French speaker
const ENGLISH_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';  // Léa also reads English (multilingual_v2 model)

const BASE_AUDIO_DIR = path.join(process.cwd(), 'attached_assets/audio/quizzes/beginner');
const MANIFEST_PATH = path.join(process.cwd(), 'attached_assets/tts-manifest.json');
const AUDIO_ASSETS_DIR = path.join(process.cwd(), 'attached_assets/audio');

const TENSE_MAP: Record<string, string> = {
  'Présent': 'present',
  'Passé Composé': 'passe_compose',
  'Futur Simple': 'futur_simple',
};

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FILTER_VERB = args.find(a => a.startsWith('--verb='))?.split('=')[1];
const FILTER_TENSE = args.find(a => a.startsWith('--tense='))?.split('=')[1];
const RATE_LIMIT_MS = 300;

let totalGenerated = 0;
let totalSkipped = 0;
let totalCharsUsed = 0;
let totalErrors = 0;

async function callElevenLabs(text: string, voiceId: string): Promise<Buffer> {
  if (!API_KEY) throw new Error('ELEVENLABS_API_KEY not set');

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
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

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function loadManifest(): { version: string; voiceId: string; generatedAt: string; phrases: Record<string, string> } {
  const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
  return JSON.parse(raw);
}

function saveManifest(manifest: object) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
}

function hashText(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

async function generateQuestionAudio(
  verb: string,
  tensePath: string,
  questionNum: number,
  questionText: string
): Promise<void> {
  const dir = path.join(BASE_AUDIO_DIR, verb, tensePath, 'questions');
  const filePath = path.join(dir, `Q${questionNum}.mp3`);
  const wavPath = path.join(dir, `Q${questionNum}.wav`);

  if (fs.existsSync(filePath) || fs.existsSync(wavPath)) {
    console.log(`  ⏭  Q${questionNum} exists, skipping`);
    totalSkipped++;
    return;
  }

  if (DRY_RUN) {
    console.log(`  [DRY] Would generate Q${questionNum}.mp3: "${questionText}" (${questionText.length} chars)`);
    totalCharsUsed += questionText.length;
    return;
  }

  try {
    ensureDir(dir);
    const buffer = await callElevenLabs(questionText, ENGLISH_VOICE_ID);
    fs.writeFileSync(filePath, buffer);
    totalGenerated++;
    totalCharsUsed += questionText.length;
    console.log(`  ✅ Q${questionNum}.mp3 (${buffer.length} bytes): "${questionText}"`);
    await sleep(RATE_LIMIT_MS);
  } catch (err: any) {
    console.error(`  ❌ Q${questionNum} failed: ${err.message}`);
    totalErrors++;
  }
}

async function generateAnswerAudio(
  text: string,
  manifest: { phrases: Record<string, string> }
): Promise<boolean> {
  if (manifest.phrases[text]) {
    return false;
  }

  if (DRY_RUN) {
    console.log(`    [DRY] Would generate answer: "${text}" (${text.length} chars)`);
    totalCharsUsed += text.length;
    return true;
  }

  try {
    const buffer = await callElevenLabs(text, FRENCH_VOICE_ID);
    const filename = `${hashText(text)}.mp3`;
    const filePath = path.join(AUDIO_ASSETS_DIR, filename);
    fs.writeFileSync(filePath, buffer);
    manifest.phrases[text] = filename;
    totalGenerated++;
    totalCharsUsed += text.length;
    console.log(`    ✅ Answer "${text}" → ${filename} (${buffer.length} bytes)`);
    await sleep(RATE_LIMIT_MS);
    return true;
  } catch (err: any) {
    console.error(`    ❌ Answer "${text}" failed: ${err.message}`);
    totalErrors++;
    return false;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🎙  Beginner Audio Generator');
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  if (FILTER_VERB) console.log(`   Verb filter: ${FILTER_VERB}`);
  if (FILTER_TENSE) console.log(`   Tense filter: ${FILTER_TENSE}`);
  console.log('');

  if (!DRY_RUN && !API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY environment variable not set');
    process.exit(1);
  }

  const manifest = loadManifest();
  let manifestDirty = false;
  let saveInterval = 0;

  const verbs = Object.keys(BEGINNER_PRONOUN_QUESTIONS).filter(v => !FILTER_VERB || v === FILTER_VERB);

  for (const verb of verbs) {
    const tenses = BEGINNER_PRONOUN_QUESTIONS[verb];
    const tenseNames = Object.keys(tenses).filter(t => !FILTER_TENSE || t === FILTER_TENSE);

    for (const tense of tenseNames) {
      const tensePath = TENSE_MAP[tense] || tense.toLowerCase().replace(/\s+/g, '_');
      const questions = tenses[tense];

      console.log(`\n📚 ${verb} / ${tense} (${tensePath}) — ${questions.length} questions`);

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const qNum = i + 1;

        console.log(`\n  Q${qNum}: "${question.question}"`);

        // Generate question audio (English)
        await generateQuestionAudio(verb, tensePath, qNum, question.question);

        // Generate answer audio (French) — add to manifest
        for (const option of question.answerOptions) {
          const wasNew = await generateAnswerAudio(option.text, manifest);
          if (wasNew) manifestDirty = true;
        }

        // Save manifest every 10 generations to preserve progress
        saveInterval++;
        if (manifestDirty && saveInterval % 10 === 0 && !DRY_RUN) {
          manifest.generatedAt = new Date().toISOString();
          saveManifest(manifest);
          console.log('  💾 Manifest saved');
        }
      }
    }
  }

  // Final manifest save
  if (manifestDirty && !DRY_RUN) {
    manifest.generatedAt = new Date().toISOString();
    saveManifest(manifest);
    console.log('\n💾 Final manifest saved');
  }

  console.log('\n========================================');
  console.log(`✅ Generated:   ${totalGenerated} files`);
  console.log(`⏭  Skipped:    ${totalSkipped} files`);
  console.log(`❌ Errors:      ${totalErrors}`);
  console.log(`📊 Chars used:  ${totalCharsUsed} credits`);
  console.log('========================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
