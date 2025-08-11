import React from "react";
// import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    // <PaperProvider theme={LightTheme}>
    <Stack>
      <Stack.Screen name="session" options={{ headerShown: false }} />
    </Stack>
    // </PaperProvider>
  );
};

export default HomeLayout;
