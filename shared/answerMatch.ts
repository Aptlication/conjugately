/**
 * Masters Mic — answer matching.
 *
 * One pure module, no dependencies, no knowledge of how the transcript was
 * produced. The iOS app feeds it Apple's Speech-framework transcript; the
 * staging harness at /matcher feeds it a fixture file. Both run this code,
 * so a threshold tuned on staging is the threshold that ships.
 *
 * Two numbers are in play and they fail differently:
 *
 *   confidence     how sure the recogniser is that it heard ANYTHING correctly.
 *                  Below the floor the utterance is UNHEARD — ask again. It is
 *                  never a wrong answer, because we have no evidence the user
 *                  said anything wrong.
 *
 *   similarity     how close the transcript is to the expected conjugation,
 *                  as normalised edit distance. This drives the accept /
 *                  disambiguate / retry bands.
 *
 * A confident transcript of the wrong verb form scores high on the first and
 * low on the second. That is exactly the case the ladder exists to catch.
 *
 * Accents are PRESERVED through normalisation. `parlè` vs `parlé` is precisely
 * what the app teaches, so folding accents away would make the matcher blind
 * to the thing being tested.
 *
 * NOTE: the 90% figure elsewhere in the product is an EXAM figure — the share
 * of questions answered right across a whole exam. The numbers here are
 * PER-ANSWER. They share a percent sign and nothing else.
 */

export type MatchBand = "accept" | "disambiguate" | "retry" | "unheard";

export interface MatchThresholds {
  /** Below this recogniser confidence, treat the utterance as unheard. */
  confidenceFloor: number;
  /** At or above this similarity, accept outright. */
  acceptAt: number;
  /** At or above this similarity (but below acceptAt), offer two alternatives. */
  disambiguateAt: number;
}

/**
 * Starting values, to be TUNED on staging against the fixture set — not
 * trusted as given. The lower boundary (0.75) is from the approved spec; the
 * accept band and the confidence floor are the two open numbers.
 */
export const DEFAULT_THRESHOLDS: MatchThresholds = {
  confidenceFloor: 0.4,
  acceptAt: 0.9,
  disambiguateAt: 0.75,
};

export interface MatchResult {
  band: MatchBand;
  /** 0..1 normalised similarity between transcript and the best expected form. */
  similarity: number;
  /** Raw Levenshtein distance against the best expected form. */
  distance: number;
  /** False when recogniser confidence fell below the floor. */
  confidencePassed: boolean;
  /** The normalised transcript — use this as the near-miss alternative in the ladder. */
  heard: string;
  /** The normalised expected form that scored best. */
  expected: string;
  /**
   * True when the transcript differs from the expected form ONLY in accents.
   * Such an answer is never accepted outright — see the accent guard below.
   */
  accentOnly: boolean;
}

/**
 * Strip diacritics for comparison ONLY. Never used to score a match — only to
 * detect that two forms are identical apart from their accents.
 */
export function foldAccents(input: string): string {
  return input.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Elisions expanded on BOTH sides, so the expansion cancels out rather than biasing. */
const ELISIONS: Array<[RegExp, string]> = [
  [/\bqu'/g, "que "],
  [/\bj'/g, "je "],
  [/\bt'/g, "te "],
  [/\bs'/g, "se "],
  [/\bn'/g, "ne "],
  [/\bm'/g, "me "],
  [/\bl'/g, "le "],
  [/\bd'/g, "de "],
  [/\bc'/g, "ce "],
];

/**
 * Lowercase, unify quotes, expand elisions, drop punctuation, collapse space.
 * Accents survive. Hyphens become spaces so `est-il` and `est il` agree.
 */
export function normaliseFrench(input: string): string {
  if (!input) return "";
  let s = input.normalize("NFC").trim().toLowerCase();

  // Curly quotes, primes and backticks all become a straight apostrophe first,
  // so the elision patterns below see one spelling.
  s = s.replace(/[‘’ʼ`´]/g, "'");

  // Hyphens and dashes are word separators in French inversion (`parlez-vous`).
  s = s.replace(/[-‐-―]/g, " ");

  for (const [pattern, replacement] of ELISIONS) {
    s = s.replace(pattern, replacement);
  }

  // Strip everything that is not a letter (accented included), digit or space.
  s = s.replace(/['".,!?;:()«»…]/g, " ");

  return s.replace(/\s+/g, " ").trim();
}

/** Standard Levenshtein distance, two-row rolling buffer. */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let previous = new Array<number>(b.length + 1);
  let current = new Array<number>(b.length + 1);

  for (let j = 0; j <= b.length; j++) previous[j] = j;

  for (let i = 1; i <= a.length; i++) {
    current[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const substitution = previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
      const insertion = current[j - 1] + 1;
      const deletion = previous[j] + 1;
      current[j] = Math.min(substitution, insertion, deletion);
    }
    const swap = previous;
    previous = current;
    current = swap;
  }

  return previous[b.length];
}

/** 1 = identical, 0 = nothing in common. Compares already-normalised strings. */
export function similarity(a: string, b: string): number {
  const longest = Math.max(a.length, b.length);
  if (longest === 0) return 1;
  return 1 - levenshtein(a, b) / longest;
}

/**
 * Score one spoken utterance against one or more acceptable written forms.
 *
 * @param transcript  what the recogniser heard, raw
 * @param expected    the correct conjugation; pass an array where more than one
 *                    written form is legitimately correct
 * @param confidence  recogniser confidence 0..1; pass 1 when unavailable
 */
export function matchAnswer(
  transcript: string,
  expected: string | string[],
  confidence = 1,
  thresholds: MatchThresholds = DEFAULT_THRESHOLDS,
): MatchResult {
  const heard = normaliseFrench(transcript);
  const candidates = (Array.isArray(expected) ? expected : [expected])
    .map(normaliseFrench)
    .filter((c) => c.length > 0);

  let best = { form: candidates[0] ?? "", score: -1, distance: Number.MAX_SAFE_INTEGER };
  for (const candidate of candidates) {
    const score = similarity(heard, candidate);
    if (score > best.score) {
      best = { form: candidate, score, distance: levenshtein(heard, candidate) };
    }
  }

  const confidencePassed = confidence >= thresholds.confidenceFloor;

  // An empty transcript is silence, not a wrong answer.
  let band: MatchBand =
    !confidencePassed || heard.length === 0
      ? "unheard"
      : best.score >= thresholds.acceptAt
        ? "accept"
        : best.score >= thresholds.disambiguateAt
          ? "disambiguate"
          : "retry";

  /**
   * ACCENT GUARD.
   *
   * Edit distance cannot tell a dropped accent from a dropped letter — both are
   * one character, and on the fixture set `je ai parle` (for `j'ai parlé`) and
   * `nous somme` (for `nous sommes`) score identically at 0.909. No threshold
   * separates them, so a threshold is the wrong instrument.
   *
   * The asymmetry is in the subject, not the arithmetic: an accent is the thing
   * this app teaches, so an answer that is right apart from its accents must
   * never be waved through as correct. It goes to disambiguation, where the
   * user is shown both forms and has to pick — which is the teaching moment.
   */
  const accentOnly =
    heard.length > 0 &&
    heard !== best.form &&
    foldAccents(heard) === foldAccents(best.form);

  if (accentOnly && band === "accept") band = "disambiguate";

  return {
    band,
    similarity: best.score < 0 ? 0 : best.score,
    distance: best.distance,
    confidencePassed,
    heard,
    expected: best.form,
    accentOnly,
  };
}

/**
 * A confirmed alternative scores FULL MARKS.
 *
 * When the ladder offers two forms and the user picks the correct one, that is
 * a right answer, not a half-right one. Landing in the disambiguation band is a
 * property of the recogniser, not evidence that the learner was unsure — and
 * part-marking an answer the user got right would make the mic quietly worse to
 * use than tapping A–D, which defeats the feature.
 *
 * Approved 12 September 2026. Academic only in 1.1, since the mic is not
 * permitted in exams (see MIC_ALLOWED_IN_EXAMS in ./exams), but the rule is
 * recorded here so it is not relitigated when it does become load-bearing.
 */
export const MARKS_FOR_CONFIRMED_ALTERNATIVE = 1;

/**
 * The two options offered in the disambiguation band, in randomised order, so
 * the correct form is never reliably first or second.
 *
 * `rand` is injectable so the harness and any test can pin the order.
 */
export function disambiguationOptions(
  correctForm: string,
  heardForm: string,
  rand: () => number = Math.random,
): [string, string] {
  return rand() < 0.5 ? [correctForm, heardForm] : [heardForm, correctForm];
}
