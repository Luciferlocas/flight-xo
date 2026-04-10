import FlightMap from "@/components/track/map";
import { ThemedText } from "@/components/themed-text";
import { commonStyles } from "@/constants/style";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Search, X } from "lucide-react-native";
import SearchFlightCode from "@/components/track/search";
import { useTrack } from "@/store";
import { TrackFlightResponse } from "@/schema/track/index.types";
import { TrackService } from "@/service";
import FlightStatus from "@/components/track/status";

export default function TrackScreen() {
  const [open, setOpen] = useState(false);
  const { flightNumber } = useTrack();
  const [flightData, setFlightData] = useState<TrackFlightResponse | null>(
    null
  );
  const flightDataRef = useRef<TrackFlightResponse | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchFlightData = async () => {
      if (!flightNumber?.airline) return;

      const res = await TrackService.trackFlight(flightNumber);
      if (res.success && res.data) {
        setFlightData(res.data);
        flightDataRef.current = res.data;

        intervalId = setInterval(async () => {
          const current = flightDataRef.current;

          if (current?.statusName === "LANDED") {
            clearInterval(intervalId);
            return;
          }

          if (current?.positions?.length) {
            const lastObserved = current.positions[0].date;
            const liveRes = await TrackService.trackFlight({
              ...flightNumber,
              limit: lastObserved,
            });

            if (liveRes.success && liveRes.data) {
              setFlightData((prev) => {
                if (!prev) return liveRes.data;
                const updated = {
                  ...prev,
                  positions: [...liveRes.data!.positions, ...prev.positions],
                };
                flightDataRef.current = updated;
                return updated;
              });
            }
          }
        }, 40000);
      }
    };

    fetchFlightData();
    return () => clearInterval(intervalId);
  }, [flightNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.title}>Track Flight</ThemedText>
        </View>
        <Pressable style={styles.icon} onPress={() => setOpen(!open)}>
          {open ? (
            <X size={24} color="#000" />
          ) : (
            <Search size={24} color="#000" />
          )}
        </Pressable>
      </View>
      <View style={commonStyles.dashLine} />
      {open && <SearchFlightCode onClose={() => setOpen(false)} />}
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
});
