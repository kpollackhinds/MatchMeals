import React from "react";
import { Text, View, StyleSheet } from "react-native";

const priceLevelMapping = {
  PRICE_LEVEL_UNSPECIFIED: "N/A",
  PRICE_LEVEL_FREE: "Free",
  PRICE_LEVEL_INEXPENSIVE: "$",
  PRICE_LEVEL_MODERATE: "$$",
  PRICE_LEVEL_EXPENSIVE: "$$$",
  PRICE_LEVEL_VERY_EXPENSIVE: "$$$$",
};

const PriceLevelComponent = ({ priceLevel }) => {
  console.log(priceLevel);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{priceLevelMapping[priceLevel]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0e4d1e",
  },
});

export default PriceLevelComponent;
