import { TextInput, View, StyleSheet, Pressable, FlatList } from "react-native";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";
import { commonStyles } from "@/constants/style";
import { ThemedText } from "../themed-text";
import { useDebounce } from "@/hooks/use-debounce";
import { TrackService } from "@/service";
import { FlightNumber } from "@/schema/track/index.types";
import { useTrack } from "@/store";
import { getShortDate } from "@/utils/date";

export default function SearchFlightCode({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FlightNumber[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { setFlightNumber } = useTrack();

  const handleSearch = useDebounce(
    async (val: string) => {
      if (val.trim().length > 1) {
        setLoading(true);
        setHasSearched(true);
        const response = await TrackService.searchFlightNumber({ query: val });
        if (response.success && response.data) {
          setResults(response.data);
        }
        setLoading(false);
      } else {
        setResults([]);
        setHasSearched(false);
      }
    },
    500,
    []
  );

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const handleSelect = (flight: FlightNumber) => {
    const source = flight.value._source;

    setFlightNumber({
      flightId: source.flightId,
      airline: source.carrierIata,
      flightNumber: source.flightNumber,
      limit: null,
    });

    onClose();
  };

  return (
    <View>
      <View style={styles.searchSection}>
        <TextInput
          autoFocus
          style={styles.searchInput}
          placeholder="Search flight number (e.g. 6E 399)"
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#aeaeae"
          autoCapitalize="characters"
        />
        {loading && <Spinner />}
      </View>

      <View style={commonStyles.dashLine} />

      {hasSearched && (
        <FlatList
          style={styles.listContainer}
          data={results}
          renderItem={({ item }) => (
            <View key={item.value._id}>
              <Pressable
                style={styles.resultItem}
                onPress={() => handleSelect(item)}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={[commonStyles.flexRow, { gap: 8, marginBottom: 4 }]}
                  >
                    <ThemedText style={styles.name}>
                      {item.value._source.carrierName}{" "}
                      {item.value._source.flightNumber}
                    </ThemedText>
                    <ThemedText style={styles.status}>
                      {item.value._source.status.charAt(0) +
                        item.value._source.status.slice(1).toLowerCase()}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.date}>
                    {getShortDate(
                      new Date(item.value._source.departureDateTime)
                    )}
                  </ThemedText>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <ThemedText style={styles.ident}>
                    {item.value._source.carrierIata}
                    {item.value._source.flightNumber}
                  </ThemedText>
                  <ThemedText style={[styles.date, { fontSize: 12 }]}>
                    {item.value._source.tailNumber || "No Tail"}
                  </ThemedText>
                </View>
              </Pressable>
              <View style={commonStyles.dashLine} />
            </View>
          )}
          keyExtractor={(item) => item.value._id}
          ListEmptyComponent={
            !loading ? (
              <View style={styles.noResult}>
                <ThemedText style={styles.noResultText}>
                  No flights found
                </ThemedText>
              </View>
            ) : null
          }
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  searchInput: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    paddingVertical: 24,
    flex: 1,
  },
  listContainer: {
    maxHeight: 300,
  },
  resultItem: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noResult: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  noResultText: {
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "italic",
    color: "#909090ff",
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
  },
  ident: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
    color: "#070707ff",
    backgroundColor: "#ffd900ff",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  date: {
    fontSize: 14,
    fontWeight: "600",
    color: "#464646ff",
  },
});
