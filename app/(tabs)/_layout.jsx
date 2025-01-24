import { Tabs } from "expo-router";
import { Text, BottomNavigation } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";

import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./home";
import Settings from "./settings";

// const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: Colors.light.primary, // active tab color
          tabBarInactiveTintColor: Colors.light.onSurfaceDisabled, // inactive tab color
          tabBarStyle: {
            backgroundColor: Colors.light.background, // background color for the tab bar
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons name="home" size={size} color={color} />
              );
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons name="cog" size={size} color={color} />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
}
