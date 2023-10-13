import { View, Text, Linking, Button } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { init, useQuery, transact, tx, id } from "@instantdb/react-native";

import SafeView from "@/components/shared/SafeView";
import {
  GameOverMultiplayer,
  GameOverSingleplayer,
  HowToPlay,
  JoinRoom,
  Main,
  Multiplayer,
  Settings,
  Singleplayer,
  WaitingRoom,
} from "@/components/scenes";

// Consts
// ------------------
const DEFAULT_SCENE = "Settings";
const USER_ID_KEY = "USER_ID_KEY";

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

function AppNavigator({ user }) {
  return (
    <Stack.Navigator
      initialRouteName={DEFAULT_SCENE}
      screenOptions={{
        headerBackTitleVisible: false,
        headerLeft: () => null,
      }}
    >
      <Stack.Screen initialParams={{ user }} name="Main" component={Main} />
      <Stack.Screen
        initialParams={{ user }}
        name="Singleplayer"
        component={Singleplayer}
      />
      <Stack.Screen
        name="GameOverSingleplayer"
        initialParams={{ user }}
        component={GameOverSingleplayer}
      />
      <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
      <Stack.Screen name="Multiplayer" component={Multiplayer} />
      <Stack.Screen
        name="GameOverMultiplayer"
        initialParams={{ user }}
        component={GameOverMultiplayer}
      />
      <Stack.Screen
        initialParams={{ user }}
        name="JoinGame"
        component={JoinRoom}
      />
      <Stack.Screen
        initialParams={{ user }}
        name="HowToPlay"
        component={HowToPlay}
      />
      <Stack.Screen
        initialParams={{ user }}
        name="Settings"
        component={Settings}
      />
    </Stack.Navigator>
  );
}

// App
// ------------------
function App() {
  const [userId, setUserId] = useState(null);

  // Create a new userId if didn't have one saved previously
  useEffect(() => {
    const fetchOrSetUserId = async () => {
      let storageUserId = await AsyncStorage.getItem(USER_ID_KEY);

      if (!storageUserId) {
        storageUserId = id();
        await AsyncStorage.setItem(USER_ID_KEY, storageUserId);
      }

      setUserId(storageUserId);
    };

    fetchOrSetUserId();
  }, []);

  if (userId === null) return <Text>...</Text>;
  return <AppUser userId={userId} />;
}

function AppUser({ userId }) {
  const { isLoading, error, data } = useQuery({
    users: { $: { where: { id: userId } } },
  });
  const [userExists, setUserExists] = useState(false);

  // Create user if they don't exist
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (data.users.length == 0) {
      console.log(`[debug] Creating usering with id ${userId}`);
      transact(
        tx.users[userId].update({
          highScore: 0,
        })
      );
    }
    setUserExists(true);
    return () => null;
  }, [isLoading, data]);
  if (isLoading || !userExists) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  const user = data.users[0];
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator user={user} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
