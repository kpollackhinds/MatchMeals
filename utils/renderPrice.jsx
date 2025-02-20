import React from "react";
import { Text, View, StyleSheet } from "react-native";
import CurrencySymbols from "@/constants/CurrencyEnum";

const priceLevelMapping = {
  PRICE_LEVEL_UNSPECIFIED: "N/A",
  PRICE_LEVEL_FREE: "Free",
  PRICE_LEVEL_INEXPENSIVE: "$",
  PRICE_LEVEL_MODERATE: "$$",
  PRICE_LEVEL_EXPENSIVE: "$$$",
  PRICE_LEVEL_VERY_EXPENSIVE: "$$$$",
};

const PriceLevelComponent = ({ priceLevel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{priceLevelMapping[priceLevel]}</Text>
    </View>
  );
};

const PriceRangeComponent = ({ priceRange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {CurrencySymbols[priceRange.startPrice.currencyCode]}
        {priceRange.startPrice.units} -{" "}
        {CurrencySymbols[priceRange.endPrice.currencyCode]}
        {priceRange.endPrice.units}
      </Text>
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

export { PriceLevelComponent, PriceRangeComponent };
