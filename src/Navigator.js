import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";

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

// (XXX): React-Navigation sends noisy warnings. Let's disable it
// See: https://github.com/react-navigation/react-navigation/issues/7839
LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
]);
const DEFAULT_SCENE = "Main";

const Stack = createStackNavigator();
export default function Navigator({ user }) {
  return (
    <Stack.Navigator
      initialRouteName={DEFAULT_SCENE}
      screenOptions={{
        gestureEnabled: false,
        headerStyle: {
          backgroundColor: "#7c3aed",
        },
        headerTintColor: "#facc15",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        component={Main}
        initialParams={{ user }}
        name="Main"
      />
      <Stack.Screen
        name="Singleplayer"
        options={{ headerShown: false }}
        initialParams={{ user }}
        component={Singleplayer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="GameOverSingleplayer"
        initialParams={{ user }}
        component={GameOverSingleplayer}
      />
      <Stack.Screen
        name="WaitingRoom"
        initialParams={{ user }}
        options={({ route }) => ({
          title: route.params.roomCode,
          headerBackTitle: "Leave",
        })}
        component={WaitingRoom}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Multiplayer"
        initialParams={{ user }}
        component={Multiplayer}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="GameOverMultiplayer"
        initialParams={{ user }}
        component={GameOverMultiplayer}
      />
      <Stack.Screen
        name="JoinRoom"
        initialParams={{ user }}
        options={{ title: "Join Room", headerBackTitle: "Back" }}
        component={JoinRoom}
      />
      <Stack.Screen
        name="HowToPlay"
        initialParams={{ user }}
        options={{ title: "How to Play", headerBackTitle: "Back" }}
        component={HowToPlay}
      />
      <Stack.Screen
        name="Settings"
        initialParams={{ user }}
        options={{ title: "Set Name", headerBackTitle: "Back" }}
        component={Settings}
      />
    </Stack.Navigator>
  );
}
