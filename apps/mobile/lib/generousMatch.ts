import { foldAccents, normaliseFrench, similarity } from "@shared/answerMatch";

/**
 * Generous judging for spoken replies in the Final conversations (23 Oct 2026).
 *
 * Jonathan: "it has to be generous, but if it's completely false we've got to
 * tell them." The old rule compared whole sentences letter by letter, so a
 * missing "Oui," or an "euh", or the recogniser writing "et" for "est", cost
 * marks. This judges by the words that matter instead:
 *
 *  - every recogniser guess is scored (alternatives + the last interim), best wins
 *  - word order, fillers (euh, oui, non, alors…), accents and punctuation are ignored
 *  - French sound-alikes count as the same word (est/et/ai/é, sont/son, a/à,
 *    ce/se, -er/-é/-ez/-ait endings, silent final letters)
 *  - score = share of the model answer's words that were heard (content words
 *    count fully, little grammar words half), against every accepted answer
 *
 *  good  (>= GOOD)  "Très bien" — the correct sentence is shown in full
 *  close (>= CLOSE) "Tu veux dire : … ?" — counts as understood
 *  miss             "Pas tout à fait" — the correct sentence is shown; one more try
 *
 * scripts/test-conversations.mjs checks every reply with realistic mis-hearings
 * (must be good) and other conversations' replies (must not be good).
 */

export const GOOD = 0.6;
export const CLOSE = 0.35;

export type Verdict = "good" | "close" | "miss";

const FILLERS = new Set(["euh", "heu", "hum", "hmm", "ben", "bah", "bon", "alors", "oui", "non", "ouais", "si", "ah", "oh", "eh", "voila", "donc", "et"]);
const SMALL = new Set(["je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles", "le", "la", "les", "un", "une", "des",
  "de", "du", "au", "aux", "a", "en", "y", "ne", "que", "se", "me", "te", "ce", "mon", "ma", "mes", "ton", "ta", "tes",
  "son", "sa", "ses", "leur", "leurs", "notre", "votre", "nos", "vos", "lui", "moi", "toi", "avec", "pour", "dans", "sur", "e"]);

/** A rough "sound key": spellings a French speaker would pronounce the same collapse together. */
export function soundKey(word: string): string {
  let w = foldAccents(word.toLowerCase()).replace(/[^a-z]/g, "");
  if (!w) return "";
  // whole-word homophones the recogniser mixes up
  const H: Record<string, string> = { est: "e", et: "e", ai: "e", es: "e", sont: "son", ces: "se", ses: "se", ce: "se", c: "se",
    s: "se", a: "a", as: "a", ont: "on", on: "on", mais: "me", mes: "me", les: "le", des: "de", leurs: "leur", vingt: "vin", vin: "vin",
    peu: "pe", peut: "pe", peux: "pe", vers: "ver", vert: "ver", verre: "ver", voix: "voi", vois: "voi", voit: "voi", foi: "foi", fois: "foi", foie: "foi" };
  if (H[w]) return H[w];
  w = w.replace(/^h/, "").replace(/ph/g, "f").replace(/qu/g, "k").replace(/c(?=[aou])/g, "k").replace(/y/g, "i")
       .replace(/(eaux|eau|aux|au)$/, "o");
  // silent / merged verb endings: parler, parlé, parlez, parlais, parlait, parlaient -> "parle"
  const root = w.replace(/(aient|ais|ait|ai|ez|er|e|es|ent|s|x|t|d)$/, "");
  // keep short words recognisable: "sais" must not shrink to "s" and meet "se"
  w = (root.length >= 3 ? root : w.replace(/[sxtd]$/, "")).replace(/(.)\1+/g, "$1");
  return w || word;
}

function words(text: string): string[] {
  return normaliseFrench(text).split(" ").filter(Boolean);
}

// Stems that mark the unit's verb in any tense ("the verb form being practised
// counts double"). Regular verbs: the infinitive's stem. Irregular verbs: their
// stems across présent, passé composé and futur. être/avoir are left out: their
// forms are grammar words (suis, a, ont…) and are covered by the rest of the score.
const IRREGULAR: Record<string, string[]> = {
  faire: ["fai", "fais", "fait", "fer", "fon"], aller: ["vai", "va", "vas", "vont", "all", "ir"],
  dire: ["di", "dis", "dit"], voir: ["voi", "vu", "verr"], savoir: ["sai", "sav", "su", "saur"],
  vouloir: ["veu", "voul", "voud"], venir: ["vien", "ven", "viend", "revien", "reven", "reviend"],
  pouvoir: ["peu", "pouv", "pu", "pourr"], besoin: ["besoin"], prendre: ["pren", "prend", "pri", "pris"],
  mettre: ["met", "mis"], croire: ["croi", "croy", "cru"], lire: ["li", "lis", "lu"], ecrire: ["ecri"],
  ouvrir: ["ouvr", "ouvert"], "se souvenir": ["souvien", "souven", "souviend"], "s'ennuyer": ["ennui", "ennuy"],
};
export function verbStems(verb?: string): string[] {
  if (!verb) return [];
  const v = foldAccents(verb.toLowerCase()).replace(/^avoir /, "");
  if (v === "etre" || v === "avoir") return [];
  if (IRREGULAR[v]) return IRREGULAR[v];
  const bare = v.replace(/^(se |s')/, "");
  if (IRREGULAR[bare]) return IRREGULAR[bare];
  const stem = bare.replace(/(er|ir|re)$/, "");
  return stem.length >= 3 ? [stem] : [];
}
const isVerbWord = (w: string, stems: string[]) => {
  const f = foldAccents(w.toLowerCase());
  // short irregular stems (vu, su, di, mis…) only match short words, so "dimanche" isn't "dire"
  return stems.some((st) => (st.length <= 3 ? f.startsWith(st) && f.length <= st.length + 5 : f.startsWith(st)));
};

// Grammar words: they count, but half, and they can never carry a reply on their own.
const NEG = new Set(["pas", "jamais", "rien", "plus", "personne", "aucun", "aucune"]);

const SUBJECTS = new Set(["je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles"]);
/** The person is what a conjugation app teaches: if the model has a subject, the learner must say it. */
function personHeard(heard: string, model: string): boolean | null {
  const want = words(model).map(foldAccents).filter((w) => SUBJECTS.has(w));
  if (!want.length) return null;
  const got = new Set(words(heard).map(foldAccents));
  // il/ils and elle/elles sound the same aloud
  const same = (w: string) => got.has(w) || got.has(w.replace(/s$/, "")) || got.has(w + "s") || (w === "nous" && got.has("on")) || (w === "on" && got.has("nous"));
  return want.some(same);
}

/**
 * Share of the model's words heard, order-free.
 * score: all words (grammar words weigh half). core: meaning words only (the
 * verb and nouns). A reply is only "good" if most meaning words were heard,
 * so "Non, je ne perds pas espoir" can't pass for "Non, je ne me suis pas ennuyé".
 */
export function wordScore(heard: string, model: string, stems: string[] = []): { score: number; core: number; verb: boolean | null } {
  const want = words(model).filter((w) => !FILLERS.has(foldAccents(w)));
  if (!want.length) return { score: 0, core: 0, verb: null };
  const got = words(heard).filter((w) => !FILLERS.has(foldAccents(w))).map(soundKey);
  const pool = [...got];
  let total = 0, hit = 0, coreTotal = 0, coreHit = 0, verbWords = 0, verbHit = 0;
  for (const w of want) {
    const f = foldAccents(w);
    const isCore = !SMALL.has(f) && !NEG.has(f);
    const isVerb = isCore && isVerbWord(w, stems);
    const weight = isVerb ? 2 : isCore ? 1 : 0.5;
    if (isVerb) verbWords++;
    total += weight;
    if (isCore) coreTotal++;
    const k = soundKey(w);
    let idx = pool.indexOf(k);
    if (idx < 0 && k.length >= 4) idx = pool.findIndex((g) => g.length >= 3 && similarity(g, k) >= 0.75);
    if (idx >= 0) { hit += weight; if (isCore) coreHit++; if (isVerb) verbHit++; pool.splice(idx, 1); }
  }
  return { score: hit / total, core: coreTotal ? coreHit / coreTotal : hit / total, verb: verbWords ? verbHit > 0 : null };
}

/** Judge a spoken reply. `heard` = every transcript the recogniser offered. */
export function judgeReply(heard: string[], accept: string[], unitVerb?: string): { verdict: Verdict; score: number; best: string } {
  const stems = verbStems(unitVerb);
  const tries = heard.map((h) => h.trim()).filter(Boolean);
  if (!tries.length) return { verdict: "miss", score: 0, best: "" };
  let best = { verdict: "miss" as Verdict, score: 0, best: tries[0] };
  const rank = { miss: 0, close: 1, good: 2 };
  for (const h of tries) {
    for (const a of accept) {
      const { score, core, verb } = wordScore(h, a, stems);
      const letters = similarity(normaliseFrench(h), normaliseFrench(a));
      // The practised verb must be heard for "good" (when the sentence has one we can spot).
      const verdict: Verdict =
        letters >= 0.85 || (score >= GOOD && core >= 0.5 && verb !== false && personHeard(h, a) !== false) ? "good"
        : score >= CLOSE && core > 0 ? "close"
        : "miss";
      const s = Math.max(score, letters);
      if (rank[verdict] > rank[best.verdict] || (verdict === best.verdict && s > best.score)) best = { verdict, score: s, best: h };
    }
  }
  return best;
}
