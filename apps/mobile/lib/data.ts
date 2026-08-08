export const API_BASE = "https://conjugately.onrender.com";

export const LEVELS = [
  { key: "", label: "Select difficulty level...", detail: "" },
  { key: "Beginner", label: "⚪ Beginner", detail: "Subject pronoun focus (Je suis, Tu es), 3 verbs (être, avoir, faire)" },
  { key: "Novice", label: "🔵 Novice", detail: "4 verbs (être, avoir, faire, aller), Present, past, and future tenses" },
  { key: "Elementary", label: "🟢 Elementary", detail: "7 verbs, Present, past, and future tenses" },
  { key: "Intermediate", label: "🟡 Intermediate", detail: "18 verbs (7 reflexive + 11 non-reflexive), Present, past, and future tenses" },
  { key: "Advanced", label: "🔒 Advanced - Coming Soon!", detail: "", disabled: true },
];

export const DIFFICULTY_CONFIGS: Record<string, { verbs: string[] }> = {
  Beginner: { verbs: ["être", "avoir", "faire"] },
  Novice: { verbs: ["être", "avoir", "faire", "aller"] },
  Elementary: { verbs: ["dire", "voir", "savoir", "vouloir", "venir", "pouvoir", "besoin"] },
  Intermediate: { verbs: ["s'intéresser", "se débrouiller", "s'ennuyer", "s'entraîner", "se souvenir", "s'adapter", "se réjouir", "mettre", "trouver", "croire", "parler", "prendre", "lire", "écrire", "ouvrir", "fermer", "perdre", "garder"] },
};

export const VERB_MEANINGS: Record<string, string> = {
  "être": "to be", "avoir": "to have", "faire": "to do/make", "dire": "to say/tell",
  "aller": "to go", "voir": "to see", "savoir": "to know", "pouvoir": "to be able to/can",
  "vouloir": "to want", "venir": "to come", "besoin": "to need",
  "s'intéresser": "to be interested", "se débrouiller": "to manage/get by",
  "s'ennuyer": "to get bored", "s'entraîner": "to train/practice",
  "se souvenir": "to remember", "s'adapter": "to adapt",
  "se réjouir": "to be delighted/rejoice", "mettre": "to put/place/wear",
  "trouver": "to find", "croire": "to believe", "parler": "to speak/talk",
  "prendre": "to take", "lire": "to read", "écrire": "to write",
  "ouvrir": "to open", "fermer": "to close", "perdre": "to lose", "garder": "to keep",
};

export const TIME_FRAMES = ["Present", "Past", "Future"];
