import { useSearch } from "@/store/search";
import { getShortDate } from "@/utils/date";
import { CalendarDays, MapPin, Ticket, UsersRound } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { getClassName } from "@/utils/flight";
import { FilterModal } from "./modal/filters";
import { useState } from "react";

export const FlightFilters = () => {
  const { from, to, date, passengers, flightClass } = useSearch();
  const [open, setOpen] = useState(false);

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
      text: getClassName(flightClass),
    },
    {
      icon: <UsersRound size={16} />,
      text: `${passengers.adults} Adults`,
    },
  ];

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          {filters.map((filter, index) => (
            <Pressable
              key={index}
              style={styles.filterItem}
              onPress={() => setOpen(true)}
            >
              {filter.icon}
              <ThemedText style={styles.filterText}>{filter.text}</ThemedText>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <FilterModal visible={open} onClose={() => setOpen(false)} />
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
