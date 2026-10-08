import assert from "node:assert/strict";
import { coinsForScore, awardQuiz, emptyCoinState, coinBalance, examGate, unlockExam, tenseProgress, parseCoinState } from "./coins";

// Jonathan's examples (15/20 Beginner corrected from 27 to 26)
assert.equal(coinsForScore("Beginner", 20), 34);
assert.equal(coinsForScore("Beginner", 10), 17);
assert.equal(coinsForScore("Beginner", 15), 26);
assert.equal(coinsForScore("Novice", 20), 25);
assert.equal(coinsForScore("Novice", 13), 16);   // 16.25
assert.equal(coinsForScore("Novice", 2), 3);     // 2.5 -> 3
assert.equal(coinsForScore("Elementary", 20), 20);
assert.equal(coinsForScore("Intermediate", 19), 19);
assert.equal(coinsForScore("Advanced", 20), 0);

// improvement only
let s = emptyCoinState();
let a = awardQuiz(s, "Beginner", "Present", "être", 15); assert.equal(a.earned, 26); assert.ok(a.firstFinish);
a = awardQuiz(a.state, "Beginner", "Present", "être", 12); assert.equal(a.earned, 0);
a = awardQuiz(a.state, "Beginner", "Present", "être", 20); assert.equal(a.earned, 8); assert.equal(coinBalance(a.state), 34);
// non-course verb earns nothing
assert.equal(awardQuiz(a.state, "Beginner", "Present", "aller", 20).earned, 0);

// gate: needUnits -> needCoins -> canUnlock -> unlocked
s = a.state;
assert.equal(examGate(s, "Beginner", "Present").kind, "needUnits");
s = awardQuiz(s, "Beginner", "Present", "avoir", 20).state;
s = awardQuiz(s, "Beginner", "Present", "faire", 10).state; // 34+34+17 = 85
assert.equal(coinBalance(s), 85);
const g = examGate(s, "Beginner", "Present"); assert.equal(g.kind, "needCoins"); assert.equal((g as any).short, 15);
assert.equal(unlockExam(s, "Beginner", "Present"), null);
s = awardQuiz(s, "Beginner", "Present", "faire", 20).state; // 102
assert.equal(examGate(s, "Beginner", "Present").kind, "canUnlock");
s = unlockExam(s, "Beginner", "Present")!;
assert.equal(coinBalance(s), 2);
assert.equal(examGate(s, "Beginner", "Present").kind, "unlocked");
assert.equal(unlockExam(s, "Beginner", "Present"), s); // free retake, no double charge
assert.equal(coinBalance(s), 2);

// grandfathered
assert.equal(examGate(emptyCoinState(), "Novice", "Past", [{examId:"novice-past",correct:1,total:40,passed:false,date:""}]).kind, "unlocked");
// totals
for (const [lvl, tot] of [["Beginner",102],["Novice",100],["Elementary",140],["Intermediate",360]] as const) {
  let t = emptyCoinState();
  for (const v of (await import("./exams")).EXAM_VERB_SETS[lvl]) t = awardQuiz(t, lvl, "Future", v, 20).state;
  assert.equal(coinBalance(t), tot, lvl); assert.ok(tenseProgress(t, lvl, "Future").complete);
}
assert.deepEqual(parseCoinState("garbage"), null);
assert.equal(coinBalance(parseCoinState(JSON.stringify(s))!), 2);
console.log("coins: all assertions passed");
