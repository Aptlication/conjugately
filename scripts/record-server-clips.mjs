#!/usr/bin/env node
// Records the clips listed in scripts/data/server-clip-lines.json (made by
// scripts/build-server-clip-lines.ts) with ElevenLabs, into attached_assets/audio/.
//   node scripts/record-server-clips.mjs --dry-run
//   ELEVENLABS_API_KEY=xxx node scripts/record-server-clips.mjs
// Re-running is safe: clips already recorded are skipped (--force redoes them).
// Then commit, push to main, and the server serves them once it has deployed.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "attached_assets", "audio");
const DRY = process.argv.includes("--dry-run"), FORCE = process.argv.includes("--force");
const only = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7);
const KEY = process.env.ELEVENLABS_API_KEY;
if (!DRY && !KEY) { console.error("Set ELEVENLABS_API_KEY (or use --dry-run)."); process.exit(1); }

const lines = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/data/server-clip-lines.json"), "utf8"))
  .filter((l) => !only || l.file.startsWith(only));
const todo = lines.filter((l) => FORCE || !fs.existsSync(path.join(OUT, l.file)));
console.log(`${lines.length} clips · to record: ${todo.length} · ${todo.reduce((n, l) => n + l.text.length, 0)} characters`);
if (DRY) { todo.slice(0, 60).forEach((l) => console.log(`  ${l.file}  [${l.lang}]  ${l.text}`)); if (todo.length > 60) console.log(`  … and ${todo.length - 60} more`); process.exit(0); }

const SETTINGS = { fr: { stability: 0.6, similarity_boost: 0.75 }, en: { stability: 0.5, similarity_boost: 0.75 } };
async function tts(l, attempt = 1) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${l.voiceId}?output_format=mp3_44100_128`, {
    method: "POST", headers: { "xi-api-key": KEY, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text: l.text, model_id: "eleven_multilingual_v2", language_code: l.lang, voice_settings: SETTINGS[l.lang] }),
  });
  if (r.ok) return Buffer.from(await r.arrayBuffer());
  if ((r.status === 429 || r.status >= 500) && attempt < 6) { await new Promise((s) => setTimeout(s, 1500 * attempt)); return tts(l, attempt + 1); }
  throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 200)}`);
}
let i = 0, ok = 0, failed = 0;
const worker = async () => {
  while (i < todo.length) {
    const l = todo[i++];
    try {
      const file = path.join(OUT, l.file);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, await tts(l)); ok++;
      if (ok % 50 === 0) console.log(`  ${ok} recorded…`);
    } catch (e) { failed++; console.log(`  ❌ ${l.file} (${l.text}): ${e.message}`); }
  }
};
await Promise.all([worker(), worker(), worker()]);
console.log(`Done: ${ok} recorded, ${failed} failed. Files are in attached_assets/audio/.`);
if (failed) process.exitCode = 1;
