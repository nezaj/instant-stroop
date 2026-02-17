import { useContext } from "react";
import { Text, View } from "react-native";
import { id } from "@instantdb/react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { db } from "@/lib/db";
import { UserContext } from "@/Context";
import SafeView from "@/components/shared/SafeView";
import {
  RegularButton,
  HalfButton,
  primaryBackgroundColor as bgColor,
} from "@/components/shared/styles";
import randomCode from "@/utils/randomCode";
import { now } from "@/utils/time";
import type { RootStackParamList } from "@/Navigator";

type Props = StackScreenProps<RootStackParamList, "Main">;

function Main({ navigation }: Props) {
  const user = useContext(UserContext)!;
  const { id: userId } = user;
  return (
    <SafeView className={`flex-1 items-center justify-around ${bgColor}`}>
      <View className="flex-1 justify-center space-y-2">
        <Text className="text-8xl text-center">🧇</Text>
        <Text className="justify-end text-5xl font-bold text-yellow-400">
          Stroopwafel
        </Text>
      </View>

      <View className="flex-2 justify-end my-4">
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
            const code = randomCode();
            db.transact(
              db.tx.rooms[roomId]
                .update({
                  code: code,
                  hostId: userId,
                  readyIds: [],
                  kickedIds: [],
                  created_at: now(),
                })
                .link({ users: userId })
            );
            navigation.navigate("WaitingRoom", { code: code });
          }}
        >
          Create Game
        </RegularButton>

        <RegularButton onPress={() => navigation.navigate("JoinRoom")}>
          Join Game
        </RegularButton>

        <View className="flex-row my-2 space-x-4">
          <View>
            <HalfButton onPress={() => navigation.navigate("HowToPlay")}>
              Rules
            </HalfButton>
          </View>
          <View>
            <HalfButton onPress={() => navigation.navigate("Settings")}>
              Profile
            </HalfButton>
          </View>
        </View>
      </View>
    </SafeView>
  );
}

export default Main;
