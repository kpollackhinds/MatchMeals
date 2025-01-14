import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const ExpandedCard = ({ title, description, onClose }) => {
  return (
    <View style={styles.card}>
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
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: "#fff", borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, marginVertical: 8 },
  closeButton: { color: "blue", marginTop: 10 },
});

export default ExpandedCard;
