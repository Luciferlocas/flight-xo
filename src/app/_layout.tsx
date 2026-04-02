import { AnimatedSplashOverlay } from "@/components/animated-icon";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";

import { getToken } from "@/utils/auth";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="(auth)/login/index" />
        ) : (
          <Stack.Screen name="(main)" />
        )}
      </Stack>
    </ThemeProvider>
  );
}
