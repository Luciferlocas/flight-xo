import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { deleteToken } from "@/utils/auth";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  const handleLogout = async () => {
    await deleteToken();
    router.replace("/login");
  };
  return (
    <ThemedView>
      <ThemedText>Profile</ThemedText>
      <TouchableOpacity onPress={handleLogout}>
        <ThemedText>Logout</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
