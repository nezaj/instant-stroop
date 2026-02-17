import { useEffect, useState, useRef } from "react";
import { View, Animated, Text, LayoutChangeEvent } from "react-native";
import { avatarColor } from "@/utils/profile";
import { MULTIPLAYER_SCORE_TO_WIN } from "@/game";

interface PlayerPositionProps {
  handle: string;
  pos: number;
  goal: number;
  width: number | null;
}

function PlayerPosition({ handle, pos, goal, width }: PlayerPositionProps) {
  const avatarStyle = avatarColor(handle);
  const shift = Math.round((pos / goal) * (width ?? 0) * 0.82);
  const translation = useRef(new Animated.Value(shift)).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: shift,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [pos, width]);

  if (!width) {
    return <Text>...</Text>;
  }

  return (
    <Animated.View
      className={`${avatarStyle} absolute w-12 h-12 rounded-full`}
      style={{ transform: [{ translateX: translation }] }}
    />
  );
}

interface Point {
  userId: string;
  val: number;
}

interface Player {
  id: string;
  handle: string;
}

function extractPlayerPoints(points: Point[], playerId: string) {
  return points.find((point) => point.userId === playerId)!.val;
}

interface RaceProps {
  players: Player[];
  points: Point[];
  goal?: number;
}

export default function Race({
  players,
  points,
  goal = MULTIPLAYER_SCORE_TO_WIN,
}: RaceProps) {
  const [width, setWidth] = useState<number | null>(null);
  const hasWidthBeenSet = useRef(false);

  const handleLayout = (event: LayoutChangeEvent) => {
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
