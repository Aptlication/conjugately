import assert from "node:assert/strict";
import { markAdvanced, advancedPrompt, fallbackAdvanced } from "./advancedMark";
import { advancedUnit } from "../shared/advanced/content";

const u = advancedUnit("1.1")!;
// The model's verdict is used as given.
const ok = await markAdvanced({ unitId: "1.1", q: 1, answer: "c'est quelqu'un qui paie le loyer" },
  async () => '{"understood": true, "feedback": "Clear and correct.", "corrected": "C\'est quelqu\'un qui paie le loyer."}');
assert.deepEqual(ok, { understood: true, feedback: "Clear and correct.", corrected: "C'est quelqu'un qui paie le loyer.", marking: "ai" });
// A broken reply falls back to the key-word check.
const fb = await markAdvanced({ unitId: "1.1", q: 1, answer: "il paie le loyer" }, async () => "sorry");
assert.equal(fb?.marking, "fallback");
assert.equal(fb?.understood, true);
assert.equal(fallbackAdvanced(u.questions[1], "je ne sais pas").understood, false);
// Unknown questions are refused.
assert.equal(await markAdvanced({ unitId: "9.9", q: 0, answer: "x" }, async () => "{}"), null);
// The prompt carries the article, the question and the transcript.
const p = advancedPrompt(u, u.questions[5], "J'aimerais habiter à Lyon.");
assert.ok(p.includes(u.text) && p.includes(u.questions[5].fr) && p.includes("open personal question"));
console.log("advancedMark: all assertions passed");
