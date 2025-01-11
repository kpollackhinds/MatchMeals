import { DefaultTheme, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { Colors } from "./Colors";

const LightTheme = {
  ...MD3LightTheme,
  colors: Colors.light,
};

const DarkTheme = {
  ...MD3DarkTheme,
  colors: Colors.dark,
};

export { LightTheme, DarkTheme };
