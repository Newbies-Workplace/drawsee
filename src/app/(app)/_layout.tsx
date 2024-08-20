import { useAuthStore } from "@/store/useAuthStore";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function AppLayout() {
  const { session, user, isLoading } = useAuthStore();
  const isUserSetup = user?.handle !== null;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  if (!isUserSetup) {
    return <Redirect href="/setup-account" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
