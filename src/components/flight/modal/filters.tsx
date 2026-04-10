import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, Fragment } from "react";
import { useSearch } from "@/store";
import { ThemedText } from "@/components/themed-text";
import { X } from "lucide-react-native";
import { commonStyles } from "@/constants/style";
import { PassengerCounter } from "@/components/search/form";
import { getAirlines } from "@/utils/filter";
import { getAirlineLogo } from "@/utils/flight";
import { Spinner } from "@/components/ui/spinner";
import { FlightService } from "@/service";
import { getFormattedDate } from "@/utils/date";

export const FilterModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const {
    filter,
    passengers,
    flights,
    from,
    to,
    date,
    tripType,
    deviceId,
    setFilter,
    setPassengers,
    setFlights,
  } = useSearch();
  const [localFilter, setLocalFilter] = useState(filter);
  const [localPassengers, setLocalPassengers] = useState(passengers);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    setLoading(true);
    try {
      setPassengers(localPassengers);
      setFilter(localFilter);
      const res = await FlightService.searchFlights({
        origin: from.iata,
        destination: to.iata,
        departureDate: getFormattedDate(date.departure),
        ...(tripType === "roundTrip" && {
          returnDate: getFormattedDate(date.return),
        }),
        adults: localPassengers.adults,
        children: localPassengers.children,
        infants: localPassengers.infants,
        flightClass: localFilter.flightClass,
        deviceId,
      });
      if (res.success && res.data) setFlights(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleReset = () => {
    setLocalFilter({
      sortBy: "price",
      stops: "",
      departureTime: "",
      arrivalTime: "",
      airlines: [],
      flightClass: "E",
    });
    setLocalPassengers({ adults: 1, children: 0, infants: 0 });
  };

  const handleSelectAirline = (airline: string) => {
    setLocalFilter({
      ...localFilter,
      airlines: localFilter.airlines.includes(airline)
        ? localFilter.airlines.filter((a) => a !== airline)
        : [...localFilter.airlines, airline],
    });
  };

  const FilterGroup = ({
    title,
    options,
    value,
    field,
    formatLabel = (s: string) => s,
  }: any) => (
    <View style={styles.filterSection}>
      <ThemedText style={styles.filterTitle}>{title}</ThemedText>
      <View style={commonStyles.dashLine} />
      <View style={commonStyles.flexRow}>
        {options.map((item: string, index: number) => (
          <Fragment key={item}>
            <Pressable
              style={[styles.button, value === item && styles.selected]}
              onPress={() => setLocalFilter({ ...localFilter, [field]: item })}
            >
              <ThemedText style={styles.filterLabel}>
                {formatLabel(item)}
              </ThemedText>
            </Pressable>
            {index !== options.length - 1 && (
              <View style={commonStyles.dashLineVertical} />
            )}
          </Fragment>
        ))}
      </View>
    </View>
  );

  const TimeGroup = ({
    title,
    field,
  }: {
    title: string;
    field: "departureTime" | "arrivalTime";
  }) => {
    const slots = [
      { label: "Morning", range: "06:00 - 12:00" },
      { label: "Afternoon", range: "12:00 - 18:00" },
      { label: "Evening", range: "18:00 - 00:00" },
      { label: "Night", range: "00:00 - 06:00" },
    ];

    const handleSelectTime = (time: string) => {
      setLocalFilter({
        ...localFilter,
        [field]: localFilter[field] === time ? "" : time,
      });
    };

    return (
      <View style={styles.filterSection}>
        <ThemedText style={styles.filterTitle}>{title}</ThemedText>
        <View style={commonStyles.dashLine} />
        {[0, 2].map((startIndex) => (
          <Fragment key={startIndex}>
            <View style={commonStyles.flexRow}>
              {slots.slice(startIndex, startIndex + 2).map((slot, idx) => (
                <Fragment key={slot.label}>
                  <Pressable
                    style={[
                      styles.button,
                      { paddingVertical: 12 },
                      localFilter[field] === slot.label && styles.selected,
                    ]}
                    onPress={() => handleSelectTime(slot.label)}
                  >
                    <ThemedText style={styles.filterLabel}>
                      {slot.label}
                    </ThemedText>
                    <ThemedText style={styles.time}>{slot.range}</ThemedText>
                  </Pressable>
                  {idx === 0 && <View style={commonStyles.dashLineVertical} />}
                </Fragment>
              ))}
            </View>
            {startIndex === 0 && <View style={commonStyles.dashLine} />}
          </Fragment>
        ))}
      </View>
    );
  };

  const airlines = getAirlines(flights?.flights || []);

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setLocalFilter(filter);
              onClose();
            }}
          >
            <X size={28} color="#000" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Filters</ThemedText>
        </View>
        <View style={commonStyles.dashLine} />

        <ScrollView style={styles.filters} showsVerticalScrollIndicator={false}>
          <FilterGroup
            title="Sort By"
            field="sortBy"
            value={localFilter.sortBy}
            options={["price", "duration", "stops"]}
            formatLabel={(s: string) => s.charAt(0).toUpperCase() + s.slice(1)}
          />
          <View style={commonStyles.dashLine} />

          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Passengers</ThemedText>
            <View style={commonStyles.dashLine} />
            <PassengerCounter
              passengers={localPassengers}
              setPassengers={setLocalPassengers}
            />
          </View>

          <FilterGroup
            title="Stops"
            field="stops"
            value={localFilter.stops}
            options={["Non stop", "1 Stop", "2+ Stops"]}
          />
          <View style={commonStyles.dashLine} />
          <TimeGroup title="Departure Time" field="departureTime" />
          <View style={commonStyles.dashLine} />
          <TimeGroup title="Arrival Time" field="arrivalTime" />
          <View style={commonStyles.dashLine} />
          <FilterGroup
            title="Class"
            field="flightClass"
            value={localFilter.flightClass}
            options={["E", "P", "B"]}
            formatLabel={(s: string) =>
              s === "E" ? "Economy" : s === "P" ? "Premium Eco" : "Business"
            }
          />
          <View style={commonStyles.dashLine} />
          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Airlines</ThemedText>
            <View style={commonStyles.dashLine} />
            {airlines.map((airline, index) => (
              <Fragment key={airline.name}>
                <Pressable
                  style={[
                    styles.button,
                    styles.airline,
                    localFilter.airlines.includes(airline.name) &&
                      styles.selected,
                  ]}
                  onPress={() => handleSelectAirline(airline.name)}
                >
                  <View style={commonStyles.flexRow}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.airlineLogo}
                        source={{ uri: getAirlineLogo(airline.code) }}
                      />
                    </View>
                    <ThemedText style={styles.filterLabel}>
                      {airline.name}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.airlinePrice}>
                    ₹ {airline.price}
                  </ThemedText>
                </Pressable>
                {index !== airlines.length - 1 && (
                  <View style={commonStyles.dashLine} />
                )}
              </Fragment>
            ))}
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
            {loading ? (
              <Spinner />
            ) : (
              <ThemedText style={styles.buttonText}>Apply</ThemedText>
            )}
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
  time: {
    fontSize: 14,
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
  airlineLogo: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  imageContainer: {
    height: 28,
    width: 28,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#000",
    marginRight: 12,
  },
});
