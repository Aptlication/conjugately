/**
 * Final Conversations: four spoken options (1.3.16, decided 26 Oct 2026).
 *
 * Every learner reply gets three wrong answers beside the right one, the way
 * Masters Mic works in quizzes: whatever is heard is snapped to the nearest of
 * the four and marked right or wrong.
 *
 * Keyed by "Level|TimeFrame|verb" then by the reply's model answer (`fr`), so the
 * generated dialogue files (conversations.ts etc.) are never edited by hand and
 * warm-ups added in front don't shift anything.
 *
 * Rules (checked by scripts/test-conversation-options.ts):
 *  - exactly three wrong answers per reply, each different from the right one;
 *  - only the verb is wrong (person, tense or auxiliary); the rest stays as is;
 *  - no wrong answer sounds like the right one or like another option
 *    (shared/soundAlike.ts) — the mic must be able to tell them apart, so a
 *    look-alike that sounds the same would be a wasted option;
 *  - near-merges avoided too: no -rai / -rais pairs (serai/serais).
 *
 * A reply with no entry here falls back to the old free-speech judging, so the
 * levels can be rolled out one at a time. Pilot: Beginner.
 */
export const CONVERSATION_OPTIONS: Record<string, Record<string, string[]>> = {
  // ------------------------------------------------------------ Beginner ---
  "Beginner|Present|être": {
    "Oui, je suis étudiant.": ["Oui, je est étudiant.", "Oui, je sommes étudiant.", "Oui, je serai étudiant."],
    "Il est à la maison.": ["Il sont à la maison.", "Il sera à la maison.", "Il a été à la maison."],
  },
  "Beginner|Past|être": {
    "Oui, j'ai été malade.": ["Oui, je suis été malade.", "Oui, je serai malade.", "Oui, j'avons été malade."],
    "Oui, nous avons été en retard.": ["Oui, nous sommes été en retard.", "Oui, nous serons en retard.", "Oui, nous avez été en retard."],
  },
  "Beginner|Future|être": {
    "Oui, je serai à Paris.": ["Oui, j'ai été à Paris.", "Oui, je sera à Paris.", "Oui, je seront à Paris."],
    "Non, ils seront à Lyon.": ["Non, ils ont été à Lyon.", "Non, ils sera à Lyon.", "Non, ils serez à Lyon."],
  },
  "Beginner|Present|avoir": {
    "Oui, j'ai un chien.": ["Oui, je suis un chien.", "Oui, j'aurai un chien.", "Oui, j'avons un chien."],
    "Non, elle a un lapin.": ["Non, elle est un lapin.", "Non, elle aura un lapin.", "Non, elle ont un lapin."],
  },
  "Beginner|Past|avoir": {
    "Oui, j'ai eu un beau cadeau.": ["Oui, je suis eu un beau cadeau.", "Oui, j'aurai un beau cadeau.", "Oui, j'ai un beau cadeau."],
    "Oui, il a eu un vélo.": ["Oui, il est eu un vélo.", "Oui, il aura un vélo.", "Oui, il ont eu un vélo."],
  },
  "Beginner|Future|avoir": {
    "Oui, j'aurai le temps.": ["Oui, j'ai eu le temps.", "Oui, je serai le temps.", "Oui, j'aura le temps."],
    "Non, il aura du travail.": ["Non, il a eu du travail.", "Non, il sera du travail.", "Non, il auront du travail."],
  },
  "Beginner|Present|faire": {
    "Je fais un gâteau.": ["Je ferai un gâteau.", "J'ai fait un gâteau.", "Je font un gâteau."],
    "Ils font leurs devoirs.": ["Ils ont fait leurs devoirs.", "Ils feront leurs devoirs.", "Ils faites leurs devoirs."],
  },
  "Beginner|Past|faire": {
    "J'ai fait les courses.": ["Je suis fait les courses.", "Je ferai les courses.", "Je fais les courses."],
    "Elle a fait une soupe.": ["Elle est fait une soupe.", "Elle fera une soupe.", "Elle ont fait une soupe."],
  },
  "Beginner|Future|faire": {
    "Je ferai une promenade.": ["J'ai fait une promenade.", "Je fera une promenade.", "Je ferons une promenade."],
    "Oui, nous ferons du sport.": ["Oui, nous avons fait du sport.", "Oui, nous ferez du sport.", "Oui, nous faisons du sport."],
  },
};

/** The three wrong answers for a reply, or undefined if that level isn't converted yet. */
export function wrongOptions(convKey: string, modelAnswer: string): string[] | undefined {
  return CONVERSATION_OPTIONS[convKey.normalize("NFC")]?.[modelAnswer.normalize("NFC")];
}
