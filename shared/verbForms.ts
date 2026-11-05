/**
 * Verb pronunciation, every form (approved by Jonathan 5 Nov 2026): the blue
 * button lists the verb forms a quiz actually tests, in person order, and plays
 * them one by one; a second tap stops it.
 *
 * The forms come from the quiz's own correct answers, so they are always the
 * ones the learner is being tested on: "Ne prendra-t-elle pas de risques ?"
 * gives "elle prendra", "N'ont-elles pas pris l'autoroute ?" gives "elles ont
 * pris". Negation, inversion, "est-ce que" and object pronouns are dropped; a
 * reflexive verb keeps its pronoun ("nous nous souvenons"). il / elle (and ils /
 * elles) sound the same, so they share a line and one recording.
 *
 * Audio: attached_assets/audio/verbs/forms/<slug>.mp3 on the server, recorded by
 * scripts/record-verb-pronunciation.mjs (same voice as the vocab cards).
 */
import { VERB_SOUNDS, usesParticiple, verbSlug } from "./verbPronunciation";

export type Person = "je" | "tu" | "il" | "nous" | "vous" | "ils";
export const PERSONS: Person[] = ["je", "tu", "il", "nous", "vous", "ils"];

export type VerbForm = {
  person: Person;
  /** As listed: "il / elle prendra". */
  text: string;
  /** As spoken and recorded: "il prendra". */
  spoken: string;
  /** Under attached_assets/audio/verbs/. */
  clip: string;
};

const SUBJECTS: Record<string, Person> = {
  je: "je", "j'": "je", tu: "tu", il: "il", elle: "il", on: "il",
  nous: "nous", vous: "vous", ils: "ils", elles: "ils",
};
const OBJECTS = new Set(["me", "m'", "te", "t'", "se", "s'", "le", "la", "l'", "les", "lui", "leur", "y", "en", "nous", "vous"]);
const NEG = new Set(["ne", "n'"]);
const REFLEXIVE: Record<Person, string> = { je: "me", tu: "te", il: "se", nous: "nous", vous: "vous", ils: "se" };
/** Words that can sit between the auxiliary and the participle. */
const BETWEEN = new Set(["pas", "jamais", "rien", "plus", "bien", "déjà", "souvent", "toujours", "encore", "tout", "beaucoup",
  "trop", "vraiment", "assez", "mal", "point", "guère", "peut-être", "aussi", "enfin", "presque", "vite", "rarement", "longtemps", "beaucoup", "même"]);
const VOWEL = /^[aeiouyéèêëàâäîïôöûüh]/i;

const plain = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function tokens(sentence: string): string[] {
  let s = sentence.normalize("NFC").replace(/[’‘`´]/g, "'").replace(/[«»"“”?!.,;:…()]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  s = s.replace(/^est-ce qu(?:e |')/, "");
  const out: string[] = [];
  for (const w of s.split(" ")) {
    const m = w.match(/^(j'|n'|m'|t'|s'|l'|qu')(.+)$/);
    if (m) out.push(m[1], m[2]); else if (w) out.push(w);
  }
  return out;
}

function isReflexiveVerb(verb: string): boolean {
  return /^(se |s')/.test(verb.trim());
}

/** The past participle to look for after the auxiliary ("pris", "allé", "souvenu"). */
function participleOf(verb: string): string | null {
  const key = verb.normalize("NFC").trim();
  const v = VERB_SOUNDS[key] ?? VERB_SOUNDS[key.toLowerCase()];
  if (v?.participle) return v.participle.replace(/^eu besoin$/, "eu");
  const bare = (v?.infinitive ?? key).replace(/^(se |s')/, "").replace(/^avoir /, "");
  if (bare.endsWith("er")) return bare.slice(0, -2) + "é";
  return null;
}

/** "avoir besoin": the word that always follows the verb. */
function tailOf(verb: string): string | null {
  const key = verb.normalize("NFC").trim();
  return key === "besoin" || key === "avoir besoin" ? "besoin" : null;
}

function elide(words: string[]): string {
  const out: string[] = [];
  for (let i = 0; i < words.length; i++) {
    const w = words[i], next = words[i + 1];
    if (next && VOWEL.test(next) && (w === "je" || w === "me" || w === "te" || w === "se")) out.push(w[0] + "'" + next), i++;
    else out.push(w);
  }
  return out.join(" ").replace(/' /g, "'");
}

const INV = /^(.+?)-(?:t-)?(je|tu|il|elle|on|nous|vous|ils|elles)$/;
const PLURAL_3 = /(ent|ont)$/;
const NOUS_FORM = /(ons|sommes)$/;
const VOUS_FORM = /(ez|êtes|faites|dites)$/;

/**
 * The tested form in one correct answer, or null if it can't be read with
 * confidence. `wrongs` (the other options) pin down which words are the verb:
 * the options differ only there, which matters when a sentence has two verbs
 * ("Quand nous habitions à Lyon, je visitais…") or a noun subject ("Ma sœur a
 * visité…", read as "il a visité").
 */
export function formOf(answer: string, verb: string, tense: string, wrongs: string[] = []):
  { person: Person; subject: string; spoken: string } | null {
  // Options that differ only in word order or a pronoun can't pin the verb: read it on its own then.
  return readForm(answer, verb, tense, wrongs) ?? (wrongs.length ? readForm(answer, verb, tense, []) : null);
}

function readForm(answer: string, verb: string, tense: string, wrongs: string[]):
  { person: Person; subject: string; spoken: string } | null {
  const t = tokens(answer);
  if (!t.length) return null;
  const reflexive = isReflexiveVerb(verb);
  const others = wrongs.map(tokens).filter((w) => w.length);
  const differs = (i: number) => others.some((w) => !w.includes(t[i]));
  const skippable = (w: string) => NEG.has(w) || OBJECTS.has(w) || BETWEEN.has(w);

  // 1. The verb: the participle's auxiliary in the compound tenses, else the
  //    first word the options disagree on (or, with no options, the word after the subject).
  let headAt = -1, participle = "";
  if (usesParticiple(tense)) {
    const pp = participleOf(verb);
    if (!pp) return null;
    const stem = plain(pp).slice(0, Math.min(3, plain(pp).length));
    for (let i = 1; i < t.length && headAt < 0; i++) {
      if (!plain(t[i]).startsWith(stem)) continue;
      let k = i - 1;
      while (k >= 0 && (BETWEEN.has(t[k]) || NEG.has(t[k]))) k--;
      if (k < 0) continue;
      if (others.length && !differs(i) && !differs(k)) continue;
      headAt = k; participle = t[i];
    }
  } else if (others.length) {
    headAt = t.findIndex((w, i) => differs(i) && !(w in SUBJECTS) && !skippable(w));
  } else {
    const s = t.findIndex((w) => w in SUBJECTS || INV.test(w));
    if (s >= 0 && INV.test(t[s])) headAt = s;
    else if (s >= 0) { let i = s + 1; while (i < t.length && (NEG.has(t[i]) || OBJECTS.has(t[i]))) i++; headAt = i < t.length ? i : -1; }
  }
  if (headAt < 0) return null;

  // 2. The subject: inverted onto the verb, or the nearest pronoun before it
  //    that agrees, or a noun (then il / ils by the verb's ending).
  let head = t[headAt], subject = "", person: Person | null = null;
  const inv = head.match(INV);
  if (inv) { head = inv[1]; subject = inv[2]; person = SUBJECTS[subject]; }
  else {
    for (let k = headAt - 1; k >= 0; k--) {
      const w = t[k];
      if (w in SUBJECTS) {
        const p = SUBJECTS[w];
        const agrees = p === "nous" ? NOUS_FORM.test(head) || /^(avons|avions|étions|serons)$/.test(head)
          : p === "vous" ? VOUS_FORM.test(head) || /^(avez|aviez|étiez)$/.test(head) : true;
        if (agrees) { subject = w === "j'" ? "je" : w; person = p; break; }
        continue;
      }
      if (skippable(w)) continue;
      break;
    }
    if (!person) { person = PLURAL_3.test(head) || /^(sont|font|vont|ont)$/.test(head) ? "ils" : "il"; subject = person; }
  }
  // "c'est", "ce sont": not a personal form of the verb.
  if (!head || head.includes("-") || head === "ce" || /^c'/.test(head)) return null;
  if (head === "puis" && person === "je") head = "peux";

  const words = [subject];
  if (reflexive) words.push(REFLEXIVE[person]);
  words.push(head);
  if (participle) words.push(participle);
  const tail = tailOf(verb);
  if (tail && t.includes(tail)) words.push(tail);
  return { person, subject, spoken: elide(words) };
}

/** Clip file for a spoken form: "j'ai pris" → "forms/j-ai-pris.mp3". */
export const formClip = (spoken: string) => `forms/${verbSlug(spoken)}.mp3`;

/** Every form a quiz tests, in person order: je, tu, il / elle, nous, vous, ils / elles. */
export function formsForQuiz(answers: (string | { answer: string; wrongs?: string[] })[], verb: string, tense: string): VerbForm[] {
  const by = new Map<Person, { subjects: Set<string>; spoken: Map<string, string> }>();
  for (const a of answers) {
    const f = typeof a === "string" ? formOf(a, verb, tense) : formOf(a.answer, verb, tense, a.wrongs ?? []);
    if (!f) continue;
    const e = by.get(f.person) ?? { subjects: new Set<string>(), spoken: new Map<string, string>() };
    e.subjects.add(f.subject);
    if (!e.spoken.has(f.subject)) e.spoken.set(f.subject, f.spoken);
    by.set(f.person, e);
  }
  const out: VerbForm[] = [];
  for (const p of PERSONS) {
    const e = by.get(p);
    if (!e) continue;
    // Prefer the masculine subject for the recording (il / ils), else whichever the quiz used.
    const lead = [p === "il" ? "il" : p === "ils" ? "ils" : p, p === "il" ? "elle" : p === "ils" ? "elles" : p, "on"]
      .find((s) => e.spoken.has(s)) ?? [...e.spoken.keys()][0];
    const spoken = e.spoken.get(lead)!;
    const shared = (p === "il" && e.subjects.has("il") && e.subjects.has("elle")) || (p === "ils" && e.subjects.has("ils") && e.subjects.has("elles"));
    const text = shared ? spoken.replace(/^(ils|il)\b/, p === "il" ? "il / elle" : "ils / elles") : spoken;
    out.push({ person: p, text, spoken, clip: formClip(spoken) });
  }
  return out;
}
