import { normaliseFrench } from "./answerMatch";

/**
 * Spoken answers: forms that sound the same are the same answer (1.3.15,
 * decided 26 Oct 2026).
 *
 * Masters Mic hears sound, not spelling. "Il ne parlait pas" and "Il ne parlais
 * pas" are pronounced identically, so a learner who says the right thing can be
 * written down as the wrong spelling and marked wrong. When the option the
 * recogniser snapped to sounds the same as the correct option, the spoken
 * answer counts as correct.
 *
 * The key is deliberately narrow: it only merges spellings that are silent in
 * speech, so options that a listener CAN tell apart stay apart:
 *   - -ais / -ait / -aient          -> one sound  (parlais = parlait = parlaient)
 *   - -er / -ez / -é / -ée / -és    -> one sound  (parler = parlez = parlé)
 *   - -e / -es / -ent               -> silent     (parle = parles = parlent)
 *   - final -s / -t / -x / -d       -> silent     (finis = finit)
 *   - ils / elles before a consonant = il / elle  (ils parlaient = il parlait);
 *     before a vowel the liaison is heard (ils aiment ≠ il aime), so they stay apart.
 * -ais/-ait (/ɛ/) is kept apart from -é/-er (/e/): parlais ≠ parlé.
 */

const VOWEL_START = /^[aeiouyàâäéèêëîïôöùûüœh]/;

// Pronouns are kept as written: whether ils/elles merge with il/elle depends on
// the next word (liaison), which soundAlikeKey decides.
const KEEP = new Set(["il", "ils", "elle", "elles", "nous", "vous"]);

function wordKey(w: string): string {
  if (w.length <= 3 || KEEP.has(w)) return w; // short grammar words (est, et, ai, a, les…) are left as written
  if (/(aient|ais|ait)$/.test(w)) return w.replace(/(aient|ais|ait)$/, "ɛ");
  if (/(ées|ée|és|é|er|ez)$/.test(w)) return w.replace(/(ées|ée|és|é|er|ez)$/, "e_");
  return w.replace(/(ent|es|e)$/, "").replace(/[stxd]$/, "");
}

export function soundAlikeKey(sentence: string): string {
  const ws = normaliseFrench(sentence).split(" ").filter(Boolean);
  return ws
    .map((w, i) => {
      const next = ws[i + 1] ?? "";
      if ((w === "ils" || w === "elles") && next && !VOWEL_START.test(next)) w = w.slice(0, -1);
      return wordKey(w);
    })
    .join(" ");
}

/** True when two written answers are pronounced the same. */
export function soundsAlike(a: string, b: string): boolean {
  return soundAlikeKey(a) === soundAlikeKey(b);
}
