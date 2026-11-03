// Pronunciation button (1.5). Run: npx tsx shared/verbPronunciation.test.ts
import assert from "node:assert/strict";
import { LEVEL_VERBS } from "./levels";
import { ADVANCED_UNITS } from "./advanced/content";
import { VERB_SOUNDS, allPronunciationClips, pronunciationFor, verbSlug } from "./verbPronunciation";

// Every verb the app teaches has a sound.
const verbs = new Set<string>([...Object.values(LEVEL_VERBS).flat(), ...ADVANCED_UNITS.map((u) => u.verb)]);
assert.deepEqual([...verbs].filter((v) => !VERB_SOUNDS[v.normalize("NFC")]), []);

// The infinitive; the participle only in the compound past tenses, and only where it sounds different.
const say = (v: string, t: string) => pronunciationFor(v, t).map((x) => x.text);
assert.deepEqual(say("prendre", "Présent"), ["prendre"]);
assert.deepEqual(say("prendre", "Passé Composé"), ["prendre", "pris"]);
assert.deepEqual(say("prendre", "Plus-que-parfait"), ["prendre", "pris"]);
assert.deepEqual(say("prendre", "Imparfait"), ["prendre"]);
assert.deepEqual(say("prendre", "Futur Simple"), ["prendre"]);
assert.deepEqual(say("parler", "Passé composé"), ["parler"]);
assert.deepEqual(say("inconnu", "Présent"), []);

// File names are safe and unique.
assert.equal(verbSlug("s'intéresser"), "s-interesser");
const files = allPronunciationClips().map(([f]) => f);
assert.equal(new Set(files).size, files.length);

console.log(`verbPronunciation: ok (${verbs.size} verbs, ${files.length} clips)`);
