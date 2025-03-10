import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { handleNavigation } from "../utils/naviagtionUtils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT as sh, SCREEN_WIDTH as sw } from "../utils/dimensions";
import { BrowseButton, GroupSessionButton } from "../components/CustomButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <View style={styles.profileRow}>
          <Ionicons name="person-sharp" size={32} color="gray" />
          <Ionicons name="menu" size={32} color="gray" />
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>Start Matching!</Text>
          {/* <FontAwesome6 name="down-long" size={50} color="black" /> */}
          <MaterialCommunityIcons
            name="arrow-down-thick"
            size={72}
            color="black"
          />
        </View>

        <TouchableOpacity
          onPress={() => handleNavigation(router, "home/session")}
        ></TouchableOpacity>

        <View style={styles.buttonsContainer}>
          <BrowseButton
            onPress={() => handleNavigation(router, "home/session")}
          />
          <GroupSessionButton
            onPress={() => handleNavigation(router, "home/session")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
  },
  profileRow: {
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
  titleText: {
    fontSize: 44,
    fontWeight: "800",
    color: "black",
  },
});
