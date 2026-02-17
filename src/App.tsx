import "react-native-gesture-handler";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { id } from "@instantdb/react-native";

import { db } from "@/lib/db";
import { UserContext } from "@/Context";
import AppNavigator, { DEEP_LINKS_CONFIG } from "@/Navigator";
import randomHandle from "@/utils/randomHandle";
import {
  LoadingPlaceholder,
  ErrorPlaceholder,
} from "@/components/shared/Placeholder";
import { now } from "@/utils/time";

// Consts
// ------------------
const USER_ID_KEY = "USER_ID_KEY";

// App
// ------------------
function App() {
  const [userId, setUserId] = useState<string | null>(null);

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

  if (userId === null) return <LoadingPlaceholder />;
  return <AppUser userId={userId} />;
}

function AppUser({ userId }: { userId: string }) {
  const { isLoading, error, data } = db.useQuery({
    users: { $: { where: { id: userId } } },
  });
  const [userExists, setUserExists] = useState(false);

  // Create user if they don't exist
  useEffect(() => {
    if (isLoading || !data) {
      return;
    }
    if (data.users.length == 0) {
      db.transact(
        db.tx.users[userId].update({
          handle: randomHandle(),
          highScore: 0,
          created_at: now(),
        })
      );
    }
    setUserExists(true);
  }, [isLoading, data]);
  if (isLoading || !userExists) return <LoadingPlaceholder />;
  if (error) return <ErrorPlaceholder error={error} />;
  const user = data.users[0];

  return (
    <SafeAreaProvider>
      <UserContext.Provider value={user}>
        <NavigationContainer
          linking={DEEP_LINKS_CONFIG}
          fallback={<LoadingPlaceholder />}
        >
          <AppNavigator />
        </NavigationContainer>
      </UserContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;
