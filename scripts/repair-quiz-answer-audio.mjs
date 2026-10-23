#!/usr/bin/env node
// Repairs quiz ANSWER audio after quiz text changes (1.2.3, 23 Oct 2026).
// The app finds an answer's recording by its exact text in
// attached_assets/tts-manifest.json, so editing a sentence — even adding the
// French space before "?" — leaves it silent.
//
//   node scripts/repair-quiz-answer-audio.mjs              # re-link + report (no API calls)
//   ELEVENLABS_API_KEY=xxx node scripts/repair-quiz-answer-audio.mjs --record
//
// 1. Re-link (always, free): an option whose text differs from a recorded one
//    only in spacing/punctuation-spacing/case reuses that recording.
// 2. --record: records every CORRECT answer still without audio, in the level's
//    own voice (Elementary: Audrey, Intermediate: Peter — same as
//    server/scripts/generate-*-audio.ts), and adds it to the manifest.
// Re-running is safe: anything already linked or recorded is skipped.
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = path.join(ROOT, "attached_assets", "tts-manifest.json");
const AUDIO = path.join(ROOT, "attached_assets", "audio");
const RECORD = process.argv.includes("--record");
const KEY = process.env.ELEVENLABS_API_KEY;
if (RECORD && !KEY) { console.error("Set ELEVENLABS_API_KEY to record."); process.exit(1); }

const LEVELS = [
  { name: "Elementary", map: "elementary_phrases", prefix: "elem_", voice: "McVZB9hVxVSk3Equu8EH", file: "server/elementary-quiz-data.ts" },
  { name: "Intermediate", map: "intermediate_phrases", prefix: "intr_", voice: "t4fHUMAMZxaaV2inHOnb", file: "server/intermediate-quiz-data.ts" },
];

const norm = (t) => t.trim().replace(/[‘’`´]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ");
const loose = (t) => norm(t).replace(/\s+([?!.,;:])/g, "$1").toLowerCase();
const hash = (t) => createHash("sha256").update(t).digest("hex").slice(0, 16);

function questions(level) {
  const src = fs.readFileSync(path.join(ROOT, level.file), "utf8");
  const out = [];
  if (level.name === "Intermediate") {
    for (const line of src.split("\n")) {
      if (!line.includes('"question"')) continue;
      try { const o = JSON.parse(line.trim().replace(/,$/, "")); out.push({ correct: o.options["ABCD".indexOf(o.answer)], options: o.options }); } catch {}
    }
  } else {
    for (const m of src.matchAll(/answerOptions: \[([\s\S]*?)\]/g)) {
      const opts = [...m[1].matchAll(/text: "((?:[^"\\]|\\.)*)", rationale: "(?:[^"\\]|\\.)*", isCorrect: (true|false)/g)]
        .map((x) => ({ t: JSON.parse(`"${x[1]}"`), ok: x[2] === "true" }));
      if (opts.length) out.push({ correct: opts.find((o) => o.ok)?.t, options: opts.map((o) => o.t) });
    }
  }
  return out;
}

async function tts(voice, text, attempt = 1) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
    method: "POST",
    headers: { "xi-api-key": KEY, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text, model_id: "eleven_multilingual_v2", voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
  });
  if (r.ok) return Buffer.from(await r.arrayBuffer());
  if ((r.status === 429 || r.status >= 500) && attempt < 5) { await new Promise((s) => setTimeout(s, 1500 * attempt)); return tts(voice, text, attempt + 1); }
  throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 200)}`);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const save = () => fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2), "utf8");
let linked = 0, recorded = 0, failed = 0;

for (const level of LEVELS) {
  const lm = (manifest[level.map] ||= {});
  const maps = [lm, manifest.phrases || {}];
  const has = (t) => maps.some((m) => m[t] || m[norm(t)] || Object.prototype.hasOwnProperty.call(m, norm(t)));
  const byNorm = new Set(maps.flatMap((m) => Object.keys(m).map(norm)));
  const byLoose = new Map();
  for (const m of maps) for (const [k, v] of Object.entries(m)) if (!byLoose.has(loose(k)) && fs.existsSync(path.join(AUDIO, v))) byLoose.set(loose(k), v);

  const qs = questions(level);
  const allText = new Set(qs.flatMap((q) => q.options));
  // 1. re-link spacing-only differences
  for (const t of allText) {
    if (byNorm.has(norm(t)) || has(t)) continue;
    const f = byLoose.get(loose(t));
    if (f) { lm[t] = f; byNorm.add(norm(t)); linked++; }
  }
  save();
  // 2. correct answers still silent
  const silent = [...new Set(qs.map((q) => q.correct).filter(Boolean))].filter((t) => !byNorm.has(norm(t)));
  const chars = silent.reduce((n, t) => n + t.length, 0);
  console.log(`${level.name}: ${qs.length} questions · re-linked so far ${linked} · correct answers still silent: ${silent.length} (${chars} characters)`);
  if (!RECORD) { silent.slice(0, 8).forEach((t) => console.log("   silent:", t)); continue; }
  let i = 0;
  const worker = async () => {
    while (i < silent.length) {
      const t = silent[i++];
      const fileName = `${level.prefix}${hash(t)}.mp3`;
      try {
        if (!fs.existsSync(path.join(AUDIO, fileName))) fs.writeFileSync(path.join(AUDIO, fileName), await tts(level.voice, t));
        lm[t] = fileName; recorded++;
        if (recorded % 25 === 0) { save(); console.log(`   recorded ${recorded}…`); }
      } catch (e) { failed++; console.log(`   FAILED: ${t} — ${e.message}`); }
    }
  };
  await Promise.all([worker(), worker(), worker()]);
  save();
}
console.log(`\nDone. Re-linked ${linked} spacing-only answers to existing recordings; recorded ${recorded}; failed ${failed}.`);
if (!RECORD) console.log("Run again with --record and ELEVENLABS_API_KEY to record the silent correct answers.");
