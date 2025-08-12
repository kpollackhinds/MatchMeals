import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { handleNavigation } from "@/utils/naviagtionUtils";
import { BrowseButton, GroupSessionButton } from "../../components/CustomButton";
import { Colors } from "../../constants/Colors";
import { SCREEN_HEIGHT as sh } from "../../utils/dimensions";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Modern Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={24} color={Colors.light.onSurface} />
        </TouchableOpacity>
        <Text style={styles.appName}>MatchMeals</Text>
        <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
          <Ionicons name="menu-outline" size={24} color={Colors.light.onSurface} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Ready to discover</Text>
          <Text style={styles.titleText}>restaurants near you?</Text>
          <Text style={styles.subtitleText}>Choose how you'd like to start matching</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <View style={styles.buttonWrapper}>
            <BrowseButton onPress={() => handleNavigation(router, "/home/session")} />
            <Text style={styles.buttonDescription}>Swipe through restaurants and find your perfect match</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <GroupSessionButton onPress={() => handleNavigation(router, "/home/groupSession")} />
            <Text style={styles.buttonDescription}>Match with friends and decide together</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.surfaceVariant,
  },
  appName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.primary,
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    marginTop: sh * 0.08,
    marginBottom: sh * 0.06,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "400",
    color: Colors.light.onSurfaceVariant,
    textAlign: "center",
    marginBottom: 8,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.light.onBackground,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 42,
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  actionsContainer: {
    flex: 1,
    gap: 24,
  },
  buttonWrapper: {
    alignItems: "center",
    gap: 12,
  },
  buttonDescription: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});
