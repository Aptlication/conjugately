import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY });
const VOICE_NAME = 'Aoede';
const MODEL = 'gemini-2.5-flash-preview-tts';

function writeWavFile(filename, pcmData) {
  const numChannels = 1;
  const sampleRate = 24000;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  const dataSize = pcmData.length;
  const fileSize = 36 + dataSize;

  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(fileSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const wavBuffer = Buffer.concat([header, pcmData]);
  fs.writeFileSync(filename, wavBuffer);
}

async function generateAudio(text, outputPath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const prompt = text.length < 10 
        ? `Pronounce this French phrase slowly and clearly: "${text}"`
        : `Say in French with clear pronunciation: ${text}`;
      
      console.log(`  Attempt ${attempt}: "${prompt}"`);
      
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: VOICE_NAME },
            },
          },
        },
      });

      const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!data) {
        if (attempt < retries) {
          console.log(`  ⚠️ No audio, retrying...`);
          await new Promise(r => setTimeout(r, 1000 * attempt));
          continue;
        }
        throw new Error('No audio data after retries');
      }

      const audioBuffer = Buffer.from(data, 'base64');
      writeWavFile(outputPath, audioBuffer);
      console.log(`  ✅ Success: ${audioBuffer.length} bytes`);
      return true;
    } catch (error) {
      if (attempt < retries) {
        console.log(`  ⚠️ Error: ${error.message}, retrying...`);
        await new Promise(r => setTimeout(r, 1000 * attempt));
        continue;
      }
      console.error(`  ❌ Failed: ${error.message}`);
      return false;
    }
  }
  return false;
}

async function main() {
  const testCases = [
    { text: "Tu es", file: "test-tu-es.wav" },
    { text: "J'ai", file: "test-jai.wav" },
    { text: "Il est", file: "test-il-est.wav" },
    { text: "Elle a", file: "test-elle-a.wav" },
  ];

  console.log('\n🧪 Testing retry logic with short French phrases\n');

  for (const test of testCases) {
    console.log(`\n📝 Testing: "${test.text}"`);
    const output = `attached_assets/audio/${test.file}`;
    await generateAudio(test.text, output);
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n📊 Results:');
  for (const test of testCases) {
    const output = `attached_assets/audio/${test.file}`;
    if (fs.existsSync(output)) {
      console.log(`  ✅ ${test.text}: ${fs.statSync(output).size} bytes`);
    } else {
      console.log(`  ❌ ${test.text}: not generated`);
    }
  }
}

main();
