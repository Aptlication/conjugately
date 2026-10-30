import React, { useEffect, useMemo, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Dimensions, Easing, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { LEVELS, LEVEL_EMOJI, TENSES, timeFramesFor, type Level } from "@shared/levels";
import { getExam } from "@shared/exams";
import { cefrTestForLevel } from "@shared/cefrTests";
import { COURSES } from "../lib/courses";
import { usePro } from "../lib/pro";
import ExamGateCard from "../components/ExamGateCard";
import CefrBadge from "../components/CefrBadge";

/**
 * "Level complete" banner (plan of 31 Oct 2026, approved by Jonathan).
 *
 * Shown once, when every tense of a level is done (lib/milestones.ts). This is
 * now the one invitation to the level's Final Level Exams: the per-tense exam
 * pop-up after a quiz is gone. Each exam is a normal ExamGateCard, so coins,
 * Pro and unlocking work exactly as in Mini-Courses. Underneath, what passing
 * them leads to: the CEFR-style test (Novice A1, Elementary A2, Intermediate B
 * B1 and the Guarantee) or the next level (Beginner, Intermediate A). After the
 * last exam is passed, the existing CEFR invite in quiz.tsx takes over.
 */

const CONFETTI = ["#F5C518", "#5BD48F", "#4A78F2", "#F0564A", "#C77BD9", "#FFFFFF"];

function Confetti() {
  const { width, height } = Dimensions.get("window");
  const pieces = useMemo(() => Array.from({ length: 36 }, (_, i) => ({
    x: Math.random() * width, delay: Math.random() * 900, spin: Math.random() > 0.5 ? 1 : -1,
    color: CONFETTI[i % CONFETTI.length], w: 6 + Math.random() * 6, h: 10 + Math.random() * 8,
  })), [width]);
  const fall = useRef(pieces.map(() => new Animated.Value(0))).current;
  const [on, setOn] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((rm) => {
      if (rm) return;
      setOn(true);
      Animated.parallel(fall.map((v, i) => Animated.timing(v, {
        toValue: 1, duration: 2600 + Math.random() * 1200, delay: pieces[i].delay,
        easing: Easing.in(Easing.quad), useNativeDriver: true,
      }))).start(() => setOn(false));
    }).catch(() => {});
  }, [fall, pieces]);
  if (!on) return null;
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {pieces.map((p, i) => (
        <Animated.View key={i} style={{
          position: "absolute", left: p.x, top: -20, width: p.w, height: p.h, borderRadius: 2, backgroundColor: p.color,
          transform: [
            { translateY: fall[i].interpolate({ inputRange: [0, 1], outputRange: [0, height + 40] }) },
            { rotate: fall[i].interpolate({ inputRange: [0, 1], outputRange: ["0deg", `${p.spin * 540}deg`] }) },
          ],
        }} />
      ))}
    </View>
  );
}

export default function LevelComplete() {
  const p = useLocalSearchParams<{ level: string }>();
  const level = String(p.level || "");
  const tfs = timeFramesFor(level);
  const tenseNames = tfs.map((tf) => TENSES[tf].label);
  const verbs = (COURSES[level]?.units ?? []).map((u) => u.verb);
  const exams = tfs.filter((tf) => getExam(level, tf));
  const cefr = cefrTestForLevel(level);
  const nextLevel = (LEVELS as string[])[(LEVELS as string[]).indexOf(level) + 1];
  const { isPro } = usePro();
  const locked = level !== "Beginner" && !isPro;

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  }, []);

  const list = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}` : xs.join(""));
  const close = () => (router.canGoBack() ? router.back() : router.replace("/"));
  const startNextLevel = () => {
    const u = COURSES[nextLevel]?.units[0];
    if (!u) { close(); return; }
    router.replace({ pathname: "/resume" as any, params: {
      difficulty: nextLevel, verb: u.verb, timeFrame: "Present", courseKey: `${nextLevel}|Present`, unitIndex: "0",
    } });
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.party} accessibilityElementsHidden>🎉</Text>
        <Text style={styles.kicker} accessibilityRole="header">{LEVEL_EMOJI[level as Level] ?? ""} {level.toUpperCase()} COMPLETE</Text>
        <Text style={styles.title}>Félicitations !</Text>
        <Text style={styles.body}>
          You've finished the {list(tenseNames)} with {list(verbs)}.
        </Text>

        {exams.length > 0 && (
          <View style={styles.examBox}>
            <Text style={styles.examHead}>Now take your Final Level Exams · {exams.length}</Text>
            <Text style={styles.examSub}>One per tense. Each needs 90% to pass, and retakes are free once unlocked.</Text>
            {exams.map((tf) => (
              <View key={tf} style={{ marginTop: 6 }}>
                <Text style={styles.examTense}>{TENSES[tf].label}</Text>
                <ExamGateCard level={level} timeFrame={tf} variant="dark" locked={locked} />
              </View>
            ))}
          </View>
        )}

        <View style={styles.then}>
          {cefr ? (
            <>
              <CefrBadge id={cefr.id} earned={false} size={52} label="" />
              <Text style={styles.thenText}>
                Pass all {exams.length} to unlock the <Text style={{ fontWeight: "800", color: "#FFFFFF" }}>CEFR-style {cefr.id} test</Text>
                {level === "Intermediate B" ? " — the level that counts for the Guarantee." : "."}
              </Text>
            </>
          ) : nextLevel ? (
            <Text style={styles.thenText}>
              Pass all {exams.length}, then on to <Text style={{ fontWeight: "800", color: "#FFFFFF" }}>{nextLevel}</Text>.
            </Text>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {nextLevel ? (
          <Pressable style={styles.secondary} onPress={startNextLevel} accessibilityRole="button">
            <Text style={styles.secondaryText}>Or continue to {nextLevel} →</Text>
          </Pressable>
        ) : null}
        <Pressable onPress={close} accessibilityRole="button" style={{ padding: 10 }}>
          <Text style={styles.later}>Later</Text>
        </Pressable>
      </View>
      <Confetti />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#1B2145" },
  scroll: { padding: 20, paddingTop: 70, alignItems: "stretch" },
  party: { fontSize: 56, textAlign: "center" },
  kicker: { color: "#F5C518", fontSize: 14, fontWeight: "900", letterSpacing: 2, textAlign: "center", marginTop: 8 },
  title: { color: "#FFFFFF", fontSize: 32, fontWeight: "900", textAlign: "center", marginTop: 4 },
  body: { color: "#E2E8F0", fontSize: 15, lineHeight: 22, textAlign: "center", marginTop: 10 },
  examBox: { marginTop: 22, padding: 14, borderRadius: 18, borderWidth: 2, borderColor: "#F5C518",
    backgroundColor: "rgba(245,197,24,0.06)" },
  examHead: { color: "#F5C518", fontSize: 17, fontWeight: "900" },
  examSub: { color: "#C3CAD4", fontSize: 13, marginTop: 4, marginBottom: 4 },
  examTense: { color: "#B9CBFA", fontSize: 12, fontWeight: "800", letterSpacing: 1, marginTop: 8, textTransform: "uppercase" },
  then: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 18, padding: 14, borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)" },
  thenText: { flex: 1, color: "#C3CAD4", fontSize: 14, lineHeight: 20 },
  footer: { padding: 20, paddingBottom: 36, gap: 4 },
  secondary: { borderRadius: 14, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.35)" },
  secondaryText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  later: { color: "#B9CBFA", fontSize: 14, textAlign: "center" },
});
