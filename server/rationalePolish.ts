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
function detectTense(qText: string, correctText?: string): string {
  if (/futur/i.test(qText) || /\bwill\b/i.test(qText)) return "futur";
  if (/imparfait/i.test(qText)) return "imparfait";
  if (/passé composé/i.test(qText)) return "pc";
  if (correctText && /(?:^|\s)(ai|as|a|avons|avez|ont|suis|es|est|sommes|êtes|sont)\s+(?:pas\s+|jamais\s+|plus\s+|déjà\s+|encore\s+)?[a-zàâäéèêëîïôöûüù']*?(é|ée|és|ées|is|ie|ies|us|ues|it|ert|erte|i|u)(?=\s|[.?!,]|$)/i.test(correctText.replace(/n'/gi, ""))) return "pc";
  return "present";
}
function firstPronoun(s: string): string | null {
  const m = s.toLowerCase().match(/\b(je|j'|tu|il|elle|on|nous|vous|ils|elles)\b/);
  return m ? m[1] : null;
}

export function contrastExplain(qText: string, wrongText: string, correctText: string): string | null {
  const tense = detectTense(qText, correctText);
  const bare = !wrongText.includes(" ") && !correctText.includes(" ");
  if (bare && tense !== "pc") {
    const w = endingPerson(wrongText, tense), c = endingPerson(correctText, tense);
    if (w && c && w.ending !== c.ending) {
      return `«${wrongText}» is the ${w.person} form — this subject takes «${correctText}» (${c.person}).`;
    }
    return null;
  }
  const wp = firstPronoun(wrongText), cp = firstPronoun(correctText);
  const reflexRe = /\b(me|te|se|s'|m'|t'|nous|vous)\s*(débrouill|intéress|ennuy|entraîn|souvien|souvenu|adapt|réjou)/i;
  const correctReflexive = reflexRe.test(correctText);
  if (correctReflexive && cp && wp === cp && !reflexRe.test(wrongText)) {
    return `This verb is reflexive — with ${PRONOUN_PERSON[cp] || cp} it needs the reflexive pronoun: see «${correctText}».`;
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
    const AUXP: Record<string, string> = { "ai": "je", "as": "tu", "a": "il/elle",
      "avons": "nous", "avez": "vous", "ont": "ils/elles",
      "suis": "je", "es": "tu", "est": "il/elle", "sommes": "nous", "êtes": "vous", "sont": "ils/elles" };
    const wW = wrongText.replace(/[.?!]/g, "").split(" ");
    const cW = correctText.replace(/[.?!]/g, "").split(" ");
    if (wp === cp && wW.length === cW.length) {
      const dif = wW.map((w, i) => [w, cW[i]] as [string, string]).filter(([x, y]) => x !== y);
      if (dif.length === 1) {
        const wa = dif[0][0].toLowerCase().replace(/^n'/, ""), ca = dif[0][1].toLowerCase().replace(/^n'/, "");
        if (AUXP[wa] && AUXP[ca] && AUXP[wa] !== AUXP[ca]) {
          return `«${dif[0][0]}» is the ${AUXP[wa]} form of the auxiliary — ${PRONOUN_PERSON[cp!] || cp} takes «${dif[0][1]}».`;
        }
      }
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

    if (q.answerOptions && q.answerOptions.length) {
      const seen = new Map<string, { text?: string; rationale?: string; isCorrect?: boolean }>();
      const deduped: typeof q.answerOptions = [];
      for (const opt of q.answerOptions) {
        const k = (opt.text ?? "").trim().toLowerCase();
        const kept = k ? seen.get(k) : undefined;
        if (kept) {
          if (opt.isCorrect) { kept.isCorrect = true; kept.rationale = opt.rationale; }
          continue;
        }
        if (k) seen.set(k, opt);
        deduped.push(opt);
      }
      q.answerOptions = deduped;
    }

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

    if (correct?.text && correct.rationale === "Correct!") {
      const opts = q.answerOptions ?? [];
      for (let i = 0; i < opts.length; i++) {
        const o = opts[i];
        if (o.isCorrect || !o.text) continue;
        let e = contrastExplain(q.question ?? "", o.text, correct.text);
        if (e) {
          e = e.replace(`: «${correct.text}».`, ".");
          correct.rationale = normalizeLabels(`Correct! Compare option ${String.fromCharCode(65 + i)} — ${e}`);
          break;
        }
      }
    }
  }
  return questions;
}
