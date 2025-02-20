import React from "react";
import { View, StyleSheet, Image, Text, Linking } from "react-native";
import { SCREEN_WIDTH as sw, SCREEN_HEIGHT as sh } from "../utils/dimensions";
import renderStars from "../utils/renderStars";
import { PriceRangeComponent } from "../utils/renderPrice";
import { parseRestaurantType, getDomain } from "../utils/parsing";
import Icon from "react-native-vector-icons/FontAwesome";

import CurrencySymbols from "../constants/CurrencyEnum";

const ExpandedCard = ({
  title,
  imageUri,
  RestaurantName,
  description,
  rating,
  category,
  priceLevel,
  priceRange,
  details,
  distance,
  onClose,
  website,
  address,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{RestaurantName}</Text>
        </View>
        {/* Category and distance row */}
        <View style={styles.categoryRow}>
          <Text style={styles.category}>{parseRestaurantType(category)}</Text>

          <Text style={styles.distance}>{distance}</Text>
        </View>

        {/* Rating, and price row */}
        <View style={styles.ratingRow}>
          {/* Insert star based reting */}
          {renderStars(rating)}
          {/* Insert dollar sign based price enum */}

          <PriceRangeComponent priceRange={priceRange} />
        </View>

        <Text style={styles.description}>{description}</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            gap: 15,
            marginBottom: 10,
          }}
        >
          <Icon name="map-marker" size={22} />
          <Text style={styles.address}>{address}</Text>
        </View>

        <View style={styles.websiteRow}>
          <Icon name="globe" size={22} />
          <Text
            style={styles.websiteText}
            onPress={() => Linking.openURL(website)}
          >
            {getDomain(website)}
          </Text>
        </View>

        <Text onPress={onClose} style={styles.closeButton}>
          Close
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    height: sh * 0.3,
    width: "100%",
    justifyContent: "center",
    overflow: "hidden",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 6,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 30,
  },
  websiteRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "baseline",
    gap: 15,
    marginBottom: 10,
  },

  websiteText: {
    color: "#007AFF",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  card: { padding: 20, backgroundColor: "#fff", borderRadius: 8 },
  title: {
    fontSize: 31,
    fontWeight: "800",
  },
  description: {
    fontSize: 15,
    color: "#000000",
    marginBottom: 20,
  },
  category: {
    fontSize: 14,
    color: "#666",
  },
  distance: {
    fontSize: 14,
    color: "#666",
  },
  image: {
    width: "100%", // Make the image take the full width of the container
    height: "100%", // Make the image take the full height of the container
    borderRadius: 10,
    resizeMode: "cover", // Ensures the image covers the entire container without stretching
  },
});

export default ExpandedCard;
