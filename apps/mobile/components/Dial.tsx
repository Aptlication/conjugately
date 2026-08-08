import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing, runOnJS, useAnimatedReaction, useAnimatedStyle,
  useSharedValue, withSequence, withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export const ROW_H = 40;
const VISIBLE = 5;
const WHEEL_H = ROW_H * VISIBLE;

export type DialOption = { value: string; label: string; detail?: string; disabled?: boolean };
export type DialHandle = { spinTo: (index: number, delayMs?: number, onLand?: () => void) => void };

type Props = {
  options: DialOption[];
  onSettle?: (value: string) => void;
  disabled?: boolean;
};

const Dial = forwardRef<DialHandle, Props>(function Dial({ options, onSettle, disabled }, ref) {
  const n = options.length;
  const total = n * ROW_H;
  const offset = useSharedValue(0);
  const startOffset = useSharedValue(0);
  const sig = options.map((o) => o.value).join("|");

  const idx = () => (n ? ((Math.round(offset.value / ROW_H) % n) + n) % n : 0);
  const settle = () => onSettle && onSettle(options[idx()]?.value ?? "");

  useEffect(() => { offset.value = 0; }, [sig]);

  useImperativeHandle(ref, () => ({
    spinTo: (index, delayMs = 0, onLand) => {
      const land = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        settle();
        onLand && onLand();
      };
      setTimeout(() => {
        const current = offset.value;
        const base = Math.ceil(current / total) * total;
        const target = base + total * 3 + index * ROW_H;
        offset.value = withSequence(
          withTiming(current + total * 0.5, { duration: 250, easing: Easing.in(Easing.quad) }),
          withTiming(target, { duration: 1900, easing: Easing.out(Easing.cubic) }),
          withTiming(target - ROW_H * 0.35, { duration: 140, easing: Easing.out(Easing.quad) }),
          withTiming(target, { duration: 220, easing: Easing.out(Easing.quad) },
            (f) => { if (f) runOnJS(land)(); }),
        );
      }, delayMs);
    },
  }));

  useAnimatedReaction(
    () => Math.round(offset.value / ROW_H),
    (row, prev) => {
      if (prev !== null && row !== prev) runOnJS(Haptics.selectionAsync)();
    },
  );

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .onBegin(() => { startOffset.value = offset.value; })
    .onChange((e) => { offset.value = startOffset.value - e.translationY; })
    .onEnd((e) => {
      const target = Math.round((offset.value - e.velocityY * 0.18) / ROW_H) * ROW_H;
      offset.value = withTiming(target, { duration: 500, easing: Easing.out(Easing.cubic) },
        (f) => { if (f) runOnJS(settle)(); });
    });

  return (
    <View style={[styles.box, disabled && { opacity: 0.55 }]}>
      <GestureDetector gesture={pan}>
        <View style={styles.wheel}>
          {options.map((o, i) => (
            <Row key={`${o.value}-${i}`} index={i} text={o.label} offset={offset}
              n={n} total={total} dim={!!o.disabled} />
          ))}
          <View pointerEvents="none" style={styles.band} />
        </View>
      </GestureDetector>
      <Caption offset={offset} options={options} n={n} />
    </View>
  );
});

function Caption({ offset, options, n }: any) {
  const [text, setText] = React.useState("");
  useAnimatedReaction(
    () => (n ? ((Math.round(offset.value / ROW_H) % n) + n) % n : 0),
    (i, prev) => { if (i !== prev) runOnJS(setText)(options[i]?.detail || ""); },
  );
  useEffect(() => { setText(options[0]?.detail || ""); }, [options]);
  if (!text) return <View style={{ height: 8 }} />;
  return <Text style={styles.caption}>{text}</Text>;
}

function Row({ index, text, offset, n, total, dim }: any) {
  const style = useAnimatedStyle(() => {
    let d = ((index * ROW_H - offset.value) % total + total * 1.5) % total - total / 2;
    const half = WHEEL_H / 2;
    const c = Math.max(-half, Math.min(half, d));
    const ang = (c / half) * 65;
    return {
      opacity: Math.abs(d) > half + ROW_H ? 0 : Math.max(0.08, 1 - Math.abs(c) / (half * 1.15)),
      transform: [
        { translateY: c }, { perspective: 420 },
        { rotateX: `${-ang}deg` },
        { scale: 1 - Math.abs(c) / (half * 3.2) },
      ],
    };
  });
  return (
    <Animated.View style={[styles.row, style, dim && { opacity: 0.4 }]}>
      <Text style={styles.rowText} numberOfLines={1}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: "rgba(255,255,255,0.10)", borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)", borderRadius: 12, overflow: "hidden" },
  wheel: { height: WHEEL_H, width: "100%" },
  row: { position: "absolute", top: (WHEEL_H - ROW_H) / 2, left: 0, right: 0,
    height: ROW_H, alignItems: "center", justifyContent: "center" },
  rowText: { color: "#ffffff", fontSize: 17, fontWeight: "500", paddingHorizontal: 12 },
  band: { position: "absolute", top: (WHEEL_H - ROW_H) / 2, left: 8, right: 8,
    height: ROW_H, borderRadius: 8, borderWidth: 1,
    borderColor: "rgba(196,181,253,0.5)", backgroundColor: "rgba(167,139,250,0.10)" },
  caption: { color: "#ddd6fe", fontSize: 13, textAlign: "center",
    paddingBottom: 8, paddingHorizontal: 12 },
});

export default Dial;
