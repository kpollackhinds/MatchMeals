import { getAuth } from "firebase/auth";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

async function saveOnBoardingData(onboardingData) {
  console.log(onboardingData);
  const user = getAuth().currentUser;
  console.log(user.uid);
  const userRef = doc(db, "users", user.uid);
  if (user) {
    await setDoc(userRef, onboardingData, { merge: true });
  } else {
    console.log("User not found");
  }
}

async function updateSearchRadius(radius) {
  const user = getAuth().currentUser.uid;
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    "preferences.search_radius": radius,
  });
}

async function getOnBoardingData() {
  const user = getAuth().currentUser;
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data();
  }
  return null;
}

export { saveOnBoardingData };
