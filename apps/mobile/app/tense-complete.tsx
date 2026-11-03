import React, { useCallback, useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LEVEL_EMOJI, TENSES, timeFramesFor, type Level } from "@shared/levels";
import { getExam } from "@shared/exams";
import { COURSES } from "../lib/courses";
import { getCourseProgress } from "../lib/progress";
import { getMilestones, tenseStatus } from "../lib/milestones";
import { getTenseConversation, tenseConversationMinutes } from "../lib/conversationsFull";
import { purchasesAvailable, usePro } from "../lib/pro";

/**
 * "Tense complete" (plan of 31 Oct 2026, approved by Jonathan).
 *
 * Shown once, when the learner comes back from the unit that finished a tense
 * (after its quiz, conversation and vocab check: lib/milestones.ts). It confirms
 * the tense is done, offers the Tense Conversation (free at Beginner, Pro above)
 * and points to the next tense. The Final Level Exam gets one quiet line here;
 * the real invitation comes with the Level complete banner.
 */

const GREEN = "#5BD48F";

export default function TenseComplete() {
  const p = useLocalSearchParams<{ level: string; timeFrame: string }>();
  const level = String(p.level || "");
  const timeFrame = String(p.timeFrame || "");
  const tense = TENSES[timeFrame as keyof typeof TENSES]?.label ?? timeFrame;
  const units = COURSES[level]?.units ?? [];
  const conv = getTenseConversation(level, timeFrame);
  const exam = getExam(level, timeFrame);
  const { isPro } = usePro();
  const convoLocked = level !== "Beginner" && !isPro && purchasesAvailable();

  const [convoDone, setConvoDone] = useState(false);
  const [next, setNext] = useState<{ timeFrame: string; unitIndex: number } | null>(null);
  const [levelDone, setLevelDone] = useState(false);

  useFocusEffect(useCallback(() => {
    let on = true;
    Promise.all([getMilestones(), getCourseProgress()]).then(([m, prog]) => {
      if (!on) return;
      setConvoDone(!!m.tenseConvoDone[`${level}|${timeFrame}`]);
      // Next: the next unfinished tense of this level, in teaching order.
      const tfs = timeFramesFor(level);
      const order = [...tfs.slice(tfs.indexOf(timeFrame as any) + 1), ...tfs.slice(0, tfs.indexOf(timeFrame as any))];
      const tf = order.find((t) => !tenseStatus(prog, level, t).complete);
      if (tf) {
        const done = prog[`${level}|${tf}`]?.completedUnits ?? [];
        setNext({ timeFrame: tf, unitIndex: Math.max(0, units.findIndex((_, i) => !done.includes(i))) });
      } else { setNext(null); setLevelDone(true); }
    });
    return () => { on = false; };
  }, [level, timeFrame, units]));

  // A stamp that lands: scale in once, unless Reduce Motion is on.
  const stamp = useRef(new Animated.Value(0.6)).current;
  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    AccessibilityInfo.isReduceMotionEnabled().then((rm) => {
      if (rm) { stamp.setValue(1); return; }
      Animated.spring(stamp, { toValue: 1, friction: 4, tension: 120, useNativeDriver: true }).start();
    }).catch(() => stamp.setValue(1));
  }, [stamp]);

  const close = () => (router.canGoBack() ? router.back() : router.replace("/"));
  const openConversation = () => {
    if (convoLocked) { router.push("/paywall" as any); return; }
    router.push({ pathname: "/conversation" as any, params: { level, timeFrame, verb: "*", mode: "tense" } });
  };
  const goNext = () => {
    if (!next) { close(); return; }
    const u = units[next.unitIndex];
    router.replace({ pathname: "/resume" as any, params: {
      difficulty: level, verb: u.verb, timeFrame: next.timeFrame,
      courseKey: `${level}|${next.timeFrame}`, unitIndex: String(next.unitIndex),
    } });
  };
  const nextLabel = next ? TENSES[next.timeFrame as keyof typeof TENSES]?.label ?? next.timeFrame : "";

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Animated.View style={[styles.stamp, { transform: [{ scale: stamp }, { rotate: "-4deg" }] }]}
          accessibilityRole="header" accessibilityLabel={`${tense} complete, ${level}`}>
          <Ionicons name="checkmark-circle" size={40} color={GREEN} />
          <Text style={styles.stampTitle}>{tense.toUpperCase()}</Text>
          <Text style={styles.stampSub}>COMPLETE</Text>
        </Animated.View>
        <Text style={styles.level}>{LEVEL_EMOJI[level as Level] ?? ""} {level}</Text>

        <View style={styles.verbs}>
          {units.map((u) => (
            <View key={u.verb} style={styles.verb}>
              <Ionicons name="checkmark" size={13} color="#1B2145" />
              <Text style={styles.verbText}>{u.verb}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.body}>
          You've finished every unit of the {tense} at {level} level{levelDone ? " — and that completes the level." : "."}
        </Text>

        {conv && (
          <Pressable style={[styles.convo, convoDone && styles.convoDone]} onPress={openConversation} accessibilityRole="button"
            accessibilityLabel={`${tense} conversation, about ${tenseConversationMinutes(level, timeFrame)} minutes${convoLocked ? ", requires Pluri Pro" : ""}${convoDone ? ", done" : ""}`}>
            <View style={styles.convoIcon}><Ionicons name="chatbubbles" size={22} color="#FFFFFF" /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.convoTitle}>{convoDone ? "✓ " : ""}{tense} conversation</Text>
              <Text style={styles.convoSub}>
                {convoDone ? "Done — play it again any time" : `"${conv.title}" · all ${units.length} verbs · ~${tenseConversationMinutes(level, timeFrame)} min`}
              </Text>
            </View>
            {convoLocked ? <View style={styles.pro}><Text style={styles.proText}>PRO</Text></View>
              : <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />}
          </Pressable>
        )}

        {exam && (
          <Text style={styles.quiet}>🎓 The {tense} Final Level Exam is now available in Mini-Courses.</Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {next ? (
          <Pressable style={styles.primary} onPress={goNext} accessibilityRole="button">
            <Text style={styles.primaryText}>Next: {nextLabel} →</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.primary} onPress={close} accessibilityRole="button">
            <Text style={styles.primaryText}>Continue →</Text>
          </Pressable>
        )}
        {next && (
          <Pressable onPress={close} accessibilityRole="button" style={{ padding: 10 }}>
            <Text style={styles.later}>Later</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#1B2145" },
  scroll: { padding: 20, paddingTop: 80, alignItems: "center" },
  stamp: { alignItems: "center", borderWidth: 3, borderColor: GREEN, borderRadius: 20, paddingVertical: 14,
    paddingHorizontal: 28, backgroundColor: "rgba(91,212,143,0.10)" },
  stampTitle: { color: GREEN, fontSize: 26, fontWeight: "900", letterSpacing: 1, marginTop: 4 },
  stampSub: { color: GREEN, fontSize: 14, fontWeight: "800", letterSpacing: 4 },
  level: { color: "#B9CBFA", fontSize: 15, fontWeight: "700", marginTop: 16 },
  verbs: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 14 },
  verb: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: GREEN, borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 4 },
  verbText: { color: "#1B2145", fontSize: 13, fontWeight: "800" },
  body: { color: "#E2E8F0", fontSize: 15, lineHeight: 22, textAlign: "center", marginTop: 16, maxWidth: 420 },
  convo: { flexDirection: "row", alignItems: "center", gap: 12, alignSelf: "stretch", marginTop: 24, padding: 16,
    borderRadius: 16, backgroundColor: "#4A78F2" },
  convoDone: { backgroundColor: "rgba(74,120,242,0.35)" },
  convoIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center" },
  convoTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  convoSub: { color: "#DCE6FF", fontSize: 13, marginTop: 2 },
  pro: { backgroundColor: "#F5C518", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  proText: { color: "#1B2145", fontSize: 11, fontWeight: "800" },
  quiet: { color: "#A7B0BD", fontSize: 13, textAlign: "center", marginTop: 18 },
  footer: { padding: 20, paddingBottom: 36 },
  primary: { backgroundColor: "#22C55E", borderRadius: 14, paddingVertical: 15, alignItems: "center" },
  primaryText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  later: { color: "#B9CBFA", fontSize: 14, textAlign: "center" },
});
