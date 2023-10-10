import { init, useQuery, transact, tx } from "@instantdb/react-native";
import { View, Text, Linking, Button } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import React, { useState } from "react";

import SafeView from "./components/SafeView";

const APP_ID = "24b522b3-0ef8-4939-9646-658aac8716af";

init({
  appId: APP_ID,
  websocketURI: "wss://api.instantdb.com/runtime/session",
});

function App() {
  const [currentScene, setCurrentScene] = useState("Main"); // Initial scene is 'Main'
  const { isLoading, error, data } = useQuery({});
  if (isLoading) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  let SceneComponent;
  switch (currentScene) {
    case "Main":
      SceneComponent = Main;
      break;
    case "Foo":
      SceneComponent = Foo;
      break;
    case "Bar":
      SceneComponent = Bar;
      break;
    default:
      SceneComponent = Main;
      break;
  }

  return (
    <SafeAreaProvider>
      <SceneComponent data={data} />

      <View className="flex-row justify-center mb-8">
        <Button title="Show Main" onPress={() => setCurrentScene("Main")} />
        <Button title="Show Foo" onPress={() => setCurrentScene("Foo")} />
        <Button title="Show Bar" onPress={() => setCurrentScene("Bar")} />
      </View>
    </SafeAreaProvider>
  );
}

function Main({ data }) {
  return (
    <SafeView className="flex-1 justify-center items-center">
      <Text>Hello World!</Text>
    </SafeView>
  );
}

function Foo({ data }) {
  return (
    <SafeView className="flex-1 justify-center items-center">
      <Text>Foo!</Text>
    </SafeView>
  );
}

function Bar({ data }) {
  return (
    <SafeView className="flex-1 justify-center items-center">
      <Text>Bar!</Text>
    </SafeView>
  );
}

export default App;
