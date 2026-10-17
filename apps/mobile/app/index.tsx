import React, { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useFonts, DancingScript_600SemiBold } from "@expo-google-fonts/dancing-script";
import { Stack, router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing, cancelAnimation, useAnimatedStyle, useReducedMotion, useSharedValue,
  withDelay, withRepeat, withTiming, type SharedValue,
} from "react-native-reanimated";
import NavBar from "../components/NavBar";
import { getJourneySummary, getQuizHistory } from "../lib/progress";

/**
 * Home (1.2.3, design locked 18 Oct 2026).
 *
 * Wordmark, tagline, description and one Continue button, centred above the
 * tab bar. The reels and Choose All for Me moved to the Verbs tab; Mini-Courses
 * and Vocabulary are reached from their tabs.
 *
 * Animation: one 9 s clock drives everything, so the wordmark turn and the
 * tagline build can never drift apart. Keyframes are the mock-up's
 * (Main.dc.html: cj-turn, cj-glow, cj-de, cj-french, cj-suite, cj-tout),
 * with each segment eased as CSS eases a keyframe segment.
 */

const CYCLE_MS = 9000;
const FIRST_RUN_DELAY_MS = 600;
const TURN_EASE = Easing.bezierFn(0.65, 0, 0.35, 1);
const GLOW_EASE = Easing.bezierFn(0.42, 0, 0.58, 1); // CSS ease-in-out
const WORD_EASE = Easing.bezierFn(0.22, 1, 0.36, 1);
const WEB = Platform.OS === "web";

/** Value at time t (0..1) for keyframes `stops` → `vals`, easing each segment. */
function kf(t: number, stops: number[], vals: number[], ease: (x: number) => number): number {
  "worklet";
  if (t <= stops[0]) return vals[0];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t <= stops[i + 1]) {
      const span = stops[i + 1] - stops[i];
      const p = span > 0 ? (t - stops[i]) / span : 1;
      return vals[i] + (vals[i + 1] - vals[i]) * ease(p);
    }
  }
  return vals[vals.length - 1];
}

type WordSpec = { stops: number[]; y: number[]; op: number[]; blur: number[] };
const OUT = [0.94, 0.985, 1];
const rise = (start: number, peak: number, settle: number): WordSpec => ({
  stops: [0, ...(start > 0 ? [start] : []), peak, settle, ...OUT],
  y: [1.05, ...(start > 0 ? [1.05] : []), -0.07, 0, 0, -1.05, -1.05],
  op: [0, ...(start > 0 ? [0] : []), 1, 1, 1, 0, 0],
  blur: [3, ...(start > 0 ? [3] : []), 0, 0, 0, 2, 2],
});
const W_DE = rise(0, 0.026, 0.036);
const W_FRENCH = rise(0.028, 0.054, 0.064);
const W_SUITE = rise(0.056, 0.082, 0.092);
// "tout" drops in from above, landing as the turn completes.
const W_TOUT: WordSpec = {
  stops: [0, 0.084, 0.112, 0.124, ...OUT],
  y: [-1.05, -1.05, 0.07, 0, 0, -1.05, -1.05],
  op: [0, 0, 1, 1, 1, 0, 0],
  blur: [3, 3, 0, 0, 0, 2, 2],
};

type Resume =
  | { kind: "first" }
  | { kind: "returning"; line: string; params: Record<string, string> };

export default function Home() {
  const [fontsLoaded] = useFonts({ DancingScript_600SemiBold });
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const t = useSharedValue(0);
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      // Mid-cycle: wordmark face-on, glow off, the whole tagline settled.
      t.value = 0.5;
      return;
    }
    t.value = 0;
    t.value = withDelay(FIRST_RUN_DELAY_MS,
      withRepeat(withTiming(1, { duration: CYCLE_MS, easing: Easing.linear }), -1, false));
    return () => cancelAnimation(t);
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
    if (resume.kind === "returning") router.push({ pathname: "/quiz", params: resume.params });
    else router.push("/verbs" as any);
  };

  const shown = resume ?? { kind: "first" as const };
  const line1 = shown.kind === "returning" ? "Bonne continuation" : "Commençons !";
  const line2 = shown.kind === "returning" ? shown.line : "Build your first quiz / choose a course";

  return (
    <View style={{ flex: 1, backgroundColor: "#1B2145" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.center, { paddingTop: insets.top }]}>
        <Wordmark t={t} />
        <Tagline t={t} fontsLoaded={fontsLoaded} />
        <Text style={styles.blurb}>
          Master French verb conjugations—the key to fluency—with your own
          personalized quizzes and optional mini-courses.
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

function WordmarkText() {
  return (
    <Text style={styles.h1}>
      <Text style={{ color: "#7FA8EC" }}>Con</Text>
      <Text style={{ color: "#EC9A9A" }}>j</Text>
      <Text style={{ color: "#F5F6F8" }}>ugat</Text>
      <Text style={{ color: "#EC9A9A" }}>ely</Text>
    </Text>
  );
}

/** Two faces, backface hidden, so the lettering is never seen mirrored. */
function Wordmark({ t }: { t: SharedValue<number> }) {
  const front = useAnimatedStyle(() => {
    const a = kf(t.value, [0, 0.14, 1], [0, 360, 360], TURN_EASE);
    return { transform: [{ perspective: 900 }, { rotateY: `${a}deg` }] };
  });
  const back = useAnimatedStyle(() => {
    const a = kf(t.value, [0, 0.14, 1], [0, 360, 360], TURN_EASE);
    return { transform: [{ perspective: 900 }, { rotateY: `${a + 180}deg` }] };
  });
  const glow = useAnimatedStyle(() => ({
    opacity: kf(t.value, [0, 0.07, 0.16, 1], [0, 0.55, 0, 0], GLOW_EASE),
  }));
  return (
    <View style={styles.markWrap}>
      <Animated.View pointerEvents="none" style={[styles.glowBox, glow]}
        accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <View style={styles.glowOval}>
          {GLOW_RINGS.map((d) => (
            <View key={d} style={[styles.glowRing, { width: d, height: d, borderRadius: d / 2 }]} />
          ))}
        </View>
      </Animated.View>
      <Animated.View style={[styles.face, front]} accessible accessibilityLabel="Conjugately">
        <WordmarkText />
      </Animated.View>
      <Animated.View style={[styles.face, styles.faceBack, back]}
        accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <WordmarkText />
      </Animated.View>
    </View>
  );
}

// Stacked translucent circles, squashed to an oval: a radial glow without a
// gradient library (closest-side, rgba(127,160,238,0.55) → 0 in the mock-up).
const GLOW_RINGS = [260, 228, 196, 164, 132, 100, 68, 36];

/** Each word in its own clipped slot, built out of order: de, French, suite!, tout. */
function Tagline({ t, fontsLoaded }: { t: SharedValue<number>; fontsLoaded: boolean }) {
  return (
    <View style={styles.tagRow} accessible accessibilityRole="text" accessibilityLabel="French tout de suite!">
      <Word t={t} spec={W_FRENCH} text="French" fontsLoaded={fontsLoaded} />
      <Word t={t} spec={W_TOUT} text="tout" fontsLoaded={fontsLoaded} />
      <Word t={t} spec={W_DE} text="de" fontsLoaded={fontsLoaded} />
      <Word t={t} spec={W_SUITE} text="suite!" fontsLoaded={fontsLoaded} />
    </View>
  );
}

function Word({ t, spec, text, fontsLoaded }: {
  t: SharedValue<number>; spec: WordSpec; text: string; fontsLoaded: boolean;
}) {
  const h = useSharedValue(36);
  const style = useAnimatedStyle(() => {
    const s: any = {
      opacity: kf(t.value, spec.stops, spec.op, WORD_EASE),
      transform: [{ translateY: kf(t.value, spec.stops, spec.y, WORD_EASE) * h.value }],
    };
    // Blurred → sharp on the web twin. iOS has no per-view blur filter in RN,
    // so on device the entrance is the rise + fade alone.
    if (WEB) s.filter = `blur(${kf(t.value, spec.stops, spec.blur, WORD_EASE)}px)`;
    return s;
  });
  const onLayout = (e: LayoutChangeEvent) => { h.value = e.nativeEvent.layout.height; };
  return (
    <View style={styles.slot} importantForAccessibility="no">
      <Animated.View style={style} onLayout={onLayout}>
        <Text style={[styles.cursive, !fontsLoaded && { fontFamily: undefined }]}>{text}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Vertically centred in the space above the floating tab bar.
  center: { flex: 1, alignItems: "center", justifyContent: "center",
    paddingHorizontal: 16, paddingBottom: 90 },
  markWrap: { alignItems: "center", justifyContent: "center", marginBottom: 8 },
  face: { backfaceVisibility: "hidden" },
  faceBack: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  glowBox: { position: "absolute", width: 260, height: 60, alignItems: "center", justifyContent: "center" },
  glowOval: { width: 260, height: 260, alignItems: "center", justifyContent: "center",
    transform: [{ scaleY: 60 / 260 }] },
  glowRing: { position: "absolute", backgroundColor: "rgba(127,160,238,0.10)" },
  h1: { fontSize: 40, fontWeight: "700", textAlign: "center" },
  // Slot padding (0.12em top, 0.18em bottom) is taken back out of the margins,
  // so the tagline sits where it always did.
  tagRow: { flexDirection: "row", justifyContent: "center", gap: 5,
    marginTop: -3, marginBottom: 15 },
  slot: { overflow: "hidden", paddingTop: 3, paddingBottom: 5, paddingHorizontal: 1.5 },
  cursive: { color: "#FFFFFF", fontSize: 26, fontFamily: "DancingScript_600SemiBold" },
  // Inset a further 10 each side (1.2.3).
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
