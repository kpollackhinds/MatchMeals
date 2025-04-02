import React from "react";
import { View, StyleSheet } from "react-native";

export function DotIndicator({ total, currentIndex }: { total: number; currentIndex: number }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View key={index} style={[styles.dot, currentIndex === index ? styles.activeDot : styles.inactiveDot]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  dot: { width: 10, height: 10, borderRadius: 5, margin: 5 },
  activeDot: { backgroundColor: "black" },
  inactiveDot: { backgroundColor: "gray" },
});
