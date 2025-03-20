import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { DotIndicator } from "../../../components/DotIndicator";
import EnterNameScreen from "../../../components/screens/EnterNameScreen";
import EnterPhoneScreen from "../../../components/screens/EnterPhoneScreen";
import SetupPreferencesScreen from "../../../components/screens/SetupPreferencesScreen";
import SearchPreferencesScreen from "../../../components/screens/SearchPreferencesScreen";
import FindFriendsScreen from "../../../components/screens/FindFriendsScreen";
import { handleNavigation } from "../../../utils/naviagtionUtils";
import { saveOnBoardingData } from "../../../services/dbService";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    info: {
      name: "",
      phone: "",
    },
    preferences: {
      radius: 0,
      openOnly: false,
      foodType: [],
    },
    friends: [],
  });
  const flatListRef = useRef(null);
  const router = useRouter();

  const updateInfo = (key, value) => {
    setOnboardingData((prev) => ({ ...prev, info: { ...prev.info, [key]: value } }));
  };
  const updatePreferences = (key, value) => {
    setOnboardingData((prev) => ({ ...prev, preferences: { ...prev.preferences, [key]: value } }));
  };
  const updateSearchPreferences = (preferences) => {
    setOnboardingData((prev) => ({ ...prev, preferences: { ...prev.preferences, radius: preferences.radius } }));
    setOnboardingData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, openOnly: preferences.openOnly },
    }));
  };
  const updateFriends = (friends) => {
    setOnboardingData((prev) => ({ ...prev, friends }));
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const nextStep = () => {
    if (currentIndex < steps.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const goToNextScreen = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const saveAndGoHome = () => {
    // Do I have to await the thing below??
    saveOnBoardingData(onboardingData);
    handleNavigation(router, "/home");
  };

  const steps = [
    { component: <EnterNameScreen onNext={updateInfo} next={goToNextScreen} /> },
    { component: <EnterPhoneScreen onNext={updateInfo} next={goToNextScreen} /> },
    { component: <SetupPreferencesScreen onNext={updatePreferences} next={goToNextScreen} /> },
    { component: <SearchPreferencesScreen onNext={updateSearchPreferences} next={goToNextScreen} /> },
    { component: <FindFriendsScreen onNext={updateFriends} next={saveAndGoHome} /> },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={steps}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <View style={styles.page}>{item.component}</View>}
        extraData={currentIndex}
        // onScroll={handleScroll}
        // scrollEventThrottle={16}
      />
      <DotIndicator total={steps.length} currentIndex={currentIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  page: { width, justifyContent: "center", alignItems: "center" },
});
