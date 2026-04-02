import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plane, ArrowLeft } from "lucide-react-native";
import { ThemedText } from "@/components/themed-text";
import { Spinner } from "@/components/ui/spinner";
import { FlightService } from "@/service";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (airport: any) => void;
  title: string;
}

export function SearchModal({
  visible,
  onClose,
  onSelect,
  title,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebounce(
    async (val: string) => {
      if (val.length > 2) {
        setLoading(true);
        const response = await FlightService.searchAirports({ query: val });
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
          <ThemedText style={styles.headerTitle}>{title}</ThemedText>
        </View>

        <View style={styles.dashLine} />

        <View style={styles.searchSection}>
          <TextInput
            autoFocus
            style={styles.searchInput}
            placeholder="Search city or airport..."
            value={query}
            onChangeText={setQuery}
            placeholderTextColor="#aeaeae"
          />
          {loading && <Spinner />}
        </View>

        <View style={styles.dashLine} />

        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ index, item }) => (
            <TouchableOpacity
              style={[
                styles.resultItem,
                index % 2 === 1 && { backgroundColor: "white" },
              ]}
              onPress={() => {
                onSelect(item);
                onClose();
                setQuery("");
              }}
            >
              <View style={styles.iconCircle}>
                <Plane size={20} color="#000" />
              </View>
              <View style={styles.textContainer}>
                <ThemedText style={styles.airportName} numberOfLines={1}>
                  {item.airport}
                </ThemedText>
                <ThemedText style={styles.cityText}>
                  {item.city}, {item.country}
                </ThemedText>
              </View>
              <ThemedText style={styles.iataCode}>{item.iata}</ThemedText>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() =>
            !loading && query.length > 2 ? (
              <ThemedText style={styles.emptyText}>
                No airports found.
              </ThemedText>
            ) : null
          }
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
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#000" },
  dashLine: { width: "100%", borderBottomWidth: 2, borderStyle: "dashed" },
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderStyle: "dashed",
    borderColor: "#000000",
  },
  iconCircle: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  textContainer: { flex: 1, marginHorizontal: 16 },
  airportName: { fontSize: 16, fontWeight: "bold", color: "#000" },
  cityText: { fontSize: 14, color: "#767676ff" },
  iataCode: { fontSize: 18, fontWeight: "800", color: "#091c31" },
  emptyText: { textAlign: "center", marginTop: 40, color: "#aeaeae" },
});
