import { Text, View } from "react-native";
import { useEffect, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import Toast from "react-native-root-toast";

import { db } from "@/lib/db";
import SafeView from "@/components/shared/SafeView";
import Race from "@/components/shared/Race";
import {
  RegularButton,
  primaryBackgroundColor as bgColor,
  infoTextColor as textColor,
} from "@/components/shared/styles";
import {
  LoadingPlaceholder,
  ErrorPlaceholder,
} from "@/components/shared/Placeholder";
import { UserContext } from "@/Context";
import { leaveRoomTx } from "@/game";
import type { RootStackParamList } from "@/Navigator";

// Consts
// ------------------
const rankIcons = ["🏆", "🐇", "🐢"];

type Props = StackScreenProps<RootStackParamList, "GameOverMultiplayer">;

// Screen
// ------------------
function GameOverMultiPlayer({ navigation, route }: Props) {
  const user = useContext(UserContext)!;
  const { gameId } = route.params;
  const { isLoading, error, data } = db.useQuery({
    games: { users: {}, rooms: {}, points: {}, $: { where: { id: gameId } } },
  });

  const game = data?.games?.[0] as any;

  // Handle navigating away from game
  useEffect(() => {
    if (!navigation.isFocused()) return;
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
  }, [isLoading, game]);

  if (isLoading || !game) return <LoadingPlaceholder />;
  if (error) return <ErrorPlaceholder error={error} />;

  const { points, rooms, playerIds, users } = game;
  const room = rooms[0];
  const { code } = room;

  const rankedPoints = [...points].sort((a: any, b: any) => b.val - a.val);
  const userMap = users.reduce((xs: any, u: any) => {
    xs[u.id] = u;
    return xs;
  }, {} as Record<string, any>);
  const players = playerIds.map((playerId: string) => userMap[playerId]);
  const top3 = rankedPoints
    .map((p: any, i: number) => [i, userMap[p.userId]] as const)
    .slice(0, 3);

  return (
    <SafeView className={`flex-1 px-8 ${bgColor}`}>
      {/* Top Bar */}
      <View className="mx-8 mt-4">
        <Race players={players} points={points} />
      </View>

      {/* Game Over */}
      <View className="items-center mt-16">
        <Text className={`font-bold  text-5xl uppercase ${textColor}`}>
          Game Over!
        </Text>
      </View>

      {/* Rankings */}
      <View className="flex-1 justify-center items-center gap-y-2">
        {top3.map(([rank, player]) => (
          <Text key={rank} className={`font-bold text-2xl ${textColor}`}>
            {rankIcons[rank]} {player?.handle}
          </Text>
        ))}
      </View>

      {/* Buttons */}
      <View className="justify-center gap-y-4 my-4">
        <RegularButton
          onPress={() => {
            db.transact(db.tx.rooms[room.id].update({ currentGameId: null }));
            navigation.reset({
              index: 1,
              routes: [
                { name: "Main" },
                { name: "WaitingRoom", params: { code } },
              ],
            });
          }}
        >
          Play Again
        </RegularButton>

        <RegularButton
          onPress={() => {
            leaveRoomTx(user.id, room);
            navigation.reset({ index: 0, routes: [{ name: "Main" }] });
          }}
        >
          Menu
        </RegularButton>
      </View>
    </SafeView>
  );
}

export default GameOverMultiPlayer;
