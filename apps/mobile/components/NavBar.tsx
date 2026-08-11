import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type TabKey = "home" | "courses" | "vocab" | "journey";

const TABS: { key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap; path: string }[] = [
  { key: "home", label: "Home", icon: "home-outline", path: "/" },
  { key: "courses", label: "Courses", icon: "book-outline", path: "/mini-courses" },
  { key: "vocab", label: "Vocab", icon: "library-outline", path: "/vocabulary" },
  { key: "journey", label: "Journey", icon: "compass-outline", path: "/journey" },
];

type Props = {
  variant?: "dark" | "neutral";
  active?: TabKey | null;
  badgeJourney?: number;
};

export default function NavBar({ variant = "dark", active = null, badgeJourney = 0 }: Props) {
  const pathname = usePathname();
  const go = (path: string) => {
    if (pathname === path) return;
    if (path === "/") router.dismissAll ? router.replace("/") : router.replace("/");
    else router.push(path as any);
  };
  const dark = variant === "dark";
  return (
    <View style={[styles.wrap, dark ? styles.wrapDark : styles.wrapNeutral]}>
      {TABS.map((t) => {
        const isActive = dark && active === t.key;
        const color = dark ? (isActive ? "#FFFFFF" : "#9DB4F5") : "#98A4B8";
        return (
          <Pressable key={t.key} onPress={() => go(t.path)}
            style={[styles.tab, isActive && styles.tabActive]}>
            <View>
              <Ionicons name={t.icon} size={19} color={color} />
              {t.key === "journey" && badgeJourney > 0 && (
                <View style={styles.badge}><Text style={styles.badgeText}>{badgeJourney}</Text></View>
              )}
            </View>
            <Text style={[styles.label, { color, fontWeight: isActive ? "700" : "600" }]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "absolute", bottom: 14, left: 14, right: 14, borderRadius: 24,
    flexDirection: "row", justifyContent: "space-around", alignItems: "center",
    paddingVertical: 8, paddingHorizontal: 6,
    shadowColor: "#000", shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    elevation: 8 },
  wrapDark: { backgroundColor: "#2C4194", borderWidth: 1, borderColor: "#5B77D6" },
  wrapNeutral: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E3E6EA",
    shadowOpacity: 0.12, opacity: 0.95 },
  tab: { alignItems: "center", paddingVertical: 4, paddingHorizontal: 12, borderRadius: 16 },
  tabActive: { backgroundColor: "#4A78F2" },
  label: { fontSize: 10, marginTop: 1 },
  badge: { position: "absolute", top: -4, right: -8, backgroundColor: "#EC9A9A",
    borderRadius: 8, paddingHorizontal: 4, minWidth: 14, alignItems: "center" },
  badgeText: { color: "#FFFFFF", fontSize: 8, fontWeight: "700" },
});
