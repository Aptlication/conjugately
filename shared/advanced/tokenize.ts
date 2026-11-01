/**
 * Splits an Advanced article into tappable pieces.
 *
 * Every word is tappable (Jonathan, 31 Oct 2026: "every single word can be
 * added"). A word's lexicon key is its lowercase surface form ("voudrais");
 * a set phrase ("il vaudrait mieux", "état des lieux") is one piece whose key
 * is the phrase itself, so double-tapping any part of it saves the phrase.
 * Elisions stay with their word's apostrophe ("d'" + "identité").
 */

export type Piece =
  | { kind: "word"; text: string; key: string }
  | { kind: "gap"; text: string };

const WORD = /[A-Za-zÀ-ÖØ-öø-ÿŒœÆæ]+(?:-[A-Za-zÀ-ÖØ-öø-ÿŒœÆæ]+)*['’]?/g;

const lower = (s: string) => s.toLowerCase().replace(/’/g, "'");

/** Lexicon key of a single word as written. */
export const wordKey = (surface: string) => lower(surface);

/** Lexicon key of a phrase given as its words, e.g. ["il", "vaudrait", "mieux"]. */
export const phraseKey = (words: string[]) => words.map(lower).join(" ").replace(/' /g, "'");

/**
 * @param phrases each phrase as its lowercase words, longest first not required.
 */
export function tokenize(text: string, phrases: string[][] = []): Piece[] {
  // Raw split: words and the gaps between them.
  const raw: Piece[] = [];
  let last = 0;
  const re = new RegExp(WORD.source, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const at = m.index;
    if (at > last) raw.push({ kind: "gap", text: text.slice(last, at) });
    raw.push({ kind: "word", text: m[0], key: wordKey(m[0]) });
    last = at + m[0].length;
  }
  if (last < text.length) raw.push({ kind: "gap", text: text.slice(last) });

  // Longest phrases first, so "il vaudrait mieux" beats a shorter overlap.
  const ps = [...phrases].sort((a, b) => b.length - a.length);
  const out: Piece[] = [];
  for (let i = 0; i < raw.length; i++) {
    const p = raw[i];
    if (p.kind !== "word") { out.push(p); continue; }
    let matched: { end: number; words: string[] } | null = null;
    for (const words of ps) {
      let j = i, k = 0;
      while (k < words.length && j < raw.length) {
        const r = raw[j];
        if (r.kind === "gap") {
          // Only plain spaces may sit inside a phrase.
          if (k > 0 && /^\s+$/.test(r.text)) { j++; continue; }
          break;
        }
        if (r.key !== lower(words[k])) break;
        j++; k++;
      }
      if (k === words.length) { matched = { end: j, words }; break; }
    }
    if (matched) {
      const text = raw.slice(i, matched.end).map((r) => r.text).join("");
      out.push({ kind: "word", text, key: phraseKey(matched.words) });
      i = matched.end - 1;
    } else out.push(p);
  }
  return out;
}

/** Every distinct lexicon key an article needs (for the coverage test). */
export function keysIn(text: string, phrases: string[][] = []): string[] {
  return Array.from(new Set(tokenize(text, phrases).filter((p) => p.kind === "word").map((p) => (p as any).key as string)));
}
