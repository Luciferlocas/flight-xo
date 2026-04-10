import NavTabs from "@/components/nav";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainLayout() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <Slot />
      </View>
      <NavTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAE2",
  },
  content: {
    flex: 1,
  },
});
