import { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import SafeView from "@/components/shared/SafeView";
import {
  RegularButton,
  primaryBackgroundColor as bgColor,
  infoTextColor as textColor,
} from "@/components/shared/styles";

import { chooseRandomColor, colorStyleMap } from "@/game";

const infoTextStyle =
  "text-xl my-4 text-slate-100 font-semibold text-left leading-8";

const stroops = [
  ["red", "text-red-400"],
  ["yellow", "text-blue-400"],
  ["blue", "text-green-400"],
  ["green", "text-blue-400"],
  ["yellow", "text-red-400"],
  ["red", "text-yellow-400"],
  ["green", "text-green-400"],
  ["blue", "text-blue-400"],
  ["red", "text-red-400"],
  ["red", "text-yellow-400"],
  ["yellow", "text-yellow-400"],
  ["red", "text-yellow-400"],
  ["red", "text-red-400"],
  ["blue", "text-green-400"],
];

function MultiplayerHeader() {
  const characters = "Multiplayer".split("").map((c, i) => {
    const textColor = stroops[i][1];
    return (
      <Text
        style={colorStyleMap[textColor]}
        className="font-bold text-5xl uppercase my-2"
      >
        {c}
      </Text>
    );
  });
  return <View className="flex-row my-2">{characters}</View>;
}

function Stroop({ label, color }) {
  return (
    <Text className={`text-center text-3xl uppercase font-bold m-1 ${color}`}>
      {label}
    </Text>
  );
}

function HowToPlay({ route }) {
  const [score, setScore] = useState(0);
  const [label, setLabel] = useState(chooseRandomColor());
  const [color, setColor] = useState(chooseRandomColor());

  const onPress = (sqColor) => {
    if (sqColor == label) {
      setScore((prevScore) => prevScore + 1);
      setLabel(chooseRandomColor());
      setColor(chooseRandomColor());
    } else {
      setScore((prevScore) => Math.max(prevScore - 2, 0));
    }
  };

  const labelColor = `text-${label}-400`;
  return (
    <SafeView className={`flex-1 px-8 ${bgColor}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap space-x-2 items-center justify-center">
          {stroops.map(([label, color]) => (
            <Stroop label={label} color={color} />
          ))}
        </View>
        <Text className={infoTextStyle}>
          Do you find it a little difficult to read some of the words above? It
          can be a little confusing to{" "}
          <Text className="text-red-400 font-bold">read</Text> one color, but
          <Text className="text-green-400 font-bold"> see</Text> another -- this
          is known as the{" "}
          <Text className="text-center font-bold">Stroop Effect!</Text>
        </Text>

        <View className="flex-1 justify-center items-center">
          <Text
            style={colorStyleMap[textColor]}
            className="font-bold text-5xl uppercase my-2"
          >
            {label}
          </Text>
          <View className="flex-1 flex-row flex-wrap justify-center my-4 mx-8">
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
          <Text className="font-bold text-5xl uppercase my-2 text-slate-100">
            {score}
          </Text>
          <Text className={infoTextStyle}>
            Your goal is to press the{" "}
            <Text style={colorStyleMap[labelColor]}>square</Text> that matches
            the <Text style={colorStyleMap[labelColor]}>written label</Text>.
            When you click the right color, you score points. When you click the
            wrong color, you lose points!
          </Text>
          <MultiplayerHeader />
          <Text className={infoTextStyle}>
            You can play against other people by either creating or joining a
            room. When you play against others your in a race to see who can
            cross the finish line first!
          </Text>
        </View>
      </ScrollView>
    </SafeView>
  );
}

export default HowToPlay;
