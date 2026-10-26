import assert from "node:assert/strict";
import { soundsAlike } from "./soundAlike";

// Sound the same: a spoken answer of one counts as the other (1.3.15)
assert.ok(soundsAlike("Il ne parlait pas au professeur après le cours.", "Il ne parlais pas au professeur après le cours."));
assert.ok(soundsAlike("Ils parlaient du projet quand la lumière s'est éteinte.", "Il parlait du projet quand la lumière s'est éteinte."));
assert.ok(soundsAlike("Tu parles français.", "Tu parle français."));
assert.ok(soundsAlike("Elles mangent ensemble.", "Elle mange ensemble."));
assert.ok(soundsAlike("Je finis le travail.", "Je finit le travail."));
assert.ok(soundsAlike("Vous allez parler.", "Vous allez parlez."));
assert.ok(soundsAlike("Elle est allée au marché.", "Elle est allé au marché."));

// Heard differently: must stay apart
assert.ok(!soundsAlike("Il ne parlait pas au professeur.", "Il n'a pas parlé au professeur."));
assert.ok(!soundsAlike("Il ne parlait pas au professeur.", "Il n'avait pas parlé au professeur."));
assert.ok(!soundsAlike("Je parlais.", "J'ai parlé."));
assert.ok(!soundsAlike("Ils aiment le café.", "Il aime le café."));      // liaison: ils_aiment
assert.ok(!soundsAlike("Elles arrivaient tôt.", "Elle arrivait tôt."));   // liaison
assert.ok(!soundsAlike("Il finit.", "Ils finissent."));
assert.ok(!soundsAlike("Je parlerai.", "Je parlerais."));                 // kept apart: futur vs conditionnel
assert.ok(!soundsAlike("Tu parles.", "Il parle."));

console.log("soundAlike: all passed");
