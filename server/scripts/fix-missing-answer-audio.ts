import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import { BEGINNER_PRONOUN_QUESTIONS } from '../beginner-pronoun-data.js';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const FRENCH_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';
const MANIFEST_PATH = path.join(process.cwd(), 'attached_assets/tts-manifest.json');
const AUDIO_DIR = path.join(process.cwd(), 'attached_assets/audio');
const RATE_LIMIT_MS = 300;

const DRY_RUN = process.argv.includes('--dry-run');

function hashText(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callElevenLabs(text: string): Promise<Buffer> {
  if (!API_KEY) throw new Error('ELEVENLABS_API_KEY not set');
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${FRENCH_VOICE_ID}`, {
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

async function main() {
  console.log(`🔧 Fix Missing Beginner Answer Audio (${DRY_RUN ? 'DRY RUN' : 'LIVE'})\n`);

  if (!DRY_RUN && !API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not set');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const phrases: Record<string, string> = manifest.phrases;

  const beginnerTexts = new Set<string>();
  for (const verb of Object.keys(BEGINNER_PRONOUN_QUESTIONS)) {
    for (const tense of Object.keys(BEGINNER_PRONOUN_QUESTIONS[verb])) {
      for (const q of BEGINNER_PRONOUN_QUESTIONS[verb][tense]) {
        for (const opt of q.answerOptions) {
          beginnerTexts.add(opt.text);
        }
      }
    }
  }

  console.log(`Total unique beginner answer texts: ${beginnerTexts.size}`);

  const missing: string[] = [];
  for (const text of beginnerTexts) {
    const audioFile = phrases[text];
    if (!audioFile) {
      missing.push(text);
      continue;
    }
    const fullPath = path.join(AUDIO_DIR, audioFile);
    const isOldFormat = audioFile.includes('/') || audioFile.endsWith('.wav');
    if (isOldFormat || !fs.existsSync(fullPath) || fs.statSync(fullPath).size === 0) {
      missing.push(text);
    }
  }

  console.log(`Missing/broken audio: ${missing.length}\n`);

  let generated = 0;
  let errors = 0;
  let totalChars = 0;

  for (const text of missing.sort()) {
    const newFilename = `${hashText(text)}.mp3`;
    const newPath = path.join(AUDIO_DIR, newFilename);

    if (fs.existsSync(newPath) && fs.statSync(newPath).size > 0) {
      console.log(`  🔄 "${text}" → already exists, updating manifest ref`);
      phrases[text] = newFilename;
      generated++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`  [DRY] "${text}" (${text.length} chars) → ${newFilename}`);
      totalChars += text.length;
      continue;
    }

    try {
      const buffer = await callElevenLabs(text);
      fs.writeFileSync(newPath, buffer);
      phrases[text] = newFilename;
      generated++;
      totalChars += text.length;
      console.log(`  ✅ "${text}" → ${newFilename} (${buffer.length} bytes)`);
      await sleep(RATE_LIMIT_MS);

      if (generated % 10 === 0) {
        manifest.generatedAt = new Date().toISOString();
        fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
        console.log('  💾 Manifest checkpoint saved');
      }
    } catch (err: any) {
      console.error(`  ❌ "${text}" failed: ${err.message}`);
      errors++;
    }
  }

  if (!DRY_RUN && generated > 0) {
    manifest.generatedAt = new Date().toISOString();
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('\n💾 Final manifest saved');
  }

  console.log('\n========================================');
  console.log(`✅ Generated/fixed: ${generated} files`);
  console.log(`❌ Errors:          ${errors}`);
  console.log(`📊 Chars used:      ${totalChars}`);
  console.log('========================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
