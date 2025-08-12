import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { GeoPoint } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Clipboard,
  Modal,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { Session } from "@/interfaces/session";
import { createSession, findSessionByShareCode, getSession, joinSession } from "@/services/sessionService";
import userService from "@/services/UserService";

export default function GroupSessionScreen() {
  const router = useRouter();

  // Modal state
  const [showModal, setShowModal] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Session state
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [shareCode, setShareCode] = useState("");
  const [joinCode, setJoinCode] = useState("");

  // User location
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required for group sessions");
        router.back();
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Could not get your location");
    }
  };

  const handleGenerateSession = async () => {
    if (!location) {
      Alert.alert("Error", "Location not available. Please try again.");
      return;
    }

    setIsGenerating(true);
    try {
      const currentUser = await userService.getCurrentUser();
      if (!currentUser?.id) {
        Alert.alert("Error", "User not authenticated");
        return;
      }

      const result = await createSession(currentUser.id, location.lat, location.lng);
      setShareCode(result.shareCode);
      setCurrentSession({
        id: result.sessionId,
        participants: [currentUser.id],
        location: new GeoPoint(location.lat, location.lng),
        status: "waiting",
        restaurants: [],
        likes: {},
        matches: [],
        shareCode: result.shareCode,
      } as Session);

      // Start polling for session updates
      pollForSessionUpdates(result.sessionId);
    } catch (error) {
      console.error("Error creating session:", error);
      Alert.alert("Error", "Failed to create session. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleJoinSession = async () => {
    if (!joinCode.trim()) {
      Alert.alert("Error", "Please enter a session code");
      return;
    }

    setIsJoining(true);
    try {
      const currentUser = await userService.getCurrentUser();
      if (!currentUser?.id) {
        Alert.alert("Error", "User not authenticated");
        return;
      }

      // Find session by share code
      const session = await findSessionByShareCode(joinCode.trim().toUpperCase());
      if (!session) {
        Alert.alert("Error", "Session not found. Please check the code and try again.");
        return;
      }

      // Join the session
      await joinSession(session.id, currentUser.id);

      // Update local state
      setCurrentSession(session);
      setShowModal(false);

      Alert.alert("Success", "Joined session successfully!");
    } catch (error) {
      console.error("Error joining session:", error);
      Alert.alert("Error", "Failed to join session. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  const pollForSessionUpdates = (sessionId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const updatedSession = await getSession(sessionId);
        if (updatedSession) {
          setCurrentSession(updatedSession);

          // If session becomes active (someone joined), close the modal
          if (updatedSession.status === "active" && updatedSession.participants.length > 1) {
            setShowModal(false);
            clearInterval(pollInterval);
            Alert.alert("Success", "Someone joined your session! Let's start matching!");
          }
        }
      } catch (error) {
        console.error("Error polling session:", error);
      }
    }, 2000); // Poll every 2 seconds

    // Clean up after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 300000);
  };

  const handleCopyCode = async () => {
    if (shareCode) {
      Clipboard.setString(shareCode);
      Alert.alert("Copied!", "Session code copied to clipboard");
    }
  };

  const handleShareCode = async () => {
    if (shareCode) {
      try {
        await Share.share({
          message: `Join my MatchMeals session with code: ${shareCode}`,
          title: "Join My Restaurant Matching Session",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Session</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content - will show cards later */}
      <View style={styles.content}>
        {!showModal && currentSession ? (
          <View style={styles.sessionActive}>
            <Text style={styles.sessionTitle}>Session Active!</Text>
            <Text style={styles.sessionInfo}>Participants: {currentSession.participants.length}</Text>
            <Text style={styles.sessionInfo}>Status: {currentSession.status}</Text>
            {/* TODO: Add TinderCard component here */}
            <Text style={styles.comingSoon}>Restaurant cards coming soon...</Text>
          </View>
        ) : (
          <View style={styles.waitingContainer}>
            <Ionicons name="people" size={80} color={Colors.light.primary} />
            <Text style={styles.waitingText}>Waiting for session to start...</Text>
          </View>
        )}
      </View>

      {/* Session Setup Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Group Session</Text>
            <Text style={styles.modalSubtitle}>Create a session or join with a code</Text>

            {shareCode ? (
              // Show generated code
              <View style={styles.codeSection}>
                <Text style={styles.codeLabel}>Your Session Code:</Text>
                <View style={styles.codeContainer}>
                  <Text style={styles.codeText}>{shareCode}</Text>
                </View>
                <Text style={styles.codeInstruction}>Share this code with your friend to join the session</Text>

                <View style={styles.codeActions}>
                  <PrimaryButton
                    title="Copy Code"
                    onPress={handleCopyCode}
                    style={[styles.actionButton, styles.copyButton]}
                  />
                  <PrimaryButton
                    title="Share"
                    onPress={handleShareCode}
                    style={[styles.actionButton, styles.shareButton]}
                  />
                </View>

                <Text style={styles.waitingText}>Waiting for someone to join...</Text>
                {isGenerating && <ActivityIndicator size="small" color={Colors.light.primary} />}
              </View>
            ) : (
              // Show options to create or join
              <View style={styles.optionsSection}>
                <PrimaryButton
                  title={isGenerating ? "Creating Session..." : "Generate New Session"}
                  onPress={handleGenerateSession}
                  style={styles.optionButton}
                  disabled={isGenerating || !location}
                />

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                <Text style={styles.joinLabel}>Join with Code:</Text>
                <TextInput
                  style={styles.codeInput}
                  placeholder="Enter session code"
                  value={joinCode}
                  onChangeText={setJoinCode}
                  autoCapitalize="characters"
                  maxLength={8}
                />

                <PrimaryButton
                  title={isJoining ? "Joining..." : "Join Session"}
                  onPress={handleJoinSession}
                  style={styles.optionButton}
                  disabled={isJoining || !joinCode.trim()}
                />
              </View>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.outline,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.onBackground,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sessionActive: {
    alignItems: "center",
  },
  sessionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 10,
  },
  sessionInfo: {
    fontSize: 16,
    color: Colors.light.onBackground,
    marginBottom: 5,
  },
  comingSoon: {
    fontSize: 16,
    fontStyle: "italic",
    color: Colors.light.onSurfaceVariant,
    marginTop: 20,
  },
  waitingContainer: {
    alignItems: "center",
  },
  waitingText: {
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
    textAlign: "center",
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: Colors.light.primary,
  },
  modalSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.light.onSurfaceVariant,
    marginBottom: 30,
  },
  codeSection: {
    alignItems: "center",
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: Colors.light.onBackground,
  },
  codeContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  codeText: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 2,
    color: Colors.light.primary,
    textAlign: "center",
  },
  codeInstruction: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.light.onSurfaceVariant,
    marginBottom: 20,
  },
  codeActions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
  },
  copyButton: {
    backgroundColor: Colors.light.secondary,
  },
  shareButton: {
    backgroundColor: Colors.light.primary,
  },
  optionsSection: {
    alignItems: "center",
    width: "100%",
  },
  optionButton: {
    marginBottom: 15,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.outline,
  },
  dividerText: {
    marginHorizontal: 15,
    color: Colors.light.onSurfaceVariant,
    fontSize: 14,
  },
  joinLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: Colors.light.onBackground,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: Colors.light.outline,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: Colors.light.onSurfaceVariant,
    fontSize: 16,
  },
});
