import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "react-native-paper";
import { TinderCard } from "rn-tinder-card";

const TinderCardComponent = ({
  cardWidth,
  cardHeight,
  OverlayLabelRight,
  OverlayLabelLeft,
  OverlayLabelTop,
  imageUri,
  title,
  description,
  onSwipedRight,
  onSwipedLeft,
  onSwipedTop,
  onTapLeft,
  onTapRight,
  onToggleExpand,
}) => {
  return (
    <TinderCard
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      OverlayLabelRight={OverlayLabelRight}
      // OverlayLabelLeft={OverlayLabelLeft}
      // OverlayLabelTop={OverlayLabelTop}
      cardStyle={styles.card}
      onSwipedRight={onSwipedRight}
      onSwipedLeft={onSwipedLeft}
      onSwipedTop={onSwipedTop}
    >
      <View style={styles.cardContent}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.touchableContainerMain}>
            <View style={styles.touchableContainerLR}>
              <TouchableWithoutFeedback onPress={onTapLeft}>
                <View style={styles.leftTouchable}></View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={onTapRight}>
                <View style={styles.rightTouchable}></View>
              </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback onPress={onToggleExpand}>
              <View style={styles.bottomTouchable}></View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TinderCard>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between", // Ensures image is at the top and text at the bottom
  },
  imageContainer: {
    flex: 3,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  touchableContainerMain: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // flexDirection: "column",
  },
  touchableContainerLR: {
    position: "absolute", // Overlays the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    height: "80%",
  },
  leftTouchable: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 255, 0.3)",
    // backgroundColor: "transparent",
  },
  rightTouchable: {
    flex: 1,
    backgroundColor: "rgba(255, 0, 0, 0.3)",
    // backgroundColor: "transparent",
  },
  bottomTouchable: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "20%",
    backgroundColor: "rgba(0, 255, 0, 0.3)",
    // backgroundColor: "transparent",
  },
});

export default TinderCardComponent;
