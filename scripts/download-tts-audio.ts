import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { NOVICE_QUIZ_DATA } from '../server/novice-quiz-data';
import { ELEMENTARY_PRESENT_QUESTIONS, ELEMENTARY_PASSE_COMPOSE_QUESTIONS, ELEMENTARY_FUTURE_SIMPLE_QUESTIONS } from '../server/elementary-quiz-data';
import { INTERMEDIATE_QUIZ_DATA } from '../server/intermediate-quiz-data';
import { BEGINNER_PRONOUN_QUESTIONS } from '../server/beginner-pronoun-data';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';
const OUTPUT_DIR = 'attached_assets/audio';
const MANIFEST_FILE = 'attached_assets/tts-manifest.json';
const RATE_LIMIT_DELAY = 200;
const MAX_RETRIES = 3;

interface Manifest {
  version: string;
  voiceId: string;
  generatedAt: string;
  phrases: Record<string, string>;
}

function hashText(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex').substring(0, 16);
}

function extractPhrases(): Set<string> {
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

  extractFromSimpleData(NOVICE_QUIZ_DATA);
  extractFromSimpleData(ELEMENTARY_PRESENT_QUESTIONS);
  extractFromSimpleData(ELEMENTARY_PASSE_COMPOSE_QUESTIONS);
  extractFromSimpleData(ELEMENTARY_FUTURE_SIMPLE_QUESTIONS);
  extractFromSimpleData(INTERMEDIATE_QUIZ_DATA);
  extractFromBeginnerData(BEGINNER_PRONOUN_QUESTIONS);

  return uniquePhrases;
}

async function downloadAudio(text: string, retries = 0): Promise<Buffer | null> {
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY!,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 429 && retries < MAX_RETRIES) {
        console.log(`  Rate limited, waiting 5s and retrying...`);
        await new Promise(r => setTimeout(r, 5000));
        return downloadAudio(text, retries + 1);
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(`  Error, retrying (${retries + 1}/${MAX_RETRIES})...`);
      await new Promise(r => setTimeout(r, 2000));
      return downloadAudio(text, retries + 1);
    }
    console.error(`  Failed after ${MAX_RETRIES} retries:`, error);
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const limitArg = args.find(a => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : Infinity;
  const dryRun = args.includes('--dry-run');

  if (!ELEVENLABS_API_KEY && !dryRun) {
    console.error('ERROR: ELEVENLABS_API_KEY environment variable not set');
    process.exit(1);
  }
  
  if (dryRun) {
    console.log('=== DRY RUN MODE (no downloads) ===\n');
  }
  if (limit !== Infinity) {
    console.log(`Limiting to first ${limit} phrases\n`);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }

  let manifest: Manifest = {
    version: '1.0',
    voiceId: VOICE_ID,
    generatedAt: new Date().toISOString(),
    phrases: {},
  };

  if (fs.existsSync(MANIFEST_FILE)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'));
      console.log(`Loaded existing manifest with ${Object.keys(manifest.phrases).length} phrases`);
    } catch (e) {
      console.log('Could not load existing manifest, starting fresh');
    }
  }

  const phrases = extractPhrases();
  const phraseArray = Array.from(phrases).sort();
  
  console.log(`\nTotal unique phrases: ${phraseArray.length}`);
  const existingCount = Object.keys(manifest.phrases).length;
  const remaining = phraseArray.filter(p => !manifest.phrases[p]);
  console.log(`Already downloaded: ${existingCount}`);
  console.log(`Remaining to download: ${remaining.length}\n`);

  if (remaining.length === 0) {
    console.log('All phrases already downloaded!');
    return;
  }

  const toDownload = remaining.slice(0, limit);
  console.log(`Will download: ${toDownload.length} phrases\n`);

  if (dryRun) {
    console.log('First 10 phrases to download:');
    toDownload.slice(0, 10).forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
    console.log('\nDry run complete. Remove --dry-run to actually download.');
    return;
  }

  const startTime = Date.now();
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < toDownload.length; i++) {
    const text = toDownload[i];
    const hash = hashText(text);
    const filename = `${hash}.mp3`;
    const filepath = path.join(OUTPUT_DIR, filename);

    process.stdout.write(`[${i + 1}/${remaining.length}] Downloading: "${text.substring(0, 40)}..." `);

    if (fs.existsSync(filepath)) {
      manifest.phrases[text] = filename;
      console.log('(already exists)');
      successCount++;
      continue;
    }

    const audio = await downloadAudio(text);
    
    if (audio) {
      fs.writeFileSync(filepath, audio);
      manifest.phrases[text] = filename;
      successCount++;
      console.log(`OK (${(audio.length / 1024).toFixed(1)}KB)`);
      
      if (successCount % 50 === 0) {
        fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
        console.log(`  [Checkpoint saved: ${successCount} files]`);
      }
    } else {
      failCount++;
      console.log('FAILED');
    }

    await new Promise(r => setTimeout(r, RATE_LIMIT_DELAY));
  }

  manifest.generatedAt = new Date().toISOString();
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));

  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n=== COMPLETE ===`);
  console.log(`Success: ${successCount}, Failed: ${failCount}`);
  console.log(`Duration: ${duration} minutes`);
  console.log(`Manifest saved to: ${MANIFEST_FILE}`);
}

main().catch(console.error);
