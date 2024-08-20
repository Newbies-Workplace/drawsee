import { useFonts } from "expo-font";
import { Slot, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/global.css";
import "react-native-reanimated";
import { DrawseeTheme } from "@/lib/theme";
import { useAuthStore } from "@/store/useAuthStore";
import analytics from "@react-native-firebase/analytics";
import { PaperProvider } from "react-native-paper";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const pathname = usePathname();
  const { init } = useAuthStore();

  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const unsubscribe = init();

    return () => {
      unsubscribe.then((fn) => fn());
    };
  }, [init]);

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
    <PaperProvider theme={DrawseeTheme}>
      <Slot />
    </PaperProvider>
  );
}
