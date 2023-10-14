import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { transact, tx } from "@instantdb/react-native";

import SafeView from "@/components/shared/SafeView";

// Consts
// ------------------

// Styles
// ------------------
const mainButtonStyle = "h-24 bg-gray-300 rounded-xl justify-center";
const textStyle = "text-4xl text-center";

// Screen
// ------------------
function GameOverSingleplayer({ navigation, route }) {
  const { user, score } = route.params;
  const { id: userId, highScore } = user;

  useEffect(() => {
    if (score > highScore) {
      transact(tx.users[userId].update({ highScore: score }));
    }
  }, []);
  const isHighScore = score > highScore ? true : false;
  const bestScore = isHighScore ? score : highScore;

  return (
    <SafeView className="flex-1 mx-8">
      {/* Top Bar */}
      <View className="flex-row justify-between items-center">
        <View className="flex-col justify-between space-y-1">
          <Text className="font-bold text-xl">Best: {bestScore}</Text>
        </View>
        <Text className="font-bold text-5xl">{score}</Text>
      </View>

      {/* Game Over */}
      <View className="items-center mt-16">
        <Text className="font-bold text-5xl uppercase">Game Over!</Text>
      </View>

      {/* High Score */}
      {isHighScore && (
        <View className="flex-1 justify-center items-center mt-16 space-y-16">
          <Text className="font-bold text-2xl">New High Score!</Text>
          <Text className="w-full font-bold text-5xl text-center">🏆</Text>
        </View>
      )}

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

export default GameOverSingleplayer;
