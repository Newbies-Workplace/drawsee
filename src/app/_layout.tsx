import { AuthContextProvider } from "@/context/AuthContext";
import { useFonts } from "expo-font";
import { Slot, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/global.css";
import "react-native-reanimated";
import analytics from "@react-native-firebase/analytics";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const pathname = usePathname();

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
  }, [pathname]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  );
}
