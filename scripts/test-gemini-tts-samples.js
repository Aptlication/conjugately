import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY });

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

async function generateAudio(text, outputPath) {
  const startTime = Date.now();
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: [{ parts: [{ text: `Say in French with clear pronunciation: ${text}` }] }],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Aoede' },
        },
      },
    },
  });
  
  const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!data) {
    throw new Error('No audio data');
  }

  const audioBuffer = Buffer.from(data, 'base64');
  writeWavFile(outputPath, audioBuffer);
  
  const elapsed = Date.now() - startTime;
  console.log(`✅ "${text}" → ${path.basename(outputPath)} (${elapsed}ms, ${audioBuffer.length} bytes)`);
}

async function main() {
  const samples = [
    { text: 'Je suis', output: 'attached_assets/audio/quizzes/beginner/être/present/answers/Q1_A1.wav' },
    { text: 'Tu es', output: 'attached_assets/audio/quizzes/beginner/être/present/answers/Q2_A1.wav' },
    { text: "J'ai", output: 'attached_assets/audio/quizzes/beginner/avoir/present/answers/Q1_A1.wav' },
    { text: 'Tu as', output: 'attached_assets/audio/quizzes/beginner/avoir/present/answers/Q2_A1.wav' },
    { text: 'Je fais', output: 'attached_assets/audio/quizzes/beginner/faire/present/answers/Q1_A1.wav' },
  ];

  console.log('\n🎤 Generating 5 sample beginner audio files...\n');

  for (const sample of samples) {
    try {
      await generateAudio(sample.text, sample.output);
    } catch (error) {
      console.error(`❌ Failed: "${sample.text}" - ${error.message}`);
    }
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n📊 Sample generation complete!\n');
  console.log('Generated files:');
  for (const sample of samples) {
    if (fs.existsSync(sample.output)) {
      const stat = fs.statSync(sample.output);
      console.log(`  ✅ ${sample.output} (${stat.size} bytes)`);
    }
  }
}

main();
