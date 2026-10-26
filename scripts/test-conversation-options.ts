/**
 * Validator for Final Conversation four-option sets (1.3.16).
 * Run: npx tsx scripts/test-conversation-options.ts
 * Every set: 3 wrong answers, none equal to / sounding like the right one or each other,
 * no -rai/-rais near-pairs. Every key and model answer must exist in the dialogues.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CONVERSATION_OPTIONS } from "../apps/mobile/lib/conversationOptions";
import { soundAlikeKey } from "../shared/soundAlike";

// Read the learner replies straight from the generated files (they import audio,
// so they can't be loaded under node).
function replies(): Map<string, Set<string>> {
  const out = new Map<string, Set<string>>();
  const files = ["apps/mobile/lib/conversations.ts", "apps/mobile/lib/conversations125.ts", "apps/mobile/lib/conversationWarmups.ts"];
  for (const f of files) {
    const s = readFileSync(f, "utf8");
    let key = "";
    for (const line of s.split("\n")) {
      const k = line.match(/^\s*"([A-Za-z ]+\|[A-Za-z]+\|[^"]+)":\s*[\[{]/);
      if (k) { key = k[1].normalize("NFC"); if (!out.has(key)) out.set(key, new Set()); continue; }
      const y = line.match(/"fr":\s*"((?:[^"\\]|\\.)*)"/);
      if (y && key) out.get(key)!.add(JSON.parse(`"${y[1]}"`).normalize("NFC"));
    }
  }
  return out;
}

const known = replies();
let sets = 0;
const problems: string[] = [];
for (const [key, byReply] of Object.entries(CONVERSATION_OPTIONS)) {
  if (!known.has(key.normalize("NFC"))) problems.push(`unknown conversation ${key}`);
  for (const [right, wrong] of Object.entries(byReply)) {
    sets++;
    const where = `${key} · ${right}`;
    if (!known.get(key.normalize("NFC"))?.has(right.normalize("NFC"))) problems.push(`${where}: not a line in this conversation`);
    if (wrong.length !== 3) problems.push(`${where}: needs 3 wrong answers, has ${wrong.length}`);
    const all = [right, ...wrong];
    const keys = all.map(soundAlikeKey);
    if (new Set(keys).size !== keys.length) problems.push(`${where}: two options sound alike → ${all.filter((_, i) => keys.indexOf(keys[i]) !== i).join(" | ")}`);
    const near = keys.map((k) => k.replace(/rɛ\b/g, "rai"));
    if (new Set(near).size !== near.length) problems.push(`${where}: -rai / -rais near-pair`);
  }
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log(`conversation options: ${sets} reply sets OK`);
