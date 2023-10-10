import { Text, View } from "react-native";

import SafeView from "../shared/SafeView";

function Screen({ data }) {
  return (
    <SafeView className="flex-1">
      {/* Top Bar */}
      <View className="flex-row justify-between items-center p-8">
        <View className="flex-col justify-between space-y-1">
          <Text className="font-bold text-xl">Time: 30</Text>
          <Text className="font-bold text-xl">Best: 25</Text>
        </View>
        <Text className="font-bold text-5xl">8</Text>
      </View>

      {/* Color Label */}
      <View className="flex-1 justify-center items-center">
        <Text className="font-bold text-5xl">RED</Text>
      </View>

      {/* Grid Boxes */}
      <View className="flex-1 flex-row flex-wrap justify-center mx-8">
        <View className="w-32 h-32 bg-gray-200 m-1"></View>
        <View className="w-32 h-32 bg-gray-300 m-1"></View>
        <View className="w-32 h-32 bg-gray-400 m-1"></View>
        <View className="w-32 h-32 bg-gray-500 m-1"></View>
      </View>
    </SafeView>
  );
}

export default Screen;
