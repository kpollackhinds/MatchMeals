import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const renderStars = (rating, size = 20) => {
  let fullStars = Math.floor(rating);
  let remainder = rating % 1;
  let halfStar = false;

  if (remainder > 0.2 && remainder < 0.8) {
    halfStar = true;
  } else if (remainder >= 0.8) {
    fullStars += 1;
  }

  return (
    <View style={{ position: "relative", flexDirection: "row" }}>
      {/* Background layer: Gray stars */}
      <View style={styles.starRow}>
        {[...Array(5)].map((_, index) => (
          <Icon key={`bg-${index}`} name="star" size={size} color="#C0C0C0" />
        ))}
      </View>

      {/* Foreground layer: Gold stars */}
      <View style={[styles.starRow, styles.overlay]}>
        {[...Array(fullStars)].map((_, index) => (
          <Icon key={`full-${index}`} name="star" size={size} color="#FFD700" />
        ))}
        {halfStar && <Icon name="star-half" size={size} color="#FFD700" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  starRow: {
    flexDirection: "row",
  },
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
  },
});

export default renderStars;
