import React, { forwardRef, useImperativeHandle } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing, runOnJS, useAnimatedReaction, useAnimatedStyle,
  useSharedValue, withSequence, withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export const ITEM_H = 42;
const VISIBLE = 5;
const WHEEL_H = ITEM_H * VISIBLE;

export type DialHandle = {
  spinTo: (index: number, delayMs?: number, onLand?: () => void) => void;
  currentIndex: () => number;
};

type Props = {
  items: string[];
  label: string;
  initialIndex?: number;
  onSettle?: (index: number) => void;
};

// Cyclic wheel: offset is unbounded; item position wraps modulo total height.
const Dial = forwardRef<DialHandle, Props>(function Dial(
  { items, label, initialIndex = 0, onSettle },
  ref,
) {
  const n = items.length;
  const total = n * ITEM_H;
  const offset = useSharedValue(initialIndex * ITEM_H);
  const lastTick = useSharedValue(initialIndex);
  const startOffset = useSharedValue(0);

  const settledIndex = () =>
    ((Math.round(offset.value / ITEM_H) % n) + n) % n;

  const notifySettle = () => onSettle && onSettle(settledIndex());

  useImperativeHandle(ref, () => ({
    currentIndex: settledIndex,
    spinTo: (index, delayMs = 0, onLand) => {
      const current = offset.value;
      const base = Math.ceil(current / total) * total;
      // travel: 3 extra full revolutions, then land on index
      const target = base + total * 3 + index * ITEM_H;
      const land = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        notifySettle();
        onLand && onLand();
      };
      setTimeout(() => {
        offset.value = withSequence(
          withTiming(current + total * 0.5, {
            duration: 250, easing: Easing.in(Easing.quad),
          }),
          withTiming(target, {
            duration: 1900, easing: Easing.out(Easing.cubic),
          }),
          withTiming(target - ITEM_H * 0.35, {
            duration: 140, easing: Easing.out(Easing.quad),
          }),
          withTiming(target, { duration: 220, easing: Easing.out(Easing.quad) },
            (finished) => { if (finished) runOnJS(land)(); }),
        );
      }, delayMs);
    },
  }));

  // haptic tick per detent while moving
  useAnimatedReaction(
    () => Math.round(offset.value / ITEM_H),
    (row, prev) => {
      if (prev !== null && row !== prev) {
        lastTick.value = row;
        runOnJS(Haptics.selectionAsync)();
      }
    },
  );

  const pan = Gesture.Pan()
    .onBegin(() => { startOffset.value = offset.value; })
    .onChange((e) => { offset.value = startOffset.value - e.translationY; })
    .onEnd((e) => {
      const projected = offset.value - e.velocityY * 0.18;
      const target = Math.round(projected / ITEM_H) * ITEM_H;
      offset.value = withTiming(target,
        { duration: 500, easing: Easing.out(Easing.cubic) },
        (finished) => { if (finished) runOnJS(notifySettle)(); });
    });

  return (
    <View style={styles.col}>
      <Text style={styles.label}>{label}</Text>
      <GestureDetector gesture={pan}>
        <View style={styles.wheel}>
          {items.map((item, i) => (
            <Row key={i} index={i} text={item} offset={offset}
              n={n} total={total} />
          ))}
          <View pointerEvents="none" style={styles.centerBand} />
        </View>
      </GestureDetector>
    </View>
  );
});

function Row({ index, text, offset, n, total }: {
  index: number; text: string;
  offset: Animated.SharedValue<number>; n: number; total: number;
}) {
  const style = useAnimatedStyle(() => {
    // wrapped distance from wheel center, in px
    let d = ((index * ITEM_H - offset.value) % total + total * 1.5) % total
      - total / 2;
    const half = (ITEM_H * VISIBLE) / 2;
    const clamped = Math.max(-half, Math.min(half, d));
    const angle = (clamped / half) * 68; // degrees
    const hidden = Math.abs(d) > half + ITEM_H;
    return {
      opacity: hidden ? 0 : 1 - Math.abs(clamped) / (half * 1.25),
      transform: [
        { translateY: clamped },
        { perspective: 420 },
        { rotateX: `${-angle}deg` },
        { scale: 1 - Math.abs(clamped) / (half * 3.2) },
      ],
    };
  });
  return (
    <Animated.View style={[styles.row, style]}>
      <Text style={styles.rowText} numberOfLines={1}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  col: { flex: 1, alignItems: "center" },
  label: { color: "#c4b5fd", fontSize: 13, fontWeight: "600",
    marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 },
  wheel: { height: WHEEL_H, width: "100%", overflow: "hidden",
    justifyContent: "center" },
  row: { position: "absolute", top: (WHEEL_H - ITEM_H) / 2, left: 0,
    right: 0, height: ITEM_H, alignItems: "center",
    justifyContent: "center" },
  rowText: { color: "#f5f3ff", fontSize: 17, fontWeight: "500" },
  centerBand: { position: "absolute", top: (WHEEL_H - ITEM_H) / 2,
    left: 4, right: 4, height: ITEM_H, borderRadius: 10,
    borderWidth: 1, borderColor: "rgba(196,181,253,0.45)",
    backgroundColor: "rgba(139,92,246,0.12)" },
});

export default Dial;
