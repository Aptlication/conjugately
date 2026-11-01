import { useCallback, useEffect, useRef } from "react";
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { ADVANCED_AUDIO } from "./advancedAudio";

/** Whether a clip has been recorded and bundled. */
export const hasClip = (key: string) => !!ADVANCED_AUDIO[key];

/**
 * Plays Advanced clips one after another. Hardened the same way as the Final
 * conversation (app/conversation.tsx, 23 Oct 2026): after the mic, iOS can hold
 * the audio session for recording, so the session is switched back to playback
 * before each clip, and a safety timer moves things on if a clip is missing or
 * stalls. A missing clip simply waits a moment, scaled to the text, then ends.
 */
export function useAdvancedPlayer() {
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);
  const endRef = useRef<() => void>(() => {});
  const playingRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queue = useRef<{ key: string; textLength: number }[]>([]);
  const clear = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };

  const finish = useCallback(() => {
    if (!playingRef.current) return;
    clear();
    const next = queue.current.shift();
    if (next) { start(next.key, next.textLength); return; }
    playingRef.current = false;
    const cb = endRef.current;
    endRef.current = () => {};
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(async (key: string, textLength: number) => {
    const src = ADVANCED_AUDIO[key];
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    if (!src) {
      // Not recorded yet: give the reader time to read the line instead.
      timer.current = setTimeout(finish, Math.min(4000, 900 + textLength * 35));
      return;
    }
    timer.current = setTimeout(finish, 20000);
    for (let i = 0; i < 3; i++) {
      try { await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false, shouldRouteThroughEarpiece: false }); break; }
      catch { await wait(150); }
    }
    try {
      player.replace(src);
      const t0 = Date.now();
      while (!player.isLoaded && Date.now() - t0 < 2000) await wait(50);
      try { player.seekTo(0); } catch {}
      player.play();
      if (player.duration > 0) { clear(); timer.current = setTimeout(finish, (player.duration + 2) * 1000); }
      setTimeout(() => {
        if (playingRef.current && !player.playing && !player.currentStatus?.didJustFinish) { try { player.play(); } catch {} }
      }, 800);
    } catch {
      clear();
      timer.current = setTimeout(finish, 1500);
    }
  }, [player, finish]);

  useEffect(() => { if (status.didJustFinish) finish(); }, [status.didJustFinish, finish]);
  useEffect(() => () => { clear(); try { player.pause(); } catch {} }, [player]);

  /** Play clips in order, then call onEnd. `texts` give the fallback wait for unrecorded clips. */
  const play = useCallback((items: { key: string; text: string }[], onEnd: () => void = () => {}) => {
    clear();
    try { player.pause(); } catch {}
    queue.current = items.slice(1).map((x) => ({ key: x.key, textLength: x.text.length }));
    endRef.current = onEnd;
    playingRef.current = true;
    if (!items.length) { finish(); return; }
    start(items[0].key, items[0].text.length);
  }, [player, start, finish]);

  /** Stop at once; onEnd is not called. */
  const stop = useCallback(() => {
    clear();
    queue.current = [];
    playingRef.current = false;
    endRef.current = () => {};
    try { player.pause(); } catch {}
  }, [player]);

  return { play, stop, isPlaying: () => playingRef.current };
}
