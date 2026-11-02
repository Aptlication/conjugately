import assert from "node:assert/strict";
import { ADVANCED_PHRASES, ADVANCED_UNITS, advancedUnit, lexFor } from "./advanced/content";
import { tokenize, keysIn } from "./advanced/tokenize";
import { soundAlikeKey } from "./soundAlike";
import { LEVEL_VERBS } from "./levels";

/**
 * Advanced A rules (Jonathan, 31 Oct – 2 Nov 2026). Run: npx tsx shared/advanced.test.ts
 *  - every word in every article can be tapped and saved (has a gloss);
 *  - each unit has one verb, not taught in an earlier level, none repeated;
 *  - verb quiz: 10 questions, 3 présent, 3 passé composé, 2 futur simple, 2 imparfait,
 *    on the unit verb, one right answer, three wrong, inversion for questions;
 *  - conversation: 5 replies on the unit verb in 5 different tenses, 3 wrong options each;
 *  - no wrong option sounds like the right one or another option; no -rai/-rais pairs.
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
  check(u.keyWords.length === 8, p("eight key words"));

  // Unit verb
  check(!taught.has(u.verb), p(`verb ${u.verb} is already taught in an earlier level`));
  check(!seenVerbs.has(u.verb), p(`verb ${u.verb} used by an earlier unit`));
  seenVerbs.add(u.verb);
  check(hasVerb(u.text, u.verb), p(`verb ${u.verb} not found in the article`));

  // Verb quiz
  const tenses = u.quiz.map((q) => q.tense).join(",");
  check(tenses === "Présent,Présent,Présent,Passé composé,Passé composé,Passé composé,Futur simple,Futur simple,Imparfait,Imparfait", p(`quiz tenses ${tenses}`));
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
  check(new Set(ys.map((y) => y.tense)).size === 5, p("five different tenses in the replies"));
  check(new Set(ys.map((y) => y.person.replace(/^(il|elle|on)$/, "il").replace(/^(ils|elles)$/, "ils"))).size >= 4, p("at least four persons"));
  for (const [i, y] of ys.entries()) {
    check(y.accept[0] === y.fr, p(`reply ${i + 1}: accept list starts with the answer`));
    check(y.options.length === 3, p(`reply ${i + 1}: three wrong options`));
    check(y.options.every((o) => !y.accept.includes(o)), p(`reply ${i + 1}: a wrong option is accepted`));
    check(hasVerb(y.fr, u.verb), p(`reply ${i + 1}: uses ${u.verb}`));
    for (const c of soundClashes([y.fr, ...y.options])) problems.push(p(`reply ${i + 1}: ${c}`));
  }
  for (const t of turns) if (t.who === "app" && /\?/.test(t.fr)) check(!/est-ce que/i.test(t.fr), p(`Cécile uses est-ce que: ${t.fr}`));
}
check(ADVANCED_UNITS.length === 10, "ten units");
check(advancedUnit("1.1")?.verb === "visiter", "1.1 verb is visiter");

const pieces = tokenize("Il vaudrait mieux faire un état des lieux.", ADVANCED_PHRASES).filter((x) => x.kind === "word");
assert.deepEqual(pieces.map((x) => x.text), ["Il vaudrait mieux", "faire", "un", "état des lieux"]);
assert.equal(lexFor("1.2", "personne")?.en, "nobody");

if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log("advanced: all assertions passed");
