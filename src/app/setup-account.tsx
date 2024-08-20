import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import * as ImagePicker from "expo-image-picker";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

export default function SetupAccountScreen() {
  const { user } = useAuthStore();

  const onPickProfilePicturePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ base64: true })
      .then((res) => res.assets?.at(0))
      .catch();

    if (!result) {
      return;
    }

    console.log(result);
    const ext = result.uri.split(".").pop();
    const blob = await fetch(result.uri).then((res) => res.blob());
    const arrayBuffer = await new Response(blob).arrayBuffer();

    // https://github.com/saimon24/react-native-resumable-upload-supabase/blob/main/app/(auth)/list.tsx

    supabase.storage
      .from("avatars")
      .upload(`${user?.id},${ext}`, arrayBuffer, {
        contentType: `image/${ext}`,
        upsert: true,
      })
      .then(console.log)
      .catch(console.error);
  };

  const onSubmitPress = () => {};

  return (
    <View className={"flex-1 justify-center items-center w-full h-full"}>
      <Text>Setup Account</Text>

      <Button mode={"outlined"} onPress={onPickProfilePicturePress}>
        Pick Profile Picture
      </Button>

      <TextInput placeholder="user handle" />

      <Button mode={"contained"} onPress={onSubmitPress}>
        Submit
      </Button>
    </View>
  );
}
