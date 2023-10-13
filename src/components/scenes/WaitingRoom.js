import { Text, TouchableOpacity, View } from "react-native";

import SafeView from "@/components/shared/SafeView";

const mainButtonStyle = "h-24 bg-gray-300 rounded-xl justify-center";
const textStyle = "text-4xl text-center";

function UserPill({ handle, title }) {
  return (
    <View className="flex-row rounded-xl border border-black items-center my-2 py-4">
      <View className="mx-4 w-12 h-12 bg-gray-300 rounded-full" />
      <View className="flex-1 flex-col space-y-1">
        <Text className="text-lg">{handle}</Text>
        <Text className="text-md">{title}</Text>
      </View>
    </View>
  );
}

function WaitingRoom({ route }) {
  const { user } = route.params;

  return (
    <SafeView className="flex-1 justify-center mx-8">
      <View className="flex-1 justify-start -mt-2">
        <UserPill handle="User 1" title="Host" />
        <UserPill handle="User 2" />
        <UserPill handle="User 3" title="You" />
      </View>
      <View className="flex-1 justify-end space-y-4">
        <TouchableOpacity className={`${mainButtonStyle}`}>
          <Text className={`${textStyle}`}>Invite Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`${mainButtonStyle}`}>
          <Text className={`${textStyle}`}>Ready!</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}

export default WaitingRoom;
