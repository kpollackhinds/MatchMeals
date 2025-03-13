// CustomButton.jsx
import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { path } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome"; // Ensure you're using the correct icon library
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Import the correct icon set
import Feather from "react-native-vector-icons/Feather"; // Import from Feather
import { SCREEN_HEIGHT as sh, SCREEN_WIDTH as sw } from "@/utils/dimensions";

const AuthButton = ({
  text = "Click me",
  mode = "contained",
  // buttonColor = Colors.light.background,
  // textColor = Colors.light.primary,
  onPress = () => {},
  labelStyle = {},
  style = {},
  ...props
}) => {
  return (
    // <View style={[style, { opacity: props.isLoading ? 0.5 : 1 }]}>
    <Button
      mode={mode}
      // buttonColor={buttonColor}
      // textColor={textColor}
      onPress={onPress}
      loading={props.isLoading}
      style={[style]}
      labelStyle={[
        {
          fontSize: 16,
          // fontFamily: "Montserrat-Bold",
          fontWeight: "bold",
        },
        labelStyle,
      ]}
      {...props}
    >
      {text}
    </Button>
    // </View>
  );
};

const LikeButton = ({ onPress }) => {
  return (
    <Button
      mode="text" // Creates an outlined button with a solid background
      onPress={onPress}
      style={{
        // borderWidth: 2,
        // borderColor: "rgb(185, 24, 56)",
        backgroundColor: "white",
        minHeight: 0.065 * sh,
        minWidth: 0.01 * sw,
      }}
      labelStyle={{ fontSize: sh * 0.02, fontWeight: "bold" }}
      contentStyle={{
        flexDirection: "row-reverse", // Puts the icon on the right
        paddingVertical: 3,
      }}
      textColor="black" // Ensures text color remains black
      icon={() => <MaterialCommunityIcons name="heart-circle-outline" size={sh * 0.05} color="grey" />}
    >
      Like
    </Button>
  );
};

const DislikeButton = ({ onPress }) => {
  return (
    <Button
      mode="text" // Creates an outlined button with a solid background
      onPress={onPress}
      style={{
        // borderWidth: 2,
        // borderColor: "rgb(185, 24, 56)",
        backgroundColor: "white",
        minHeight: 0.065 * sh,
        minWidth: 0.01 * sw,
      }}
      labelStyle={{ fontSize: sh * 0.02, fontWeight: "bold" }}
      contentStyle={{
        flexDirection: "row-reverse", // Puts the icon on the right
        paddingVertical: 3,
      }}
      textColor="black" // Ensures text color remains black
      icon={() => <Feather name="x-circle" size={sh * 0.05} color="grey" />} // Custom right-side icon
    >
      Skip
    </Button>
  );
};

const PrimaryButton = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button_x, disabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const BrowseButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {/* SVG Icon */}

      {/* Text */}
      <Text style={styles.text}>Start Solo Browsing</Text>
    </TouchableOpacity>
  );
};

const GroupSessionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {/* SVG Icon */}

      {/* Text */}
      <Text style={styles.text}>Start Group Matching!</Text>
    </TouchableOpacity>
  );
};

const SessionButtons = ({ onPressBrowse, onPressGroupSession }) => {
  return (
    <View style={styles.buttonContainer}>
      <BrowseButton onPress={onPressBrowse} />
      <GroupSessionButton onPress={onPressGroupSession} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "space-between",
    gap: sw * 0.0333,
  },
  button: {
    width: sw * 0.45,
    height: sw * 0.45,
    // backgroundColor: "rgb(185, 24, 56)",
    backgroundColor: "rgb(0, 0, 0)", // Black background
    // borderColor: "white",
    borderRadius: 20, // Rounded corners
    borderWidth: 2, // Add a border
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // Stack icon and text

    shadowColor: "#400396", // Shadow matches accent color
    shadowOffset: { width: 0, height: 4 }, // Moves shadow down
    shadowOpacity: 0.2, // Opacity for soft shadow
    shadowRadius: 5, // Blur radius (higher = softer)
    elevation: 6, // For Android shadow
  },

  button_x: {
    backgroundColor: "#000", // Black for a modern, high-contrast look
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginTop: 20,
  },

  text: {
    marginTop: 8,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#888", // Muted color for disabled state
  },
});

export { AuthButton, LikeButton, DislikeButton, PrimaryButton, SessionButtons };
