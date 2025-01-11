// CustomButton.jsx
import { View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { Colors } from "@/constants/Colors";

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

export default AuthButton;
