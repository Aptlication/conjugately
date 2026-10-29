import { CHECK_WORDS } from "./vocabCheck";
import { SOUND_GUIDES } from "./vocabSoundGuides";

/**
 * Sound guides for the "New words in this conversation" list shown before a
 * post-quiz conversation (Jonathan, 30 Oct 2026), the same English-friendly
 * guides the vocab-check cards show (lib/vocabSoundGuides.ts, same scheme:
 * syllables joined by hyphens, the stressed last syllable in CAPITALS;
 * ah · ay (é) · eh (è/ê/ai) · uh (le, eu) · ee · oh · oo (ou) · ew (u) ·
 * wah (oi) · ahn (an/en) · ohn (on) · an (in/ain/un) · zh · sh · ny).
 *
 * A conversation word that is also a vocab-check word reuses that card's guide
 * (soundGuideFor below), so the two never disagree. This table holds only the
 * words the vocab bank does not have, keyed by the French exactly as the
 * conversation lists it. Masculine / feminine pairs give both, in that order.
 *
 * Every conversation word had a guide on 30 Oct 2026 (434 words: 275 from the
 * vocab bank, 159 here). Add one here when you add a word to a conversation;
 * a word without one simply shows no guide.
 */
export const CONVERSATION_SOUND_GUIDES: Record<string, string> = {
  "Miam": "MYAHM",
  "français / française": "frahn-SEH / frahn-SEHZ",
  "australien / australienne": "ohs-trah-LYAN / ohs-trah-LYEHN",
  "Bienvenue": "byan-vuh-NEW",
  "l'Italie": "lee-tah-LEE",
  "l'été": "lay-TAY",
  "Ça me fait plaisir": "sah muh feh pleh-ZEER",
  "la fête": "lah FEHT",
  "fatigué / fatiguée": "fah-tee-GAY",
  "l'âge": "LAHZH",
  "ans": "AHN",
  "avoir peur": "ah-vwahr PUHR",
  "il fait beau": "eel feh BOH",
  "il fait froid": "eel feh FRWAH",
  "faire bon voyage": "fehr bohn vwah-YAHZH",
  "faire le tour de": "fehr luh toor DUH",
  "l'Espagne": "leh-SPAHNY",
  "à vélo": "ah vay-LOH",
  "Bonne journée": "bohn zhoor-NAY",
  "merci": "mehr-SEE",
  "les voisins": "lay vwah-ZAN",
  "ne… rien": "nuh … RYAN",
  "grand-chose": "grahn-SHOHZ",
  "la tour Eiffel": "lah too-reh-FEHL",
  "la Seine": "lah SEHN",
  "plus haut": "plew OH",
  "le match": "luh MAHTCH",
  "un film": "uhn FEELM",
  "nager": "nah-ZHAY",
  "apprendre": "ah-PRAHNDR",
  "la nouvelle": "lah noo-VEHL",
  "avant": "ah-VAHN",
  "Les nouvelles vont vite": "lay noo-vehl vohn VEET",
  "le résultat": "luh ray-zewl-TAH",
  "un thé": "uhn TAY",
  "un chocolat chaud": "uhn shoh-koh-lah SHOH",
  "partir": "pahr-TEER",
  "le coucher du soleil": "luh koo-shay dew soh-LEHY",
  "rester": "rehs-TAY",
  "les musées": "lay mew-ZAY",
  "faire du shopping": "fehr dew shoh-PEENG",
  "avec": "ah-VEHK",
  "huit heures": "wee-TUHR",
  "Noël": "noh-EHL",
  "aider": "eh-DAY",
  "finir": "fee-NEER",
  "la réunion": "lah ray-ew-NYOHN",
  "rester dîner": "rehs-tay dee-NAY",
  "des médicaments": "day may-dee-kah-MAHN",
  "l'histoire": "lees-TWAHR",
  "C'est passionnant": "seh pah-syoh-NAHN",
  "les amis": "lay-zah-MEE",
  "l'espagnol": "lehs-pah-NYOHL",
  "assez bien": "ah-say BYAN",
  "Bravo": "brah-VOH",
  "tout seul / toute seule": "too SUHL / toot SUHL",
  "sans": "SAHN",
  "des sandwichs": "day sahnd-WEETCH",
  "ne… jamais": "nuh … zhah-MEH",
  "pendant": "pahn-DAHN",
  "Bon entraînement": "boh-nahn-trehn-MAHN",
  "prêt / prête": "PREH / PREHT",
  "l'examen": "leg-zah-MAN",
  "les camarades": "lay kah-mah-RAHD",
  "premier / première": "pruh-MYAY / pruh-MYEHR",
  "un jour d'école": "uhn zhoor day-KOHL",
  "beau / belle": "BOH / BEHL",
  "nouveau / nouvelle": "noo-VOH / noo-VEHL",
  "les collègues": "lay koh-LEHG",
  "Tout va bien": "too vah BYAN",
  "la France": "lah FRAHNS",
  "Félicitations": "fay-lee-see-tah-SYOHN",
  "chez moi": "shay MWAH",
  "partir en vacances": "pahr-teer ahn vah-KAHNS",
  "Profitez bien": "proh-fee-tay BYAN",
  "Quelle belle nouvelle": "kehl behl noo-VEHL",
  "revoir": "ruh-VWAHR",
  "bleu": "BLUH",
  "bien couvert": "byan koo-VEHR",
  "les clés": "lay KLAY",
  "la table": "lah TAHBL",
  "C'est noté": "seh noh-TAY",
  "mettre la table": "meh-truh lah TAHBL",
  "combien": "kohn-BYAN",
  "six": "SEES",
  "un avis": "uhn-nah-VEE",
  "chercher": "shehr-SHAY",
  "Paris": "pah-REE",
  "Bonne installation": "boh-nan-stah-lah-SYOHN",
  "y": "EE",
  "une croyance": "ewn krwah-YAHNS",
  "naïf / naïve": "nah-EEF / nah-EEV",
  "le professeur": "luh proh-feh-SUHR",
  "Dis la vérité": "dee lah vay-ree-TAY",
  "avoir de la chance": "ah-vwahr duh lah SHAHNS",
  "il faut": "eel FOH",
  "le directeur": "luh dee-rehk-TUHR",
  "Courage": "koo-RAHZH",
  "un steak frites": "uhn stehk FREET",
  "deux semaines": "duh suh-MEHN",
  "La pauvre": "lah POHVR",
  "papier": "pah-PYAY",
  "dernier / dernière": "dehr-NYAY / dehr-NYEHR",
  "adorer": "ah-doh-RAY",
  "envoyer": "ahn-vwah-YAY",
  "une lettre de motivation": "ewn leh-truh duh moh-tee-vah-SYOHN",
  "J'ai hâte": "zhay AHT",
  "il fait chaud": "eel feh SHOH",
  "la fenêtre": "lah fuh-NEHTR",
  "Ça fait du bien": "sah feh dew BYAN",
  "tous mes": "too MAY",
  "petit / petite": "puh-TEE / puh-TEET",
  "les siens": "lay SYAN",
  "patient / patiente": "pah-SYAHN / pah-SYAHNT",
  "un magasin": "uhn mah-gah-ZAN",
  "aller chercher": "ah-lay shehr-SHAY",
  "fermer à clé": "fehr-may ah KLAY",
  "avoir confiance": "ah-vwahr kohn-FYAHNS",
  "toutes": "TOOT",
  "dix-huit heures": "dee-zwee-TUHR",
  "dix-sept heures": "dees-seh-TUHR",
  "Dépêche-toi": "day-pehsh TWAH",
  "C'est de famille": "seh duh fah-MEEY",
  "le club": "luh KLUHB",
  "cette fois": "seht FWAH",
  "le sien / la sienne": "luh SYAN / lah SYEHN",
  "Promis": "proh-MEE",
  "les petits-enfants": "lay puh-tee-zahn-FAHN",
  "pour eux": "poo-RUH",
  "vieux / vieille": "VYUH / VYEHY",
  "une fille": "ewn FEEY",
  "sous": "SOO",
  "raconter": "rah-kohn-TAY",
  "adolescent / adolescente": "ah-doh-leh-SAHN / ah-doh-leh-SAHNT",
  "un voyage": "uhn vwah-YAHZH",
  "un correspondant / une correspondante": "uhn koh-rehs-pohn-DAHN / ewn koh-rehs-pohn-DAHNT",
  "impatient / impatiente": "an-pah-SYAHN / an-pah-SYAHNT",
  "ancien / ancienne": "ahn-SYAN / ahn-SYEHN",
  "compter sur": "kohn-tay SEWR",
  "garder pour soi": "gahr-day poor SWAH",
  "sonner": "soh-NAY",
  "le petit-déjeuner": "luh puh-tee day-zhuh-NAY",
  "partager": "pahr-tah-ZHAY",
  "meilleur / meilleure": "meh-YUHR",
  "tout / toute / tous / toutes": "TOO / TOOT / TOO (TOOS alone) / TOOT",
  "attendre": "ah-TAHNDR",
  "mouillé / mouillée": "moo-YAY",
  "rien": "RYAN",
  "mouvementé / mouvementée": "moov-mahn-TAY",
  "un colocataire": "uhn koh-loh-kah-TEHR",
  "le froid": "luh FRWAH",
  "la photo": "lah foh-TOH",
  "un/une artiste": "uhn-nahr-TEEST / ew-nahr-TEEST",
  "rentrer": "rahn-TRAY",
  "une arrivée": "ew-nah-ree-VAY",
  "aller mieux": "ah-lay MYUH",
  "téléphoner": "tay-lay-foh-NAY",
  "un hiver": "uhn-nee-VEHR",
  "préféré / préférée": "pray-fay-RAY",
};

const norm = (t: string) => t.normalize("NFC").toLowerCase().replace(/[’]/g, "'")
  .replace(/[!?.…]|\((?:m|f)\)/g, "").replace(/\s+/g, " ").trim();

let bankGuides: Map<string, string> | null = null;
function fromVocabBank(fr: string): string | undefined {
  if (!bankGuides) {
    bankGuides = new Map();
    for (const w of CHECK_WORDS) {
      const g = SOUND_GUIDES[w.id];
      if (g && !bankGuides.has(norm(w.fr))) bankGuides.set(norm(w.fr), g);
    }
  }
  return bankGuides.get(norm(fr));
}

/** The sound guide for a conversation's new word, or undefined if it has none. */
export function soundGuideFor(fr: string): string | undefined {
  const own = CONVERSATION_SOUND_GUIDES[fr.normalize("NFC")] ?? CONVERSATION_SOUND_GUIDES[fr];
  if (own) return own;
  const bank = fromVocabBank(fr);
  if (bank) return bank;
  // "un étudiant / une étudiante": both halves are vocab-check words.
  const parts = fr.split("/").map((p) => p.trim()).filter(Boolean);
  if (parts.length > 1) {
    const each = parts.map(fromVocabBank);
    if (each.every(Boolean)) return each.join(" / ");
  }
  return undefined;
}
