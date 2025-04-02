import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

console.log("Imported auth service");
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Signed in user:", userCredential.user.email);
    return userCredential;
  } catch (error: any) {
    console.error("Sign-in failed:", error.message);
    throw error;
  }
};

export const signUpUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up user:", userCredential.user.email);
    return userCredential;
  } catch (error: any) {
    console.error("Sign-up failed:", error.message);
    throw error;
  }
};

export const signOutUser = async () => {
  return signOut(auth);
};
