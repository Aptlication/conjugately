import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Animated Masters Mic demo for the quiz pop-up (Jonathan, 30 Oct 2026).
 *
 * A small phone built from the quiz screen's own parts plays a 12 s loop:
 *   1. a fingertip taps Mic Off -> Mic On, and the screen turns navy (A-D hidden)
 *   2. it holds Record: the pause bars become the equaliser, "Heard" appears
 *   3. it lets go and presses Enter -> "Correct"
 *   4. "Stuck?" it presses Show A-D and the four options come back
 * A caption and four dots under the phone follow the steps.
 *
 * One Animated.Value drives the whole timeline (0 -> 1 over LOOP_MS), so every
 * part stays in step; everything animates on the native driver. With Reduce
 * Motion on, the loop does not run: the phone shows the Record screen still
 * and all four steps are listed.
 *
 * Mirrors the "Animated demo" artboard of the First-quiz Masters Mic pop-up
 * design; the percentages below are that artboard's keyframes.
 */

const LOOP_MS = 12000;
const PHONE_W = 250;
const PHONE_H = 330;
const BEZEL = 6;

const NAVY = "#0A1326";
const CYAN = "#22D3EE";
const RED = "#E63A2E";
const ROSE = "#E11D48";
const GREEN = "#16A34A";

const STEPS: { n: string; pre: string; strong: string; post: string }[] = [
  { n: "1.", pre: "Tap ", strong: "Mic Off", post: " under the question" },
  { n: "2.", pre: "Hold ", strong: "Record", post: " and say the answer in French" },
  { n: "3.", pre: "Let go, then press ", strong: "Enter", post: "" },
  { n: "Stuck?", pre: "Press ", strong: "Show A–D", post: " to see the four options" },
];

const OPTIONS = ["Je suis fatigué.", "Tu es fatigué.", "Il est fatigué.", "J'ai fatigué."];
const EQ_HEIGHTS = [30, 46, 60, 70, 64, 70, 56, 42, 28];

function useReduceMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduce).catch(() => {});
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduce);
    return () => { try { (sub as any)?.remove?.(); } catch {} };
  }, []);
  return reduce;
}

function loop(v: Animated.Value, ms: number, delay = 0) {
  return Animated.loop(Animated.sequence([
    Animated.delay(delay),
    Animated.timing(v, { toValue: 1, duration: ms, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
    Animated.timing(v, { toValue: 0, duration: ms, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
  ]));
}

export default function MicPromoDemo() {
  const reduce = useReduceMotion();
  const { height } = useWindowDimensions();
  // Smaller phones (SE, mini) get a smaller demo so the pop-up still fits.
  const k = height < 760 ? 0.8 : 1;

  const t = useRef(new Animated.Value(reduce ? 0.4 : 0)).current;
  const ring = useRef(new Animated.Value(0)).current;
  const bars = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (reduce) { t.setValue(0.4); return; }
    t.setValue(0);
    const main = Animated.loop(Animated.timing(t, { toValue: 1, duration: LOOP_MS, easing: Easing.linear, useNativeDriver: true }));
    const r = Animated.loop(Animated.timing(ring, { toValue: 1, duration: 1000, easing: Easing.out(Easing.quad), useNativeDriver: true }));
    const b = bars.map((v, i) => loop(v, 380 + i * 90, i * 120));
    main.start(); r.start(); b.forEach((a) => a.start());
    return () => { main.stop(); r.stop(); b.forEach((a) => a.stop()); };
  }, [reduce, t, ring, bars]);

  const f = (input: number[], output: number[]) =>
    t.interpolate({ inputRange: input, outputRange: output, extrapolate: "clamp" });

  const light = f([0, 0.19, 0.24, 0.96, 1], [1, 1, 0, 0, 1]);
  const navy = f([0, 0.19, 0.24, 0.94, 0.99, 1], [0, 0, 1, 1, 0, 0]);
  const pillOn = f([0, 0.139, 0.14, 1], [0, 0, 1, 1]);
  const pause = f([0, 0.30, 0.31, 0.59, 0.60, 1], [1, 1, 0, 0, 1, 1]);
  const live = f([0, 0.30, 0.31, 0.59, 0.60, 1], [0, 0, 1, 1, 0, 0]);
  const heard = f([0, 0.43, 0.46, 0.76, 0.79, 1], [0, 0, 1, 1, 0, 0]);
  const enter = f([0, 0.59, 0.61, 0.63, 0.65, 0.67, 1], [1, 1, 0.35, 1, 0.35, 1, 1]);
  const correct = f([0, 0.66, 0.68, 0.76, 0.79, 1], [0, 0, 1, 1, 0, 0]);
  const correctY = f([0, 0.66, 0.68, 1], [6, 6, 0, 0]);
  const opts = f([0, 0.80, 0.83, 0.93, 0.96, 1], [0, 0, 1, 1, 0, 0]);
  const optsY = f([0, 0.80, 0.83, 1], [10, 10, 0, 0]);

  const KX = [0, 0.05, 0.11, 0.22, 0.29, 0.60, 0.64, 0.68, 0.78, 0.97, 1];
  const fingerX = f(KX, [205, 195, 154, 154, 110, 110, 178, 178, 43, 43, 205]);
  const fingerY = f(KX, [340, 320, 272, 272, 262, 262, 266, 266, 266, 266, 340]);
  const fingerS = f(
    [0, 0.11, 0.13, 0.15, 0.29, 0.31, 0.58, 0.60, 0.64, 0.66, 0.68, 0.78, 0.80, 0.82, 1],
    [1, 1, 0.78, 1, 1, 0.8, 0.8, 1, 1, 0.78, 1, 1, 0.78, 1, 1],
  );
  const fingerO = f([0, 0.05, 0.91, 0.95, 1], [0, 1, 1, 0, 0]);

  const caps = [
    f([0, 0.20, 0.23, 1], [1, 1, 0, 0]),
    f([0, 0.22, 0.25, 0.58, 0.61, 1], [0, 0, 1, 1, 0, 0]),
    f([0, 0.59, 0.62, 0.75, 0.78, 1], [0, 0, 1, 1, 0, 0]),
    f([0, 0.76, 0.79, 0.95, 0.98, 1], [0, 0, 1, 1, 0, 0]),
  ];
  const dots = [
    f([0, 0.21, 0.23, 1], [1, 1, 0, 0]),
    f([0, 0.22, 0.24, 0.59, 0.61, 1], [0, 0, 1, 1, 0, 0]),
    f([0, 0.59, 0.61, 0.76, 0.78, 1], [0, 0, 1, 1, 0, 0]),
    f([0, 0.76, 0.78, 0.97, 0.99, 1], [0, 0, 1, 1, 0, 0]),
  ];

  const ringScale = ring.interpolate({ inputRange: [0, 1], outputRange: [1, 1.45] });
  const ringOpacity = ring.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] });

  const outerW = (PHONE_W + BEZEL * 2) * k;
  const outerH = (PHONE_H + BEZEL * 2) * k;

  return (
    <View style={styles.wrap}>
      <View
        style={{ width: outerW, height: outerH }}
        accessible
        accessibilityRole="image"
        accessibilityLabel="Animation: tap Mic Off, the screen turns navy, hold Record and speak, press Enter, and press Show A to D to see the options."
      >
        <View style={[styles.phone, { transform: [{ scale: k }], transformOrigin: "top left" }]}>
          {/* The tapping screen */}
          <Animated.View style={[styles.layer, styles.light, { opacity: reduce ? 0 : light }]}>
            <Text style={styles.lightMeta}>Question 1 of 20</Text>
            <Text style={styles.lightQ}>I am tired.</Text>
            {OPTIONS.map((o, i) => (
              <View key={o} style={styles.lightOpt}>
                <Text style={styles.lightOptText}>{String.fromCharCode(65 + i)}{"  "}{o}</Text>
              </View>
            ))}
            <View style={styles.pillRow}>
              <View style={[styles.pill, styles.pillSound]}><Text style={[styles.pillText, { color: "#2B5FD9" }]}>Sound On</Text></View>
              <View style={[styles.pill, styles.pillOff]}>
                <Text style={[styles.pillText, { color: "#5A6472" }]}>Mic Off</Text>
                <Animated.View style={[styles.pillOn, { opacity: pillOn }]}>
                  <Text style={[styles.pillText, { color: "#06242E" }]}>Mic On</Text>
                </Animated.View>
              </View>
            </View>
          </Animated.View>

          {/* The Masters Mic screen */}
          <Animated.View style={[styles.layer, styles.navy, { opacity: reduce ? 1 : navy }]}>
            <Text style={styles.navyMeta}>Question 1 of 20</Text>
            <Text style={styles.navyQ}>I am tired.</Text>

            <Animated.View style={[styles.centerBand, { opacity: reduce ? 0 : pause }]}>
              <View style={styles.pauseBar} /><View style={styles.pauseBar} />
            </Animated.View>
            <Animated.View style={[styles.eq, { opacity: reduce ? 1 : live }]}>
              {EQ_HEIGHTS.map((h, i) => (
                <Animated.View key={i} style={[styles.eqBar, { height: h, transformOrigin: "bottom",
                  transform: [{ scaleY: reduce ? 0.7 : bars[i % 3].interpolate({ inputRange: [0, 1], outputRange: [0.25, 1] }) }] }]} />
              ))}
            </Animated.View>

            <Animated.View style={[styles.heard, { opacity: reduce ? 1 : heard }]}>
              <Text style={styles.heardLabel}>HEARD</Text>
              <Text style={styles.heardText}>je suis fatigué</Text>
            </Animated.View>

            <Animated.View style={[styles.correctRow, { opacity: reduce ? 0 : correct, transform: [{ translateY: correctY }] }]}>
              <Text style={styles.correct}>✓ Correct</Text>
            </Animated.View>

            <Animated.View style={[styles.opts, { opacity: reduce ? 0 : opts, transform: [{ translateY: optsY }] }]}>
              {OPTIONS.map((o, i) => (
                <View key={o} style={styles.navyOpt}>
                  <Text style={styles.navyOptText}>{String.fromCharCode(65 + i)}{"  "}{o}</Text>
                </View>
              ))}
            </Animated.View>

            <View style={styles.controls}>
              <View style={styles.ctl}>
                <View style={[styles.sq, { backgroundColor: ROSE }]}><Ionicons name="list" size={15} color="#FFFFFF" /></View>
                <Text style={styles.ctlLabel}>Show A–D</Text>
              </View>
              <View style={styles.ctl}>
                <View style={styles.recWrap}>
                  <Animated.View style={[StyleSheet.absoluteFill, { opacity: reduce ? 0 : live }]}>
                    <Animated.View style={[styles.recRing, { opacity: ringOpacity, transform: [{ scale: ringScale }] }]} />
                  </Animated.View>
                  <View style={styles.rec}><Ionicons name="mic" size={24} color="#FFFFFF" /></View>
                </View>
                <Text style={[styles.ctlLabel, styles.ctlLabelStrong]}>Record</Text>
              </View>
              <View style={styles.ctl}>
                <Animated.View style={[styles.sq, { backgroundColor: GREEN, opacity: reduce ? 1 : enter }]}>
                  <Ionicons name="return-down-back" size={15} color="#FFFFFF" />
                </Animated.View>
                <Text style={styles.ctlLabel}>Enter</Text>
              </View>
            </View>
          </Animated.View>

          {!reduce && (
            <Animated.View pointerEvents="none" style={[styles.finger, {
              opacity: fingerO,
              transform: [{ translateX: fingerX }, { translateY: fingerY }, { scale: fingerS }],
            }]} />
          )}
        </View>
      </View>

      {reduce ? (
        <View style={styles.stepList}>
          {STEPS.map((s) => (
            <Text key={s.n} style={styles.stepItem}>
              <Text style={styles.strong}>{s.n}</Text> {s.pre}<Text style={styles.strong}>{s.strong}</Text>{s.post}
            </Text>
          ))}
        </View>
      ) : (
        <>
          <View style={styles.captionBox} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            {STEPS.map((s, i) => (
              <Animated.Text key={s.n} style={[styles.caption, { opacity: caps[i] }]}>
                <Text style={styles.strong}>{s.n}</Text> {s.pre}<Text style={styles.strong}>{s.strong}</Text>{s.post}
              </Animated.Text>
            ))}
          </View>
          <View style={styles.dots} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            {dots.map((o, i) => (
              <View key={i} style={styles.dot}>
                <Animated.View style={[styles.dotOn, { opacity: o }]} />
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: "stretch", alignItems: "center", marginTop: 4 },
  phone: {
    position: "absolute", left: 0, top: 0,
    width: PHONE_W + BEZEL * 2, height: PHONE_H + BEZEL * 2,
    borderRadius: 22, borderWidth: BEZEL, borderColor: "#1B1F24", overflow: "hidden", backgroundColor: "#F7F8FA",
  },
  layer: { position: "absolute", left: 0, top: 0, width: PHONE_W, height: PHONE_H, paddingTop: 22, paddingHorizontal: 14 },

  light: { backgroundColor: "#F7F8FA", gap: 8 },
  lightMeta: { fontSize: 10, fontWeight: "600", color: "#5A6472" },
  lightQ: { fontSize: 17, fontWeight: "800", color: "#1B1F24", marginBottom: 4 },
  lightOpt: { borderWidth: 1.5, borderColor: "#D8DCE2", backgroundColor: "#FFFFFF", borderRadius: 9, paddingVertical: 7, paddingHorizontal: 9 },
  lightOptText: { fontSize: 11, color: "#1B1F24" },
  pillRow: { position: "absolute", left: 0, right: 0, top: 274, flexDirection: "row", justifyContent: "center", gap: 8 },
  pill: { borderWidth: 1, borderRadius: 999, paddingVertical: 5, paddingHorizontal: 10, overflow: "hidden" },
  pillSound: { borderColor: "#2B5FD9", backgroundColor: "#EAF0FC" },
  pillOff: { borderColor: "#C6CCD4", backgroundColor: "#F0F2F5" },
  pillOn: { ...StyleSheet.absoluteFillObject, backgroundColor: CYAN, alignItems: "center", justifyContent: "center" },
  pillText: { fontSize: 10, fontWeight: "700" },

  navy: { backgroundColor: NAVY },
  navyMeta: { fontSize: 10, fontWeight: "600", color: "#A8B8D6" },
  navyQ: { fontSize: 22, fontWeight: "800", color: "#FFFFFF", marginTop: 6, letterSpacing: -0.3 },
  centerBand: { position: "absolute", left: 0, right: 0, top: 104, height: 70, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 14 },
  pauseBar: { width: 14, height: 52, borderRadius: 4, backgroundColor: "#24365E" },
  eq: { position: "absolute", left: 28, right: 28, top: 104, height: 70, flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 5 },
  eqBar: { width: 9, borderRadius: 2, backgroundColor: CYAN },
  heard: { position: "absolute", left: 0, right: 0, top: 186, alignItems: "center", gap: 2 },
  heardLabel: { fontSize: 9, fontWeight: "700", letterSpacing: 1.2, color: "#FB5570" },
  heardText: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
  correctRow: { position: "absolute", left: 0, right: 0, top: 226, alignItems: "center" },
  correct: { backgroundColor: GREEN, color: "#FFFFFF", fontSize: 12, fontWeight: "800", borderRadius: 999, paddingVertical: 4, paddingHorizontal: 12, overflow: "hidden" },
  opts: { position: "absolute", left: 14, right: 14, top: 104, gap: 5 },
  navyOpt: { backgroundColor: "#1B2C4E", borderWidth: 1, borderColor: "#2E4270", borderRadius: 8, paddingVertical: 6, paddingHorizontal: 8 },
  navyOptText: { fontSize: 10, color: "#E2E9F7" },
  controls: { position: "absolute", left: 0, right: 0, top: 250, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 22 },
  ctl: { alignItems: "center", gap: 3 },
  sq: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  ctlLabel: { fontSize: 8, fontWeight: "600", color: "#C3D0E8" },
  ctlLabelStrong: { fontSize: 9, fontWeight: "700", color: "#FFFFFF" },
  recWrap: { width: 56, height: 56 },
  recRing: { ...StyleSheet.absoluteFillObject, borderRadius: 28, borderWidth: 3, borderColor: RED },
  rec: { ...StyleSheet.absoluteFillObject, borderRadius: 28, backgroundColor: RED, alignItems: "center", justifyContent: "center" },

  finger: {
    position: "absolute", left: 0, top: 0, width: 26, height: 26, borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.55)", borderWidth: 2, borderColor: "rgba(27,31,36,0.55)",
    shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },

  captionBox: { alignSelf: "stretch", height: 42, marginTop: 12 },
  caption: { position: "absolute", left: 0, right: 0, top: 0, fontSize: 15, lineHeight: 20, color: "#1B1F24", textAlign: "center" },
  strong: { fontWeight: "800", color: "#1B1F24" },
  dots: { flexDirection: "row", gap: 6, marginTop: 2 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#D3D9E2", overflow: "hidden" },
  dotOn: { ...StyleSheet.absoluteFillObject, backgroundColor: "#2B5FD9" },
  stepList: { alignSelf: "stretch", gap: 6, marginTop: 12 },
  stepItem: { fontSize: 14, lineHeight: 20, color: "#334155" },
});
