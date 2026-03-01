import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const FRENCH_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';
const AUDIO_DIR = path.join(process.cwd(), 'attached_assets/audio');
const MANIFEST_PATH = path.join(process.cwd(), 'attached_assets/tts-manifest.json');

const MISSING = [
  { text: 'Elle est', file: 'f9ac3e05a4e78329.mp3' },
  { text: "Elle n'est pas", file: '5044752d1db88539.mp3' },
  { text: 'Elles ne sont pas', file: 'd5a123b4f81b6c26.mp3' },
];

async function generateAudio(text: string): Promise<Buffer> {
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${FRENCH_VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY!,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });
  if (!response.ok) throw new Error(`ElevenLabs error ${response.status}: ${await response.text()}`);
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  console.log('🔧 Fixing missing audio files...\n');
  for (const { text, file } of MISSING) {
    const dest = path.join(AUDIO_DIR, file);
    if (fs.existsSync(dest)) {
      console.log(`⏭  Already exists: ${file} (${text})`);
      continue;
    }
    console.log(`🎙  Generating: "${text}" → ${file}`);
    try {
      const audio = await generateAudio(text);
      fs.writeFileSync(dest, audio);
      console.log(`✅ Saved ${audio.length} bytes\n`);
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`❌ Failed: ${err}\n`);
    }
  }
  console.log('✅ Done');
}

main().catch(console.error);
