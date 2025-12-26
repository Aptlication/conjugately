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

async function generateAudio(text) {
  console.log(`\n🎤 Testing: "${text}"`);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: `Pronounce this French phrase clearly: ${text}` }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Aoede' },
          },
        },
      },
    });
    
    console.log('Response candidates:', response.candidates?.length);
    
    if (!response.candidates?.[0]) {
      console.log('No candidates in response');
      console.log('Full response:', JSON.stringify(response, null, 2).substring(0, 1000));
      return;
    }
    
    const candidate = response.candidates[0];
    console.log('Candidate parts:', candidate.content?.parts?.length);
    
    if (!candidate.content?.parts?.[0]?.inlineData) {
      console.log('Part structure:', JSON.stringify(candidate.content?.parts?.[0], null, 2));
      return;
    }
    
    const data = candidate.content.parts[0].inlineData.data;
    const audioBuffer = Buffer.from(data, 'base64');
    console.log(`✅ Audio size: ${audioBuffer.length} bytes`);
    
    const filename = `attached_assets/audio/test-${text.replace(/[^a-zA-Z]/g, '_')}.wav`;
    writeWavFile(filename, audioBuffer);
    console.log(`✅ Saved: ${filename}`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    if (error.response) {
      console.log('Error response:', JSON.stringify(error.response, null, 2));
    }
  }
}

async function main() {
  const phrases = [
    "Tu es",
    "J'ai", 
    "Je fais",
    "Nous sommes",
    "Elle fait du sport"
  ];

  for (const phrase of phrases) {
    await generateAudio(phrase);
    await new Promise(r => setTimeout(r, 1000));
  }
}

main();
