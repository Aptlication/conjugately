/**
 * Audit for Tense Conversations (the end-of-tense "set" conversations, plan of 31 Oct 2026).
 * Run: npx tsx scripts/audit-tense-conversations.ts
 *
 * The weave rules (approved by Jonathan, 31 Oct 2026):
 *  - every verb of the tense is used in at least 2 of the learner's replies
 *    (Intermediate A, 11 verbs: at least 1);
 *  - no two learner replies in a row use the same verb;
 *  - at least 4 different persons across the replies;
 *  - predominantly in the tense: at most 2 callback replies to an earlier
 *    tense of the same level, at least 75% of replies in the tense itself,
 *    and no callbacks in a level's first tense;
 *  - at most 3 new words;
 *  - four spoken options per reply, as for the unit conversations: 3 wrong
 *    answers, none sounding like the right one or each other, no -rai/-rais pairs.
 */
import { readFileSync } from "node:fs";
import { soundAlikeKey } from "../shared/soundAlike";
import { LEVEL_VERBS, timeFramesFor, type Level } from "../shared/levels";

type You = { who: "you"; fr: string; en: string; verb: string; person: string; callback?: string; accept: string[]; options: string[] };
type Turn = { who: "app"; fr: string; en: string } | You;
type TC = { title: string; verbs: string[]; newWords: { fr: string; en: string }[]; turns: Turn[] };

const data: Record<string, TC> = JSON.parse(readFileSync(process.argv[2] || "scripts/data/tense-conversations.json", "utf8"));
const problems: string[] = [];
const persons = (p: string) => p.replace(/^(il|elle|on)$/, "il/elle").replace(/^(ils|elles)$/, "ils/elles");

for (const [key, c] of Object.entries(data)) {
  const [level, tf] = key.split("|");
  const p = (m: string) => problems.push(`${key}: ${m}`);
  const levelVerbs = LEVEL_VERBS[level as Level];
  if (!levelVerbs) { p("unknown level"); continue; }
  const tfs = timeFramesFor(level);
  if (!tfs.includes(tf as any)) p(`unknown time frame ${tf}`);
  if (c.verbs.join() !== levelVerbs.join()) p(`verbs ${c.verbs} ≠ level verbs ${levelVerbs}`);

  const ys = c.turns.filter((t): t is You => t.who === "you");
  const main = ys.filter((y) => !y.callback);
  const cbs = ys.filter((y) => y.callback);
  const min = levelVerbs.length >= 11 ? 1 : 2;
  for (const v of levelVerbs) {
    const n = main.filter((y) => y.verb === v).length;
    if (n < min) p(`${v} used ${n}× in the tense (needs ${min})`);
  }
  ys.forEach((y, i) => { if (i && ys[i - 1].verb === y.verb) p(`back-to-back ${y.verb}: "${ys[i - 1].fr}" → "${y.fr}"`); });
  const ps = new Set(main.map((y) => persons(y.person)));
  if (ps.size < 4) p(`only ${ps.size} persons (${[...ps]})`);
  if (cbs.length > 2) p(`${cbs.length} callbacks (max 2)`);
  if (cbs.length && tf === tfs[0]) p("callback in the level's first tense");
  for (const y of cbs) if (tfs.indexOf(y.callback as any) < 0 || tfs.indexOf(y.callback as any) >= tfs.indexOf(tf as any)) p(`callback "${y.fr}" is not to an earlier tense`);
  if (main.length / ys.length < 0.75) p(`only ${Math.round((100 * main.length) / ys.length)}% in the tense`);
  if (c.newWords.length > 3) p(`${c.newWords.length} new words (max 3)`);
  if (c.turns[0].who !== "app" || c.turns[c.turns.length - 1].who !== "app") p("must open and close with the app");

  for (const y of ys) {
    if (!y.accept.includes(y.fr)) p(`"${y.fr}" missing from its own accept list`);
    if (y.options.length !== 3) p(`"${y.fr}" needs 3 wrong options`);
    const all = [y.fr, ...y.options];
    const keys = all.map(soundAlikeKey);
    if (new Set(keys).size !== keys.length) p(`options sound alike: ${all.join(" | ")}`);
    if (new Set(keys.map((k) => k.replace(/rɛ\b/g, "rai"))).size !== keys.length) p(`-rai/-rais pair: ${all.join(" | ")}`);
    for (const o of y.options) if (y.accept.includes(o)) p(`wrong option "${o}" is also accepted`);
  }
  console.log(`${key.padEnd(18)} ${ys.length} replies (${cbs.length} callback) · persons ${[...ps].join(", ")} · ${c.newWords.length} new words`);
}
if (problems.length) { console.error("\n" + problems.join("\n")); process.exit(1); }
console.log("\ntense conversations: all weave rules pass");
