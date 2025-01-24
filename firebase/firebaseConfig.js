// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Export Firebase Auth
export const auth = getAuth(app);
