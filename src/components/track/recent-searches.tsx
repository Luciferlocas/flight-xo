import { FlightNumber } from "@/schema/track/index.types";
import { ArrowRight } from "lucide-react-native"
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { commonStyles } from "@/constants/style";
import { storage } from "@/utils/storage";

export const RECENT_SEARCHES_KEY = "RECENT_SEARCHES_FLIGHT_TRACK";

interface RecentSearchesProps {
  onSelect: (flight: FlightNumber) => void;
}

export default function RecentSearches({ onSelect }: RecentSearchesProps) {
  const data = storage.getString(RECENT_SEARCHES_KEY);
  const recentSearches: FlightNumber[] = data ? JSON.parse(data) : [];

  if (recentSearches.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>No recent searches found.</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recentSearches}
        renderItem={({ item, index }) => (
          <View style={index % 2 !== 0 && { backgroundColor: "white" }}>
            <Pressable
              onPress={() => onSelect(item)}
              style={styles.place}
            >
              <View>
                <ThemedText style={styles.placeIata}>
                  {item.value._source.carrierIata}
                  {item.value._source.flightNumber}
                </ThemedText>
                <ThemedText style={styles.placeCity}>
                  {item.value._source.carrierName}
                </ThemedText>
              </View>
              <View style={styles.rightSection}>
                <View style={[commonStyles.flexRow, { gap: 4 }]}>
                  <ThemedText style={styles.placeIata}>
                    {item.objectLabel.secondaryResultText.primary.first}
                  </ThemedText>
                  <ArrowRight size={14} color="#000" />
                  <ThemedText style={styles.placeIata}>
                    {item.objectLabel.secondaryResultText.secondary.first}
                  </ThemedText>
                </View>
                <ThemedText style={styles.placeCity}>
                  {item.objectLabel.searchSubText}
                </ThemedText>
              </View>
            </Pressable>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={commonStyles.dashLine} />}
        keyExtractor={(item, index) => `${item.value._source.flightId}-${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  place: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeIata: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  placeCity: {
    fontSize: 12,
    color: "#3d3d3dff",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  emptyContainer: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#aeaeae",
  },
});
