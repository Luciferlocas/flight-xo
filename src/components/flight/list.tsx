import { FlatList, StyleSheet, View } from "react-native";
import { FlightCard } from "./card";
import { FlightResponse } from "@/schema/search/index.types";
import { commonStyles } from "@/constants/style";

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
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
});
