import { CircleUserRound, Map, Search, Tickets } from "lucide-react-native";
import { RelativePathString, usePathname, useRouter } from "expo-router";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

export default function NavTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (name: string) => pathname.endsWith(name);

  const tabs = [
    { name: "Search", icon: Search, route: "/" },
    { name: "Track", icon: Map, route: "/track" },
    { name: "Tickets", icon: Tickets, route: "/tickets" },
    { name: "Profile", icon: CircleUserRound, route: "/profile" },
  ];

  return (
    <View style={styles.tabContainer}>
      <View style={styles.dashLine} />

      <View style={styles.tabWrapper}>
        {tabs.map((tab) => (
          <View key={tab.name} style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => router.replace(tab.route as RelativePathString)}
              style={[
                styles.tabButton,
                isActive(tab.route) && styles.activeTab,
              ]}
            >
              <tab.icon size={24} color="#000" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: "white",
  },
  tabWrapper: {
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "space-around",
  },
  buttonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: 12,
    aspectRatio: 1,
  },
  activeTab: {
    backgroundColor: "#FFD700",
    borderRadius: width,
    borderStyle: "dashed",
    borderWidth: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  dashLine: {
    width: width,
    borderTopWidth: 2,
    borderStyle: "dashed",
    borderColor: "#000",
  },
});
