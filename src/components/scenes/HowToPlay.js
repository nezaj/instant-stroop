import { Text } from "react-native";

import SafeView from "@/components/shared/SafeView";

function Screen({ data }) {
  return (
    <SafeView className="flex-1 justify-center items-center">
      <Text>How to Play</Text>
    </SafeView>
  );
}

export default Screen;
