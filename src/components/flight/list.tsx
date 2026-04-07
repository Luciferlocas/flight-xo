import { FlatList, StyleSheet, View, Dimensions, Text } from "react-native";
import { FlightCard } from "./card";
import { FlightResponse } from "@/schema/search/index.types";
import { commonStyles } from "@/constants/style";

const { height } = Dimensions.get("window");

export const FlightList = ({
  flights,
}: {
  flights: FlightResponse["flights"];
}) => {
  return (
    <FlatList
      data={flights}
      keyExtractor={(item) => item.flightid}
      renderItem={({ index, item }) => (
        <FlightCard
          flight={item}
          color={index % 2 === 0 ? "white" : "transparent"}
        />
      )}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={commonStyles.dashLine} />}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No flights found!</Text>
          <Text style={styles.emptySubText}>Try adjusting your search</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height / 2,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#aeaeae",
    fontStyle: "italic",
  },
  emptySubText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#aeaeae",
  },
});
