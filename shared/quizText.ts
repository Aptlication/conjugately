/** Quiz question text for display, shared by the conjugation quizzes and the Advanced quiz. */

/**
 * "You (Plural or Formal) will not take any shortcuts." becomes the sentence
 * "You will not take any shortcuts" plus "(plural or formal)", shown after it
 * in small italics (approved 4 Nov 2026), so the qualifier no longer splits
 * the sentence. Only the display changes; AI WHY and Vocab get the original.
 */
const QUALIFIER_WORDS = /^(plural|formal|informal|singular|feminine|masculine|mixed|male|female|or|only|and)$/i;
/**
 * "they" questions name the gender as male / female (Jonathan, 7 Nov 2026):
 * the banks also write m., masc., masculine, f., fem., feminine.
 */
const GENDER: Record<string, string> = {
  m: "male", "m.": "male", masc: "male", "masc.": "male", masculine: "male",
  f: "female", "f.": "female", fem: "female", "fem.": "female", feminine: "female",
};
export function splitQualifier(text: string): { main: string; qualifier: string; end: string } {
  const found: string[] = [];
  const main = text
    .replace(/\s*\(([^()]{1,40})\)/g, (_m, inner: string) => { found.push(inner.trim()); return ""; })
    .replace(/\s+([.,?!])/g, "$1").replace(/\s{2,}/g, " ").trim();
  if (!found.length || !main) return { main: text, qualifier: "", end: "" };
  const qualifier = found
    .map((q) => q.split(/(\s+|\/|,)/).map((w) => GENDER[w.toLowerCase()] ?? (QUALIFIER_WORDS.test(w) ? w.toLowerCase() : w)).join(""))
    .join(", ");
  // The sentence keeps its full stop (or ?/!) and the qualifier follows it:
  // "Will they take French lessons next year? (male)" (Jonathan, 4 Nov 2026).
  return { main, qualifier: `(${qualifier})`, end: "" };
}
