import "react-native-gesture-handler";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { db } from "@/lib/db";
import { UserContext } from "@/Context";
import AppNavigator, { DEEP_LINKS_CONFIG } from "@/Navigator";
import randomHandle from "@/utils/randomHandle";
import {
  LoadingPlaceholder,
  ErrorPlaceholder,
} from "@/components/shared/Placeholder";
import { now } from "@/utils/time";

// App
// ------------------
function App() {
  const { isLoading, user: authUser, error } = db.useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!authUser) {
      db.auth.signInAsGuest();
    }
  }, [isLoading, authUser]);

  if (isLoading || !authUser) return <LoadingPlaceholder />;
  if (error) return <ErrorPlaceholder error={error} />;

  return <AppUser userId={authUser.id} />;
}

function AppUser({ userId }: { userId: string }) {
  const { isLoading, error, data } = db.useQuery({
    $users: { $: { where: { id: userId } } },
  });
  const [userExists, setUserExists] = useState(false);

  // Create user profile if they don't have one yet
  useEffect(() => {
    if (isLoading || !data) {
      return;
    }
    const u = data.$users[0];
    if (u && !u.handle) {
      db.transact(
        db.tx.$users[userId].update({
          handle: randomHandle(),
          highScore: 0,
          created_at: now(),
        })
      );
    }
    if (u) {
      setUserExists(true);
    }
  }, [isLoading, data]);
  if (isLoading || !userExists) return <LoadingPlaceholder />;
  if (error) return <ErrorPlaceholder error={error} />;
  const user = data.$users[0];

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
