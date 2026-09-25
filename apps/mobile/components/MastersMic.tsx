import React, { useEffect, useMemo, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useMastersMic, type MicOutcome } from "../lib/mastersMic";

/**
 * Masters Mic - the control.
 *
 * Mount one per question (quiz.tsx gives it a key of the question index) so it
 * starts listening on its own when the learner moves on. The mic itself is a
 * MODE held by quiz.tsx, not a per-question button: it stays on until switched
 * off.
 *
 * Nothing here scores anything. The learner speaks, sees what was heard, and
 * presses Enter; only then does onOutcome fire. See lib/mastersMic.ts for why.
 */

const BARS = 16;
const SEGMENTS = 16;
const SEG_H = 8;
const SEG_GAP = 3;
const EQ_HEIGHT = SEGMENTS * SEG_H + (SEGMENTS - 1) * SEG_GAP;

const NAVY_CARD = "#10203F";
const TRACK = "#1B2C4E";
const EDGE = "#2E4270";
const LIT = "#22D3EE";
const CAP = "#E6FBFF";
const MUTED = "#8FA3C8";
const SOFT = "#C3D0E8";

export default function MastersMic(props: {
  expected: string | string[];
  /** Every option on screen, in order. */
  options: string[];
  /** Index of the correct option. */
  correctIndex: number;
  onOutcome: (o: MicOutcome) => void;
  /** Bring options A-D back for this question without leaving mic mode. */
  onShowOptions: () => void;
  disabled?: boolean;
}) {
  const { phase, level, transcript, reading, start, stop, retry, submit } = useMastersMic({
    expected: props.expected,
    options: props.options,
    correctIndex: props.correctIndex,
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

  // Start listening as soon as this question's control appears.
  const startedRef = useRef(false);
  useEffect(() => {
    if (props.disabled || startedRef.current) return;
    startedRef.current = true;
    start();
  }, [props.disabled, start]);

  const listening = phase === "listening";
  const ready = phase === "ready";

  if (props.disabled) return null;

  if (phase === "denied") {
    return (
      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>Microphone access is off</Text>
        <Text style={styles.noticeBody}>
          Masters Mic needs the microphone and speech recognition. You can turn them on in
          Settings, and the quiz works perfectly well by tapping in the meantime.
        </Text>
        <Pressable onPress={props.onShowOptions} accessibilityRole="button" style={styles.noticeBtn}>
          <Text style={styles.noticeBtnText}>Show the options</Text>
        </Pressable>
      </View>
    );
  }

  if (phase === "unavailable") {
    return (
      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>Masters Mic is not available right now</Text>
        <Text style={styles.noticeBody}>Carry on by tapping an answer - nothing is lost.</Text>
        <Pressable onPress={props.onShowOptions} accessibilityRole="button" style={styles.noticeBtn}>
          <Text style={styles.noticeBtnText}>Show the options</Text>
        </Pressable>
      </View>
    );
  }

  const shownText = ready ? (reading?.heard ?? "") : transcript;

  return (
    <View style={styles.wrap}>
      <StatusLine listening={listening} reduceMotion={reduceMotion} />

      <Equaliser level={listening ? level : 0} reduceMotion={reduceMotion} />

      <View style={styles.heardBlock}>
        <Text style={styles.heardLabel}>Heard</Text>
        <Text
          style={[styles.heardText, !ready && styles.heardProvisional]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.45}
          accessibilityLiveRegion="polite"
        >
          {shownText || (listening ? "…" : "nothing caught")}
        </Text>
      </View>

      <View style={styles.row}>
        <SquareButton
          icon="refresh"
          label="Retry"
          onPress={retry}
          hint="Throw this attempt away and listen again"
        />
        <SquareButton
          icon={listening ? "stop" : "mic"}
          label={listening ? "Stop" : "Speak"}
          active={listening}
          onPress={listening ? stop : retry}
          hint={listening ? "Stop listening and keep what was heard" : "Listen again"}
        />
        <SquareButton
          icon="return-down-back"
          label="Enter"
          submitState={ready ? (reduceMotion ? "on" : "flashing") : "off"}
          onPress={submit}
          disabled={!ready}
          hint="Submit this answer for marking"
        />
        <SquareButton
          icon="list"
          label="Show A-D"
          onPress={props.onShowOptions}
          hint="Bring the four options back for this question"
        />
      </View>
    </View>
  );
}

function StatusLine({ listening, reduceMotion }: { listening: boolean; reduceMotion: boolean }) {
  const blink = useRef(new Animated.Value(1)).current;
  const ring = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!listening || reduceMotion) { blink.setValue(1); ring.setValue(0); return; }
    const a = Animated.loop(Animated.sequence([
      Animated.timing(blink, { toValue: 0.15, duration: 550, useNativeDriver: true }),
      Animated.timing(blink, { toValue: 1, duration: 550, useNativeDriver: true }),
    ]));
    const b = Animated.loop(Animated.timing(ring, {
      toValue: 1, duration: 1100, easing: Easing.out(Easing.ease), useNativeDriver: true,
    }));
    a.start(); b.start();
    return () => { a.stop(); b.stop(); };
  }, [listening, reduceMotion, blink, ring]);

  if (!listening) {
    return (
      <View style={styles.statusLine}>
        <View style={styles.stoppedBadge}>
          <Ionicons name="stop" size={13} color={MUTED} />
        </View>
        <Text style={styles.statusText}>Press Enter to submit</Text>
      </View>
    );
  }

  return (
    <View style={styles.statusLine}>
      <View style={styles.recWrap}>
        <Animated.View
          style={[styles.recRing, {
            opacity: ring.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.95, 0.1, 0.95] }),
            transform: [{ scale: ring.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.82, 1.18, 0.82] }) }],
          }]}
        />
        <Animated.View style={[styles.recDot, { opacity: blink }]} />
      </View>
      <Text style={styles.statusText}>Speak now</Text>
    </View>
  );
}

/**
 * The bars are drawn as solid animated columns with the segment gaps painted
 * across the top as stripes in the card colour. Drawing 256 individual
 * segment views and recolouring them twenty times a second is what it looks
 * like it should be, and it drops frames on an older phone.
 */
function Equaliser({ level, reduceMotion }: { level: number; reduceMotion: boolean }) {
  const vals = useRef([...Array(BARS)].map(() => new Animated.Value(0.06))).current;
  const weights = useMemo(
    () => [...Array(BARS)].map((_, i) => 0.55 + 0.45 * Math.sin((i / (BARS - 1)) * Math.PI)),
    [],
  );

  useEffect(() => {
    if (reduceMotion) { vals.forEach((v) => v.setValue(0.4)); return; }
    vals.forEach((v, i) => {
      // A little per-bar scatter so the row reads as a voice, not one block.
      const jitter = 0.85 + 0.3 * Math.abs(Math.sin(i * 12.9898 + level * 47.3));
      Animated.timing(v, {
        toValue: Math.max(0.06, Math.min(1, level * weights[i] * jitter * 1.3)),
        duration: 70,
        useNativeDriver: false,
      }).start();
    });
  }, [level, reduceMotion, vals, weights]);

  return (
    <View
      style={styles.eq}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {vals.map((v, i) => (
        <View key={i} style={styles.barTrack}>
          <Animated.View
            style={[styles.bar, { height: v.interpolate({ inputRange: [0, 1], outputRange: [SEG_H, EQ_HEIGHT] }) }]}
          >
            <View style={styles.barCap} />
          </Animated.View>
        </View>
      ))}
      <View style={styles.stripes} pointerEvents="none">
        {[...Array(SEGMENTS - 1)].map((_, i) => (
          <View key={i} style={[styles.stripe, { top: i * (SEG_H + SEG_GAP) + SEG_H }]} />
        ))}
      </View>
    </View>
  );
}

function SquareButton(props: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  hint?: string;
  active?: boolean;
  submitState?: "off" | "on" | "flashing";
  disabled?: boolean;
  onPress: () => void;
}) {
  const flash = useRef(new Animated.Value(1)).current;
  const flashing = props.submitState === "flashing";

  useEffect(() => {
    if (!flashing) { flash.setValue(1); return; }
    const a = Animated.loop(Animated.sequence([
      Animated.timing(flash, { toValue: 0.35, duration: 425, useNativeDriver: true }),
      Animated.timing(flash, { toValue: 1, duration: 425, useNativeDriver: true }),
    ]));
    a.start();
    return () => a.stop();
  }, [flashing, flash]);

  const submitOn = props.submitState === "on" || flashing;
  const tint = props.active ? "#06242E" : submitOn ? "#FFFFFF" : props.disabled ? MUTED : "#FFFFFF";

  return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled}
      accessibilityRole="button"
      accessibilityLabel={props.label}
      accessibilityHint={props.hint}
      accessibilityState={{ disabled: !!props.disabled }}
      style={styles.btnWrap}
    >
      <Animated.View
        style={[
          styles.btn,
          props.active && styles.btnActive,
          submitOn && styles.btnSubmit,
          props.disabled && styles.btnDisabled,
          flashing && { opacity: flash },
        ]}
      >
        <Ionicons name={props.icon} size={22} color={tint} />
      </Animated.View>
      <Text style={[styles.btnLabel, (props.active || submitOn) && styles.btnLabelStrong, props.disabled && { color: MUTED }]}>
        {props.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 4 },
  statusLine: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 },
  recWrap: { width: 26, height: 26, alignItems: "center", justifyContent: "center" },
  recRing: {
    position: "absolute", top: 0, left: 0, width: 26, height: 26,
    borderRadius: 13, borderWidth: 2, borderColor: "#F43F5E",
  },
  recDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: "#F43F5E" },
  stoppedBadge: {
    width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center",
    backgroundColor: TRACK, borderWidth: 1.5, borderColor: EDGE,
  },
  statusText: { fontSize: 15, fontWeight: "700", color: "#FFFFFF", letterSpacing: 0.2 },

  eq: { height: EQ_HEIGHT, marginTop: 16, flexDirection: "row", alignItems: "flex-end" },
  barTrack: { flex: 1, marginHorizontal: 3, maxWidth: 16, height: EQ_HEIGHT, justifyContent: "flex-end", backgroundColor: TRACK, borderRadius: 2 },
  bar: { width: "100%", borderRadius: 2, backgroundColor: LIT, justifyContent: "flex-start" },
  barCap: { height: SEG_H, borderRadius: 2, backgroundColor: CAP },
  stripes: { position: "absolute", top: 0, left: 0, right: 0, height: EQ_HEIGHT },
  stripe: { position: "absolute", left: 0, right: 0, height: SEG_GAP, backgroundColor: NAVY_CARD },

  heardBlock: { marginTop: 14, minHeight: 78, alignItems: "center", justifyContent: "center", gap: 3 },
  heardLabel: { fontSize: 13, fontWeight: "700", letterSpacing: 1.3, color: "#FB5570" },
  heardText: { fontSize: 50, fontWeight: "700", color: "#FFFFFF", textAlign: "center" },
  heardProvisional: { color: SOFT, opacity: 0.75 },

  row: { marginTop: 12, flexDirection: "row", justifyContent: "center", gap: 16 },
  btnWrap: { width: 66, alignItems: "center", gap: 7 },
  btn: {
    width: 62, height: 56, borderRadius: 16, alignItems: "center", justifyContent: "center",
    backgroundColor: TRACK, borderWidth: 1.5, borderColor: EDGE,
  },
  btnActive: { backgroundColor: LIT, borderColor: LIT },
  btnSubmit: { backgroundColor: "#2B5FD9", borderColor: "#5B8CFF" },
  btnDisabled: { backgroundColor: "#16264A", borderColor: "#22345C" },
  btnLabel: { fontSize: 12, fontWeight: "600", color: SOFT },
  btnLabelStrong: { fontWeight: "700", color: "#FFFFFF" },

  notice: {
    marginTop: 14, borderWidth: 1, borderColor: EDGE, borderRadius: 14,
    padding: 14, backgroundColor: TRACK,
  },
  noticeTitle: { fontWeight: "700", color: "#FFFFFF", marginBottom: 4 },
  noticeBody: { color: SOFT, fontSize: 13, lineHeight: 19 },
  noticeBtn: { marginTop: 12, alignSelf: "flex-start", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1.5, borderColor: EDGE },
  noticeBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
});
