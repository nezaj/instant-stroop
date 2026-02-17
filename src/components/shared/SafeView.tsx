import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeViewProps extends ViewProps {
  children: React.ReactNode;
}

function SafeView({ children, ...props }: SafeViewProps) {
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
