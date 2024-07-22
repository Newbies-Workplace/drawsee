import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";

export default function ExploreScreen() {
  const [id, setId] = useState("");
  const { signOut } = useAuth();

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.from("Test").select().single();

      if (error) {
        console.error(error);
        return;
      }

      setId(data.data ?? "aaa");
    };

    init().then();
  }, []);

  return (
    <View className={"flex justify-center items-center w-full h-full"}>
      <Button
        title={"Sign out"}
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}
