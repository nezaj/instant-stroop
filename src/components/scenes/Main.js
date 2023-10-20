import { Text, TouchableOpacity, View } from "react-native";
import { transact, tx, id } from "@instantdb/react-native";

import SafeView from "@/components/shared/SafeView";
import {
  RegularButton,
  HalfButton,
  primaryBackgroundColor as bgColor,
} from "@/components/shared/styles";
import randomCode from "@/utils/randomCode";

function Main({ navigation, route }) {
  const { user } = route.params;
  const { id: userId } = user;
  const { handle } = user;
  return (
    <SafeView
      className={`flex-1 flex-col items-center justify-around ${bgColor}`}
    >
      <View>
        <Text className="text-8xl text-center my-8">🧇</Text>
        <Text className="text-5xl font-bold text-yellow-400">Stroopwafel</Text>
      </View>

      <View className="justify-center">
        <RegularButton
          onPress={() =>
            navigation.navigate("Singleplayer", { resetGame: true })
          }
        >
          Start
        </RegularButton>

        <RegularButton
          onPress={() => {
            const roomId = id();
            const roomCode = randomCode();
            if (handle.length) {
              transact(
                tx.rooms[roomId]
                  .update({
                    code: roomCode,
                    hostId: userId,
                    readyIds: [],
                    kickedIds: [],
                  })
                  .link({ users: userId })
              );
              navigation.navigate("WaitingRoom", { roomCode, roomId });
            } else {
              navigation.navigate("Settings", {
                nextScreen: "WaitingRoom",
                roomCode,
                roomId,
              });
            }
          }}
        >
          Create Game
        </RegularButton>

        <RegularButton
          onPress={() => {
            if (!!handle) {
              navigation.navigate("JoinRoom");
            } else {
              navigation.navigate("Settings", { nextScreen: "JoinRoom" });
            }
          }}
        >
          Join Game
        </RegularButton>

        <View className="flex-row my-2 space-x-4">
          <View>
            <HalfButton>Rules</HalfButton>
          </View>
          <View>
            <HalfButton
              onPress={() => {
                navigation.navigate("Settings", { nextScreen: "Main" });
              }}
            >
              Profile
            </HalfButton>
          </View>
        </View>
      </View>
    </SafeView>
  );
}

export default Main;
