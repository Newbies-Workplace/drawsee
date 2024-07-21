import {Button, Text, View} from "react-native";
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
// } from '@react-native-google-signin/google-signin'
import {useAuth} from "@/context/AuthContext";
import {router} from 'expo-router';

export default function SignInScreen() {
    const { signIn } = useAuth();

    // GoogleSignin.configure({
    //     scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    //     webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    // })

    return <View>
        <Text>Test login</Text>


        <Button title={"Sign in"} onPress={() => {
            signIn();
            router.replace('/');
        }}/>

        {/*<GoogleSigninButton*/}
        {/*    size={GoogleSigninButton.Size.Wide}*/}
        {/*    color={GoogleSigninButton.Color.Dark}*/}
        {/*    onPress={async () => {*/}
        {/*        try {*/}
        {/*            await GoogleSignin.hasPlayServices()*/}
        {/*            const userInfo = await GoogleSignin.signIn()*/}
        {/*            if (userInfo.idToken) {*/}
        {/*                const { data, error } = await supabase.auth.signInWithIdToken({*/}
        {/*                    provider: 'google',*/}
        {/*                    token: userInfo.idToken,*/}
        {/*                })*/}

        {/*                signIn();*/}
        {/*                router.replace('(tabs)');*/}


        {/*                console.log(error, data)*/}
        {/*            } else {*/}
        {/*                throw new Error('no ID token present!')*/}
        {/*            }*/}
        {/*        } catch (error: any) {*/}
        {/*            if (error.code === statusCodes.SIGN_IN_CANCELLED) {*/}
        {/*                // user cancelled the login flow*/}
        {/*            } else if (error.code === statusCodes.IN_PROGRESS) {*/}
        {/*                // operation (e.g. sign in) is in progress already*/}
        {/*            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {*/}
        {/*                // play services not available or outdated*/}
        {/*            } else {*/}
        {/*                // some other error happened*/}
        {/*            }*/}
        {/*        }*/}
        {/*    }}*/}
        {/*/>*/}

    </View>
}
