import { useAuthStore } from "@/store/useAuthStore";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { user } = useAuthStore();

  return (
    <View className={"flex-1 justify-center items-center w-full h-full"}>
      <Text>Test</Text>

      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}
