import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function SafeView({ children, ...props }: ViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      {...props}
    >
      {children}
    </View>
  );
}

export default SafeView;
