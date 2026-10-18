import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "conjugately_vocabulary";

type VocabWord = {
  id: string; french: string; english: string; verb?: string; tense?: string;
  difficulty?: string; status: "new" | "learning" | "mastered";
  timesCorrect: number; timesIncorrect: number; createdAt: string;
};

// Auto-collect a missed question: saves the correct French phrase for review.
// If already saved, bumps timesIncorrect and resets status to "new".
// Binned words return on a repeat mistake by design.
export async function collectMissedWord(w: {
  french: string; english: string; verb?: string; tense?: string; difficulty?: string;
}) {
  try {
    let words: VocabWord[] = [];
    try { words = JSON.parse((await AsyncStorage.getItem(KEY)) || "[]"); } catch {}
    const norm = w.french.trim().toLowerCase();
    const hit = words.find((x) => (x.french || "").trim().toLowerCase() === norm);
    if (hit) { hit.timesIncorrect = (hit.timesIncorrect || 0) + 1; hit.status = "new"; }
    else words.unshift({ id: Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      french: w.french.trim(), english: w.english.trim(), verb: w.verb, tense: w.tense,
      difficulty: w.difficulty, status: "new", timesCorrect: 0, timesIncorrect: 1,
      createdAt: new Date().toISOString() });
    await AsyncStorage.setItem(KEY, JSON.stringify(words.slice(0, 800)));
  } catch {}
}

/**
 * Words from a finished post-quiz conversation (1.2.1). Each is tagged with the
 * unit it came from (level · verb · tense) so the Vocab screen can group by
 * unit. A word already in the list is left alone: it keeps its status and its
 * original unit, and is never duplicated.
 */
export async function collectConversationWords(
  words: { fr: string; en: string }[],
  unit: { level: string; verb: string; tense: string },
): Promise<number> {
  try {
    let list: (VocabWord & { source?: string })[] = [];
    try { list = JSON.parse((await AsyncStorage.getItem(KEY)) || "[]"); } catch {}
    const have = new Set(list.map((x) => (x.french || "").trim().toLowerCase()));
    const now = new Date().toISOString();
    const fresh = words
      .filter((w) => !have.has(w.fr.trim().toLowerCase()))
      .map((w, i) => ({
        id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
        french: w.fr.trim(), english: w.en.trim(),
        verb: unit.verb, tense: unit.tense, difficulty: unit.level,
        status: "new" as const, timesCorrect: 0, timesIncorrect: 0,
        createdAt: now, source: "conversation",
      }));
    if (fresh.length) await AsyncStorage.setItem(KEY, JSON.stringify([...fresh, ...list].slice(0, 800)));
    return fresh.length;
  } catch {
    return 0;
  }
}
