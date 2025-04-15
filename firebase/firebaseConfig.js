// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCx7zIy4H-WeIktz6Hine_7FI3NQeDet68",
  authDomain: "matchmeals-b1f06.firebaseapp.com",
  projectId: "matchmeals-b1f06",
  storageBucket: "matchmeals-b1f06.firebasestorage.app",
  messagingSenderId: "46377142761",
  appId: "1:46377142761:web:11750d8e8c68e14fc06378",
  measurementId: "G-1F7ZXT21QY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Initialize Auth with Persistent Storage
// const auth = getAuth();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
if (__DEV__) {
  connectFirestoreEmulator(db, "192.168.1.187", 8080);
  connectAuthEmulator(auth, "http://192.168.1.187:9099");
}

export { app, auth, db };
