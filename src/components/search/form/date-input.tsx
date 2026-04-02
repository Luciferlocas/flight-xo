import { commonStyles } from "@/constants/style";
import { useSearch } from "@/store";
import { getShortDate } from "@/utils/date";
import DatePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "../../themed-text";

const { width } = Dimensions.get("window");

export function DateInput() {
  const { tripType, date, setDate } = useSearch();
  const [show, setShow] = useState(false);
  const [type, setType] = useState<"departure" | "return">("departure");

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (selectedDate && type) {
      setDate({
        ...date,
        [type]: selectedDate,
      });
    }
  };

  return (
    <>
      <View style={styles.dateRow}>
        <Pressable
          style={[
            styles.dateInputRow,
            { width: tripType === "oneWay" ? "100%" : "50%" },
          ]}
          onPress={() => {
            setType("departure");
            setShow(true);
          }}
        >
          <ThemedText style={commonStyles.input}>
            {getShortDate(date.departure)}
          </ThemedText>
          <CalendarDays size={24} color="#000" />
        </Pressable>
        {tripType === "roundTrip" && (
          <>
            <View style={commonStyles.dashLineVertical} />
            <Pressable
              style={styles.dateInputRow}
              onPress={() => {
                setType("return");
                setShow(true);
              }}
            >
              <ThemedText style={commonStyles.input}>
                {getShortDate(date.return)}
              </ThemedText>
              <CalendarDays size={24} color="#000" />
            </Pressable>
          </>
        )}
      </View>
      {show && (
        <DatePicker
          value={date.return}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => onChange(event, selectedDate)}
          maximumDate={new Date(2030, 10, 20)}
          minimumDate={date.departure}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateInputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
    paddingHorizontal: 12,
    flexShrink: 1,
  },
});
