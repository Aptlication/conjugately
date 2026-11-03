import { router } from "expo-router";

/**
 * Where a finished course lesson comes to rest (Jonathan, 3 Nov 2026): My
 * Journey, which puts the next lesson up front and shows how far the learner
 * has come, instead of going back to whichever screen the lesson was started
 * from (usually Home).
 *
 * The lesson's screens are cleared first, so Back from My Journey goes to Home,
 * never into the finished quiz or conversation.
 */
export function finishLesson() {
  try { if (router.canDismiss()) router.dismissAll(); } catch {}
  router.push("/journey" as any);
}
