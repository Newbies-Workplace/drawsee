import { AuthContextProvider } from "@/context/AuthContext";
import { Slot, useGlobalSearchParams, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import "react-native-reanimated";
import analytics from "@react-native-firebase/analytics";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
	const pathname = usePathname();
	const params = useGlobalSearchParams();

	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		analytics().logScreenView({
			screen_name: pathname,
		});
	}, [pathname, params]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<AuthContextProvider>
				<Slot />
			</AuthContextProvider>
		</ThemeProvider>
	);
}
