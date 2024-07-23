import { Test } from "@/types/supabase-types";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [data, setData] = useState<Test[] | null>([]);

  useEffect(() => {
    const init = async () => {
      const { data: response } = await supabase.from("Test").select();

      setData(response);
    };

    init().then();
  }, []);

  return (
    <View className={"flex-1 justify-center items-center w-full h-full"}>
      <Text>Test: {JSON.stringify(data)}</Text>
    </View>
  );
}
