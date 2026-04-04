import { FlightDetailsCard } from "@/components/flight/details";
import { useSearch } from "@/store";
import { useLocalSearchParams, Link } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { ThemedText } from "@/components/themed-text";
import { getShortDate } from "@/utils/date";
import { commonStyles } from "@/constants/style";
import { FlightFareSeparator, FlightFareCard } from "@/components/flight/fare";
import { useEffect, useState } from "react";
import { FlightService } from "@/service";
import { FlightFareResponse } from "@/schema/search/index.types";

export default function FlightDetails() {
  const { id } = useLocalSearchParams();
  const { flights, date, passengers } = useSearch();
  const [prices, setPrices] = useState<FlightFareResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const flight = flights?.flights.find((flight) => flight.flightid === id);

  useEffect(() => {
    const fetchFares = async () => {
      if (!flight) return;

      setLoading(true);

      const response = await FlightService.getFlightFares({
        id: flight.solutionId || "",
        requestId: flights?.requestid || "",
      });
      if (response.success) {
        setPrices(response.data);
      }

      setLoading(false);
    };

    fetchFares();
  }, [flight, flights?.requestid]);

  if (!flight) {
    return <Text>Flight not found</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="../" style={styles.icon}>
          <ArrowLeft size={24} color="#000" />
        </Link>
        <View>
          <ThemedText style={styles.title}>Flight Details</ThemedText>
          <ThemedText style={styles.subTitle}>
            {getShortDate(date.departure)} - {passengers.adults} Adults
          </ThemedText>
        </View>
        <View style={styles.empty} />
      </View>
      <View style={commonStyles.dashLine} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlightDetailsCard flight={flight} />
        <FlightFareSeparator />
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        ) : (
          prices && <FlightFareCard fares={prices} />
        )}
      </ScrollView>
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
    justifyContent: "space-between",
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
  empty: {
    width: 48,
    height: 48,
  },
  loading: {
    flex: 1,
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
