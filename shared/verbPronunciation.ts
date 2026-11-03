/**
 * Pronunciation button on Mic On screens (item 1.5, approved by Jonathan
 * 3 Nov 2026, option A): a tap says the VERB, never the answer. The infinitive
 * always; then, in the compound past tenses (passé composé, plus-que-parfait),
 * the past participle as well, unless it sounds the same as the infinitive
 * (parler / parlé), so only participles that sound different are recorded.
 *
 * Sound guides follow the vocab scheme (apps/mobile/lib/vocabSoundGuides.ts):
 * syllables joined by hyphens, the stressed syllable in CAPITALS.
 *
 * Audio: attached_assets/audio/verbs/<slug>.mp3 and <slug>-pp.mp3 on the
 * server, recorded by scripts/record-verb-pronunciation.mjs (same voice as the
 * vocab cards). Until a clip is recorded and deployed, the button still shows
 * the written guide. Add a verb here whenever a level or Advanced unit adds one.
 */

export type VerbSound = {
  /** As shown and spoken. */
  infinitive: string;
  guide: string;
  /** Past participle, only where it sounds different from the infinitive. */
  participle?: string;
  participleGuide?: string;
};

export const VERB_SOUNDS: Record<string, VerbSound> = {
  // Beginner · Novice
  "être": { infinitive: "être", guide: "EH-truh", participle: "été", participleGuide: "ay-TAY" },
  "avoir": { infinitive: "avoir", guide: "ah-VWAHR", participle: "eu", participleGuide: "EW" },
  "faire": { infinitive: "faire", guide: "FEHR", participle: "fait", participleGuide: "FEH" },
  "aller": { infinitive: "aller", guide: "ah-LAY" },
  // Elementary
  "dire": { infinitive: "dire", guide: "DEER", participle: "dit", participleGuide: "DEE" },
  "voir": { infinitive: "voir", guide: "VWAHR", participle: "vu", participleGuide: "VEW" },
  "savoir": { infinitive: "savoir", guide: "sah-VWAHR", participle: "su", participleGuide: "SEW" },
  "vouloir": { infinitive: "vouloir", guide: "voo-LWAHR", participle: "voulu", participleGuide: "voo-LEW" },
  "venir": { infinitive: "venir", guide: "vuh-NEER", participle: "venu", participleGuide: "vuh-NEW" },
  "pouvoir": { infinitive: "pouvoir", guide: "poo-VWAHR", participle: "pu", participleGuide: "PEW" },
  "besoin": { infinitive: "avoir besoin", guide: "ah-VWAHR buh-ZWAN", participle: "eu besoin", participleGuide: "EW buh-ZWAN" },
  // Intermediate A
  "mettre": { infinitive: "mettre", guide: "MEH-truh", participle: "mis", participleGuide: "MEE" },
  "trouver": { infinitive: "trouver", guide: "troo-VAY" },
  "croire": { infinitive: "croire", guide: "KRWAHR", participle: "cru", participleGuide: "KREW" },
  "parler": { infinitive: "parler", guide: "pahr-LAY" },
  "prendre": { infinitive: "prendre", guide: "PRAHN-druh", participle: "pris", participleGuide: "PREE" },
  "lire": { infinitive: "lire", guide: "LEER", participle: "lu", participleGuide: "LEW" },
  "écrire": { infinitive: "écrire", guide: "ay-KREER", participle: "écrit", participleGuide: "ay-KREE" },
  "ouvrir": { infinitive: "ouvrir", guide: "oo-VREER", participle: "ouvert", participleGuide: "oo-VEHR" },
  "fermer": { infinitive: "fermer", guide: "fehr-MAY" },
  "perdre": { infinitive: "perdre", guide: "PEHR-druh", participle: "perdu", participleGuide: "pehr-DEW" },
  "garder": { infinitive: "garder", guide: "gahr-DAY" },
  // Intermediate B (participles differ from the infinitive by the "se")
  "s'intéresser": { infinitive: "s'intéresser", guide: "san-tay-reh-SAY", participle: "intéressé", participleGuide: "an-tay-reh-SAY" },
  "se débrouiller": { infinitive: "se débrouiller", guide: "suh day-broo-YAY", participle: "débrouillé", participleGuide: "day-broo-YAY" },
  "s'ennuyer": { infinitive: "s'ennuyer", guide: "sahn-nwee-YAY", participle: "ennuyé", participleGuide: "ahn-nwee-YAY" },
  "s'entraîner": { infinitive: "s'entraîner", guide: "sahn-treh-NAY", participle: "entraîné", participleGuide: "ahn-treh-NAY" },
  "se souvenir": { infinitive: "se souvenir", guide: "suh soov-NEER", participle: "souvenu", participleGuide: "soov-NEW" },
  "s'adapter": { infinitive: "s'adapter", guide: "sah-dahp-TAY", participle: "adapté", participleGuide: "ah-dahp-TAY" },
  "se réjouir": { infinitive: "se réjouir", guide: "suh ray-ZHWEER", participle: "réjoui", participleGuide: "ray-ZHWEE" },
  // Advanced A (pilot units)
  "aider": { infinitive: "aider", guide: "eh-DAY" },
  "apporter": { infinitive: "apporter", guide: "ah-pohr-TAY" },
  "commencer": { infinitive: "commencer", guide: "koh-mahn-SAY" },
  "demander": { infinitive: "demander", guide: "duh-mahn-DAY" },
  "donner": { infinitive: "donner", guide: "doh-NAY" },
  "recevoir": { infinitive: "recevoir", guide: "ruh-suh-VWAHR", participle: "reçu", participleGuide: "ruh-SEW" },
  "réserver": { infinitive: "réserver", guide: "ray-zehr-VAY" },
  "servir": { infinitive: "servir", guide: "sehr-VEER", participle: "servi", participleGuide: "sehr-VEE" },
  "visiter": { infinitive: "visiter", guide: "vee-zee-TAY" },
  "vivre": { infinitive: "vivre", guide: "VEE-vruh", participle: "vécu", participleGuide: "vay-KEW" },
};

/** File-safe name: "s'intéresser" → "s-interesser". */
export function verbSlug(verb: string): string {
  return verb.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
}

/** Whether a tense is built on the past participle. */
export const usesParticiple = (tense: string) => /pass[ée]|plus-que|pluperfect|^past$/i.test(tense.trim());

export type PronounceItem = { text: string; guide: string; clip: string };

/**
 * What the button says for this verb in this tense, in order: the infinitive,
 * then the participle in the compound past tenses. Empty for an unknown verb.
 */
export function pronunciationFor(verb: string, tense: string): PronounceItem[] {
  const key = verb.normalize("NFC").trim();
  const v = VERB_SOUNDS[key] ?? VERB_SOUNDS[key.toLowerCase()];
  if (!v) return [];
  const slug = verbSlug(key);
  const items: PronounceItem[] = [{ text: v.infinitive, guide: v.guide, clip: `${slug}.mp3` }];
  if (v.participle && usesParticiple(tense)) items.push({ text: v.participle, guide: v.participleGuide ?? "", clip: `${slug}-pp.mp3` });
  return items;
}

/** Every clip to record: [file, French text]. */
export function allPronunciationClips(): [string, string][] {
  const out: [string, string][] = [];
  for (const [key, v] of Object.entries(VERB_SOUNDS)) {
    const slug = verbSlug(key);
    out.push([`${slug}.mp3`, v.infinitive]);
    if (v.participle) out.push([`${slug}-pp.mp3`, v.participle]);
  }
  return out;
}
