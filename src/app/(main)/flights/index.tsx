import { FlightFilters, FlightList } from "@/components/flight";
import { ThemedText } from "@/components/themed-text";
import { commonStyles } from "@/constants/style";
import { useSearch } from "@/store/search";
import { getShortDate } from "@/utils/date";
import { Link } from "expo-router";
import { ArrowLeft, Filter } from "lucide-react-native";
import { Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function FlightsScreen() {
  const { flights, from, to, date } = useSearch();

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.header}>
        <Link href="/" style={styles.icon}>
          <ArrowLeft size={24} color="#000" />
        </Link>
        <View>
          <ThemedText style={styles.title}>
            {from.city} - {to.city}
          </ThemedText>
          <ThemedText style={styles.subTitle}>
            {getShortDate(date.departure)}
          </ThemedText>
        </View>
        <View style={styles.icon}>
          <Filter size={24} color="#000" />
        </View>
      </View>
      <View style={commonStyles.dashLine} />
      <FlightFilters />
      <View style={commonStyles.dashLine} />
      <FlightList flights={flights?.flights || []} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAE2",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  icon: {
    borderRadius: width,
    padding: 12,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#000000",
  },
});
