import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifestPath = path.join(__dirname, '..', 'attached_assets', 'tts-manifest.json');
const audioBase = path.join(__dirname, '..', 'attached_assets', 'audio', 'quizzes');
const textBase = path.join(__dirname, '..', 'attached_assets', 'text', 'quizzes');

function scanBeginnerAudio() {
  const beginnerAudioPath = path.join(audioBase, 'beginner');
  const beginnerTextPath = path.join(textBase, 'beginner');
  const phrases = {};
  
  if (!fs.existsSync(beginnerAudioPath)) {
    console.log('No beginner audio folder found');
    return phrases;
  }
  
  const verbs = fs.readdirSync(beginnerAudioPath);
  
  for (const verb of verbs) {
    const verbAudioPath = path.join(beginnerAudioPath, verb);
    const verbTextPath = path.join(beginnerTextPath, verb);
    
    if (!fs.statSync(verbAudioPath).isDirectory()) continue;
    
    const tenses = fs.readdirSync(verbAudioPath);
    
    for (const tense of tenses) {
      const tenseAudioPath = path.join(verbAudioPath, tense);
      const tenseTextPath = path.join(verbTextPath, tense);
      
      if (!fs.statSync(tenseAudioPath).isDirectory()) continue;
      
      const answersAudioPath = path.join(tenseAudioPath, 'answers');
      const answersTextPath = path.join(tenseTextPath, 'answers');
      
      if (!fs.existsSync(answersAudioPath)) continue;
      
      const audioFiles = fs.readdirSync(answersAudioPath).filter(f => f.endsWith('.wav'));
      
      for (const audioFile of audioFiles) {
        const textFile = audioFile.replace('.wav', '.txt');
        const textFilePath = path.join(answersTextPath, textFile);
        
        if (!fs.existsSync(textFilePath)) continue;
        
        const phrase = fs.readFileSync(textFilePath, 'utf-8').trim();
        const relativePath = `quizzes/beginner/${verb}/${tense}/answers/${audioFile}`;
        
        phrases[phrase] = relativePath;
      }
    }
  }
  
  return phrases;
}

function updateManifest() {
  let manifest = {
    version: '2.0',
    voiceId: 'mixed',
    generatedAt: new Date().toISOString(),
    phrases: {}
  };
  
  if (fs.existsSync(manifestPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      manifest.phrases = { ...existing.phrases };
      console.log(`📂 Loaded existing manifest with ${Object.keys(existing.phrases).length} phrases`);
    } catch (e) {
      console.warn('Could not load existing manifest:', e.message);
    }
  }
  
  const beginnerPhrases = scanBeginnerAudio();
  const newCount = Object.keys(beginnerPhrases).length;
  
  manifest.phrases = { ...manifest.phrases, ...beginnerPhrases };
  
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log(`✅ Added ${newCount} beginner audio files to manifest`);
  console.log(`📊 Total phrases in manifest: ${Object.keys(manifest.phrases).length}`);
  console.log(`\nSample beginner entries:`);
  
  const samples = Object.entries(beginnerPhrases).slice(0, 5);
  for (const [phrase, file] of samples) {
    console.log(`  "${phrase}" → ${file}`);
  }
}

updateManifest();
