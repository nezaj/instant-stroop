import { View, Text } from "react-native";

import { primaryBackgroundColor as bgColor } from "@/components/shared/styles";

export const LoadingPlaceholder = () => (
  <View className={`h-full ${bgColor}`} />
);

export const ErrorPlaceholder = ({ error }: { error: { message: string } }) => (
  <Text className={`h-full ${bgColor}`}>{error.message}</Text>
);
