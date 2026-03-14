import * as fs from 'fs';
import { BEGINNER_PRONOUN_QUESTIONS } from '../beginner-pronoun-data.js';
import { NOVICE_QUIZ_DATA } from '../novice-quiz-data.js';
import { ELEMENTARY_PRESENT_QUESTIONS, ELEMENTARY_PASSE_COMPOSE_QUESTIONS, ELEMENTARY_FUTURE_SIMPLE_QUESTIONS } from '../elementary-quiz-data.js';

const manifest = JSON.parse(fs.readFileSync('attached_assets/tts-manifest.json', 'utf8'));

function checkQ(difficulty: string, verb: string, tensePath: string, audioIndex: number): boolean {
  const p = `attached_assets/audio/quizzes/${difficulty}/${verb}/${tensePath}/questions/Q${audioIndex}.mp3`;
  return fs.existsSync(p) && fs.statSync(p).size > 0;
}

function checkA(phraseMap: Record<string, string>, text: string): boolean {
  const file = phraseMap[text];
  if (!file) return false;
  return fs.existsSync('attached_assets/audio/' + file);
}

let totalPass = 0, totalFail = 0;

// ── BEGINNER (Léa) ───────────────────────────────────────────────────────────
console.log('\n=== BEGINNER EXAM (Léa) — être, avoir, faire × 3 tenses ===');
{
  const verbs = ['être', 'avoir', 'faire'];
  const tenseMap = [
    ['Présent', 'present'],
    ['Passé Composé', 'passe_compose'],
    ['Futur Simple', 'futur_simple'],
  ];
  let qPass = 0, qFail = 0, aPass = 0, aFail = 0;
  const qFails: string[] = [], aFails: string[] = [];

  for (const verb of verbs) {
    for (const [tense, tensePath] of tenseMap) {
      const qs = ((BEGINNER_PRONOUN_QUESTIONS as any)[verb]?.[tense] || [])
        .map((q: any, i: number) => ({ ...q, audioIndex: i + 1 }));
      for (const q of qs) {
        if (checkQ('beginner', verb, tensePath, q.audioIndex)) qPass++;
        else { qFail++; if (qFails.length < 3) qFails.push(`${verb}/${tensePath}/Q${q.audioIndex}.mp3`); }
        for (const opt of (q.answerOptions || [])) {
          if (checkA(manifest.phrases, opt.text)) aPass++;
          else { aFail++; if (aFails.length < 3) aFails.push(opt.text.substring(0, 40)); }
        }
      }
    }
  }
  console.log(`  Questions: ${qPass} ✅  ${qFail} ❌${qFails.length ? '  → ' + qFails.join(' | ') : ''}`);
  console.log(`  Answers:   ${aPass} ✅  ${aFail} ❌${aFails.length ? '  → ' + aFails.join(' | ') : ''}`);
  totalPass += qPass + aPass; totalFail += qFail + aFail;
}

// ── NOVICE (Thomas) ──────────────────────────────────────────────────────────
console.log('\n=== NOVICE EXAM (Thomas) — être, avoir, faire, aller × 3 tenses ===');
{
  const verbs = ['être', 'avoir', 'faire', 'aller'];
  const tenseMap = [
    ['present', 'present'],
    ['passe_compose', 'passe_compose'],
    ['futur_simple', 'futur_simple'],
  ];
  let qPass = 0, qFail = 0, aPass = 0, aFail = 0;
  const qFails: string[] = [], aFails: string[] = [];

  for (const verb of verbs) {
    for (const [tenseKey, tensePath] of tenseMap) {
      const rawQs = (NOVICE_QUIZ_DATA as any)[verb]?.[tenseKey] || [];
      const qs = rawQs.map((q: any, i: number) => ({ ...q, audioIndex: i + 1 }));
      for (const q of qs) {
        if (checkQ('novice', verb, tensePath, q.audioIndex)) qPass++;
        else { qFail++; if (qFails.length < 3) qFails.push(`${verb}/${tensePath}/Q${q.audioIndex}.mp3`); }
        for (const optText of (q.options || [])) {
          if (checkA(manifest.novice_phrases, optText)) aPass++;
          else { aFail++; if (aFails.length < 3) aFails.push(String(optText).substring(0, 40)); }
        }
      }
    }
  }
  console.log(`  Questions: ${qPass} ✅  ${qFail} ❌${qFails.length ? '  → ' + qFails.join(' | ') : ''}`);
  console.log(`  Answers:   ${aPass} ✅  ${aFail} ❌${aFails.length ? '  → ' + aFails.join(' | ') : ''}`);
  totalPass += qPass + aPass; totalFail += qFail + aFail;
}

// ── ELEMENTARY (Audrey) ──────────────────────────────────────────────────────
console.log('\n=== ELEMENTARY EXAM (Audrey) — 7 verbs × 3 tenses ===');
{
  const verbs = ['besoin', 'dire', 'savoir', 'voir', 'pouvoir', 'venir', 'vouloir'];
  const tenseMap: [Record<string, any>, string, string][] = [
    [ELEMENTARY_PRESENT_QUESTIONS, 'Présent', 'present'],
    [ELEMENTARY_PASSE_COMPOSE_QUESTIONS, 'Passé Composé', 'passe_compose'],
    [ELEMENTARY_FUTURE_SIMPLE_QUESTIONS, 'Futur Simple', 'futur_simple'],
  ];
  let qPass = 0, qFail = 0, aPass = 0, aFail = 0;
  const qFails: string[] = [], aFails: string[] = [];

  for (const verb of verbs) {
    for (const [dataObj, , tensePath] of tenseMap) {
      const rawQs = dataObj[verb] || [];
      const qs = rawQs.map((q: any, i: number) => ({ ...q, audioIndex: q.audioIndex ?? (i + 1) }));
      for (const q of qs) {
        if (checkQ('elementary', verb, tensePath, q.audioIndex)) qPass++;
        else { qFail++; if (qFails.length < 3) qFails.push(`${verb}/${tensePath}/Q${q.audioIndex}.mp3`); }
        for (const opt of (q.answerOptions || [])) {
          if (checkA(manifest.elementary_phrases, opt.text)) aPass++;
          else { aFail++; if (aFails.length < 3) aFails.push(opt.text.substring(0, 40)); }
        }
      }
    }
  }
  console.log(`  Questions: ${qPass} ✅  ${qFail} ❌${qFails.length ? '  → ' + qFails.join(' | ') : ''}`);
  console.log(`  Answers:   ${aPass} ✅  ${aFail} ❌${aFails.length ? '  → ' + aFails.join(' | ') : ''}`);
  totalPass += qPass + aPass; totalFail += qFail + aFail;
}

console.log(`\n========================================`);
console.log(`GRAND TOTAL: ${totalPass} ✅  ${totalFail} ❌`);
if (totalFail === 0) console.log(`🎉 All exam audio files verified — ready to go!`);
else console.log(`⚠️  ${totalFail} issues need fixing`);
console.log(`========================================`);
