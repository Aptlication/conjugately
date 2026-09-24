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
    .replace(/[.,!?;:«»"]/g, " ")
    .replace(/\s+/g, " ").trim();

const tokens = (s) => norm(s).split(" ").filter(Boolean);

/**
 * Does the expected form appear in the option as WHOLE TOKENS?
 *
 * The first version of this check used String.includes(), which passes whenever
 * the option merely starts with the expected form — so "il diras ..." was
 * accepted for an expected "il dira". That is exactly the -s / -i / -ai
 * confusion the app exists to teach, so the check was blind precisely where it
 * mattered, and it let two misflagged questions through the first repair.
 */
function containsPhrase(haystack, needle) {
  const h = tokens(haystack), n = tokens(needle);
  if (!n.length) return false;
  outer: for (let i = 0; i + n.length <= h.length; i++) {
    for (let j = 0; j < n.length; j++) if (h[i + j] !== n[j]) continue outer;
    return true;
  }
  return false;
}

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

/**
 * Second shape. Intermediate and Novice store
 * {"question": "...", "options": [...], "answer": "A"} rather than
 * {text, isCorrect}. The original parser matched nothing in them, so it read
 * roughly 684 of ~2,760 questions while reporting a total that looked
 * complete — the same fault as the substring bug: a check that appeared to
 * pass because it never ran.
 */
function parseLetterQuestions(src) {
  const out = [];
  const lines = src.split("\n");
  const re = /\{"question":\s*"((?:[^"\\]|\\.)*)",\s*"options":\s*\[([^\]]*)\],\s*"answer":\s*"([A-D])"/;
  let verb = null, tense = null;
  lines.forEach((ln, i) => {
    let m = ln.match(/^\s{2}"([^"]+)":\s*\{/);
    if (m) { verb = m[1]; return; }
    m = ln.match(/^\s{4}"([^"]+)":\s*\[/);
    if (m) { tense = m[1]; return; }
    const e = ln.match(re);
    if (!e) return;
    const options = [];
    const optRe = /"((?:[^"\\]|\\.)*)"/g;
    let o;
    while ((o = optRe.exec(e[2])) !== null) options.push(o[1]);
    out.push({
      question: e[1],
      options,
      answerIndex: "ABCD".indexOf(e[3]),
      verb, tense,
      line: i + 1,
    });
  });
  return out;
}

/**
 * These datasets carry no `hint`, so the oracle that caught 1.1.4 and 1.1.5
 * is unavailable. The English question names the subject, though, so the
 * keyed French answer must agree in person — and a key pointing at the wrong
 * option almost always points at a different person. That is the same defect
 * class, caught a different way.
 */
const PERSON_WORDS = {
  je: ["je", "j"], tu: ["tu"], il: ["il"], elle: ["elle"],
  nous: ["nous", "on"], vous: ["vous"], ils: ["ils"], elles: ["elles"],
};

function frenchPersons(text) {
  // Split on anything that is not a letter, so inversion ("N'a-t-il pas")
  // and elision ("j'ai") both surface the pronoun as its own token.
  const toks = new Set(text.toLowerCase().split(/[^a-zà-ÿ]+/).filter(Boolean));
  const found = new Set();
  for (const [person, words] of Object.entries(PERSON_WORDS)) {
    if (words.some((w) => toks.has(w))) found.add(person);
  }
  return found;
}

function expectedPersons(englishQuestion) {
  const q = englishQuestion.toLowerCase();
  // Order matters: "we"/"they" before "you"/"I".
  if (/\bwe\b/.test(q)) return ["nous"];
  if (/\bthey\b/.test(q)) return /female|feminine/.test(q) ? ["elles"] : ["ils", "elles"];
  if (/\byou\b/.test(q)) {
    if (/informal/.test(q)) return ["tu"];
    if (/formal|plural/.test(q)) return ["vous"];
    return null; // genuinely ambiguous — do not guess
  }
  if (/\bi\b|\bi'm\b/.test(q)) return ["je"];
  if (/\bhe\b/.test(q)) return ["il"];
  if (/\bshe\b/.test(q)) return ["elle"];
  return null;
}

/**
 * Auxiliary agreement in the passé composé.
 *
 * Added 24 Sep after the subject oracle missed a keyed answer reading
 * "Nous sommes ouvert le même livre" — être as the auxiliary for ouvrir. Every
 * option in that question used nous, so person agreement said nothing. This is
 * the single most-taught rule in the tense, and a wrong key here teaches the
 * error directly.
 *
 * Reflexives always take être. Of the intransitive movement verbs that do, none
 * currently appear as a corpus verb, but the list is here so the check stays
 * right if one is added.
 */
const ETRE_VERBS = new Set([
  "aller", "venir", "revenir", "devenir", "arriver", "partir", "entrer",
  "rentrer", "sortir", "monter", "descendre", "rester", "tomber", "retourner",
  "naître", "mourir", "passer",
]);

function auxiliaryProblem(blockVerb, text) {
  const t = text.toLowerCase();
  const reflexive = /^s['’]|^se\s/.test(blockVerb);
  const wantsEtre = reflexive || ETRE_VERBS.has(blockVerb);
  const hasEtre = /\b(suis|es|est|sommes|êtes|sont)\b/.test(t);
  const hasAvoir = /\b(ai|as|a|avons|avez|ont)\b/.test(t);
  // Only judge when exactly one auxiliary family is present, and only when a
  // past participle plausibly follows — otherwise this fires on présent forms.
  if (hasEtre === hasAvoir) return null;
  if (hasEtre && !wantsEtre) return `uses être as the auxiliary, but "${blockVerb}" takes avoir`;
  if (hasAvoir && wantsEtre) return `uses avoir as the auxiliary, but "${blockVerb}" takes être`;
  return null;
}

const failures = [];
const warnings = [];
const positions = [0, 0, 0, 0];
let positionTotal = 0;
/** Correct-answer slot for each question, in file order, per dataset. */
const slotsByFile = {};
let checked = 0;
let parsed = 0;
let parsedLetter = 0;
let personChecked = 0;

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

    // 1b — duplicate option text. polishQuestions() in server/rationalePolish.ts
    //      dedupes options by lowercased text before they are served, so a
    //      duplicated distractor silently becomes a THREE-option question —
    //      a 33% guess rate instead of 25%, and visibly broken next to its
    //      neighbours.
    const optionTexts = q.options.map((o) => norm(o.text));
    if (new Set(optionTexts).size !== optionTexts.length) {
      failures.push(`${where}: duplicate option text — will be served as ${new Set(optionTexts).size} options, not ${q.options.length} — "${q.question}"`);
    }

    // 2 — the correct answer is not always in the same slot.
    if (q.options.length === 4) {
      const slot = q.options.findIndex((o) => o.isCorrect);
      positions[slot]++;
      positionTotal++;
      (slotsByFile[rel] ||= []).push(slot);
    }

    // 3 — the flagged option matches the form the hint names.
    const colon = q.hint.lastIndexOf(":");
    const expected = colon >= 0 ? q.hint.slice(colon + 1).trim() : "";
    const usable = expected && tokens(expected).length <= 5;
    if (usable && !ORACLE_EXCEPTIONS.has(q.question)) {
      checked++;
      if (!containsPhrase(trues[0].text, expected)) {
        const match = q.options.filter((o) => containsPhrase(o.text, expected));
        failures.push(
          `${where}: isCorrect on the wrong option — hint says "${norm(expected)}", ` +
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

  // ---- the same questions asked of the letter-keyed shape ----
  for (const q of parseLetterQuestions(src)) {
    parsedLetter++;
    const where = `${rel}:${q.line}`;

    // 1L — the answer letter has to point at an option that exists.
    if (q.answerIndex < 0 || q.answerIndex >= q.options.length) {
      failures.push(`${where}: answer letter is out of range for ${q.options.length} options — "${q.question}"`);
      continue;
    }

    // 2L — four options, or the guess rate is wrong.
    if (q.options.length !== 4) {
      failures.push(`${where}: ${q.options.length} options, expected 4 — "${q.question}"`);
    }

    // 3L — duplicate distractors collapse to a three-option question.
    const norms = q.options.map(norm);
    if (new Set(norms).size !== norms.length) {
      failures.push(`${where}: duplicate option text — will be served as ${new Set(norms).size} options — "${q.question}"`);
    }

    // 4L — slot distribution, same counters as the hint-keyed data.
    if (q.options.length === 4) {
      positions[q.answerIndex]++;
      positionTotal++;
      (slotsByFile[rel] ||= []).push(q.answerIndex);
    }

    // 6L — auxiliary agreement, passé composé only. The subject oracle is
    //      blind here: every option in the question that prompted this check
    //      used "nous", so person agreement had nothing to say, while the key
    //      pointed at "Nous sommes ouvert" — être for a verb that takes avoir.
    if (q.tense && /passé_composé|passe_compose/i.test(q.tense) && q.verb) {
      const aux = auxiliaryProblem(q.verb, q.options[q.answerIndex]);
      if (aux) {
        failures.push(`${where}: keyed answer ${aux} — "${q.options[q.answerIndex]}"`);
      }
    }

    // 5L — subject agreement. No hint field here, so the 1.1.5 oracle is
    //      unavailable; the English subject is the oracle instead. A key on
    //      the wrong option nearly always lands on a different person.
    const want = expectedPersons(q.question);
    const keyed = q.options[q.answerIndex];
    if (want && keyed) {
      const got = frenchPersons(keyed);
      if (got.size > 0) {
        personChecked++;
        if (!want.some((w) => got.has(w))) {
          const better = q.options.filter((o) => want.some((w) => frenchPersons(o).has(w)));
          failures.push(
            `${where}: subject disagreement — English wants ${want.join(" or ")}, ` +
            `keyed option is "${keyed}"` +
            (better.length === 1 ? `, should be "${better[0]}"` : "")
          );
        }
      }
    }
  }
}

// 5 — position distribution across the whole corpus. Chi-square against
//     uniform, 3 degrees of freedom, p = 0.001 → 16.27. Generous on purpose:
//     this catches "the answer is always A", not ordinary lumpiness.
//
//     CHANGED 24 Sep, and the reasoning matters. This was a FAILURE and it
//     passed only because the corpus it could parse happened to be uniform.
//     Once the parser reached Intermediate — 61% slot A — it would have gone
//     red, and the tempting fix is to loosen the threshold until it passes.
//     That would leave a check that means nothing.
//
//     The honest position is the one check 6 already documents: source skew
//     is not visible to a learner because shuffleAnswerOptions randomises
//     option order at serve time. So skew is reported as a warning, per
//     dataset rather than pooled (pooling let blocks cancel each other out,
//     which is exactly how the 13 September miss happened) — and the shuffle
//     it depends on is promoted from an assumption to check 7, which DOES
//     fail the build. The protection is now real rather than nominal.
let chi = 0;
if (positionTotal > 0) {
  const expectedPer = positionTotal / 4;
  chi = positions.reduce((sum, n) => sum + (n - expectedPer) ** 2 / expectedPer, 0);
}
for (const [file, slots] of Object.entries(slotsByFile)) {
  if (slots.length < 40) continue;
  const counts = [0, 0, 0, 0];
  for (const slot of slots) counts[slot]++;
  const per = slots.length / 4;
  const x2 = counts.reduce((sum, n) => sum + (n - per) ** 2 / per, 0);
  if (x2 > 16.27) {
    const worst = Math.max(...counts);
    warnings.push(
      `${file}: correct-answer position is not uniform — A/B/C/D = ${counts.join("/")} ` +
      `of ${slots.length} (chi-square ${x2.toFixed(2)}); always picking slot ` +
      `${"ABCD"[counts.indexOf(worst)]} would score ${Math.round((worst / slots.length) * 100)}% ` +
      `if options were served unshuffled`
    );
  }
}

// 6 — position distribution WITHIN one quiz, which is what a learner actually
//     sees. Check 5 alone is not enough, and on 13 September it said the
//     corpus was fine while the live Elementary dire futur quiz put the
//     correct answer in slot A for 17 of 20 questions — always pressing A
//     scored 85%. Blocks that lean the other way cancelled it out in the
//     corpus total. Questions are authored and served in contiguous
//     per-verb, per-tense runs of 20, so that run is the unit that matters.
const QUIZ_LENGTH = 20;
for (const [file, slots] of Object.entries(slotsByFile)) {
  for (let start = 0; start + QUIZ_LENGTH <= slots.length; start += QUIZ_LENGTH) {
    const counts = [0, 0, 0, 0];
    for (const slot of slots.slice(start, start + QUIZ_LENGTH)) counts[slot]++;
    const worst = Math.max(...counts);
    // Half of one quiz in a single slot is well past anything chance produces
    // (expected 5 of 20) and is enough for a learner to notice the pattern.
    if (worst > QUIZ_LENGTH / 2) {
      // A WARNING, not a failure. `shuffleAnswerOptions` in server/routes.ts
      // randomises option order on every response, so source skew is not
      // visible to a learner and rewriting the datasets would buy nothing.
      // This becomes load-bearing again the moment that shuffle is removed,
      // which is why it still reports.
      warnings.push(
        `${file}: questions ${start + 1}-${start + QUIZ_LENGTH} put the correct answer ` +
        `in slot ${"ABCD"[counts.indexOf(worst)]} ${worst} times out of ${QUIZ_LENGTH} — ` +
        `always picking that slot would score ${Math.round((worst / QUIZ_LENGTH) * 100)}% ` +
        `if options were served unshuffled`
      );
    }
  }
}

// 7 — the shuffle is load-bearing, so its removal must break the build.
//     Every position warning above is tolerable ONLY because option order is
//     randomised at the response boundary. If someone deletes that call, the
//     Intermediate data alone hands a learner 61% for pressing A.
const routesFile = join(repoRoot, "server/routes.ts");
if (!existsSync(routesFile)) {
  failures.push("server/routes.ts: missing — cannot verify answer shuffling");
} else {
  const routes = readFileSync(routesFile, "utf8");
  const polishCalls = (routes.match(/polishQuestions\s*\(/g) || []).length;
  const shuffled = (routes.match(/shuffleAnswerOptions\s*\(\s*polishQuestions\s*\(/g) || []).length;
  if (polishCalls === 0) {
    failures.push("server/routes.ts: no polishQuestions call found — the response boundary has moved, so this check no longer proves anything");
  } else if (shuffled !== polishCalls) {
    failures.push(
      `server/routes.ts: ${shuffled} of ${polishCalls} question responses are shuffled. ` +
      `Every polishQuestions(...) must be wrapped in shuffleAnswerOptions(...) — ` +
      `the answer-position warnings above are only tolerable because of it`
    );
  }
}

console.log(`quiz-data validation — ${parsed + parsedLetter} questions parsed ` +
  `(${parsed} hint-keyed, ${parsedLetter} letter-keyed), ` +
  `${checked} answer keys checked against hints, ${personChecked} against subject agreement`);
if (positionTotal) {
  const pct = positions.map((n) => ((n / positionTotal) * 100).toFixed(1) + "%");
  console.log(`  correct-answer position: A ${pct[0]}  B ${pct[1]}  C ${pct[2]}  D ${pct[3]}  (chi-square ${chi.toFixed(2)})`);
}

if (warnings.length) {
  console.warn(`\n${warnings.length} warning(s) — not build-breaking:\n`);
  for (const w of warnings) console.warn("  " + w);
}

if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}

console.log("  all checks passed");
