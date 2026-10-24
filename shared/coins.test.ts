import assert from "node:assert/strict";
import { coinsForScore, awardQuiz, emptyCoinState, coinBalance, examGate, unlockExam, tenseProgress, parseCoinState, examCoinCost, courseCoinTotal } from "./coins";

// Jonathan's examples (15/20 Beginner corrected from 27 to 26)
assert.equal(coinsForScore("Beginner", 20), 34);
assert.equal(coinsForScore("Beginner", 10), 17);
assert.equal(coinsForScore("Beginner", 15), 26);
assert.equal(coinsForScore("Novice", 20), 25);
assert.equal(coinsForScore("Novice", 13), 16);   // 16.25
assert.equal(coinsForScore("Novice", 2), 3);     // 2.5 -> 3
assert.equal(coinsForScore("Elementary", 20), 20);
assert.equal(coinsForScore("Intermediate A", 19), 19);
assert.equal(coinsForScore("Intermediate B", 19), 19);
assert.equal(coinsForScore("Intermediate", 19), 0);   // legacy key is not a level any more
assert.equal(coinsForScore("Advanced", 20), 0);

// 18 Oct rules: repeats pay in full
let s = emptyCoinState();
let a = awardQuiz(s, "Beginner", "Present", "être", 15); assert.equal(a.earned, 26); assert.ok(a.firstFinish);
a = awardQuiz(a.state, "Beginner", "Present", "être", 12); assert.equal(a.earned, 20);   // 20.4 -> 20
a = awardQuiz(a.state, "Beginner", "Present", "être", 20); assert.equal(a.earned, 34); assert.equal(coinBalance(a.state), 80);
// non-course verb earns nothing
assert.equal(awardQuiz(a.state, "Beginner", "Present", "aller", 20).earned, 0);

// price = half a pass through the tense, from config
assert.equal(examCoinCost("Beginner"), 51);
assert.equal(examCoinCost("Novice"), 50);
assert.equal(examCoinCost("Elementary"), 70);
assert.equal(examCoinCost("Intermediate A"), 110);
assert.equal(examCoinCost("Intermediate B"), 70);
for (const lvl of ["Beginner","Novice","Elementary","Intermediate A","Intermediate B"]) assert.equal(examCoinCost(lvl), Math.round(courseCoinTotal(lvl) / 2), lvl);

// gate: coins alone decide (no "finish every unit" rule any more)
s = emptyCoinState();
s = awardQuiz(s, "Beginner", "Present", "être", 20).state; // 34
let g = examGate(s, "Beginner", "Present"); assert.equal(g.kind, "needCoins"); assert.equal((g as any).short, 17);
assert.equal(unlockExam(s, "Beginner", "Present"), null);
s = awardQuiz(s, "Beginner", "Present", "être", 10).state; // repeat: +17 -> 51
assert.equal(examGate(s, "Beginner", "Present").kind, "canUnlock");
assert.ok(!tenseProgress(s, "Beginner", "Present").complete);
s = unlockExam(s, "Beginner", "Present")!;
assert.equal(coinBalance(s), 0);
assert.equal(examGate(s, "Beginner", "Present").kind, "unlocked");
assert.equal(unlockExam(s, "Beginner", "Present"), s); // free retake, no double charge
assert.equal(coinBalance(s), 0);
// single wallet: Beginner coins pay for a Novice exam
let w = emptyCoinState();
for (const v of ["être","avoir"]) w = awardQuiz(w, "Beginner", "Future", v, 20).state; // 68
assert.equal(examGate(w, "Novice", "Past").kind, "canUnlock");
w = unlockExam(w, "Novice", "Past")!; assert.equal(coinBalance(w), 18);

// grandfathered exam result
assert.equal(examGate(emptyCoinState(), "Novice", "Past", [{examId:"novice-past",correct:1,total:40,passed:false,date:""}]).kind, "unlocked");
// one pass totals unchanged
for (const [lvl, tot] of [["Beginner",102],["Novice",100],["Elementary",140],["Intermediate A",220],["Intermediate B",140]] as const) {
  let t = emptyCoinState();
  for (const v of (await import("./exams")).EXAM_VERB_SETS[lvl]) t = awardQuiz(t, lvl, "Future", v, 20).state;
  assert.equal(coinBalance(t), tot, lvl); assert.equal(courseCoinTotal(lvl), tot, lvl);
}
assert.deepEqual(parseCoinState("garbage"), null);
assert.equal(coinBalance(parseCoinState(JSON.stringify(w))!), 18);
// a 9 Oct store (no `earned`) keeps its balance on upgrade
const old = JSON.stringify({ version: 1, best: { "Beginner|Present|être": 34, "Beginner|Present|avoir": 26 }, spent: 0, unlockedExams: [], invited: [] });
assert.equal(coinBalance(parseCoinState(old)!), 60);
// invitations: once, when the balance first reaches the price
{
  const { examInvitation, markInvited } = await import("./coins");
  const b4 = awardQuiz(emptyCoinState(), "Beginner", "Present", "être", 20).state; // 34
  const af = awardQuiz(b4, "Beginner", "Present", "avoir", 20).state;              // 68
  const inv = examInvitation(b4, af, "Beginner", "Present");
  assert.equal(inv?.kind, "ready");
  assert.equal(examInvitation(b4, markInvited(af, inv!), "Beginner", "Present"), null); // once only
  const n = awardQuiz(emptyCoinState(), "Novice", "Future", "être", 20).state; // 25
  assert.equal(examInvitation(emptyCoinState(), n, "Novice", "Future"), null); // short of 50
  const ev = ["dire","voir","savoir"]; let e = emptyCoinState();
  for (const v of ev) e = awardQuiz(e, "Elementary", "Past", v, 20).state; // 60
  const e4 = awardQuiz(e, "Elementary", "Past", "vouloir", 20).state;     // 80, 3 units still to do
  assert.equal(examInvitation(e, e4, "Elementary", "Past")?.kind, "ready");
}
// 25 Oct 2026 split: legacy Intermediate keys and unlocks carry over
{
  const legacy = JSON.stringify({ version: 1, best: { "Intermediate|Past|trouver": 20, "Intermediate|Past|se souvenir": 15 },
    earned: 35, spent: 180, unlockedExams: ["intermediate-past"], invited: [] });
  const m = parseCoinState(legacy)!;
  assert.equal(coinBalance(m), 0);
  assert.ok("Intermediate A|Past|trouver" in m.best);
  assert.ok("Intermediate B|Past|se souvenir" in m.best);
  assert.ok(m.unlockedExams.includes("intermediate-a-past") && m.unlockedExams.includes("intermediate-b-past"));
  assert.equal(examGate(m, "Intermediate A", "Past").kind, "unlocked");
  assert.equal(examGate(m, "Intermediate B", "Pluperfect").kind, "needCoins");
  const ex = await import("./exams");
  const r = ex.parseExamResults(JSON.stringify([{ examId: "intermediate-future", correct: 66, total: 72, passed: true, date: "" }]));
  assert.ok(ex.hasPassedExam(r, "intermediate-a-future") && ex.hasPassedExam(r, "intermediate-b-future"));
  assert.ok(ex.hasPassedAnyExamForLevel(r, "Intermediate B"));
  assert.equal(ex.getExam("Intermediate A", "Pluperfect")?.totalQuestions, 55);
  assert.equal(ex.getExam("Intermediate B", "Pluperfect")?.passMark, 38);
  assert.equal(ex.getExam("Elementary", "Pluperfect"), undefined);
  assert.equal(ex.EXAMS.length, 3 * 3 + 2 * 5);
  assert.equal(ex.getExam("Intermediate B", "Imperfect")?.tense, "Imparfait");
}
console.log("coins: all assertions passed");
