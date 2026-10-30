import React, { useCallback, useState } from "react";
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../components/NavBar";
import { getJourneySummary, JourneySummary } from "../lib/progress";
import { LEVELS, timeFrameListLabel } from "@shared/levels";
import { CEFR_IDS } from "@shared/cefrTests";
import { hasCefrBadge, type CefrResult } from "@shared/cefrScoring";
import { readCefrResults } from "../lib/cefr";
import CefrBadge from "../components/CefrBadge";
import { switchedOffReminders, turnReminderBackOn } from "../lib/reminders";
import { openManageSubscriptions, readActiveSubscription } from "../lib/pro";

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
  const [s, setS] = useState<JourneySummary | null>(null);
  const [cefr, setCefr] = useState<CefrResult[]>([]);
  const [hidden, setHidden] = useState<{ key: string; label: string }[]>([]);
  const [subscribed, setSubscribed] = useState(false);

  useFocusEffect(useCallback(() => {
    let on = true;
    getJourneySummary().then((x) => { if (on) setS(x); });
    readCefrResults().then((r) => { if (on) setCefr(r); });
    switchedOffReminders().then((r) => { if (on) setHidden(r); });
    readActiveSubscription().then((v) => { if (on) setSubscribed(v); });
    return () => { on = false; };
  }, []));

  const levelIdx = s?.highestLevelTouched ? (LEVELS as string[]).indexOf(s.highestLevelTouched) : -1;

  return (
    <View style={{ flex: 1, backgroundColor: "#1B2145" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.h1}>🧭 My Journey</Text>
        <Text style={styles.sub}>Votre route vers la fluidité</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>WHERE YOU ARE (MINI-COURSES)</Text>
          <View style={styles.pathRow}>
            {LEVELS.map((l, i) => (
              <React.Fragment key={l}>
                <Text style={[styles.pathLabel,
                  i < levelIdx ? styles.pathDone : i === levelIdx ? styles.pathHere : styles.pathTodo]}>
                  {i < levelIdx ? `${l} ✓` : l}
                </Text>
                {i < LEVELS.length - 1 && (
                  <View style={[styles.pathBar, i < levelIdx ? styles.barDone : styles.barTodo]} />
                )}
              </React.Fragment>
            ))}
          </View>
          <Text style={styles.cardText}>
            {levelIdx >= 0
              ? `You're working at ${s!.highestLevelTouched} level. Keep going!`
              : "Take your first Mini-Course Quiz and your journey begins here."}
          </Text>
        </View>

        {s && s.levels && s.levels.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>LEVEL COMPLETION</Text>
            {s.levels.map((lv) => (
              <View key={lv.level} style={{ marginBottom: 4 }}>
                <View style={styles.progRow}>
                  <Text style={styles.progLabel} numberOfLines={1}>{lv.level}</Text>
                  <Text style={[styles.progPct, lv.pct > 0 ? { color: tempColors(lv.pct)[tempColors(lv.pct).length - 1] } : { color: "#8A93A0" }]}>{lv.pct}%</Text>
                </View>
                <View style={styles.track}>
                  {lv.pct > 0 && (
                    <LinearGradient colors={tempColors(lv.pct) as any}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      style={[styles.fill, { width: `${Math.min(100, lv.pct)}%` }]} />
                  )}
                </View>
                <Text style={styles.levelSub}>{lv.done} of {lv.total} units · {timeFrameListLabel(lv.level)}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardLabel}>PROGRESS{s && s.courses.length ? ` · ${s.overallCoursePct}% OVERALL` : ""}</Text>
          {s && s.courses.length > 0 ? s.courses.map((c) => (
            <View key={c.key} style={{ marginBottom: 8 }}>
              <View style={styles.progRow}>
                <Text style={styles.progLabel}>{c.label}</Text>
                <Text style={[styles.progPct, c.pct > 0 ? { color: tempColors(c.pct)[tempColors(c.pct).length - 1] } : { color: "#8A93A0" }]}>{c.pct}%</Text>
              </View>
              <View style={styles.track}>
                {c.pct > 0 && (
                  <LinearGradient colors={tempColors(c.pct) as any}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={[styles.fill, { width: `${Math.min(100, c.pct)}%` }]} />
                )}
              </View>
            </View>
          )) : (
            <Text style={styles.cardText}>No course units completed yet — start one from the Courses tab.</Text>
          )}
        </View>

        {s?.nextStep && (
          <View style={styles.nextCard}>
            <Text style={styles.nextLabel}>NEXT STEP</Text>
            <Text style={styles.cardText}>Up next: {s.nextStep.label} — {s.nextStep.unitName}</Text>
            <Pressable style={styles.nextBtn}
              onPress={() => router.push({ pathname: "/resume" as any, params: {
                difficulty: s.nextStep!.level, verb: s.nextStep!.verb, timeFrame: s.nextStep!.timeFrame,
                courseKey: s.nextStep!.courseKey, unitIndex: String(s.nextStep!.unitIndex),
              } })}>
              <Text style={styles.nextBtnText}>Continue ▸</Text>
            </Pressable>
          </View>
        )}

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
});
