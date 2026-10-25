/**
 * CEFR-style tests: coverage audit (1.3).
 *
 * Content rule (Jonathan, 25 Oct 2026): every test uses ONLY French already met in
 * that level's and earlier levels' quizzes, conversations and vocab checks.
 * This rebuilds the taught vocabulary from every bank and lists each test word the
 * course has never shown. Exit code 1 if any test goes over MAX_UNTAUGHT.
 *
 *   npx tsx scripts/audit-cefr-coverage.ts
 *
 * Names, numbers, days, months and times are allowed (ALLOWED below); they're
 * planned Novice content or proper nouns. Run this after editing shared/cefrTests.ts
 * or any question bank.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CEFR_IDS, CEFR_TESTS, type CefrTest } from "../shared/cefrTests";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAX_UNTAUGHT = 0.05;
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

type Tier = "Beginner" | "Novice" | "Elementary" | "Intermediate";
const TIERS: Tier[] = ["Beginner", "Novice", "Elementary", "Intermediate"];
const TEST_TIER: Record<string, Tier> = { A1: "Novice", A2: "Elementary", B1: "Intermediate" };

const ALLOWED = new Set([
  // numbers, times, days, months (planned Novice content)
  "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "vingt", "trente",
  "heure", "heures", "h", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche",
  // names and labels used in the tests
  "julie", "paul", "marc", "sam", "martin", "claire", "lucas", "sophie", "nice", "lyon", "paris", "leo", "léo", "julien", "b",
]);

function toks(t: string): string[] {
  return (t.toLowerCase().replace(/[’']/g, " ").match(/[a-zàâäçéèêëîïôöùûüÿœæ]+(?:-[a-zàâäçéèêëîïôöùûüÿœæ]+)*/g) ?? []);
}
const strings = (s: string, re: RegExp) => [...s.matchAll(re)].map((m) => m[1]);

/** Correct answers from a JSON-shaped bank ("options": [...], "answer": "B"). */
function jsonBankAnswers(file: string): string[] {
  const s = read(file);
  const body = s.slice(s.indexOf("= {") + 2).trim().replace(/;$/, "");
  const data = JSON.parse(body) as Record<string, { options: string[]; answer: string }[]>;
  return Object.values(data).flat().map((q) => q.options["ABCD".indexOf(q.answer)]);
}

function taughtByTier(): Record<Tier, string[]> {
  const t: Record<Tier, string[]> = { Beginner: [], Novice: [], Elementary: [], Intermediate: [] };
  const opts = (file: string) => {
    const s = read(file);
    const out: string[] = [];
    for (const m of s.matchAll(/"options":\s*\[([\s\S]*?)\]/g)) out.push(...strings(m[1], /"((?:[^"\\]|\\.)*)"/g));
    out.push(...strings(s, /\btext:\s*"((?:[^"\\]|\\.)*)"/g));
    return out;
  };
  t.Beginner.push(...opts("server/beginner-pronoun-data.ts"));
  t.Novice.push(...opts("server/novice-quiz-data.ts"));
  t.Elementary.push(...opts("server/elementary-quiz-data.ts"));
  t.Intermediate.push(...opts("server/intermediate-quiz-data.ts"));
  t.Intermediate.push(...jsonBankAnswers("server/pluperfect-quiz-data.ts"));
  t.Intermediate.push(...jsonBankAnswers("server/imparfait-quiz-data.ts"));
  for (const f of ["apps/mobile/lib/conversations.ts", "apps/mobile/lib/conversationWarmups.ts"]) {
    const parts = read(f).split(/\n\s*"((?:Beginner|Novice|Elementary|Intermediate)[^|"]*\|[^"]*)":/);
    for (let i = 1; i < parts.length; i += 2) {
      const tier = (parts[i].startsWith("Intermediate") ? "Intermediate" : parts[i].split("|")[0]) as Tier;
      t[tier].push(...strings(parts[i + 1], /"fr":\s*"((?:[^"\\]|\\.)*)"/g));
      for (const m of parts[i + 1].matchAll(/"accept":\s*\[([\s\S]*?)\]/g)) t[tier].push(...strings(m[1], /"((?:[^"\\]|\\.)*)"/g));
    }
  }
  for (const m of read("apps/mobile/lib/vocabCheck.ts").matchAll(/unit:\s*"(\w+)[^|"]*\|[^"]*",\s*fr:\s*"((?:[^"\\]|\\.)*)"/g)) {
    const tier = (m[1].startsWith("Intermediate") ? "Intermediate" : m[1]) as Tier;
    if (t[tier]) t[tier].push(m[2]);
  }
  return t;
}

function testStrings(test: CefrTest): string[] {
  const out: string[] = [];
  for (const d of test.listening) { out.push(d.script); for (const q of d.questions) out.push(q.fr, ...q.options); }
  for (const d of test.reading) { out.push(d.text); for (const q of d.questions) out.push(q.fr, ...q.options); }
  // Writing prompts are English where the French instruction words aren't taught; skip English ones.
  for (const w of test.writing) if (!/\b(you|your|the)\b/i.test(w.prompt)) out.push(w.prompt);
  for (const p of test.speaking) for (const it of p.items) { out.push(it.prompt); if (it.doc) out.push(it.doc); }
  return out;
}

const taught = taughtByTier();
let failed = false;
for (const id of CEFR_IDS) {
  const tier = TEST_TIER[id];
  const known = new Set(TIERS.slice(0, TIERS.indexOf(tier) + 1).flatMap((t) => taught[t].flatMap(toks)));
  const words = new Set(testStrings(CEFR_TESTS[id]).flatMap(toks));
  const unknown = [...words].filter((w) => !known.has(w) && !ALLOWED.has(w));
  const share = unknown.length / words.size;
  const ok = share <= MAX_UNTAUGHT;
  failed ||= !ok;
  console.log(`${ok ? "ok  " : "FAIL"} ${id} (${CEFR_TESTS[id].level}): ${words.size} words, ${unknown.length} untaught (${(share * 100).toFixed(1)}%)${unknown.length ? ": " + unknown.join(", ") : ""}`);
}
if (failed) { console.log(`\nA test is over ${MAX_UNTAUGHT * 100}% untaught words. Reword it with taught French, or teach the word first.`); process.exitCode = 1; }
