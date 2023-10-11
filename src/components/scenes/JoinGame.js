import { Text } from "react-native";

import SafeView from "@/components/shared/SafeView";

function Screen({ route }) {
  const { user } = route.params;
  return (
    <SafeView className="flex-1 justify-center items-center">
      <Text>Join Game</Text>
    </SafeView>
  );
}

export default Screen;
