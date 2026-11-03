#!/usr/bin/env node
// Records the pronunciation-button clips (item 1.5): each verb's infinitive and,
// where it sounds different, its past participle (66 short clips), into
// attached_assets/audio/verbs/<slug>.mp3 and <slug>-pp.mp3 on the server.
// The list lives in shared/verbPronunciation.ts. Same voice as the vocab cards (Audrey).
//   node scripts/record-verb-pronunciation.mjs --dry-run
//   ELEVENLABS_API_KEY=xxx node scripts/record-verb-pronunciation.mjs
// Re-running is safe: clips already recorded are skipped (--force redoes them).
// Then commit, push and run the deploy hook so the server serves them.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MOBILE = path.join(ROOT, "apps", "mobile");
const req = createRequire(path.join(MOBILE, "package.json"));
const ts = req("typescript");
const OUT = path.join(ROOT, "attached_assets", "audio", "verbs");
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
const { allPronunciationClips } = load(path.join(ROOT, "shared", "verbPronunciation.ts"));
fs.mkdirSync(OUT, { recursive: true });
const all = allPronunciationClips();
const todo = all.filter(([f]) => FORCE || !fs.existsSync(path.join(OUT, f)));
console.log(`${all.length} clips · to record: ${todo.length}`);
if (DRY) { todo.forEach(([f, t]) => console.log(`  ${f}  ${t}`)); process.exit(0); }

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
    const [f, text] = todo[i++];
    try { fs.writeFileSync(path.join(OUT, f), await tts(text)); ok++; }
    catch (e) { failed++; console.log(`  FAILED ${f} (${text}): ${e.message}`); }
  }
};
await Promise.all([worker(), worker(), worker()]);
console.log(`Done: ${ok} recorded, ${failed} failed. Files are in attached_assets/audio/verbs.`);
