import { commonStyles } from "@/constants/style";
import { FlightResponse } from "@/schema/search/index.types";
import { getDayDate, getTime } from "@/utils/date";
import { getAircraftName, getPaytmAirlineLogo } from "@/utils/flight";
import { PlaneTakeoff } from "lucide-react-native";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { ThemedText } from "../themed-text";

export const FlightDetailsCard = ({
  flight,
}: {
  flight: FlightResponse["flights"][0];
}) => {
  return (
    <View>
      {flight.hops.map((item, index) => {
        const nextHop = flight.hops[index + 1];

        return (
          <React.Fragment key={item.flightNumber + index}>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.airlineInfo}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: getPaytmAirlineLogo(item.airlineCode) }}
                      style={styles.image}
                    />
                  </View>
                  <View>
                    <ThemedText style={styles.airlineinfo}>
                      <ThemedText style={styles.airlineName}>
                        {item.airline}
                      </ThemedText>{" "}
                      | {getAircraftName(item)}
                    </ThemedText>
                  </View>
                </View>
              </View>

              <View style={styles.pathContainer}>
                <View style={styles.cityBlock}>
                  <ThemedText style={styles.day}>
                    {getTime(new Date(item.departureTime), false)}
                  </ThemedText>
                  <ThemedText style={styles.timeText}>
                    {getDayDate(new Date(item.departureTime))}
                  </ThemedText>
                  <ThemedText style={styles.cityName} numberOfLines={1}>
                    {item.origin_city}
                  </ThemedText>
                  <ThemedText style={styles.terminal} numberOfLines={1}>
                    {item.departureTerminal
                      ? `Terminal ${item.departureTerminal}`
                      : "Not Available"}
                  </ThemedText>
                </View>

                <View style={styles.iconContainer}>
                  <PlaneTakeoff size={24} color="#000" />
                  <ThemedText style={styles.timeText}>
                    {item.duration}
                  </ThemedText>
                </View>

                <View style={[styles.cityBlock, { alignItems: "flex-end" }]}>
                  <ThemedText style={styles.day}>
                    {getTime(new Date(item.arrivalTime), false)}
                  </ThemedText>
                  <ThemedText style={styles.timeText}>
                    {getDayDate(new Date(item.arrivalTime))}
                  </ThemedText>
                  <ThemedText style={styles.cityName} numberOfLines={1}>
                    {item.destination_city}
                  </ThemedText>
                  <ThemedText style={styles.terminal} numberOfLines={1}>
                    {item.arrivalTerminal
                      ? `Terminal ${item.arrivalTerminal}`
                      : "Not Available"}
                  </ThemedText>
                </View>
              </View>
            </View>

            {nextHop && (
              <View style={styles.dividerContainer}>
                <View
                  style={[commonStyles.dashLine, { borderColor: "#FFD700" }]}
                />
                <ThemedText style={styles.layover}>
                  Change of planes & layover of {nextHop.layover} at{" "}
                  {nextHop.origin_city}
                </ThemedText>
                <View
                  style={[commonStyles.dashLine, { borderColor: "#FFD700" }]}
                />
              </View>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    width: "100%",
    backgroundColor: "#091c31",
  },
  layover: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  terminal: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
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
    fontWeight: "900",
    color: "#000",
  },
  airlineinfo: {
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
  day: {
    fontSize: 28,
    fontWeight: "500",
    color: "#1A2B3C",
    marginBottom: 4,
  },
  cityName: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
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
