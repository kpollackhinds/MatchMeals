import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { OpeningHours } from "@/interfaces/Place";

const OpenHoursComponent = ({ openHours }: { openHours: OpeningHours }) => {
  return (
    <View style={styles.container}>
      <Icon name="clock-o" size={22} color={"rgb(185, 24, 56)"} />
      <Text style={{ fontSize: 16, color: isOpen(openHours) ? "green" : "red" }}>
        {isOpen(openHours) ? "Open" : "Closed"}
      </Text>
      <Text style={{ fontSize: 25 }}>·</Text>
      {openHours.weekdayDescriptions && (
        <Text style={styles.text}>{openHours.weekdayDescriptions[0].split(":")[1]}</Text>
      )}
      {/* <Text style={styles.text}>{openHours.weekdayDescriptions[0].split(":")[1]}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 15,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "#0e4d1e",
  },
});

const days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const isOpen = (openHour: OpeningHours) => {
  //   console.log(openHours);
  return openHour.openNow;
};
// Fix this later
// const isOpen = (openHours) => {
//   const date = new Date();
//   const day = date.getDay();
//   const hour = date.getHours();
//   const minute = date.getMinutes();
//   const time = hour + minute / 60;

//   if (day === 0) {
//     return false;
//   }

//   if (time < 9 || time > 17) {
//     return false;
//   }

//   return true;
// };

export default OpenHoursComponent;
