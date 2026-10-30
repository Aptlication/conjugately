import React, { useCallback, useState } from "react";
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../components/NavBar";
import { getCourseProgress, getJourneySummary, JourneySummary } from "../lib/progress";
import { buildRoute, getMilestones, type RouteLevel } from "../lib/milestones";
import { readExamResults } from "../lib/exams";
import { Ionicons } from "@expo/vector-icons";
import { LEVEL_EMOJI, TENSES, type Level } from "@shared/levels";
import { CEFR_IDS } from "@shared/cefrTests";
import { hasCefrBadge, type CefrResult } from "@shared/cefrScoring";
import { readCefrResults } from "../lib/cefr";
import CefrBadge from "../components/CefrBadge";
import { switchedOffReminders, turnReminderBackOn } from "../lib/reminders";
import { openManageSubscriptions, purchasesAvailable, readActiveSubscription, usePro } from "../lib/pro";
import { useCelebrations } from "../lib/useCelebrations";

/** 1.3: the "Rate Pluri French" button opens the App Store's write-a-review page. */
const APP_STORE_ID = "6799402337";
const openReviewPage = () => {
  Linking.openURL(`itms-apps://apps.apple.com/app/id${APP_STORE_ID}?action=write-review`)
    .catch(() => Linking.openURL(`https://apps.apple.com/app/id${APP_STORE_ID}?action=write-review`).catch(() => {}));
};

const TEMP = ["#4A78F2", "#8B7CE8", "#C77BD9", "#F0A05A", "#F0564A"];
function tempColors(pct: number): string[] {
  if (pct >= 100) return ["#5BD48F", "#5BD48F"];
  const n = Math.max(2, Math.min(TEMP.length, Math.ceil(pct / 25) + 1));
  return TEMP.slice(0, n);
}

export default function Journey() {
  // 31 Oct 2026: Tense complete / Level complete, once each, when the learner returns here.
  useCelebrations();
  const [s, setS] = useState<JourneySummary | null>(null);
  const [cefr, setCefr] = useState<CefrResult[]>([]);
  const [hidden, setHidden] = useState<{ key: string; label: string }[]>([]);
  const [subscribed, setSubscribed] = useState(false);
  const [route, setRoute] = useState<RouteLevel[]>([]);
  // null = the current level is open; "" = all closed; otherwise that level.
  const [openLevel, setOpenLevel] = useState<string | null>(null);
  const { isPro } = usePro();

  useFocusEffect(useCallback(() => {
    let on = true;
    getJourneySummary().then((x) => { if (on) setS(x); });
    readCefrResults().then((r) => { if (on) setCefr(r); });
    switchedOffReminders().then((r) => { if (on) setHidden(r); });
    readActiveSubscription().then((v) => { if (on) setSubscribed(v); });
    Promise.all([getCourseProgress(), getMilestones(), readExamResults(), readCefrResults()])
      .then(([prog, m, ex, cr]) => { if (on) setRoute(buildRoute(prog, m, ex, cr)); }).catch(() => {});
    return () => { on = false; };
  }, []));


  return (
    <View style={{ flex: 1, backgroundColor: "#1B2145" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.h1}>🧭 My Journey</Text>
        <Text style={styles.sub}>Votre route vers la fluidité</Text>

        {/* 31 Oct 2026: a complete level whose exams are still waiting. */}
        {route.filter((r) => r.state === "complete" && r.examsTotal > 0 && r.examsPassed < r.examsTotal).slice(0, 1).map((r) => (
          <Pressable key={r.level} style={styles.waiting} accessibilityRole="button"
            onPress={() => router.push({ pathname: "/level-complete" as any, params: { level: r.level } })}>
            <Text style={styles.waitingText}>🎓 {r.level} complete · {r.examsTotal - r.examsPassed} Final Level Exam{r.examsTotal - r.examsPassed === 1 ? "" : "s"} waiting</Text>
            <Text style={styles.waitingGo}>Go ›</Text>
          </Pressable>
        ))}

        {s?.nextStep && (
          <View style={styles.nextCard}>
            <Text style={styles.nextLabel}>NEXT STEP</Text>
            <Text style={styles.cardText}>Up next: {s.nextStep.level} · {TENSES[s.nextStep.timeFrame as keyof typeof TENSES]?.label ?? s.nextStep.timeFrame} — {s.nextStep.unitName}</Text>
            <Pressable style={styles.nextBtn}
              onPress={() => router.push({ pathname: "/resume" as any, params: {
                difficulty: s.nextStep!.level, verb: s.nextStep!.verb, timeFrame: s.nextStep!.timeFrame,
                courseKey: s.nextStep!.courseKey, unitIndex: String(s.nextStep!.unitIndex),
              } })}>
              <Text style={styles.nextBtnText}>Continue ▸</Text>
            </Pressable>
          </View>
        )}

        {/* 31 Oct 2026: the route. Where you've been (ticks), where you are
            (the pin, open), where you're going (greyed, with what each level
            leads to). Tap a level to open or close it. */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>YOUR ROUTE</Text>
          {route.map((r, i) => {
            const open = openLevel === r.level || (openLevel === null && r.state === "current");
            const doneTenses = r.tenses.filter((t) => t.complete).length;
            return (
              <View key={r.level} style={styles.stop}>
                <View style={styles.rail}>
                  <View style={[styles.node, r.state === "complete" ? styles.nodeDone : r.state === "current" ? styles.nodeHere : styles.nodeTodo]}>
                    {r.state === "complete" && <Ionicons name="checkmark" size={14} color="#1B2145" />}
                  </View>
                  {i < route.length - 1 && <View style={[styles.railLine, r.state === "complete" && styles.railDone]} />}
                </View>
                <View style={{ flex: 1, paddingBottom: 14 }}>
                  <Pressable onPress={() => setOpenLevel(open ? "" : r.level)} accessibilityRole="button"
                    accessibilityState={{ expanded: open }}
                    accessibilityLabel={`${r.level}, ${r.state === "complete" ? "complete" : r.state === "current" ? "you are here" : "not started"}`}>
                    <View style={styles.stopHead}>
                      <Text style={[styles.stopTitle, r.state === "todo" && { color: "#8A93A0" }, r.state === "complete" && { color: "#5BD48F" }]}>
                        {LEVEL_EMOJI[r.level as Level]} {r.level}
                      </Text>
                      {r.state === "current" && <View style={styles.here}><Text style={styles.hereText}>YOU ARE HERE</Text></View>}
                      <Ionicons name={open ? "chevron-up" : "chevron-down"} size={16} color="#8A93A0" style={{ marginLeft: "auto" }} />
                    </View>
                    <Text style={styles.stopSub}>
                      {r.state === "complete"
                        ? `Complete · exams ${r.examsPassed}/${r.examsTotal}${r.cefr ? ` · ${r.cefr} ${r.cefrEarned ? "badge ✓" : "test next"}` : ""}`
                        : r.state === "current"
                          ? `${doneTenses} of ${r.tenses.length} tenses done · then ${r.leadsTo}`
                          : `${r.verbs} verbs · ${r.tenses.length} tenses${r.leadsTo ? ` · → ${r.leadsTo}` : ""}`}
                    </Text>
                  </Pressable>
                  {open && (
                    <View style={{ marginTop: 8, gap: 6 }}>
                      {r.tenses.map((t) => {
                        const convoLocked = r.level !== "Beginner" && !isPro && purchasesAvailable();
                        return (
                          <View key={t.timeFrame} style={styles.tenseRow}>
                            <Text style={[styles.tenseIcon, t.complete ? { color: "#5BD48F" } : t.done > 0 ? { color: "#9DB4F5" } : { color: "#5A6390" }]}>
                              {t.complete ? "✓" : t.done > 0 ? "●" : "○"}
                            </Text>
                            <Text style={[styles.tenseName, !t.complete && t.done === 0 && { color: "#8A93A0" }]}>{t.label}</Text>
                            <Text style={styles.tenseUnits}>{t.done}/{t.total}</Text>
                            {t.complete && t.hasConversation && (
                              <Pressable hitSlop={8} accessibilityRole="button"
                                accessibilityLabel={`${t.label} conversation${t.conversationDone ? ", done" : ""}${convoLocked ? ", requires Pluri Pro" : ""}`}
                                onPress={() => router.push(convoLocked ? "/paywall" as any : { pathname: "/conversation" as any,
                                  params: { level: r.level, timeFrame: t.timeFrame, verb: "*", mode: "tense" } })}
                                style={[styles.convoPill, t.conversationDone && styles.convoPillDone]}>
                                <Text style={styles.convoPillText}>💬 {t.conversationDone ? "✓" : "Talk"}</Text>
                              </Pressable>
                            )}
                            {t.examPassed && <Text style={styles.examTick}>🎓✓</Text>}
                          </View>
                        );
                      })}
                      <Text style={styles.examLine}>
                        🎓 Final Level Exams {r.examsPassed}/{r.examsTotal}
                        {r.cefr ? `  ·  🏅 CEFR-style ${r.cefr} ${r.cefrEarned ? "earned" : r.examsTotal > 0 && r.examsPassed === r.examsTotal ? "unlocked" : "locked"}` : ""}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statNum}>{s?.quizzes ?? 0}</Text><Text style={styles.statSub}>quizzes taken</Text></View>
          <View style={styles.stat}><Text style={[styles.statNum, { color: "#5BD48F" }]}>{s?.avgPct ?? 0}%</Text><Text style={styles.statSub}>avg score</Text></View>
          <View style={styles.stat}><Text style={[styles.statNum, { color: "#EC9A9A" }]}>🔥 {s?.streakDays ?? 0}</Text><Text style={styles.statSub}>day streak</Text></View>
        </View>

        {/* 1.3: CEFR-style badges */}
        <View style={[styles.card, { marginTop: 12 }]}>
          <Text style={styles.cardLabel}>CEFR-STYLE BADGES</Text>
          <View style={styles.badges}>
            {CEFR_IDS.map((id) => {
              const earned = hasCefrBadge(cefr, id);
              return (
                <Pressable key={id} style={styles.badgeCol} onPress={() => router.push("/cefr-exams" as any)}
                  accessibilityRole="button" accessibilityLabel={`${id} badge, ${earned ? "earned" : "not earned yet"}. Opens CEFR Exams.`}>
                  <CefrBadge id={id} earned={earned} size={52} label="" />
                  <Text style={styles.statSub}>{earned ? "Earned" : "Not yet"}</Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={[styles.cardText, { marginTop: 8, color: "#A7B0BD" }]}>Practice tests in the format of official A1, A2 and B1 French exams. Not official certificates.</Text>
        </View>

        {/* 1.3: permanent Rate Pluri French button (Apple's own prompt is rationed) */}
        <Pressable style={styles.rate} onPress={openReviewPage} accessibilityRole="link" accessibilityHint="Opens the App Store">
          <Text style={styles.rateText}>⭐ Enjoying Pluri French? Rate it on the App Store</Text>
        </Pressable>

        {/* 30 Oct 2026: Cancel Pro, easy to find. Only for a running Monthly or
            Annual subscription (Lifetime has nothing to cancel). Asks first,
            then opens Apple's subscription screen: Apple does not let an app
            cancel a subscription itself. */}
        {subscribed && (
          <Pressable style={styles.cancel} accessibilityRole="button"
            accessibilityHint="Asks you to confirm, then opens Apple's subscription settings"
            onPress={() => Alert.alert(
              "Cancel your Pro subscription?",
              "You won't be charged again. Pro stays on until the end of your current billing period or free trial.\n\nApple's subscription screen opens next: tap Cancel Subscription there to finish.",
              [
                { text: "Keep Pro", style: "cancel" },
                { text: "Yes, cancel", style: "destructive", onPress: () => { openManageSubscriptions(); } },
              ],
            )}>
            <Text style={styles.cancelText}>Cancel Pro subscription</Text>
          </Pressable>
        )}

        {/* 30 Oct 2026: pop-ups switched off with "Don't remind me again",
            one quiet line each, so they can be turned back on. */}
        {hidden.length > 0 && (
          <View style={styles.hidden}>
            <Text style={styles.hiddenLabel}>Hidden pop-ups</Text>
            {hidden.map((r) => (
              <View key={r.key} style={styles.hiddenRow}>
                <Text style={styles.hiddenText} numberOfLines={1}>{r.label}</Text>
                <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel={`Show ${r.label} again`}
                  onPress={async () => { await turnReminderBackOn(r.key); setHidden((h) => h.filter((x) => x.key !== r.key)); }}>
                  <Text style={styles.hiddenBtn}>↺ Show again</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <NavBar variant="dark" active="journey" />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingTop: 60, paddingBottom: 110 },
  h1: { color: "#F5F6F8", fontSize: 28, fontWeight: "800" },
  sub: { color: "#B9CBFA", fontSize: 13, marginBottom: 16 },
  card: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 14, marginBottom: 12 },
  cardLabel: { fontSize: 11, fontWeight: "700", color: "#B9CBFA", letterSpacing: 0.5, marginBottom: 8 },
  cardText: { fontSize: 13, color: "#E2E8F0" },
  pathRow: { flexDirection: "row", alignItems: "center", marginBottom: 8, flexWrap: "wrap" },
  pathLabel: { fontSize: 11, fontWeight: "700" },
  pathDone: { color: "#5BD48F" },
  pathHere: { color: "#9DB4F5" },
  pathTodo: { color: "#8A93A0", fontWeight: "500" },
  pathBar: { flex: 1, height: 4, borderRadius: 2, marginHorizontal: 4, minWidth: 10 },
  barDone: { backgroundColor: "#5BD48F" },
  barTodo: { backgroundColor: "rgba(255,255,255,0.2)" },
  progRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 },
  progLabel: { flex: 1, marginRight: 8, fontSize: 12, color: "#E2E8F0" },
  progPct: { minWidth: 40, textAlign: "right", fontSize: 12, fontWeight: "700", fontVariant: ["tabular-nums"] },
  track: { height: 6, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" },
  fill: { height: 6, backgroundColor: "#4A78F2", borderRadius: 3 },
  nextCard: { backgroundColor: "rgba(34,197,94,0.16)", borderWidth: 1, borderColor: "#22C55E",
    borderRadius: 14, padding: 14, marginBottom: 12 },
  nextLabel: { fontSize: 11, fontWeight: "700", color: "#5BD48F", letterSpacing: 0.5, marginBottom: 4 },
  nextBtn: { backgroundColor: "#22C55E", borderRadius: 10, paddingVertical: 9,
    alignItems: "center", marginTop: 8 },
  nextBtnText: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  statsRow: { flexDirection: "row", gap: 8 },
  badges: { flexDirection: "row", justifyContent: "space-around" },
  badgeCol: { alignItems: "center", gap: 4 },
  rate: { marginTop: 4, marginBottom: 12, borderRadius: 14, borderWidth: 1, borderColor: "rgba(245,197,24,0.5)", paddingVertical: 14, alignItems: "center" },
  rateText: { color: "#F5C518", fontSize: 15, fontWeight: "700", textAlign: "center", paddingHorizontal: 12 },
  cancel: { marginBottom: 12, borderRadius: 14, borderWidth: 1, borderColor: "rgba(236,154,154,0.45)", paddingVertical: 12, alignItems: "center" },
  cancelText: { color: "#EC9A9A", fontSize: 14, fontWeight: "700" },
  hidden: { marginTop: 4, marginBottom: 12, paddingHorizontal: 4, gap: 6 },
  hiddenLabel: { fontSize: 11, fontWeight: "700", color: "#8A93A0", letterSpacing: 0.5 },
  hiddenRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, minHeight: 28 },
  hiddenText: { flex: 1, fontSize: 12, color: "#A7B0BD" },
  hiddenBtn: { fontSize: 12, fontWeight: "700", color: "#9DB4F5" },
  stat: { flex: 1, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 10, alignItems: "center" },
  statNum: { fontSize: 18, fontWeight: "800", color: "#FFFFFF" },
  statSub: { fontSize: 10, color: "#B9CBFA" },
  levelSub: { fontSize: 11, color: "#8A93A0", marginTop: 6 },
  waiting: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(245,197,24,0.14)", borderWidth: 1,
    borderColor: "#F5C518", borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 12 },
  waitingText: { flex: 1, color: "#F5C518", fontSize: 13, fontWeight: "700" },
  waitingGo: { color: "#F5C518", fontSize: 13, fontWeight: "800" },
  stop: { flexDirection: "row", gap: 10 },
  rail: { width: 22, alignItems: "center" },
  node: { width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center", borderWidth: 2 },
  nodeDone: { backgroundColor: "#5BD48F", borderColor: "#5BD48F" },
  nodeHere: { backgroundColor: "#4A78F2", borderColor: "#B9CBFA" },
  nodeTodo: { backgroundColor: "transparent", borderColor: "#5A6390" },
  railLine: { flex: 1, width: 2, backgroundColor: "rgba(255,255,255,0.15)", marginVertical: 2 },
  railDone: { backgroundColor: "#5BD48F" },
  stopHead: { flexDirection: "row", alignItems: "center", gap: 8, minHeight: 22 },
  stopTitle: { color: "#F5F6F8", fontSize: 15, fontWeight: "800" },
  stopSub: { color: "#A7B0BD", fontSize: 12, marginTop: 2 },
  here: { backgroundColor: "#4A78F2", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  hereText: { color: "#FFFFFF", fontSize: 9, fontWeight: "900", letterSpacing: 0.5 },
  tenseRow: { flexDirection: "row", alignItems: "center", gap: 8, minHeight: 26 },
  tenseIcon: { width: 14, fontSize: 13, fontWeight: "900", textAlign: "center" },
  tenseName: { flex: 1, color: "#E2E8F0", fontSize: 13, fontWeight: "600" },
  tenseUnits: { color: "#A7B0BD", fontSize: 12, fontVariant: ["tabular-nums"] },
  convoPill: { backgroundColor: "#4A78F2", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  convoPillDone: { backgroundColor: "rgba(91,212,143,0.25)" },
  convoPillText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  examTick: { fontSize: 11 },
  examLine: { color: "#B9CBFA", fontSize: 12, marginTop: 4 },
});
