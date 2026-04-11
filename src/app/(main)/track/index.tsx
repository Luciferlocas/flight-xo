import { ThemedText } from "@/components/themed-text";
import SearchFlightCode from "@/components/track/search";
import { commonStyles } from "@/constants/style";
import { StyleSheet, View } from "react-native";

export default function TrackScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.empty} />
        <View>
          <ThemedText style={styles.title}>Track Flight Status</ThemedText>
        </View>
        <View style={styles.empty} />
      </View>
      <View style={commonStyles.dashLine} />
      <SearchFlightCode />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
  },
  empty: {
    width: 48,
    height: 48,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  icon: {
    borderRadius: 50,
    padding: 12,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#000000",
  },
});
