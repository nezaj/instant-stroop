import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import { GAME_COMPLETED, chooseRandomColor, colorStyleMap } from "@/game";
import { useQuery } from "@instantdb/react-native";
import SafeView from "@/components/shared/SafeView";
import UserScore from "@/components/shared/UserScore";

// Consts
// ------------------
const colorMap = {
  "text-red-400": { color: "rgb(248 113 113)" },
  "text-green-400": { color: "rgb(74 222 128)" },
  "text-blue-400": { color: "rgb(96 165 250)" },
  "text-yellow-400": { color: "rgb(250 204 21)" },
};

const DEFAULT_SCORE = 0;

function Multiplayer({ route, navigation }) {
  const { user, gameId } = route.params;
  console.log("gameId", gameId);
  const { isLoading, error, data } = useQuery({
    games: { users: {}, rooms: {}, $: { where: { id: gameId } } },
  });
  const [score, setScore] = useState(DEFAULT_SCORE);
  const [label, setLabel] = useState(chooseRandomColor());
  const [color, setColor] = useState(chooseRandomColor());

  const game = data?.games?.[0];
  console.log("Game", game);

  // Handle navigating away from game
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!game) {
      Toast.show("Oh no! Looks like this game was abruptly deleted.", {
        duration: Toast.durations.LONG,
      });
      navigation.navigate("Main");
      return;
    }

    if (game.status === GAME_COMPLETED) {
      navigation.navigate("GameOverMultiplayer", { gameId });
    }
  }, [isLoading, game]);

  if (isLoading || !game) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { status, spectatorIds, colors, scores } = game;

  const textColor = `text-${color}-400`;

  const onPress = (sqColor) => {
    if (sqColor == label) {
      setScore((prevScore) => prevScore + 1);
      setLabel(chooseRandomColor());
      setColor(chooseRandomColor());
    } else {
      setScore((prevScore) => Math.max(prevScore - 2, 0));
    }
  };

  return (
    <SafeView className="flex-1 px-8">
      <View className="mx-8 mt-4">
        <View className="flex-row items-start h-12">
          <UserScore handle="first" score={0} />
          <UserScore handle="second" score={1} />
          <UserScore handle="second" score={2} />
          <UserScore handle="second" score={3} />
          <UserScore handle="second" score={4} />
          <UserScore handle="second" score={5} />
          <UserScore handle="second" score={6} />
          <UserScore handle="second" score={7} />
          <UserScore handle="second" score={8} />
          <UserScore handle="second" score={9} />
          <UserScore handle="second" score={10} />
          <UserScore handle="second" score={11} />
          <UserScore handle="second" score={12} />
          <UserScore handle="third" score={13} />
        </View>
        <View className="flex-row justify-between mt-2 py-2">
          <Text className="text-3xl ">🧇</Text>
          <Text className="text-3xl">🏆</Text>
        </View>
      </View>

      {/* Color Label */}
      <View className="flex-1 justify-center items-center">
        <Text
          style={colorMap[textColor]}
          className="font-bold text-5xl uppercase"
        >
          {label}
        </Text>
      </View>

      {/* Grid Boxes */}
      <View className="flex-1 flex-row flex-wrap justify-center mx-8">
        <TouchableOpacity
          onPress={() => onPress("red")}
          className="w-32 h-32 bg-red-400 m-1"
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress("green")}
          className="w-32 h-32 bg-green-400 m-1"
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress("blue")}
          className="w-32 h-32 bg-blue-400 m-1"
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress("yellow")}
          className="w-32 h-32 bg-yellow-400 m-1"
        ></TouchableOpacity>
      </View>
    </SafeView>
  );
}

export default Multiplayer;
