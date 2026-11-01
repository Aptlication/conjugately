import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Modal, Pressable, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";

/**
 * "How to read" pop-up (Jonathan, 31 Oct 2026): an animated demo built from
 * the reading screen's own parts, not a recorded video. A finger taps
 * « l'addition » and its English appears; then double-taps « confiance », which
 * is highlighted and "added". Loops while open. Reduce Motion shows both
 * steps, still. Shown at each reading until "Don't remind me again".
 */

const INK = "#1B2145";
const BLUE = "#2B5FD9";
const BLUE_SOFT = "#E3EAFD";
const GREEN = "#22A45D";

type Box = { x: number; y: number; w: number; h: number };
const WORDS = ["Qui", "paiera", "l’addition", "?", "En", "général,", "c’est", "la", "personne", "qui", "a", "invité.", "Vous", "aurez", "gagné", "sa", "confiance."];
const TAP = 2, DOUBLE = 16;

export default function ReadTip({ visible, onClose, onNever }: { visible: boolean; onClose: () => void; onNever: () => void }) {
  const [reduce, setReduce] = useState(false);
  const [boxes, setBoxes] = useState<Record<number, Box>>({});
  const [step, setStep] = useState<0 | 1 | 2>(0); // 0 idle, 1 tap shown, 2 double-tap shown
  const [hl, setHl] = useState<{ hit: boolean; saved: boolean }>({ hit: false, saved: false });
  const fx = useRef(new Animated.Value(0)).current;
  const fy = useRef(new Animated.Value(0)).current;
  const fo = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(1)).current;
  const ring = useRef(new Animated.Value(0)).current;

  useEffect(() => { AccessibilityInfo.isReduceMotionEnabled().then(setReduce).catch(() => {}); }, []);

  const ready = boxes[TAP] && boxes[DOUBLE];
  useEffect(() => {
    if (!visible || !ready) return;
    if (reduce) { setStep(2); setHl({ hit: true, saved: true }); return; }
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, f: () => void) => timers.push(setTimeout(() => { if (alive) f(); }, ms));
    const moveTo = (b: Box) => Animated.parallel([
      Animated.timing(fx, { toValue: b.x + b.w / 2 - 15, duration: 800, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
      Animated.timing(fy, { toValue: b.y + b.h * 0.6 - 15, duration: 800, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
    ]).start();
    const tap = () => {
      ring.setValue(0);
      Animated.parallel([
        Animated.sequence([
          Animated.timing(press, { toValue: 0.78, duration: 110, useNativeDriver: true }),
          Animated.timing(press, { toValue: 1, duration: 110, useNativeDriver: true }),
        ]),
        Animated.timing(ring, { toValue: 1, duration: 450, useNativeDriver: true }),
      ]).start();
    };
    const cycle = () => {
      setStep(0); setHl({ hit: false, saved: false });
      fx.setValue(260); fy.setValue(140); fo.setValue(0);
      at(300, () => { Animated.timing(fo, { toValue: 1, duration: 250, useNativeDriver: true }).start(); moveTo(boxes[TAP]); });
      at(1300, tap);
      at(1450, () => { setStep(1); setHl((h) => ({ ...h, hit: true })); });
      at(3200, () => { setStep(0); setHl((h) => ({ ...h, hit: false })); moveTo(boxes[DOUBLE]); });
      at(4100, tap);
      at(4300, tap);
      at(4420, () => { setStep(2); setHl((h) => ({ ...h, saved: true })); });
      at(6400, () => Animated.timing(fo, { toValue: 0, duration: 300, useNativeDriver: true }).start());
      at(7200, cycle);
    };
    cycle();
    return () => { alive = false; timers.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, ready, reduce]);

  const onLayout = (i: number) => (e: LayoutChangeEvent) => {
    if (i !== TAP && i !== DOUBLE) return;
    const { x, y, width, height } = e.nativeEvent.layout;
    setBoxes((b) => ({ ...b, [i]: { x, y, w: width, h: height } }));
  };

  const tapBox = boxes[TAP];
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card} accessibilityViewIsModal>
          <View style={styles.demo} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
            <Text style={styles.demoBar}>Le déjeuner d’affaires</Text>
            <View style={styles.text}>
              {WORDS.map((w, i) => (
                <View key={i} onLayout={onLayout(i)}
                  style={[styles.wordBox, i === TAP && hl.hit && { backgroundColor: BLUE_SOFT },
                    i === DOUBLE && hl.saved && styles.saved]}>
                  <Text style={styles.word}>{w}</Text>
                </View>
              ))}
              {step >= 1 && tapBox && (step === 1 || reduce) && (
                <View style={[styles.bubble, { left: Math.max(0, tapBox.x - 10), top: tapBox.y - 36 }]}>
                  <Text style={styles.bubbleText}><Text style={{ fontWeight: "800" }}>l’addition</Text> · the bill</Text>
                </View>
              )}
            </View>
            {step === 2 && <View style={styles.toast}><Text style={styles.toastText}>+ « la confiance » added</Text></View>}
            {!reduce && (
              <Animated.View style={[styles.finger, { opacity: fo, transform: [{ translateX: fx }, { translateY: fy }, { scale: press }] }]}>
                <Animated.View style={[styles.ring, { opacity: ring.interpolate({ inputRange: [0, 1], outputRange: [0.9, 0] }),
                  transform: [{ scale: ring.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.9] }) }] }]} />
              </Animated.View>
            )}
          </View>

          <View style={[styles.row, (step === 1 || reduce) && styles.rowOn]}>
            <Text style={styles.ic}>1×</Text>
            <Text style={styles.rowText}><Text style={{ fontWeight: "800" }}>Tap a word</Text> to see it in English.</Text>
          </View>
          <View style={[styles.row, (step === 2 || reduce) && styles.rowOn]}>
            <Text style={styles.ic}>2×</Text>
            <Text style={styles.rowText}><Text style={{ fontWeight: "800" }}>Double-tap a word</Text> to add it to your vocabulary.</Text>
          </View>

          <Pressable style={styles.primary} onPress={onClose} accessibilityRole="button">
            <Text style={styles.primaryText}>Got it</Text>
          </Pressable>
          <Pressable style={styles.link} onPress={onNever} accessibilityRole="button">
            <Text style={styles.linkText}>Don’t remind me again</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(5,10,25,0.6)", alignItems: "center", justifyContent: "center", padding: 18 },
  card: { width: "100%", maxWidth: 420, backgroundColor: "#FFFFFF", borderRadius: 22, padding: 18, gap: 10 },
  demo: { backgroundColor: "#F4F6FB", borderRadius: 16, borderWidth: 1, borderColor: "#DFE5F2", padding: 14, paddingBottom: 44, overflow: "hidden" },
  demoBar: { color: "#7A83A8", fontSize: 12, fontWeight: "700", marginBottom: 6 },
  text: { flexDirection: "row", flexWrap: "wrap", position: "relative" },
  wordBox: { borderRadius: 5, paddingHorizontal: 2, marginRight: 3, marginVertical: 3 },
  saved: { backgroundColor: BLUE_SOFT, borderBottomWidth: 2, borderBottomColor: BLUE },
  word: { color: INK, fontSize: 17, lineHeight: 26, fontFamily: "Georgia" },
  bubble: { position: "absolute", backgroundColor: INK, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  bubbleText: { color: "#FFFFFF", fontSize: 13 },
  toast: { position: "absolute", bottom: 10, alignSelf: "center", backgroundColor: GREEN, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 4 },
  toastText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  finger: { position: "absolute", left: 0, top: 0, width: 30, height: 30, borderRadius: 15,
    backgroundColor: "rgba(27,33,69,0.22)", borderWidth: 2, borderColor: "rgba(27,33,69,0.55)" },
  ring: { position: "absolute", left: -2, top: -2, right: -2, bottom: -2, borderRadius: 17, borderWidth: 2, borderColor: BLUE },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 6, paddingHorizontal: 8, borderRadius: 10 },
  rowOn: { backgroundColor: BLUE_SOFT },
  ic: { color: BLUE, fontWeight: "800", width: 26, textAlign: "center" },
  rowText: { color: INK, fontSize: 16, flex: 1 },
  primary: { backgroundColor: BLUE, borderRadius: 24, paddingVertical: 14, alignItems: "center", marginTop: 4 },
  primaryText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  link: { alignItems: "center", padding: 8 },
  linkText: { color: BLUE, fontSize: 15, fontWeight: "600" },
});
