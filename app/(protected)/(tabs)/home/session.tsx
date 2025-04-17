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
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import * as dotenv from "dotenv";
import axios from "axios";

import { handleLike } from "@/utils/cardOperations";
import { handleNavigation } from "@/utils/naviagtionUtils";

import { TinderCardComponent } from "../../../../components/TinderCard";
import ExpandedCard from "../../../../components/ExpandedCard";
import { formatOpenHours } from "@/utils/parsing";
import { Response, PlacePhotoResponse } from "../../../../constants/TestResponse";
import { SCREEN_HEIGHT as sh, SCREEN_WIDTH as sw } from "@/utils/dimensions";
import { Colors } from "@/constants/Colors";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Place } from "@/interfaces/Place";
import { Photo } from "@/interfaces/Photo";

dotenv.config();

export default function SessionScreen() {
  const router = useRouter();
  const reversedProfiles = [...Response.places].reverse(); // Create a reversed copy
  const [places, setPlaces] = useState<Place[] | null>(Response.places as Place[]);
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(Response.places[Response.places.length - 1]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Get current location
  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        // show pop up to allow for location access
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };
    getCurrentLocation();
  }, []);

  // Get places and photos from Google API
  useEffect(() => {
    if (!location) return;
    const abortController = new AbortController();
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        // const response = await axios.get("google api url", { signal: abortController.signal });
        let request_data = JSON.stringify({
          includedTypes: ["restaurant", "cafe", "bar"],
          maxResultCount: 3,
          locationRestriction: {
            circle: {
              center: {
                latitude: 40.657036995431,
                longitude: -73.73086572511552,
              },
              radius: 1000,
            },
          },
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://places.googleapis.com/v1/places:searchNearby",
          headers: {
            "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
            "X-Goog-FieldMask": `places.displayName,places.id,places.types,places.primaryType,places.primaryTypeDisplayName,
              places.nationalPhoneNumber,places.rating,places.googleMapsUri,places.websiteUri,places.currentOpeningHours,
              places.photos,places.formattedAddress,places.businessStatus,places.priceLevel,places.takeout,places.delivery,
              places.servesVegetarianFood,places.allowsDogs,places.accessibilityOptions,places.generativeSummary,
              places.dineIn,places.curbsidePickup,places.userRatingCount,places.priceRange`,
            "Content-Type": "application/json",
          },
          data: request_data,
          signal: abortController.signal,
        };
        const response = await axios.request(config);

        const data = await response.data();
        const newPlaces: Place[] = data.Places;
        if (newPlaces.length === 0) {
          return;
        }
        setPlaces((prev) => [...(prev ?? []), ...newPlaces]);

        const photoResponses = await Promise.all(
          newPlaces.map(async (place) => {
            if (!place.photos) return [];

            const responses = await Promise.all(
              place.photos.map(async (photo) => {
                await axios.get(
                  `https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.GOOGLE_API_KEY}&maxHeightPx=1600&skipHttpRedirect=true`
                );
              })
            );
            return responses;
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();

    return () => {
      abortController.abort();
    };
  }, [location]);

  const handleTapLeft = () => {
    setCurrentImageIndex(currentImageIndex == 0 ? 0 : currentImageIndex - 1);
    console.log("Tapped left ", currentImageIndex);
  };
  const handleTapRight = () => {
    // FIX AFTER CONVERSIONS TO TS
    // setCurrentImageIndex(
    //   (currentImageIndex + 1) %
    //     reversedProfiles[currentProfileIndex].images.length
    // );
    // console.log(
    //   "Tapped right ",
    //   currentImageIndex,
    //   reversedProfiles[currentProfileIndex].images.length
    // );
  };

  // FIX AFTER CONVERSION TO TS AND INCORPORATION OF ACTUAL API CALLS
  // PROFILE PROBABLY SHOULDNT BE ANY
  const handleTapBottom = (profile: any) => {
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
    handleLike();
    console.log("Swiped right ", currentProfileIndex);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleEndSession = () => {
    // Implement later, navigate to home screen
    console.log("End session");
    handleNavigation(router, "/home");
  };

  // FIX LATER IF REQUIRED AFTER TS CONVERSION
  const OverlayRight = () => {
    // return (
    // <View
    //   style={[
    //     styles.overlayLabelContainer,
    //     {
    //       backgroundColor: "green",
    //     },
    //   ]}
    // >
    //   <Text style={styles.overlayLabelText}>Like</Text>
    // </View>
    // );
  };

  return (
    // <View style={{ flex: 1 }} justifyContent="center" alignItems="center">
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.exitSessionContainer}>
          <TouchableOpacity onPress={() => handleEndSession()}>
            <Text style={styles.exitSession}>End Session</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardStack}>
          {Response.places.map((profile, index) => {
            return (
              <View style={styles.cardContainer} pointerEvents="box-none" key={profile.id}>
                <TinderCardComponent
                  onSwipedLeft={() => handleSwipeLeft()}
                  onSwipedRight={() => handleSwipeRight()}
                  onTapLeft={() => handleTapLeft()}
                  onTapRight={() => handleTapRight()}
                  onToggleExpand={() => handleTapBottom(profile)}
                  cardWidth={sw * 0.88}
                  cardHeight={sh * 0.75}
                  // OverlayLabelRight={OverlayRight}
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
        <Modal visible={isExpanded} animationType="slide" onRequestClose={handleClose}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {isExpanded && (
                <ExpandedCard
                  title="Sample Title"
                  onClose={handleClose}
                  onLike={handleLike}
                  onSkip={handleSwipeLeft}
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
                  // openHours={formatOpenHours(currentProfile.currentOpeningHours)}
                  openHours={currentProfile.currentOpeningHours}
                  extendedDescription={currentProfile.generativeSummary.description.text}
                  phoneNumber={currentProfile.nationalPhoneNumber}
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
            </ScrollView>
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
  exitSessionContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  exitSession: {
    fontSize: sh * 0.018,
    fontWeight: "600",
    color: Colors.light.primary,
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
