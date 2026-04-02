import { ThemedText } from "@/components/themed-text";
import { FlightResponse } from "@/schema/search/index.types";
import { getTime } from "@/utils/date";
import {
  getAircraftName,
  getPaytmAirlineLogo,
  getStopsText,
} from "@/utils/flight";
import { PlaneTakeoff } from "lucide-react-native";
import React from "react";
import { StyleSheet, View, Image } from "react-native";

export const FlightCard = ({
  flight,
  color,
}: {
  flight: FlightResponse["flights"][0];
  color: string;
}) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.row}>
        <View style={styles.airlineInfo}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: getPaytmAirlineLogo(flight.airlineCode) }}
              style={styles.image}
            />
          </View>
          <View>
            <ThemedText style={styles.airlineName}>{flight.airline}</ThemedText>
            <ThemedText style={styles.subText}>
              {flight.departureDateAirport}
            </ThemedText>
          </View>
        </View>
        <View style={styles.priceInfo}>
          <ThemedText style={styles.priceText}>
            ₹ {flight.price[0].totalfare}
          </ThemedText>
          <ThemedText style={styles.subText}>
            {getStopsText(flight.hops)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.pathContainer}>
        <View style={styles.cityBlock}>
          <ThemedText style={styles.iataCode}>{flight.origin}</ThemedText>
          <ThemedText style={styles.cityName} numberOfLines={1}>
            {flight.originCity}
          </ThemedText>
          <ThemedText style={styles.timeText}>
            {getTime(new Date(flight.departureTime))}
          </ThemedText>
        </View>

        <View style={styles.iconContainer}>
          <PlaneTakeoff size={24} color="#000" />
          <ThemedText style={styles.timeText}>{flight.duration}</ThemedText>
        </View>

        <View style={[styles.cityBlock, { alignItems: "flex-end" }]}>
          <ThemedText style={styles.iataCode}>{flight.destination}</ThemedText>
          <ThemedText style={styles.cityName} numberOfLines={1}>
            {flight.destinationCity}
          </ThemedText>
          <ThemedText style={styles.timeText}>
            {getTime(new Date(flight.arrivalTime))}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    position: "relative",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  airlineInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  imageContainer: {
    height: 44,
    width: 44,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#000",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  airlineName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  priceInfo: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
  },
  subText: {
    fontSize: 14,
    color: "#666",
  },
  pathContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  cityBlock: {
    flex: 1,
  },
  iataCode: {
    fontSize: 32,
    fontWeight: "500",
    color: "#1A2B3C",
  },
  cityName: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexShrink: 1,
  },
});
