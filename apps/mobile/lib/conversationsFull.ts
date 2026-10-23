import {
  CONVERSATION_AUDIO as BASE_AUDIO,
  getConversation as getBaseConversation,
  type Conversation,
} from "./conversations";
import { WARMUPS } from "./conversationWarmups";
import { WARMUP_AUDIO } from "./conversationWarmupAudio";

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

export const CONVERSATION_AUDIO: Record<string, number> = { ...BASE_AUDIO, ...WARMUP_AUDIO };

export function getConversation(level: string, timeFrame: string, verb: string): Conversation | undefined {
  const base = getBaseConversation(level, timeFrame, verb);
  if (!base) return undefined;
  const warm = WARMUPS[`${level}|${timeFrame}|${verb}`.normalize("NFC")];
  return warm?.length ? { ...base, turns: [...warm, ...base.turns] } : base;
}

/** What the conversation offer says: about 20 s, plus 15 at Elementary and 30 at Intermediate. */
export function conversationSeconds(level: string): number {
  return 20 + (level === "Elementary" ? 15 : level === "Intermediate" ? 30 : 0);
}
