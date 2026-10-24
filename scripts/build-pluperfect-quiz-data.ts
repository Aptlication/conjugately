/**
 * Builds server/pluperfect-quiz-data.ts — the plus-que-parfait question bank
 * for Intermediate A (11 non-reflexive verbs, avoir) and Intermediate B
 * (7 reflexive verbs, être + agreement). Added 25 Oct 2026.
 *
 *   npx tsx scripts/build-pluperfect-quiz-data.ts
 *
 * Generated rather than typed so that every question follows the same rules:
 *
 *  - exactly one correct option, and every distractor is wrong for a reason a
 *    learner can name: the passé composé, the imparfait, the futur antérieur,
 *    the wrong auxiliary, the auxiliary in the wrong person (avais/avait sound
 *    alike), a misplaced "pas", or a missing/extra agreement;
 *  - no distractor is a sentence that is also grammatical for the prompt
 *    (so no "être" distractors for non-reflexives: "il était fermé" is French);
 *  - prompts carry a gender tag wherever the answer's agreement depends on it;
 *  - 20 per verb, the same size as every other bank, covering all six persons,
 *    statements, negatives, inverted questions and a negative question.
 *
 * Edit the verb tables below, never the generated file.
 */
import { writeFileSync } from "node:fs";

type P = "je" | "tu" | "il" | "elle" | "nous" | "vous" | "ils" | "elles";
type Form = "stmt" | "neg" | "q" | "negq";
/** Agreement: "" | "e" | "s" | "es". */
type Agr = "" | "e" | "s" | "es";

interface Pattern { p: P; form: Form; agr: Agr; tag: string; d3: "alt" | "wp" }

/**
 * Twenty slots. Complement k is used by slots k and k + 10, so each of a verb's
 * ten complements appears twice with different persons. The tag is the
 * reflexive one; for non-reflexives (no agreement) gender tags on je/tu/nous are dropped.
 */
const PATTERNS: Pattern[] = [
  { p: "je", form: "stmt", agr: "", tag: "(male)", d3: "alt" },
  { p: "tu", form: "stmt", agr: "e", tag: "(informal, female)", d3: "wp" },
  { p: "il", form: "stmt", agr: "", tag: "", d3: "alt" },
  { p: "elle", form: "stmt", agr: "e", tag: "", d3: "wp" },
  { p: "nous", form: "stmt", agr: "s", tag: "(male/mixed)", d3: "alt" },
  { p: "vous", form: "stmt", agr: "s", tag: "(plural, male/mixed)", d3: "wp" },
  { p: "ils", form: "stmt", agr: "s", tag: "(male/mixed)", d3: "alt" },
  { p: "elles", form: "stmt", agr: "es", tag: "(female)", d3: "wp" },
  { p: "je", form: "neg", agr: "e", tag: "(female)", d3: "alt" },
  { p: "tu", form: "neg", agr: "", tag: "(informal, male)", d3: "alt" },
  { p: "il", form: "neg", agr: "", tag: "", d3: "alt" },
  { p: "elle", form: "neg", agr: "e", tag: "", d3: "alt" },
  { p: "nous", form: "neg", agr: "es", tag: "(female)", d3: "alt" },
  { p: "vous", form: "neg", agr: "e", tag: "(formal, to one woman)", d3: "alt" },
  { p: "ils", form: "neg", agr: "s", tag: "(male/mixed)", d3: "alt" },
  { p: "tu", form: "q", agr: "", tag: "(informal, male)", d3: "alt" },
  { p: "il", form: "q", agr: "", tag: "", d3: "alt" },
  { p: "vous", form: "q", agr: "es", tag: "(plural, female)", d3: "alt" },
  { p: "elles", form: "q", agr: "es", tag: "(female)", d3: "alt" },
  { p: "nous", form: "negq", agr: "s", tag: "(male/mixed)", d3: "alt" },
];

const EN_SUBJ: Record<P, string> = { je: "I", tu: "you", il: "he", elle: "she", nous: "we", vous: "you", ils: "they", elles: "they" };

// avoir / être in the imparfait, présent, futur — by person
const AV_IMP: Record<P, string> = { je: "avais", tu: "avais", il: "avait", elle: "avait", nous: "avions", vous: "aviez", ils: "avaient", elles: "avaient" };
const AV_PRES: Record<P, string> = { je: "ai", tu: "as", il: "a", elle: "a", nous: "avons", vous: "avez", ils: "ont", elles: "ont" };
const AV_FUT: Record<P, string> = { je: "aurai", tu: "auras", il: "aura", elle: "aura", nous: "aurons", vous: "aurez", ils: "auront", elles: "auront" };
/** The auxiliary in the wrong person — sounds the same or nearly, spelt wrong. */
const AV_WRONG: Record<P, string> = { je: "avait", tu: "avait", il: "avais", elle: "avais", nous: "aviez", vous: "avions", ils: "avait", elles: "avait" };
const ET_IMP: Record<P, string> = { je: "étais", tu: "étais", il: "était", elle: "était", nous: "étions", vous: "étiez", ils: "étaient", elles: "étaient" };
const ET_PRES: Record<P, string> = { je: "suis", tu: "es", il: "est", elle: "est", nous: "sommes", vous: "êtes", ils: "sont", elles: "sont" };
const IMP_END: Record<P, string> = { je: "ais", tu: "ais", il: "ait", elle: "ait", nous: "ions", vous: "iez", ils: "aient", elles: "aient" };
const REFL: Record<P, string> = { je: "me", tu: "te", il: "se", elle: "se", nous: "nous", vous: "vous", ils: "se", elles: "se" };

const vowel = (w: string) => /^[aeiouyhâàéèêëîïôûœ]/i.test(w);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "je" + word, eliding before a vowel. */
const je = (w: string) => (vowel(w) ? `j'${w}` : `je ${w}`);
const subj = (p: P, w: string) => (p === "je" ? je(w) : `${p} ${w}`);
/** Clitic (me/te/se/ne) before a word, eliding where French does. */
const clitic = (c: string, w: string) => (vowel(w) && c.length === 2 && c.endsWith("e") ? `${c[0]}'${w}` : `${c} ${w}`);
/** Inverted verb–subject: "avait-il", "a-t-il", "trouvait-elle". */
function inv(verbForm: string, p: P): string {
  const pron = p === "je" ? "je" : p;
  const needsT = /[ae]$/.test(verbForm) && /^(il|elle|on)$/.test(pron);
  return `${verbForm}-${needsT ? "t-" : ""}${pron}`;
}

interface Verb {
  inf: string;
  reflexive: boolean;
  pp: string;
  /** Imparfait stem (je ___ais). */
  stem: string;
  en: string;
  complements: [string, string][]; // [english, french]
}

const A: Verb[] = [
  { inf: "mettre", reflexive: false, pp: "mis", stem: "mett", en: "put", complements: [
    ["the coat on the bed", "le manteau sur le lit"], ["the keys in the drawer", "les clés dans le tiroir"],
    ["a scarf in the bag", "une écharpe dans le sac"], ["the plates on the table", "les assiettes sur la table"],
    ["the phone on the desk", "le téléphone sur le bureau"], ["the flowers in a vase", "les fleurs dans un vase"],
    ["sugar in the coffee", "du sucre dans le café"], ["the books on the shelf", "les livres sur l'étagère"],
    ["the milk in the fridge", "le lait au frigo"], ["the cake in the oven", "le gâteau au four"]] },
  { inf: "trouver", reflexive: false, pp: "trouvé", stem: "trouv", en: "found", complements: [
    ["the solution", "la solution"], ["a flat in Paris", "un appartement à Paris"],
    ["the keys under the mat", "les clés sous le paillasson"], ["a wallet in the street", "un portefeuille dans la rue"],
    ["the answer in the book", "la réponse dans le livre"], ["a good restaurant", "un bon restaurant"],
    ["an old photo in the attic", "une vieille photo dans le grenier"], ["a job in Lyon", "un travail à Lyon"],
    ["the cat in the garden", "le chat dans le jardin"], ["a mistake in the bill", "une erreur dans l'addition"]] },
  { inf: "croire", reflexive: false, pp: "cru", stem: "croy", en: "believed", complements: [
    ["the story", "l'histoire"], ["the journalist", "le journaliste"], ["the doctor", "le médecin"],
    ["the rumour", "la rumeur"], ["the witnesses", "les témoins"], ["the weather forecast", "la météo"],
    ["the teacher", "le professeur"], ["the news story", "la nouvelle"], ["the children", "les enfants"],
    ["the salesman", "le vendeur"]] },
  { inf: "parler", reflexive: false, pp: "parlé", stem: "parl", en: "spoken", complements: [
    ["to the manager", "au directeur"], ["to the neighbours", "aux voisins"], ["with the doctor", "avec le médecin"],
    ["about the project", "du projet"], ["to the teacher", "au professeur"], ["in French", "en français"],
    ["on the phone", "au téléphone"], ["to the journalists", "aux journalistes"], ["with the children", "avec les enfants"],
    ["about the holidays", "des vacances"]] },
  { inf: "prendre", reflexive: false, pp: "pris", stem: "pren", en: "taken", complements: [
    ["the train to Paris", "le train pour Paris"], ["a taxi", "un taxi"], ["the umbrella", "le parapluie"],
    ["a photo of the sea", "une photo de la mer"], ["the last bus", "le dernier bus"], ["the wrong road", "la mauvaise route"],
    ["a day off", "un jour de congé"], ["the keys", "les clés"], ["a shower", "une douche"],
    ["the lift", "l'ascenseur"]] },
  { inf: "lire", reflexive: false, pp: "lu", stem: "lis", en: "read", complements: [
    ["the newspaper", "le journal"], ["the whole book", "tout le livre"], ["the letter", "la lettre"],
    ["the instructions", "les instructions"], ["a novel by Zola", "un roman de Zola"], ["the menu", "le menu"],
    ["the email", "l'e-mail"], ["the contract", "le contrat"], ["the poem", "le poème"], ["the article", "l'article"]] },
  { inf: "écrire", reflexive: false, pp: "écrit", stem: "écriv", en: "written", complements: [
    ["a letter to Marie", "une lettre à Marie"], ["the report", "le rapport"], ["a poem", "un poème"],
    ["the address on the envelope", "l'adresse sur l'enveloppe"], ["an email to the boss", "un e-mail au patron"],
    ["a novel", "un roman"], ["the shopping list", "la liste de courses"], ["a postcard", "une carte postale"],
    ["the speech", "le discours"], ["a song", "une chanson"]] },
  { inf: "ouvrir", reflexive: false, pp: "ouvert", stem: "ouvr", en: "opened", complements: [
    ["the window", "la fenêtre"], ["the door", "la porte"], ["the parcel", "le colis"],
    ["a bank account", "un compte en banque"], ["the shop", "le magasin"], ["the bottle of wine", "la bouteille de vin"],
    ["the letter", "la lettre"], ["the box", "la boîte"], ["a restaurant", "un restaurant"], ["the curtains", "les rideaux"]] },
  { inf: "fermer", reflexive: false, pp: "fermé", stem: "ferm", en: "closed", complements: [
    ["the door", "la porte"], ["the windows", "les fenêtres"], ["the shop", "le magasin"], ["the suitcase", "la valise"],
    ["the gate", "le portail"], ["the book", "le livre"], ["the laptop", "l'ordinateur portable"], ["the shutters", "les volets"],
    ["the account", "le compte"], ["the curtains", "les rideaux"]] },
  { inf: "perdre", reflexive: false, pp: "perdu", stem: "perd", en: "lost", complements: [
    ["the keys", "les clés"], ["the match", "le match"], ["the wallet", "le portefeuille"],
    ["the train ticket", "le billet de train"], ["the umbrella", "le parapluie"], ["the phone", "le téléphone"],
    ["the address", "l'adresse"], ["the bet", "le pari"], ["the map", "la carte"], ["the receipt", "le reçu"]] },
  { inf: "garder", reflexive: false, pp: "gardé", stem: "gard", en: "kept", complements: [
    ["the receipt", "le reçu"], ["the photos", "les photos"], ["the secret", "le secret"], ["the change", "la monnaie"],
    ["the letters", "les lettres"], ["the dog for a week", "le chien pendant une semaine"], ["the old car", "la vieille voiture"],
    ["the tickets", "les billets"], ["the menu as a souvenir", "le menu en souvenir"], ["the cake for later", "le gâteau pour plus tard"]] },
];

const B: Verb[] = [
  { inf: "s'intéresser", reflexive: true, pp: "intéressé", stem: "intéress", en: "become interested", complements: [
    ["in politics", "à la politique"], ["in music", "à la musique"], ["in art", "à l'art"], ["in history", "à l'histoire"],
    ["in science", "à la science"], ["in cooking", "à la cuisine"], ["in photography", "à la photographie"],
    ["in fashion", "à la mode"], ["in languages", "aux langues"], ["in this project", "à ce projet"]] },
  { inf: "se débrouiller", reflexive: true, pp: "débrouillé", stem: "débrouill", en: "coped", complements: [
    ["without help", "sans aide"], ["in English", "en anglais"], ["with very little money", "avec très peu d'argent"],
    ["at the airport", "à l'aéroport"], ["without a map", "sans carte"], ["in the kitchen", "dans la cuisine"],
    ["at work", "au travail"], ["in Paris", "à Paris"], ["with the computer", "avec l'ordinateur"], ["without a car", "sans voiture"]] },
  { inf: "s'ennuyer", reflexive: true, pp: "ennuyé", stem: "ennuy", en: "got bored", complements: [
    ["at the meeting", "à la réunion"], ["during the film", "pendant le film"], ["at the museum", "au musée"],
    ["during the holidays", "pendant les vacances"], ["at the party", "à la fête"], ["on the train", "dans le train"],
    ["in class", "en classe"], ["at home", "à la maison"], ["during the speech", "pendant le discours"], ["at the concert", "au concert"]] },
  { inf: "s'entraîner", reflexive: true, pp: "entraîné", stem: "entraîn", en: "trained", complements: [
    ["for the marathon", "pour le marathon"], ["every morning", "tous les matins"], ["at the gym", "à la salle de sport"],
    ["with the team", "avec l'équipe"], ["in the park", "dans le parc"], ["for the match", "pour le match"],
    ["at the pool", "à la piscine"], ["all winter", "tout l'hiver"], ["with a coach", "avec un entraîneur"],
    ["for the competition", "pour la compétition"]] },
  { inf: "se souvenir", reflexive: true, pp: "souvenu", stem: "souven", en: "remembered", complements: [
    ["the address", "de l'adresse"], ["the name of the hotel", "du nom de l'hôtel"], ["the holidays in Spain", "des vacances en Espagne"],
    ["the meeting", "de la réunion"], ["the first day of school", "du premier jour d'école"], ["the password", "du mot de passe"],
    ["the date", "de la date"], ["the song", "de la chanson"], ["the old house", "de la vieille maison"], ["the recipe", "de la recette"]] },
  { inf: "s'adapter", reflexive: true, pp: "adapté", stem: "adapt", en: "adapted", complements: [
    ["to the new job", "au nouveau travail"], ["to the climate", "au climat"], ["to life in Paris", "à la vie à Paris"],
    ["to the new school", "à la nouvelle école"], ["to the situation", "à la situation"], ["to the changes", "aux changements"],
    ["to the new team", "à la nouvelle équipe"], ["to the cold", "au froid"], ["to the noise", "au bruit"], ["to the rules", "aux règles"]] },
  { inf: "se réjouir", reflexive: true, pp: "réjoui", stem: "réjouiss", en: "been delighted", complements: [
    ["about the news", "de la nouvelle"], ["about the wedding", "du mariage"], ["about the result", "du résultat"],
    ["about the holidays", "des vacances"], ["about the visit", "de la visite"], ["about the victory", "de la victoire"],
    ["about the good weather", "du beau temps"], ["about the birth", "de la naissance"], ["about the party", "de la fête"],
    ["about the success of the project", "du succès du projet"]] },
];

/**
 * After a negative, the indefinite and partitive articles become "de":
 * "Je n'avais pas trouvé d'erreur", "Il n'avait pas mis de sucre". Only for the
 * avoir verbs — the reflexive complements start with a preposition, and "du"
 * there is de + le ("se souvenir du nom"), which a negative leaves alone.
 * parler's "du projet" / "des vacances" are de + le too, so they are left as is.
 */
function negComplement(v: Verb, fr: string): string {
  if (v.reflexive || v.inf === "parler") return fr;
  const m = fr.match(/^(un|une|du|des) (.*)$/);
  if (!m) return fr;
  return vowel(m[2]) ? `d'${m[2]}` : `de ${m[2]}`;
}

/** A different agreement from `a`, for the agreement distractor. */
const WRONG_AGR: Record<Agr, Agr> = { "": "e", e: "", s: "", es: "s" };

function englishPrompt(v: Verb, pat: Pattern, en: string): string {
  const s = EN_SUBJ[pat.p];
  const tag = v.reflexive
    ? pat.tag
    : // No agreement with avoir: keep only the tags that say which "you"/"they".
      ({ tu: "(informal)", vous: "(formal/plural)", ils: "(male/mixed)", elles: "(female)" } as Record<string, string>)[pat.p] ?? "";
  let sentence: string;
  if (pat.form === "stmt") sentence = `${cap(s)} had ${v.en} ${en}.`;
  else if (pat.form === "neg") sentence = `${cap(s)} had not ${v.en} ${en}.`;
  else if (pat.form === "q") sentence = `Had ${s} ${v.en} ${en}?`;
  else sentence = `Hadn't ${s} ${v.en} ${en}?`;
  return tag ? `${sentence} ${tag}` : sentence;
}

/** [correct, d1, d2, d3] for a non-reflexive verb (avoir, no agreement). */
function avoirOptions(v: Verb, pat: Pattern, fr: string): string[] {
  const { p, form } = pat;
  const imp = `${v.stem}${IMP_END[p]}`;
  if (form === "stmt") {
    return [
      `${subj(p, AV_IMP[p])} ${v.pp} ${fr}.`,
      `${subj(p, AV_PRES[p])} ${v.pp} ${fr}.`,
      `${subj(p, imp)} ${fr}.`,
      pat.d3 === "wp" ? `${subj(p, AV_WRONG[p])} ${v.pp} ${fr}.` : `${subj(p, AV_FUT[p])} ${v.pp} ${fr}.`,
    ].map(cap);
  }
  if (form === "neg") {
    return [
      `${p === "je" ? "je " : `${p} `}${clitic("ne", AV_IMP[p])} pas ${v.pp} ${fr}.`,
      `${p === "je" ? "je " : `${p} `}${clitic("ne", AV_PRES[p])} pas ${v.pp} ${fr}.`,
      `${p === "je" ? "je " : `${p} `}${clitic("ne", AV_IMP[p])} ${v.pp} pas ${fr}.`,
      `${p === "je" ? "je " : `${p} `}${clitic("ne", imp)} pas ${fr}.`,
    ].map(cap);
  }
  if (form === "q") {
    return [
      `${inv(AV_IMP[p], p)} ${v.pp} ${fr} ?`,
      `${inv(AV_PRES[p], p)} ${v.pp} ${fr} ?`,
      `${inv(imp, p)} ${fr} ?`,
      `${inv(AV_FUT[p], p)} ${v.pp} ${fr} ?`,
    ].map(cap);
  }
  // negq
  return [
    `${clitic("ne", inv(AV_IMP[p], p))} pas ${v.pp} ${fr} ?`,
    `${clitic("ne", inv(AV_PRES[p], p))} pas ${v.pp} ${fr} ?`,
    `${clitic("ne", inv(AV_IMP[p], p))} ${v.pp} pas ${fr} ?`,
    `${clitic("ne", inv(imp, p))} pas ${fr} ?`,
  ].map(cap);
}

/** [correct, d1, d2, d3] for a reflexive verb (être, agreement with the subject). */
function etreOptions(v: Verb, pat: Pattern, fr: string): string[] {
  const { p, form, agr } = pat;
  const pp = v.pp + agr;
  const ppWrong = v.pp + WRONG_AGR[agr];
  const r = REFL[p];
  const rs = (w: string) => clitic(r, w); // m'étais / me suis / nous étions
  const imp = `${v.stem}${IMP_END[p]}`;
  const lead = (p === "je" ? "je" : p) + " ";
  if (form === "stmt") {
    return [
      `${lead}${rs(ET_IMP[p])} ${pp} ${fr}.`,
      `${lead}${rs(ET_PRES[p])} ${pp} ${fr}.`,
      `${lead}${rs(AV_IMP[p])} ${pp} ${fr}.`,
      pat.d3 === "wp" ? `${lead}${rs(ET_IMP[p])} ${ppWrong} ${fr}.` : `${lead}${rs(imp)} ${fr}.`,
    ].map(cap);
  }
  if (form === "neg") {
    return [
      `${lead}${clitic("ne", rs(ET_IMP[p]))} pas ${pp} ${fr}.`,
      `${lead}${clitic("ne", rs(ET_PRES[p]))} pas ${pp} ${fr}.`,
      `${lead}${clitic("ne", rs(AV_IMP[p]))} pas ${pp} ${fr}.`,
      `${lead}${clitic("ne", rs(ET_IMP[p]))} ${pp} pas ${fr}.`,
    ].map(cap);
  }
  if (form === "q") {
    return [
      `${rs(inv(ET_IMP[p], p))} ${pp} ${fr} ?`,
      `${rs(inv(ET_PRES[p], p))} ${pp} ${fr} ?`,
      `${rs(inv(AV_IMP[p], p))} ${pp} ${fr} ?`,
      `${rs(inv(ET_IMP[p], p))} ${ppWrong} ${fr} ?`,
    ].map(cap);
  }
  return [
    `${clitic("ne", rs(inv(ET_IMP[p], p)))} pas ${pp} ${fr} ?`,
    `${clitic("ne", rs(inv(ET_PRES[p], p)))} pas ${pp} ${fr} ?`,
    `${clitic("ne", rs(inv(AV_IMP[p], p)))} pas ${pp} ${fr} ?`,
    `${clitic("ne", rs(inv(ET_IMP[p], p)))} pas ${ppWrong} ${fr} ?`,
  ].map(cap);
}

// Deterministic placement of the correct answer (the server shuffles again).
let seed = 20261025;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);

const out: Record<string, { question: string; options: string[]; answer: string }[]> = {};
for (const v of [...A, ...B]) {
  if (v.complements.length !== 10) throw new Error(`${v.inf}: need 10 complements, has ${v.complements.length}`);
  out[v.inf] = PATTERNS.map((pat, i) => {
    const [en, fr] = v.complements[i % 10];
    const frC = pat.form === "neg" || pat.form === "negq" ? negComplement(v, fr) : fr;
    const opts = v.reflexive ? etreOptions(v, pat, frC) : avoirOptions(v, pat, frC);
    if (new Set(opts).size !== 4) throw new Error(`${v.inf} #${i + 1}: duplicate options ${JSON.stringify(opts)}`);
    const correct = opts[0];
    const others = opts.slice(1);
    const pos = Math.floor(rand() * 4);
    const options = [...others.slice(0, pos), correct, ...others.slice(pos)];
    return { question: englishPrompt(v, pat, en), options, answer: "ABCD"[pos] };
  });
}

const header = `// GENERATED by scripts/build-pluperfect-quiz-data.ts — do not edit by hand.
// Plus-que-parfait question bank, added 25 Oct 2026 with the Intermediate A / B split.
// Intermediate A: 11 non-reflexive verbs (avoir). Intermediate B: 7 reflexive verbs (être + agreement).
// 18 verbs × 20 questions = 360. No ElevenLabs audio yet: question and answer
// audio play silent until recorded (GLOSSARY.md: no manifest entry, no playback).
import type { IntermediateQuizQuestion } from "./intermediate-quiz-data";

export const PLUPERFECT_QUIZ_DATA: Record<string, IntermediateQuizQuestion[]> = `;
writeFileSync("server/pluperfect-quiz-data.ts", header + JSON.stringify(out, null, 2) + ";\n");
console.log(`wrote ${Object.keys(out).length} verbs, ${Object.values(out).reduce((n, q) => n + q.length, 0)} questions`);
