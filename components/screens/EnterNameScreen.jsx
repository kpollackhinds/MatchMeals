import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { SCREEN_WIDTH as sw } from "../../utils/dimensions";
import { PrimaryButton } from "../CustomButton";

export default function EnterNameScreen({ onNext }) {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s your name?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <PrimaryButton title="Next" onPress={() => name && onNext()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: sw * 0.8,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 18,
    textAlign: "center",
  },
});
