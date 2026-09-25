import React, { useState } from "react";
import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { usePro, type ProPackage } from "../lib/pro";

/**
 * The paywall.
 *
 * Every price shown comes from the store, never from a constant: a paywall
 * whose price does not match the product is a guideline 3.1.2 rejection. The
 * terms, the trial length and the renewal wording are on the screen itself for
 * the same reason, and Restore Purchases is mandatory.
 */

const TERMS_URL = "https://conjugately.com/terms";
const PRIVACY_URL = "https://conjugately.com/privacy";

export default function Paywall() {
  const router = useRouter();
  const { isPro, loading, packages, purchase, restore } = usePro();
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const annual = packages.find((p) => p.period === "annual");
  const monthly = packages.find((p) => p.period === "monthly");
  const [chosen, setChosen] = useState<"annual" | "monthly">("annual");
  const selected: ProPackage | undefined = chosen === "annual" ? annual : monthly;

  const buy = async () => {
    if (!selected || busy) return;
    setBusy(true);
    setNote(null);
    const res = await purchase(selected);
    setBusy(false);
    if (res.ok) { router.back(); return; }
    if (res.cancelled) return;
    setNote("That didn't go through. Nothing has been charged.");
  };

  const doRestore = async () => {
    if (busy) return;
    setBusy(true);
    setNote(null);
    const res = await restore();
    setBusy(false);
    setNote(res.ok ? "Your subscription is back." : "No previous purchase found on this Apple ID.");
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.body}>
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Close" style={styles.close}>
          <Ionicons name="close" size={22} color="#5A6472" />
        </Pressable>

        <Text style={styles.title}>Conjugately Pro</Text>
        <Text style={styles.sub}>Every course, every exam, and Masters Mic.</Text>

        <View style={styles.points}>
          {[
            "All courses and final exams, Beginner through Advanced",
            "Masters Mic - answer out loud, checked on your device",
            "Your progress kept across every course",
          ].map((t) => (
            <View key={t} style={styles.point}>
              <Ionicons name="checkmark-circle" size={20} color="#17734A" />
              <Text style={styles.pointText}>{t}</Text>
            </View>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 28 }} color="#2B5FD9" />
        ) : packages.length === 0 ? (
          <View style={styles.unavailable}>
            <Text style={styles.unavailableTitle}>Subscriptions aren't available here</Text>
            <Text style={styles.unavailableBody}>
              This build can't reach the App Store. Everything already unlocked stays available.
            </Text>
          </View>
        ) : (
          <>
            {annual && (
              <PlanRow
                label="Annual"
                price={annual.priceString}
                caption="Best value"
                selected={chosen === "annual"}
                onPress={() => setChosen("annual")}
              />
            )}
            {monthly && (
              <PlanRow
                label="Monthly"
                price={monthly.priceString}
                selected={chosen === "monthly"}
                onPress={() => setChosen("monthly")}
              />
            )}

            <Pressable
              onPress={buy}
              disabled={!selected || busy}
              accessibilityRole="button"
              style={[styles.cta, (!selected || busy) && { opacity: 0.5 }]}
            >
              {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.ctaText}>Start 14-day free trial</Text>}
            </Pressable>

            <Text style={styles.legal}>
              Free for 14 days, then {selected?.priceString ?? ""}
              {chosen === "annual" ? " a year" : " a month"}. It renews automatically unless
              cancelled at least 24 hours before the period ends. Manage or cancel in your
              Apple ID settings. Payment is charged to your Apple ID on confirmation.
            </Text>
          </>
        )}

        {note && <Text style={styles.note}>{note}</Text>}

        <Pressable onPress={doRestore} accessibilityRole="button" style={styles.restore}>
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </Pressable>

        <View style={styles.links}>
          <Pressable onPress={() => Linking.openURL(TERMS_URL)} accessibilityRole="link">
            <Text style={styles.link}>Terms of Use</Text>
          </Pressable>
          <Text style={styles.linkDot}>·</Text>
          <Pressable onPress={() => Linking.openURL(PRIVACY_URL)} accessibilityRole="link">
            <Text style={styles.link}>Privacy Policy</Text>
          </Pressable>
        </View>

        {isPro && <Text style={styles.already}>You're already subscribed. Thank you.</Text>}
      </ScrollView>
    </View>
  );
}

function PlanRow(props: {
  label: string; price: string; caption?: string; selected: boolean; onPress: () => void;
}) {
  return (
    <Pressable
      onPress={props.onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: props.selected }}
      style={[styles.plan, props.selected && styles.planOn]}
    >
      <View style={[styles.radio, props.selected && styles.radioOn]}>
        {props.selected && <View style={styles.radioDot} />}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.planLabel}>{props.label}</Text>
        {!!props.caption && <Text style={styles.planCaption}>{props.caption}</Text>}
      </View>
      <Text style={styles.planPrice}>{props.price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F8FA" },
  body: { padding: 24, paddingTop: 64, paddingBottom: 48 },
  close: { position: "absolute", top: 20, right: 20, padding: 8 },
  title: { fontSize: 30, fontWeight: "800", color: "#1B1F24" },
  sub: { marginTop: 8, fontSize: 16, color: "#5A6472", lineHeight: 22 },
  points: { marginTop: 24, gap: 12 },
  point: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  pointText: { flex: 1, fontSize: 15, lineHeight: 21, color: "#1B1F24" },
  plan: {
    marginTop: 12, flexDirection: "row", alignItems: "center", gap: 14,
    borderWidth: 2, borderColor: "#E3E6EA", borderRadius: 16, padding: 16, backgroundColor: "#FFFFFF",
  },
  planOn: { borderColor: "#2B5FD9", backgroundColor: "#EAF1FD" },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: "#B8BFC9", alignItems: "center", justifyContent: "center" },
  radioOn: { borderColor: "#2B5FD9" },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#2B5FD9" },
  planLabel: { fontSize: 17, fontWeight: "700", color: "#1B1F24" },
  planCaption: { fontSize: 13, color: "#17734A", fontWeight: "600", marginTop: 2 },
  planPrice: { fontSize: 17, fontWeight: "700", color: "#1B1F24" },
  cta: {
    marginTop: 20, height: 54, borderRadius: 16, backgroundColor: "#2B5FD9",
    alignItems: "center", justifyContent: "center",
  },
  ctaText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  legal: { marginTop: 14, fontSize: 12, lineHeight: 18, color: "#5A6472" },
  note: { marginTop: 14, fontSize: 14, color: "#1B1F24" },
  restore: { marginTop: 18, alignSelf: "center", padding: 8 },
  restoreText: { fontSize: 15, fontWeight: "600", color: "#2B5FD9" },
  links: { marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 },
  link: { fontSize: 13, color: "#5A6472", textDecorationLine: "underline" },
  linkDot: { color: "#5A6472" },
  already: { marginTop: 18, textAlign: "center", fontSize: 14, fontWeight: "600", color: "#17734A" },
  unavailable: { marginTop: 24, borderRadius: 14, borderWidth: 1, borderColor: "#E3E6EA", backgroundColor: "#FFFFFF", padding: 16 },
  unavailableTitle: { fontWeight: "700", color: "#1B1F24", marginBottom: 4 },
  unavailableBody: { color: "#5A6472", fontSize: 13, lineHeight: 19 },
});
