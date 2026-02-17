import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import Toast from "react-native-root-toast";

import { db } from "@/lib/db";
import SafeView from "@/components/shared/SafeView";
import {
  primaryBackgroundColor as bgColor,
  regularButtonStyle,
  infoTextColor as textColor,
} from "@/components/shared/styles";
import {
  ErrorPlaceholder,
} from "@/components/shared/Placeholder";
import { UserContext } from "@/Context";
import type { RootStackParamList } from "@/Navigator";

const textStyle = "text-4xl text-center";

const violet100 = "rgb(237 233 254);";
const red300 = "rgb(252, 165, 165)";
const validColor = violet100;
const invalidColor = red300;

function JoinRoomButton({
  isValidRoomCode,
  onPress,
}: {
  isValidRoomCode: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      disabled={!isValidRoomCode}
      className={`${regularButtonStyle} my-4`}
      style={{ backgroundColor: isValidRoomCode ? validColor : invalidColor }}
      onPress={onPress}
    >
      <Text className={`${textStyle}`}>Join</Text>
    </TouchableOpacity>
  );
}

type Props = StackScreenProps<RootStackParamList, "JoinRoom">;

function JoinRoom({ route, navigation }: Props) {
  const user = useContext(UserContext)!;
  const [roomCode, setRoomCode] = useState(route.params?.code || "");
  const [joinRoom, setJoinRoom] = useState<any>(null);
  const { error, data } = db.useQuery({
    rooms: { $: { where: { code: roomCode } } },
  });
  const room = data?.rooms?.[0];

  useEffect(() => {
    if (!joinRoom) return;
    const join = async () => {
      await db.transact(db.tx.rooms[joinRoom.id].link({ users: user.id }));
      const nextScreen = joinRoom.currentGameId
        ? (["Multiplayer", { gameId: joinRoom.currentGameId }] as const)
        : (["WaitingRoom", { code: joinRoom.code }] as const);
      navigation.navigate(...nextScreen);
    };
    join();
  }, [joinRoom?.code]);

  if (error) return <ErrorPlaceholder error={error} />;

  const isKicked = room?.kickedIds?.includes(user.id);

  const handleJoin = () => {
    if (isKicked) {
      Toast.show("You were kicked from this room.", {
        duration: Toast.durations.LONG,
      });
      return;
    }
    setJoinRoom(room);
  };

  return (
    <SafeView className={`flex-1 items-center ${bgColor}`}>
      <View className="flex-1 w-full px-8">
        <View className="flex-1 justify-end">
          <Text
            className={`text-2xl font-semibold my-4 text-center ${textColor}`}
          >
            Enter room code
          </Text>
          <TextInput
            defaultValue={roomCode}
            autoCapitalize="characters"
            autoCorrect={false}
            className={`h-20 p-2 text-4xl text-center border-4 border-amber-400 ${textColor} font-semibold`}
            onEndEditing={(e) => setRoomCode(e.nativeEvent.text)}
          />
        </View>
        <View className="flex-1 justify-end">
          <JoinRoomButton isValidRoomCode={!!room && !isKicked} onPress={handleJoin} />
        </View>
      </View>
    </SafeView>
  );
}

export default JoinRoom;
