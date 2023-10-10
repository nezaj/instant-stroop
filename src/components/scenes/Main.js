import { Text, TouchableOpacity, View } from "react-native";

import SafeView from "@/components/shared/SafeView";

const mainButtonStyle = "h-24 bg-gray-300 rounded-xl justify-center";
const minorButtonStyle = "w-32 h-24 bg-gray-300 rounded-xl justify-center";
const textStyle = "text-4xl text-center";

function Main({ navigation, route }) {
  const { data } = route.params;
  return (
    <SafeView className="flex-1 items-center">
      <View className="w-32 h-32 bg-gray-300 rounded-full mb-8" />
      <Text className="text-5xl font-bold mb-6">Stroopwafel</Text>

      <View className="flex-1 justify-center space-y-4">
        <TouchableOpacity className={`${mainButtonStyle}`}>
          <Text
            className={`${textStyle}`}
            onPress={() =>
              navigation.navigate("Singleplayer", { resetGame: true })
            }
          >
            Start
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className={`${mainButtonStyle}`}>
          <Text className={`${textStyle}`}>Create Game</Text>
        </TouchableOpacity>

        <TouchableOpacity className={`${mainButtonStyle}`}>
          <Text className={`${textStyle}`}>Join Game</Text>
        </TouchableOpacity>

        <View className="flex-row space-x-4">
          <TouchableOpacity className={`${minorButtonStyle}`}>
            <Text className={`${textStyle}`}>Rules</Text>
          </TouchableOpacity>

          <TouchableOpacity className={`${minorButtonStyle}`}>
            <Text className={`${textStyle}`}>Name</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeView>
  );
}

export default Main;
