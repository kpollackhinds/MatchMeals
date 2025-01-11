import { View, Text } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { LightTheme } from "../../constants/theme";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    // <PaperProvider theme={LightTheme}>
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
    // </PaperProvider>
  );
};

console.log("Rendering AuthLayout");
export default AuthLayout;
