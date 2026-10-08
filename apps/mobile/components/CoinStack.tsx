import React, { useEffect, useMemo, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Platform, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";

/**
 * Post-quiz reward: gold coins dropping onto a stack, casino style, while the
 * exact amount counts up. Two seconds end to end.
 *
 * The number of discs is proportional to the share of the unit's maximum that
 * was earned (1-10 discs), so 34/34 at Beginner and 20/20 at Intermediate both
 * read as a full stack. The figure is always the exact amount.
 *
 * Reduce Motion: no drops, the full stack and final figure appear at once.
 */

const DURATION = 2000;
const MAX_DISCS = 10;
const DISC_STEP = 7;

type Props = {
  earned: number;
  unitMax: number;
  balance: number;
  /** Coins this unit had already paid before, when the quiz was a retake. */
  previousBest?: number;
};

export default function CoinStack({ earned, unitMax, balance, previousBest }: Props) {
  const discs = earned > 0 ? Math.max(1, Math.min(MAX_DISCS, Math.round((earned / Math.max(1, unitMax)) * MAX_DISCS))) : 0;
  const anims = useRef(Array.from({ length: MAX_DISCS }, () => new Animated.Value(0))).current;
  const count = useRef(new Animated.Value(0)).current;
  const [shown, setShown] = useState(0);
  const jitter = useMemo(() => Array.from({ length: MAX_DISCS }, () => Math.round(Math.random() * 6 - 3)), []);

  useEffect(() => {
    if (earned <= 0) return;
    let cancelled = false;
    const id = count.addListener(({ value }) => setShown(Math.round(value)));

    AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
      if (cancelled) return;
      if (reduce) {
        anims.forEach((a) => a.setValue(1));
        count.setValue(earned);
        return;
      }
      const per = DURATION / (discs + 1);
      const drops = anims.slice(0, discs).map((a, i) =>
        Animated.timing(a, {
          toValue: 1, duration: per * 1.4, delay: i * per,
          easing: Easing.bounce, useNativeDriver: true,
        }));
      drops.forEach((d, i) => d.start(() => {
        if (!cancelled && Platform.OS !== "web") {
          Haptics.impactAsync(i === discs - 1 ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        }
      }));
      Animated.timing(count, {
        toValue: earned, duration: DURATION, easing: Easing.out(Easing.cubic), useNativeDriver: false,
      }).start();
    });

    return () => { cancelled = true; count.removeListener(id); };
  }, [earned]);

  if (earned <= 0) {
    return (
      <View style={styles.wrap} accessible accessibilityLabel={`No new coins. Balance ${balance} coins.`}>
        <Text style={styles.none}>No new coins this time</Text>
        <Text style={styles.sub}>
          {previousBest !== undefined ? `Your best on this unit already earned ${previousBest} of ${unitMax}. Beat it to earn the difference.` : ""}
        </Text>
        <Text style={styles.balance}>🪙 Balance: {balance}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap} accessible accessibilityLabel={`You earned ${earned} coins. Balance ${balance} coins.`}>
      <View style={[styles.stage, { height: 30 + discs * DISC_STEP }]}>
        {anims.slice(0, discs).map((a, i) => (
          <Animated.View key={i} style={[styles.disc, {
            bottom: i * DISC_STEP,
            opacity: a.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 1, 1] }),
            transform: [
              { translateX: jitter[i] },
              { translateY: a.interpolate({ inputRange: [0, 1], outputRange: [-160, 0] }) },
            ],
          }]}>
            <View style={styles.discRim} />
          </Animated.View>
        ))}
      </View>
      <Text style={styles.amount}>+{shown} {shown === 1 ? "coin" : "coins"}</Text>
      {previousBest !== undefined && previousBest > 0 && (
        <Text style={styles.sub}>Improvement on your best for this unit</Text>
      )}
      <Text style={styles.balance}>🪙 Balance: {balance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", marginVertical: 12 },
  stage: { width: 90, justifyContent: "flex-end", alignItems: "center", marginBottom: 8 },
  disc: {
    position: "absolute", width: 64, height: 18, borderRadius: 32,
    backgroundColor: "#F5C518", borderWidth: 2, borderColor: "#B8860B",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#7A5A00", shadowOpacity: 0.35, shadowRadius: 1.5, shadowOffset: { width: 0, height: 2 },
  },
  discRim: { width: 44, height: 7, borderRadius: 22, borderWidth: 1, borderColor: "#FFE27A" },
  amount: { color: "#B8860B", fontSize: 28, fontWeight: "800", fontVariant: ["tabular-nums"] },
  none: { color: "#5A6472", fontSize: 17, fontWeight: "600" },
  sub: { color: "#5A6472", fontSize: 13, textAlign: "center", marginTop: 2, maxWidth: 280 },
  balance: { color: "#3A4354", fontSize: 15, fontWeight: "600", marginTop: 6 },
});
