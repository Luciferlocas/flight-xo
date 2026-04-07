import { commonStyles } from "@/constants/style";
import { useSearch } from "@/store";
import { UsersRound } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../themed-text";

export function PassengerInput() {
  const { passengers, setPassengers } = useSearch();
  const [open, setOpen] = useState(false);
  const passangerString = `${passengers.adults} Adults, ${passengers.children} Child, ${passengers.infants} Infants`;
  return (
    <>
      <Pressable style={commonStyles.inputRow} onPress={() => setOpen(!open)}>
        <ThemedText style={commonStyles.input}>{passangerString}</ThemedText>
        <UsersRound size={24} color="#000" />
      </Pressable>
      <View style={commonStyles.dashLine} />

      {open && (
        <>
          <View style={styles.counterContainer}>
            <View style={styles.counterRow}>
              <ThemedText style={styles.counterText} allowFontScaling={false}>
                {passengers.adults} Adults
              </ThemedText>
              <View style={commonStyles.dashLineVertical} />
              <View style={styles.counterButtons}>
                <TouchableOpacity
                  style={[styles.counterButton, styles.plusButton]}
                  disabled={passengers.adults === 6}
                  onPress={() =>
                    setPassengers({
                      ...passengers,
                      adults: passengers.adults + 1,
                    })
                  }
                >
                  <ThemedText style={styles.counterButtonText}>+</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.counterButton, styles.minusButton]}
                  disabled={passengers.adults === 1}
                  onPress={() =>
                    setPassengers({
                      ...passengers,
                      adults: passengers.adults - 1,
                    })
                  }
                >
                  <ThemedText style={styles.counterButtonText}>-</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={commonStyles.dashLineVertical} />
            <View style={styles.counterRow}>
              <ThemedText style={styles.counterText} allowFontScaling={false}>
                {passengers.children} Child
              </ThemedText>
              <View style={commonStyles.dashLineVertical} />
              <View style={styles.counterButtons}>
                <TouchableOpacity
                  style={[styles.counterButton, styles.plusButton]}
                  disabled={passengers.children === 6}
                  onPress={() =>
                    setPassengers({
                      ...passengers,
                      children: passengers.children + 1,
                    })
                  }
                >
                  <ThemedText style={styles.counterButtonText}>+</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.counterButton, styles.minusButton]}
                  disabled={passengers.children === 0}
                  onPress={() =>
                    setPassengers({
                      ...passengers,
                      children: passengers.children - 1,
                    })
                  }
                >
                  <ThemedText style={styles.counterButtonText}>-</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={commonStyles.dashLineVertical} />
            <View style={styles.counterRow}>
              <ThemedText style={styles.counterText} allowFontScaling={false}>
                {passengers.infants} Infants
              </ThemedText>
              <View style={commonStyles.dashLineVertical} />
              <View style={styles.counterButtons}>
                <TouchableOpacity
                  style={[styles.counterButton, styles.plusButton]}
                  disabled={passengers.infants === 2}
                  onPress={() =>
                    setPassengers({
                      ...passengers,
                      infants: passengers.infants + 1,
                    })
                  }
                >
                  <ThemedText style={styles.counterButtonText}>+</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.counterButton, styles.minusButton]}
                  disabled={passengers.infants === 0}
                  onPress={() =>
                    setPassengers({
                      ...passengers,
                      infants: passengers.infants - 1,
                    })
                  }
                >
                  <ThemedText style={styles.counterButtonText}>-</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={commonStyles.dashLine} />
        </>
      )}
    </>
  );
}

export function PassengerCounter({
  passengers,
  setPassengers,
}: {
  passengers: { adults: number; children: number; infants: number };
  setPassengers: (passengers: {
    adults: number;
    children: number;
    infants: number;
  }) => void;
}) {
  return (
    <>
      <View style={styles.counterContainer}>
        <View style={styles.counterRow}>
          <ThemedText style={styles.counterText} allowFontScaling={false}>
            {passengers.adults} Adults
          </ThemedText>
          <View style={commonStyles.dashLineVertical} />
          <View style={styles.counterButtons}>
            <TouchableOpacity
              style={[styles.counterButton, styles.plusButton]}
              disabled={passengers.adults === 6}
              onPress={() =>
                setPassengers({
                  ...passengers,
                  adults: passengers.adults + 1,
                })
              }
            >
              <ThemedText style={styles.counterButtonText}>+</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.counterButton, styles.minusButton]}
              disabled={passengers.adults === 1}
              onPress={() =>
                setPassengers({
                  ...passengers,
                  adults: passengers.adults - 1,
                })
              }
            >
              <ThemedText style={styles.counterButtonText}>-</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={commonStyles.dashLineVertical} />
        <View style={styles.counterRow}>
          <ThemedText style={styles.counterText} allowFontScaling={false}>
            {passengers.children} Child
          </ThemedText>
          <View style={commonStyles.dashLineVertical} />
          <View style={styles.counterButtons}>
            <TouchableOpacity
              style={[styles.counterButton, styles.plusButton]}
              disabled={passengers.children === 6}
              onPress={() =>
                setPassengers({
                  ...passengers,
                  children: passengers.children + 1,
                })
              }
            >
              <ThemedText style={styles.counterButtonText}>+</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.counterButton, styles.minusButton]}
              disabled={passengers.children === 0}
              onPress={() =>
                setPassengers({
                  ...passengers,
                  children: passengers.children - 1,
                })
              }
            >
              <ThemedText style={styles.counterButtonText}>-</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={commonStyles.dashLineVertical} />
        <View style={styles.counterRow}>
          <ThemedText style={styles.counterText} allowFontScaling={false}>
            {passengers.infants} Infants
          </ThemedText>
          <View style={commonStyles.dashLineVertical} />
          <View style={styles.counterButtons}>
            <TouchableOpacity
              style={[styles.counterButton, styles.plusButton]}
              disabled={passengers.infants === 2}
              onPress={() =>
                setPassengers({
                  ...passengers,
                  infants: passengers.infants + 1,
                })
              }
            >
              <ThemedText style={styles.counterButtonText}>+</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.counterButton, styles.minusButton]}
              disabled={passengers.infants === 0}
              onPress={() =>
                setPassengers({
                  ...passengers,
                  infants: passengers.infants - 1,
                })
              }
            >
              <ThemedText style={styles.counterButtonText}>-</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={commonStyles.dashLine} />
    </>
  );
}

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  counterButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    paddingVertical: 24,
    paddingHorizontal: 12,
    flex: 2,
    textAlign: "center",
  },
  minusButton: {
    backgroundColor: "#eec1b5ff",
  },
  plusButton: {
    backgroundColor: "#aae2a0ff",
    borderBottomWidth: 2,
    borderStyle: "dashed",
  },
  counterButtons: {
    flex: 1,
    height: "100%",
  },
  counterButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
