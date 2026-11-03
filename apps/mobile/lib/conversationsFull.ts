import { contentLevel, isIntermediate } from "@shared/levels";
import {
  CONVERSATION_AUDIO as BASE_AUDIO,
  getConversation as getBaseConversation,
  type Conversation,
} from "./conversations";
import { WARMUPS } from "./conversationWarmups";
import { WARMUP_AUDIO } from "./conversationWarmupAudio";
import { CONVERSATIONS_125, WARMUPS_125 } from "./conversations125";
import { AUDIO_125 } from "./conversation125Audio";
import { TENSE_CONVERSATIONS, type TenseConversation } from "./conversationsTense";
import { AUDIO_TENSE } from "./conversationTenseAudio";

/**
 * 1.2.3.5 (Jonathan, 23 Oct 2026): longer conversations above Novice.
 * Elementary gains about 15 seconds and Intermediate about 30, by putting an
 * easier warm-up BEFORE the existing dialogue. The warm-up asks about what the
 * learner has just practised: each learner reply is one of that unit's quiz
 * answers. The existing turns (generated from the "Post-Quiz Dialogues" doc
 * into conversations.ts) are unchanged and follow on as before.
 *
 * Warm-up clips are recorded with scripts/generate-conversation-audio.mjs
 * (--lines=scripts/data/conversation-warmup-lines.json). WARMUP_AUDIO lists only
 * the clips that exist (scripts/build-warmup-audio-map.mjs), and a missing clip
 * plays silently and moves on, so a warm-up never blocks a conversation.
 */

export const CONVERSATION_AUDIO: Record<string, number> = { ...BASE_AUDIO, ...WARMUP_AUDIO, ...AUDIO_125, ...AUDIO_TENSE };

// Built once per unit and reused. The conversation screen's effects depend on
// this object, so a fresh copy on every render restarted the dialogue at its
// first line in a loop (TestFlight 48, 23 Oct 2026: "Bonjour, bonjour, …").
// The same object must come back every time: scripts/test-conversations.mjs checks it.
const FULL = new Map<string, Conversation | undefined>();

export function getConversation(level: string, timeFrame: string, verb: string): Conversation | undefined {
  // Intermediate A and B use the conversations written for Intermediate; the
  // Imperfect and Pluperfect ones were added in 1.2.5 (conversations125.ts).
  const key = `${contentLevel(level)}|${timeFrame}|${verb}`.normalize("NFC");
  if (FULL.has(key)) return FULL.get(key);
  const base = getBaseConversation(contentLevel(level), timeFrame, verb) ?? CONVERSATIONS_125[key];
  const warm = WARMUPS[key] ?? WARMUPS_125[key];
  const full = base && warm?.length ? { ...base, turns: [...warm, ...base.turns] } : base;
  FULL.set(key, full);
  return full;
}

/** What the conversation offer says: about 20 s, plus 15 at Elementary and 30 at Intermediate. */
export function conversationSeconds(level: string): number {
  return 20 + (level === "Elementary" ? 15 : isIntermediate(level) ? 30 : 0);
}

/**
 * Tense Conversations (31 Oct 2026): one longer conversation at the end of each
 * tense, weaving every verb of the tense. Keyed by the level itself (not
 * contentLevel): Intermediate A and B have different verbs. Same shape as a unit
 * conversation, with `verb: "*"`, so the conversation screen plays it unchanged.
 */
const TENSE_FULL = new Map<string, (Conversation & TenseConversation) | undefined>();
export function getTenseConversation(level: string, timeFrame: string): (Conversation & TenseConversation) | undefined {
  // Same object every time, like getConversation: the screen's effects depend on it.
  const key = `${level}|${timeFrame}`.normalize("NFC");
  if (!TENSE_FULL.has(key)) {
    const c = TENSE_CONVERSATIONS[key];
    TENSE_FULL.set(key, c ? { ...c, verb: "*" } : undefined);
  }
  return TENSE_FULL.get(key);
}

/** About 12 seconds a reply, rounded to the half-minute. */
export function tenseConversationMinutes(level: string, timeFrame: string): number {
  const c = TENSE_CONVERSATIONS[`${level}|${timeFrame}`];
  const replies = c ? c.turns.filter((t) => t.who === "you").length : 0;
  return Math.max(1, Math.round((replies * 12) / 30) / 2);
}
