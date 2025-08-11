import React from "react";
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { RestaurantCardProps } from "../interfaces/tinderCardInterfaces";
import { parseRestaurantType } from "../utils/parsing";
import renderStars from "../utils/renderStars";

const TinderCardComponent: React.FC<RestaurantCardProps> = ({
  cardWidth,
  cardHeight,
  OverlayLabelRight,
  OverlayLabelLeft,
  OverlayLabelTop,
  imageUri,
  RestaurantName,
  description,
  rating,
  category,
  priceLevel,
  distance,
  onSwipedRight,
  onSwipedLeft,
  onSwipedTop,
  onTapLeft,
  onTapRight,
  onToggleExpand,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context: any) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      rotate.value = event.translationX * 0.1;
    },
    onEnd: (event) => {
      const shouldSwipeLeft = event.translationX < -100;
      const shouldSwipeRight = event.translationX > 100;
      const shouldSwipeUp = event.translationY < -100;

      if (shouldSwipeLeft) {
        translateX.value = withSpring(-(cardWidth || 300) * 2);
        if (onSwipedLeft) runOnJS(onSwipedLeft)();
      } else if (shouldSwipeRight) {
        translateX.value = withSpring((cardWidth || 300) * 2);
        if (onSwipedRight) runOnJS(onSwipedRight)();
      } else if (shouldSwipeUp) {
        translateY.value = withSpring(-(cardHeight || 400) * 2);
        if (onSwipedTop) runOnJS(onSwipedTop)();
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotate: `${rotate.value}deg` }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[{ width: cardWidth, height: cardHeight }, cardStyle]}>
        <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
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
              {/* Title Row */}
              <View style={styles.titleRow}>
                <Text style={styles.title}>{RestaurantName}</Text>
              </View>

              {/* Category and distance row */}
              <View style={styles.categoryRow}>
                {category && <Text style={styles.category}>{parseRestaurantType(category)}</Text>}
                <Text style={styles.distance}>{distance}</Text>
              </View>

              {/* Rating, and price row */}
              <View style={styles.ratingRow}>
                {/* Insert star based reting */}
                {rating && renderStars(rating)}
                {/* Insert dollar sign based price enum */}
                {/* <PriceLevelComponent priceLevel={priceLevel} /> */}
              </View>

              <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
                {description}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
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
    // justifyContent: "center",
    backgroundColor: "#f8f8f8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginBottom: 12,
  },
  title: {
    fontSize: 31,
    fontWeight: "800",
  },
  description: {
    fontSize: 15,
    color: "#000000",
  },
  category: {
    fontSize: 14,
    color: "#666",
  },
  distance: {
    fontSize: 14,
    color: "#666",
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

export { TinderCardComponent };
