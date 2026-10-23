import AsyncStorage from "@react-native-async-storage/async-storage";
import { shuffle } from "@shared/shuffle";

/**
 * Vocab check (post-quiz vocabulary session), specified by Jonathan 21 Oct 2026.
 *
 * After a course unit's quiz, and after its Final conversation, every new noun,
 * adjective and adverb of the unit is tested (pronouns are never tested).
 *
 *  - The card shows the French word. Under it sits the VIS-CUE button.
 *  - If VIS-CUE is NOT pressed, four likely English answers appear (one right).
 *  - If VIS-CUE IS pressed, an emoji picture clue appears. Tapping it again
 *    shows the four answers. Using VIS-CUE counts as INCORRECT even when the
 *    answer chosen is right. (21 Oct 2026: emoji only — the gender props and
 *    sound-alike mnemonics were tried in the mock-up and dropped.)
 *  - Correct without VIS-CUE -> the word is passed and never shown again.
 *  - Incorrect (or cued) -> the word keeps coming back in this session until
 *    passed. If the learner quits, it carries to the next vocab check, and so
 *    on, until it is passed.
 *
 * The word bank covers every level (1.2.3): Beginner, Novice, Elementary and Intermediate.
 * Beginner quizzes are pronoun + verb only ("Je suis", "Il n'a pas été"), so
 * at Beginner the words come from the unit's Final conversation.
 */

export type VocabPos = "noun" | "adjective" | "adverb";
export type Gender = "m" | "f";

export type CheckWord = {
  id: string;
  /** Unit key, "Level|TimeFrame|verb" — the same key the conversations use. */
  unit: string;
  /** What the card shows, article included where there is one. */
  fr: string;
  en: string;
  /** Three plausible wrong answers, same kind of word as `en`. If `en` carries a
   *  tag such as "(male)", every distractor carries the same tag, or the tag gives the answer away. */
  distractors: [string, string, string];
  pos: VocabPos;
  /** Nouns only. */
  gender?: Gender;
  /** The VIS-CUE picture clue: one emoji, or two where one can't carry the meaning (📅⬅️ = yesterday). */
  emoji: string;
};

const W = (w: CheckWord) => w;

/**
 * Beginner être and avoir quizzes are pronoun + verb only, so their words come
 * from the unit's Final conversation; faire's quizzes add the weather words
 * (chaud, froid, la nuit — "Il fait froid"). A word an earlier verb already teaches
 * is not repeated (avoir's conversations use demain and aussi; être has them).
 * Set phrases are tested by their noun: "Quelle chance !" -> la chance.
 * Novice quizzes are full sentences, so its words come from both the quizzes
 * and the conversations. A word Beginner already teaches is not repeated at
 * Novice; names (Italie, Julie), numbers and set phrases are left out.
 * Elementary and Intermediate (23 Oct 2026) follow the same rules: words from
 * each unit's quiz answers and conversation, none repeated from an earlier
 * unit or level, and no emoji used twice anywhere in the bank.
 */
export const CHECK_WORDS: CheckWord[] = [
  // ── Beginner · Present · être ───────────────────────────────────────
  W({ id: "beg-etre-etudiant", unit: "Beginner|Present|être", fr: "un étudiant", en: "student (male)",
    distractors: ["teacher (male)",  "doctor (male)",  "neighbour (male)"], pos: "noun", gender: "m", emoji: "👨‍🎓" }),
  W({ id: "beg-etre-etudiante", unit: "Beginner|Present|être", fr: "une étudiante", en: "student (female)",
    distractors: ["teacher (female)",  "doctor (female)",  "neighbour (female)"], pos: "noun", gender: "f", emoji: "👩‍🎓" }),
  W({ id: "beg-etre-ami", unit: "Beginner|Present|être", fr: "un ami", en: "friend",
    distractors: ["enemy",  "brother",  "boss"], pos: "noun", gender: "m", emoji: "🤝" }),
  W({ id: "beg-etre-maison", unit: "Beginner|Present|être", fr: "la maison", en: "house, home",
    distractors: ["shop",  "school",  "garden"], pos: "noun", gender: "f", emoji: "🏠" }),
  W({ id: "beg-etre-cafe", unit: "Beginner|Present|être", fr: "le café", en: "café",
    distractors: ["cinema",  "bakery",  "station"], pos: "noun", gender: "m", emoji: "☕" }),
  W({ id: "beg-etre-ou", unit: "Beginner|Present|être", fr: "où", en: "where",
    distractors: ["when",  "why",  "how"], pos: "adverb", emoji: "📍❓" }),
  W({ id: "beg-etre-super", unit: "Beginner|Present|être", fr: "super", en: "great",
    distractors: ["small",  "tired",  "early"], pos: "adjective", emoji: "🤩" }),
  // ── Beginner · Past · être ──────────────────────────────────────────
  W({ id: "beg-etre-malade", unit: "Beginner|Past|être", fr: "malade", en: "ill",
    distractors: ["hungry",  "happy",  "late"], pos: "adjective", emoji: "🤒" }),
  W({ id: "beg-etre-hier", unit: "Beginner|Past|être", fr: "hier", en: "yesterday",
    distractors: ["tomorrow",  "today",  "tonight"], pos: "adverb", emoji: "📅⬅️" }),
  W({ id: "beg-etre-en-retard", unit: "Beginner|Past|être", fr: "en retard", en: "late",
    distractors: ["early",  "on time",  "tired"], pos: "adverb", emoji: "⏰🏃" }),
  W({ id: "beg-etre-matin", unit: "Beginner|Past|être", fr: "le matin", en: "morning",
    distractors: ["evening",  "night",  "afternoon"], pos: "noun", gender: "m", emoji: "🌅" }),
  W({ id: "beg-etre-grave", unit: "Beginner|Past|être", fr: "grave", en: "serious",
    distractors: ["funny",  "easy",  "happy"], pos: "adjective", emoji: "😐" }),
  // ── Beginner · Future · être ────────────────────────────────────────
  W({ id: "beg-etre-demain", unit: "Beginner|Future|être", fr: "demain", en: "tomorrow",
    distractors: ["yesterday",  "today",  "tonight"], pos: "adverb", emoji: "📅➡️" }),
  W({ id: "beg-etre-parents", unit: "Beginner|Future|être", fr: "les parents", en: "parents",
    distractors: ["children",  "cousins",  "neighbours"], pos: "noun", gender: "m", emoji: "👫" }),
  W({ id: "beg-etre-la", unit: "Beginner|Future|être", fr: "là", en: "there",
    distractors: ["here",  "now",  "where"], pos: "adverb", emoji: "👉" }),
  W({ id: "beg-etre-aussi", unit: "Beginner|Future|être", fr: "aussi", en: "also, too",
    distractors: ["only",  "again",  "never"], pos: "adverb", emoji: "➕" }),
  W({ id: "beg-etre-bon", unit: "Beginner|Future|être", fr: "bon", en: "good",
    distractors: ["bad",  "big",  "new"], pos: "adjective", emoji: "👍" }),
  W({ id: "beg-etre-voyage", unit: "Beginner|Future|être", fr: "le voyage", en: "trip, journey",
    distractors: ["ticket",  "luggage",  "station"], pos: "noun", gender: "m", emoji: "✈️🧳" }),
  // ── Beginner · Present · avoir ──────────────────────────────────────
  W({ id: "beg-avoir-chien", unit: "Beginner|Present|avoir", fr: "un chien", en: "dog",
    distractors: ["cat",  "horse",  "bird"], pos: "noun", gender: "m", emoji: "🐕" }),
  W({ id: "beg-avoir-soeur", unit: "Beginner|Present|avoir", fr: "une sœur", en: "sister",
    distractors: ["brother",  "mother",  "aunt"], pos: "noun", gender: "f", emoji: "👧" }),
  W({ id: "beg-avoir-chat", unit: "Beginner|Present|avoir", fr: "un chat", en: "cat",
    distractors: ["dog",  "mouse",  "rabbit"], pos: "noun", gender: "m", emoji: "🐈" }),
  W({ id: "beg-avoir-lapin", unit: "Beginner|Present|avoir", fr: "un lapin", en: "rabbit",
    distractors: ["mouse",  "cat",  "hamster"], pos: "noun", gender: "m", emoji: "🐇" }),
  W({ id: "beg-avoir-famille", unit: "Beginner|Present|avoir", fr: "la famille", en: "family",
    distractors: ["friends",  "house",  "holiday"], pos: "noun", gender: "f", emoji: "👨‍👩‍👧‍👦" }),
  // ── Beginner · Past · avoir ─────────────────────────────────────────
  W({ id: "beg-avoir-cadeau", unit: "Beginner|Past|avoir", fr: "un cadeau", en: "present, gift",
    distractors: ["card",  "cake",  "party"], pos: "noun", gender: "m", emoji: "🎁" }),
  W({ id: "beg-avoir-anniversaire", unit: "Beginner|Past|avoir", fr: "un anniversaire", en: "birthday",
    distractors: ["wedding",  "holiday",  "weekend"], pos: "noun", gender: "m", emoji: "🎂" }),
  W({ id: "beg-avoir-frere", unit: "Beginner|Past|avoir", fr: "un frère", en: "brother",
    distractors: ["sister",  "father",  "cousin"], pos: "noun", gender: "m", emoji: "👦" }),
  W({ id: "beg-avoir-velo", unit: "Beginner|Past|avoir", fr: "un vélo", en: "bike",
    distractors: ["car",  "bus",  "train"], pos: "noun", gender: "m", emoji: "🚲" }),
  W({ id: "beg-avoir-beau", unit: "Beginner|Past|avoir", fr: "beau", en: "lovely, beautiful",
    distractors: ["ugly",  "small",  "old"], pos: "adjective", emoji: "🌸" }),
  W({ id: "beg-avoir-chance", unit: "Beginner|Past|avoir", fr: "la chance", en: "luck",
    distractors: ["money",  "time",  "hope"], pos: "noun", gender: "f", emoji: "🍀" }),
  // ── Beginner · Future · avoir ───────────────────────────────────────
  W({ id: "beg-avoir-temps", unit: "Beginner|Future|avoir", fr: "le temps", en: "time",
    distractors: ["money",  "place",  "help"], pos: "noun", gender: "m", emoji: "⏳" }),
  W({ id: "beg-avoir-travail", unit: "Beginner|Future|avoir", fr: "le travail", en: "work",
    distractors: ["holiday",  "school",  "rest"], pos: "noun", gender: "m", emoji: "💼" }),
  W({ id: "beg-avoir-d-accord", unit: "Beginner|Future|avoir", fr: "d'accord", en: "OK, agreed",
    distractors: ["sorry",  "maybe",  "never"], pos: "adverb", emoji: "👌" }),
  // ── Beginner · Present · faire ──────────────────────────────────────
  W({ id: "beg-faire-soir", unit: "Beginner|Present|faire", fr: "le soir", en: "evening",
    distractors: ["morning",  "afternoon",  "weekend"], pos: "noun", gender: "m", emoji: "🌆" }),
  W({ id: "beg-faire-gateau", unit: "Beginner|Present|faire", fr: "un gâteau", en: "cake",
    distractors: ["bread",  "biscuit",  "pie"], pos: "noun", gender: "m", emoji: "🍰" }),
  W({ id: "beg-faire-devoirs", unit: "Beginner|Present|faire", fr: "les devoirs", en: "homework",
    distractors: ["holidays",  "exams",  "lessons"], pos: "noun", gender: "m", emoji: "📝" }),
  W({ id: "beg-faire-chaud", unit: "Beginner|Present|faire", fr: "chaud", en: "hot",
    distractors: ["cold",  "wet",  "windy"], pos: "adjective", emoji: "🥵" }),
  W({ id: "beg-faire-froid", unit: "Beginner|Present|faire", fr: "froid", en: "cold",
    distractors: ["hot",  "dry",  "sunny"], pos: "adjective", emoji: "🥶" }),
  W({ id: "beg-faire-nuit", unit: "Beginner|Present|faire", fr: "la nuit", en: "night",
    distractors: ["day",  "morning",  "evening"], pos: "noun", gender: "f", emoji: "🌙" }),
  // ── Beginner · Past · faire ─────────────────────────────────────────
  W({ id: "beg-faire-courses", unit: "Beginner|Past|faire", fr: "les courses", en: "shopping",
    distractors: ["cooking",  "cleaning",  "washing"], pos: "noun", gender: "f", emoji: "🛒" }),
  W({ id: "beg-faire-mere", unit: "Beginner|Past|faire", fr: "une mère", en: "mother",
    distractors: ["father",  "sister",  "aunt"], pos: "noun", gender: "f", emoji: "👩‍👧" }),
  W({ id: "beg-faire-soupe", unit: "Beginner|Past|faire", fr: "une soupe", en: "soup",
    distractors: ["salad",  "bread",  "cake"], pos: "noun", gender: "f", emoji: "🍲" }),
  W({ id: "beg-faire-tres", unit: "Beginner|Past|faire", fr: "très", en: "very",
    distractors: ["too",  "quite",  "not"], pos: "adverb", emoji: "💯" }),
  W({ id: "beg-faire-bien", unit: "Beginner|Past|faire", fr: "bien", en: "well",
    distractors: ["badly",  "often",  "soon"], pos: "adverb", emoji: "✅" }),
  // ── Beginner · Future · faire ───────────────────────────────────────
  W({ id: "beg-faire-samedi", unit: "Beginner|Future|faire", fr: "samedi", en: "Saturday",
    distractors: ["Sunday",  "Friday",  "Monday"], pos: "noun", gender: "m", emoji: "🗓️6️⃣" }),
  W({ id: "beg-faire-dimanche", unit: "Beginner|Future|faire", fr: "dimanche", en: "Sunday",
    distractors: ["Saturday",  "Monday",  "Friday"], pos: "noun", gender: "m", emoji: "🗓️7️⃣" }),
  W({ id: "beg-faire-promenade", unit: "Beginner|Future|faire", fr: "une promenade", en: "walk",
    distractors: ["run",  "ride",  "swim"], pos: "noun", gender: "f", emoji: "🚶" }),
  W({ id: "beg-faire-sport", unit: "Beginner|Future|faire", fr: "le sport", en: "sport",
    distractors: ["music",  "dance",  "game"], pos: "noun", gender: "m", emoji: "⚽" }),
  W({ id: "beg-faire-excellent", unit: "Beginner|Future|faire", fr: "excellent", en: "excellent",
    distractors: ["awful",  "average",  "boring"], pos: "adjective", emoji: "🌟" }),
  // ── Novice · Present · être ───────────────────────────────────
  W({ id: "nov-etre-heureux", unit: "Novice|Present|être", fr: "heureux", en: "happy",
    distractors: ["sad",  "angry",  "bored"], pos: "adjective", emoji: "😊" }),
  W({ id: "nov-etre-pret", unit: "Novice|Present|être", fr: "prêt", en: "ready",
    distractors: ["late",  "busy",  "lost"], pos: "adjective", emoji: "🏁" }),
  W({ id: "nov-etre-fatigue", unit: "Novice|Present|être", fr: "fatigué", en: "tired",
    distractors: ["hungry",  "ready",  "angry"], pos: "adjective", emoji: "😴" }),
  W({ id: "nov-etre-gentil", unit: "Novice|Present|être", fr: "gentil", en: "kind",
    distractors: ["rude",  "shy",  "lazy"], pos: "adjective", emoji: "🤗" }),
  W({ id: "nov-etre-professeur", unit: "Novice|Present|être", fr: "un professeur", en: "teacher",
    distractors: ["doctor",  "student",  "waiter"], pos: "noun", gender: "m", emoji: "👨‍🏫" }),
  W({ id: "nov-etre-francais", unit: "Novice|Present|être", fr: "français", en: "French",
    distractors: ["English",  "Spanish",  "German"], pos: "adjective", emoji: "🇫🇷" }),
  W({ id: "nov-etre-australien", unit: "Novice|Present|être", fr: "australien", en: "Australian",
    distractors: ["Austrian",  "British",  "American"], pos: "adjective", emoji: "🇦🇺" }),
  W({ id: "nov-etre-vacances", unit: "Novice|Present|être", fr: "les vacances", en: "holidays",
    distractors: ["work",  "school",  "weekend"], pos: "noun", gender: "f", emoji: "🏝️" }),
  W({ id: "nov-etre-ici", unit: "Novice|Present|être", fr: "ici", en: "here",
    distractors: ["there",  "where",  "now"], pos: "adverb", emoji: "👇" }),
  // ── Novice · Present · avoir ──────────────────────────────────
  W({ id: "nov-avoir-voiture", unit: "Novice|Present|avoir", fr: "une voiture", en: "car",
    distractors: ["bus",  "bike",  "train"], pos: "noun", gender: "f", emoji: "🚗" }),
  W({ id: "nov-avoir-probleme", unit: "Novice|Present|avoir", fr: "un problème", en: "problem",
    distractors: ["answer",  "idea",  "plan"], pos: "noun", gender: "m", emoji: "⚠️" }),
  W({ id: "nov-avoir-fete", unit: "Novice|Present|avoir", fr: "une fête", en: "party",
    distractors: ["meal",  "game",  "trip"], pos: "noun", gender: "f", emoji: "🎉" }),
  W({ id: "nov-avoir-livre", unit: "Novice|Present|avoir", fr: "un livre", en: "book",
    distractors: ["pen",  "letter",  "map"], pos: "noun", gender: "m", emoji: "📖" }),
  W({ id: "nov-avoir-cle", unit: "Novice|Present|avoir", fr: "une clé", en: "key",
    distractors: ["lock",  "door",  "coin"], pos: "noun", gender: "f", emoji: "🔑" }),
  W({ id: "nov-avoir-enfants", unit: "Novice|Present|avoir", fr: "les enfants", en: "children",
    distractors: ["parents",  "cousins",  "friends"], pos: "noun", gender: "m", emoji: "🧒🧒" }),
  W({ id: "nov-avoir-age", unit: "Novice|Present|avoir", fr: "un âge", en: "age",
    distractors: ["size",  "name",  "height"], pos: "noun", gender: "m", emoji: "👶👴" }),
  W({ id: "nov-avoir-an", unit: "Novice|Present|avoir", fr: "un an", en: "year",
    distractors: ["month",  "week",  "day"], pos: "noun", gender: "m", emoji: "🎆" }),
  // ── Novice · Present · faire ──────────────────────────────────
  W({ id: "nov-faire-vaisselle", unit: "Novice|Present|faire", fr: "la vaisselle", en: "the dishes",
    distractors: ["the laundry",  "the cooking",  "the shopping"], pos: "noun", gender: "f", emoji: "🍽️" }),
  W({ id: "nov-faire-cuisine", unit: "Novice|Present|faire", fr: "la cuisine", en: "cooking, kitchen",
    distractors: ["cleaning",  "washing",  "baking"], pos: "noun", gender: "f", emoji: "🍳" }),
  W({ id: "nov-faire-menage", unit: "Novice|Present|faire", fr: "le ménage", en: "housework, cleaning",
    distractors: ["cooking",  "shopping",  "gardening"], pos: "noun", gender: "m", emoji: "🧹" }),
  W({ id: "nov-faire-lessive", unit: "Novice|Present|faire", fr: "la lessive", en: "laundry",
    distractors: ["dishes",  "ironing",  "cooking"], pos: "noun", gender: "f", emoji: "🧺" }),
  W({ id: "nov-faire-puzzle", unit: "Novice|Present|faire", fr: "un puzzle", en: "jigsaw",
    distractors: ["game",  "quiz",  "drawing"], pos: "noun", gender: "m", emoji: "🧩" }),
  W({ id: "nov-faire-aujourd-hui", unit: "Novice|Present|faire", fr: "aujourd'hui", en: "today",
    distractors: ["yesterday",  "tomorrow",  "tonight"], pos: "adverb", emoji: "📅📍" }),
  W({ id: "nov-faire-idee", unit: "Novice|Present|faire", fr: "une idée", en: "idea",
    distractors: ["plan",  "joke",  "question"], pos: "noun", gender: "f", emoji: "💡" }),
  W({ id: "nov-faire-alors", unit: "Novice|Present|faire", fr: "alors", en: "so, then",
    distractors: ["but",  "because",  "never"], pos: "adverb", emoji: "⏩" }),
  // ── Novice · Present · aller ──────────────────────────────────
  W({ id: "nov-aller-ecole", unit: "Novice|Present|aller", fr: "une école", en: "school",
    distractors: ["office",  "church",  "library"], pos: "noun", gender: "f", emoji: "🏫" }),
  W({ id: "nov-aller-parc", unit: "Novice|Present|aller", fr: "le parc", en: "park",
    distractors: ["garden",  "beach",  "square"], pos: "noun", gender: "m", emoji: "🌳" }),
  W({ id: "nov-aller-marche", unit: "Novice|Present|aller", fr: "le marché", en: "market",
    distractors: ["shop",  "bank",  "station"], pos: "noun", gender: "m", emoji: "🥕🍅" }),
  W({ id: "nov-aller-magasin", unit: "Novice|Present|aller", fr: "le magasin", en: "shop, store",
    distractors: ["market",  "bank",  "office"], pos: "noun", gender: "m", emoji: "🏪" }),
  W({ id: "nov-aller-cinema", unit: "Novice|Present|aller", fr: "le cinéma", en: "cinema",
    distractors: ["theatre",  "museum",  "stadium"], pos: "noun", gender: "m", emoji: "🎬" }),
  W({ id: "nov-aller-musee", unit: "Novice|Present|aller", fr: "le musée", en: "museum",
    distractors: ["library",  "church",  "cinema"], pos: "noun", gender: "m", emoji: "🏛️" }),
  W({ id: "nov-aller-boulangerie", unit: "Novice|Present|aller", fr: "la boulangerie", en: "bakery",
    distractors: ["butcher's",  "chemist's",  "bookshop"], pos: "noun", gender: "f", emoji: "🥖" }),
  // ── Novice · Past · être ──────────────────────────────────────
  W({ id: "nov-etre-content", unit: "Novice|Past|être", fr: "content", en: "happy, pleased",
    distractors: ["sad",  "angry",  "tired"], pos: "adjective", emoji: "😄" }),
  W({ id: "nov-etre-ete", unit: "Novice|Past|être", fr: "un été", en: "summer",
    distractors: ["winter",  "spring",  "autumn"], pos: "noun", gender: "m", emoji: "🌞" }),
  // ── Novice · Past · avoir ─────────────────────────────────────
  W({ id: "nov-avoir-peur", unit: "Novice|Past|avoir", fr: "la peur", en: "fear",
    distractors: ["anger",  "joy",  "pain"], pos: "noun", gender: "f", emoji: "😱" }),
  W({ id: "nov-avoir-film", unit: "Novice|Past|avoir", fr: "le film", en: "film",
    distractors: ["song",  "book",  "play"], pos: "noun", gender: "m", emoji: "🎞️" }),
  W({ id: "nov-avoir-courageux", unit: "Novice|Past|avoir", fr: "courageux", en: "brave",
    distractors: ["scared",  "lazy",  "rude"], pos: "adjective", emoji: "🦁" }),
  // ── Novice · Past · faire ─────────────────────────────────────
  W({ id: "nov-faire-projet", unit: "Novice|Past|faire", fr: "un projet", en: "project",
    distractors: ["problem",  "job",  "test"], pos: "noun", gender: "m", emoji: "📋" }),
  W({ id: "nov-faire-erreur", unit: "Novice|Past|faire", fr: "une erreur", en: "mistake",
    distractors: ["answer",  "idea",  "rule"], pos: "noun", gender: "f", emoji: "❌" }),
  W({ id: "nov-faire-exercice", unit: "Novice|Past|faire", fr: "un exercice", en: "exercise",
    distractors: ["rest",  "sleep",  "meal"], pos: "noun", gender: "m", emoji: "🤸" }),
  W({ id: "nov-faire-chose", unit: "Novice|Past|faire", fr: "la chose", en: "thing",
    distractors: ["person",  "place",  "time"], pos: "noun", gender: "f", emoji: "📦" }),
  W({ id: "nov-faire-ville", unit: "Novice|Past|faire", fr: "la ville", en: "town, city",
    distractors: ["village",  "country",  "street"], pos: "noun", gender: "f", emoji: "🏙️" }),
  W({ id: "nov-faire-parfait", unit: "Novice|Past|faire", fr: "parfait", en: "perfect",
    distractors: ["average",  "wrong",  "simple"], pos: "adjective", emoji: "🏆" }),
  // ── Novice · Past · aller ─────────────────────────────────────
  W({ id: "nov-aller-copine", unit: "Novice|Past|aller", fr: "une copine", en: "girlfriend",
    distractors: ["sister",  "teacher",  "neighbour"], pos: "noun", gender: "f", emoji: "💕" }),
  W({ id: "nov-aller-plage", unit: "Novice|Past|aller", fr: "la plage", en: "beach",
    distractors: ["park",  "pool",  "forest"], pos: "noun", gender: "f", emoji: "🏖️" }),
  // ── Novice · Future · être ────────────────────────────────────
  W({ id: "nov-etre-dommage", unit: "Novice|Future|être", fr: "dommage", en: "a shame, a pity",
    distractors: ["a relief",  "a surprise",  "a joke"], pos: "noun", gender: "m", emoji: "😞" }),
  // ── Novice · Future · avoir ───────────────────────────────────
  W({ id: "nov-avoir-permis", unit: "Novice|Future|avoir", fr: "le permis", en: "driving licence",
    distractors: ["ticket",  "passport",  "form"], pos: "noun", gender: "m", emoji: "🪪" }),
  W({ id: "nov-avoir-mai", unit: "Novice|Future|avoir", fr: "mai", en: "May",
    distractors: ["March",  "June",  "April"], pos: "noun", gender: "m", emoji: "📆5️⃣" }),
  W({ id: "nov-avoir-petit", unit: "Novice|Future|avoir", fr: "petit", en: "small",
    distractors: ["big",  "old",  "new"], pos: "adjective", emoji: "🐭" }),
  W({ id: "nov-avoir-sac", unit: "Novice|Future|avoir", fr: "un sac", en: "bag",
    distractors: ["box",  "coat",  "hat"], pos: "noun", gender: "m", emoji: "👜" }),
  W({ id: "nov-avoir-beaucoup", unit: "Novice|Future|avoir", fr: "beaucoup", en: "a lot, many",
    distractors: ["a little",  "none",  "some"], pos: "adverb", emoji: "📈" }),
  W({ id: "nov-avoir-pain", unit: "Novice|Future|avoir", fr: "le pain", en: "bread",
    distractors: ["cake",  "rice",  "cheese"], pos: "noun", gender: "m", emoji: "🍞" }),
  W({ id: "nov-avoir-argent", unit: "Novice|Future|avoir", fr: "l'argent", en: "money",
    distractors: ["time",  "food",  "luck"], pos: "noun", gender: "m", emoji: "💰" }),
  W({ id: "nov-avoir-eau", unit: "Novice|Future|avoir", fr: "l'eau", en: "water",
    distractors: ["milk",  "juice",  "tea"], pos: "noun", gender: "f", emoji: "💧" }),
  W({ id: "nov-avoir-patience", unit: "Novice|Future|avoir", fr: "la patience", en: "patience",
    distractors: ["anger",  "luck",  "speed"], pos: "noun", gender: "f", emoji: "🧘" }),
  W({ id: "nov-avoir-assez", unit: "Novice|Future|avoir", fr: "assez", en: "enough",
    distractors: ["too much",  "not at all",  "always"], pos: "adverb", emoji: "✋" }),
  W({ id: "nov-avoir-nourriture", unit: "Novice|Future|avoir", fr: "la nourriture", en: "food",
    distractors: ["drink",  "money",  "water"], pos: "noun", gender: "f", emoji: "🥗" }),
  // ── Novice · Future · faire ───────────────────────────────────
  W({ id: "nov-faire-fils", unit: "Novice|Future|faire", fr: "un fils", en: "son",
    distractors: ["daughter",  "brother",  "nephew"], pos: "noun", gender: "m", emoji: "👨‍👦" }),
  W({ id: "nov-faire-stage", unit: "Novice|Future|faire", fr: "un stage", en: "internship",
    distractors: ["holiday",  "exam",  "course"], pos: "noun", gender: "m", emoji: "🧑‍💻" }),
  // ── Novice · Future · aller ───────────────────────────────────
  W({ id: "nov-aller-surement", unit: "Novice|Future|aller", fr: "sûrement", en: "surely, for sure",
    distractors: ["maybe",  "never",  "rarely"], pos: "adverb", emoji: "🎯" }),
  W({ id: "nov-aller-ensemble", unit: "Novice|Future|aller", fr: "ensemble", en: "together",
    distractors: ["alone",  "apart",  "later"], pos: "adverb", emoji: "👥" }),
  W({ id: "nov-aller-semaine", unit: "Novice|Future|aller", fr: "la semaine", en: "week",
    distractors: ["month",  "year",  "day"], pos: "noun", gender: "f", emoji: "🗓️" }),
  W({ id: "nov-aller-prochain", unit: "Novice|Future|aller", fr: "prochain", en: "next",
    distractors: ["last",  "first",  "same"], pos: "adjective", emoji: "⏭️" }),
  W({ id: "nov-aller-mois", unit: "Novice|Future|aller", fr: "le mois", en: "month",
    distractors: ["week",  "year",  "day"], pos: "noun", gender: "m", emoji: "📆" }),
  W({ id: "nov-aller-gymnase", unit: "Novice|Future|aller", fr: "le gymnase", en: "gym",
    distractors: ["pool",  "park",  "stadium"], pos: "noun", gender: "m", emoji: "🏋️" }),
  W({ id: "nov-aller-bibliotheque", unit: "Novice|Future|aller", fr: "la bibliothèque", en: "library",
    distractors: ["bookshop",  "school",  "museum"], pos: "noun", gender: "f", emoji: "📚" }),
  W({ id: "nov-aller-week-end", unit: "Novice|Future|aller", fr: "le week-end", en: "weekend",
    distractors: ["weekday",  "holiday",  "evening"], pos: "noun", gender: "m", emoji: "🛋️" }),
  W({ id: "nov-aller-stade", unit: "Novice|Future|aller", fr: "le stade", en: "stadium",
    distractors: ["gym",  "park",  "cinema"], pos: "noun", gender: "m", emoji: "🏟️" }),
  W({ id: "nov-aller-restaurant", unit: "Novice|Future|aller", fr: "le restaurant", en: "restaurant",
    distractors: ["café",  "bakery",  "hotel"], pos: "noun", gender: "m", emoji: "🍴" }),
  W({ id: "nov-aller-vendredi", unit: "Novice|Future|aller", fr: "vendredi", en: "Friday",
    distractors: ["Thursday",  "Saturday",  "Monday"], pos: "noun", gender: "m", emoji: "🗓️5️⃣" }),
  W({ id: "nov-aller-concert", unit: "Novice|Future|aller", fr: "le concert", en: "concert",
    distractors: ["film",  "party",  "play"], pos: "noun", gender: "m", emoji: "🎸" }),
  // ── Elementary · Present · dire ───────────────────────────────
  W({ id: "ele-dire-reponse", unit: "Elementary|Present|dire", fr: "la réponse", en: "answer",
    distractors: ["question",  "letter",  "reason"], pos: "noun", gender: "f", emoji: "💬" }),
  W({ id: "ele-dire-verite", unit: "Elementary|Present|dire", fr: "la vérité", en: "truth",
    distractors: ["lie",  "secret",  "rumour"], pos: "noun", gender: "f", emoji: "😇" }),
  W({ id: "ele-dire-mot", unit: "Elementary|Present|dire", fr: "un mot", en: "word",
    distractors: ["sentence",  "letter",  "page"], pos: "noun", gender: "m", emoji: "🔤" }),
  W({ id: "ele-dire-nom", unit: "Elementary|Present|dire", fr: "un nom", en: "name",
    distractors: ["address",  "age",  "number"], pos: "noun", gender: "m", emoji: "📛" }),
  W({ id: "ele-dire-maintenant", unit: "Elementary|Present|dire", fr: "maintenant", en: "now",
    distractors: ["later",  "soon",  "yesterday"], pos: "adverb", emoji: "⌚" }),
  W({ id: "ele-dire-souvent", unit: "Elementary|Present|dire", fr: "souvent", en: "often",
    distractors: ["never",  "rarely",  "sometimes"], pos: "adverb", emoji: "🔁" }),
  W({ id: "ele-dire-poli", unit: "Elementary|Present|dire", fr: "poli", en: "polite",
    distractors: ["rude",  "shy",  "funny"], pos: "adjective", emoji: "🙇" }),
  W({ id: "ele-dire-faux", unit: "Elementary|Present|dire", fr: "faux", en: "false, wrong",
    distractors: ["true",  "easy",  "important"], pos: "adjective", emoji: "✖️" }),
  // ── Elementary · Present · voir ───────────────────────────────
  W({ id: "ele-voir-oiseau", unit: "Elementary|Present|voir", fr: "un oiseau", en: "bird",
    distractors: ["fish",  "butterfly",  "mouse"], pos: "noun", gender: "m", emoji: "🐦" }),
  W({ id: "ele-voir-ciel", unit: "Elementary|Present|voir", fr: "le ciel", en: "sky",
    distractors: ["sea",  "ground",  "cloud"], pos: "noun", gender: "m", emoji: "☁️" }),
  W({ id: "ele-voir-miroir", unit: "Elementary|Present|voir", fr: "un miroir", en: "mirror",
    distractors: ["window",  "picture",  "lamp"], pos: "noun", gender: "m", emoji: "🪞" }),
  W({ id: "ele-voir-etoile", unit: "Elementary|Present|voir", fr: "une étoile", en: "star",
    distractors: ["moon",  "planet",  "cloud"], pos: "noun", gender: "f", emoji: "⭐" }),
  W({ id: "ele-voir-rouge", unit: "Elementary|Present|voir", fr: "rouge", en: "red",
    distractors: ["blue",  "green",  "yellow"], pos: "adjective", emoji: "🔴" }),
  W({ id: "ele-voir-paysage", unit: "Elementary|Present|voir", fr: "un paysage", en: "landscape",
    distractors: ["building",  "garden",  "painting"], pos: "noun", gender: "m", emoji: "🏞️" }),
  W({ id: "ele-voir-avenir", unit: "Elementary|Present|voir", fr: "un avenir", en: "future",
    distractors: ["past",  "present",  "memory"], pos: "noun", gender: "m", emoji: "🔮" }),
  // ── Elementary · Present · savoir ─────────────────────────────
  W({ id: "ele-savoir-adresse", unit: "Elementary|Present|savoir", fr: "une adresse", en: "address",
    distractors: ["phone number",  "street",  "name"], pos: "noun", gender: "f", emoji: "📫" }),
  W({ id: "ele-savoir-nouvelles", unit: "Elementary|Present|savoir", fr: "les nouvelles", en: "news",
    distractors: ["weather",  "rumours",  "letters"], pos: "noun", gender: "f", emoji: "📰" }),
  W({ id: "ele-savoir-histoire", unit: "Elementary|Present|savoir", fr: "une histoire", en: "story, history",
    distractors: ["song",  "poem",  "picture"], pos: "noun", gender: "f", emoji: "📜" }),
  W({ id: "ele-savoir-heure", unit: "Elementary|Present|savoir", fr: "l'heure", en: "time (of day)",
    distractors: ["date",  "weather",  "place"], pos: "noun", gender: "f", emoji: "🕒" }),
  W({ id: "ele-savoir-regle", unit: "Elementary|Present|savoir", fr: "une règle", en: "rule, ruler",
    distractors: ["pencil",  "lesson",  "eraser"], pos: "noun", gender: "f", emoji: "📏" }),
  W({ id: "ele-savoir-mot-de-passe", unit: "Elementary|Present|savoir", fr: "un mot de passe", en: "password",
    distractors: ["username",  "email",  "address"], pos: "noun", gender: "m", emoji: "🔒" }),
  W({ id: "ele-savoir-vite", unit: "Elementary|Present|savoir", fr: "vite", en: "quickly, fast",
    distractors: ["slowly",  "carefully",  "quietly"], pos: "adverb", emoji: "⚡" }),
  W({ id: "ele-savoir-encore", unit: "Elementary|Present|savoir", fr: "encore", en: "still, again",
    distractors: ["already",  "never",  "once"], pos: "adverb", emoji: "🔄" }),
  // ── Elementary · Present · vouloir ────────────────────────────
  W({ id: "ele-vouloir-nouveau", unit: "Elementary|Present|vouloir", fr: "nouveau", en: "new",
    distractors: ["old",  "small",  "clean"], pos: "adjective", emoji: "🆕" }),
  W({ id: "ele-vouloir-morceau", unit: "Elementary|Present|vouloir", fr: "un morceau", en: "piece, bit",
    distractors: ["plate",  "bag",  "box"], pos: "noun", gender: "m", emoji: "🍕" }),
  W({ id: "ele-vouloir-directeur", unit: "Elementary|Present|vouloir", fr: "un directeur", en: "manager, director",
    distractors: ["employee",  "customer",  "teacher"], pos: "noun", gender: "m", emoji: "🧑‍💼" }),
  W({ id: "ele-vouloir-the", unit: "Elementary|Present|vouloir", fr: "le thé", en: "tea",
    distractors: ["coffee",  "juice",  "milk"], pos: "noun", gender: "m", emoji: "🍵" }),
  W({ id: "ele-vouloir-chocolat", unit: "Elementary|Present|vouloir", fr: "le chocolat", en: "chocolate",
    distractors: ["sugar",  "cheese",  "biscuit"], pos: "noun", gender: "m", emoji: "🍫" }),
  // ── Elementary · Present · venir ──────────────────────────────
  W({ id: "ele-venir-bureau", unit: "Elementary|Present|venir", fr: "le bureau", en: "office, desk",
    distractors: ["shop",  "factory",  "kitchen"], pos: "noun", gender: "m", emoji: "🏢" }),
  W({ id: "ele-venir-loin", unit: "Elementary|Present|venir", fr: "loin", en: "far",
    distractors: ["near",  "inside",  "late"], pos: "adverb", emoji: "🔭" }),
  W({ id: "ele-venir-seul", unit: "Elementary|Present|venir", fr: "seul", en: "alone",
    distractors: ["together",  "tired",  "late"], pos: "adjective", emoji: "🧍" }),
  W({ id: "ele-venir-meme", unit: "Elementary|Present|venir", fr: "même", en: "same",
    distractors: ["different",  "other",  "next"], pos: "adjective", emoji: "🟰" }),
  W({ id: "ele-venir-direction", unit: "Elementary|Present|venir", fr: "une direction", en: "direction",
    distractors: ["distance",  "street",  "station"], pos: "noun", gender: "f", emoji: "🧭" }),
  // ── Elementary · Present · pouvoir ────────────────────────────
  W({ id: "ele-pouvoir-mieux", unit: "Elementary|Present|pouvoir", fr: "mieux", en: "better",
    distractors: ["worse",  "less",  "faster"], pos: "adverb", emoji: "⬆️" }),
  W({ id: "ele-pouvoir-quand-meme", unit: "Elementary|Present|pouvoir", fr: "quand même", en: "anyway, all the same",
    distractors: ["already",  "never",  "especially"], pos: "adverb", emoji: "🤷" }),
  // ── Elementary · Present · besoin ─────────────────────────────
  W({ id: "ele-besoin-aide", unit: "Elementary|Present|besoin", fr: "l'aide", en: "help",
    distractors: ["advice",  "rest",  "danger"], pos: "noun", gender: "f", emoji: "🆘" }),
  W({ id: "ele-besoin-voisin", unit: "Elementary|Present|besoin", fr: "un voisin", en: "neighbour",
    distractors: ["cousin",  "colleague",  "stranger"], pos: "noun", gender: "m", emoji: "🏘️" }),
  W({ id: "ele-besoin-marteau", unit: "Elementary|Present|besoin", fr: "un marteau", en: "hammer",
    distractors: ["saw",  "nail",  "screwdriver"], pos: "noun", gender: "m", emoji: "🔨" }),
  // ── Elementary · Past · dire ──────────────────────────────────
  W({ id: "ele-dire-jamais", unit: "Elementary|Past|dire", fr: "jamais", en: "never",
    distractors: ["always",  "often",  "sometimes"], pos: "adverb", emoji: "🚫" }),
  W({ id: "ele-dire-important", unit: "Elementary|Past|dire", fr: "important", en: "important",
    distractors: ["boring",  "simple",  "strange"], pos: "adjective", emoji: "❗" }),
  W({ id: "ele-dire-pourquoi", unit: "Elementary|Past|dire", fr: "pourquoi", en: "why",
    distractors: ["when",  "how",  "where"], pos: "adverb", emoji: "❓" }),
  W({ id: "ele-dire-quand", unit: "Elementary|Past|dire", fr: "quand", en: "when",
    distractors: ["why",  "how",  "where"], pos: "adverb", emoji: "🕰️" }),
  // ── Elementary · Past · voir ──────────────────────────────────
  W({ id: "ele-voir-resultat", unit: "Elementary|Past|voir", fr: "un résultat", en: "result",
    distractors: ["question",  "problem",  "test"], pos: "noun", gender: "m", emoji: "📊" }),
  W({ id: "ele-voir-exposition", unit: "Elementary|Past|voir", fr: "une exposition", en: "exhibition",
    distractors: ["concert",  "library",  "lecture"], pos: "noun", gender: "f", emoji: "🎨" }),
  W({ id: "ele-voir-fantome", unit: "Elementary|Past|voir", fr: "un fantôme", en: "ghost",
    distractors: ["monster",  "angel",  "shadow"], pos: "noun", gender: "m", emoji: "👻" }),
  W({ id: "ele-voir-message", unit: "Elementary|Past|voir", fr: "un message", en: "message",
    distractors: ["phone",  "stamp",  "envelope"], pos: "noun", gender: "m", emoji: "📩" }),
  W({ id: "ele-voir-match", unit: "Elementary|Past|voir", fr: "un match", en: "match, game",
    distractors: ["race",  "training",  "ticket"], pos: "noun", gender: "m", emoji: "🥅" }),
  W({ id: "ele-voir-spectacle", unit: "Elementary|Past|voir", fr: "un spectacle", en: "show",
    distractors: ["ticket",  "stage",  "audience"], pos: "noun", gender: "m", emoji: "🎪" }),
  W({ id: "ele-voir-lunettes", unit: "Elementary|Past|voir", fr: "les lunettes", en: "glasses",
    distractors: ["gloves",  "earrings",  "shoes"], pos: "noun", gender: "f", emoji: "👓" }),
  W({ id: "ele-voir-panneau", unit: "Elementary|Past|voir", fr: "un panneau", en: "sign",
    distractors: ["traffic light",  "road",  "bridge"], pos: "noun", gender: "m", emoji: "🛑" }),
  W({ id: "ele-voir-deja", unit: "Elementary|Past|voir", fr: "déjà", en: "already",
    distractors: ["still",  "never",  "soon"], pos: "adverb", emoji: "☑️" }),
  W({ id: "ele-voir-piece", unit: "Elementary|Past|voir", fr: "une pièce", en: "play, room",
    distractors: ["song",  "ticket",  "book"], pos: "noun", gender: "f", emoji: "🎭" }),
  // ── Elementary · Past · savoir ────────────────────────────────
  W({ id: "ele-savoir-secret", unit: "Elementary|Past|savoir", fr: "un secret", en: "secret",
    distractors: ["gift",  "promise",  "joke"], pos: "noun", gender: "m", emoji: "🤫" }),
  W({ id: "ele-savoir-risque", unit: "Elementary|Past|savoir", fr: "un risque", en: "risk",
    distractors: ["reward",  "rule",  "chance"], pos: "noun", gender: "m", emoji: "🎲" }),
  W({ id: "ele-savoir-annee", unit: "Elementary|Past|savoir", fr: "une année", en: "year",
    distractors: ["month",  "week",  "day"], pos: "noun", gender: "f", emoji: "📅" }),
  W({ id: "ele-savoir-dernier", unit: "Elementary|Past|savoir", fr: "dernier", en: "last",
    distractors: ["first",  "next",  "only"], pos: "adjective", emoji: "⏮️" }),
  W({ id: "ele-savoir-soudainement", unit: "Elementary|Past|savoir", fr: "soudainement", en: "suddenly",
    distractors: ["slowly",  "finally",  "rarely"], pos: "adverb", emoji: "💥" }),
  W({ id: "ele-savoir-longtemps", unit: "Elementary|Past|savoir", fr: "longtemps", en: "a long time",
    distractors: ["a moment",  "recently",  "early"], pos: "adverb", emoji: "⌛" }),
  W({ id: "ele-savoir-moment", unit: "Elementary|Past|savoir", fr: "un moment", en: "moment",
    distractors: ["hour",  "century",  "season"], pos: "noun", gender: "m", emoji: "⏱️" }),
  W({ id: "ele-savoir-comment", unit: "Elementary|Past|savoir", fr: "comment", en: "how",
    distractors: ["why",  "where",  "when"], pos: "adverb", emoji: "🤔" }),
  // ── Elementary · Past · vouloir ───────────────────────────────
  W({ id: "ele-vouloir-tot", unit: "Elementary|Past|vouloir", fr: "tôt", en: "early",
    distractors: ["late",  "often",  "later"], pos: "adverb", emoji: "🐓" }),
  W({ id: "ele-vouloir-soleil", unit: "Elementary|Past|vouloir", fr: "le soleil", en: "sun",
    distractors: ["moon",  "sky",  "rain"], pos: "noun", gender: "m", emoji: "☀️" }),
  W({ id: "ele-vouloir-toujours", unit: "Elementary|Past|vouloir", fr: "toujours", en: "always, still",
    distractors: ["never",  "rarely",  "already"], pos: "adverb", emoji: "♾️" }),
  // ── Elementary · Past · venir ─────────────────────────────────
  W({ id: "ele-venir-pied", unit: "Elementary|Past|venir", fr: "le pied", en: "foot",
    distractors: ["hand",  "leg",  "knee"], pos: "noun", gender: "m", emoji: "🦶" }),
  W({ id: "ele-venir-train", unit: "Elementary|Past|venir", fr: "le train", en: "train",
    distractors: ["bus",  "plane",  "boat"], pos: "noun", gender: "m", emoji: "🚆" }),
  W({ id: "ele-venir-femme", unit: "Elementary|Past|venir", fr: "une femme", en: "woman, wife",
    distractors: ["husband",  "daughter",  "girl"], pos: "noun", gender: "f", emoji: "👩" }),
  W({ id: "ele-venir-tard", unit: "Elementary|Past|venir", fr: "tard", en: "late",
    distractors: ["early",  "soon",  "often"], pos: "adverb", emoji: "🌃" }),
  // ── Elementary · Past · pouvoir ───────────────────────────────
  W({ id: "ele-pouvoir-porte", unit: "Elementary|Past|pouvoir", fr: "la porte", en: "door",
    distractors: ["window",  "wall",  "roof"], pos: "noun", gender: "f", emoji: "🚪" }),
  W({ id: "ele-pouvoir-enfin", unit: "Elementary|Past|pouvoir", fr: "enfin", en: "finally, at last",
    distractors: ["already",  "suddenly",  "never"], pos: "adverb", emoji: "😮‍💨" }),
  W({ id: "ele-pouvoir-reunion", unit: "Elementary|Past|pouvoir", fr: "une réunion", en: "meeting",
    distractors: ["holiday",  "party",  "lesson"], pos: "noun", gender: "f", emoji: "🗣️" }),
  // ── Elementary · Past · besoin ────────────────────────────────
  W({ id: "ele-besoin-medecin", unit: "Elementary|Past|besoin", fr: "un médecin", en: "doctor",
    distractors: ["nurse",  "dentist",  "patient"], pos: "noun", gender: "m", emoji: "👩‍⚕️" }),
  W({ id: "ele-besoin-medicament", unit: "Elementary|Past|besoin", fr: "un médicament", en: "medicine, medication",
    distractors: ["bandage",  "illness",  "injection"], pos: "noun", gender: "m", emoji: "💊" }),
  W({ id: "ele-besoin-repos", unit: "Elementary|Past|besoin", fr: "le repos", en: "rest",
    distractors: ["work",  "exercise",  "sleepiness"], pos: "noun", gender: "m", emoji: "🛌" }),
  // ── Elementary · Future · dire ────────────────────────────────
  W({ id: "ele-dire-bientot", unit: "Elementary|Future|dire", fr: "bientôt", en: "soon",
    distractors: ["late",  "never",  "yesterday"], pos: "adverb", emoji: "🔜" }),
  W({ id: "ele-dire-mensonge", unit: "Elementary|Future|dire", fr: "un mensonge", en: "lie",
    distractors: ["truth",  "promise",  "joke"], pos: "noun", gender: "m", emoji: "🤥" }),
  W({ id: "ele-dire-sage", unit: "Elementary|Future|dire", fr: "sage", en: "wise, well-behaved",
    distractors: ["foolish",  "noisy",  "lazy"], pos: "adjective", emoji: "🦉" }),
  W({ id: "ele-dire-decision", unit: "Elementary|Future|dire", fr: "une décision", en: "decision",
    distractors: ["question",  "mistake",  "opinion"], pos: "noun", gender: "f", emoji: "⚖️" }),
  // ── Elementary · Future · voir ────────────────────────────────
  W({ id: "ele-voir-difference", unit: "Elementary|Future|voir", fr: "une différence", en: "difference",
    distractors: ["similarity",  "choice",  "distance"], pos: "noun", gender: "f", emoji: "🆚" }),
  W({ id: "ele-voir-theatre", unit: "Elementary|Future|voir", fr: "le théâtre", en: "theatre",
    distractors: ["cinema",  "museum",  "stadium"], pos: "noun", gender: "m", emoji: "🩰" }),
  W({ id: "ele-voir-consequence", unit: "Elementary|Future|voir", fr: "une conséquence", en: "consequence",
    distractors: ["cause",  "reason",  "excuse"], pos: "noun", gender: "f", emoji: "↪️" }),
  W({ id: "ele-voir-facile", unit: "Elementary|Future|voir", fr: "facile", en: "easy",
    distractors: ["difficult",  "expensive",  "boring"], pos: "adjective", emoji: "🪶" }),
  W({ id: "ele-voir-changement", unit: "Elementary|Future|voir", fr: "un changement", en: "change",
    distractors: ["mistake",  "delay",  "rule"], pos: "noun", gender: "m", emoji: "🦋" }),
  W({ id: "ele-voir-grand", unit: "Elementary|Future|voir", fr: "grand", en: "big, tall",
    distractors: ["small",  "short",  "thin"], pos: "adjective", emoji: "🐘" }),
  W({ id: "ele-voir-fin", unit: "Elementary|Future|voir", fr: "la fin", en: "end",
    distractors: ["beginning",  "middle",  "rest"], pos: "noun", gender: "f", emoji: "🔚" }),
  W({ id: "ele-voir-jour", unit: "Elementary|Future|voir", fr: "un jour", en: "day",
    distractors: ["night",  "week",  "hour"], pos: "noun", gender: "m", emoji: "🌤️" }),
  W({ id: "ele-voir-grands-parents", unit: "Elementary|Future|voir", fr: "les grands-parents", en: "grandparents",
    distractors: ["cousins",  "grandchildren",  "uncles"], pos: "noun", gender: "m", emoji: "👴👵" }),
  // ── Elementary · Future · savoir ──────────────────────────────
  W({ id: "ele-savoir-chemin", unit: "Elementary|Future|savoir", fr: "le chemin", en: "way, path",
    distractors: ["map",  "bridge",  "wall"], pos: "noun", gender: "m", emoji: "🛤️" }),
  W({ id: "ele-savoir-date", unit: "Elementary|Future|savoir", fr: "une date", en: "date",
    distractors: ["time",  "place",  "name"], pos: "noun", gender: "f", emoji: "📌" }),
  W({ id: "ele-savoir-detail", unit: "Elementary|Future|savoir", fr: "un détail", en: "detail",
    distractors: ["summary",  "example",  "rule"], pos: "noun", gender: "m", emoji: "🔍" }),
  // ── Elementary · Future · vouloir ─────────────────────────────
  W({ id: "ele-vouloir-robe", unit: "Elementary|Future|vouloir", fr: "une robe", en: "dress",
    distractors: ["skirt",  "coat",  "shirt"], pos: "noun", gender: "f", emoji: "👗" }),
  W({ id: "ele-vouloir-autre", unit: "Elementary|Future|vouloir", fr: "autre", en: "other",
    distractors: ["same",  "last",  "whole"], pos: "adjective", emoji: "🔀" }),
  W({ id: "ele-vouloir-explication", unit: "Elementary|Future|vouloir", fr: "une explication", en: "explanation",
    distractors: ["question",  "excuse",  "answer"], pos: "noun", gender: "f", emoji: "🗨️" }),
  W({ id: "ele-vouloir-meilleur", unit: "Elementary|Future|vouloir", fr: "meilleur", en: "better, best",
    distractors: ["worse",  "cheaper",  "older"], pos: "adjective", emoji: "🥇" }),
  W({ id: "ele-vouloir-shopping", unit: "Elementary|Future|vouloir", fr: "le shopping", en: "shopping",
    distractors: ["cooking",  "cleaning",  "sightseeing"], pos: "noun", gender: "m", emoji: "🛍️" }),
  // ── Elementary · Future · venir ───────────────────────────────
  W({ id: "ele-venir-joie", unit: "Elementary|Future|venir", fr: "la joie", en: "joy",
    distractors: ["sadness",  "anger",  "fear"], pos: "noun", gender: "f", emoji: "😃" }),
  W({ id: "ele-venir-diner", unit: "Elementary|Future|venir", fr: "le dîner", en: "dinner",
    distractors: ["breakfast",  "lunch",  "snack"], pos: "noun", gender: "m", emoji: "🍝" }),
  // ── Elementary · Future · pouvoir ─────────────────────────────
  W({ id: "ele-pouvoir-fois", unit: "Elementary|Future|pouvoir", fr: "une fois", en: "time, occasion",
    distractors: ["day",  "hour",  "place"], pos: "noun", gender: "f", emoji: "🔂" }),
  // ── Elementary · Future · besoin ──────────────────────────────
  W({ id: "ele-besoin-pere", unit: "Elementary|Future|besoin", fr: "un père", en: "father",
    distractors: ["uncle",  "grandfather",  "son"], pos: "noun", gender: "m", emoji: "👨" }),
  // ── Intermediate · Present · s'intéresser ─────────────────────
  W({ id: "int-s-interesser-politique", unit: "Intermediate|Present|s'intéresser", fr: "la politique", en: "politics",
    distractors: ["religion",  "economics",  "geography"], pos: "noun", gender: "f", emoji: "🗳️" }),
  W({ id: "int-s-interesser-musique", unit: "Intermediate|Present|s'intéresser", fr: "la musique", en: "music",
    distractors: ["painting",  "dance",  "theatre"], pos: "noun", gender: "f", emoji: "🎵" }),
  W({ id: "int-s-interesser-art", unit: "Intermediate|Present|s'intéresser", fr: "l'art", en: "art",
    distractors: ["science",  "law",  "sport"], pos: "noun", gender: "m", emoji: "🗿" }),
  W({ id: "int-s-interesser-science", unit: "Intermediate|Present|s'intéresser", fr: "la science", en: "science",
    distractors: ["history",  "fashion",  "religion"], pos: "noun", gender: "f", emoji: "🔬" }),
  W({ id: "int-s-interesser-mode", unit: "Intermediate|Present|s'intéresser", fr: "la mode", en: "fashion",
    distractors: ["weather",  "cooking",  "furniture"], pos: "noun", gender: "f", emoji: "👠" }),
  W({ id: "int-s-interesser-photographie", unit: "Intermediate|Present|s'intéresser", fr: "la photographie", en: "photography",
    distractors: ["painting",  "sculpture",  "poetry"], pos: "noun", gender: "f", emoji: "📷" }),
  W({ id: "int-s-interesser-mathematiques", unit: "Intermediate|Present|s'intéresser", fr: "les mathématiques", en: "mathematics",
    distractors: ["chemistry",  "literature",  "biology"], pos: "noun", gender: "f", emoji: "➗" }),
  // ── Intermediate · Present · se débrouiller ───────────────────
  W({ id: "int-se-debrouiller-parfaitement", unit: "Intermediate|Present|se débrouiller", fr: "parfaitement", en: "perfectly",
    distractors: ["badly",  "slowly",  "rarely"], pos: "adverb", emoji: "✨" }),
  W({ id: "int-se-debrouiller-anglais", unit: "Intermediate|Present|se débrouiller", fr: "l'anglais", en: "English (language)",
    distractors: ["Spanish",  "German",  "Italian"], pos: "noun", gender: "m", emoji: "🇬🇧" }),
  // ── Intermediate · Present · s'ennuyer ────────────────────────
  W({ id: "int-s-ennuyer-peu", unit: "Intermediate|Present|s'ennuyer", fr: "un peu", en: "a little",
    distractors: ["a lot",  "too much",  "not at all"], pos: "adverb", emoji: "🤏" }),
  W({ id: "int-s-ennuyer-pauvre", unit: "Intermediate|Present|s'ennuyer", fr: "pauvre", en: "poor",
    distractors: ["rich",  "lucky",  "proud"], pos: "adjective", emoji: "🥺" }),
  // ── Intermediate · Present · s'entraîner ──────────────────────
  W({ id: "int-s-entrainer-equipe", unit: "Intermediate|Present|s'entraîner", fr: "une équipe", en: "team",
    distractors: ["coach",  "match",  "stadium"], pos: "noun", gender: "f", emoji: "🧑‍🤝‍🧑" }),
  W({ id: "int-s-entrainer-mercredi", unit: "Intermediate|Present|s'entraîner", fr: "mercredi", en: "Wednesday",
    distractors: ["Monday",  "Thursday",  "Tuesday"], pos: "noun", gender: "m", emoji: "🗓️3️⃣" }),
  W({ id: "int-s-entrainer-entrainement", unit: "Intermediate|Present|s'entraîner", fr: "un entraînement", en: "training",
    distractors: ["holiday",  "meeting",  "competition"], pos: "noun", gender: "m", emoji: "💪" }),
  // ── Intermediate · Present · se souvenir ──────────────────────
  W({ id: "int-se-souvenir-premier", unit: "Intermediate|Present|se souvenir", fr: "premier", en: "first",
    distractors: ["last",  "next",  "second"], pos: "adjective", emoji: "1️⃣" }),
  W({ id: "int-se-souvenir-souvenir", unit: "Intermediate|Present|se souvenir", fr: "un souvenir", en: "memory",
    distractors: ["dream",  "mistake",  "secret"], pos: "noun", gender: "m", emoji: "🧠" }),
  // ── Intermediate · Present · s'adapter ────────────────────────
  W({ id: "int-s-adapter-collegue", unit: "Intermediate|Present|s'adapter", fr: "un collègue", en: "colleague",
    distractors: ["neighbour",  "boss",  "customer"], pos: "noun", gender: "m", emoji: "👩‍💼" }),
  // ── Intermediate · Present · se réjouir ───────────────────────
  W({ id: "int-se-rejouir-mer", unit: "Intermediate|Present|se réjouir", fr: "la mer", en: "the sea",
    distractors: ["the mountain",  "the river",  "the forest"], pos: "noun", gender: "f", emoji: "🌊" }),
  // ── Intermediate · Present · mettre ───────────────────────────
  W({ id: "int-mettre-manteau", unit: "Intermediate|Present|mettre", fr: "un manteau", en: "coat",
    distractors: ["hat",  "shirt",  "glove"], pos: "noun", gender: "m", emoji: "🧥" }),
  W({ id: "int-mettre-echarpe", unit: "Intermediate|Present|mettre", fr: "une écharpe", en: "scarf",
    distractors: ["belt",  "sock",  "tie"], pos: "noun", gender: "f", emoji: "🧣" }),
  W({ id: "int-mettre-pull", unit: "Intermediate|Present|mettre", fr: "un pull", en: "jumper",
    distractors: ["skirt",  "jacket",  "boot"], pos: "noun", gender: "m", emoji: "🧶" }),
  W({ id: "int-mettre-telephone", unit: "Intermediate|Present|mettre", fr: "le téléphone", en: "phone",
    distractors: ["computer",  "television",  "watch"], pos: "noun", gender: "m", emoji: "📱" }),
  W({ id: "int-mettre-sel", unit: "Intermediate|Present|mettre", fr: "le sel", en: "salt",
    distractors: ["pepper",  "sugar",  "oil"], pos: "noun", gender: "m", emoji: "🧂" }),
  W({ id: "int-mettre-vetements", unit: "Intermediate|Present|mettre", fr: "les vêtements", en: "clothes",
    distractors: ["shoes",  "towels",  "toys"], pos: "noun", gender: "m", emoji: "👕" }),
  // ── Intermediate · Present · trouver ──────────────────────────
  W({ id: "int-trouver-solution", unit: "Intermediate|Present|trouver", fr: "une solution", en: "solution",
    distractors: ["problem",  "question",  "excuse"], pos: "noun", gender: "f", emoji: "🗝️" }),
  W({ id: "int-trouver-difficile", unit: "Intermediate|Present|trouver", fr: "difficile", en: "difficult",
    distractors: ["easy",  "quick",  "funny"], pos: "adjective", emoji: "🧗" }),
  W({ id: "int-trouver-billet", unit: "Intermediate|Present|trouver", fr: "un billet", en: "ticket",
    distractors: ["wallet",  "receipt",  "envelope"], pos: "noun", gender: "m", emoji: "🎟️" }),
  W({ id: "int-trouver-cahier", unit: "Intermediate|Present|trouver", fr: "un cahier", en: "notebook",
    distractors: ["pencil",  "backpack",  "calendar"], pos: "noun", gender: "m", emoji: "📓" }),
  W({ id: "int-trouver-interessant", unit: "Intermediate|Present|trouver", fr: "intéressant", en: "interesting",
    distractors: ["boring",  "strange",  "expensive"], pos: "adjective", emoji: "🧐" }),
  // ── Intermediate · Present · croire ───────────────────────────
  W({ id: "int-croire-grand-mere", unit: "Intermediate|Present|croire", fr: "une grand-mère", en: "grandmother",
    distractors: ["aunt",  "granddaughter",  "godmother"], pos: "noun", gender: "f", emoji: "👵" }),
  W({ id: "int-croire-rumeur", unit: "Intermediate|Present|croire", fr: "une rumeur", en: "rumour",
    distractors: ["secret",  "joke",  "complaint"], pos: "noun", gender: "f", emoji: "👂" }),
  W({ id: "int-croire-excuse", unit: "Intermediate|Present|croire", fr: "une excuse", en: "excuse; apology",
    distractors: ["reward",  "insult",  "request"], pos: "noun", gender: "f", emoji: "🙏" }),
  // ── Intermediate · Present · parler ───────────────────────────
  W({ id: "int-parler-langue", unit: "Intermediate|Present|parler", fr: "une langue", en: "language; tongue",
    distractors: ["country",  "voice",  "word"], pos: "noun", gender: "f", emoji: "🌐" }),
  W({ id: "int-parler-seulement", unit: "Intermediate|Present|parler", fr: "seulement", en: "only",
    distractors: ["also",  "almost",  "especially"], pos: "adverb", emoji: "☝️" }),
  W({ id: "int-parler-italien", unit: "Intermediate|Present|parler", fr: "italien", en: "Italian",
    distractors: ["Spanish",  "Greek",  "Portuguese"], pos: "adjective", emoji: "🇮🇹" }),
  W({ id: "int-parler-espagnol", unit: "Intermediate|Present|parler", fr: "espagnol", en: "Spanish",
    distractors: ["Italian",  "Mexican",  "German"], pos: "adjective", emoji: "🇪🇸" }),
  W({ id: "int-parler-grand-pere", unit: "Intermediate|Present|parler", fr: "un grand-père", en: "grandfather",
    distractors: ["uncle",  "grandson",  "father-in-law"], pos: "noun", gender: "m", emoji: "👴" }),
  // ── Intermediate · Present · prendre ──────────────────────────
  W({ id: "int-prendre-bus", unit: "Intermediate|Present|prendre", fr: "le bus", en: "bus",
    distractors: ["tram",  "taxi",  "truck"], pos: "noun", gender: "m", emoji: "🚌" }),
  W({ id: "int-prendre-metro", unit: "Intermediate|Present|prendre", fr: "le métro", en: "underground; subway",
    distractors: ["bridge",  "tunnel",  "station"], pos: "noun", gender: "m", emoji: "🚇" }),
  W({ id: "int-prendre-sante", unit: "Intermediate|Present|prendre", fr: "la santé", en: "health",
    distractors: ["illness",  "safety",  "wealth"], pos: "noun", gender: "f", emoji: "🩺" }),
  W({ id: "int-prendre-douche", unit: "Intermediate|Present|prendre", fr: "une douche", en: "shower",
    distractors: ["bath",  "towel",  "sink"], pos: "noun", gender: "f", emoji: "🚿" }),
  W({ id: "int-prendre-parapluie", unit: "Intermediate|Present|prendre", fr: "un parapluie", en: "umbrella",
    distractors: ["raincoat",  "hat",  "scarf"], pos: "noun", gender: "m", emoji: "☂️" }),
  W({ id: "int-prendre-escaliers", unit: "Intermediate|Present|prendre", fr: "les escaliers", en: "stairs",
    distractors: ["lift",  "corridor",  "ladder"], pos: "noun", gender: "m", emoji: "🪜" }),
  W({ id: "int-prendre-sucre", unit: "Intermediate|Present|prendre", fr: "le sucre", en: "sugar",
    distractors: ["salt",  "flour",  "butter"], pos: "noun", gender: "m", emoji: "🍬" }),
  // ── Intermediate · Present · lire ─────────────────────────────
  W({ id: "int-lire-journal", unit: "Intermediate|Present|lire", fr: "le journal", en: "newspaper; diary",
    distractors: ["magazine",  "envelope",  "calendar"], pos: "noun", gender: "m", emoji: "🗞️" }),
  W({ id: "int-lire-roman", unit: "Intermediate|Present|lire", fr: "un roman", en: "novel",
    distractors: ["poem",  "dictionary",  "play"], pos: "noun", gender: "m", emoji: "📕" }),
  W({ id: "int-lire-poesie", unit: "Intermediate|Present|lire", fr: "la poésie", en: "poetry",
    distractors: ["painting",  "music",  "history"], pos: "noun", gender: "f", emoji: "🎼" }),
  W({ id: "int-lire-etiquette", unit: "Intermediate|Present|lire", fr: "une étiquette", en: "label",
    distractors: ["price",  "receipt",  "stamp"], pos: "noun", gender: "f", emoji: "🏷️" }),
  W({ id: "int-lire-bande-dessinee", unit: "Intermediate|Present|lire", fr: "une bande dessinée", en: "comic; comic strip",
    distractors: ["cartoon film",  "drawing class",  "photo album"], pos: "noun", gender: "f", emoji: "🦸" }),
  // ── Intermediate · Present · écrire ───────────────────────────
  W({ id: "int-ecrire-stylo", unit: "Intermediate|Present|écrire", fr: "un stylo", en: "pen",
    distractors: ["pencil",  "ruler",  "eraser"], pos: "noun", gender: "m", emoji: "🖊️" }),
  W({ id: "int-ecrire-lettre", unit: "Intermediate|Present|écrire", fr: "une lettre", en: "letter",
    distractors: ["parcel",  "stamp",  "postcard"], pos: "noun", gender: "f", emoji: "✉️" }),
  W({ id: "int-ecrire-texto", unit: "Intermediate|Present|écrire", fr: "un texto", en: "text message",
    distractors: ["phone call",  "email",  "voicemail"], pos: "noun", gender: "m", emoji: "📨" }),
  W({ id: "int-ecrire-petit-dejeuner", unit: "Intermediate|Present|écrire", fr: "le petit déjeuner", en: "breakfast",
    distractors: ["lunch",  "dinner",  "snack"], pos: "noun", gender: "m", emoji: "🥐" }),
  W({ id: "int-ecrire-rapport", unit: "Intermediate|Present|écrire", fr: "un rapport", en: "report",
    distractors: ["receipt",  "invoice",  "contract"], pos: "noun", gender: "m", emoji: "🗂️" }),
  // ── Intermediate · Present · ouvrir ───────────────────────────
  W({ id: "int-ouvrir-fenetre", unit: "Intermediate|Present|ouvrir", fr: "une fenêtre", en: "window",
    distractors: ["door",  "curtain",  "floor"], pos: "noun", gender: "f", emoji: "🪟" }),
  W({ id: "int-ouvrir-hiver", unit: "Intermediate|Present|ouvrir", fr: "l'hiver", en: "winter",
    distractors: ["summer",  "autumn",  "spring"], pos: "noun", gender: "m", emoji: "❄️" }),
  W({ id: "int-ouvrir-dossier", unit: "Intermediate|Present|ouvrir", fr: "un dossier", en: "file; folder",
    distractors: ["drawer",  "notebook",  "shelf"], pos: "noun", gender: "m", emoji: "📁" }),
  // ── Intermediate · Present · fermer ───────────────────────────
  W({ id: "int-fermer-examen", unit: "Intermediate|Present|fermer", fr: "un examen", en: "exam",
    distractors: ["holiday",  "homework",  "timetable"], pos: "noun", gender: "m", emoji: "✍️" }),
  W({ id: "int-fermer-armoire", unit: "Intermediate|Present|fermer", fr: "une armoire", en: "wardrobe; cupboard",
    distractors: ["bed",  "table",  "mirror"], pos: "noun", gender: "f", emoji: "🗄️" }),
  W({ id: "int-fermer-confiance", unit: "Intermediate|Present|fermer", fr: "la confiance", en: "trust; confidence",
    distractors: ["fear",  "anger",  "doubt"], pos: "noun", gender: "f", emoji: "🫂" }),
  W({ id: "int-fermer-cours", unit: "Intermediate|Present|fermer", fr: "un cours", en: "class; lesson",
    distractors: ["break",  "exam",  "playground"], pos: "noun", gender: "m", emoji: "🎓" }),
  // ── Intermediate · Present · perdre ───────────────────────────
  W({ id: "int-perdre-portefeuille", unit: "Intermediate|Present|perdre", fr: "un portefeuille", en: "wallet",
    distractors: ["backpack",  "watch",  "necklace"], pos: "noun", gender: "m", emoji: "👛" }),
  W({ id: "int-perdre-espoir", unit: "Intermediate|Present|perdre", fr: "l'espoir", en: "hope",
    distractors: ["fear",  "patience",  "memory"], pos: "noun", gender: "m", emoji: "🌈" }),
  W({ id: "int-perdre-embouteillage", unit: "Intermediate|Present|perdre", fr: "un embouteillage", en: "traffic jam",
    distractors: ["car park",  "roundabout",  "speed bump"], pos: "noun", gender: "m", emoji: "🚦" }),
  W({ id: "int-perdre-foi", unit: "Intermediate|Present|perdre", fr: "la foi", en: "faith",
    distractors: ["anger",  "luck",  "doubt"], pos: "noun", gender: "f", emoji: "🛐" }),
  // ── Intermediate · Present · garder ───────────────────────────
  W({ id: "int-garder-promesse", unit: "Intermediate|Present|garder", fr: "une promesse", en: "promise",
    distractors: ["threat",  "question",  "excuse"], pos: "noun", gender: "f", emoji: "🤞" }),
  W({ id: "int-garder-propre", unit: "Intermediate|Present|garder", fr: "propre", en: "clean; own",
    distractors: ["dirty",  "empty",  "broken"], pos: "adjective", emoji: "🧼" }),
  W({ id: "int-garder-chaussure", unit: "Intermediate|Present|garder", fr: "une chaussure", en: "shoe",
    distractors: ["sock",  "glove",  "hat"], pos: "noun", gender: "f", emoji: "👟" }),
  W({ id: "int-garder-recu", unit: "Intermediate|Present|garder", fr: "un reçu", en: "receipt",
    distractors: ["bill",  "coin",  "ticket"], pos: "noun", gender: "m", emoji: "🧾" }),
  W({ id: "int-garder-animal", unit: "Intermediate|Present|garder", fr: "un animal", en: "animal; pet",
    distractors: ["plant",  "toy",  "insect"], pos: "noun", gender: "m", emoji: "🐾" }),
  W({ id: "int-garder-lumiere", unit: "Intermediate|Present|garder", fr: "la lumière", en: "light",
    distractors: ["noise",  "heat",  "shadow"], pos: "noun", gender: "f", emoji: "🔦" }),
  // ── Intermediate · Past · s'intéresser ────────────────────────
  W({ id: "int-s-interesser-sujet", unit: "Intermediate|Past|s'intéresser", fr: "un sujet", en: "subject; topic",
    distractors: ["object",  "reason",  "answer"], pos: "noun", gender: "m", emoji: "❔" }),
  W({ id: "int-s-interesser-litterature", unit: "Intermediate|Past|s'intéresser", fr: "la littérature", en: "literature",
    distractors: ["architecture",  "music",  "physics"], pos: "noun", gender: "f", emoji: "🖋️" }),
  W({ id: "int-s-interesser-technologie", unit: "Intermediate|Past|s'intéresser", fr: "la technologie", en: "technology",
    distractors: ["biology",  "politics",  "nature"], pos: "noun", gender: "f", emoji: "💻" }),
  // ── Intermediate · Past · se débrouiller ──────────────────────
  W({ id: "int-se-debrouiller-aeroport", unit: "Intermediate|Past|se débrouiller", fr: "l'aéroport", en: "airport",
    distractors: ["train station",  "harbour",  "bus stop"], pos: "noun", gender: "m", emoji: "🛫" }),
  W({ id: "int-se-debrouiller-bagages", unit: "Intermediate|Past|se débrouiller", fr: "les bagages", en: "luggage",
    distractors: ["tickets",  "passports",  "souvenirs"], pos: "noun", gender: "m", emoji: "🧳" }),
  // ── Intermediate · Past · s'ennuyer ───────────────────────────
  W({ id: "int-s-ennuyer-vie", unit: "Intermediate|Past|s'ennuyer", fr: "la vie", en: "life",
    distractors: ["death",  "work",  "luck"], pos: "noun", gender: "f", emoji: "🌱" }),
  // ── Intermediate · Past · s'entraîner ─────────────────────────
  W({ id: "int-s-entrainer-marathon", unit: "Intermediate|Past|s'entraîner", fr: "le marathon", en: "marathon",
    distractors: ["swimming pool",  "tournament",  "cycling race"], pos: "noun", gender: "m", emoji: "🏃" }),
  // ── Intermediate · Past · se réjouir ──────────────────────────
  W({ id: "int-se-rejouir-nouvelle", unit: "Intermediate|Past|se réjouir", fr: "une nouvelle", en: "piece of news",
    distractors: ["letter",  "party",  "surprise"], pos: "noun", gender: "f", emoji: "📢" }),
  // ── Intermediate · Past · mettre ──────────────────────────────
  W({ id: "int-mettre-chapeau", unit: "Intermediate|Past|mettre", fr: "un chapeau", en: "hat",
    distractors: ["coat",  "scarf",  "glove"], pos: "noun", gender: "m", emoji: "🎩" }),
  W({ id: "int-mettre-beurre", unit: "Intermediate|Past|mettre", fr: "le beurre", en: "butter",
    distractors: ["cheese",  "jam",  "honey"], pos: "noun", gender: "m", emoji: "🧈" }),
  W({ id: "int-mettre-vin", unit: "Intermediate|Past|mettre", fr: "le vin", en: "wine",
    distractors: ["beer",  "milk",  "juice"], pos: "noun", gender: "m", emoji: "🍷" }),
  W({ id: "int-mettre-jouet", unit: "Intermediate|Past|mettre", fr: "un jouet", en: "toy",
    distractors: ["tool",  "pillow",  "drawing"], pos: "noun", gender: "m", emoji: "🧸" }),
  W({ id: "int-mettre-reveil", unit: "Intermediate|Past|mettre", fr: "le réveil", en: "alarm clock",
    distractors: ["calendar",  "lamp",  "radio"], pos: "noun", gender: "m", emoji: "⏰" }),
  W({ id: "int-mettre-placard", unit: "Intermediate|Past|mettre", fr: "le placard", en: "cupboard",
    distractors: ["drawer",  "shelf",  "basement"], pos: "noun", gender: "m", emoji: "🧦" }),
  // ── Intermediate · Past · trouver ─────────────────────────────
  W({ id: "int-trouver-lit", unit: "Intermediate|Past|trouver", fr: "un lit", en: "bed",
    distractors: ["sofa",  "table",  "carpet"], pos: "noun", gender: "m", emoji: "🛏️" }),
  W({ id: "int-trouver-ouvert", unit: "Intermediate|Past|trouver", fr: "ouvert", en: "open",
    distractors: ["closed",  "broken",  "empty"], pos: "adjective", emoji: "🔓" }),
  W({ id: "int-trouver-rapidement", unit: "Intermediate|Past|trouver", fr: "rapidement", en: "quickly",
    distractors: ["slowly",  "rarely",  "carefully"], pos: "adverb", emoji: "🏎️" }),
  // ── Intermediate · Past · croire ──────────────────────────────
  W({ id: "int-croire-patron", unit: "Intermediate|Past|croire", fr: "le patron", en: "boss",
    distractors: ["customer",  "employee",  "neighbour"], pos: "noun", gender: "m", emoji: "🤵" }),
  W({ id: "int-croire-naif", unit: "Intermediate|Past|croire", fr: "naïf", en: "naive",
    distractors: ["clever",  "rude",  "shy"], pos: "adjective", emoji: "🐣" }),
  W({ id: "int-croire-conseil", unit: "Intermediate|Past|croire", fr: "un conseil", en: "piece of advice",
    distractors: ["warning",  "order",  "compliment"], pos: "noun", gender: "m", emoji: "🤲" }),
  // ── Intermediate · Past · parler ──────────────────────────────
  W({ id: "int-parler-proprietaire", unit: "Intermediate|Past|parler", fr: "le propriétaire", en: "owner; landlord",
    distractors: ["tenant",  "builder",  "neighbour"], pos: "noun", gender: "m", emoji: "🏡" }),
  W({ id: "int-parler-colocataire", unit: "Intermediate|Past|parler", fr: "une colocataire", en: "flatmate (female)",
    distractors: ["landlady",  "cousin",  "colleague"], pos: "noun", gender: "f", emoji: "👭" }),
  W({ id: "int-parler-soiree", unit: "Intermediate|Past|parler", fr: "une soirée", en: "evening; party",
    distractors: ["morning",  "afternoon",  "weekday"], pos: "noun", gender: "f", emoji: "🥂" }),
  W({ id: "int-parler-reve", unit: "Intermediate|Past|parler", fr: "un rêve", en: "dream",
    distractors: ["memory",  "fear",  "plan"], pos: "noun", gender: "m", emoji: "💭" }),
  // ── Intermediate · Past · prendre ─────────────────────────────
  W({ id: "int-prendre-ascenseur", unit: "Intermediate|Past|prendre", fr: "un ascenseur", en: "lift; elevator",
    distractors: ["stairs",  "corridor",  "escalator"], pos: "noun", gender: "m", emoji: "🛗" }),
  W({ id: "int-prendre-photo", unit: "Intermediate|Past|prendre", fr: "une photo", en: "photo",
    distractors: ["painting",  "map",  "video"], pos: "noun", gender: "f", emoji: "📸" }),
  W({ id: "int-prendre-autoroute", unit: "Intermediate|Past|prendre", fr: "l'autoroute", en: "motorway; highway",
    distractors: ["bridge",  "footpath",  "roundabout"], pos: "noun", gender: "f", emoji: "🛣️" }),
  W({ id: "int-prendre-poisson", unit: "Intermediate|Past|prendre", fr: "le poisson", en: "fish",
    distractors: ["chicken",  "beef",  "pork"], pos: "noun", gender: "m", emoji: "🐟" }),
  W({ id: "int-prendre-steak", unit: "Intermediate|Past|prendre", fr: "un steak", en: "steak",
    distractors: ["sausage",  "salad",  "omelette"], pos: "noun", gender: "m", emoji: "🥩" }),
  W({ id: "int-prendre-delicieux", unit: "Intermediate|Past|prendre", fr: "délicieux", en: "delicious",
    distractors: ["disgusting",  "expensive",  "spicy"], pos: "adjective", emoji: "😋" }),
  W({ id: "int-prendre-pause", unit: "Intermediate|Past|prendre", fr: "une pause", en: "break",
    distractors: ["meeting",  "shift",  "journey"], pos: "noun", gender: "f", emoji: "⏸️" }),
  // ── Intermediate · Past · lire ────────────────────────────────
  W({ id: "int-lire-auteur", unit: "Intermediate|Past|lire", fr: "un auteur", en: "author",
    distractors: ["reader",  "actor",  "publisher"], pos: "noun", gender: "m", emoji: "✒️" }),
  W({ id: "int-lire-chapitre", unit: "Intermediate|Past|lire", fr: "un chapitre", en: "chapter",
    distractors: ["cover",  "title",  "sentence"], pos: "noun", gender: "m", emoji: "🔖" }),
  W({ id: "int-lire-annonce", unit: "Intermediate|Past|lire", fr: "une annonce", en: "advert; announcement",
    distractors: ["invoice",  "complaint",  "receipt"], pos: "noun", gender: "f", emoji: "📣" }),
  W({ id: "int-lire-page", unit: "Intermediate|Past|lire", fr: "une page", en: "page",
    distractors: ["line",  "cover",  "shelf"], pos: "noun", gender: "f", emoji: "📄" }),
  W({ id: "int-lire-article", unit: "Intermediate|Past|lire", fr: "un article", en: "article",
    distractors: ["novel",  "poster",  "recipe"], pos: "noun", gender: "m", emoji: "📑" }),
  // ── Intermediate · Past · écrire ──────────────────────────────
  W({ id: "int-ecrire-cv", unit: "Intermediate|Past|écrire", fr: "un CV", en: "CV; résumé",
    distractors: ["payslip",  "contract",  "diploma"], pos: "noun", gender: "m", emoji: "📇" }),
  W({ id: "int-ecrire-formulaire", unit: "Intermediate|Past|écrire", fr: "un formulaire", en: "form",
    distractors: ["envelope",  "stamp",  "receipt"], pos: "noun", gender: "m", emoji: "🗒️" }),
  W({ id: "int-ecrire-paroles", unit: "Intermediate|Past|écrire", fr: "les paroles", en: "lyrics; words",
    distractors: ["notes",  "drawings",  "rules"], pos: "noun", gender: "f", emoji: "🎶" }),
  W({ id: "int-ecrire-liste", unit: "Intermediate|Past|écrire", fr: "une liste", en: "list",
    distractors: ["map",  "letter",  "menu"], pos: "noun", gender: "f", emoji: "📃" }),
  // ── Intermediate · Past · ouvrir ──────────────────────────────
  W({ id: "int-ouvrir-patient", unit: "Intermediate|Past|ouvrir", fr: "patient", en: "patient",
    distractors: ["angry",  "lazy",  "noisy"], pos: "adjective", emoji: "🐢" }),
  W({ id: "int-ouvrir-enveloppe", unit: "Intermediate|Past|ouvrir", fr: "une enveloppe", en: "envelope",
    distractors: ["parcel",  "stamp",  "folder"], pos: "noun", gender: "f", emoji: "💌" }),
  W({ id: "int-ouvrir-boite", unit: "Intermediate|Past|ouvrir", fr: "une boîte", en: "box; tin",
    distractors: ["bag",  "bottle",  "basket"], pos: "noun", gender: "f", emoji: "🗃️" }),
  // ── Intermediate · Past · fermer ──────────────────────────────
  W({ id: "int-fermer-gaz", unit: "Intermediate|Past|fermer", fr: "le gaz", en: "gas",
    distractors: ["water",  "electricity",  "heating"], pos: "noun", gender: "m", emoji: "🔥" }),
  W({ id: "int-fermer-tranquille", unit: "Intermediate|Past|fermer", fr: "tranquille", en: "calm; quiet",
    distractors: ["worried",  "noisy",  "busy"], pos: "adjective", emoji: "😌" }),
  W({ id: "int-fermer-lentement", unit: "Intermediate|Past|fermer", fr: "lentement", en: "slowly",
    distractors: ["quickly",  "loudly",  "early"], pos: "adverb", emoji: "🐌" }),
  W({ id: "int-fermer-portail", unit: "Intermediate|Past|fermer", fr: "un portail", en: "gate",
    distractors: ["fence",  "roof",  "garage"], pos: "noun", gender: "m", emoji: "🚧" }),
  // ── Intermediate · Past · perdre ──────────────────────────────
  W({ id: "int-perdre-victoire", unit: "Intermediate|Past|perdre", fr: "une victoire", en: "victory; win",
    distractors: ["defeat",  "draw",  "rival"], pos: "noun", gender: "f", emoji: "🏅" }),
  W({ id: "int-perdre-motivation", unit: "Intermediate|Past|perdre", fr: "la motivation", en: "motivation",
    distractors: ["patience",  "energy",  "memory"], pos: "noun", gender: "f", emoji: "🚀" }),
  W({ id: "int-perdre-interet", unit: "Intermediate|Past|perdre", fr: "l'intérêt", en: "interest",
    distractors: ["fear",  "respect",  "money"], pos: "noun", gender: "m", emoji: "💹" }),
  // ── Intermediate · Past · garder ──────────────────────────────
  W({ id: "int-garder-vieux", unit: "Intermediate|Past|garder", fr: "vieux", en: "old",
    distractors: ["new",  "young",  "small"], pos: "adjective", emoji: "🏚️" }),
  W({ id: "int-garder-dessin", unit: "Intermediate|Past|garder", fr: "un dessin", en: "drawing",
    distractors: ["photo",  "letter",  "painting brush"], pos: "noun", gender: "m", emoji: "🖍️" }),
  W({ id: "int-garder-mignon", unit: "Intermediate|Past|garder", fr: "mignon", en: "cute",
    distractors: ["ugly",  "scary",  "boring"], pos: "adjective", emoji: "🥰" }),
  W({ id: "int-garder-contact", unit: "Intermediate|Past|garder", fr: "le contact", en: "contact",
    distractors: ["argument",  "distance",  "address"], pos: "noun", gender: "m", emoji: "📲" }),
  W({ id: "int-garder-chambre", unit: "Intermediate|Past|garder", fr: "une chambre", en: "bedroom; room",
    distractors: ["kitchen",  "garden",  "garage"], pos: "noun", gender: "f", emoji: "🛏️🚪" }),
  W({ id: "int-garder-habitude", unit: "Intermediate|Past|garder", fr: "une habitude", en: "habit",
    distractors: ["rule",  "choice",  "accident"], pos: "noun", gender: "f", emoji: "🪥" }),
  // ── Intermediate · Future · s'intéresser ──────────────────────
  W({ id: "int-s-interesser-jardinage", unit: "Intermediate|Future|s'intéresser", fr: "le jardinage", en: "gardening",
    distractors: ["cooking",  "fishing",  "painting"], pos: "noun", gender: "m", emoji: "🌻" }),
  W({ id: "int-s-interesser-retraite", unit: "Intermediate|Future|s'intéresser", fr: "la retraite", en: "retirement",
    distractors: ["childhood",  "holiday",  "wedding"], pos: "noun", gender: "f", emoji: "🧓" }),
  W({ id: "int-s-interesser-peinture", unit: "Intermediate|Future|s'intéresser", fr: "la peinture", en: "painting",
    distractors: ["dancing",  "singing",  "gardening"], pos: "noun", gender: "f", emoji: "🖌️" }),
  W({ id: "int-s-interesser-recherche", unit: "Intermediate|Future|s'intéresser", fr: "la recherche", en: "research",
    distractors: ["teaching",  "marketing",  "sales"], pos: "noun", gender: "f", emoji: "🔎" }),
  // ── Intermediate · Future · se débrouiller ────────────────────
  W({ id: "int-se-debrouiller-dejeuner", unit: "Intermediate|Future|se débrouiller", fr: "le déjeuner", en: "lunch",
    distractors: ["breakfast",  "dinner",  "snack"], pos: "noun", gender: "m", emoji: "🍱" }),
  W({ id: "int-se-debrouiller-sandwich", unit: "Intermediate|Future|se débrouiller", fr: "un sandwich", en: "sandwich",
    distractors: ["salad",  "pizza",  "biscuit"], pos: "noun", gender: "m", emoji: "🥪" }),
  // ── Intermediate · Future · s'ennuyer ─────────────────────────
  W({ id: "int-s-ennuyer-long", unit: "Intermediate|Future|s'ennuyer", fr: "long", en: "long",
    distractors: ["short",  "fast",  "quiet"], pos: "adjective", emoji: "🦒" }),
  W({ id: "int-s-ennuyer-tablette", unit: "Intermediate|Future|s'ennuyer", fr: "une tablette", en: "tablet",
    distractors: ["laptop",  "camera",  "radio"], pos: "noun", gender: "f", emoji: "🖥️" }),
  // ── Intermediate · Future · s'entraîner ───────────────────────
  W({ id: "int-s-entrainer-camarade", unit: "Intermediate|Future|s'entraîner", fr: "un camarade", en: "classmate; mate",
    distractors: ["teacher",  "neighbour",  "stranger"], pos: "noun", gender: "m", emoji: "🎒" }),
  // ── Intermediate · Future · s'adapter ─────────────────────────
  W({ id: "int-s-adapter-climat", unit: "Intermediate|Future|s'adapter", fr: "le climat", en: "climate",
    distractors: ["landscape",  "language",  "food"], pos: "noun", gender: "m", emoji: "🌦️" }),
  W({ id: "int-s-adapter-la-bas", unit: "Intermediate|Future|s'adapter", fr: "là-bas", en: "over there",
    distractors: ["right here",  "inside",  "upstairs"], pos: "adverb", emoji: "🏔️" }),
  W({ id: "int-s-adapter-facilement", unit: "Intermediate|Future|s'adapter", fr: "facilement", en: "easily",
    distractors: ["slowly",  "rarely",  "badly"], pos: "adverb", emoji: "🙌" }),
  W({ id: "int-s-adapter-plante", unit: "Intermediate|Future|s'adapter", fr: "une plante", en: "plant",
    distractors: ["animal",  "stone",  "flower pot"], pos: "noun", gender: "f", emoji: "🪴" }),
  // ── Intermediate · Future · se réjouir ────────────────────────
  W({ id: "int-se-rejouir-journee", unit: "Intermediate|Future|se réjouir", fr: "une journée", en: "day",
    distractors: ["evening",  "week",  "month"], pos: "noun", gender: "f", emoji: "🌄" }),
  // ── Intermediate · Future · mettre ────────────────────────────
  W({ id: "int-mettre-chemise", unit: "Intermediate|Future|mettre", fr: "une chemise", en: "shirt",
    distractors: ["skirt",  "sock",  "coat"], pos: "noun", gender: "f", emoji: "👔" }),
  W({ id: "int-mettre-pantoufle", unit: "Intermediate|Future|mettre", fr: "une pantoufle", en: "slipper",
    distractors: ["boot",  "glove",  "sock"], pos: "noun", gender: "f", emoji: "🥿" }),
  W({ id: "int-mettre-lait", unit: "Intermediate|Future|mettre", fr: "le lait", en: "milk",
    distractors: ["water",  "wine",  "juice"], pos: "noun", gender: "m", emoji: "🥛" }),
  W({ id: "int-mettre-epice", unit: "Intermediate|Future|mettre", fr: "une épice", en: "spice",
    distractors: ["sauce",  "vegetable",  "fruit"], pos: "noun", gender: "f", emoji: "🌶️" }),
  W({ id: "int-mettre-plat", unit: "Intermediate|Future|mettre", fr: "un plat", en: "dish (meal)",
    distractors: ["drink",  "dessert",  "fork"], pos: "noun", gender: "m", emoji: "🥘" }),
  W({ id: "int-mettre-radio", unit: "Intermediate|Future|mettre", fr: "la radio", en: "radio",
    distractors: ["television",  "newspaper",  "computer"], pos: "noun", gender: "f", emoji: "📻" }),
  // ── Intermediate · Future · trouver ───────────────────────────
  W({ id: "int-trouver-appartement", unit: "Intermediate|Future|trouver", fr: "un appartement", en: "flat; apartment",
    distractors: ["garden",  "office",  "garage"], pos: "noun", gender: "m", emoji: "🏬" }),
  W({ id: "int-trouver-hotel", unit: "Intermediate|Future|trouver", fr: "un hôtel", en: "hotel",
    distractors: ["hospital",  "station",  "museum"], pos: "noun", gender: "m", emoji: "🏨" }),
  W({ id: "int-trouver-rue", unit: "Intermediate|Future|trouver", fr: "une rue", en: "street",
    distractors: ["square",  "bridge",  "building"], pos: "noun", gender: "f", emoji: "🚏" }),
  W({ id: "int-trouver-taxi", unit: "Intermediate|Future|trouver", fr: "un taxi", en: "taxi",
    distractors: ["bus",  "train",  "plane"], pos: "noun", gender: "m", emoji: "🚕" }),
  W({ id: "int-trouver-passeport", unit: "Intermediate|Future|trouver", fr: "un passeport", en: "passport",
    distractors: ["ticket",  "wallet",  "map"], pos: "noun", gender: "m", emoji: "🛂" }),
  W({ id: "int-trouver-route", unit: "Intermediate|Future|trouver", fr: "la route", en: "road",
    distractors: ["river",  "field",  "tunnel"], pos: "noun", gender: "f", emoji: "🗺️" }),
  W({ id: "int-trouver-utile", unit: "Intermediate|Future|trouver", fr: "utile", en: "useful",
    distractors: ["useless",  "heavy",  "strange"], pos: "adjective", emoji: "🛠️" }),
  // ── Intermediate · Future · croire ────────────────────────────
  W({ id: "int-croire-rarement", unit: "Intermediate|Future|croire", fr: "rarement", en: "rarely",
    distractors: ["often",  "always",  "usually"], pos: "adverb", emoji: "🦄" }),
  W({ id: "int-croire-succes", unit: "Intermediate|Future|croire", fr: "un succès", en: "success",
    distractors: ["failure",  "risk",  "effort"], pos: "noun", gender: "m", emoji: "🎖️" }),
  W({ id: "int-croire-miracle", unit: "Intermediate|Future|croire", fr: "un miracle", en: "miracle",
    distractors: ["disaster",  "accident",  "mystery"], pos: "noun", gender: "m", emoji: "🪄" }),
  // ── Intermediate · Future · parler ────────────────────────────
  W({ id: "int-parler-invite", unit: "Intermediate|Future|parler", fr: "un invité", en: "guest",
    distractors: ["host",  "waiter",  "stranger"], pos: "noun", gender: "m", emoji: "🎊" }),
  W({ id: "int-parler-conference", unit: "Intermediate|Future|parler", fr: "une conférence", en: "conference; talk",
    distractors: ["concert",  "exhibition",  "match"], pos: "noun", gender: "f", emoji: "🎤" }),
  W({ id: "int-parler-repas", unit: "Intermediate|Future|parler", fr: "un repas", en: "meal",
    distractors: ["drink",  "recipe",  "menu"], pos: "noun", gender: "m", emoji: "🍛" }),
  W({ id: "int-parler-eleve", unit: "Intermediate|Future|parler", fr: "un élève", en: "pupil; student",
    distractors: ["teacher",  "headmaster",  "parent"], pos: "noun", gender: "m", emoji: "🧑‍🎓" }),
  W({ id: "int-parler-ceremonie", unit: "Intermediate|Future|parler", fr: "une cérémonie", en: "ceremony",
    distractors: ["concert",  "match",  "lesson"], pos: "noun", gender: "f", emoji: "💒" }),
  W({ id: "int-parler-minuit", unit: "Intermediate|Future|parler", fr: "minuit", en: "midnight",
    distractors: ["midday",  "dawn",  "evening"], pos: "noun", gender: "m", emoji: "🕛" }),
  // ── Intermediate · Future · prendre ───────────────────────────
  W({ id: "int-prendre-raccourci", unit: "Intermediate|Future|prendre", fr: "un raccourci", en: "shortcut",
    distractors: ["detour",  "dead end",  "traffic jam"], pos: "noun", gender: "m", emoji: "✂️" }),
  W({ id: "int-prendre-aout", unit: "Intermediate|Future|prendre", fr: "août", en: "August",
    distractors: ["April",  "October",  "June"], pos: "noun", gender: "m", emoji: "📆8️⃣" }),
  // ── Intermediate · Future · lire ──────────────────────────────
  W({ id: "int-lire-conte", unit: "Intermediate|Future|lire", fr: "un conte", en: "tale; story",
    distractors: ["poem",  "riddle",  "song"], pos: "noun", gender: "m", emoji: "🧚" }),
  W({ id: "int-lire-apres-midi", unit: "Intermediate|Future|lire", fr: "un après-midi", en: "afternoon",
    distractors: ["morning",  "evening",  "night"], pos: "noun", gender: "m", emoji: "🌇" }),
  W({ id: "int-lire-attentivement", unit: "Intermediate|Future|lire", fr: "attentivement", en: "carefully",
    distractors: ["quickly",  "rarely",  "loudly"], pos: "adverb", emoji: "👀" }),
  W({ id: "int-lire-magazine", unit: "Intermediate|Future|lire", fr: "un magazine", en: "magazine",
    distractors: ["novel",  "dictionary",  "notebook"], pos: "noun", gender: "m", emoji: "📔" }),
  // ── Intermediate · Future · écrire ────────────────────────────
  W({ id: "int-ecrire-carte-postale", unit: "Intermediate|Future|écrire", fr: "une carte postale", en: "postcard",
    distractors: ["parcel",  "stamp",  "phone card"], pos: "noun", gender: "f", emoji: "📮" }),
  W({ id: "int-ecrire-tableau", unit: "Intermediate|Future|écrire", fr: "un tableau", en: "board; painting",
    distractors: ["chair",  "desk",  "window"], pos: "noun", gender: "m", emoji: "🖼️" }),
  W({ id: "int-ecrire-dissertation", unit: "Intermediate|Future|écrire", fr: "une dissertation", en: "essay",
    distractors: ["exam",  "lecture",  "grade"], pos: "noun", gender: "f", emoji: "📘" }),
  W({ id: "int-ecrire-lundi", unit: "Intermediate|Future|écrire", fr: "lundi", en: "Monday",
    distractors: ["Tuesday",  "Thursday",  "Wednesday"], pos: "noun", gender: "m", emoji: "🗓️1️⃣" }),
  // ── Intermediate · Future · ouvrir ────────────────────────────
  W({ id: "int-ouvrir-classe", unit: "Intermediate|Future|ouvrir", fr: "la classe", en: "class; classroom",
    distractors: ["office",  "playground",  "library"], pos: "noun", gender: "f", emoji: "✏️" }),
  // ── Intermediate · Future · fermer ────────────────────────────
  W({ id: "int-fermer-banque", unit: "Intermediate|Future|fermer", fr: "la banque", en: "bank",
    distractors: ["post office",  "pharmacy",  "bakery"], pos: "noun", gender: "f", emoji: "🏦" }),
  // ── Intermediate · Future · perdre ────────────────────────────
  W({ id: "int-perdre-prudent", unit: "Intermediate|Future|perdre", fr: "prudent", en: "careful",
    distractors: ["careless",  "brave",  "angry"], pos: "adjective", emoji: "🦺" }),
  W({ id: "int-perdre-accident", unit: "Intermediate|Future|perdre", fr: "un accident", en: "accident",
    distractors: ["holiday",  "party",  "victory"], pos: "noun", gender: "m", emoji: "🚑" }),
  // ── Intermediate · Future · garder ────────────────────────────
  W({ id: "int-garder-allume", unit: "Intermediate|Future|garder", fr: "allumé", en: "switched on; lit",
    distractors: ["switched off",  "broken",  "empty"], pos: "adjective", emoji: "🔆" }),
  W({ id: "int-garder-organise", unit: "Intermediate|Future|garder", fr: "organisé", en: "organised",
    distractors: ["messy",  "lazy",  "late"], pos: "adjective", emoji: "📐" }),
  W({ id: "int-garder-fichier", unit: "Intermediate|Future|garder", fr: "un fichier", en: "file (computer)",
    distractors: ["keyboard",  "screen",  "printer"], pos: "noun", gender: "m", emoji: "💾" }),
];

const BY_ID = new Map(CHECK_WORDS.map((w) => [w.id, w]));
export const unitKey = (level: string, timeFrame: string, verb: string) => `${level}|${timeFrame}|${verb}`;
export const wordsForUnit = (unit: string) => CHECK_WORDS.filter((w) => w.unit === unit);

// ── Progress store ──────────────────────────────────────────────────────────

const KEY = "conjugately_vocab_check";

type WordState = {
  status: "pending" | "passed";
  seen: number;
  wrong: number;
  cued: number;
  addedAt: string;
  passedAt?: string;
};
type Store = Record<string, WordState>;

async function read(): Promise<Store> {
  try { return JSON.parse((await AsyncStorage.getItem(KEY)) || "{}"); } catch { return {}; }
}
async function write(s: Store) {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

/**
 * The words due in a vocab check opened from `unit`: the unit's own words not
 * yet passed, then words carried over from earlier checks, oldest first.
 * Registers the unit's words as pending the first time.
 */
export async function wordsDue(unit: string): Promise<CheckWord[]> {
  const s = await read();
  const now = new Date().toISOString();
  let changed = false;
  for (const w of wordsForUnit(unit)) {
    if (!s[w.id]) { s[w.id] = { status: "pending", seen: 0, wrong: 0, cued: 0, addedAt: now }; changed = true; }
  }
  if (changed) await write(s);
  const own = wordsForUnit(unit).filter((w) => s[w.id]?.status === "pending");
  const carried = Object.entries(s)
    .filter(([id, st]) => st.status === "pending" && BY_ID.get(id) && BY_ID.get(id)!.unit !== unit)
    .sort((a, b) => a[1].addedAt.localeCompare(b[1].addedAt))
    .map(([id]) => BY_ID.get(id)!);
  return [...own, ...carried];
}

/** How many words a vocab check from `unit` would ask, without registering anything. */
export async function countDue(unit: string): Promise<number> {
  const s = await read();
  const own = wordsForUnit(unit).filter((w) => s[w.id]?.status !== "passed").length;
  const carried = Object.entries(s)
    .filter(([id, st]) => st.status === "pending" && BY_ID.get(id) && BY_ID.get(id)!.unit !== unit).length;
  return own + carried;
}

/**
 * Record one answer. Passed only when right AND VIS-CUE was not used.
 * Returns whether the word is now passed.
 */
export async function recordAnswer(id: string, correct: boolean, cued: boolean): Promise<boolean> {
  const s = await read();
  const st = s[id] ?? { status: "pending", seen: 0, wrong: 0, cued: 0, addedAt: new Date().toISOString() };
  st.seen += 1;
  if (cued) st.cued += 1;
  const passed = correct && !cued;
  if (!passed) st.wrong += 1;
  else { st.status = "passed"; st.passedAt = new Date().toISOString(); }
  s[id] = st;
  await write(s);
  if (passed) await markMasteredInVocabList(BY_ID.get(id)?.fr);
  return passed;
}

/** Four options, shuffled: the answer and its three distractors. */
export function optionsFor(w: CheckWord): string[] {
  return shuffle([w.en, ...w.distractors]);
}

/** Keep the Vocabulary screen in step: a passed word shows as mastered there. */
async function markMasteredInVocabList(fr?: string) {
  if (!fr) return;
  try {
    const raw = await AsyncStorage.getItem("conjugately_vocabulary");
    const list: { french?: string; status?: string }[] = raw ? JSON.parse(raw) : [];
    const norm = (x: string) => x.trim().toLowerCase();
    const bare = norm(fr).replace(/^(le|la|les|un|une|l')\s*/, "");
    let hit = false;
    for (const x of list) {
      const f = norm(x.french || "");
      if (f === norm(fr) || f.replace(/^(le|la|les|un|une|l')\s*/, "") === bare) { x.status = "mastered"; hit = true; }
    }
    if (hit) await AsyncStorage.setItem("conjugately_vocabulary", JSON.stringify(list));
  } catch {}
}
