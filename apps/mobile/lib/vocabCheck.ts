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
 * The word bank is written by hand, unit by unit: all of Beginner and Novice so far.
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
