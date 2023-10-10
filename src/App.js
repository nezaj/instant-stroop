import { init, useQuery, transact, tx } from "@instantdb/react-native";
import { View, Text, Linking, Button } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

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

function AppNavigator({ data }) {
  return (
    <Stack.Navigator
      initialRouteName={DEFAULT_SCENE}
      screenOptions={
        {
          // headerBackTitleVisible: false,
          // headerLeft: () => null,
        }
      }
    >
      <Stack.Screen initialParams={{ data }} name="Main" component={Main} />
      <Stack.Screen
        initialParams={{ data }}
        name="Singleplayer"
        component={Singleplayer}
      />
      <Stack.Screen
        name="GameOverSingleplayer"
        initialParams={{ data }}
        component={GameOverSingleplayer}
      />
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
  const { isLoading, error, data } = useQuery({});
  if (isLoading) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator data={data} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
