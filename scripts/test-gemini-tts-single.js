import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY;
console.log('API Key present:', !!apiKey);
console.log('API Key prefix:', apiKey ? apiKey.substring(0, 10) + '...' : 'N/A');

const ai = new GoogleGenAI({ apiKey });

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

  const wavBuffer = Buffer.concat([header, pcmData]);
  fs.writeFileSync(filename, wavBuffer);
}

async function testSingle() {
  const testText = "Je suis";
  const outputPath = 'attached_assets/audio/test-gemini-output.wav';
  
  console.log(`\n🎤 Testing Gemini TTS with: "${testText}"`);
  console.log('⏳ Sending request to Gemini API...');
  
  try {
    const startTime = Date.now();
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: `Say in French: ${testText}` }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Aoede' },
          },
        },
      },
    });
    
    const elapsed = Date.now() - startTime;
    console.log(`⏱️ Response received in ${elapsed}ms`);

    const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!data) {
      console.log('Response structure:', JSON.stringify(response, null, 2).substring(0, 500));
      throw new Error('No audio data in response');
    }

    const audioBuffer = Buffer.from(data, 'base64');
    console.log(`📦 Audio data size: ${audioBuffer.length} bytes`);
    
    writeWavFile(outputPath, audioBuffer);
    console.log(`✅ Success! Audio saved to: ${outputPath}`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.error('Full error:', error);
  }
}

testSingle();
