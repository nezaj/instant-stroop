import { Text } from "react-native";

import SafeView from "@/components/shared/SafeView";

function Screen({ route }) {
  const { data } = route.params;

  return (
    <SafeView className="flex-1 justify-center items-center">
      <Text>Game Over Multiplayer</Text>
    </SafeView>
  );
}

export default Screen;
