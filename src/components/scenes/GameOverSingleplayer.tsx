import { Text, View } from "react-native";
import { useEffect, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { db } from "@/lib/db";
import { UserContext } from "@/Context";
import SafeView from "@/components/shared/SafeView";
import {
  RegularButton,
  primaryBackgroundColor as bgColor,
  infoTextColor as textColor,
} from "@/components/shared/styles";
import type { RootStackParamList } from "@/Navigator";

type Props = StackScreenProps<RootStackParamList, "GameOverSingleplayer">;

function GameOverSingleplayer({ navigation, route }: Props) {
  const user = useContext(UserContext)!;
  const { score } = route.params;
  const { id: userId } = user;
  const highScore = user.highScore ?? 0;

  useEffect(() => {
    if (score > highScore) {
      db.transact(db.tx.$users[userId].update({ highScore: score }));
    }
  }, []);
  const isHighScore = score > highScore;
  const bestScore = isHighScore ? score : highScore;

  return (
    <SafeView className={`flex-1 px-8 ${bgColor}`}>
      {/* Top Bar */}
      <View className="flex-row justify-between items-center">
        <View className="justify-between gap-y-1">
          <Text className={`font-bold text-xl ${textColor}`}>
            Best: {bestScore}
          </Text>
        </View>
        <Text className={`font-bold text-5xl ${textColor}`}>{score}</Text>
      </View>

      {/* Game Over */}
      <View className="items-center mt-16">
        <Text className={`font-bold text-5xl uppercase ${textColor}`}>
          Game Over!
        </Text>
      </View>

      {/* High Score */}
      {isHighScore && (
        <View className="flex-1 justify-center items-center mt-16 gap-y-16">
          <Text className="font-bold text-3xl text-yellow-400">
            New High Score!
          </Text>
          <Text className="w-full font-bold text-8xl text-center">🏆</Text>
        </View>
      )}

      {/* Buttons */}
      <View className="flex-1 justify-end gap-y-4 my-4">
        <RegularButton
          onPress={() =>
            navigation.navigate("Singleplayer", { resetGame: true })
          }
        >
          Play Again
        </RegularButton>

        <RegularButton onPress={() => navigation.navigate("Main")}>
          Menu
        </RegularButton>
      </View>
    </SafeView>
  );
}

export default GameOverSingleplayer;
