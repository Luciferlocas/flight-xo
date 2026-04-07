import * as Application from "expo-application";
import { Platform } from "react-native";

export const getDeviceId = async (): Promise<string> => {
  try {
    if (Platform.OS === "android") {
      return Application.getAndroidId() ?? "default_android_id";
    } else {
      const iosId = await Application.getIosIdForVendorAsync();
      return iosId ?? "default_ios_id";
    }
  } catch (error) {
    console.error("Failed to get Device ID", error);
    return "fallback_id";
  }
};
