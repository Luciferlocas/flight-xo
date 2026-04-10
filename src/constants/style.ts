import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    paddingVertical: 24,
    flex: 1,
  },
  dashLine: {
    width: "100%",
    borderBottomWidth: 2,
    borderStyle: "dashed",
  },
  dashLineVertical: {
    height: "100%",
    borderLeftWidth: 2,
    borderStyle: "dashed",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
