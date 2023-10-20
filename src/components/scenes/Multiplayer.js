import { Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Toast from "react-native-root-toast";

import { GAME_COMPLETED, MULTIPLAYER_SCORE_TO_WIN } from "@/game";
import { useQuery, tx, transact } from "@instantdb/react-native";
import SafeView from "@/components/shared/SafeView";
import Race from "@/components/shared/Race";
import { primaryBackgroundColor as bgColor } from "@/components/shared/styles";

// Consts
// ------------------
const colorMap = {
  "text-red-400": { color: "rgb(248 113 113)" },
  "text-green-400": { color: "rgb(74 222 128)" },
  "text-blue-400": { color: "rgb(96 165 250)" },
  "text-yellow-400": { color: "rgb(250 204 21)" },
};

function Multiplayer({ route, navigation }) {
  const { user, gameId } = route.params;
  const { isLoading, error, data } = useQuery({
    games: { users: {}, rooms: {}, points: {}, $: { where: { id: gameId } } },
  });

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
      return;
    }
  }, [isLoading, game]);

  if (isLoading || !game) return <Text>...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { playerIds, colors, users, points, rooms } = game;

  const userPoints = points.find((p) => p.userId === user.id);
  const isSpectator = !userPoints;
  const pos = isSpectator ? 0 : userPoints.val;
  const { color, label } = colors[pos];

  const textColor = `text-${color}-400`;

  const onPress = (sqColor) => {
    // (XXX): No-op until we implement spectator mode!
    if (isSpectator) {
      return;
    }
    const { id: pointsId, val } = userPoints;
    const newVal = sqColor === label ? val + 1 : Math.max(val - 2, 0);
    let txs = [];
    txs.push(tx.points[pointsId].update({ val: newVal }));
    if (newVal === MULTIPLAYER_SCORE_TO_WIN) {
      const roomId = rooms[0].id;
      const updateGame = tx.games[gameId].update({ status: GAME_COMPLETED });
      const updateRoom = tx.rooms[roomId].update({ currentGameId: null });
      txs.push(updateGame);
      txs.push(updateRoom);
    }
    transact([...txs]);
  };

  const players = users.filter((u) => playerIds.includes(u.id));
  return (
    <SafeView className={`flex-1 px-8 ${bgColor}`}>
      <View className="mx-8 mt-4">
        <Race players={players} points={points} />
        <View className="flex-row justify-between mt-2 py-2">
          <Text className="text-5xl ">🧇</Text>
          <Text className="text-5xl">🏆</Text>
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
