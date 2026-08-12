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
    await AsyncStorage.setItem(KEY, JSON.stringify(words.slice(0, 500)));
  } catch {}
}
