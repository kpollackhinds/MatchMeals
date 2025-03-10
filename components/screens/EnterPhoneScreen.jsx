import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SCREEN_WIDTH as sw } from "../../utils/dimensions";
import { PrimaryButton } from "../CustomButton";

export default function EnterPhoneScreen({ onNext, onSkip }) {
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s your phone number?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <PrimaryButton title="Next" onPress={() => phone && onNext()} />
      <TouchableOpacity onPress={onSkip}>
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
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
  skipText: {
    color: "#555",
    fontSize: 16,
    marginTop: 15,
    textDecorationLine: "underline",
  },
});
