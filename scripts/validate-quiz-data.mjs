/**
 * Build-time validation for the curated quiz datasets.
 *
 *   node scripts/validate-quiz-data.mjs
 *
 * Exits non-zero on any failure, so it can go in CI or a pre-commit hook.
 *
 * Written 13 September 2026 after register item 1.1.4 turned out to be the
 * visible corner of something larger: ten questions in the Elementary `dire`
 * futur block had `isCorrect` on the wrong option. A learner who answered
 * correctly was marked wrong, and the app then displayed a wrong conjugation as
 * the right answer — and those questions feed the exams. It was reported as one
 * missing `-s`.
 *
 * The checks below are the cheap permanent guard against that whole class.
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const DATASETS = [
  "server/elementary-quiz-data.ts",
  "server/novice-quiz-data.ts",
  "server/intermediate-quiz-data.ts",
  "server/beginner-pronoun-data.ts",
];

/**
 * Questions whose hint does not literally contain the correct answer's wording,
 * verified by hand. Keep this list short and justify every entry.
 */
const ORACLE_EXCEPTIONS = new Set([
  // Hint says "elles ne disent pas" but the sentence uses "ne ... rien".
  // The flagged option is correct; only the hint's particle differs.
  "They (female group) do not say / are not saying anything.",
]);

const norm = (s) =>
  s.normalize("NFC").toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ").trim();

function parseQuestions(src) {
  const out = [];
  const blockRe = /\{\s*question:\s*"((?:[^"\\]|\\.)*)"\s*,\s*hint:\s*"((?:[^"\\]|\\.)*)"\s*,([\s\S]*?)\n\s*\}/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    const options = [];
    const optRe = /\{\s*text:\s*"((?:[^"\\]|\\.)*)"[^}]*?isCorrect:\s*(true|false)\s*\}/g;
    let o;
    while ((o = optRe.exec(m[3])) !== null) {
      options.push({ text: o[1], isCorrect: o[2] === "true" });
    }
    if (options.length) {
      out.push({
        question: m[1],
        hint: m[2],
        options,
        line: src.slice(0, m.index).split("\n").length,
      });
    }
  }
  return out;
}

const failures = [];
const positions = [0, 0, 0, 0];
let positionTotal = 0;
let checked = 0;
let parsed = 0;

for (const rel of DATASETS) {
  const file = join(repoRoot, rel);
  if (!existsSync(file)) {
    failures.push(`${rel}: dataset missing`);
    continue;
  }
  const src = readFileSync(file, "utf8");

  for (const q of parseQuestions(src)) {
    parsed++;
    const where = `${rel}:${q.line}`;

    // 1 — exactly one correct option.
    const trues = q.options.filter((o) => o.isCorrect);
    if (trues.length !== 1) {
      failures.push(`${where}: ${trues.length} options marked correct — "${q.question}"`);
      continue;
    }

    // 2 — the correct answer is not always in the same slot.
    if (q.options.length === 4) {
      positions[q.options.findIndex((o) => o.isCorrect)]++;
      positionTotal++;
    }

    // 3 — the flagged option matches the form the hint names.
    const colon = q.hint.lastIndexOf(":");
    const expected = colon >= 0 ? norm(q.hint.slice(colon + 1)) : "";
    const usable = expected && expected.split(" ").length <= 5;
    if (usable && !ORACLE_EXCEPTIONS.has(q.question)) {
      checked++;
      if (!norm(trues[0].text).includes(expected)) {
        const match = q.options.filter((o) => norm(o.text).includes(expected));
        failures.push(
          `${where}: isCorrect on the wrong option — hint says "${expected}", ` +
          `flagged "${trues[0].text}"` +
          (match.length === 1 ? `, should be "${match[0].text}"` : "")
        );
      }
    }

    // 4 — futur and conditionnel: the tu form ends in -s. Catches the
    //     copy-paste class that item 1.1.4 was reported as (an il or je form
    //     sitting in the tu slot), in both word orders.
    const correct = trues[0].text;
    if (/futur|conditionnel|future|conditional/i.test(q.hint)) {
      // Inversion puts the verb BEFORE the pronoun: "Auras-tu…", "Viendras-tu…".
      // Check the verb on the correct side of the hyphen, or the rule fires on
      // the object that follows ("tu besoin", "tu chez moi").
      const inverted = correct.match(/([a-zà-ÿ']+)-[Tt]u\b/i);
      if (inverted) {
        if (!inverted[1].endsWith("s")) {
          failures.push(`${where}: futur/conditionnel "${inverted[1]}-tu" does not end in -s — "${correct}"`);
        }
      } else {
        const tu = correct.match(/(?<![-\w])[Tt]u\s+(?:ne\s+)?([a-zà-ÿ']+)/i);
        if (tu && !tu[1].endsWith("s")) {
          failures.push(`${where}: futur/conditionnel "tu ${tu[1]}" does not end in -s — "${correct}"`);
        }
      }
    }
  }
}

// 5 — position distribution across the whole corpus. Chi-square against
//     uniform, 3 degrees of freedom, p = 0.001 → 16.27. Generous on purpose:
//     this catches "the answer is always A", not ordinary lumpiness.
let chi = 0;
if (positionTotal > 0) {
  const expectedPer = positionTotal / 4;
  chi = positions.reduce((sum, n) => sum + (n - expectedPer) ** 2 / expectedPer, 0);
  if (chi > 16.27) {
    failures.push(
      `correct-answer position is not uniform across the corpus: ` +
      `A/B/C/D = ${positions.join("/")}, chi-square ${chi.toFixed(2)} > 16.27`
    );
  }
}

console.log(`quiz-data validation — ${parsed} questions parsed, ${checked} answer keys checked`);
if (positionTotal) {
  const pct = positions.map((n) => ((n / positionTotal) * 100).toFixed(1) + "%");
  console.log(`  correct-answer position: A ${pct[0]}  B ${pct[1]}  C ${pct[2]}  D ${pct[3]}  (chi-square ${chi.toFixed(2)})`);
}

if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}

console.log("  all checks passed");
