import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";
import { DotIndicator } from "../../../components/DotIndicator";
import EnterNameScreen from "../../../components/screens/EnterNameScreen";
import EnterPhoneScreen from "../../../components/screens/EnterPhoneScreen";
import SetupPreferencesScreen from "../../../components/screens/SetupPreferencesScreen";
// import FindFriendsScreen from "../../../components/screens/FindFriendsScreen";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

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

  const steps = [
    { component: <EnterNameScreen onNext={goToNextScreen} /> },
    { component: <EnterPhoneScreen onNext={goToNextScreen} /> },
    { component: <SetupPreferencesScreen onNext={goToNextScreen} /> },
    // {component: <FindFriendsScreen onNext={goToNextScreen} /> },
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
        renderItem={({ item }) => (
          <View style={styles.page}>{item.component}</View>
        )}
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
