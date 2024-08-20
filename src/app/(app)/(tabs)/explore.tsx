import { useAuthStore } from "@/store/useAuthStore";
import { Button, View } from "react-native";

export default function ExploreScreen() {
  const { signOut } = useAuthStore();

  return (
    <View className={"flex-1 justify-center items-center w-full h-full"}>
      <Button
        title={"Sign out"}
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}
