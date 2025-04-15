import { useFonts } from "expo-font";
import { Slot, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState, createContext, useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from "../firebase/firebaseConfig";
import { User } from "firebase/auth";
import { handleNavigation } from "../utils/naviagtionUtils";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LightTheme, DarkTheme } from "@/constants/theme";
import userService from "@/services/UserService";
import NotFoundScreen from "./+not-found";

SplashScreen.preventAutoHideAsync();

export const AuthContext = createContext<User | null>(null);
export const useAuth = () => useContext(AuthContext);

export default function RootLayout() {
  const [userChecked, setUserChecked] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setUserChecked(true);

      if (userChecked) {
        await SplashScreen.hideAsync();
      }
    });

    return unsubscribe;
  }, [user, userChecked]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={user}>
        <Slot />
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}
