import assert from "node:assert/strict";
import { ADVANCED_PHRASES, ADVANCED_UNITS, advancedUnit, lexFor } from "./advanced/content";
import { tokenize, keysIn } from "./advanced/tokenize";
import { coinsFor, decide, fallbackUnderstood, looksEnglish, sentenceCount } from "./advanced/marking";

// Every word in every article can be tapped and saved (Jonathan, 31 Oct 2026).
for (const u of ADVANCED_UNITS) {
  const missing = keysIn(u.text, ADVANCED_PHRASES).filter((k) => !lexFor(u.id, k));
  assert.deepEqual(missing, [], `${u.id}: no gloss for ${missing.join(", ")}`);
  // The pieces put back together are the article, unchanged.
  assert.equal(tokenize(u.text, ADVANCED_PHRASES).map((p) => p.text).join(""), u.text, `${u.id}: tokenising changed the text`);
  assert.equal(u.questions.length, 6, `${u.id}: six questions`);
  assert.ok(u.questions[5].open, `${u.id}: the sixth question is the open one`);
  for (const [i, q] of u.questions.entries()) {
    assert.ok(q.chips.length >= 2 && q.starter && q.follow && q.model && q.modelEn, `${u.id} q${i}: help and model complete`);
    assert.ok(sentenceCount(q.model) >= 2, `${u.id} q${i}: model answer has two sentences`);
    if (!q.open) assert.ok(fallbackUnderstood(q, q.model), `${u.id} q${i}: the model answer passes the offline check`);
    // App rule: French questions use inversion, never est-ce que.
    assert.ok(!/est-ce que/i.test(q.fr + q.follow), `${u.id} q${i}: no est-ce que`);
  }
  assert.ok(u.keyWords.length === 8, `${u.id}: eight key words`);
}
assert.equal(ADVANCED_UNITS.length, 10);

// Phrases come out as one piece.
const pieces = tokenize("Il vaudrait mieux faire un état des lieux.", ADVANCED_PHRASES).filter((p) => p.kind === "word");
assert.deepEqual(pieces.map((p) => p.text), ["Il vaudrait mieux", "faire", "un", "état des lieux"]);
assert.equal(lexFor("1.1", "il vaudrait mieux")?.fr, "il vaudrait mieux");
assert.equal(lexFor("1.2", "personne")?.en, "nobody");
assert.notEqual(lexFor("1.1", "personne")?.en, "nobody");
assert.equal(advancedUnit("1.4")?.title, "Chez le médecin et à la pharmacie");

// Sentences and verdicts.
assert.equal(sentenceCount("Le repas durera plus d'une heure. C'est long !"), 2);
assert.equal(sentenceCount("le repas durera plus d'une heure"), 1);
assert.equal(sentenceCount("le repas durera sans doute plus d'une heure mais pour moi c'est long"), 2);
assert.equal(sentenceCount(""), 0);
assert.ok(looksEnglish("the meal will last more than an hour"));
assert.ok(!looksEnglish("le repas durera plus d'une heure"));
assert.equal(decide("Il faut un garant. C'est une personne qui paie le loyer.", true), "good");
assert.equal(decide("Il faut un garant.", true), "more");
assert.equal(decide("Je ne sais pas.", false), "miss");
assert.equal(decide("you need a guarantor and it is a person", true), "english");
assert.deepEqual([0, 1, 2, 3, 4].map(coinsFor), [3, 2, 2, 1, 1]);

console.log("advanced: all assertions passed");
