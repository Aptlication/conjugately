/**
 * Fixture set for tuning the Masters Mic accept band.
 *
 * Each row is one spoken attempt: what the user was asked to say, what the
 * recogniser produced, and what SHOULD happen. Run them through the harness at
 * /matcher on staging and sweep the thresholds until the two error columns are
 * as small as you can get them together.
 *
 * The two errors are not symmetric:
 *
 *   a correct answer sent to disambiguation is ANNOYING — the user said the
 *   right thing and got second-guessed;
 *
 *   a wrong answer accepted is CORROSIVE — the app just taught a wrong
 *   conjugation and told the user they were right.
 *
 * So when the sweep is close, bias toward the higher accept band.
 *
 * `want` is the intended outcome, not a prediction of what the current
 * thresholds do. Rows where the matcher disagrees with `want` are the output
 * that matters.
 *
 * Replace `confidence` with real values once you have a device build — these
 * are placeholders chosen to exercise the floor, not measurements.
 */

import type { MatchBand } from "./answerMatch";

export interface MatcherFixture {
  /** Short note on what this row is testing. */
  note: string;
  /** The correct written conjugation, as the question expects it. */
  expected: string;
  /** What the recogniser returned. */
  transcript: string;
  /** Recogniser confidence 0..1. */
  confidence: number;
  /** What should happen. */
  want: MatchBand;
}

export const MATCHER_FIXTURES: MatcherFixture[] = [
  // ---- clean accepts -------------------------------------------------------
  { note: "exact", expected: "je suis", transcript: "je suis", confidence: 0.94, want: "accept" },
  { note: "exact, reflexive", expected: "je me souviens", transcript: "je me souviens", confidence: 0.9, want: "accept" },
  { note: "capitalisation and full stop", expected: "tu as", transcript: "Tu as.", confidence: 0.93, want: "accept" },
  { note: "elision spelt out by the recogniser", expected: "j'ai", transcript: "je ai", confidence: 0.88, want: "accept" },
  { note: "elision as written", expected: "j'ai", transcript: "j'ai", confidence: 0.95, want: "accept" },
  { note: "inversion hyphen dropped", expected: "parlez-vous", transcript: "parlez vous", confidence: 0.91, want: "accept" },
  { note: "curly apostrophe", expected: "qu'il est", transcript: "qu’il est", confidence: 0.92, want: "accept" },
  { note: "negation intact", expected: "je ne suis pas", transcript: "je ne suis pas", confidence: 0.89, want: "accept" },

  // ---- accent errors: these MUST NOT be waved through ----------------------
  { note: "accent dropped on participle", expected: "j'ai parlé", transcript: "je ai parle", confidence: 0.9, want: "disambiguate" },
  { note: "wrong accent direction", expected: "parlé", transcript: "parlè", confidence: 0.87, want: "disambiguate" },
  { note: "-er heard for -é (the classic homophone)", expected: "j'ai mangé", transcript: "je ai manger", confidence: 0.91, want: "disambiguate" },
  { note: "-ez heard for -é", expected: "vous avez trouvé", transcript: "vous avez trouvez", confidence: 0.88, want: "disambiguate" },

  // ---- right verb, wrong person: a real grammar error ----------------------
  { note: "wrong person, same verb", expected: "je suis", transcript: "tu es", confidence: 0.93, want: "retry" },
  { note: "wrong person, avoir", expected: "nous avons", transcript: "vous avez", confidence: 0.92, want: "retry" },
  { note: "third person for first", expected: "je fais", transcript: "il fait", confidence: 0.9, want: "retry" },

  // ---- right person, wrong tense ------------------------------------------
  { note: "present given for passé composé", expected: "j'ai fait", transcript: "je fais", confidence: 0.9, want: "retry" },
  { note: "future given for present", expected: "je vais", transcript: "j'irai", confidence: 0.89, want: "retry" },

  // ---- near-misses in the disambiguation band ------------------------------
  { note: "auxiliary swallowed", expected: "je suis allé", transcript: "je suis aller", confidence: 0.84, want: "disambiguate" },
  // `je lève` and `je me lève` mean different things, so a dropped reflexive
  // pronoun is a grammar error rather than a mishearing. It belongs in retry.
  { note: "reflexive pronoun dropped", expected: "je me lève", transcript: "je lève", confidence: 0.82, want: "retry" },
  { note: "one letter off", expected: "nous sommes", transcript: "nous somme", confidence: 0.86, want: "accept" },

  // ---- unheard: confidence floor, not wrongness ----------------------------
  { note: "silence", expected: "je suis", transcript: "", confidence: 0.0, want: "unheard" },
  { note: "room noise transcribed as something", expected: "je suis", transcript: "euh", confidence: 0.12, want: "unheard" },
  { note: "mumbled — low confidence but plausible text", expected: "tu es", transcript: "tu es", confidence: 0.2, want: "unheard" },

  // ---- nothing like the answer --------------------------------------------
  { note: "user said something else entirely", expected: "je suis", transcript: "what was the question", confidence: 0.8, want: "retry" },
  { note: "English spoken instead of French", expected: "je suis", transcript: "I am", confidence: 0.85, want: "retry" },
];
