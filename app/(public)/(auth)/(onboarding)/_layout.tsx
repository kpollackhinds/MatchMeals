import { View, Text } from "react-native";
import React from "react";
// import { PaperProvider } from "react-native-paper";
import { LightTheme } from "../../../../constants/theme";
import { Stack } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OnboardingLayout;
