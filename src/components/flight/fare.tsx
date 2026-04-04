import { commonStyles } from "@/constants/style";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { FlightFareResponse } from "@/schema/search/index.types";
import { Plane } from "lucide-react-native";
import { getFareServiceIcon } from "@/utils/flight";

export const FlightFareCard = ({ fares }: { fares: FlightFareResponse }) => {
  return (
    <View style={styles.fareContainer}>
      {fares?.fares?.map((fare) => (
        <View key={fare.fare_id} style={styles.cardWrapper}>
          <View style={styles.cardContent}>
            <View style={styles.headerRow}>
              <View style={styles.badge}>
                <View style={styles.hanger1} />
                <View style={styles.hanger2} />
                <ThemedText style={styles.badgeText}>
                  {fare.fare_heading.substring(0, 1) + fare.fare_heading.substring(1).toLowerCase()}
                </ThemedText>
              </View>
              <View style={styles.priceContainer}>
                <ThemedText style={styles.priceText}>
                  ₹ {fare.display_price}
                </ThemedText>
                <ThemedText style={styles.subText}>Per adult</ThemedText>
              </View>
            </View>

            <View style={styles.detailsList}>
              {fares.fare_services.map((service) => {
                const label = service.row_display_text;
                const value =
                  service.available_col_display_text_by_fare_product[
                  fare.fare_heading
                  ];

                return (
                  <FareDetailItem
                    key={service.service_id}
                    label={label}
                    value={value}
                  />
                );
              })}
            </View>

            <TouchableOpacity style={styles.bookButton}>
              <Plane size={18} color="#000" />
              <ThemedText style={styles.bookButtonText}>Book Now</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={commonStyles.dashLine} />
        </View>
      ))}
    </View>
  );
};

const FareDetailItem = ({ label, value }: any) => {
  const Icon = getFareServiceIcon(label);
  return (
    <View style={styles.detailRow}>
      <View style={styles.iconContainer}>
        <Icon size={14} color="white" />
      </View>
      <ThemedText style={styles.detailLabel}>{label}</ThemedText>
      <ThemedText style={styles.detailValue}>
        {value ? value : "None"}
      </ThemedText>
    </View>
  );
};

export const FlightFareSeparator = () => {
  return (
    <View style={styles.dividerContainer}>
      <View style={commonStyles.dashLine} />
      <ThemedText style={styles.fare}>Select fare options</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  fareContainer: {
    gap: 12,
    paddingBottom: 80,
  },
  iconContainer: {
    padding: 4,
    backgroundColor: "#000000",
    borderRadius: 20,
  },
  cardWrapper: {
    backgroundColor: "white",
    overflow: "hidden",
    borderTopWidth: 2,
    borderColor: "#000",
    borderStyle: "dashed",
  },
  cardContent: {
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  badge: {
    backgroundColor: "#0a1526",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    position: "relative",
  },
  hanger1: {
    position: "absolute",
    top: -20,
    left: 15,
    width: 2,
    height: 24,
    backgroundColor: "#000",
  },
  hanger2: {
    position: "absolute",
    top: -20,
    right: 15,
    width: 2,
    height: 24,
    backgroundColor: "#000",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  subText: {
    fontSize: 12,
    color: "#666",
  },
  detailsList: {
    gap: 12,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 30,
    paddingVertical: 12,
    gap: 8,
  },
  bookButtonText: {
    fontWeight: "900",
    fontSize: 16,
    color: "#000",
  },
  dividerContainer: {
    width: "100%",
    backgroundColor: "#FFD700",
  },
  fare: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
});
