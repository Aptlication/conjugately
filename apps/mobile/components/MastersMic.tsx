import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { useMastersMic, type MicOutcome } from "../lib/mastersMic";

/**
 * Masters Mic - the control.
 *
 * Deliberately says the mode in words as well as in motion. The equaliser is
 * driven by real input volume from the recogniser, not a decorative animation,
 * so when it is flat the learner is being told something true: nothing is
 * arriving. Reduce Motion replaces the bars with a static level read-out rather
 * than removing the feedback.
 *
 * The French prompts are the feature, not decoration. Asking « Pardon - vous
 * avez dit parlé, ou parler ? » is the teaching moment: the two forms offered
 * are usually the exact pair the learner is confusing.
 */

const BARS = 7;

export default function MastersMic(props: {
  expected: string | string[];
  onOutcome: (o: MicOutcome) => void;
  disabled?: boolean;
}) {
  const { phase, level, choices, start, cancel, confirmChoice } = useMastersMic({
    expected: props.expected,
    onOutcome: (o) => {
      Haptics.notificationAsync(
        o.correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning,
      ).catch(() => {});
      props.onOutcome(o);
    },
  });

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => {});
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    return () => { try { (sub as any)?.remove?.(); } catch {} };
  }, []);

  const listening = phase === "listening" || phase === "retrying";

  if (props.disabled) return null;

  if (phase === "denied") {
    return (
      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>Microphone access is off</Text>
        <Text style={styles.noticeBody}>
          Masters Mic needs the microphone and speech recognition. You can turn them on in
          Settings, and the quiz works perfectly well by tapping in the meantime.
        </Text>
      </View>
    );
  }

  if (phase === "unavailable") {
    return (
      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>Masters Mic is not available right now</Text>
        <Text style={styles.noticeBody}>Carry on by tapping an answer - nothing is lost.</Text>
      </View>
    );
  }

  if (phase === "disambiguating" && choices) {
    return (
      <View style={styles.card}>
        <Text style={styles.prompt}>Pardon — vous avez dit</Text>
        <View style={styles.choiceRow}>
          {choices.map((c, i) => (
            <Pressable
              key={`${c}-${i}`}
              style={styles.choice}
              accessibilityRole="button"
              accessibilityLabel={`Confirmer : ${c}`}
              onPress={() => confirmChoice(c)}
            >
              <Text style={styles.choiceText}>{c}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.promptSub}>…ou l'autre ? Choisissez ce que vous avez dit.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {listening ? (
        <>
          <Text style={styles.prompt}>
            {phase === "retrying" ? "Comment ?" : "Parlez maintenant"}
          </Text>
          {reduceMotion ? (
            <Text style={styles.levelText}>Niveau d’entrée : {Math.round(level * 100)}%</Text>
          ) : (
            <Equaliser level={level} />
          )}
          <Pressable
            onPress={cancel}
            accessibilityRole="button"
            accessibilityLabel="Arrêter d’écouter"
            style={styles.ghost}
          >
            <Text style={styles.ghostText}>Stop listening</Text>
          </Pressable>
        </>
      ) : (
        <Pressable
          onPress={start}
          accessibilityRole="button"
          accessibilityLabel="Masters Mic — answer out loud instead of tapping"
          accessibilityHint="Records your voice to check the French conjugation on this device"
          style={styles.micBtn}
        >
          <Text style={styles.micIcon}>🎙</Text>
          <View>
            <Text style={styles.micTitle}>Masters Mic</Text>
            <Text style={styles.micSub}>Answer out loud — hands-free</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

function Equaliser({ level }: { level: number }) {
  // One Animated.Value per bar, each with its own weighting, so the row reads
  // as a voice rather than as a single block rising and falling together.
  const vals = useRef([...Array(BARS)].map(() => new Animated.Value(0.12))).current;
  useEffect(() => {
    vals.forEach((v, i) => {
      const weight = 0.55 + 0.45 * Math.sin((i / (BARS - 1)) * Math.PI);
      Animated.timing(v, {
        toValue: Math.max(0.12, Math.min(1, level * weight * 1.25)),
        duration: 110,
        useNativeDriver: false,
      }).start();
    });
  }, [level, vals]);

  return (
    <View style={styles.eq} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {vals.map((v, i) => (
        <Animated.View
          key={i}
          style={[styles.bar, {
            height: v.interpolate({ inputRange: [0, 1], outputRange: [6, 48] }),
            opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] }),
          }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 14, alignItems: "center" },
  micBtn: {
    flexDirection: "row", alignItems: "center", gap: 12,
    borderWidth: 2, borderColor: "#2B5FD9", borderRadius: 16,
    paddingVertical: 12, paddingHorizontal: 18, backgroundColor: "#EAF1FD",
  },
  micIcon: { fontSize: 22 },
  micTitle: { fontWeight: "800", fontSize: 16, color: "#1B1F24" },
  micSub: { fontSize: 13, color: "#5A6472" },
  prompt: { fontSize: 20, fontWeight: "700", color: "#1B1F24", marginBottom: 10 },
  promptSub: { fontSize: 13, color: "#5A6472", marginTop: 10, textAlign: "center" },
  eq: { flexDirection: "row", alignItems: "flex-end", gap: 6, height: 52 },
  bar: { width: 8, borderRadius: 4, backgroundColor: "#2B5FD9" },
  levelText: { fontSize: 15, color: "#5A6472", paddingVertical: 14 },
  choiceRow: { flexDirection: "row", gap: 10, flexWrap: "wrap", justifyContent: "center" },
  choice: {
    borderWidth: 2, borderColor: "#2B5FD9", backgroundColor: "#FFFFFF",
    borderRadius: 14, paddingVertical: 12, paddingHorizontal: 18,
  },
  choiceText: { fontSize: 17, fontWeight: "600", color: "#1B1F24" },
  ghost: { marginTop: 12 },
  ghostText: { color: "#5A6472", fontSize: 14 },
  notice: {
    marginTop: 14, borderWidth: 1, borderColor: "#E3E6EA", borderRadius: 14,
    padding: 14, backgroundColor: "#F7F8FA",
  },
  noticeTitle: { fontWeight: "700", color: "#1B1F24", marginBottom: 4 },
  noticeBody: { color: "#5A6472", fontSize: 13, lineHeight: 19 },
});
