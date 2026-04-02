import { MapPin, MapPinCheckInside } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../../themed-text";
import { SearchModal } from "../modal";

interface PlaceInputProps {
  name: string;
  date: {
    iata: string;
    city: string;
    country: string;
  };
  set: (data: PlaceInputProps["date"]) => void;
}

export function PlaceInput({ date, set, name }: PlaceInputProps) {
  const [open, setOpen] = useState(false);
  const isFrom = name === "From";

  return (
    <>
      <Pressable style={styles.inputRow} onPress={() => setOpen(true)}>
        {date.iata ? (
          <View style={styles.place}>
            <ThemedText style={styles.placeIata}>{date.iata}</ThemedText>
            <ThemedText style={styles.placeCity}>
              {date.city}, {date.country}
            </ThemedText>
          </View>
        ) : (
          <ThemedText style={styles.placeholder}>{name}</ThemedText>
        )}
        {isFrom ? (
          <MapPin size={24} color="#000" />
        ) : (
          <MapPinCheckInside size={24} color="#000" />
        )}
      </Pressable>
      <SearchModal
        visible={open}
        onClose={() => setOpen(false)}
        onSelect={set}
        title={isFrom ? "Departure" : "Destination"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingVertical: 14,
    flex: 1,
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
});
