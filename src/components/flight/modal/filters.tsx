import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useSearch } from "@/store";
import { ThemedText } from "@/components/themed-text";
import { X } from "lucide-react-native";
import { commonStyles } from "@/constants/style";
import { PassengerCounter } from "@/components/search/form";

export const FilterModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { filter, passengers, setFilter, setPassengers } = useSearch();
  const [localFilter, setLocalFilter] = useState(filter);
  const [localPassengers, setLocalPassengers] = useState(passengers);

  const handleApply = () => {
    setPassengers(localPassengers);
    setFilter(localFilter);
    onClose();
  };

  const handleReset = () => {
    setLocalFilter({
      stops: "",
      departureTime: "",
      arrivalTime: "",
      duration: "",
      price: "",
      airlines: [],
      flightClass: "",
    });
    onClose();
  };

  const handleClose = () => {
    setLocalFilter(filter);
    onClose();
  };

  const airlines = [
    {
      name: "Indigo",
      price: "₹10,000",
    },
    {
      name: "Vistara",
      price: "₹12,000",
    },
    {
      name: "Air India",
      price: "₹15,000",
    },
    {
      name: "SpiceJet",
      price: "₹8,000",
    },
  ];

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleClose}>
            <X size={28} color="#000" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Filters</ThemedText>
        </View>
        <View style={commonStyles.dashLine} />

        <ScrollView style={styles.filters} showsVerticalScrollIndicator={false}>
          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Passengers</ThemedText>
            <View>
              <View style={commonStyles.dashLine} />
              <PassengerCounter
                passengers={localPassengers}
                setPassengers={setLocalPassengers}
              />
            </View>
          </View>

          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Stops</ThemedText>
            <View>
              <View style={commonStyles.dashLine} />
              <View style={[commonStyles.flexRow]}>
                {["Non stop", "1 Stop", "2+ Stops"].map((item, index) => (
                  <>
                    <Pressable
                      key={item + index}
                      style={[
                        styles.button,
                        localFilter.stops === item && styles.selected,
                      ]}
                      onPress={() =>
                        setLocalFilter({ ...localFilter, stops: item })
                      }
                    >
                      <ThemedText style={styles.filterLabel}>{item}</ThemedText>
                    </Pressable>
                    {index !== 2 && (
                      <View style={commonStyles.dashLineVertical} />
                    )}
                  </>
                ))}
              </View>
            </View>
          </View>

          <View style={commonStyles.dashLine} />

          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Departure Time</ThemedText>
            <View>
              <View style={commonStyles.dashLine} />
              <View style={[commonStyles.flexRow]}>
                <Pressable
                  style={[
                    styles.button,
                    localFilter.departureTime === "Morning" && styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({ ...localFilter, departureTime: "Morning" })
                  }
                >
                  <ThemedText style={styles.filterLabel}>Morning</ThemedText>
                </Pressable>
                <View style={commonStyles.dashLineVertical} />
                <Pressable
                  style={[
                    styles.button,
                    localFilter.departureTime === "Afternoon" &&
                    styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({
                      ...localFilter,
                      departureTime: "Afternoon",
                    })
                  }
                >
                  <ThemedText style={styles.filterLabel}>Afternoon</ThemedText>
                </Pressable>
              </View>

              <View style={commonStyles.dashLine} />
              <View style={[commonStyles.flexRow]}>
                <Pressable
                  style={[
                    styles.button,
                    localFilter.departureTime === "Evening" && styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({ ...localFilter, departureTime: "Evening" })
                  }
                >
                  <ThemedText style={styles.filterLabel}>Evening</ThemedText>
                </Pressable>
                <View style={commonStyles.dashLineVertical} />
                <Pressable
                  style={[
                    styles.button,
                    localFilter.departureTime === "Night" && styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({ ...localFilter, departureTime: "Night" })
                  }
                >
                  <ThemedText style={styles.filterLabel}>Night</ThemedText>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={commonStyles.dashLine} />

          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Arrival Time</ThemedText>
            <View>
              <View style={commonStyles.dashLine} />
              <View style={[commonStyles.flexRow]}>
                <Pressable
                  style={[
                    styles.button,
                    localFilter.arrivalTime === "Morning" && styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({ ...localFilter, arrivalTime: "Morning" })
                  }
                >
                  <ThemedText style={styles.filterLabel}>Morning</ThemedText>
                </Pressable>
                <View style={commonStyles.dashLineVertical} />
                <Pressable
                  style={[
                    styles.button,
                    localFilter.arrivalTime === "Afternoon" && styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({ ...localFilter, arrivalTime: "Afternoon" })
                  }
                >
                  <ThemedText style={styles.filterLabel}>Afternoon</ThemedText>
                </Pressable>
              </View>

              <View style={commonStyles.dashLine} />
              <View style={[commonStyles.flexRow]}>
                <Pressable
                  style={[
                    styles.button,
                    localFilter.arrivalTime === "Evening" && styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({ ...localFilter, arrivalTime: "Evening" })
                  }
                >
                  <ThemedText style={styles.filterLabel}>Evening</ThemedText>
                </Pressable>
                <View style={commonStyles.dashLineVertical} />
                <Pressable
                  style={[
                    styles.button,
                    localFilter.arrivalTime === "Night" && styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({ ...localFilter, arrivalTime: "Night" })
                  }
                >
                  <ThemedText style={styles.filterLabel}>Night</ThemedText>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={commonStyles.dashLine} />

          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Class</ThemedText>
            <View>
              <View style={commonStyles.dashLine} />
              <View style={[commonStyles.flexRow]}>
                <Pressable
                  style={[
                    styles.button,
                    localFilter.flightClass === "E" && styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({ ...localFilter, flightClass: "E" })
                  }
                >
                  <ThemedText style={styles.filterLabel}>Economy</ThemedText>
                </Pressable>
                <View style={commonStyles.dashLineVertical} />
                <Pressable
                  style={[
                    styles.button,
                    localFilter.flightClass === "P" &&
                    styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({
                      ...localFilter,
                      flightClass: "P",
                    })
                  }
                >
                  <ThemedText style={styles.filterLabel}>
                    Premium Eco
                  </ThemedText>
                </Pressable>
                <View style={commonStyles.dashLineVertical} />
                <Pressable
                  style={[
                    styles.button,
                    localFilter.flightClass === "B" && styles.selected,
                  ]}
                  onPress={() =>
                    setLocalFilter({ ...localFilter, flightClass: "B" })
                  }
                >
                  <ThemedText style={styles.filterLabel}>Business</ThemedText>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={commonStyles.dashLine} />

          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Airlines</ThemedText>
            <View>
              <View style={commonStyles.dashLine} />
              <View>
                {airlines.map((airline, index) => (
                  <>
                    <Pressable
                      key={airline.name}
                      style={[
                        styles.button,
                        styles.airline,
                        localFilter.airlines.includes(airline.name) &&
                        styles.selected,
                      ]}
                      onPress={() =>
                        setLocalFilter({
                          ...localFilter,
                          airlines: [...localFilter.airlines, airline.name],
                        })
                      }
                    >
                      <ThemedText style={styles.filterLabel}>
                        {airline.name}
                      </ThemedText>
                      <ThemedText style={styles.airlinePrice}>
                        {airline.price}
                      </ThemedText>
                    </Pressable>
                    {airlines.length - 1 !== index && (
                      <View style={commonStyles.dashLine} />
                    )}
                  </>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={commonStyles.dashLine} />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <ThemedText style={styles.buttonText}>Reset</ThemedText>
          </TouchableOpacity>
          <View style={commonStyles.dashLineVertical} />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FFD700" }]}
            onPress={handleApply}
          >
            <ThemedText style={styles.buttonText}>Apply</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

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
  filters: {
    flex: 1,
  },
  filterTitle: {
    paddingHorizontal: 12,
    fontSize: 18,
    fontWeight: "900",
    color: "white",
    backgroundColor: "#091c31",
    paddingVertical: 12,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
  },
  filterSection: {},
  airline: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selected: {
    backgroundColor: "#FFD700",
  },
  airlinePrice: {
    fontSize: 16,
    color: "#000",
  },
});
