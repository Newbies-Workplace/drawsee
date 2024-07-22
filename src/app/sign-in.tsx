import {Text, View} from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import {useAuth} from "@/context/AuthContext";
import {router} from 'expo-router';

export default function SignInScreen() {
    const { signIn } = useAuth();

    GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    })

    return <View>
        <Text>Test login</Text>

        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={async () => {
                try {
                    await GoogleSignin.hasPlayServices()
                    const userInfo = await GoogleSignin.signIn()
                    console.log(userInfo)
                    if (userInfo.idToken) {
                        await signIn(userInfo.idToken);

                        router.replace('/');
                    } else {
                        throw new Error('no ID token present!')
                    }
                } catch (error: any) {
                    console.error(error)
                }
            }}
        />

    </View>
}
