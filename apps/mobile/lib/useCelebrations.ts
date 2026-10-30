import { useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { claimNextCelebration } from "./milestones";

/**
 * Opens the next due "Tense complete" or "Level complete" screen when this
 * screen gains focus (31 Oct 2026). Used by the screens a unit's flow returns
 * to: home, Mini-Courses and My Journey. Never during a quiz, conversation or
 * vocab check, because those screens don't use it.
 */
export function useCelebrations() {
  useFocusEffect(useCallback(() => {
    let on = true;
    // A short wait so the screen has settled after the flow above it closed.
    const t = setTimeout(() => {
      claimNextCelebration().then((c) => {
        if (!on || !c) return;
        if (c.kind === "tense") router.push({ pathname: "/tense-complete" as any, params: { level: c.level, timeFrame: c.timeFrame } });
        else router.push({ pathname: "/level-complete" as any, params: { level: c.level } });
      }).catch(() => {});
    }, 450);
    return () => { on = false; clearTimeout(t); };
  }, []));
}
