import { commonStyles } from "@/constants/style";
import { useSearch } from "@/store";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../themed-text";

export function TripTypeInput() {
  const { tripType, setTripType } = useSearch();
  const isSelected = (type: string) => type === tripType;

  return (
    <View style={styles.typeContainer}>
      <View
        style={[
          styles.typeButton,
          {
            backgroundColor: isSelected("oneWay") ? "#091c31" : "transparent",
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.tripType]}
          onPress={() => setTripType("oneWay")}
        >
          <ThemedText
            style={[
              styles.tripTypeText,
              { color: isSelected("oneWay") ? "white" : "#000" },
            ]}
          >
            One-Way
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={commonStyles.dashLineVertical} />
      <View
        style={[
          styles.typeButton,
          {
            backgroundColor: isSelected("roundTrip")
              ? "#091c31"
              : "transparent",
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.tripType]}
          onPress={() => setTripType("roundTrip")}
        >
          <ThemedText
            style={[
              styles.tripTypeText,
              { color: isSelected("roundTrip") ? "white" : "#000" },
            ]}
          >
            Round Trip
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  typeContainer: {
    display: "flex",
    flexDirection: "row",
  },
  typeButton: {
    flex: 1,
    paddingVertical: 24,
  },
  tripType: {
    alignItems: "center",
    justifyContent: "center",
  },
  tripTypeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
