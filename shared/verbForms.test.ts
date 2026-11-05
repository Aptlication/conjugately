// Verb pronunciation, every form (5 Nov 2026). Run: npx tsx shared/verbForms.test.ts
import assert from "node:assert/strict";
import { formOf, formsForQuiz } from "./verbForms";

const say = (a: string, v: string, t: string, w: string[] = []) => formOf(a, v, t, w)?.spoken ?? null;

// Inversion, negation and "est-ce que" are dropped.
assert.equal(say("Ne prendra-t-elle pas de risques ?", "prendre", "Futur Simple"), "elle prendra");
assert.equal(say("Prendrai-je le bus pour aller au travail ?", "prendre", "Futur Simple"), "je prendrai");
assert.equal(say("Est-ce que je le fais bien ?", "faire", "Présent"), "je fais");
assert.equal(say("Le fais-tu souvent ?", "faire", "Présent"), "tu fais");
// Compound tenses keep the auxiliary and the participle.
assert.equal(say("N'ont-elles pas pris l'autoroute ?", "prendre", "Passé Composé"), "elles ont pris");
assert.equal(say("Ai-je pris le bon bus ?", "prendre", "Passé Composé"), "j'ai pris");
assert.equal(say("Nous avons vite perdu l'intérêt.", "perdre", "Passé Composé"), "nous avons perdu");
assert.equal(say("J'avais pris le train pour Paris.", "prendre", "Plus-que-parfait"), "j'avais pris");
// Reflexive verbs keep their pronoun, elided where French elides it.
assert.equal(say("Elle ne s'entraîne pas.", "s'entraîner", "Présent"), "elle s'entraîne");
assert.equal(say("Te souviens-tu de lui ?", "se souvenir", "Présent"), "tu te souviens");
assert.equal(say("Nous nous ennuyons.", "s'ennuyer", "Présent"), "nous nous ennuyons");
// Two verbs or a noun subject: the other options say which words are the verb.
assert.equal(say("Quand nous habitions à Lyon, je visitais souvent le musée.", "visiter", "Imparfait",
  ["Quand nous habitions à Lyon, je visite souvent le musée.", "Quand nous habitions à Lyon, je visiterai souvent le musée."]), "je visitais");
assert.equal(say("Ma sœur a visité l'appartement hier.", "visiter", "Passé composé",
  ["Ma sœur visitait l'appartement hier.", "Ma sœur visitera l'appartement hier."]), "il a visité");
assert.equal(say("Le médecin vous demandera votre nom.", "demander", "Futur simple",
  ["Le médecin vous demande votre nom.", "Le médecin vous demandait votre nom."]), "il demandera");
assert.equal(say("Les enfants ont aidé leur grand-mère ce matin.", "aider", "Passé composé",
  ["Les enfants aidaient leur grand-mère ce matin.", "Les enfants aideront leur grand-mère ce matin."]), "ils ont aidé");

// A quiz: person order, il / elle sharing a line and one recording.
const forms = formsForQuiz([
  "Elles ne prendront pas le train demain.", "Prendrai-je le bus ?", "Il prendra ses médicaments.",
  "Ne prendra-t-elle pas de risques ?", "Tu ne prendras pas le métro.", "Nous prendrons une pause.",
  "Vous prendrez la voiture.", "Ils prendront le métro.",
], "prendre", "Futur Simple");
assert.deepEqual(forms.map((f) => f.text), ["je prendrai", "tu prendras", "il / elle prendra", "nous prendrons", "vous prendrez", "ils / elles prendront"]);
assert.deepEqual(forms.map((f) => f.spoken), ["je prendrai", "tu prendras", "il prendra", "nous prendrons", "vous prendrez", "ils prendront"]);
assert.equal(forms[0].clip, "forms/je-prendrai.mp3");
// Only elle in the quiz: elle, not il.
assert.deepEqual(formsForQuiz(["Elle prendra le bus."], "prendre", "Futur Simple").map((f) => f.text), ["elle prendra"]);

console.log("verbForms: all passed");
