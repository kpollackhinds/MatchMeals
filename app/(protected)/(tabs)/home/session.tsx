import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import * as dotenv from "dotenv";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";

import { handleLike, hasValidDisplayName } from "@/utils/cardOperations";
import { handleNavigation } from "@/utils/naviagtionUtils";

import { Colors } from "@/constants/Colors";
import { Photo } from "@/interfaces/Photo";
import { Place } from "@/interfaces/Place";
import { SCREEN_HEIGHT as sh, SCREEN_WIDTH as sw } from "@/utils/dimensions";
import getDistance from "@/utils/getDistance";
import ExpandedCard from "../../../../components/ExpandedCard";
import { TinderCardComponent } from "../../../../components/TinderCard";

// dotenv.config();

export default function SessionScreen() {
  const router = useRouter();
  // Remove the reversedProfiles variable since we'll work with places directly
  const [places, setPlaces] = useState<Place[]>([]);
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState<Place | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Get current location and get places and photos from Google API
  useEffect(() => {
    const abortController = new AbortController();

    const getLocationAndFetchPlaces = async () => {
      try {
        setLoading(true);
        console.log("Getting current location");
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          // show pop up to allow for location access
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log("Location: ", location.coords);
        setLocation(location);

        let request_data = {
          includedTypes: ["restaurant", "cafe", "bar"],
          maxResultCount: 3,
          locationRestriction: {
            circle: {
              center: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              radius: 1000,
            },
          },
        };

        const apiKey = Constants.expoConfig?.extra?.GOOGLE_API_KEY;
        console.log("API Key: ", apiKey);
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://places.googleapis.com/v1/places:searchNearby",
          headers: {
            "X-Goog-Api-Key": apiKey ?? "",
            "X-Goog-FieldMask":
              "places.displayName,places.id,places.types,places.primaryType,places.primaryTypeDisplayName,places.nationalPhoneNumber,places.rating,places.googleMapsUri,places.websiteUri,places.currentOpeningHours,places.photos,places.formattedAddress,places.businessStatus,places.priceLevel,places.takeout,places.delivery,places.servesVegetarianFood,places.allowsDogs,places.accessibilityOptions,places.generativeSummary,places.dineIn,places.curbsidePickup,places.userRatingCount,places.priceRange,places.location",
            "Content-Type": "application/json",
          },
          data: request_data,
          signal: abortController.signal,
        };
        console.log("Making request to Google API");
        const response = await axios.request(config);
        const data = response.data;
        console.log("API Response:", data);

        if (!data.places || data.places.length === 0) {
          console.log("No places found in API response");
          setLoading(false);
          return;
        }

        const newPlaces: Place[] = data.places.filter(hasValidDisplayName);

        if (newPlaces.length === 0) {
          console.log("No places with valid display names found");
          setLoading(false);
          return;
        }
        console.log("Places found: ", newPlaces.length);
        // Don't set places here, wait until after photo processing

        const placeWithPhotos = await Promise.all(
          newPlaces.map(async (place) => {
            if (!place.photos) return { ...place, photoUris: [] };

            const photoResponses = await Promise.all(
              place.photos.map(async (photo) => {
                try {
                  const response = await axios.get(
                    `https://places.googleapis.com/v1/${photo.name}/media?key=${apiKey}&maxHeightPx=1600&skipHttpRedirect=true`
                  );
                  // The response might contain the photo URL directly or in photoUri field
                  return response.data.photoUri || response.data || photo.googleMapsUri;
                } catch (error) {
                  console.error("Error fetching photo: ", error);
                  // Fallback to the original Google Maps URI if API call fails
                  return photo.googleMapsUri;
                }
              })
            );

            const validPhotoUris = photoResponses.filter(Boolean);
            return { ...place, photoUris: validPhotoUris };
          })
        );

        // Update places with photo URIs - this is the single place we set the places state
        setPlaces(placeWithPhotos);

        // Extract and set photos separately
        const allPhotos = placeWithPhotos.flatMap((place) =>
          (place.photos || []).map((photo, index) => ({
            name: photo.name || "",
            photoUri: place.photoUris?.[index] || photo.googleMapsUri || "",
          }))
        );
        setPhotos(allPhotos);
      } catch (error) {
        console.error("Error in location/API flow:", error);
        setErrorMsg("Error getting location");
      } finally {
        console.log("location and places fetched");
        setLoading(false);
      }
    };
    getLocationAndFetchPlaces();
  }, []);

  // Set current profile when places are loaded or index changes
  useEffect(() => {
    if (places.length > 0 && currentProfileIndex < places.length) {
      setCurrentProfile(places[currentProfileIndex]);
    }
  }, [places, currentProfileIndex]);

  // Add debugging to see how many places we have
  useEffect(() => {
    console.log("Places array updated:", places.length, "places");
    console.log("Current profile index:", currentProfileIndex);
  }, [places, currentProfileIndex]);

  const handleTapLeft = () => {
    setCurrentImageIndex(currentImageIndex == 0 ? 0 : currentImageIndex - 1);
    console.log("Tapped left ", currentImageIndex);
  };
  const handleTapRight = () => {
    const currentPlace = places[currentProfileIndex];
    if (currentPlace && currentPlace.photoUris) {
      setCurrentImageIndex((currentImageIndex + 1) % currentPlace.photoUris.length);
      console.log("Tapped right ", currentImageIndex, currentPlace.photoUris.length);
    }
  };

  // PROFILE PROBABLY SHOULDNT BE ANY
  const handleTapBottom = (profile: Place) => {
    console.log("Enter detailed mode!");
    setCurrentProfile(profile);
    setIsExpanded(true);
  };

  const handleSwipeLeft = () => {
    if (currentProfileIndex < places.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
      setCurrentImageIndex(0); // Reset image index for new place
    }
    console.log("Swiped left ", currentProfileIndex);
  };

  const handleSwipeRight = () => {
    if (currentProfileIndex < places.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
      setCurrentImageIndex(0); // Reset image index for new place
    }
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Modern Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.exitButton} onPress={handleEndSession} activeOpacity={0.7}>
            <Ionicons name="close" size={24} color={Colors.light.onSurfaceVariant} />
            <Text style={styles.exitButtonText}>End Session</Text>
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View style={styles.content}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.light.primary} />
              <Text style={styles.loadingText}>Finding restaurants near you...</Text>
              <Text style={styles.loadingSubtext}>This may take a moment</Text>
            </View>
          ) : places.length > 0 ? (
            <View style={styles.cardStack}>
              {/* Render multiple cards in a stack */}
              {places.map((place, index) => {
                // Only render cards that should be visible in the stack
                if (index < currentProfileIndex || index > currentProfileIndex + 2) {
                  return null;
                }

                const isCurrentCard = index === currentProfileIndex;

                return (
                  <View
                    style={[
                      styles.cardContainer,
                      { zIndex: places.length - index }, // Stack cards properly
                    ]}
                    pointerEvents={isCurrentCard ? "auto" : "none"}
                    key={place.id || index}
                  >
                    <TinderCardComponent
                      onSwipedLeft={() => handleSwipeLeft()}
                      onSwipedRight={() => handleSwipeRight()}
                      onTapLeft={() => handleTapLeft()}
                      onTapRight={() => handleTapRight()}
                      onToggleExpand={() => handleTapBottom(place)}
                      cardWidth={sw * 0.88}
                      cardHeight={sh * 0.75}
                      imageUri={
                        place.photoUris && place.photoUris.length > 0
                          ? place.photoUris[currentImageIndex] || place.photoUris[0]
                          : place.photos && place.photos.length > 0
                          ? place.photos[0].googleMapsUri
                          : "https://lh3.googleusercontent.com/places/ANXAkqHkWUeM003sUtseVALF2CQyjp1aQ_gVclWrPC0fm9gpfvgcd29uf9UIMtuBWgdXW2paUlAbBta2XSyNu5wVcD5Lgke7fF1PiqA=s4800-w4800-h3196"
                      }
                      RestaurantName={place.displayName?.text || "Unknown Restaurant"}
                      description={place.generativeSummary?.overview?.text || "No description available"}
                      rating={place.rating || 0}
                      priceLevel={place.priceLevel}
                      category={place.types ? place.types[0] : "restaurant"}
                      distance={
                        place.location?.latitude && place.location?.longitude
                          ? getDistance(place.location.latitude, place.location.longitude)
                          : 0
                      }
                    />
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Ionicons name="restaurant-outline" size={64} color={Colors.light.onSurfaceVariant} />
              <Text style={styles.emptyStateTitle}>No restaurants found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your location or check your internet connection
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={() => router.replace("/home/session")}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Modal for expanded card view */}
        <Modal visible={isExpanded} animationType="slide" onRequestClose={handleClose}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {isExpanded && currentProfile && (
                <ExpandedCard
                  title="Sample Title"
                  onClose={handleClose}
                  onLike={handleLike}
                  onSkip={handleSwipeLeft}
                  RestaurantName={currentProfile.displayName?.text || "Unknown Restaurant"}
                  imageUri={
                    currentProfile.photoUris && currentProfile.photoUris.length > 0
                      ? currentProfile.photoUris[currentImageIndex] || currentProfile.photoUris[0]
                      : currentProfile.photos && currentProfile.photos.length > 0
                      ? currentProfile.photos[0].googleMapsUri
                      : "https://lh3.googleusercontent.com/places/ANXAkqHkWUeM003sUtseVALF2CQyjp1aQ_gVclWrPC0fm9gpfvgcd29uf9UIMtuBWgdXW2paUlAbBta2XSyNu5wVcD5Lgke7fF1PiqA=s4800-w4800-h3196"
                  }
                  description={currentProfile.generativeSummary?.overview?.text}
                  rating={currentProfile.rating}
                  priceLevel={currentProfile.priceLevel}
                  category={currentProfile.types ? currentProfile.types[0] : ""}
                  distance={
                    currentProfile.location?.latitude && currentProfile.location?.longitude
                      ? getDistance(currentProfile.location.latitude, currentProfile.location.longitude)
                      : 0
                  }
                  website={currentProfile.websiteUri}
                  address={currentProfile.formattedAddress}
                  // openHours={formatOpenHours(currentProfile.currentOpeningHours)}
                  openHours={currentProfile.currentOpeningHours}
                  extendedDescription={currentProfile.generativeSummary?.description?.text}
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
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.outlineVariant,
  },
  exitButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.surfaceVariant,
  },
  exitButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.onSurfaceVariant,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.onBackground,
    marginTop: 24,
    textAlign: "center",
  },
  loadingSubtext: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    marginTop: 8,
    textAlign: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.onBackground,
    marginTop: 24,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    marginTop: 12,
    textAlign: "center",
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.light.primary,
    borderRadius: 24,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.onPrimary,
  },
  cardStack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  // Legacy styles - keeping for compatibility
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  card: {
    borderRadius: 48,
  },
  imageContainer: {
    width: 300,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  likeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
});
