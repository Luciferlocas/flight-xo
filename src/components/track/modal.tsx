import { ThemedText } from "@/components/themed-text";
import { Spinner } from "@/components/ui/spinner";
import { commonStyles } from "@/constants/style";
import { useDebounce } from "@/hooks/use-debounce";
import { TrackService } from "@/service";
import { getShortDate } from "@/utils/date";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (airport: any) => void;
}

export function TrackModal({ visible, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebounce(
    async (val: string) => {
      if (val.length > 1) {
        setLoading(true);
        const response = await TrackService.searchFlightNumber({ query: val });
        if (response.success) {
          setResults(response.data || []);
        }
        setLoading(false);
      } else {
        setResults([]);
      }
    },
    500,
    []
  );

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  return (
    <Modal animationType="slide" visible={visible} transparent={false}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <ArrowLeft size={28} color="#000" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>
            Search Flight Number or Airline
          </ThemedText>
        </View>

        <View style={commonStyles.dashLine} />

        <View style={styles.searchSection}>
          <TextInput
            autoFocus
            style={styles.searchInput}
            placeholder="Search city/airport/flight number..."
            value={query}
            onChangeText={setQuery}
            placeholderTextColor="#aeaeae"
            autoCapitalize="characters"
          />
          {loading && <Spinner />}
        </View>

        <View style={commonStyles.dashLine} />

        <FlatList
          data={results}
          renderItem={({ item, index }) => (
            <View key={item.value._id}>
              <TouchableOpacity
                style={[
                  styles.resultItem,
                  index % 2 === 1 && { backgroundColor: "white" },
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={[commonStyles.flexRow, { gap: 8, marginBottom: 4 }]}
                  >
                    <ThemedText style={styles.name}>
                      {item.value._source.carrierName}
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
              </TouchableOpacity>
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
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: "#EAEAE2" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  backButton: {
    borderRadius: "100%",
    padding: 12,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#000000",
  },
  headerTitle: { fontSize: 16, fontWeight: "bold", color: "#000" },
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
