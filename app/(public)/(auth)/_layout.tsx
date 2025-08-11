import React from "react";
// import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    // <PaperProvider theme={LightTheme}>
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
    </Stack>
    // </PaperProvider>
  );
};

export default AuthLayout;
