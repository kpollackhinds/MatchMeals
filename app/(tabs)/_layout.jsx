// /app/index.js

import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors"; // your color constants

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Disable header globally for all screens
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.onSurfaceDisabled,
      }}
    >
      <Tabs.Screen
        name="home" // Points to the 'home' folder
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings" // Points to the 'settings' folder
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
