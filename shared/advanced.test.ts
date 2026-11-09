import assert from "node:assert/strict";
import { ADVANCED_PHRASES, ADVANCED_UNITS, advancedUnit, lexFor } from "./advanced/content";
import { tokenize, keysIn } from "./advanced/tokenize";
import { soundAlikeKey } from "./soundAlike";
import { LEVEL_VERBS } from "./levels";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Advanced A rules (Jonathan, 31 Oct – 9 Nov 2026). Run: npx tsx shared/advanced.test.ts
 *  - every word in every article can be tapped and saved (has a gloss);
 *  - each unit has one verb, not taught in an earlier level, none repeated;
 *  - verb quiz: 15 questions, 4 présent, 4 passé composé, 4 futur simple, 3 imparfait,
 *    on the unit verb, one right answer, three wrong, inversion for questions;
 *  - conversation: 5 replies on the unit verb covering the four tenses, 3 wrong options each;
 *  - no wrong option sounds like the right one or another option; no -rai/-rais pairs.
 * Theme 1 is practice (9 Nov 2026): it adds 8–10 words a unit, all of them in Mots, and
 * no new grammar. So in units 1.1–1.10:
 *  - every word in the reading, the conversation and the quiz is a Mot, the unit verb,
 *    or was met before (earlier levels, earlier units' Mots and quiz answers);
 *  - no conditionnel (it starts in Advanced B), except « je voudrais »;
 *  - short sentences: reading ≤ 11 words a sentence on average, learner lines ≤ 10 words,
 *    Cécile's lines ≤ 12 words.
 */
const problems: string[] = [];
const check = (ok: unknown, msg: string) => { if (!ok) problems.push(msg); };

const taught = new Set(Object.values(LEVEL_VERBS).flat());
const seenVerbs = new Set<string>();
const stem = (verb: string) => {
  const v = verb.replace(/^(se |s')/, "");
  // Enough of the verb to find it in any form: visit-, demand-, reç/recev/reçoi-, serv/ser-, viv/vécu/véc-, commenç/commenc-.
  const irregular: Record<string, string[]> = {
    recevoir: ["reç", "recev", "recevr", "reçoi"], servir: ["serv", "ser"], vivre: ["viv", "véc", "vécu", "vi"],
    commencer: ["commenc", "commenç"],
  };
  return irregular[v] ?? [v.replace(/(er|ir|re)$/, "")];
};
const hasVerb = (s: string, verb: string) => stem(verb).some((st) => s.toLowerCase().includes(st));

// ---- Words already met (Theme 1 practice check) ----
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const words = (t: string) => t.toLowerCase().replace(/[’']/g, " ").match(/[a-zàâäçéèêëîïôöùûüÿœæ]+(?:-[a-zàâäçéèêëîïôöùûüÿœæ]+)*/g) ?? [];
const met = new Set<string>();
const meet = (texts: string[]) => texts.forEach((t) => words(t).forEach((w) => met.add(w)));
const quoted = (s: string, re: RegExp) => [...s.matchAll(re)].map((m) => m[1]);
const src = (f: string) => fs.readFileSync(path.join(ROOT, f), "utf8");
for (const f of ["beginner-pronoun-data", "novice-quiz-data", "elementary-quiz-data", "intermediate-quiz-data", "pluperfect-quiz-data", "imparfait-quiz-data"]) {
  const s = src(`server/${f}.ts`);
  for (const m of s.matchAll(/"options":\s*\[([\s\S]*?)\]/g)) meet(quoted(m[1], /"((?:[^"\\]|\\.)*)"/g));
  meet(quoted(s, /\btext:\s*"((?:[^"\\]|\\.)*)"/g));
}
for (const f of ["conversations", "conversationWarmups"]) meet(quoted(src(`apps/mobile/lib/${f}.ts`), /"fr":\s*"((?:[^"\\]|\\.)*)"/g));
meet(quoted(src("apps/mobile/lib/vocabCheck.ts"), /fr:\s*"((?:[^"\\]|\\.)*)"/g));
// Little words every level uses that the banks happen not to spell out.
meet(["après sans plus tard avec pour dans sur sous chez entre vers depuis pendant aussi très trop bien mal déjà encore toujours souvent parfois jamais ici là oui non merci bonjour bonsoir salut madame monsieur mademoiselle au aux du des un une le la les et ou mais donc car si quand comme que qui quoi où comment pourquoi combien ce cet cette ces mon ma mes ton ta tes son sa ses notre nos votre vos leur leurs il elle ils elles on nous vous je tu me te se lui y en ne pas rien personne tout tous toute toutes alors puis enfin voici voilà d l j m t s n c qu"]);
/** A word's plain forms: plural, feminine, participle agreement, inversion. */
const formsOf = (w: string) => [w, w.replace(/s$/, ""), w.replace(/es$/, ""), w.replace(/e$/, ""), w.replace(/x$/, ""), w.replace(/aux$/, "al"), w.replace(/ées?$/, "é"), w.replace(/-(t-)?(il|elle|on|ils|elles|vous|nous|tu|je)$/, "")];
const COND = /\b\w+(rais|rait|rions|riez|raient)(-\w+)*\b/gi;
const NOT_COND = /^(voudrais|frais|vrai|mais|jamais|marais|anglais|français|lait|portrait|retrait|parfait|souhait)/i;
const conditionnel = (s: string) => (s.match(COND) ?? []).filter((x) => !NOT_COND.test(x));

/** Every pair of sentences that a listener could confuse. */
function soundClashes(all: string[]): string[] {
  const keys = all.map(soundAlikeKey);
  const out: string[] = [];
  for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
    if (keys[i] === keys[j]) out.push(`"${all[i]}" ~ "${all[j]}"`);
    else if (keys[i].replace(/rɛ\b/g, "rai") === keys[j].replace(/rɛ\b/g, "rai")) out.push(`-rai/-rais: "${all[i]}" ~ "${all[j]}"`);
  }
  return out;
}

for (const u of ADVANCED_UNITS) {
  const p = (m: string) => `${u.id}: ${m}`;
  // Reading
  const missing = keysIn(u.text, ADVANCED_PHRASES).filter((k) => !lexFor(u.id, k));
  check(!missing.length, p(`no gloss for ${missing.join(", ")}`));
  check(tokenize(u.text, ADVANCED_PHRASES).map((x) => x.text).join("") === u.text, p("tokenising changed the text"));
  check(u.keyWords.length >= 8 && u.keyWords.length <= 10, p("8 to 10 key words"));

  // Unit verb
  check(!taught.has(u.verb), p(`verb ${u.verb} is already taught in an earlier level`));
  check(!seenVerbs.has(u.verb), p(`verb ${u.verb} used by an earlier unit`));
  seenVerbs.add(u.verb);
  check(hasVerb(u.text, u.verb), p(`verb ${u.verb} not found in the article`));

  // Verb quiz
  const tenses = u.quiz.map((q) => q.tense).join(",");
  check(tenses === "Présent,Présent,Présent,Présent,Passé composé,Passé composé,Passé composé,Passé composé,Futur simple,Futur simple,Futur simple,Futur simple,Imparfait,Imparfait,Imparfait", p(`quiz tenses ${tenses}`));
  for (const [i, q] of u.quiz.entries()) {
    const all = [q.answer, ...q.wrong];
    check(q.wrong.length === 3, p(`quiz ${i + 1}: three wrong answers`));
    check(new Set(all).size === 4, p(`quiz ${i + 1}: options repeat`));
    check(all.every((s) => hasVerb(s, u.verb)), p(`quiz ${i + 1}: every option uses ${u.verb}`));
    if (/\?\s*$/.test(q.en)) check(!/est-ce que/i.test(q.answer) && /-\w+ /.test(q.answer.replace(/['’]/g, " ")), p(`quiz ${i + 1}: a question must be answered with inversion`));
    for (const c of soundClashes(all)) problems.push(p(`quiz ${i + 1}: ${c}`));
  }

  // Conversation
  const turns = u.conversation.turns;
  check(turns[0].who === "app" && turns[turns.length - 1].who === "app", p("conversation opens and closes with Cécile"));
  const ys = turns.filter((t) => t.who === "you") as Extract<typeof turns[number], { who: "you" }>[];
  check(ys.length === 5, p(`${ys.length} replies (want 5)`));
  check(["Présent", "Passé composé", "Futur simple", "Imparfait"].every((t) => ys.some((y) => y.tense === t)), p("the replies cover présent, passé composé, futur simple and imparfait"));
  check(ys.every((y) => ["Présent", "Passé composé", "Futur simple", "Imparfait"].includes(y.tense)), p("replies use only the four tenses practised"));
  check(new Set(ys.map((y) => y.person.replace(/^(il|elle|on)$/, "il").replace(/^(ils|elles)$/, "ils"))).size >= 4, p("at least four persons"));
  for (const [i, y] of ys.entries()) {
    check(y.accept[0] === y.fr, p(`reply ${i + 1}: accept list starts with the answer`));
    check(y.options.length === 3, p(`reply ${i + 1}: three wrong options`));
    check(y.options.every((o) => !y.accept.includes(o)), p(`reply ${i + 1}: a wrong option is accepted`));
    check(hasVerb(y.fr, u.verb), p(`reply ${i + 1}: uses ${u.verb}`));
    for (const c of soundClashes([y.fr, ...y.options])) problems.push(p(`reply ${i + 1}: ${c}`));
  }
  for (const t of turns) if (t.who === "app" && /\?/.test(t.fr)) check(!/est-ce que/i.test(t.fr), p(`Cécile uses est-ce que: ${t.fr}`));

  // Theme 1 is practice: nothing new but the Mots, no conditionnel, short sentences.
  if (u.id.startsWith("1.")) {
    const mots = new Set(u.keyWords.flatMap((k) => words(k.fr.replace(/\((e|s)\)/g, ""))));
    const here = new Set([...words(u.text), ...u.quiz.flatMap((q) => words(q.answer))]);
    const known = (w: string, extra?: Set<string>) => hasVerb(w, u.verb) || formsOf(w).some((f) => met.has(f) || mots.has(f) || extra?.has(f));
    const newIn = (texts: string[], extra?: Set<string>) => [...new Set(texts.flatMap(words))].filter((w) => !known(w, extra));
    const nr = newIn([u.text]);
    check(!nr.length, p(`reading words that are neither Mots nor met before: ${nr.join(", ")}`));
    const nq = newIn(u.quiz.map((q) => q.answer), here);
    check(!nq.length, p(`quiz words not met before: ${nq.join(", ")}`));
    const nc = newIn(turns.map((t) => t.fr), here);
    check(nc.length <= 2, p(`conversation words not met before: ${nc.join(", ")}`));
    const cond = conditionnel([u.text, ...turns.map((t) => t.fr), ...u.quiz.flatMap((q) => [q.answer, ...q.wrong]), ...ys.flatMap((y) => y.options)].join(" "));
    check(!cond.length, p(`conditionnel (starts in Advanced B): ${cond.join(", ")}`));
    const sentences = u.text.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ý«])/).length;
    check(words(u.text).length / sentences <= 11.5, p(`reading sentences average ${(words(u.text).length / sentences).toFixed(1)} words`));
    for (const t of turns) check(words(t.fr).length <= (t.who === "you" ? 10 : 12), p(`line too long: ${t.fr}`));
    check(!/conditionnel/i.test(u.grammar), p(`grammar label still says conditionnel`));
  }
  for (const w of u.keyWords) words(w.fr.replace(/\((e|s)\)/g, "")).forEach((x) => met.add(x));
  for (const q of u.quiz) words(q.answer).forEach((x) => met.add(x));
  words(u.verb).forEach((x) => met.add(x));
}
check(ADVANCED_UNITS.length === 10, "ten units");
check(advancedUnit("1.1")?.verb === "visiter", "1.1 verb is visiter");

const pieces = tokenize("Il vaudrait mieux faire un état des lieux.", ADVANCED_PHRASES).filter((x) => x.kind === "word");
assert.deepEqual(pieces.map((x) => x.text), ["Il vaudrait mieux", "faire", "un", "état des lieux"]);
assert.equal(lexFor("1.2", "personne")?.en, "nobody");

if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log("advanced: all assertions passed");
