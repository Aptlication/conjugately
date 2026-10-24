import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getCourseProgress, type CourseProgress } from "../lib/progress";
import { COURSES, courseTimeFrames } from "../lib/courses";
import { LEVELS, TENSES, timeFrameListLabel } from "@shared/levels";

/**
 * "Bonne continuation" overview (approved mock-up, 21 Oct 2026).
 * Shown for 2.5 s between the home screen's Bonne continuation button and the
 * course quiz it resumes: where the learner is (level path), how far through the
 * level and each tense (My Journey's gradient bars), and the unit starting now.
 * Then it replaces itself with the quiz, so Back from the quiz returns home.
 * 1.2.3: shown before EVERY course quiz — Bonne continuation (index.tsx), a
 * Mini-courses unit (mini-courses.tsx) and My Journey's Continue (journey.tsx).
 * A home-screen quiz still starts straight away.
 */

const HOLD_MS = 2500;
const TF_NAME: Record<string, string> = Object.fromEntries(Object.entries(TENSES).map(([k, t]) => [k, t.label]));

// Same colour ramp as My Journey (journey.tsx).
const TEMP = ["#4A78F2", "#8B7CE8", "#C77BD9", "#F0A05A", "#F0564A"];
function tempColors(pct: number): string[] {
  if (pct >= 100) return ["#5BD48F", "#5BD48F"];
  const n = Math.max(2, Math.min(TEMP.length, Math.ceil(pct / 25) + 1));
  return TEMP.slice(0, n);
}
const pctColor = (pct: number) => (pct > 0 ? tempColors(pct)[tempColors(pct).length - 1] : "#8A93A0");

type Params = { difficulty: string; verb: string; timeFrame: string; courseKey: string; unitIndex: string };

export default function Resume() {
  const p = useLocalSearchParams<Params>();
  const level = String(p.difficulty || "");
  const timeFrame = String(p.timeFrame || "");
  const unitIndex = Number(p.unitIndex ?? 0);
  const units = COURSES[level]?.units ?? [];
  const verbs = units.map((u) => u.verb);

  const [prog, setProg] = useState<CourseProgress | null>(null);
  const grow = useRef(new Animated.Value(0)).current;
  const timerBar = useRef(new Animated.Value(0)).current;
  const left = useRef(false);

  const go = () => {
    if (left.current) return;
    left.current = true;
    router.replace({ pathname: "/quiz", params: {
      difficulty: level, verb: String(p.verb || ""), timeFrame,
      courseKey: String(p.courseKey || ""), unitIndex: String(unitIndex),
    } });
  };

  useEffect(() => {
    let on = true;
    getCourseProgress().then((cp) => { if (on) setProg(cp); }).catch(() => { if (on) setProg({}); });
    const t = setTimeout(go, HOLD_MS);
    AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
      if (reduce) { grow.setValue(1); timerBar.setValue(1); return; }
      Animated.timing(grow, { toValue: 1, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
      Animated.timing(timerBar, { toValue: 1, duration: HOLD_MS, easing: Easing.linear, useNativeDriver: false }).start();
    }).catch(() => { grow.setValue(1); timerBar.setValue(1); });
    return () => { on = false; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doneIn = (tf: string) => (prog?.[`${level}|${tf}`]?.completedUnits ?? []).filter((i) => i < verbs.length);
  const timeFrames = courseTimeFrames(level);
  const total = verbs.length * timeFrames.length;
  const done = timeFrames.reduce((n, tf) => n + doneIn(tf).length, 0);
  const levelPct = total ? Math.round((done / total) * 100) : 0;
  const levelIdx = (LEVELS as string[]).indexOf(level);
  const doneHere = doneIn(timeFrame);
  const tfName = TF_NAME[timeFrame] ?? timeFrame;

  const Bar = ({ pct, here }: { pct: number; here?: boolean }) => (
    <View style={[styles.track, here && styles.trackHere]}>
      {pct > 0 && (
        <Animated.View style={{ height: "100%", width: grow.interpolate({ inputRange: [0, 1], outputRange: ["0%", `${Math.min(100, pct)}%`] }) }}>
          <LinearGradient colors={tempColors(pct) as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.fill} />
        </Animated.View>
      )}
    </View>
  );

  return (
    <Pressable style={styles.screen} onPress={go} accessibilityRole="button"
      accessibilityLabel={`${level} level, ${tfName}, unit ${unitIndex + 1}: ${verbs[unitIndex] ?? ""}. Starting now. Tap to start.`}>
      <Stack.Screen options={{ headerShown: false, animation: "fade" }} />
      <Text style={styles.h1}>Bonne continuation</Text>
      <Text style={styles.sub}>{level} level · {done} of {total} units done</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>WHERE YOU ARE</Text>
        <View style={styles.pathRow}>
          {LEVELS.map((l, i) => (
            <React.Fragment key={l}>
              <Text style={[styles.pathLabel, i < levelIdx ? styles.pathDone : i === levelIdx ? styles.pathHere : styles.pathTodo]}>
                {i < levelIdx ? `${l} ✓` : l}
              </Text>
              {i < LEVELS.length - 1 && <View style={[styles.pathBar, i < levelIdx ? styles.barDone : styles.barTodo]} />}
            </React.Fragment>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>LEVEL COMPLETION</Text>
        <View style={styles.progRow}>
          <Text style={styles.progLabel}>{level} — {timeFrameListLabel(level)} Tenses</Text>
          <Text style={[styles.progPct, { color: pctColor(levelPct) }]}>{levelPct}%</Text>
        </View>
        <Bar pct={levelPct} />
        <Text style={styles.levelSub}>{done} of {total} units across the {timeFrames.length === 5 ? "five" : "three"} tenses</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>PROGRESS</Text>
        {timeFrames.map((tf) => {
          const here = tf === timeFrame;
          const d = doneIn(tf);
          const pct = verbs.length ? Math.round((d.length / verbs.length) * 100) : 0;
          return (
            <View key={tf} style={{ marginBottom: 10 }}>
              <View style={styles.progRow}>
                <Text style={[styles.progLabel, here && styles.progLabelHere]}>
                  {level} · {TF_NAME[tf]}{here ? "  " : ""}
                  {here && <Text style={styles.resumeTag}> RESUMING </Text>}
                </Text>
                <Text style={[styles.progPct, { color: pctColor(pct) }]}>{pct}%</Text>
              </View>
              <Bar pct={pct} here={here} />
              {here && (
                <View style={styles.chips}>
                  {verbs.map((v, i) => {
                    const isDone = d.includes(i), isNext = i === unitIndex;
                    return (
                      <View key={v} style={[styles.chip, isDone && styles.chipDone, isNext && styles.chipNext]}>
                        <Text style={[styles.chipText, isDone && styles.chipTextDone, isNext && styles.chipTextNext]}>
                          {isDone && !isNext ? "✓ " : ""}{v}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.next}>
        <Text style={styles.nextLabel}>STARTING NOW</Text>
        <Text style={styles.nextTitle}>Unit {unitIndex + 1}: {verbs[unitIndex] ?? String(p.verb || "")} · {tfName}</Text>
        <Text style={styles.nextSub}>{level} level · {units[unitIndex]?.questions ?? 20} questions</Text>
      </View>

      <View style={styles.foot}>
        <View style={styles.timer}>
          <Animated.View style={[styles.timerFill, { width: timerBar.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }]} />
        </View>
        <View style={styles.footRow}>
          <Text style={styles.footText}>Starting in a moment…</Text>
          <Pressable onPress={go} hitSlop={10} accessibilityRole="button"><Text style={styles.skip}>Start now ▸</Text></Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#1B2145", padding: 16, paddingTop: 60, paddingBottom: 34, gap: 12 },
  h1: { color: "#F5F6F8", fontSize: 28, fontWeight: "800" },
  sub: { color: "#B9CBFA", fontSize: 13, marginTop: -8 },
  card: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 14 },
  cardLabel: { fontSize: 11, fontWeight: "700", color: "#B9CBFA", letterSpacing: 0.5, marginBottom: 8 },
  pathRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  pathLabel: { fontSize: 11, fontWeight: "700" },
  pathDone: { color: "#5BD48F" },
  pathHere: { color: "#FFFFFF", backgroundColor: "#4A78F2", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, overflow: "hidden" },
  pathTodo: { color: "#8A93A0", fontWeight: "500" },
  pathBar: { flex: 1, height: 4, borderRadius: 2, marginHorizontal: 4, minWidth: 8 },
  barDone: { backgroundColor: "#5BD48F" },
  barTodo: { backgroundColor: "rgba(255,255,255,0.2)" },
  progRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  progLabel: { fontSize: 12, color: "#E2E8F0", flexShrink: 1 },
  progLabelHere: { color: "#FFFFFF", fontWeight: "800" },
  progPct: { fontSize: 12, fontWeight: "800", fontVariant: ["tabular-nums"] },
  resumeTag: { fontSize: 10, fontWeight: "900", color: "#FFFFFF", backgroundColor: "#4A78F2", letterSpacing: 0.8 },
  track: { height: 8, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 4, overflow: "hidden" },
  trackHere: { height: 10, borderWidth: 1.5, borderColor: "rgba(74,120,242,0.8)" },
  fill: { flex: 1, borderRadius: 4 },
  levelSub: { fontSize: 11, color: "#8A93A0", marginTop: 6 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
  chip: { borderRadius: 999, paddingVertical: 3, paddingHorizontal: 9, backgroundColor: "rgba(255,255,255,0.06)" },
  chipDone: { backgroundColor: "rgba(91,212,143,0.18)" },
  chipNext: { backgroundColor: "#4A78F2" },
  chipText: { fontSize: 12, color: "#8A93A0" },
  chipTextDone: { color: "#5BD48F" },
  chipTextNext: { color: "#FFFFFF", fontWeight: "800" },
  next: { backgroundColor: "rgba(34,197,94,0.16)", borderWidth: 1, borderColor: "#22C55E", borderRadius: 14, padding: 14 },
  nextLabel: { fontSize: 11, fontWeight: "700", color: "#5BD48F", letterSpacing: 0.5, marginBottom: 4 },
  nextTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  nextSub: { color: "#E2E8F0", fontSize: 13, marginTop: 2 },
  foot: { marginTop: "auto", gap: 8 },
  timer: { height: 6, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" },
  timerFill: { height: "100%", backgroundColor: "#5BD48F" },
  footRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  footText: { color: "#B9CBFA", fontSize: 13 },
  skip: { color: "#5BD48F", fontSize: 14, fontWeight: "800" },
});
