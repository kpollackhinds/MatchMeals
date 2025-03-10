import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

const ExpandableText = ({ text, style }) => {
  const [expanded, setExpanded] = useState(false);

  // Function to extract the first sentence
  //   const getFirstSentence = (text) => {
  //     const match = text.match(/.*?[.?!](\s|$)/); // Regex to find the first full sentence
  //     return match ? match[0] : text; // Return first sentence or full text if no punctuation
  //   };

  return (
    <View style={style}>
      <Text style={styles.description} numberOfLines={expanded ? undefined : 3}>
        {text}
        {/* {expanded ? text : getFirstSentence(text)} */}
      </Text>

      {!expanded && (
        <TouchableOpacity onPress={() => setExpanded(true)}>
          <Text style={styles.readMore}>Read More</Text>
        </TouchableOpacity>
      )}
      {expanded && (
        <TouchableOpacity onPress={() => setExpanded(false)}>
          <Text style={styles.readMore}>See Less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    color: "#333",
  },
  readMore: {
    fontSize: 16,
    color: "#007BFF",
    // marginTop: 5,
  },
});

export default ExpandableText;
