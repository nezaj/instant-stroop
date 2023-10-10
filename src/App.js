import { init, useQuery, transact, tx } from "@instantdb/react-native";
import { View, Text, Linking, Button } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import React, { useState } from "react";

import SafeView from "./components/shared/SafeView";
import {
  GameOverMultiplayer,
  GameOverSingleplayer,
  HowToPlay,
  JoinGame,
  Main,
  Multiplayer,
  Settings,
  Singleplayer,
  WaitingRoom,
} from "./components/scenes";

// Debug values
// ------------------
const DEBUG_DEFAULT_SCENE = "Main";
const DEBUG_SHOW_SCREEN_BUTTONS = false;

// Instant init
// ------------------
const APP_ID = "24b522b3-0ef8-4939-9646-658aac8716af";

init({
  appId: APP_ID,
  websocketURI: "wss://api.instantdb.com/runtime/session",
});

// App
// ------------------
function App() {
  const [currentScene, setCurrentScene] = useState(DEBUG_DEFAULT_SCENE);
  const { isLoading, error, data } = useQuery({});
  if (isLoading) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  let SceneComponent;
  switch (currentScene) {
    case "Main":
      SceneComponent = Main;
      break;
    case "Singleplayer":
      SceneComponent = Singleplayer;
      break;
    case "GameOverSingleplayer":
      SceneComponent = GameOverSingleplayer;
      break;
    case "WaitingRoom":
      SceneComponent = WaitingRoom;
      break;
    case "Multiplayer":
      SceneComponent = Multiplayer;
      break;
    case "GameOverMultiplayer":
      SceneComponent = GameOverMultiplayer;
      break;
    case "JoinGame":
      SceneComponent = JoinGame;
      break;
    case "HowToPlay":
      SceneComponent = HowToPlay;
      break;
    case "Settings":
      SceneComponent = Settings;
      break;
    default:
      SceneComponent = Main;
      break;
  }

  return (
    <SafeAreaProvider>
      <SceneComponent data={data} />

      {DEBUG_SHOW_SCREEN_BUTTONS && (
        <View className="flex-row flex-wrap justify-center mb-8">
          <Button title="Main" onPress={() => setCurrentScene("Main")} />
          <Button
            title="Singleplayer"
            onPress={() => setCurrentScene("Singleplayer")}
          />
          <Button
            title="GameOverSingleplayer"
            onPress={() => setCurrentScene("GameOverSingleplayer")}
          />
          <Button
            title="WaitingRoom"
            onPress={() => setCurrentScene("WaitingRoom")}
          />
          <Button
            title="Multiplayer"
            onPress={() => setCurrentScene("Multiplayer")}
          />
          <Button
            title="GameOverMultiplayer"
            onPress={() => setCurrentScene("GameOverMultiplayer")}
          />
          <Button
            title="JoinGame"
            onPress={() => setCurrentScene("JoinGame")}
          />
          <Button
            title="HowToPlay"
            onPress={() => setCurrentScene("HowToPlay")}
          />
          <Button
            title="Settings"
            onPress={() => setCurrentScene("Settings")}
          />
        </View>
      )}
    </SafeAreaProvider>
  );
}

export default App;
