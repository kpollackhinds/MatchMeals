import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../constants/Colors";
import { handleNavigation } from "../utils/naviagtionUtils";
import { SCREEN_HEIGHT as sh, SCREEN_WIDTH as sw } from "../utils/dimensions";
import { SessionButtons } from "../components/CustomButton";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.Container}>
      {/* Header (Profile + Menu Icons) */}
      <View style={styles.header}>
        <Ionicons name="person-sharp" size={32} color="gray" />
        <Ionicons name="menu" size={32} color="gray" />
      </View>

      {/* Title + Arrow */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Start Matching!</Text>
        {/* <FontAwesome6 name="down-long" size={50} color="black" /> */}
        <MaterialCommunityIcons name="arrow-down-thick" size={72} color="#400396" />
      </View>

      {/* Navigation Buttons */}
      <SessionButtons
        onPressBrowse={() => handleNavigation(router, "home/session")}
        onPressGroupSession={() => handleNavigation(router, "/home")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },

  titleRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: sh * 0.05,

    marginTop: sh * 0.1,
    marginBottom: sh * 0.03,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 44,
    fontWeight: "800",
    color: "black",
  },
});
