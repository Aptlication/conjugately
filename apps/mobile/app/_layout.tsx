import { useEffect } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configurePurchases } from "../lib/pro";

export default function Layout() {
  // Configure the store SDK once, before any screen asks for an entitlement.
  useEffect(() => { configurePurchases(); }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{
        headerStyle: { backgroundColor: "#1e1b4b" },
        headerTintColor: "#f5f3ff",
        contentStyle: { backgroundColor: "#1e1b4b" },
      }} />
    </GestureHandlerRootView>
  );
}
