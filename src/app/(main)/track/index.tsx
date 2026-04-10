import FlightMap from "@/components/track/map";
import { ThemedText } from "@/components/themed-text";
import { commonStyles } from "@/constants/style";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react-native";
import SearchFlightCode from "@/components/track/search";
import { useTrack } from "@/store";
import { TrackFlightResponse } from "@/schema/track/index.types";
import { TrackService } from "@/service";

export default function TrackScreen() {
  const [open, setOpen] = useState(false);
  const { flightNumber } = useTrack();
  const [flightData, setFlightData] = useState<TrackFlightResponse | null>(
    null
  );

  useEffect(() => {
    const fetchFlightData = async () => {
      if (flightNumber) {
        const res = await TrackService.trackFlight(flightNumber);
        if (res.success) {
          setFlightData(res.data);
        }
      }
    };
    if (flightNumber.airline) fetchFlightData();
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
        <View style={commonStyles.dashLine} />
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
