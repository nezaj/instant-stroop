import { Text } from "react-native";

import SafeView from "@/components/shared/SafeView";

function Screen({ data }) {
  return (
    <SafeView className="flex-1 justify-center items-center">
      <Text>Settings</Text>
    </SafeView>
  );
}

export default Screen;


