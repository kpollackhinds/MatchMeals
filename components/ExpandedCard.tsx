import React from "react";
import { View, StyleSheet, Image, Text, Linking, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { SCREEN_WIDTH as sw, SCREEN_HEIGHT as sh } from "../utils/dimensions";
import renderStars from "../utils/renderStars";
import { PriceRangeComponent } from "../utils/renderPrice";
import { parseRestaurantType, getDomain } from "../utils/parsing";
import Icon from "react-native-vector-icons/FontAwesome";

import { ExtendedCardProps } from "@/interfaces/tinderCardInterfaces";
import CurrencySymbols from "../constants/CurrencyEnum";
import OpenHoursComponent from "../components/OpenHoursComponent";
import ExpandableText from "../components/ExpandableText";
import { LikeButton, DislikeButton } from "./CustomButton";

const ExpandedCard: React.FC<ExtendedCardProps> = ({
  title,
  imageUri,
  RestaurantName,
  description,
  extendedDescription,
  rating,
  category,
  priceLevel,
  priceRange,
  details,
  distance,
  onClose,
  website,
  address,
  phoneNumber,
  openHours,
  onLike,
  onSkip,
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

        <View style={styles.hoursRow}>
          <OpenHoursComponent openHours={openHours} />
        </View>

        <ExpandableText text={extendedDescription} style={{ marginBottom: 15 }} />
        {/* <Text style={styles.description}>{extendedDescription}</Text> */}

        <View style={styles.addressRow}>
          <View style={styles.addressContainer}>
            <Icon name="map-marker" size={22} color={"rgb(185, 24, 56)"} />
            {/* <Text numberOfLines={2} style={styles.address}> */}
            <Text numberOfLines={2}>{address}</Text>
          </View>
          <Text> • </Text>

          <View style={styles.phoneContainer}>
            <Icon name="phone" size={22} color="rgb(185, 24, 56)" />
            {/* <Text onPress={() => Linking.openURL(`tel:${phoneNumber}`)} style={[styles.address]}> */}
            <Text onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>{phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.websiteRow}>
          <Icon name="globe" size={22} color="rgb(185, 24, 56)" />
          <Text style={styles.websiteText} onPress={() => Linking.openURL(website)}>
            {getDomain(website)}
          </Text>
        </View>

        <View style={styles.likeDislike}>
          <DislikeButton onPress={() => console.log("Disliked")} />
          <LikeButton onPress={() => console.log("Liked")} />
        </View>

        <Text onPress={onClose}>Close</Text>
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
    marginBottom: 6,
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 20,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    // minWidth: "50%", // Ensures it doesn't shrink too much
    maxWidth: "50%", // Prevents it from taking over the row
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    // minWidth: "50%", // Ensures it doesn't shrink too much
    maxWidth: "50%", // Prevents it from taking over the row
  },
  hoursRow: {
    flexDirection: "row",
  },
  websiteRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "baseline",
    gap: 15,
    marginBottom: 20,
  },
  likeDislike: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
