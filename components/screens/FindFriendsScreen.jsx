import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icons for add/checkmark
import { SCREEN_WIDTH as sw, SCREEN_HEIGHT as sh } from "../../utils/dimensions";
import { PrimaryButton } from "../CustomButton";

const dummyContacts = [
  {
    id: "1",
    name: "Alice Johnson",
    phone: "123-456-7890",
    email: "alice@email.com",
  },
  { id: "2", name: "Bob Smith", phone: "987-654-3210", email: "bob@email.com" },
  {
    id: "3",
    name: "Charlie Brown",
    phone: "555-555-5555",
    email: "charlie@email.com",
  },
];

export default function FindFriendsScreen({ onNext, next }) {
  const [search, setSearch] = useState("");
  const [addedFriends, setAddedFriends] = useState([]);

  // Placeholder functions for backend logic
  const addFriend = (id) => setAddedFriends([...addedFriends, id]);
  const removeFriend = (id) => setAddedFriends(addedFriends.filter((friendId) => friendId !== id));

  // Filter contacts based on search input
  const filteredContacts = search
    ? dummyContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.phone.includes(search) ||
          contact.email.toLowerCase().includes(search.toLowerCase())
      )
    : dummyContacts;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Friends</Text>

      {/* Search Bar */}
      <TextInput style={styles.input} placeholder="Search by phone or email" value={search} onChangeText={setSearch} />

      {/* Suggested Contacts */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isAdded = addedFriends.includes(item.id);
          return (
            <View style={styles.contactItem}>
              <Text style={styles.contactText}>{item.name}</Text>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => (isAdded ? removeFriend(item.id) : addFriend(item.id))}
              >
                <Ionicons name={isAdded ? "checkmark-circle" : "person-add"} size={sw * 0.06} color="black" />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <PrimaryButton title="Done" onPress={() => (onNext(addedFriends), next())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: sw * 0.05, // 5% of screen width
    paddingTop: sh * 0.1, // 10% of screen height
  },
  title: {
    fontSize: sw * 0.07, // 7% of screen width
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: sh * 0.03, // 3% of screen height
  },
  input: {
    height: sh * 0.06, // 6% of screen height
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: sw * 0.03, // Rounded corners based on width
    paddingHorizontal: sw * 0.04,
    fontSize: sw * 0.045, // 4.5% of screen width
    marginBottom: sh * 0.02, // 2% of screen height
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: sh * 0.02, // 2% of screen height
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  contactText: {
    fontSize: sw * 0.045, // 4.5% of screen width
  },
  iconButton: {
    padding: sw * 0.02, // 2% of screen width for touch area
  },
});
