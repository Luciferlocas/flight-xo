import { ActivityIndicator, StyleSheet, View } from "react-native";

type SpinnerProps = {
  size?: "small" | "large";
  color?: string;
};

export const Spinner = ({ size = "small", color = "#000" }: SpinnerProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
