import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useRouter } from "expo-router";
import { DotIndicator } from "../../../../components/DotIndicator";
import EnterNameScreen from "../../../../components/screens/EnterNameScreen";
import EnterPhoneScreen from "../../../../components/screens/EnterPhoneScreen";
import SetupPreferencesScreen from "../../../../components/screens/SetupPreferencesScreen";
import SearchPreferencesScreen from "../../../../components/screens/SearchPreferencesScreen";
import FindFriendsScreen from "../../../../components/screens/FindFriendsScreen";
import { handleNavigation } from "../../../../utils/naviagtionUtils";
import userService from "@/services/UserService";
import User from "@/models/User";
// import { saveOnBoardingData } from "../../../services/dbService";

const { width } = Dimensions.get("window");
type OnboardingData = Omit<User, "id" | "createdAt" | "updatedAt" | "email">;

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    info: {
      name: "",
      phone: "",
    },
    preferences: {
      radius: 0,
      openOnly: false,
      food_categories: [],
    },
    friends: [],
  });
  const flatListRef = useRef<FlatList<any>>(null);
  const router = useRouter();

  const updateInfo = (key: string, value: string) => {
    setOnboardingData((prev) => ({ ...prev, info: { ...prev.info, [key]: value } }));
  };
  const updatePreferences = (key: string, value: string) => {
    setOnboardingData((prev) => ({ ...prev, preferences: { ...prev.preferences, [key]: value } }));
  };
  const updateSearchPreferences = (selected_preferences: { radius: number; openOnly: boolean }) => {
    setOnboardingData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, radius: selected_preferences.radius },
    }));
    setOnboardingData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, openOnly: selected_preferences.openOnly },
    }));
  };
  const updateFriends = (friends: string[]) => {
    setOnboardingData((prev) => ({ ...prev, friends }));
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const nextStep = () => {
    if (currentIndex < steps.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const goToNextScreen = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const saveAndGoHome = async () => {
    // Do I have to await the thing below??
    await userService.updateUser(onboardingData);
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
