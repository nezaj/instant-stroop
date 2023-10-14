import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Animated,
} from "react-native";
import { transact, tx } from "@instantdb/react-native";
import React, { useState, useRef, useEffect } from "react";

import SafeView from "@/components/shared/SafeView";
import randomHandle from "@/utils/randomHandle";
import { isAlphanumeric } from "@/utils/string";

const mainButtonStyle = "h-24 bg-gray-300 rounded-xl justify-center";
const textStyle = "text-4xl text-center";

const gray300 = "rgb(209, 213, 219)";
const red300 = "rgb(252, 165, 165)";
const validColor = gray300;
const invalidColor = red300;

function isValidHandle(handle) {
  return handle.length > 2 && handle.length < 17 && isAlphanumeric(handle);
}

function SaveHandleButton({ userId, handle, onPress }) {
  const isValid = isValidHandle(handle);
  const animatedValue = useRef(new Animated.Value(isValid ? 0 : 1)).current;
  const interpolatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [validColor, invalidColor],
  });
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isValid ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isValid]);

  return (
    <TouchableOpacity
      disabled={!isValid}
      className={`${mainButtonStyle} my-4`}
      style={{ backgroundColor: interpolatedBackgroundColor }}
      onPress={onPress}
    >
      <Text className={`${textStyle}`}>Save</Text>
    </TouchableOpacity>
  );
}

function Settings({ route, navigation }) {
  const { user, nextScreen, ...rest } = route.params;
  const [handle, setHandle] = useState(user.handle || randomHandle());
  const handleSave = () => {
    transact(tx.users[user.id].update({ handle }));
    navigation.navigate(nextScreen || "Main", { ...rest });
  };
  return (
    <SafeView className="flex-1 mx-8">
      <View className="flex-1 justify-end">
        <Text className="text-xl my-4 text-center">Enter name</Text>
        <TextInput
          className="border h-20 p-2 text-4xl text-center"
          onChangeText={setHandle}
          value={handle}
        />
      </View>
      <View className="flex-1 justify-end">
        <SaveHandleButton handle={handle} onPress={handleSave} />
      </View>
    </SafeView>
  );
}

export default Settings;
