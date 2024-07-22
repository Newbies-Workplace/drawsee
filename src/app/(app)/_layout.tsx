import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack, Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
