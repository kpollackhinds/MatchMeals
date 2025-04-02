import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SCREEN_WIDTH as sw } from "../../utils/dimensions";
import { PrimaryButton } from "../CustomButton";
import { OnboardingScreenProps } from "@/interfaces/onboardingScreenInterfaces";

export default function SetupPreferencesScreen({ onNext, next }: OnboardingScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const togglePreference = (preference: string) => {
    setSelected((prev) => (prev.includes(preference) ? prev.filter((p) => p !== preference) : [...prev, preference]));
  };

  const preferences = ["Vegan", "Vegetarian", "Halal", "Gluten-Free", "Keto"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your preferences</Text>
      <Text style={styles.subtitle}>You can change this later in settings.</Text>

      <View style={styles.optionsContainer}>
        {preferences.map((pref) => (
          <TouchableOpacity
            key={pref}
            style={[styles.option, selected.includes(pref) && styles.selectedOption]}
            onPress={() => togglePreference(pref)}
          >
            <Text style={[styles.optionText, selected.includes(pref) && styles.selectedText]}>{pref}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <PrimaryButton title="Next" onPress={() => (onNext("foodType", selected), next())} />
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
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    margin: 5,
  },
  selectedOption: { backgroundColor: "black" },
  optionText: { fontSize: 16, color: "#333" },
  selectedText: { color: "white" },
});
