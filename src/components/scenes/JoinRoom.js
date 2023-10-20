import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Animated,
} from "react-native";
import { useQuery, transact, tx } from "@instantdb/react-native";
import React, { useState, useRef, useEffect } from "react";

import SafeView from "@/components/shared/SafeView";
import randomHandle from "@/utils/randomHandle";
import { isAlphanumeric } from "@/utils/string";

const mainButtonStyle = "h-24 bg-gray-300 rounded-xl justify-center";
const textStyle = "text-4xl text-center";

const gray300 = "rgb(209, 213, 219)";
const red300 = "rgb(252, 165, 165)";
const validColor = gray300;
const invalidColor = red300;

function JoinRoomButton({ isValidRoomCode, handle, onPress }) {
  const animatedValue = useRef(
    new Animated.Value(isValidRoomCode ? 0 : 1)
  ).current;
  const interpolatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [validColor, invalidColor],
  });
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isValidRoomCode ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isValidRoomCode]);

  return (
    <TouchableOpacity
      disabled={!isValidRoomCode}
      className={`${mainButtonStyle} my-4`}
      style={{ backgroundColor: interpolatedBackgroundColor }}
      onPress={onPress}
    >
      <Text className={`${textStyle}`}>Join</Text>
    </TouchableOpacity>
  );
}

function JoinRoom({ route, navigation }) {
  const { isLoading, error, data } = useQuery({ rooms: {} });
  const [roomCode, setRoomCode] = useState("");

  if (isLoading) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { user } = route.params;
  const room = data["rooms"].find(
    (r) => r.code === roomCode && !r.kickedIds.includes(user.id)
  );

  const handleJoin = () => {
    if (room) {
      transact(tx.rooms[room.id].link({ users: user.id }));
      const nextScreen = room.currentGameId
        ? ["Multiplayer", { gameId: room.currentGameId }]
        : ["WaitingRoom", { roomId: room.id }];
      navigation.navigate(...nextScreen);
    }
  };

  return (
    <SafeView className="flex-1 mx-8">
      <View className="flex-1 justify-end">
        <Text className="text-xl my-4 text-center">Enter room code</Text>
        <TextInput
          autoCapitalize="characters"
          autoCorrect={false}
          className="border h-20 p-2 text-4xl text-center"
          onChangeText={setRoomCode}
          value={roomCode}
        />
      </View>
      <View className="flex-1 justify-end">
        <JoinRoomButton
          isValidRoomCode={!!room}
          handle={roomCode}
          onPress={handleJoin}
        />
      </View>
    </SafeView>
  );
}

export default JoinRoom;
