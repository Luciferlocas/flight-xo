import { commonStyles } from "@/constants/style";
import { TrackFlightResponse } from "@/schema/track/index.types";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { getDateWithTime } from "@/utils/date";

export default function FlightStatus({
  flightStatus,
}: {
  flightStatus: TrackFlightResponse;
}) {
  const isLanded = flightStatus.statusName === "LANDED";
  const isScheduled = flightStatus.statusName === "SCHEDULED";
  const isZero = isLanded || isScheduled;

  const currentStatus = {
    speed: isZero ? "0" : flightStatus.positions[0].speedMph,
    altitude: isZero ? "0" : flightStatus.positions[0].altitudeFt,
    vrate: {
      speed: isZero ? "0" : flightStatus.positions[0].vrateMps,
      direction: isScheduled ? "Scheduled" : isLanded ? "Landed" :
        flightStatus.positions[0].vrateMps > 0
          ? "Ascending"
          : flightStatus.positions[0].vrateMps === 0
            ? "Cruising"
            : "Descending",
    },
  };

  return (
    <View style={styles.container}>
      <View style={[styles.airports, commonStyles.flexRow]}>
        <View style={styles.airport}>
          <ThemedText style={styles.text}>
            {flightStatus.airports.departure.fsCode}
          </ThemedText>
          <ThemedText style={styles.textBold}>
            {flightStatus.airports.departure.city}
          </ThemedText>
        </View>
        <View style={styles.status}>
          <ThemedText style={styles.statusText}>
            {flightStatus.statusAppend}
          </ThemedText>
        </View>
        <View style={styles.airport}>
          <ThemedText style={styles.text}>
            {flightStatus.airports.arrival.fsCode}
          </ThemedText>
          <ThemedText style={styles.textBold}>
            {flightStatus.airports.arrival.city}
          </ThemedText>
        </View>
      </View>

      <View style={commonStyles.dashLine} />

      <View style={commonStyles.flexRow}>
        <View style={styles.infoAltitude}>
          <View style={styles.altitudeContainer}>
            <ThemedText style={styles.altitude}>
              {currentStatus.altitude}
            </ThemedText>
            <ThemedText style={styles.textBold}>Feets</ThemedText>
          </View>
          <View style={commonStyles.dashLine} />
          <View style={styles.altitudeContainer}>
            <ThemedText style={styles.altitude}>
              {currentStatus.vrate.speed !== 0
                ? currentStatus.vrate.speed + " m/s"
                : "--"}
            </ThemedText>
            <ThemedText style={styles.textBold}>
              {currentStatus.vrate.direction}
            </ThemedText>
          </View>
        </View>
        <View style={commonStyles.dashLineVertical} />
        <View style={styles.infoSpeed}>
          <View style={styles.speedContainer}>
            <ThemedText style={styles.speed}>{currentStatus.speed}</ThemedText>
            <ThemedText style={styles.textBold}>Kts</ThemedText>
          </View>
        </View>
      </View>

      <View style={commonStyles.dashLine} />

      <View>
        <View style={commonStyles.flexRow}>
          <View style={styles.timeText}>
            <ThemedText style={styles.textBold}>Departure</ThemedText>
          </View>
          <View style={commonStyles.dashLineVertical} />
          <View style={styles.timeScheduled}>
            <ThemedText style={styles.textBold}>Scheduled</ThemedText>
            <ThemedText style={styles.text}>
              {getDateWithTime(
                flightStatus.operationalTimes.local.departureTimeString
              )}
            </ThemedText>
          </View>
          <View style={commonStyles.dashLineVertical} />
          <View style={styles.timeActual}>
            <ThemedText style={styles.textBold}>Actual</ThemedText>
            <ThemedText style={styles.text}>
              {flightStatus.operationalTimes.local
                .actualRunwayDepartureTimeString
                ? getDateWithTime(
                  flightStatus.operationalTimes.local
                    .actualRunwayDepartureTimeString
                )
                : "--"}
            </ThemedText>
          </View>
        </View>

        <View style={commonStyles.dashLine} />

        <View style={commonStyles.flexRow}>
          <View style={styles.timeText}>
            <ThemedText style={styles.textBold}>Arrival</ThemedText>
          </View>
          <View style={commonStyles.dashLineVertical} />
          <View style={styles.timeScheduled}>
            <ThemedText style={styles.textBold}>Scheduled</ThemedText>
            <ThemedText style={styles.text}>
              {getDateWithTime(
                flightStatus.operationalTimes.local.arrivalTimeString
              )}
            </ThemedText>
          </View>
          <View style={commonStyles.dashLineVertical} />
          <View style={styles.timeActual}>
            <ThemedText style={styles.textBold}>Actual</ThemedText>
            <ThemedText style={styles.text}>
              {flightStatus.operationalTimes.local.actualRunwayArrivalTimeString
                ? getDateWithTime(
                  flightStatus.operationalTimes.local
                    .actualRunwayArrivalTimeString
                )
                : "--"}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "700",
  },
  textBold: {
    color: "#000",
    fontSize: 18,
    fontWeight: "900",
  },
  airports: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 2.5,
    padding: 12,
    backgroundColor: "white",
  },
  airport: {
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: "#000",
  },
  infoAltitude: {
    flex: 2.5,
  },
  infoSpeed: {
    padding: 12,
    flex: 1,
  },
  speedContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 100,
    borderStyle: "dashed",
    aspectRatio: 1,
    backgroundColor: "white",
  },
  altitudeContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  altitude: {
    fontSize: 24,
    color: "#000",
    textAlign: "center",
    fontWeight: "400",
  },
  speed: {
    fontSize: 24,
    color: "#000",
    fontWeight: "400",
  },
  timeText: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  timeScheduled: {
    flex: 1.4,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  timeActual: {
    flex: 1.4,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
