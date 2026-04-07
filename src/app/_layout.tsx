import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { getToken } from "@/utils/auth";
import { Stack } from "expo-router";
import { useSearch } from "@/store";

export default function RootLayout() {
  const { initializeDeviceId } = useSearch();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    initializeDeviceId();
    const checkAuth = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, [initializeDeviceId]);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Stack screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="(main)" />
          ) : (
            <Stack.Screen name="(auth)/login/index" />
          )}
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
