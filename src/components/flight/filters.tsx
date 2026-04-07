import { useSearch } from "@/store/search";
import { getShortDate } from "@/utils/date";
import { ArrowDownUp, Ban, CalendarDays, Plane, PlaneLanding, PlaneTakeoff, Ticket, UsersRound } from "lucide-react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { getClassName } from "@/utils/flight";

export const FlightFilters = () => {
  const { date, passengers, filter } = useSearch();

  const filters = [
    {
      icon: <CalendarDays size={16} />,
      text: getShortDate(date.departure),
    },
    {
      icon: <Ticket size={16} />,
      text: getClassName(filter.flightClass),
    },
    {
      icon: <UsersRound size={16} />,
      text: `${passengers.adults} Adults`,
    },
    {
      icon: <ArrowDownUp size={16} />,
      text: filter.sortBy.charAt(0).toUpperCase() + filter.sortBy.slice(1)
    },
    ...(filter.departureTime ? [{
      icon: <PlaneTakeoff size={16} />,
      text: filter.departureTime
    }] : []),
    ...(filter.arrivalTime ? [{
      icon: <PlaneLanding size={16} />,
      text: filter.arrivalTime
    }] : []),
    ...(filter.stops ? [{
      icon: <Ban size={16} />,
      text: filter.stops
    }] : []),
    ...(filter.airlines.length > 0 ? [{
      icon: <Plane size={16} />,
      text: filter.airlines.join(", ")
    }] : [{
      icon: <Plane size={16} />,
      text: "All Airlines"
    }]),
  ];

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          {filters.map((filter, index) => (
            <View
              key={index}
              style={styles.filterItem}
            >
              {filter.icon}
              <ThemedText style={styles.filterText}>{filter.text}</ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filters: {
    paddingHorizontal: 12,
    paddingVertical: 20,
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
