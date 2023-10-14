import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import SafeView from "@/components/shared/SafeView";

function chooseRandomColor() {
  const colors = ["red", "green", "blue", "yellow"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Consts
// ------------------
const DEFAULT_SCENE = "Singleplayer";
const colorMap = {
  "text-red-400": { color: "rgb(248 113 113)" },
  "text-green-400": { color: "rgb(74 222 128)" },
  "text-blue-400": { color: "rgb(96 165 250)" },
  "text-yellow-400": { color: "rgb(250 204 21)" },
};

const DEFAULT_CLOCK = 5;
const DEFAULT_SCORE = 0;

// Screen
// ------------------
function Singleplayer({ route, navigation }) {
  const [clock, setClock] = useState(DEFAULT_CLOCK);
  const [score, setScore] = useState(DEFAULT_SCORE);
  const [label, setLabel] = useState(chooseRandomColor());
  const [color, setColor] = useState(chooseRandomColor());
  const textColor = `text-${color}-400`;

  const { user, resetGame } = route.params;
  const { highScore } = user;

  // Reset Game
  useEffect(() => {
    if (resetGame) {
      setClock(DEFAULT_CLOCK);
      setScore(DEFAULT_SCORE);
      setLabel(chooseRandomColor());
      setColor(chooseRandomColor());
      route.params.resetGame = false;
    }
  }, [resetGame]);

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setClock((prevClock) => {
        if (prevClock < 2) {
          return 0;
        }
        return prevClock - 1;
      });
    }, 600);

    return () => clearInterval(timer);
  }, []);

  // End Game
  useEffect(() => {
    if (clock === 0) {
      navigation.navigate("GameOverSingleplayer", { score });
    }
  }, [clock]);

  const onPress = (sqColor) => {
    if (sqColor == label) {
      setScore((prevScore) => prevScore + 1);
      setClock((prevClock) => prevClock + 1);
      setLabel(chooseRandomColor());
      setColor(chooseRandomColor());
    } else {
      setScore((prevScore) => Math.max(prevScore - 2, 0));
    }
  };

  return (
    <SafeView className="flex-1">
      {/* Top Bar */}
      <View className="flex-row justify-between items-center px-8">
        <View className="flex-col justify-between space-y-1">
          <Text className="font-bold text-xl">Best: {highScore}</Text>
        </View>
        <Text className="font-bold text-5xl">{score}</Text>
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

export default Singleplayer;
