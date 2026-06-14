import { commonStyles } from "@/constants/style";
import { FlightNumber } from "@/schema/track/index.types";
import { useTrack } from "@/store";
import { ArrowRight, Plane } from "lucide-react-native";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";
import { Spinner } from "../ui/spinner";
import { TrackModal } from "./modal";
import { useRouter } from "expo-router";
import { TrackService } from "@/service";
import { storage } from "@/utils/storage";
import RecentSearches, { RECENT_SEARCHES_KEY } from "./recent-searches";

export default function SearchFlightCode() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localSelected, setLocalSelected] = useState<FlightNumber | null>(null);
  const { setFlightData } = useTrack();
  const router = useRouter();

  const handleTrack = async () => {
    if (!localSelected) return;
    setLoading(true);
    const source = localSelected.value._source;

    const payload = {
      flightId: source.flightId,
      airline: source.carrierIata,
      flightNumber: source.flightNumber,
      limit: null,
    };

    try {
      try {
        const stored = storage.getString(RECENT_SEARCHES_KEY);
        let recentSearches: FlightNumber[] = stored ? JSON.parse(stored) : [];
        recentSearches = recentSearches.filter(
          (item) => item.value._source.flightId !== localSelected.value._source.flightId
        );
        recentSearches.unshift(localSelected);
        if (recentSearches.length > 5) {
          recentSearches = recentSearches.slice(0, 5);
        }
        storage.set(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
      } catch (e) {
        console.error("Failed to save to recent searches:", e);
      }

      const res = await TrackService.trackFlight(payload);

      if (res.success && res.data) {
        setFlightData(res.data);
        setLoading(false);
        router.push(`/track/${source.flightId}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("@/assets/images/flight-path.png")}
        />
      </View>

      <View style={commonStyles.dashLine} />

      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={styles.searchSection}
      >
        {localSelected ? (
          <View style={styles.place}>
            <View>
              <ThemedText style={styles.placeIata}>
                {localSelected.value._source.carrierIata}
                {localSelected.value._source.flightNumber}
              </ThemedText>
              <ThemedText style={styles.placeCity}>
                {localSelected.value._source.carrierName}
              </ThemedText>
            </View>
            <View>
              <View style={[commonStyles.flexRow, { gap: 4 }]}>
                <ThemedText style={styles.placeIata}>
                  {localSelected.objectLabel.secondaryResultText.primary.first}
                </ThemedText>
                <ArrowRight size={14} color="#000" />
                <ThemedText style={styles.placeIata}>
                  {
                    localSelected.objectLabel.secondaryResultText.secondary
                      .first
                  }
                </ThemedText>
              </View>
              <ThemedText style={styles.placeCity}>
                {localSelected.objectLabel.searchSubText}
              </ThemedText>
            </View>
          </View>
        ) : (
          <ThemedText style={styles.placeholder}>
            Search Flight Number or Airline
          </ThemedText>
        )}
      </TouchableOpacity>

      <View style={commonStyles.dashLine} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleTrack}
          disabled={loading}
          style={styles.searchButton}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Plane size={20} color="#000" style={styles.buttonIcon} />
              <ThemedText style={styles.searchText}>Track</ThemedText>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={commonStyles.dashLine} />

      <View style={styles.pastTrips}>
        <ThemedText style={styles.pastTripsBadgeText}>
          Recently Searched
        </ThemedText>
      </View>

      <RecentSearches onSelect={setLocalSelected} />

      <TrackModal
        visible={open}
        onClose={() => setOpen(false)}
        onSelect={setLocalSelected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  placeholder: {
    fontSize: 18,
    fontWeight: "600",
    color: "#aeaeae",
    paddingVertical: 24,
    flex: 1,
  },
  place: {
    paddingVertical: 12,
    flex: 1,
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
    borderRadius: 50,
  },
  pastTripsBadgeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
