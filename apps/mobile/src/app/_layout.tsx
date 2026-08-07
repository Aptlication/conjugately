import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
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
