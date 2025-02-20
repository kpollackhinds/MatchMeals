import {
  Alert,
  Image,
  StyleSheet,
  Platform,
  View,
  Modal,
  Animated,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { TinderCard } from "rn-tinder-card";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// import { Button } from "react-native-paper";

import { TinderCardComponent } from "../../components/TinderCard";
import ExpandedCard from "../../components/ExpandedCard";
import { Response, PlacePhotoResponse } from "../../constants/TestResponse";

const data = [
  "https://images.unsplash.com/photo-1681896616404-6568bf13b022?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
  "https://images.unsplash.com/photo-1681871197336-0250ed2fe23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
  "https://images.unsplash.com/photo-1681238091934-10fbb34b497a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1282&q=80",
];

const profiles = [
  {
    id: 1,
    name: "Restaurant A",
    description: "Best food in town at Restautant A",
    images: [
      "https://images.unsplash.com/photo-1681896616404-6568bf13b022?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
      "https://images.unsplash.com/photo-1681871197336-0250ed2fe23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      "https://images.unsplash.com/photo-1681238091934-10fbb34b497a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1282&q=80",
    ],
    details: {
      distance: "3 miles",
    },
  },
  {
    id: 2,
    name: "Restaurant B",
    description: "Best food in town at Restautant B",
    images: [
      "https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-burger-food-png-free-download-png-image_10199386.png",
    ],
    details: {
      distance: "5 miles",
    },
  },
];

// TEMPORARY FOR DEVELOPMENT PURPOSES

export default function HomeScreen() {
  const reversedProfiles = [...Response.places].reverse(); // Create a reversed copy
  const [profiles, setProfiles] = useState(Response.places);
  const [loading, setLoading] = useState(false);
  // const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(
    Response.places[Response.places.length - 1]
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch("google api url");
  //       const data = await response.json();
  //       setProfiles(data.Places);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     setLoading(false);
  //   };
  // });

  const handleTapLeft = () => {
    setCurrentImageIndex(currentImageIndex == 0 ? 0 : currentImageIndex - 1);
    console.log("Tapped left ", currentImageIndex);
  };
  const handleTapRight = () => {
    setCurrentImageIndex(
      (currentImageIndex + 1) %
        reversedProfiles[currentProfileIndex].images.length
    );
    console.log(
      "Tapped right ",
      currentImageIndex,
      reversedProfiles[currentProfileIndex].images.length
    );
  };
  const handleTapBottom = (profile) => {
    console.log("Enter detailed mode!");
    setCurrentProfile(profile);
    setIsExpanded(true);
  };

  const handleSwipeLeft = () => {
    setCurrentProfileIndex(currentProfileIndex + 1);
    console.log("Swiped left ", currentProfileIndex);
  };
  const handleSwipeRight = () => {
    setCurrentProfileIndex(currentProfileIndex + 1);
    console.log("Swiped right ", currentProfileIndex);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };
  const OverlayRight = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "green",
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Like</Text>
      </View>
    );
  };

  return (
    // <View style={{ flex: 1 }} justifyContent="center" alignItems="center">
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.cardStack}>
          {Response.places.map((profile, index) => {
            return (
              <View
                style={styles.cardContainer}
                pointerEvents="box-none"
                key={profile.id}
              >
                <TinderCardComponent
                  onSwipedLeft={() => handleSwipeLeft()}
                  onSwipedRight={() => handleSwipeRight()}
                  onTapLeft={() => handleTapLeft()}
                  onTapRight={() => handleTapRight()}
                  onToggleExpand={() => handleTapBottom(profile)}
                  cardWidth={380}
                  cardHeight={730}
                  OverlayLabelRight={OverlayRight}
                  imageUri={
                    "https://lh3.googleusercontent.com/places/ANXAkqHkWUeM003sUtseVALF2CQyjp1aQ_gVclWrPC0fm9gpfvgcd29uf9UIMtuBWgdXW2paUlAbBta2XSyNu5wVcD5Lgke7fF1PiqA=s4800-w4800-h3196"
                  }
                  // imageUri={profile.photos[currentImageIndex].googleMapsUri}
                  RestaurantName={profile.displayName.text}
                  description={profile.generativeSummary.overview.text}
                  rating={profile.rating}
                  priceLevel={profile.priceLevel}
                  category={profile.types[0]}
                  distance={"3 miles"}
                  // details={profile.details}
                ></TinderCardComponent>
              </View>
            );
          })}
        </View>
        <Modal
          visible={isExpanded}
          animationType="slide"
          onRequestClose={handleClose}
        >
          <SafeAreaView>
            {isExpanded && (
              <ExpandedCard
                title="Sample Title"
                onClose={handleClose}
                RestaurantName={currentProfile.displayName.text}
                imageUri={
                  "https://lh3.googleusercontent.com/places/ANXAkqHkWUeM003sUtseVALF2CQyjp1aQ_gVclWrPC0fm9gpfvgcd29uf9UIMtuBWgdXW2paUlAbBta2XSyNu5wVcD5Lgke7fF1PiqA=s4800-w4800-h3196"
                }
                description={currentProfile.generativeSummary.overview.text}
                rating={currentProfile.rating}
                priceLevel={currentProfile.priceLevel}
                category={currentProfile.types[0]}
                distance={"3 miles"}
                website={currentProfile.websiteUri}
                address={currentProfile.formattedAddress}
                // priceRange={currentProfile.priceRange}
                // Mock for now
                priceRange={{
                  startPrice: {
                    currencyCode: "USD",
                    units: 10,
                    nanos: 0,
                  },
                  endPrice: {
                    currencyCode: "USD",
                    units: 50,
                    nanos: 0,
                  },
                }}
              ></ExpandedCard>
            )}
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the entire screen
    // justifyContent: "center", // Center content vertically
    // alignItems: "center", // Center content horizontally
    flexDirection: "column",
  },
  cardStack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 48,
  },

  imageContainer: {
    width: 300,
    height: 300,
  },
  image: {
    width: "100%", // Make the image take up the entire width of the container
    height: "100%", // Make the image take up the entire height of the container
    resizeMode: "cover", // Adjust image scaling (use 'contain', 'cover', etc. as needed)
  },
  likeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
});
