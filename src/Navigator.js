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
    <Stack.Navigator initialRouteName={DEFAULT_SCENE}>
      <Stack.Screen component={Main} initialParams={{ user }} name="Main" />
      <Stack.Screen
        name="Singleplayer"
        initialParams={{ user }}
        component={Singleplayer}
      />
      <Stack.Screen
        name="GameOverSingleplayer"
        initialParams={{ user }}
        component={GameOverSingleplayer}
      />
      <Stack.Screen
        name="WaitingRoom"
        initialParams={{ user }}
        options={({ route }) => ({ title: route.params.roomCode })}
        component={WaitingRoom}
      />
      <Stack.Screen
        name="Multiplayer"
        initialParams={{ user }}
        component={Multiplayer}
      />
      <Stack.Screen
        name="GameOverMultiplayer"
        initialParams={{ user }}
        component={GameOverMultiplayer}
      />
      <Stack.Screen
        initialParams={{ user }}
        name="JoinRoom"
        component={JoinRoom}
      />
      <Stack.Screen
        initialParams={{ user }}
        name="HowToPlay"
        component={HowToPlay}
      />
      <Stack.Screen
        name="Settings"
        initialParams={{ user }}
        component={Settings}
      />
    </Stack.Navigator>
  );
}
