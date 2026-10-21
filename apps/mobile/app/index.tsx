import React, { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useFonts, DancingScript_600SemiBold } from "@expo-google-fonts/dancing-script";
import { Stack, router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing, cancelAnimation, useAnimatedStyle, useReducedMotion, useSharedValue,
  withDelay, withTiming, type SharedValue,
} from "react-native-reanimated";
import NavBar from "../components/NavBar";
import { getJourneySummary, getQuizHistory } from "../lib/progress";

/**
 * Home (1.2.3). Wordmark, tagline, description and one Continue button,
 * centred above the tab bar.
 *
 * Entrance (approved 18 Oct 2026, replacing the wordmark turn): the eleven
 * letters of "Conjugately" fly in from different directions, spinning and
 * settling with a small overshoot, in a scattered arrival order; a soft glow
 * pulses as the last one lands. The tagline keeps its agreed build:
 * de → French → suite! → tout (which drops in from above).
 * Plays once each time Home appears. Timings match the approved browser
 * sample ("Conjugately Letter Assembly"). Reduce Motion: shown still.
 *
 * One clock (milliseconds since the entrance began) drives every piece.
 */

const START_DELAY_MS = 400;
const TOTAL_MS = 2100;
const EASE = Easing.bezierFn(0.22, 1, 0.36, 1);
const GLOW_EASE = Easing.bezierFn(0.42, 0, 0.58, 1);

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

const LETTERS: { ch: string; color: string }[] = [
  { ch: "C", color: "#7FA8EC" }, { ch: "o", color: "#7FA8EC" }, { ch: "n", color: "#7FA8EC" },
  { ch: "j", color: "#EC9A9A" },
  { ch: "u", color: "#F5F6F8" }, { ch: "g", color: "#F5F6F8" }, { ch: "a", color: "#F5F6F8" }, { ch: "t", color: "#F5F6F8" },
  { ch: "e", color: "#EC9A9A" }, { ch: "l", color: "#EC9A9A" }, { ch: "y", color: "#EC9A9A" },
];
// Well-spread starting directions (degrees), so neighbouring letters never come from the same side.
const DIRS = [200, 20, 290, 110, 335, 155, 245, 65, 180, 310, 90];
// Arrival order (not left to right).
const ORDER = [5, 0, 8, 3, 10, 1, 6, 9, 2, 7, 4];
const LETTER_STAGGER_MS = 55;
const LETTER_MS = 820;
const GLOW_DELAY_MS = 1150;
const GLOW_MS = 900;

type WordSpec = { delay: number; fromTop?: boolean };
const WORD_MS = 330;

type Resume =
  | { kind: "first" }
  | { kind: "returning"; line: string; params: Record<string, string> };

export default function Home() {
  // Dancing Script is embedded at build time (app.json expo-font plugin);
  // useFonts keeps the web twin working.
  useFonts({ DancingScript_600SemiBold });
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
    <View style={{ flex: 1, backgroundColor: "#1B2145" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.center, { paddingTop: insets.top }]}>
        <Wordmark ms={ms} />
        <Tagline ms={ms} />
        <Text style={styles.blurb}>
          {"Master French verb conjugations—\nthe key to fluency."}
        </Text>

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
  const glow = useAnimatedStyle(() => ({
    opacity: kf(prog(ms.value, GLOW_DELAY_MS, GLOW_MS), [0, 0.35, 1], [0, 0.55, 0], GLOW_EASE),
  }));
  return (
    <View style={styles.markWrap} accessible accessibilityRole="header" accessibilityLabel="Conjugately">
      <Animated.View pointerEvents="none" style={[styles.glowBox, glow]}
        accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <View style={styles.glowOval}>
          {GLOW_RINGS.map((d) => (
            <View key={d} style={[styles.glowRing, { width: d, height: d, borderRadius: d / 2 }]} />
          ))}
        </View>
      </Animated.View>
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
  return <Animated.Text style={[styles.h1, { color }, style]}>{ch}</Animated.Text>;
}

// Stacked translucent circles, squashed to an oval: a radial glow without a
// gradient library.
const GLOW_RINGS = [260, 228, 196, 164, 132, 100, 68, 36];

/** Each word in its own clipped slot, built out of order: de, French, suite!, tout. */
function Tagline({ ms }: { ms: SharedValue<number> }) {
  return (
    <View style={styles.tagRow} accessible accessibilityRole="text" accessibilityLabel="French tout de suite!">
      <Word ms={ms} spec={{ delay: 550 }} text="French" />
      <Word ms={ms} spec={{ delay: 1060, fromTop: true }} text="tout" />
      <Word ms={ms} spec={{ delay: 300 }} text="de" />
      <Word ms={ms} spec={{ delay: 800 }} text="suite!" />
    </View>
  );
}

function Word({ ms, spec, text }: { ms: SharedValue<number>; spec: WordSpec; text: string }) {
  const h = useSharedValue(36);
  const dir = spec.fromTop ? -1 : 1;
  const style = useAnimatedStyle(() => {
    const p = prog(ms.value, spec.delay, WORD_MS);
    const S = [0, 0.72, 1];
    return {
      opacity: kf(p, S, [0, 1, 1], EASE),
      transform: [{ translateY: kf(p, S, [1.05 * dir, -0.07 * dir, 0], EASE) * h.value }],
    };
  });
  const onLayout = (e: LayoutChangeEvent) => { h.value = e.nativeEvent.layout.height; };
  return (
    <View style={styles.slot} importantForAccessibility="no">
      <Animated.View style={style} onLayout={onLayout}>
        <Text style={styles.cursive}>{text}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Vertically centred in the space above the floating tab bar.
  center: { flex: 1, alignItems: "center", justifyContent: "center",
    paddingHorizontal: 16, paddingBottom: 90 },
  markWrap: { alignItems: "center", justifyContent: "center", marginBottom: 8 },
  markRow: { flexDirection: "row" },
  glowBox: { position: "absolute", width: 260, height: 60, alignItems: "center", justifyContent: "center" },
  glowOval: { width: 260, height: 260, alignItems: "center", justifyContent: "center",
    transform: [{ scaleY: 60 / 260 }] },
  glowRing: { position: "absolute", backgroundColor: "rgba(127,160,238,0.10)" },
  h1: { fontSize: 40, fontWeight: "700", textAlign: "center" },
  // Each word rolls inside its own clipped slot. On iOS, Dancing Script's
  // swashes (the F, the !) overhang the Text box, so the slot needs real room
  // or the glyph edges are cut off. The extra padding is taken back out with
  // negative margins, so word spacing and the tagline's position are unchanged.
  tagRow: { flexDirection: "row", justifyContent: "center", gap: 5,
    marginTop: -10, marginBottom: 8 },
  slot: { overflow: "hidden", paddingTop: 10, paddingBottom: 12, paddingHorizontal: 10,
    marginHorizontal: -8.5 },
  // Dancing Script is embedded at build time; iOS addresses an embedded font by
  // its PostScript name, the web twin by the useFonts alias.
  cursive: { color: "#FFFFFF", fontSize: 26,
    fontFamily: Platform.select({ ios: "DancingScript-SemiBold", default: "DancingScript_600SemiBold" }) },
  blurb: { color: "#CBD6F5", fontSize: 16, textAlign: "center", lineHeight: 25,
    paddingHorizontal: 10 },
  continueBtn: { marginTop: 18, minHeight: 58, paddingVertical: 8, paddingHorizontal: 24,
    borderRadius: 29, backgroundColor: "#7FA8EC", borderWidth: 1, borderColor: "#A3BCF4",
    flexDirection: "row", alignItems: "center", gap: 12,
    shadowColor: "#7FA0EE", shadowOpacity: 0.35, shadowRadius: 9, shadowOffset: { width: 0, height: 6 },
    elevation: 6 },
  continueText: { alignItems: "flex-start", gap: 1 },
  continue1: { color: "#FFFFFF", fontSize: 19, fontWeight: "800", fontStyle: "italic" },
  continue2: { color: "#F2F5FF", fontSize: 13, fontWeight: "700" },
});
