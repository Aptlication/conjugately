#!/usr/bin/env node
// Generates the 1.3 post-quiz conversation clips (the app's lines) with ElevenLabs.
//
// Usage (from the repo root, in Git Bash):
//   ELEVENLABS_API_KEY=your_key node scripts/generate-conversation-audio.mjs
//
// Options:
//   --dry-run        list what would be generated, call nothing
//   --only=BEG_etre  only lines whose file name starts with this
//   --force          regenerate files that already exist
//   --lines=FILE     record the lines in FILE instead (same JSON shape)
//
// Re-running is safe: clips that already exist are skipped, so an interrupted
// run picks up where it stopped.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
// --lines=<file> records another list, e.g. the 1.2.3 warm-ups:
//   node scripts/generate-conversation-audio.mjs --lines=scripts/data/conversation-warmup-lines.json
const linesArg = (process.argv.slice(2).find((a) => a.startsWith("--lines=")) || "").slice(8);
const LINES = linesArg ? path.resolve(linesArg) : path.join(here, "data", "conversation-app-lines.json");
const OUT_DIR = path.join(here, "..", "apps", "mobile", "assets", "audio", "conversations");
const MODEL = "eleven_multilingual_v2";
const FORMAT = "mp3_44100_128";
const CONCURRENCY = 4;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");
const only = (args.find((a) => a.startsWith("--only=")) || "").slice(7);

const key = process.env.ELEVENLABS_API_KEY;
if (!key && !dryRun) {
  console.error("Set ELEVENLABS_API_KEY first, e.g.\n  ELEVENLABS_API_KEY=xxxx node scripts/generate-conversation-audio.mjs");
  process.exit(1);
}

const lines = JSON.parse(fs.readFileSync(LINES, "utf8")).filter((l) => !only || l.file.startsWith(only));
fs.mkdirSync(OUT_DIR, { recursive: true });

const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

async function voiceIds() {
  const res = await fetch("https://api.elevenlabs.io/v1/voices", { headers: { "xi-api-key": key } });
  if (!res.ok) throw new Error(`Could not list voices: ${res.status} ${await res.text()}`);
  const { voices } = await res.json();
  const wanted = [...new Set(lines.map((l) => l.voice))];
  const map = {};
  for (const name of wanted) {
    const v = voices.find((x) => norm(x.name) === norm(name)) || voices.find((x) => norm(x.name).startsWith(norm(name.split(" - ")[0])));
    if (!v) throw new Error(`Voice "${name}" is not in My Voices. Add it in ElevenLabs, then run again.`);
    map[name] = v.voice_id;
  }
  return map;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tts(voiceId, text, attempt = 1) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${FORMAT}`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text, model_id: MODEL }),
  });
  if (res.ok) return Buffer.from(await res.arrayBuffer());
  if ((res.status === 429 || res.status >= 500) && attempt < 5) {
    await sleep(1500 * attempt);
    return tts(voiceId, text, attempt + 1);
  }
  throw new Error(`${res.status} ${await res.text()}`);
}

async function main() {
  const todo = lines.filter((l) => force || !fs.existsSync(path.join(OUT_DIR, l.file)));
  console.log(`${lines.length} lines, ${todo.length} to generate, ${todo.reduce((n, l) => n + l.french.length, 0)} characters.`);
  if (dryRun) {
    for (const l of todo) console.log(`${l.file}  [${l.voice}]  ${l.french}`);
    return;
  }
  const ids = await voiceIds();
  let done = 0, failed = 0;
  const queue = [...todo];
  async function worker() {
    for (let l = queue.shift(); l; l = queue.shift()) {
      try {
        const mp3 = await tts(ids[l.voice], l.french);
        fs.writeFileSync(path.join(OUT_DIR, l.file), mp3);
        done++;
        console.log(`ok   ${String(done).padStart(3)}/${todo.length}  ${l.file}`);
      } catch (e) {
        failed++;
        console.log(`FAIL ${l.file}: ${e.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  const manifest = Object.fromEntries(lines.map((l) => [l.file.replace(/\.mp3$/, ""), { voice: l.voice, french: l.french, english: l.english }]));
  fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 1));
  console.log(`\nDone: ${done} generated, ${failed} failed. Clips are in apps/mobile/assets/audio/conversations.`);
  if (failed) console.log("Run the same command again to retry the failed ones.");
}

main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
