import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import SafeView from "@/components/shared/SafeView";
import { avatarColor } from "@/utils/profile";

function chooseRandomColor() {
  const colors = ["red", "green", "blue", "yellow"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Consts
// ------------------
const colorMap = {
  "text-red-400": { color: "rgb(248 113 113)" },
  "text-green-400": { color: "rgb(74 222 128)" },
  "text-blue-400": { color: "rgb(96 165 250)" },
  "text-yellow-400": { color: "rgb(250 204 21)" },
};

const DEFAULT_SCORE = 0;
const SMALL = "SMALL";
const LARGE = "LARGE";

// Screen
// ------------------
function UserScore({ handle, score }) {
  const avatarStyle = avatarColor(handle);
  const shift = Math.round((score / 13) * 100, 0) * 0.85;
  console.log("shift", shift);
  return (
    <View
      className={`${avatarStyle} absolute  w-12 h-12 rounded-full`}
      style={{ left: `${shift}%` }}
    />
  );
}

function Multiplayer({ route, navigation }) {
  const [score, setScore] = useState(DEFAULT_SCORE);
  const [label, setLabel] = useState(chooseRandomColor());
  const [color, setColor] = useState(chooseRandomColor());
  const textColor = `text-${color}-400`;

  const { user, resetGame } = route.params;

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
