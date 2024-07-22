import {Redirect, Stack, Tabs} from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {useAuth} from "@/context/AuthContext";
import {Text} from "react-native";
import TabLayout from "@/app/(app)/(tabs)/_layout";

export default function AppLayout() {
    const { session, isLoading } = useAuth();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        return <Redirect href="/sign-in" />;
    }


    return (
    <Stack>
        <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
