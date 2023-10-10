import { Text, View, TouchableOpacity } from "react-native";

import SafeView from "@/components/shared/SafeView";

const mainButtonStyle = "h-24 bg-gray-300 rounded-xl justify-center";
const textStyle = "text-4xl text-center";

function Screen({ navigation, route }) {
  const { data } = route.params;
  console.log(route);
  return (
    <SafeView className="flex-1 mx-8">
      {/* Top Bar */}
      <View className="flex-row justify-between items-center">
        <View className="flex-col justify-between space-y-1">
          <Text className="font-bold text-xl">Time: 0</Text>
          <Text className="font-bold text-xl">Best: 25</Text>
        </View>
        <Text className="font-bold text-5xl">8</Text>
      </View>

      {/* Game Over */}
      <View className="items-center mt-16">
        <Text className="font-bold text-5xl uppercase">Game Over!</Text>
      </View>

      {/* High Score */}
      <View className="flex-1 justify-center items-center mt-16 space-y-16">
        <Text className="font-bold text-2xl">New High Score!</Text>
        <Text className="w-full font-bold text-5xl text-center">🏆</Text>
      </View>

      {/* Buttons */}
      <View className="flex-1 justify-center space-y-4">
        <TouchableOpacity
          className={`${mainButtonStyle}`}
          onPress={() => navigation.navigate("Singleplayer")}
        >
          <Text className={`${textStyle}`}>Play Again</Text>
        </TouchableOpacity>

        <TouchableOpacity className={`${mainButtonStyle}`}>
          <Text
            className={`${textStyle}`}
            onPress={() => navigation.navigate("Main")}
          >
            Menu
          </Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}

export default Screen;
