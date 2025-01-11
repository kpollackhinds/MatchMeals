import { View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const FormField = ({ title, changeHandler, keyboardType, left, ...props }) => {
  return (
    <TextInput
      label={title}
      mode="flat"
      style={{ backgroundColor: "transparent" }}
      outlineStyle={{ borderRadius: 12 }}
      onChangeText={changeHandler}
      keyboardType={keyboardType}
      left={left}
      {...props}
    />
  );
};

export default FormField;
