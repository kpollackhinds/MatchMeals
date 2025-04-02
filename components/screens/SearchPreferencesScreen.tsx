import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { PrimaryButton } from "../CustomButton";
import { SCREEN_WIDTH as sw } from "../../utils/dimensions";

interface SearchSettingsScreenProps {
  onNext: (settings: { radius: number; openOnly: boolean }) => void;
  next: () => void;
}

export default function SearchSettingsScreen({ onNext, next }: SearchSettingsScreenProps) {
  const [radius, setRadius] = useState(10); // Default to 10 miles
  const [openNow, setOpenNow] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Settings</Text>

      {/* Search Radius Slider */}
      <Text style={styles.label}>Search Radius: {radius} miles</Text>
      <Slider
        style={styles.slider}
        minimumValue={5}
        maximumValue={50}
        step={5}
        value={radius}
        onValueChange={setRadius}
        minimumTrackTintColor="#400396"
        // maximumTrackTintColor="#000000"
      />

      {/* Open Now Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Only show open restaurants: </Text>
        <Switch
          value={openNow}
          onValueChange={setOpenNow}
          trackColor={{ false: "#767577", true: "#400396" }}
          thumbColor={openNow ? "white" : "#f4f3f4"}
        />
      </View>

      <PrimaryButton title="Next" onPress={() => (onNext({ radius: radius, openOnly: openNow }), next())} />
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
  label: { fontSize: 16, marginVertical: 10 },
  slider: { width: sw * 0.75, height: 40 },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
});
