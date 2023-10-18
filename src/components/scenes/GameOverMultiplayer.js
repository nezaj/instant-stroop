import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { transact, tx } from "@instantdb/react-native";

import SafeView from "@/components/shared/SafeView";
import UserScore from "@/components/shared/UserScore";

// Consts
// ------------------

// Styles
// ------------------
const mainButtonStyle = "h-24 bg-gray-300 rounded-xl justify-center";
const textStyle = "text-4xl text-center";

// Screen
// ------------------
function GameOverMultiPlayer({ navigation, route }) {
  const { user } = route.params;

  return (
    <SafeView className="flex-1 mx-8">
      {/* Top Bar */}
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

      {/* Game Over */}
      <View className="items-center mt-16">
        <Text className="font-bold text-5xl uppercase">Game Over!</Text>
      </View>

      {/* High Score */}
      <View className="flex-1 justify-center items-center space-y-2">
        <Text className="font-bold text-2xl">🏆 FunnyBunny1234</Text>
        <Text className="font-bold text-2xl">🐇 FunnyBunny1234</Text>
        <Text className="font-bold text-2xl">🐢 FunnyBunny1234</Text>
        <Text className="font-bold text-2xl">👏 FunnyBunny1234</Text>
      </View>

      {/* Buttons */}
      <View className="flex-1 justify-center space-y-4">
        <TouchableOpacity
          className={`${mainButtonStyle}`}
          onPress={() =>
            navigation.navigate("Singleplayer", { resetGame: true })
          }
        >
          <Text className={`${textStyle}`}>Play Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`${mainButtonStyle}`}
          onPress={() => navigation.navigate("Main")}
        >
          <Text className={`${textStyle}`}> Menu </Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}

export default GameOverMultiPlayer;
