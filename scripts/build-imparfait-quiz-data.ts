/**
 * Builds server/imparfait-quiz-data.ts — the imparfait question bank for
 * Intermediate A (11 non-reflexive verbs) and Intermediate B (7 reflexive
 * verbs). Added 25 Oct 2026; see the project doc intermediate-imparfait-plan.md.
 *
 *   npx tsx scripts/build-imparfait-quiz-data.ts
 *
 * Three uses of the imparfait, each pinned down by the English so that no
 * other tense is also right:
 *   - habit:        "I used to read the newspaper every morning."
 *   - in progress:  "She was reading the newspaper."
 *   - interrupted:  "We were reading the newspaper when the phone rang."
 * Verbs that sound wrong in English "-ing" (believe, remember, be interested,
 * be delighted, find) use habit only.
 *
 * Distractors are drawn from: the passé composé, the présent, the plus-que-
 * parfait, a same-sounding wrong ending (je lisait / ils lisait), and for the
 * reflexives a wrong reflexive pronoun (je se souvenais). Each is wrong for
 * the prompt; none is another acceptable answer.
 *
 * Edit this script, never the generated file.
 */
import { writeFileSync } from "node:fs";

type P = "je" | "tu" | "il" | "elle" | "nous" | "vous" | "ils" | "elles";
type Form = "stmt" | "neg" | "q" | "negq";
type Use = "H" | "P" | "I";

const IDX: Record<P, number> = { je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
const IMP_END = ["ais", "ais", "ait", "ions", "iez", "aient"];
/** Wrong ending that sounds the same (or nearly): je lisait, il lisais, nous lisiez… */
const IMP_WRONG = ["ait", "ait", "ais", "iez", "ions", "ait"];
const AV_PRES = ["ai", "as", "a", "avons", "avez", "ont"];
const AV_IMP = ["avais", "avais", "avait", "avions", "aviez", "avaient"];
const ET_PRES = ["suis", "es", "est", "sommes", "êtes", "sont"];
const ET_IMP = ["étais", "étais", "était", "étions", "étiez", "étaient"];
const REFL = ["me", "te", "se", "nous", "vous", "se"];
/** Agreement for compound-tense distractors: masculine unless the subject is feminine. */
const AGR: Record<P, string> = { je: "", tu: "", il: "", elle: "e", nous: "s", vous: "s", ils: "s", elles: "es" };

const vowel = (w: string) => /^[aeiouyhâàéèêëîïôûœ]/i.test(w);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const clitic = (c: string, w: string) => (vowel(w) && c.length === 2 && c.endsWith("e") ? `${c[0]}'${w}` : `${c} ${w}`);
const lead = (p: P, w: string) => (p === "je" ? (vowel(w) ? `j'${w}` : `je ${w}`) : `${p} ${w}`);
function inv(verbForm: string, p: P): string {
  const needsT = /[ae]$/.test(verbForm) && (p === "il" || p === "elle");
  return `${verbForm}-${needsT ? "t-" : ""}${p}`;
}

interface Verb {
  inf: string;
  reflexive: boolean;
  pp: string;
  stem: string; // imparfait stem
  present: [string, string, string, string, string, string];
  habit: [string, string][]; // [English after "used to", French complement]
  prog?: [string, string][]; // [English "-ing" phrase, French complement]; absent = habit only
}

const A: Verb[] = [
  { inf: "mettre", reflexive: false, pp: "mis", stem: "mett", present: ["mets", "mets", "met", "mettons", "mettez", "mettent"],
    habit: [["wear a hat on Sundays", "un chapeau le dimanche"], ["put sugar in the coffee every morning", "du sucre dans le café tous les matins"],
      ["put the keys in the drawer every evening", "les clés dans le tiroir tous les soirs"], ["wear a scarf in winter", "une écharpe en hiver"],
      ["put the bins out on Mondays", "les poubelles dehors le lundi"], ["lay the table every evening", "la table tous les soirs"]],
    prog: [["putting the plates on the table", "les assiettes sur la table"], ["putting on a coat", "un manteau"],
      ["putting the milk in the fridge", "le lait au frigo"], ["putting the books on the shelf", "les livres sur l'étagère"]] },
  { inf: "trouver", reflexive: false, pp: "trouvé", stem: "trouv", present: ["trouve", "trouves", "trouve", "trouvons", "trouvez", "trouvent"],
    habit: [["find the answers in the book", "les réponses dans le livre"], ["find mushrooms in the forest every autumn", "des champignons dans la forêt chaque automne"],
      ["find the keys under the mat", "les clés sous le paillasson"], ["find time to read every evening", "le temps de lire tous les soirs"],
      ["find the lessons easy", "les leçons faciles"], ["find shells on the beach every summer", "des coquillages sur la plage chaque été"]] },
  { inf: "croire", reflexive: false, pp: "cru", stem: "croy", present: ["crois", "crois", "croit", "croyons", "croyez", "croient"],
    habit: [["believe in Father Christmas", "au père Noël"], ["believe the weather forecast", "la météo"], ["believe the rumours", "les rumeurs"],
      ["believe in ghosts", "aux fantômes"], ["believe the politicians", "les politiciens"], ["believe the teacher", "le professeur"]] },
  { inf: "parler", reflexive: false, pp: "parlé", stem: "parl", present: ["parle", "parles", "parle", "parlons", "parlez", "parlent"],
    habit: [["speak French at home", "français à la maison"], ["speak to the neighbours every morning", "aux voisins tous les matins"],
      ["talk about the holidays every evening", "des vacances tous les soirs"], ["speak English at work", "anglais au travail"],
      ["talk on the phone for hours", "au téléphone pendant des heures"], ["speak to the teacher after class", "au professeur après le cours"]],
    prog: [["speaking to the manager", "au directeur"], ["talking on the phone", "au téléphone"],
      ["speaking French with the children", "français avec les enfants"], ["talking about the project", "du projet"]] },
  { inf: "prendre", reflexive: false, pp: "pris", stem: "pren", present: ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
    habit: [["take the bus to work", "le bus pour aller au travail"], ["have a coffee at the station every morning", "un café à la gare tous les matins"],
      ["take the train on Saturdays", "le train le samedi"], ["take a lot of photos", "beaucoup de photos"],
      ["take the stairs", "l'escalier"], ["have a shower every evening", "une douche tous les soirs"]],
    prog: [["having a shower", "une douche"], ["taking a photo of the sea", "une photo de la mer"],
      ["taking the lift", "l'ascenseur"], ["taking notes", "des notes"]] },
  { inf: "lire", reflexive: false, pp: "lu", stem: "lis", present: ["lis", "lis", "lit", "lisons", "lisez", "lisent"],
    habit: [["read the newspaper every morning", "le journal tous les matins"], ["read a lot of novels", "beaucoup de romans"],
      ["read the menu carefully", "le menu attentivement"], ["read stories to the children", "des histoires aux enfants"],
      ["read the news on the train", "les informations dans le train"], ["read poems in the evening", "des poèmes le soir"]],
    prog: [["reading the newspaper", "le journal"], ["reading a novel by Zola", "un roman de Zola"],
      ["reading the instructions", "les instructions"], ["reading an email", "un e-mail"]] },
  { inf: "écrire", reflexive: false, pp: "écrit", stem: "écriv", present: ["écris", "écris", "écrit", "écrivons", "écrivez", "écrivent"],
    habit: [["write to Marie every week", "à Marie chaque semaine"], ["write a lot of emails", "beaucoup d'e-mails"],
      ["write the shopping list on Saturdays", "la liste de courses le samedi"], ["write poems", "des poèmes"],
      ["write postcards every summer", "des cartes postales chaque été"], ["write in a diary every evening", "dans un journal tous les soirs"]],
    prog: [["writing a letter", "une lettre"], ["writing the report", "le rapport"],
      ["writing a song", "une chanson"], ["writing an email to the boss", "un e-mail au patron"]] },
  { inf: "ouvrir", reflexive: false, pp: "ouvert", stem: "ouvr", present: ["ouvre", "ouvres", "ouvre", "ouvrons", "ouvrez", "ouvrent"],
    habit: [["open the shop at eight", "le magasin à huit heures"], ["open the windows every morning", "les fenêtres tous les matins"],
      ["open the post in the evening", "le courrier le soir"], ["open the curtains at seven", "les rideaux à sept heures"],
      ["open a bottle of wine on Fridays", "une bouteille de vin le vendredi"], ["open the door to the neighbours", "la porte aux voisins"]],
    prog: [["opening the window", "la fenêtre"], ["opening a parcel", "un colis"],
      ["opening the letters", "les lettres"], ["opening the shop", "le magasin"]] },
  { inf: "fermer", reflexive: false, pp: "fermé", stem: "ferm", present: ["ferme", "fermes", "ferme", "fermons", "fermez", "ferment"],
    habit: [["close the shop at seven", "le magasin à sept heures"], ["close the shutters every evening", "les volets tous les soirs"],
      ["lock the door at night", "la porte à clé la nuit"], ["close the windows in winter", "les fenêtres en hiver"],
      ["close the gate behind the children", "le portail derrière les enfants"], ["close the office on Sundays", "le bureau le dimanche"]],
    prog: [["closing the shutters", "les volets"], ["closing the suitcase", "la valise"],
      ["closing the curtains", "les rideaux"], ["closing the gate", "le portail"]] },
  { inf: "perdre", reflexive: false, pp: "perdu", stem: "perd", present: ["perds", "perds", "perd", "perdons", "perdez", "perdent"],
    habit: [["lose the keys all the time", "les clés tout le temps"], ["lose every match", "tous les matchs"],
      ["lose patience easily", "patience facilement"], ["lose the umbrella every winter", "le parapluie chaque hiver"],
      ["lose the train tickets", "les billets de train"], ["lose time in traffic jams", "du temps dans les embouteillages"]],
    prog: [["losing the match", "le match"], ["losing patience", "patience"],
      ["losing weight", "du poids"], ["losing time", "du temps"]] },
  { inf: "garder", reflexive: false, pp: "gardé", stem: "gard", present: ["garde", "gardes", "garde", "gardons", "gardez", "gardent"],
    habit: [["keep the receipts", "les reçus"], ["look after the neighbours' dog in the summer", "le chien des voisins l'été"],
      ["keep the old letters", "les vieilles lettres"], ["keep the change", "la monnaie"],
      ["keep a seat for Marie", "une place pour Marie"], ["look after the children on Wednesdays", "les enfants le mercredi"]],
    prog: [["looking after the neighbours' cat", "le chat des voisins"], ["looking after the children", "les enfants"],
      ["looking after the shop", "le magasin"], ["keeping a secret", "un secret"]] },
];

const B: Verb[] = [
  { inf: "s'intéresser", reflexive: true, pp: "intéressé", stem: "intéress", present: ["intéresse", "intéresses", "intéresse", "intéressons", "intéressez", "intéressent"],
    habit: [["be interested in politics", "à la politique"], ["be interested in music", "à la musique"], ["be interested in history", "à l'histoire"],
      ["be interested in fashion", "à la mode"], ["be interested in science", "à la science"], ["be interested in cooking", "à la cuisine"]] },
  { inf: "se débrouiller", reflexive: true, pp: "débrouillé", stem: "débrouill", present: ["débrouille", "débrouilles", "débrouille", "débrouillons", "débrouillez", "débrouillent"],
    habit: [["get by in English", "en anglais"], ["cope without a car", "sans voiture"], ["cope on very little money", "avec très peu d'argent"],
      ["get by without help", "sans aide"], ["cope well at work", "bien au travail"], ["get by in Paris", "à Paris"]],
    prog: [["coping without a map", "sans carte"], ["getting by in English", "en anglais"],
      ["coping at the airport", "à l'aéroport"], ["coping with the computer", "avec l'ordinateur"]] },
  { inf: "s'ennuyer", reflexive: true, pp: "ennuyé", stem: "ennuy", present: ["ennuie", "ennuies", "ennuie", "ennuyons", "ennuyez", "ennuient"],
    habit: [["get bored at school", "à l'école"], ["get bored on Sundays", "le dimanche"], ["get bored during the holidays", "pendant les vacances"],
      ["get bored at meetings", "aux réunions"], ["get bored at home", "à la maison"], ["get bored in class", "en classe"]],
    prog: [["getting bored at the party", "à la fête"], ["getting bored during the film", "pendant le film"],
      ["getting bored on the train", "dans le train"], ["getting bored at the museum", "au musée"]] },
  { inf: "s'entraîner", reflexive: true, pp: "entraîné", stem: "entraîn", present: ["entraîne", "entraînes", "entraîne", "entraînons", "entraînez", "entraînent"],
    habit: [["train every morning", "tous les matins"], ["train at the gym", "à la salle de sport"], ["train with the team on Saturdays", "avec l'équipe le samedi"],
      ["train at the pool", "à la piscine"], ["train in the park", "dans le parc"], ["train all winter", "tout l'hiver"]],
    prog: [["training for the marathon", "pour le marathon"], ["training in the park", "dans le parc"],
      ["training with a coach", "avec un entraîneur"], ["training for the match", "pour le match"]] },
  { inf: "se souvenir", reflexive: true, pp: "souvenu", stem: "souven", present: ["souviens", "souviens", "souvient", "souvenons", "souvenez", "souviennent"],
    habit: [["remember everyone's birthday", "de l'anniversaire de tout le monde"], ["remember the students' names", "des noms des étudiants"],
      ["remember the passwords", "des mots de passe"], ["remember the recipes", "des recettes"],
      ["remember the dates", "des dates"], ["remember the songs", "des chansons"]] },
  { inf: "s'adapter", reflexive: true, pp: "adapté", stem: "adapt", present: ["adapte", "adaptes", "adapte", "adaptons", "adaptez", "adaptent"],
    habit: [["adapt easily to changes", "facilement aux changements"], ["adapt to the climate", "au climat"], ["adapt to new teams", "aux nouvelles équipes"],
      ["adapt to the rules", "aux règles"], ["adapt to the noise", "au bruit"], ["adapt quickly to new jobs", "vite aux nouveaux emplois"]],
    prog: [["adapting to the new school", "à la nouvelle école"], ["adapting to life in Paris", "à la vie à Paris"],
      ["adapting to the cold", "au froid"], ["adapting to the new job", "au nouveau travail"]] },
  { inf: "se réjouir", reflexive: true, pp: "réjoui", stem: "réjouiss", present: ["réjouis", "réjouis", "réjouit", "réjouissons", "réjouissez", "réjouissent"],
    habit: [["be delighted about the good weather", "du beau temps"], ["be delighted about every visit", "de chaque visite"],
      ["be delighted about the holidays", "des vacances"], ["be delighted about the results", "des résultats"],
      ["be delighted about the parties", "des fêtes"], ["be delighted about the good news", "des bonnes nouvelles"]] },
];

/** The interruption added to "I" questions — a passé composé event, identical in all options. */
const INTERRUPT: [string, string][] = [
  ["when the phone rang", "quand le téléphone a sonné"],
  ["when the doorbell rang", "quand on a sonné à la porte"],
  ["when the lights went out", "quand la lumière s'est éteinte"],
];

interface Pattern { p: P; form: Form; use: Use }
const PATTERNS: Pattern[] = [
  { p: "je", form: "stmt", use: "H" }, { p: "tu", form: "stmt", use: "P" }, { p: "il", form: "stmt", use: "I" },
  { p: "elle", form: "stmt", use: "H" }, { p: "nous", form: "stmt", use: "P" }, { p: "vous", form: "stmt", use: "H" },
  { p: "ils", form: "stmt", use: "I" }, { p: "elles", form: "stmt", use: "H" }, { p: "je", form: "neg", use: "H" },
  { p: "tu", form: "neg", use: "P" }, { p: "il", form: "neg", use: "H" }, { p: "nous", form: "neg", use: "H" },
  { p: "vous", form: "neg", use: "P" }, { p: "ils", form: "neg", use: "H" }, { p: "tu", form: "q", use: "H" },
  { p: "il", form: "q", use: "P" }, { p: "vous", form: "q", use: "H" }, { p: "elles", form: "q", use: "P" },
  { p: "je", form: "stmt", use: "I" }, { p: "nous", form: "negq", use: "H" },
];

const EN_SUBJ: Record<P, string> = { je: "I", tu: "you", il: "he", elle: "she", nous: "we", vous: "you", ils: "they", elles: "they" };
const TAG: Partial<Record<P, string>> = { tu: "(informal)", vous: "(formal/plural)", ils: "(male/mixed)", elles: "(female)" };
const BE_PAST: Record<P, string> = { je: "was", tu: "were", il: "was", elle: "was", nous: "were", vous: "were", ils: "were", elles: "were" };

function negComplement(v: Verb, fr: string): string {
  if (v.reflexive || v.inf === "parler") return fr;
  const m = fr.match(/^(un|une|du|des) (.*)$/);
  if (!m) return fr;
  return vowel(m[2]) ? `d'${m[2]}` : `de ${m[2]}`;
}

/** The verb group for a person, before negation/inversion: "lisais", "me souvenais", "ai lu", "me suis souvenu". */
type Kind = "imp" | "pres" | "pc" | "plup" | "wrongEnd" | "wrongPron";
function finite(v: Verb, p: P, kind: Kind): { aux: string; rest: string } {
  const i = IDX[p];
  // aux = the word that carries the person (and takes ne / inversion); rest follows it.
  switch (kind) {
    case "imp": return { aux: v.stem + IMP_END[i], rest: "" };
    case "wrongEnd": return { aux: v.stem + IMP_WRONG[i], rest: "" };
    case "wrongPron": return { aux: v.stem + IMP_END[i], rest: "" };
    case "pres": return { aux: v.present[i], rest: "" };
    case "pc": return v.reflexive ? { aux: ET_PRES[i], rest: v.pp + AGR[p] } : { aux: AV_PRES[i], rest: v.pp };
    case "plup": return v.reflexive ? { aux: ET_IMP[i], rest: v.pp + AGR[p] } : { aux: AV_IMP[i], rest: v.pp };
  }
}

function sentence(v: Verb, p: P, form: Form, kind: Kind, fr: string, tail: string): string {
  const { aux, rest } = finite(v, p, kind);
  const pron = v.reflexive ? (kind === "wrongPron" ? "se" : REFL[IDX[p]]) : "";
  const withPron = (w: string) => (pron ? clitic(pron, w) : w);
  const after = [rest, fr, tail].filter(Boolean).join(" ");
  let s: string;
  if (form === "stmt") s = `${lead(p, withPron(aux))} ${after}.`;
  else if (form === "neg") {
    const subj = p === "je" ? "je" : p;
    s = `${subj} ${clitic("ne", withPron(aux))} pas ${after}.`;
  } else if (form === "q") s = `${withPron(inv(aux, p))} ${after} ?`;
  else s = `${clitic("ne", withPron(inv(aux, p)))} pas ${after} ?`;
  return cap(s.replace(/\s+/g, " ").replace(" .", ".").trim());
}

function englishPrompt(pat: Pattern, use: Use, en: string, tailEn: string): string {
  const s = EN_SUBJ[pat.p];
  const S = cap(s);
  let out: string;
  if (use === "H") {
    if (pat.form === "stmt") out = `${S} used to ${en}.`;
    else if (pat.form === "neg") out = `${S} didn't use to ${en}.`;
    else if (pat.form === "q") out = `Did ${s} use to ${en}?`;
    else out = `Didn't ${s} use to ${en}?`;
  } else {
    const be = BE_PAST[pat.p];
    const tail = use === "I" ? ` ${tailEn}` : "";
    if (pat.form === "stmt") out = `${S} ${be} ${en}${tail}.`;
    else if (pat.form === "neg") out = `${S} ${be === "was" ? "wasn't" : "weren't"} ${en}${tail}.`;
    else if (pat.form === "q") out = `${cap(be)} ${s} ${en}${tail}?`;
    else out = `${be === "was" ? "Wasn't" : "Weren't"} ${s} ${en}${tail}?`;
  }
  const tag = TAG[pat.p];
  return tag ? `${out} ${tag}` : out;
}

let seed = 20261026;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);

const out: Record<string, { question: string; options: string[]; answer: string }[]> = {};
for (const v of [...A, ...B]) {
  if (v.habit.length !== 6) throw new Error(`${v.inf}: need 6 habit complements`);
  if (v.prog && v.prog.length !== 4) throw new Error(`${v.inf}: need 4 progressive complements`);
  let h = 0, g = 0, k = 0;
  out[v.inf] = PATTERNS.map((pat, i) => {
    const use: Use = v.prog ? pat.use : "H";
    let en: string, fr: string, tailEn = "", tailFr = "";
    if (use === "H") [en, fr] = v.habit[h++ % 6];
    else {
      [en, fr] = v.prog![g++ % 4];
      if (use === "I") [tailEn, tailFr] = INTERRUPT[k++ % INTERRUPT.length];
    }
    const frC = pat.form === "neg" || pat.form === "negq" ? negComplement(v, fr) : fr;
    const pool: Kind[] = v.reflexive && ["je", "tu", "nous", "vous"].includes(pat.p)
      ? ["pc", "pres", "plup", "wrongEnd", "wrongPron"]
      : ["pc", "pres", "plup", "wrongEnd"];
    // Rotate which three distractors appear; always keep the passé composé (the key contrast).
    const rest = pool.slice(1);
    const start = i % rest.length;
    const picks: Kind[] = ["pc", rest[start], rest[(start + 1) % rest.length]];
    const correct = sentence(v, pat.p, pat.form, "imp", frC, tailFr);
    const wrong = picks.map((kind) => sentence(v, pat.p, pat.form, kind, frC, tailFr));
    const opts = [correct, ...wrong];
    if (new Set(opts).size !== 4) throw new Error(`${v.inf} #${i + 1}: duplicate options ${JSON.stringify(opts)}`);
    const pos = Math.floor(rand() * 4);
    const options = [...wrong.slice(0, pos), correct, ...wrong.slice(pos)];
    return { question: englishPrompt(pat, use, en, tailEn), options, answer: "ABCD"[pos] };
  });
}

const header = `// GENERATED by scripts/build-imparfait-quiz-data.ts — do not edit by hand.
// Imparfait question bank for Intermediate A (11 non-reflexive verbs) and
// Intermediate B (7 reflexive verbs), added 25 Oct 2026. 18 verbs × 20 = 360.
// No ElevenLabs audio until recorded (generate-intermediate-audio.ts --tense=imparfait).
import type { IntermediateQuizQuestion } from "./intermediate-quiz-data";

export const IMPARFAIT_QUIZ_DATA: Record<string, IntermediateQuizQuestion[]> = `;
writeFileSync("server/imparfait-quiz-data.ts", header + JSON.stringify(out, null, 2) + ";\n");
console.log(`wrote ${Object.keys(out).length} verbs, ${Object.values(out).reduce((n, q) => n + q.length, 0)} questions`);
