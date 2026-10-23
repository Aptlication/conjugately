#!/usr/bin/env node
// Tests every post-quiz conversation (and the vocab-check word bank) using the
// app's real modules, transpiled on the fly. Run before every build:
//   node scripts/test-conversations.mjs
// Exit code 1 if anything fails.
//
// Born of TestFlight 48 (23 Oct 2026): conversations with a warm-up looped on
// their first line ("Bonjour, bonjour…") because getConversation returned a new
// object on every render. Check 2 below catches exactly that.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MOBILE = path.join(ROOT, "apps", "mobile");
const req = createRequire(path.join(MOBILE, "package.json"));
const ts = req("typescript");

// ── tiny TS module loader: relative .ts, "@shared/*", .mp3 → file path ──────
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const mod = { exports: {} };
  cache.set(file, mod);
  const src = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const localRequire = (spec) => {
    if (spec.endsWith(".mp3")) return path.resolve(path.dirname(file), spec);
    if (spec.startsWith("@shared/")) return load(path.join(ROOT, "shared", spec.slice(8) + ".ts"));
    if (spec.startsWith(".")) {
      const base = path.resolve(path.dirname(file), spec);
      for (const c of [base + ".ts", base + ".tsx", path.join(base, "index.ts")]) if (fs.existsSync(c)) return load(c);
    }
    if (spec === "@react-native-async-storage/async-storage") return { default: { getItem: async () => null, setItem: async () => {} } };
    return req(spec);
  };
  new Function("require", "module", "exports", src)(localRequire, mod, mod.exports);
  return mod.exports;
}

const full = load(path.join(MOBILE, "lib", "conversationsFull.ts"));
const { COURSES, COURSE_TIME_FRAMES } = load(path.join(MOBILE, "lib", "courses.ts"));
const { normaliseFrench, similarity } = load(path.join(ROOT, "shared", "answerMatch.ts"));
const { CHECK_WORDS } = load(path.join(MOBILE, "lib", "vocabCheck.ts"));
const CLEAR = 0.75; // conversation.tsx
const EXPECTED_TURNS = { Beginner: 5, Novice: 5, Elementary: 7, Intermediate: 9 };

const fails = [];
const fail = (unit, msg) => fails.push(`${unit}: ${msg}`);
let units = 0, appLines = 0, replies = 0;
const seenAudio = new Map();

for (const [level, course] of Object.entries(COURSES)) {
  for (const tf of COURSE_TIME_FRAMES) {
    for (const { verb } of course.units) {
      const unit = `${level}|${tf}|${verb}`;
      units++;
      // 1. exists
      const conv = full.getConversation(level, tf, verb);
      if (!conv) { fail(unit, "no conversation"); continue; }
      // 2. same object every time (a new object restarts the dialogue in a loop)
      if (full.getConversation(level, tf, verb) !== conv) fail(unit, "getConversation returns a NEW object each call — the screen will loop on line 1");
      // 3. shape: app first and last, strictly alternating, expected length
      const who = conv.turns.map((t) => t.who);
      if (who.length !== EXPECTED_TURNS[level]) fail(unit, `${who.length} turns, expected ${EXPECTED_TURNS[level]}`);
      who.forEach((w, i) => { if (w !== (i % 2 === 0 ? "app" : "you")) fail(unit, `turn ${i + 1} is "${w}", expected ${i % 2 === 0 ? "app" : "you"}`); });
      if (who[who.length - 1] !== "app") fail(unit, "does not end on an app line");
      // 4. audio for every app line: key mapped, file present and non-trivial, not shared with another line
      conv.turns.forEach((t, i) => {
        if (!t.fr || !t.en) fail(unit, `turn ${i + 1} missing fr/en`);
        if (t.who !== "app") return;
        appLines++;
        const f = full.CONVERSATION_AUDIO[t.audio];
        if (!f) return fail(unit, `turn ${i + 1} audio "${t.audio}" not bundled (plays silently)`);
        if (!fs.existsSync(f) || fs.statSync(f).size < 1000) fail(unit, `turn ${i + 1} audio file missing/empty: ${path.basename(String(f))}`);
        if (seenAudio.has(t.audio) && seenAudio.get(t.audio) !== `${unit}#${i}`) fail(unit, `audio key ${t.audio} also used by ${seenAudio.get(t.audio)}`);
        seenAudio.set(t.audio, `${unit}#${i}`);
      });
      // 5. every reply is reachable: its model answer and each accepted answer clear the bar
      conv.turns.forEach((t, i) => {
        if (t.who !== "you") return;
        replies++;
        if (!t.accept?.length) return fail(unit, `turn ${i + 1} has no accepted answers`);
        if (!t.accept.includes(t.fr)) fail(unit, `turn ${i + 1} model answer not in accept list`);
        const score = Math.max(...t.accept.map((a) => similarity(normaliseFrench(t.fr), normaliseFrench(a))));
        if (score < CLEAR) fail(unit, `turn ${i + 1} model answer scores ${score.toFixed(2)} < ${CLEAR}`);
      });
      // 6. simulate the screen: app lines play once each, replies answered with the model answer, ends "done"
      let step = 0, plays = 0, guard = 0;
      while (step < conv.turns.length && guard++ < 50) {
        const again = full.getConversation(level, tf, verb); // a re-render
        if (again !== conv) { fail(unit, "re-render changed the conversation: line would restart"); break; }
        const t = conv.turns[step];
        if (t.who === "app") plays++;
        step++;
      }
      if (plays !== who.filter((w) => w === "app").length) fail(unit, `simulated playthrough played ${plays} lines`);
    }
  }
}

// ── vocab check word bank ──────────────────────────────────────────────────
const unitKeys = new Set(Object.entries(COURSES).flatMap(([l, c]) => COURSE_TIME_FRAMES.flatMap((tf) => c.units.map((u) => `${l}|${tf}|${u.verb}`.normalize("NFC")))));
const ids = new Set(), frs = new Set(), emo = new Set();
for (const w of CHECK_WORDS) {
  const u = `vocab ${w.id}`;
  if (!unitKeys.has(w.unit.normalize("NFC"))) fail(u, `unit "${w.unit}" is not a course unit (never shown)`);
  if (ids.has(w.id)) fail(u, "duplicate id"); ids.add(w.id);
  if (frs.has(w.fr)) fail(u, `duplicate word "${w.fr}"`); frs.add(w.fr);
  if (emo.has(w.emoji)) fail(u, `duplicate emoji ${w.emoji}`); emo.add(w.emoji);
  const opts = [w.en, ...w.distractors];
  if (new Set(opts).size !== 4) fail(u, `options not 4 distinct: ${opts.join(" / ")}`);
}

console.log(`Conversations: ${units} course units, ${appLines} app lines, ${replies} replies checked.`);
console.log(`Vocab check: ${CHECK_WORDS.length} words checked.`);
if (fails.length) {
  console.log(`\n${fails.length} FAILURE(S):`);
  fails.forEach((f) => console.log("  ✗ " + f));
  process.exit(1);
}
console.log("All checks passed.");
