import { View, Text, Linking, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { init, useQuery, transact, tx, id } from "@instantdb/react-native";

import AppNavigator from "@/Navigator";

// Consts
// ------------------
const USER_ID_KEY = "USER_ID_KEY";

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
  console.log("Re-render!", user);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator user={user} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
