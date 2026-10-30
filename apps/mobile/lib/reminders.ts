import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Pop-ups a learner can switch off with "Don't remind me again" (or that show
 * only once), each with the AsyncStorage flag that hides it. The Journey
 * screen lists the ones switched off, one line each, so they can be turned
 * back on (Jonathan, 30 Oct 2026). Add a line here for any new pop-up that
 * can be switched off.
 */
export const REMINDERS: { key: string; label: string }[] = [
  { key: "mastersMicPromoNever", label: "“Say it aloud” Masters Mic pop-up" },
  { key: "mastersMicIntroShown", label: "Masters Mic how-to (Hold Record…)" },
  { key: "dontShowInstructionPopup", label: "Quiz tip: correct answers advance" },
  { key: "beginnerPronounGuideShown", label: "Beginner pronouns guide" },
];

/** The reminders currently switched off. */
export async function switchedOffReminders(): Promise<{ key: string; label: string }[]> {
  try {
    const pairs = await AsyncStorage.multiGet(REMINDERS.map((r) => r.key));
    const off = new Set(pairs.filter(([, v]) => v === "true").map(([k]) => k));
    return REMINDERS.filter((r) => off.has(r.key));
  } catch {
    return [];
  }
}

/** Turn one back on: it shows again next time its screen opens. */
export async function turnReminderBackOn(key: string): Promise<void> {
  await AsyncStorage.removeItem(key).catch(() => {});
}
