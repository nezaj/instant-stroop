import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import SafeView from "@/components/shared/SafeView";

function chooseRandomColor() {
  const colors = ["red", "green", "blue", "yellow"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const colorMap = {
  "text-red-400": { color: "rgb(248 113 113)" },
  "text-green-400": { color: "rgb(74 222 128)" },
  "text-blue-400": { color: "rgb(96 165 250)" },
  "text-yellow-400": { color: "rgb(250 204 21)" },
};

function Screen({ route }) {
  const { data } = route.params;
  const [score, setScore] = useState(0);
  const [label, setLabel] = useState(chooseRandomColor());
  const [color, setColor] = useState(chooseRandomColor());
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
    <SafeView className="flex-1">
      {/* Top Bar */}
      <View className="flex-row justify-between items-center px-8">
        <View className="flex-col justify-between space-y-1">
          <Text className="font-bold text-xl">Time: 30</Text>
          <Text className="font-bold text-xl">Best: 25</Text>
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

export default Screen;
