#!/usr/bin/env node
// Records the French word for every vocab-check card (397), one clip per word id,
// into attached_assets/audio/vocab/<id>.mp3 on the server. The app plays it as
// each card appears. Same voice as the Elementary quiz answers (Audrey).
//   node scripts/record-vocab-audio.mjs --dry-run
//   ELEVENLABS_API_KEY=xxx node scripts/record-vocab-audio.mjs
// Re-running is safe: words already recorded are skipped (--force redoes them).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MOBILE = path.join(ROOT, "apps", "mobile");
const req = createRequire(path.join(MOBILE, "package.json"));
const ts = req("typescript");
const OUT = path.join(ROOT, "attached_assets", "audio", "vocab");
const VOICE = "McVZB9hVxVSk3Equu8EH"; // Audrey
const DRY = process.argv.includes("--dry-run"), FORCE = process.argv.includes("--force");
const KEY = process.env.ELEVENLABS_API_KEY;
if (!DRY && !KEY) { console.error("Set ELEVENLABS_API_KEY (or use --dry-run)."); process.exit(1); }

const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const mod = { exports: {} }; cache.set(file, mod);
  const src = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const r = (spec) => {
    if (spec.startsWith("@shared/")) return load(path.join(ROOT, "shared", spec.slice(8) + ".ts"));
    if (spec.startsWith(".")) { const b = path.resolve(path.dirname(file), spec); for (const c of [b + ".ts", b + ".tsx"]) if (fs.existsSync(c)) return load(c); }
    if (spec === "@react-native-async-storage/async-storage") return { default: { getItem: async () => null, setItem: async () => {} } };
    return req(spec);
  };
  new Function("require", "module", "exports", src)(r, mod, mod.exports);
  return mod.exports;
}
const { CHECK_WORDS } = load(path.join(MOBILE, "lib", "vocabCheck.ts"));
fs.mkdirSync(OUT, { recursive: true });
const todo = CHECK_WORDS.filter((w) => FORCE || !fs.existsSync(path.join(OUT, `${w.id}.mp3`)));
console.log(`${CHECK_WORDS.length} words · to record: ${todo.length} (${todo.reduce((n, w) => n + w.fr.length, 0)} characters)`);
if (DRY) { todo.slice(0, 10).forEach((w) => console.log(`  ${w.id}.mp3  ${w.fr}`)); process.exit(0); }

async function tts(text, attempt = 1) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`, {
    method: "POST", headers: { "xi-api-key": KEY, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text, model_id: "eleven_multilingual_v2", language_code: "fr", voice_settings: { stability: 0.6, similarity_boost: 0.75 } }),
  });
  if (r.ok) return Buffer.from(await r.arrayBuffer());
  if ((r.status === 429 || r.status >= 500) && attempt < 5) { await new Promise((s) => setTimeout(s, 1500 * attempt)); return tts(text, attempt + 1); }
  throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 200)}`);
}
let i = 0, ok = 0, failed = 0;
const worker = async () => {
  while (i < todo.length) {
    const w = todo[i++];
    try { fs.writeFileSync(path.join(OUT, `${w.id}.mp3`), await tts(w.fr)); ok++; if (ok % 25 === 0) console.log(`  recorded ${ok}…`); }
    catch (e) { failed++; console.log(`  FAILED ${w.id} (${w.fr}): ${e.message}`); }
  }
};
await Promise.all([worker(), worker(), worker()]);
console.log(`Done: ${ok} recorded, ${failed} failed. Files are in attached_assets/audio/vocab.`);
