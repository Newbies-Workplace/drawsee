import { useAuth } from "@/context/AuthContext";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { View } from "react-native";

export default function SignInScreen() {
  const { signIn } = useAuth();

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  const onSignInPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.idToken) {
        await signIn(userInfo.idToken);

        router.replace("/");
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <View className={"flex justify-center items-center w-full h-full"}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onSignInPress}
      />
    </View>
  );
}
