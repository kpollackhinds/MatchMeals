// services/sessionService.ts
import { db } from "@/firebase/firebaseConfig";
import { Session } from "@/interfaces/Session";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  GeoPoint,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

// Generate a share code from document ID with collision checking
export const generateShareCodeFromDocId = (docId: string): string => {
  return docId.slice(-8).toUpperCase(); // Last 8 chars for better uniqueness
};

// Create a new session with collision-safe share code
export const createSession = async (
  userId: string,
  lat: number,
  lng: number
): Promise<{ sessionId: string; shareCode: string }> => {
  try {
    // First create the document
    const docRef = await addDoc(collection(db, "sessions"), {
      participants: [userId],
      location: new GeoPoint(lat, lng),
      status: "waiting",
      restaurants: [],
      likes: {},
      matches: [],
      createdAt: new Date(),
    });

    // Generate share code from document ID
    let shareCode = generateShareCodeFromDocId(docRef.id);

    // Check for collision
    const existingSession = await findSessionByShareCode(shareCode);
    if (existingSession) {
      // Fallback: use full document ID if collision occurs
      shareCode = docRef.id;
      console.warn(`Share code collision detected, using full ID: ${shareCode}`);
    }

    // Update the document with the share code
    await updateDoc(docRef, {
      shareCode: shareCode,
    });

    return { sessionId: docRef.id, shareCode };
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

// Find session by share code
export const findSessionByShareCode = async (shareCode: string): Promise<Session | null> => {
  try {
    const q = query(collection(db, "sessions"), where("shareCode", "==", shareCode));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Session;
    }

    return null;
  } catch (error) {
    console.error("Error finding session:", error);
    throw error;
  }
};

// Join a session
export const joinSession = async (sessionId: string, userId: string): Promise<void> => {
  try {
    const sessionRef = doc(db, "sessions", sessionId);
    await updateDoc(sessionRef, {
      participants: arrayUnion(userId),
      status: "active",
    });
  } catch (error) {
    console.error("Error joining session:", error);
    throw error;
  }
};

// Get session details
export const getSession = async (sessionId: string): Promise<Session | null> => {
  try {
    const docRef = doc(db, "sessions", sessionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Session;
    }

    return null;
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};
