import React, { useCallback, useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useFonts, Michroma_400Regular } from "@expo-google-fonts/michroma";
import { Stack, router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing, cancelAnimation, useAnimatedStyle, useReducedMotion, useSharedValue,
  withDelay, withTiming, type SharedValue,
} from "react-native-reanimated";
import NavBar from "../components/NavBar";
import { getJourneySummary, getQuizHistory } from "../lib/progress";
import { useCelebrations } from "../lib/useCelebrations";

/**
 * Home (1.4, Pluri rebrand). Wordmark, "FRENCH" and one Continue
 * button, centred above the tab bar, on the brand's night navy.
 *
 * Wordmark (approved 27 Oct 2026): "pluri" in bold Michroma, "pl" blue,
 * "u" white, "ri" red, with "FRENCH" below in silver chrome. Michroma has one
 * weight, so the bold is drawn as a matching outline (layered copies).
 * Entrance: the five letters fly in from different directions, spinning and
 * settling with a small overshoot (the 1.2.3 letter-assembly motion), then
 * FRENCH rises in. (The "tout de suite!" tagline was dropped, 29 Oct 2026.)
 * Plays once each time Home appears. Reduce Motion: shown still.
 *
 * One clock (milliseconds since the entrance began) drives every piece.
 */

const START_DELAY_MS = 400;
const TOTAL_MS = 1500;
const EASE = Easing.bezierFn(0.22, 1, 0.36, 1);

/** Value at progress p (0..1) for keyframes `stops` → `vals`, easing each segment. */
function kf(p: number, stops: number[], vals: number[], ease: (x: number) => number): number {
  "worklet";
  if (p <= stops[0]) return vals[0];
  for (let i = 0; i < stops.length - 1; i++) {
    if (p <= stops[i + 1]) {
      const span = stops[i + 1] - stops[i];
      const q = span > 0 ? (p - stops[i]) / span : 1;
      return vals[i] + (vals[i + 1] - vals[i]) * ease(q);
    }
  }
  return vals[vals.length - 1];
}
/** 0..1 progress of a piece that starts at `delay` and lasts `dur` (ms). */
function prog(ms: number, delay: number, dur: number): number {
  "worklet";
  return Math.min(1, Math.max(0, (ms - delay) / dur));
}

// Brand (Pluri-French-Brand-Kit/README.md).
const NAVY = "#17162B";
const BLEU = "#4C7DFF";
const BLANC = "#FFFFFF";
const ROUGE = "#FF3B47";
const MICHROMA = Platform.select({ ios: "Michroma-Regular", default: "Michroma_400Regular" });

const LETTERS: { ch: string; color: string }[] = [
  { ch: "p", color: BLEU }, { ch: "l", color: BLEU },
  { ch: "u", color: BLANC },
  { ch: "r", color: ROUGE }, { ch: "i", color: ROUGE },
];
// Well-spread starting directions (degrees), so neighbouring letters never come from the same side.
const DIRS = [200, 20, 290, 110, 335];
// Arrival order (not left to right).
const ORDER = [2, 0, 4, 1, 3];
const LETTER_STAGGER_MS = 90;
const LETTER_MS = 820;
const MARK_SIZE = 80;
// The bold: eight copies of each letter, offset round a circle of this radius.
const BOLD_R = MARK_SIZE * 0.0225;
const BOLD_OFFSETS = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return { x: Math.cos(a) * BOLD_R, y: Math.sin(a) * BOLD_R };
});
const FRENCH_DELAY_MS = 640;
const FRENCH_MS = 420;

type Resume =
  | { kind: "first" }
  | { kind: "returning"; line: string; params: Record<string, string> };

export default function Home() {
  // 31 Oct 2026: Tense complete / Level complete, once each, when the learner returns here.
  useCelebrations();
  // Michroma is embedded at build time (app.json expo-font plugin);
  // useFonts keeps the web twin working.
  useFonts({ Michroma_400Regular });
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const ms = useSharedValue(0);
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    if (reduceMotion) { ms.value = TOTAL_MS; return; }
    ms.value = 0;
    ms.value = withDelay(START_DELAY_MS, withTiming(TOTAL_MS, { duration: TOTAL_MS, easing: Easing.linear }));
    return () => cancelAnimation(ms);
  }, [reduceMotion]);

  // Continue: same destination as Journey's "Next step" when a course is under
  // way; otherwise the learner's most recent quiz.
  useFocusEffect(useCallback(() => {
    let on = true;
    Promise.all([getJourneySummary(), getQuizHistory()])
      .then(([s, hist]) => {
        if (!on) return;
        if (s.nextStep) {
          const n = s.nextStep;
          setResume({ kind: "returning", line: `${n.level} · ${n.verb} · ${n.timeFrame}`,
            params: { difficulty: n.level, verb: n.verb, timeFrame: n.timeFrame,
              courseKey: n.courseKey, unitIndex: String(n.unitIndex) } });
          return;
        }
        const last = hist[hist.length - 1];
        if (last) {
          const params: Record<string, string> = {
            difficulty: last.difficulty, verb: last.verb, timeFrame: last.timeFrame };
          if (last.courseKey !== undefined && last.unitIndex !== undefined) {
            params.courseKey = last.courseKey; params.unitIndex = String(last.unitIndex);
          }
          setResume({ kind: "returning", line: `${last.difficulty} · ${last.verb} · ${last.timeFrame}`, params });
          return;
        }
        setResume({ kind: "first" });
      })
      .catch(() => { if (on) setResume({ kind: "first" }); });
    return () => { on = false; };
  }, []));

  const onContinue = () => {
    if (!resume) return;
    // A course unit gets the 2.5 s "Bonne continuation" overview first (app/resume.tsx),
    // which then replaces itself with the quiz. A home-screen quiz resumes straight away.
    if (resume.kind === "returning") {
      router.push({ pathname: resume.params.courseKey ? "/resume" as any : "/quiz", params: resume.params });
    }
    else router.push("/verbs" as any);
  };

  const shown = resume ?? { kind: "first" as const };
  const line1 = shown.kind === "returning" ? "Bonne continuation" : "Commençons !";
  const line2 = shown.kind === "returning" ? shown.line : "Build your first quiz / choose a course";

  return (
    <View style={{ flex: 1, backgroundColor: NAVY }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.center, { paddingTop: insets.top }]}>
        <Wordmark ms={ms} />
        <French ms={ms} />

        {/* Rendered (invisible) before progress loads, so nothing shifts. */}
        <Pressable onPress={onContinue} disabled={!resume}
          accessibilityRole="button" accessibilityLabel={`${line1}. ${line2}`}
          style={({ pressed }) => [styles.continueBtn, !resume && { opacity: 0 }, pressed && { opacity: 0.85 }]}>
          <Ionicons name="play" size={22} color="#FFFFFF" />
          <View style={styles.continueText}>
            <Text style={styles.continue1}>{line1}</Text>
            <Text style={styles.continue2}>{line2}</Text>
          </View>
        </Pressable>
      </View>
      <NavBar variant="dark" active="home" />
    </View>
  );
}

function Wordmark({ ms }: { ms: SharedValue<number> }) {
  return (
    <View style={styles.markWrap} accessible accessibilityRole="header" accessibilityLabel="Pluri French">
      <View style={styles.markRow} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
        {LETTERS.map((l, i) => <Letter key={i} ms={ms} index={i} ch={l.ch} color={l.color} />)}
      </View>
    </View>
  );
}

function Letter({ ms, index, ch, color }: { ms: SharedValue<number>; index: number; ch: string; color: string }) {
  const rad = (DIRS[index] * Math.PI) / 180;
  const dist = 230 + (index % 3) * 45;
  const x = Math.cos(rad) * dist;
  const y = Math.sin(rad) * dist * 0.9;
  const rot = (index % 2 ? 1 : -1) * (120 + ((index * 37) % 120));
  const delay = ORDER.indexOf(index) * LETTER_STAGGER_MS;
  const style = useAnimatedStyle(() => {
    const p = prog(ms.value, delay, LETTER_MS);
    const S = [0, 0.75, 1];
    return {
      opacity: kf(p, S, [0, 1, 1], EASE),
      transform: [
        { translateX: kf(p, S, [x, -x * 0.04, 0], EASE) },
        { translateY: kf(p, S, [y, -y * 0.04, 0], EASE) },
        { rotate: `${kf(p, S, [rot, -rot * 0.04, 0], EASE)}deg` },
        { scale: kf(p, S, [0.4, 1.06, 1], EASE) },
      ],
    };
  });
  return (
    <Animated.View style={[styles.letter, style]}>
      <Text style={[styles.h1, { color }]}>{ch}</Text>
      {BOLD_OFFSETS.map((o, k) => (
        <Text key={k} style={[styles.h1, styles.boldCopy, { color, transform: [{ translateX: o.x }, { translateY: o.y }] }]}>{ch}</Text>
      ))}
    </Animated.View>
  );
}

/** "FRENCH" in silver chrome: a pale top half laid over a darker bottom half. */
function French({ ms }: { ms: SharedValue<number> }) {
  const style = useAnimatedStyle(() => {
    const p = prog(ms.value, FRENCH_DELAY_MS, FRENCH_MS);
    return { opacity: kf(p, [0, 1], [0, 1], EASE), transform: [{ translateY: kf(p, [0, 1], [10, 0], EASE) }] };
  });
  return (
    <Animated.View style={[styles.frenchWrap, style]} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
      <Text style={[styles.french, { color: "#9AA3AF" }]}>FRENCH</Text>
      <View style={styles.frenchTop}>
        <Text style={[styles.french, { color: "#F4F6F9" }]}>FRENCH</Text>
      </View>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  // Vertically centred in the space above the floating tab bar.
  center: { flex: 1, alignItems: "center", justifyContent: "center",
    paddingHorizontal: 16, paddingBottom: 90 },
  markWrap: { alignItems: "center", justifyContent: "center", marginBottom: 2 },
  markRow: { flexDirection: "row" },
  letter: { marginHorizontal: MARK_SIZE * 0.015 },
  h1: { fontSize: MARK_SIZE, lineHeight: MARK_SIZE * 1.25, fontFamily: MICHROMA, textAlign: "center" },
  boldCopy: { position: "absolute", left: 0, top: 0 },
  // FRENCH: letter-spacing 35%, with the same space added on the left so the word stays centred.
  frenchWrap: { marginBottom: 22, paddingLeft: 7 },
  french: { fontFamily: MICHROMA, fontSize: 20, lineHeight: 26, letterSpacing: 7 },
  frenchTop: { position: "absolute", left: 7, top: 0, right: 0, height: 13.5, overflow: "hidden" },
  blurb: { color: "#CBD6F5", fontSize: 16, textAlign: "center", lineHeight: 25,
    paddingHorizontal: 10 },
  continueBtn: { marginTop: 18, minHeight: 58, paddingVertical: 8, paddingHorizontal: 24,
    borderRadius: 29, backgroundColor: BLEU, borderWidth: 1, borderColor: "#7C9BFF",
    flexDirection: "row", alignItems: "center", gap: 12,
    shadowColor: BLEU, shadowOpacity: 0.35, shadowRadius: 9, shadowOffset: { width: 0, height: 6 },
    elevation: 6 },
  continueText: { alignItems: "flex-start", gap: 1 },
  continue1: { color: "#FFFFFF", fontSize: 19, fontWeight: "800", fontStyle: "italic" },
  continue2: { color: "#F2F5FF", fontSize: 13, fontWeight: "700" },
});
