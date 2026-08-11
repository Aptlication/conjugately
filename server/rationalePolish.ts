/**
 * Rationale polish (source-of-truth quality pass, applied at the API):
 * - Drops trite filler ("This follows proper French conjugation rules").
 * - Expands grammar jargon with a concise inline example so captions teach.
 * - Standardises person/gender labels: tu=(informal), vous=(formal/plural),
 *   genders written out as (female)/(male).
 * - Conjugation-contrast engine: replaces bare "Incorrect conjugation." with a
 *   precise explanation comparing the wrong form against the correct one
 *   (person endings, reflexive pronouns, auxiliary choice, participle
 *   agreement). Falls back to the existing rationale when unsure.
 * Rationales are display-only (never spoken), so this does not interact with
 * the pre-recorded audio manifest.
 */

const TRITE_PATTERNS: RegExp[] = [
  /^Correct!\s*This follows proper French conjugation rules\.?$/i,
  /^This follows proper French conjugation rules\.?$/i,
  /^Correct conjugation!?\.?$/i,
];

const TRITE_INCORRECT: RegExp[] = [
  /^Incorrect conjugation\.?$/i,
  /^Incorrect\.?$/i,
  /^Wrong\.?$/i,
  /^Incorrect form\.?$/i,
  /^$/,
];

const JARGON_GLOSSARY: Array<{ match: RegExp; explain: string }> = [
  {
    match: /negative interrogative/i,
    explain: ' — a negated question: « N’as-tu pas… ? » ("Don’t you have…?")',
  },
  {
    match: /interrogative/i,
    explain: ' — a question formed by inversion: « As-tu… ? » ("Do you have…?")',
  },
  {
    match: /French negation|using negation|negative form/i,
    explain: ' — « ne … pas » wraps the verb: « Je ne sais pas » ("I don’t know")',
  },
  {
    match: /reflexive/i,
    explain: ' — the action turns back on the subject: « se laver » ("to wash oneself")',
  },
  {
    match: /inversion/i,
    explain: ' — verb and pronoun swap places: « Avez-vous… ? »',
  },
];

// ---------- label standardisation ----------
export function normalizeLabels(t: string | undefined): string {
  if (!t) return t ?? "";
  return t
    .replace(/\(sing\.?(ular)? informal\)/gi, "(informal)")
    .replace(/\(sing\.?\)/gi, "(informal)")
    .replace(/\(singular\)/gi, "(informal)")
    .replace(/\(inf\.?\)/gi, "(informal)")
    .replace(/\(pl\.?\)/gi, "(formal/plural)")
    .replace(/\(plural\)/gi, "(formal/plural)")
    .replace(/\(form\.\)/gi, "(formal/plural)")
    .replace(/\(formal\)(?!\/)/gi, "(formal/plural)")
    .replace(/\(f\.?\)/g, "(female)")
    .replace(/\(fem\.?\)/gi, "(female)")
    .replace(/\(feminine\)/gi, "(female)")
    .replace(/\(m\.?\)/g, "(male)")
    .replace(/\(masc\.?\)/gi, "(male)")
    .replace(/\(masculine\)/gi, "(male)");
}

// ---------- conjugation-contrast engine ----------
const PRONOUN_PERSON: Record<string, string> = {
  "je": "je (I)", "j'": "je (I)", "tu": "tu (informal you)", "il": "il (he)",
  "elle": "elle (she)", "on": "on (one/we)", "nous": "nous (we)",
  "vous": "vous (formal/plural you)", "ils": "ils (they)", "elles": "elles (they, female)",
};
const FUTUR: Record<string, string> = { ai: "je", as: "tu", a: "il/elle", ons: "nous", ez: "vous", ont: "ils/elles" };
const IMPARFAIT: Record<string, string> = { ais: "je/tu", ait: "il/elle", ions: "nous", iez: "vous", aient: "ils/elles" };
const PRESENT_ER: Record<string, string> = { e: "je or il/elle", es: "tu", ons: "nous", ez: "vous", ent: "ils/elles" };

function endingPerson(word: string, tense: string): { ending: string; person: string } | null {
  const table = tense === "futur" ? FUTUR : tense === "imparfait" ? IMPARFAIT : PRESENT_ER;
  const keys = Object.keys(table).sort((a, b) => b.length - a.length);
  for (const k of keys) if (word.toLowerCase().endsWith(k)) return { ending: k, person: table[k] };
  return null;
}
function detectTense(qText: string): string {
  if (/futur/i.test(qText) || /\bwill\b/i.test(qText)) return "futur";
  if (/imparfait/i.test(qText)) return "imparfait";
  if (/passé composé/i.test(qText)) return "pc";
  return "present";
}
function firstPronoun(s: string): string | null {
  const m = s.toLowerCase().match(/\b(je|j'|tu|il|elle|on|nous|vous|ils|elles)\b/);
  return m ? m[1] : null;
}

export function contrastExplain(qText: string, wrongText: string, correctText: string): string | null {
  const tense = detectTense(qText);
  const bare = !wrongText.includes(" ") && !correctText.includes(" ");
  if (bare && tense !== "pc") {
    const w = endingPerson(wrongText, tense), c = endingPerson(correctText, tense);
    if (w && c && w.ending !== c.ending) {
      return `«${wrongText}» is the ${w.person} form — this subject takes «${correctText}» (${c.person}).`;
    }
    return null;
  }
  const wp = firstPronoun(wrongText), cp = firstPronoun(correctText);
  const correctReflexive = /\b(me|te|se|s'|m'|t'|nous|vous)\s*(débrouill|intéress|ennuy|entraîn|souvien|souvenu|adapt|réjou)/i.test(correctText);
  if (correctReflexive && cp) {
    const wLower = " " + wrongText.toLowerCase();
    const reflexOk: Record<string, RegExp> = {
      "je": /\bje (me |m')/, "tu": /\btu (te |t')/, "il": /\bil (se |s')/,
      "elle": /\belle (se |s')/, "nous": /\bnous nous /, "vous": /\bvous vous /,
      "ils": /\bils (se |s')/, "elles": /\belles (se |s')/,
    };
    const ok = reflexOk[cp];
    if (wp === cp && ok && !ok.test(wLower)) {
      return `This verb is reflexive — with ${PRONOUN_PERSON[cp] || cp} it needs the reflexive pronoun: see «${correctText}».`;
    }
  }
  if (tense === "pc") {
    const etreCorrect = /\b(suis|es|est|sommes|êtes|sont)\b/.test(correctText.toLowerCase());
    const avoirWrong = /\b(ai|as|a|avons|avez|ont)\b/.test(wrongText.toLowerCase());
    const etreWrong = /\b(suis|es|est|sommes|êtes|sont)\b/.test(wrongText.toLowerCase());
    if (etreCorrect && avoirWrong && !etreWrong && wp === cp) {
      return `This verb forms the passé composé with être, not avoir: «${correctText}».`;
    }
    if (!etreCorrect && etreWrong && wp === cp) {
      return `This verb forms the passé composé with avoir, not être: «${correctText}».`;
    }
    const wWords = wrongText.replace(/[.?!]/g, "").split(" ");
    const cWords = correctText.replace(/[.?!]/g, "").split(" ");
    if (wp === cp && wWords.length === cWords.length) {
      const diffs = wWords.map((w, i) => [w, cWords[i]] as [string, string]).filter(([a, b]) => a !== b);
      if (diffs.length === 1) {
        const [a, b] = diffs[0];
        if (a.replace(/e?s?$/, "") === b.replace(/e?s?$/, "")) {
          return `Participle agreement: with this subject the participle is «${b}», not «${a}».`;
        }
      }
    }
  }
  if (wp && cp && wp !== cp) {
    return `This is the ${PRONOUN_PERSON[wp] || wp} form — the question asks about ${PRONOUN_PERSON[cp] || cp}: «${correctText}».`;
  }
  if (wp === cp && tense !== "pc") {
    const wWords = wrongText.replace(/[.?!]/g, "").split(" ");
    const cWords = correctText.replace(/[.?!]/g, "").split(" ");
    const wVerb = wWords.find((w, i) => i > 0 && w !== cWords[i]);
    const cVerb = cWords.find((w, i) => i > 0 && w !== wWords[i]);
    if (wVerb && cVerb) {
      const w = endingPerson(wVerb, tense), c = endingPerson(cVerb, tense);
      if (w && c && w.ending !== c.ending) {
        return `«${wVerb}» is the ${w.person} ending — ${PRONOUN_PERSON[cp!] || cp} takes «${cVerb}».`;
      }
    }
  }
  return null;
}

function polishText(raw: string | undefined): string {
  if (!raw) return raw ?? "";
  let text = raw.trim();

  for (const t of TRITE_PATTERNS) {
    if (t.test(text)) return "Correct!";
  }

  // Already contains an example (guillemets or quoted French)? Leave it alone.
  if (text.includes("«") || text.includes("»")) return text;

  for (const j of JARGON_GLOSSARY) {
    if (j.match.test(text)) {
      const base = text.endsWith(".") ? text.slice(0, -1) : text;
      return base + j.explain;
    }
  }
  return text;
}

export function polishQuestions<T extends {
  question?: string; hint?: string;
  answerOptions?: Array<{ text?: string; rationale?: string; isCorrect?: boolean }>;
}>(questions: T[]): T[] {
  for (const q of questions ?? []) {
    q.question = normalizeLabels(q.question);
    q.hint = normalizeLabels(q.hint);
    const correct = (q.answerOptions ?? []).find((o) => o.isCorrect);
    for (const opt of q.answerOptions ?? []) {
      let r = polishText(opt.rationale);
      if (!opt.isCorrect && correct?.text && opt.text &&
          TRITE_INCORRECT.some((p) => p.test(r))) {
        const e = contrastExplain(q.question ?? "", opt.text, correct.text);
        if (e) r = e;
      }
      opt.rationale = normalizeLabels(r);
    }
  }
  return questions;
}
