import { init, useQuery, transact, tx, id } from "@instantdb/react-native";
import { View, Text, Linking, Button } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SafeView from "@/components/shared/SafeView";
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
} from "@/components/scenes";

// Consts
// ------------------
const DEFAULT_SCENE = "Singleplayer";
const SINGLE_PLAYER_HIGHSCORE_KEY = "SINGLE_PLAYER_HIGHSCORE_KEY";

// Instant init
// ------------------
const APP_ID = "24b522b3-0ef8-4939-9646-658aac8716af";

init({
  appId: APP_ID,
  websocketURI: "wss://api.instantdb.com/runtime/session",
});

// Navigation
// ------------------
const Stack = createStackNavigator();

function AppNavigator({ data, initialHighScore }) {
  const [highScore, setHighScore] = useState(initialHighScore);
  const updateHighScore = (newScore) => {
    if (newScore > highScore) {
      AsyncStorage.setItem(
        SINGLE_PLAYER_HIGHSCORE_KEY,
        JSON.stringify(newScore)
      );
      setHighScore(newScore);
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={DEFAULT_SCENE}
      screenOptions={{
        headerBackTitleVisible: false,
        headerLeft: () => null,
      }}
    >
      <Stack.Screen initialParams={{ data }} name="Main" component={Main} />
      <Stack.Screen
        initialParams={{ data, highScore }}
        name="Singleplayer"
        component={Singleplayer}
      />
      <Stack.Screen
        name="GameOverSingleplayer"
        initialParams={{ data, highScore }}
      >
        {(props) => (
          <GameOverSingleplayer setHighScore={updateHighScore} {...props} />
        )}
      </Stack.Screen>
      <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
      <Stack.Screen name="Multiplayer" component={Multiplayer} />
      <Stack.Screen
        name="GameOverMultiplayer"
        initialParams={{ data }}
        component={GameOverMultiplayer}
      />
      <Stack.Screen
        initialParams={{ data }}
        name="JoinGame"
        component={JoinGame}
      />
      <Stack.Screen
        initialParams={{ data }}
        name="HowToPlay"
        component={HowToPlay}
      />
      <Stack.Screen
        initialParams={{ data }}
        name="Settings"
        component={Settings}
      />
    </Stack.Navigator>
  );
}

// App
// ------------------
function App() {
  const [highScore, setHighScore] = useState(null);
  const { isLoading, error, data } = useQuery({});

  useEffect(() => {
    const fetchOrSetHighScore = async () => {
      const storageScore = await AsyncStorage.getItem(
        SINGLE_PLAYER_HIGHSCORE_KEY
      );
      let numScore = parseInt(storageScore);

      if (!numScore) {
        numScore = 0;
        await AsyncStorage.setItem(
          SINGLE_PLAYER_HIGHSCORE_KEY,
          JSON.stringify(numScore)
        );
      }

      setHighScore(numScore);
    };

    fetchOrSetHighScore();
  }, []);

  if (isLoading || highScore === null) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator data={data} initialHighScore={highScore} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
