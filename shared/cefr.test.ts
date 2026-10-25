import assert from "node:assert/strict";
import { CEFR_IDS, CEFR_TESTS, cefrTestForLevel } from "./cefrTests";
import {
  fallbackSpeaking, fallbackWriting, mcqScore, mergeCefrResult, normaliseForMarking,
  outcome, rubricLinePasses, sectionMaxima, type CefrResult,
} from "./cefrScoring";
import { cefrCoinCost, cefrGate, cefrPrerequisiteExamIds, unlockCefrTest, cefrUnlockId } from "./cefrCoins";
import { emptyCoinState } from "./coins";
import type { ExamResult } from "./exams";

// --- content shape: every section adds up to 25, every MCQ has a valid answer
for (const id of CEFR_IDS) {
  const t = CEFR_TESTS[id];
  const max = sectionMaxima(t);
  assert.deepEqual(max, { listening: 25, reading: 25, writing: 25, speaking: 25 }, `${id} section maxima`);
  for (const d of [...t.listening, ...t.reading]) for (const q of d.questions) {
    assert.ok(q.answer >= 0 && q.answer < q.options.length, `${id} ${d.id} answer index`);
    assert.equal(new Set(q.options).size, q.options.length, `${id} ${d.id} duplicate options`);
  }
  const mcqs = (docs: { questions: unknown[] }[]) => docs.reduce((n, d) => n + d.questions.length, 0);
  assert.equal(mcqs(t.listening), 10, `${id} listening has 10 questions`);
  assert.equal(mcqs(t.reading), 10, `${id} reading has 10 questions`);
  for (const w of t.writing) {
    if (!w.text) continue;
    const sum = w.text.lengthPoints + w.text.rubric.reduce((n, l) => n + l.points, 0) + (w.form ? w.form.pointsPerField * w.form.fields.length : 0);
    assert.equal(sum, w.max, `${id} ${w.id} rubric adds up to its max`);
  }
}

// --- the model answer for each test's last writing task earns every rubric line
for (const id of CEFR_IDS) {
  const t = CEFR_TESTS[id];
  const task = t.writing[t.writing.length - 1];
  const n = normaliseForMarking(t.model.text);
  for (const line of task.text!.rubric) assert.ok(rubricLinePasses(line, n), `${id} model answer misses "${line.label}"`);
}

// --- level mapping
assert.equal(cefrTestForLevel("Novice")?.id, "A1");
assert.equal(cefrTestForLevel("Elementary")?.id, "A2");
assert.equal(cefrTestForLevel("Intermediate B")?.id, "B1");
assert.equal(cefrTestForLevel("Intermediate A"), undefined);
assert.equal(cefrTestForLevel("Beginner"), undefined);

// --- MCQ scoring: 10 questions share 25 points
const a1 = CEFR_TESTS.A1;
const allRight: Record<string, number> = {};
for (const d of a1.listening) d.questions.forEach((q, i) => { allRight[`${d.id}-${i}`] = q.answer; });
assert.equal(mcqScore(a1.listening, allRight), 25);
assert.equal(mcqScore(a1.listening, {}), 0);

// --- pass rule: 50 overall AND 5 in every section
assert.equal(outcome({ listening: 25, reading: 25, writing: 0, speaking: 0 }).passed, false);   // 50, but two sections under 5
assert.equal(outcome({ listening: 12.5, reading: 12.5, writing: 12.5, speaking: 12.5 }).passed, true);
assert.equal(outcome({ listening: 20, reading: 20, writing: 5, speaking: 4.5 }).passed, false);
assert.deepEqual(outcome({ listening: 20, reading: 20, writing: 5, speaking: 4.5 }).weak, ["speaking"]);
assert.equal(outcome({ listening: 30, reading: 25, writing: 25, speaking: 25 }).total, 100);      // clamped

// --- fallback marking: empty answers score nothing; the model answer scores well
assert.equal(fallbackWriting(a1, { fields: {}, texts: {} }), 0);
assert.equal(fallbackSpeaking(a1, {}), 0);
const lastA1 = a1.writing[a1.writing.length - 1];
assert.equal(fallbackWriting(a1, { fields: {}, texts: { [lastA1.id]: a1.model.text } }), lastA1.max);

// --- results keep the best attempt; a pass is never lost
const r = (total: number, passed: boolean): CefrResult => ({ testId: "A1", scores: { listening: 0, reading: 0, writing: 0, speaking: 0 }, total, passed, marking: "ai", takenAt: "x" });
let res = mergeCefrResult([], r(40, false));
res = mergeCefrResult(res, r(60, true));
res = mergeCefrResult(res, r(70, false));   // impossible in practice, still never replaces a pass
assert.equal(res.length, 1); assert.equal(res[0].passed, true); assert.equal(res[0].total, 60);

// --- price: twice one Final Level Exam of the level
assert.equal(cefrCoinCost("A1"), 100);
assert.equal(cefrCoinCost("A2"), 140);
assert.equal(cefrCoinCost("B1"), 140);

// --- unlock: every Final Level Exam of the level first, then coins, then free retakes
assert.equal(cefrPrerequisiteExamIds("A1").length, 3);
assert.equal(cefrPrerequisiteExamIds("A2").length, 3);
assert.equal(cefrPrerequisiteExamIds("B1").length, 5);
const passAll = (id: "A1" | "A2" | "B1"): ExamResult[] =>
  cefrPrerequisiteExamIds(id).map((examId) => ({ examId, correct: 1, total: 1, passed: true, date: "x" }));
let coins = { ...emptyCoinState(), earned: 500 };
assert.equal(cefrGate(coins, "A1", []).kind, "examsFirst");
assert.equal(cefrGate(coins, "A1", passAll("A1").slice(0, 2)).kind, "examsFirst");
assert.equal(cefrGate({ ...emptyCoinState(), earned: 99 }, "A1", passAll("A1")).kind, "needCoins");
assert.equal(cefrGate(coins, "A1", passAll("A1")).kind, "canUnlock");
assert.equal(unlockCefrTest(coins, "A1", []), null);
const after = unlockCefrTest(coins, "A1", passAll("A1"))!;
assert.equal(after.spent, 100);
assert.ok(after.unlockedExams.includes(cefrUnlockId("A1")));
assert.equal(cefrGate(after, "A1", []).kind, "unlocked");            // retakes free, even with no results on this device
assert.equal(unlockCefrTest(after, "A1", passAll("A1"))!.spent, 100); // never charged twice

console.log("cefr tests: all passed");
