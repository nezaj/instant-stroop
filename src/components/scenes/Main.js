import { Text, TouchableOpacity, View } from "react-native";
import { transact, tx, id } from "@instantdb/react-native";

import SafeView from "@/components/shared/SafeView";
import randomCode from "@/utils/randomCode";

const mainButtonStyle = "h-24 bg-gray-300 rounded-xl justify-center";
const minorButtonStyle = "w-32 h-24 bg-gray-300 rounded-xl justify-center";
const textStyle = "text-4xl text-center";

function Main({ navigation, route }) {
  const { user } = route.params;
  const { id: userId } = user;
  const { handle } = user;
  return (
    <SafeView className="flex-1 items-center">
      <View className="w-32 h-32 bg-gray-300 rounded-full mb-8" />
      <Text className="text-5xl font-bold mb-6">Stroopwafel</Text>

      <View className="flex-1 justify-center space-y-4">
        <TouchableOpacity
          className={`${mainButtonStyle}`}
          onPress={() =>
            navigation.navigate("Singleplayer", { resetGame: true })
          }
        >
          <Text className={`${textStyle}`}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`${mainButtonStyle}`}
          onPress={() => {
            const roomId = id();
            const roomCode = randomCode();
            if (!!handle) {
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
          <Text className={`${textStyle}`}>Create Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`${mainButtonStyle}`}
          onPress={() => {
            if (!!handle) {
              navigation.navigate("JoinRoom");
            } else {
              navigation.navigate("Settings", { nextScreen: "JoinRoom" });
            }
          }}
        >
          <Text className={`${textStyle}`}>Join Game</Text>
        </TouchableOpacity>

        <View className="flex-row space-x-4">
          <TouchableOpacity className={`${minorButtonStyle}`}>
            <Text className={`${textStyle}`}>Rules</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`${minorButtonStyle}`}
            onPress={() => {
              navigation.navigate("Settings", { nextScreen: "Main" });
            }}
          >
            <Text className={`${textStyle}`}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeView>
  );
}

export default Main;
