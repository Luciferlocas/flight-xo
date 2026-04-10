import { TrackFlightResponse } from "@/schema/track/index.types";
import { Circle } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

export default function FlightMap({ flightStatus }: { flightStatus: TrackFlightResponse }) {
  const mapRef = useRef<MapView>(null);

  const flightPath = flightStatus.positions.map((pos) => ({
    latitude: pos.lat,
    longitude: pos.lon,
  }));

  const currentPos = flightPath[0];

  const departure = {
    latitude: Number(flightStatus.airports.departure.latitude),
    longitude: Number(flightStatus.airports.departure.longitude),
  };
  const arrival = {
    latitude: Number(flightStatus.airports.arrival.latitude),
    longitude: Number(flightStatus.airports.arrival.longitude),
  };

  const allPoints = [departure, arrival, ...(currentPos ? [currentPos] : [])];

  useEffect(() => {
    if (mapRef.current && allPoints.length > 0) {
      mapRef.current.fitToCoordinates(allPoints, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [flightStatus]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="satelliteFlyover"
        rotateEnabled={false}
      >
        {flightPath.length > 0 && (
          <Polyline
            coordinates={flightPath}
            strokeColor="#22c55e"
            strokeWidth={3}
            geodesic={true}
          />
        )}

        <Marker coordinate={departure} title={`Departure: ${flightStatus.airports.departure.fsCode}`}>
          <View style={styles.dotContainer}>
            <Circle fill="#fff" stroke="#22c55e" size={10} />
          </View>
        </Marker>

        <Marker coordinate={arrival} title={`Arrival: ${flightStatus.airports.arrival.fsCode}`}>
          <View style={styles.dotContainer}>
            <Circle fill="#22c55e" stroke="#fff" size={10} />
          </View>
        </Marker>

        {currentPos && (
          <Marker
            coordinate={currentPos}
            rotation={flightStatus.heading}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            title={`${flightStatus.carrierName} - ${flightStatus.carrierFs} ${flightStatus.carrierFlightId}`}
          >
            <Image
              source={require("../../../assets/images/plane.png")}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
  map: { height: 500, width: "100%" },
  dotContainer: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 20
  },
  planeImage: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  }
});