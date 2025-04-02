import { getAuth } from "firebase/auth";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

async function saveOnBoardingData(onboardingData: any) {
  console.log(onboardingData);
  const user = getAuth().currentUser;
  if (!user) {
    console.log("User not authenticated");
    return;
  }
  console.log(user.uid);
  const userRef = doc(db, "users", user.uid);
  if (user) {
    await setDoc(userRef, onboardingData, { merge: true });
  } else {
    console.log("User not found");
  }
}

async function updateSearchRadius(radius: number) {
  const user = getAuth().currentUser?.uid;
  if (!user) {
    console.log("User not authenticated");
    return;
  }
  const userRef = doc(db, "users", user);
  await updateDoc(userRef, {
    "preferences.search_radius": radius,
  });
}

async function getOnBoardingData() {
  const user = getAuth().currentUser;
  if (!user) {
    console.log("User not authenticated");
    return;
  }
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data();
  }
  return null;
}

export { saveOnBoardingData };
