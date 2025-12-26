import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  const wavBuffer = Buffer.concat([header, pcmData]);
  fs.writeFileSync(filename, wavBuffer);
}

async function generateAudio(text, outputPath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const prompt = text.length < 10 
        ? `Pronounce this French phrase slowly and clearly: "${text}"`
        : `Say in French with clear pronunciation: ${text}`;
      
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
          console.log(`⚠️ Retry ${attempt}/${retries}: ${text}`);
          await new Promise(r => setTimeout(r, 1000 * attempt));
          continue;
        }
        throw new Error('No audio data in response after retries');
      }

      const audioBuffer = Buffer.from(data, 'base64');
      
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      writeWavFile(outputPath, audioBuffer);
      console.log(`✅ Generated: ${outputPath}`);
      return true;
    } catch (error) {
      if (attempt < retries) {
        console.log(`⚠️ Error retry ${attempt}/${retries}: ${error.message}`);
        await new Promise(r => setTimeout(r, 1000 * attempt));
        continue;
      }
      console.error(`❌ Failed: ${outputPath} - ${error.message}`);
      return false;
    }
  }
  return false;
}

async function processBeginnerLevel(testMode = false) {
  const textBase = path.join(__dirname, '..', 'attached_assets', 'text', 'quizzes', 'beginner');
  const audioBase = path.join(__dirname, '..', 'attached_assets', 'audio', 'quizzes', 'beginner');
  
  const verbs = fs.readdirSync(textBase);
  let totalGenerated = 0;
  let totalFailed = 0;
  let processed = 0;
  let skipped = 0;
  const maxTest = 10;
  const maxBatch = parseInt(process.env.BATCH_SIZE || '0') || Infinity;
  
  let totalFiles = 0;
  for (const verb of verbs) {
    const verbPath = path.join(textBase, verb);
    if (!fs.statSync(verbPath).isDirectory()) continue;
    const tenses = fs.readdirSync(verbPath);
    for (const tense of tenses) {
      const tensePath = path.join(verbPath, tense);
      if (!fs.statSync(tensePath).isDirectory()) continue;
      const answersPath = path.join(tensePath, 'answers');
      if (fs.existsSync(answersPath)) {
        totalFiles += fs.readdirSync(answersPath).filter(f => f.endsWith('.txt')).length;
      }
    }
  }
  
  console.log(`\n🎯 Processing beginner level (${testMode ? 'TEST MODE - first 10 files' : 'FULL MODE'})`);
  console.log(`📊 Total files to process: ${totalFiles}`);
  console.log(`⏱️ Estimated time: ${Math.ceil(totalFiles * 6.5 / 60)} minutes (with rate limiting)\n`);
  
  for (const verb of verbs) {
    const verbPath = path.join(textBase, verb);
    if (!fs.statSync(verbPath).isDirectory()) continue;
    
    const tenses = fs.readdirSync(verbPath);
    
    for (const tense of tenses) {
      const tensePath = path.join(verbPath, tense);
      if (!fs.statSync(tensePath).isDirectory()) continue;
      
      const answersPath = path.join(tensePath, 'answers');
      if (!fs.existsSync(answersPath)) continue;
      
      const answerFiles = fs.readdirSync(answersPath).filter(f => f.endsWith('.txt'));
      
      for (const file of answerFiles) {
        if (testMode && processed >= maxTest) {
          console.log(`\n📊 Test complete: ${totalGenerated} generated, ${totalFailed} failed`);
          return;
        }
        
        if (totalGenerated >= maxBatch) {
          console.log(`\n📊 Batch limit reached: ${totalGenerated} generated, ${totalFailed} failed, ${skipped} skipped`);
          console.log(`💡 Run again to continue (existing files will be skipped)`);
          return;
        }
        
        const textFilePath = path.join(answersPath, file);
        const text = fs.readFileSync(textFilePath, 'utf-8').trim();
        
        const audioFileName = file.replace('.txt', '.wav');
        const audioFilePath = path.join(audioBase, verb, tense, 'answers', audioFileName);
        
        if (fs.existsSync(audioFilePath)) {
          skipped++;
          continue;
        }
        
        const success = await generateAudio(text, audioFilePath);
        if (success) {
          totalGenerated++;
        } else {
          totalFailed++;
        }
        processed++;
        
        if (processed % 10 === 0) {
          const remaining = totalFiles - processed;
          const eta = Math.ceil(remaining * 6.5 / 60);
          console.log(`\n📈 Progress: ${processed}/${totalFiles} (${Math.round(processed/totalFiles*100)}%) - ETA: ${eta} min\n`);
        }
        
        await new Promise(r => setTimeout(r, 6500));
      }
    }
  }
  
  console.log(`\n📊 Complete: ${totalGenerated} generated, ${totalFailed} failed`);
}

const testMode = process.argv.includes('--test');
processBeginnerLevel(testMode);
