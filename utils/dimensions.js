// dimensions.js
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
console.log("Width: ", width, "Height: ", height);
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
