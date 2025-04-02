import { StyleProp, ViewStyle } from "react-native";

interface ButtonProps {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export { ButtonProps };
