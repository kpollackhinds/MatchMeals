import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useTheme, Text } from "react-native-paper";

import { AuthButton } from "../components/CustomButton";
import { handleNavigation } from "../utils/naviagtionUtils";
import { Colors } from "../constants/Colors";

const { width, height } = Dimensions.get("window");
const LandingScreen = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.primary }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            variant="displayLarge"
            style={[styles.title, { color: Colors.light.onPrimary }]}
          >
            Match Meals
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <AuthButton
            text="Sign In"
            style={[
              styles.button,
              {
                backgroundColor: Colors.light.background,
              },
            ]}
            onPress={() => handleNavigation(router, "/sign-in")}
            contentStyle={{
              height: 0.065 * height,
              width: 0.81 * width,
            }}
            textColor={Colors.light.primary}
          ></AuthButton>

          <AuthButton
            text="Sign Up"
            style={[
              styles.button,
              { backgroundColor: Colors.light.background },
            ]}
            onPress={() => handleNavigation(router, "/sign-up")}
            contentStyle={{
              height: 0.065 * height,
              width: 0.81 * width,
            }}
            textColor={Colors.light.primary}
          ></AuthButton>
        </View>

        <TouchableOpacity
          onPress={() => handleNavigation(router, "/home/session")}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 0.27 * height,
  },
  titleContainer: {
    alignItems: "center",
    // paddingTop: 250,
    // paddingBottom: 50,
    paddingBottom: 0.0536 * height,
  },

  title: {
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    marginBottom: 15,
    borderRadius: 30,
  },
  skipText: {
    marginTop: 16,
  },
});

export default LandingScreen;
