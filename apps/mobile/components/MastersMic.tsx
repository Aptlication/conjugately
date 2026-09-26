import React, { useEffect, useMemo, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useMastersMic, type MicOutcome } from "../lib/mastersMic";

/**
 * Masters Mic - the control.
 *
 * Hold Record to speak, release to stop. Nothing is scored here: the learner
 * sees what was heard and presses Enter. See lib/mastersMic.ts for why.
 *
 * Build 21 auto-started the recogniser on mount, which meant a device without
 * on-device French hit a dead "not available" before the learner had touched
 * anything. Recording now only ever starts from a deliberate press.
 */

const BARS = 16;
const SEGMENTS = 16;
const SEG_H = 8;
const SEG_GAP = 3;
const EQ_HEIGHT = SEGMENTS * SEG_H + (SEGMENTS - 1) * SEG_GAP;

/** The question is 20pt; the transcript must never out-shout it. */
const HEARD_SIZE = 14;

const NAVY_CARD = "#10203F";
const TRACK = "#1B2C4E";
const EDGE = "#2E4270";
const LIT = "#22D3EE";
const CAP = "#E6FBFF";
const MUTED = "#8FA3C8";
const SOFT = "#C3D0E8";

export default function MastersMic(props: {
  expected: string | string[];
  options: string[];
  correctIndex: number;
  onOutcome: (o: MicOutcome) => void;
  /** Toggles options A-D for this question. */
  onToggleOptions: () => void;
  optionsShown: boolean;
  disabled?: boolean;
}) {
  const { phase, level, transcript, reading, errorDetail, startHold, stopHold, reset, submit } =
    useMastersMic({
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

  const listening = phase === "listening";
  const ready = phase === "ready";

  // A flat equaliser and a broken one look identical, so the bars only appear
  // once sound is genuinely arriving. Until then the pause symbol stands in -
  // including during the gap between the press and the first audio, which is
  // what made build 24 feel dead.
  const [gotAudio, setGotAudio] = useState(false);
  useEffect(() => {
    if (listening && level > 0) setGotAudio(true);
  }, [listening, level]);
  const hearing = listening && gotAudio;
  const warming = listening && !gotAudio;

  if (props.disabled) return null;

  if (phase === "denied") {
    return (
      <Notice
        title="Microphone access is off"
        body="Masters Mic needs the microphone and speech recognition. You can turn them on in Settings, and the quiz works perfectly well by tapping in the meantime."
        onShowOptions={props.onToggleOptions}
      />
    );
  }

  if (phase === "unavailable") {
    return (
      <Notice
        title="Masters Mic is not available on this device"
        body="Carry on by tapping an answer - nothing is lost."
        detail={errorDetail}
        onShowOptions={props.onToggleOptions}
      />
    );
  }

  const shownText = ready ? (reading?.heard ?? "") : transcript;
  const placeholder = listening ? "…" : ready ? "nothing caught" : "Hold Record and say the answer";

  return (
    <View style={styles.wrap}>
      <StatusLine phase={phase} warming={warming} reduceMotion={reduceMotion} />

      {hearing ? <Equaliser level={level} reduceMotion={reduceMotion} /> : <PauseGlyph />}

      <View style={styles.heardBlock}>
        <Text style={styles.heardLabel}>Heard</Text>
        <Text
          style={[styles.heardText, !ready && styles.heardProvisional]}
          numberOfLines={2}
          accessibilityLiveRegion="polite"
        >
          {shownText || placeholder}
        </Text>
        {ready && reading?.optionIndex != null && (
          <Text style={styles.heardSnap} numberOfLines={1}>
            {"\u2192 "}{props.options[reading.optionIndex]}
          </Text>
        )}
      </View>

      {!!errorDetail && phase === "idle" && (
        <Text style={styles.inlineError} numberOfLines={2}>{errorDetail}</Text>
      )}

      <View style={styles.row}>
        <SquareButton
          icon={props.optionsShown ? "eye-off-outline" : "list"}
          label={props.optionsShown ? "Hide A-D" : "Show A-D"}
          onPress={props.onToggleOptions}
          hint={props.optionsShown ? "Hide the four options again" : "Bring the four options back for this question"}
        />
        <SquareButton
          icon="mic"
          big
          // Delete is gone: holding this again replaces whatever was there, so
          // a separate destructive-looking control was a second route to the
          // same outcome. The label carries the meaning instead.
          label={listening ? "Recording" : ready ? "Re-record" : "Record"}
          active={listening}
          again={ready}
          attention={!listening && !ready && !reduceMotion}
          hold
          onPressIn={startHold}
          onPressOut={stopHold}
          hint={ready ? "Hold to record again over your last attempt" : "Hold to speak, release when you have finished"}
        />
        <SquareButton
          icon="return-down-back"
          label="Enter"
          submitState={ready ? (reduceMotion ? "on" : "flashing") : "off"}
          onPress={submit}
          disabled={!ready}
          hint="Submit this answer for marking"
        />
      </View>
    </View>
  );
}

function Notice(props: { title: string; body: string; detail?: string | null; onShowOptions: () => void }) {
  return (
    <View style={styles.notice}>
      <Text style={styles.noticeTitle}>{props.title}</Text>
      <Text style={styles.noticeBody}>{props.body}</Text>
      {!!props.detail && <Text style={styles.noticeDetail}>{props.detail}</Text>}
      <Pressable onPress={props.onShowOptions} accessibilityRole="button" style={styles.noticeBtn}>
        <Text style={styles.noticeBtnText}>Show the options</Text>
      </Pressable>
    </View>
  );
}

function PauseGlyph() {
  return (
    <View
      style={styles.pauseWrap}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={styles.pauseBar} />
      <View style={styles.pauseBar} />
    </View>
  );
}

function StatusLine({ phase, warming, reduceMotion }: { phase: string; warming: boolean; reduceMotion: boolean }) {
  const listening = phase === "listening" && !warming;
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
          <Ionicons name="pause" size={13} color={MUTED} />
        </View>
        <Text style={styles.statusText}>
          {warming ? "Getting ready - hold on a moment" : "Press Record to answer, Enter to submit"}
        </Text>
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
 * Solid animated columns with the segment gaps painted over them as stripes in
 * the card colour. Drawing 256 individual segments and recolouring them twenty
 * times a second drops frames on an older phone.
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
      const jitter = 0.85 + 0.3 * Math.abs(Math.sin(i * 12.9898 + level * 47.3));
      Animated.timing(v, {
        toValue: Math.max(0.06, Math.min(1, level * weights[i] * jitter * 1.3)),
        duration: 70,
        useNativeDriver: false,
      }).start();
    });
  }, [level, reduceMotion, vals, weights]);

  return (
    <View style={styles.eq} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
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
  hold?: boolean;
  /** Record: four times the area of its neighbours. */
  big?: boolean;
  /** There is already an attempt, so this records over it. */
  again?: boolean;
  /** Flashes red to say "press me" before the learner has recorded anything. */
  attention?: boolean;
  submitState?: "off" | "on" | "flashing";
  disabled?: boolean;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}) {
  const flash = useRef(new Animated.Value(1)).current;
  const flashing = props.submitState === "flashing" || !!props.attention;

  useEffect(() => {
    if (!flashing) { flash.setValue(1); return; }
    const driver = !props.attention;
    const a = Animated.loop(Animated.sequence([
      Animated.timing(flash, { toValue: 0, duration: 450, easing: Easing.step0, useNativeDriver: driver }),
      Animated.timing(flash, { toValue: 1, duration: 450, easing: Easing.step0, useNativeDriver: driver }),
    ]));
    a.start();
    return () => a.stop();
  }, [flashing, flash, props.attention]);

  const attentionStyle = props.attention
    ? {
        backgroundColor: flash.interpolate({ inputRange: [0, 1], outputRange: ["#6B1226", "#E11D48"] }),
        borderColor: flash.interpolate({ inputRange: [0, 1], outputRange: ["#B0143A", "#E11D48"] }),
      }
    : null;

  const submitOn = props.submitState === "on" || props.submitState === "flashing";
  const tint = props.again
    ? "#FB5570"
    : props.active
    ? "#FFFFFF"
    : props.attention
      ? "#FFFFFF"
      : submitOn
        ? "#FFFFFF"
        : props.disabled
          ? MUTED
          : "#FFFFFF";

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      disabled={props.disabled}
      accessibilityRole="button"
      accessibilityLabel={props.label}
      accessibilityHint={props.hint}
      accessibilityState={{ disabled: !!props.disabled }}
      style={props.big ? styles.btnWrapBig : styles.btnWrap}
    >
      <Animated.View
        style={[
          props.big ? styles.btnBig : styles.btn,
          props.hold && styles.btnHold,
          props.again && styles.btnAgain,
          props.attention && styles.btnAttention,
          attentionStyle,
          props.active && styles.btnActive,
          submitOn && styles.btnSubmit,
          props.disabled && styles.btnDisabled,
          flashing && !props.attention && { opacity: flash.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }) },
        ]}
      >
        <Ionicons name={props.icon} size={props.big ? 46 : 26} color={tint} />
      </Animated.View>
      <Text style={[
        props.big ? styles.btnLabelBig : styles.btnLabel,
        (props.active || submitOn || props.big) && styles.btnLabelStrong,
        props.disabled && { color: MUTED },
      ]}>
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
  statusText: { flex: 1, fontSize: 14, fontWeight: "700", color: "#FFFFFF", letterSpacing: 0.1, lineHeight: 19 },

  eq: { height: EQ_HEIGHT, marginTop: 16, flexDirection: "row", alignItems: "flex-end" },
  barTrack: { flex: 1, marginHorizontal: 3, maxWidth: 16, height: EQ_HEIGHT, justifyContent: "flex-end", backgroundColor: TRACK, borderRadius: 2 },
  bar: { width: "100%", borderRadius: 2, backgroundColor: LIT, justifyContent: "flex-start" },
  barCap: { height: SEG_H, borderRadius: 2, backgroundColor: CAP },
  stripes: { position: "absolute", top: 0, left: 0, right: 0, height: EQ_HEIGHT },
  stripe: { position: "absolute", left: 0, right: 0, height: SEG_GAP, backgroundColor: NAVY_CARD },

  heardBlock: { marginTop: 14, minHeight: 44, alignItems: "center", justifyContent: "center", gap: 3 },
  heardLabel: { fontSize: 13, fontWeight: "700", letterSpacing: 1.3, color: "#FB5570" },
  heardText: { fontSize: HEARD_SIZE, fontWeight: "700", color: "#FFFFFF", textAlign: "center" },
  heardProvisional: { color: SOFT, opacity: 0.75 },
  heardSnap: { marginTop: 2, fontSize: 13, fontWeight: "600", color: "#67E8F9" },
  inlineError: { marginTop: 6, fontSize: 11, color: "#FCA5A5", textAlign: "center" },

  pauseWrap: {
    height: EQ_HEIGHT, marginTop: 16, flexDirection: "row",
    alignItems: "center", justifyContent: "center", gap: 26,
  },
  pauseBar: { width: 30, height: 104, borderRadius: 8, backgroundColor: "#24365E" },

  row: { marginTop: 10, flexDirection: "row", alignItems: "flex-start", justifyContent: "center", gap: 12 },
  btnWrap: { width: 84, alignItems: "center", gap: 8 },
  btnWrapBig: { width: 128, alignItems: "center", gap: 8 },
  btn: {
    width: 80, height: 80, borderRadius: 22, alignItems: "center", justifyContent: "center",
    backgroundColor: TRACK, borderWidth: 1.5, borderColor: EDGE,
  },
  btnBig: {
    width: 124, height: 112, borderRadius: 28, alignItems: "center", justifyContent: "center",
    backgroundColor: TRACK, borderWidth: 2, borderColor: EDGE,
  },
  btnAgain: { backgroundColor: "#2A1A2B", borderColor: "#E11D48" },
  btnHold: { borderColor: "#5B8CFF" },
  btnAttention: { borderColor: "#E11D48", backgroundColor: "#E11D48" },
  btnActive: { backgroundColor: "#E11D48", borderColor: "#E11D48" },
  btnSubmit: { backgroundColor: "#16A34A", borderColor: "#4ADE80" },
  btnDisabled: { backgroundColor: "#16264A", borderColor: "#22345C" },
  btnLabel: { fontSize: 12, fontWeight: "600", color: SOFT },
  btnLabelBig: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
  btnLabelStrong: { fontWeight: "700", color: "#FFFFFF" },

  notice: {
    marginTop: 14, borderWidth: 1, borderColor: EDGE, borderRadius: 14,
    padding: 14, backgroundColor: TRACK,
  },
  noticeTitle: { fontWeight: "700", color: "#FFFFFF", marginBottom: 4 },
  noticeBody: { color: SOFT, fontSize: 13, lineHeight: 19 },
  noticeDetail: { color: "#FCA5A5", fontSize: 11, lineHeight: 16, marginTop: 8 },
  noticeBtn: { marginTop: 12, alignSelf: "flex-start", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1.5, borderColor: EDGE },
  noticeBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
});
