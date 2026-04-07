import {
  DateInput,
  PassengerInput,
  PlaceInput,
  TripTypeInput,
} from "@/components/search/form";
import { ThemedText } from "@/components/themed-text";
import { Spinner } from "@/components/ui/spinner";
import { commonStyles } from "@/constants/style";
import { FlightService } from "@/service";
import { useSearch } from "@/store";
import { getFormattedDate } from "@/utils/date";
import { useRouter } from "expo-router";
import { BellIcon, Plane } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const {
    from,
    to,
    date,
    passengers,
    tripType,
    deviceId,
    flightClass,
    setFrom,
    setTo,
    setFlights,
    resetFilter,
  } = useSearch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    setLoading(true);
    resetFilter();
    try {
      const response = await FlightService.searchFlights({
        origin: from.iata,
        destination: to.iata,
        departureDate: getFormattedDate(date.departure),
        ...(tripType === "roundTrip" && {
          returnDate: getFormattedDate(date.return),
        }),
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants,
        flightClass,
        deviceId,
      });
      if (response.success && response.data) {
        setFlights(response.data);
        router.push("/flights");
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>FLIGHT-XO</ThemedText>
        <View style={styles.notification}>
          <BellIcon size={24} color="#000" />
        </View>
      </View>
      <View style={commonStyles.dashLine} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View>
          <TripTypeInput />
          <View style={styles.dividerContainer}>
            {[1, 2, 3, 4].map((i) => (
              <View key={i} style={commonStyles.dashLine} />
            ))}
          </View>
          <View>
            <PlaceInput date={from} set={setFrom} name="From" />
            <View style={commonStyles.dashLine} />
            <PlaceInput date={to} set={setTo} name="To" />
            <View style={commonStyles.dashLine} />
            <DateInput />
            <View style={commonStyles.dashLine} />
            <PassengerInput />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={loading}
              onPress={handleSearch}
              style={styles.searchButton}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <Plane size={20} color="#000" style={styles.buttonIcon} />
                  <ThemedText style={styles.searchText}>
                    Search Flight
                  </ThemedText>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={commonStyles.dashLine} />
        <View style={styles.pastTrips}>
          <ThemedText style={styles.pastTripsBadgeText}>Past Trips</ThemedText>
        </View>

        <View style={styles.pastTripsContainer}>
          <ThemedText style={styles.pastTripsText}>
            Past Trips will appear here
          </ThemedText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  notification: {
    borderRadius: width,
    padding: 12,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#000000",
  },
  dividerContainer: {
    width: "100%",
    gap: 6,
    backgroundColor: "#FFD700",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 16,
    marginVertical: 40,
    paddingHorizontal: 12,
  },
  searchButton: {
    flex: 2.5,
    flexDirection: "row",
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonIcon: {
    marginRight: 8,
  },
  searchText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  pastTrips: {
    marginTop: -16,
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: width,
  },
  pastTripsBadgeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  pastTripsContainer: {
    display: "flex",
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  pastTripsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#aeaeae",
    fontStyle: "italic",
  },
});
