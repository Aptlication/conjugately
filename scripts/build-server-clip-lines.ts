/**
 * Lists every server-hosted clip the quizzes need (5 Nov 2026):
 *   - verbs/<slug>.mp3, verbs/<slug>-pp.mp3   the infinitive and participle (1.5)
 *   - verbs/forms/<slug>.mp3                  every verb form a quiz can test ("je prendrai")
 *   - quizzes/advanced/<unit>/questions/Q<n>.mp3   the Advanced quiz's English question
 *
 *   npx tsx scripts/build-server-clip-lines.ts      writes scripts/data/server-clip-lines.json
 *
 * Then record (needs ELEVENLABS_API_KEY; or run the "Record quiz clips" workflow on GitHub):
 *   node scripts/record-server-clips.mjs
 * Clips land in attached_assets/audio/ and are served once the server is deployed.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BEGINNER_PRONOUN_QUESTIONS } from "../server/beginner-pronoun-data";
import { NOVICE_QUIZ_DATA } from "../server/novice-quiz-data";
import { ELEMENTARY_PRESENT_QUESTIONS, ELEMENTARY_PASSE_COMPOSE_QUESTIONS, ELEMENTARY_FUTURE_SIMPLE_QUESTIONS } from "../server/elementary-quiz-data";
import { INTERMEDIATE_QUIZ_DATA } from "../server/intermediate-quiz-data";
import { IMPARFAIT_QUIZ_DATA } from "../server/imparfait-quiz-data";
import { PLUPERFECT_QUIZ_DATA } from "../server/pluperfect-quiz-data";
import { ADVANCED_UNITS } from "../shared/advanced/content";
import { allPronunciationClips } from "../shared/verbPronunciation";
import { formClip, formOf } from "../shared/verbForms";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AUDREY = "McVZB9hVxVSk3Equu8EH"; // the vocab cards' voice
const PETER = "t4fHUMAMZxaaV2inHOnb"; // the quiz questions' voice

type Line = { file: string; voiceId: string; lang: "fr" | "en"; text: string };
const lines: Line[] = [];
const seen = new Set<string>();
const add = (l: Line) => { if (!seen.has(l.file)) { seen.add(l.file); lines.push(l); } };

// 1. Infinitives and participles.
for (const [f, t] of allPronunciationClips()) add({ file: `verbs/${f}`, voiceId: AUDREY, lang: "fr", text: t });

// 2. Every form any quiz answer tests (each answer on its own, so any 20 of a pool are covered).
const TENSE: Record<string, string> = { present: "Présent", "passé_composé": "Passé Composé", passe_compose: "Passé Composé",
  futur_simple: "Futur Simple", imparfait: "Imparfait", plus_que_parfait: "Plus-que-parfait" };
const correct = (q: any): string | undefined => q.answerOptions ? q.answerOptions.find((o: any) => o.isCorrect)?.text : q.options?.["ABCD".indexOf(q.answer)];
const wrongs = (q: any): string[] => q.answerOptions ? q.answerOptions.filter((o: any) => !o.isCorrect).map((o: any) => o.text)
  : (q.options ?? []).filter((_: string, i: number) => i !== "ABCD".indexOf(q.answer));
const sets: [string, string, any[]][] = [];
for (const src of [BEGINNER_PRONOUN_QUESTIONS, NOVICE_QUIZ_DATA, INTERMEDIATE_QUIZ_DATA] as any[])
  for (const [v, byT] of Object.entries<any>(src)) for (const [t, qs] of Object.entries<any>(byT)) sets.push([v, TENSE[t] ?? t, qs]);
for (const [src, t] of [[ELEMENTARY_PRESENT_QUESTIONS, "Présent"], [ELEMENTARY_PASSE_COMPOSE_QUESTIONS, "Passé Composé"], [ELEMENTARY_FUTURE_SIMPLE_QUESTIONS, "Futur Simple"]] as any)
  for (const [v, qs] of Object.entries<any>(src)) sets.push([v, t, qs]);
for (const [v, qs] of Object.entries<any>(IMPARFAIT_QUIZ_DATA)) sets.push([v, "Imparfait", qs]);
for (const [v, qs] of Object.entries<any>(PLUPERFECT_QUIZ_DATA)) sets.push([v, "Plus-que-parfait", qs]);
for (const u of ADVANCED_UNITS) for (const q of u.quiz) sets.push([u.verb, q.tense, [{ answerOptions: [{ text: q.answer, isCorrect: true }, ...q.wrong.map((w) => ({ text: w, isCorrect: false }))] }]]);
let read = 0, unread = 0;
for (const [verb, tense, qs] of sets) for (const q of qs) {
  const a = correct(q);
  if (!a) continue;
  const f = formOf(a, verb, tense, wrongs(q));
  if (!f) { unread++; continue; }
  read++;
  add({ file: `verbs/${formClip(f.spoken)}`, voiceId: AUDREY, lang: "fr", text: f.spoken });
}

// 3. The Advanced quiz's English questions.
for (const u of ADVANCED_UNITS) u.quiz.forEach((q, i) => add({
  file: `quizzes/advanced/${u.id.replace(".", "_")}/questions/Q${i + 1}.mp3`, voiceId: PETER, lang: "en",
  text: q.tag ? `${q.en} (${q.tag})` : q.en,
}));

fs.mkdirSync(path.join(ROOT, "scripts/data"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "scripts/data/server-clip-lines.json"), JSON.stringify(lines, null, 1) + "\n");
const count = (p: string) => lines.filter((l) => l.file.startsWith(p)).length;
console.log(`server-clip-lines.json: ${lines.length} clips (${count("verbs/forms/")} verb forms from ${read} answers, ${unread} unread; ` +
  `${count("quizzes/advanced/")} Advanced English questions), ${lines.reduce((n, l) => n + l.text.length, 0)} characters`);
