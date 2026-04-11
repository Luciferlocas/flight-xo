import FlightMap from "@/components/track/map";
import { ThemedText } from "@/components/themed-text";
import { commonStyles } from "@/constants/style";
import { ScrollView, View, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react-native";
import { useTrack } from "@/store";
import { TrackFlightResponse } from "@/schema/track/index.types";
import { TrackService } from "@/service";
import FlightStatus from "@/components/track/status";
import { Link } from "expo-router";

export default function TrackScreen() {
  const { flightData, setFlightData } = useTrack();
  const flightDataRef = useRef<TrackFlightResponse | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!flightData) return;

    flightDataRef.current = flightData;

    intervalId = setInterval(async () => {
      const current = flightDataRef.current;

      if (current?.statusName === "LANDED") {
        clearInterval(intervalId);
        return;
      }

      if (current?.positions?.length) {
        const lastObserved = current.positions[0].date;
        const flightNumber = {
          flightId: Number(current.flightId),
          airline: current.carrierFs,
          flightNumber: current.carrierFlightId,
        }

        const liveRes = await TrackService.trackFlight({
          ...flightNumber,
          limit: lastObserved,
        }); 

        if (liveRes.success && liveRes.data) {
          const prev = flightDataRef.current;

          if (!prev) {
            setFlightData(liveRes.data);
          } else {
            const updated = {
              ...liveRes.data,
              positions: [...liveRes.data.positions, ...prev.positions],
            };

            flightDataRef.current = updated;
            setFlightData(updated);
          }
        }
      }
    }, 40000);

    return () => clearInterval(intervalId);
  }, [flightData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="../" style={styles.icon}>
          <ArrowLeft size={24} color="#000" />
        </Link>
        <View>
          <ThemedText style={styles.title}>Flight Details</ThemedText>
          <ThemedText style={styles.subTitle}>
            {flightData?.carrierName || "Flight"} - {flightData?.carrierFs}
            {flightData?.carrierFlightId}
          </ThemedText>
        </View>
        <View style={styles.empty} />
      </View>
      <View style={commonStyles.dashLine} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {flightData && <FlightMap flightStatus={flightData} />}
        {flightData && <FlightStatus flightStatus={flightData} />}
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
});
