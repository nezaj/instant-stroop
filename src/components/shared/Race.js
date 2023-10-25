import { useEffect, useState, useRef } from "react";
import { View, Animated, Text } from "react-native";
import { avatarColor } from "@/utils/profile";
import { MULTIPLAYER_SCORE_TO_WIN } from "@/game";
import { colorStyleMap } from "@/game";

const colors = [
  "text-green-400",
  "text-blue-400",
  "text-yellow-400",
  "text-red-400",
  "text-blue-400",
  "text-red-400",
  "text-yellow-400",
  "text-blue-400",
  "text-green-400",
  "text-blue-400",
  "text-red-400",
];

function EndLabel({ label }) {
  const characters = label.split("").map((c, i) => {
    const textColor = colors[i];
    return (
      <Text
        key={i}
        style={colorStyleMap[textColor]}
        className="font-bold text-2xl uppercase"
      >
        {c}
      </Text>
    );
  });
  return <View className="flex-row my-2 justify-end">{characters}</View>;
}

function PlayerPosition({ handle, pos, goal, width, isGameOver }) {
  const avatarStyle = avatarColor(handle);
  const shift = Math.round((pos / goal) * width * 0.84);
  const translation = useRef(new Animated.Value(shift)).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: shift,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [pos, width]);

  if (!width) {
    <Text>...</Text>;
  }

  return (
    <Animated.View
      className={`${avatarStyle} absolute  w-12 h-12 rounded-full`}
      style={{ transform: [{ translateX: translation }] }}
    />
  );
}

function extractPlayerPoints(points, playerId) {
  return points.find((point) => point.userId === playerId).val;
}

export default function Race({
  players,
  points,
  goal = MULTIPLAYER_SCORE_TO_WIN,
}) {
  const [width, setWidth] = useState(null);
  const hasWidthBeenSet = useRef(false);

  const handleLayout = (event) => {
    if (!hasWidthBeenSet.current) {
      const { width } = event.nativeEvent.layout;
      setWidth(width);
      hasWidthBeenSet.current = true;
    }
  };

  return (
    <View onLayout={handleLayout}>
      <View className="flex-row items-start h-12">
        {players.map((p) => (
          <PlayerPosition
            key={p.id}
            handle={p.handle}
            width={width}
            pos={extractPlayerPoints(points, p.id)}
            goal={goal}
          />
        ))}
      </View>
      <Text className="text-5xl text-right pt-4">🏆</Text>
    </View>
  );
}
