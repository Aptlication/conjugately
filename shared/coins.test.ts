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
// invitations
{
  const { examInvitation, markInvited } = await import("./coins");
  let a0 = emptyCoinState();
  a0 = awardQuiz(a0, "Beginner", "Present", "être", 20).state;
  a0 = awardQuiz(a0, "Beginner", "Present", "avoir", 20).state;
  const b4 = a0; const af = awardQuiz(a0, "Beginner", "Present", "faire", 20).state;
  const inv = examInvitation(b4, af, "Beginner", "Present");
  assert.equal(inv?.kind, "ready");
  assert.equal(examInvitation(b4, markInvited(af, inv!), "Beginner", "Present"), null); // once only
  // Elementary: 100 coins after 5 perfect units -> "almost", 2 units left
  let e = emptyCoinState(); const ev = ["dire","voir","savoir","vouloir","venir","pouvoir","besoin"];
  for (const v of ev.slice(0, 4)) e = awardQuiz(e, "Elementary", "Past", v, 20).state;
  const e5 = awardQuiz(e, "Elementary", "Past", "venir", 20).state;
  const inv2 = examInvitation(e, e5, "Elementary", "Past");
  assert.equal(inv2?.kind, "almost"); assert.deepEqual((inv2 as any).remaining, ["pouvoir","besoin"]);
  // finishing the tense later -> "ready"
  let e6 = markInvited(e5, inv2!); e6 = awardQuiz(e6, "Elementary", "Past", "pouvoir", 20).state;
  const e7 = awardQuiz(e6, "Elementary", "Past", "besoin", 20).state;
  assert.equal(examInvitation(e6, e7, "Elementary", "Past")?.kind, "ready");
  // finishing tense with < 100 -> nothing; later improvement crossing 100 -> ready
  let n = emptyCoinState(); for (const v of ["être","avoir","faire","aller"]) n = awardQuiz(n, "Novice", "Future", v, 18).state;
  assert.equal(coinBalance(n), 92);
  const n2 = awardQuiz(n, "Novice", "Future", "être", 20).state; // +2 -> 94
  assert.equal(examInvitation(n, n2, "Novice", "Future"), null);
}
console.log("coins: all assertions passed");
