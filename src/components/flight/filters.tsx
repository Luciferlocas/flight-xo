import { useSearch } from "@/store/search";
import { getShortDate } from "@/utils/date";
import { CalendarDays, MapPin, Ticket, UsersRound } from "lucide-react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export const FlightFilters = () => {
  const { from, to, date, passengers } = useSearch();

  const filters = [
    {
      icon: <MapPin size={16} />,
      text: `${from.iata} - ${to.iata}`,
    },
    {
      icon: <CalendarDays size={16} />,
      text: getShortDate(date.departure),
    },
    {
      icon: <Ticket size={16} />,
      text: "Economy",
    },
    {
      icon: <UsersRound size={16} />,
      text: `${passengers.adults} Adults`,
    },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.filters}>
        {filters.map((filter, index) => (
          <View key={index} style={styles.filterItem}>
            {filter.icon}
            <ThemedText style={styles.filterText}>{filter.text}</ThemedText>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filters: {
    paddingHorizontal: 12,
    paddingVertical: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 30,
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 25,
  },
  filterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
