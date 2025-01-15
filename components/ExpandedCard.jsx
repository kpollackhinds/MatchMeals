import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";

const ExpandedCard = ({ title, imageUri, description, onClose }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {/* Complex rendering logic */}
        <View>
          <Text>Nested Components or Conditional Rendering</Text>
        </View>
        <Text onPress={onClose} style={styles.closeButton}>
          Close
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: "#fff", borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, marginVertical: 8 },
  closeButton: { color: "blue", marginTop: 10 },
  imageContainer: { alignItems: "center" },
  image: { width: 200, height: 200, borderRadius: 100 },
});

export default ExpandedCard;
