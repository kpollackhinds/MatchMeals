import { getAuth } from "firebase/auth";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import User from "@/models/User";
import { FirestoreClient } from "@/firebase/FirestoreClient";
import { DeepPartial } from "@/utils/types";

class UserService {
  private firestore = new FirestoreClient<User>("users");

  private getCurrentUserId(): string | null {
    return getAuth().currentUser?.uid ?? null;
  }

  async getCurrentUser(): Promise<User | null> {
    const user = getAuth().currentUser;
    if (!user) {
      console.log("User not authenticated");
      return null;
    }
    return this.getUserById(user.uid);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.firestore.get(id);
  }
  async createUser(user_id: string, user_data: DeepPartial<User>): Promise<void> {
    await this.firestore.set(user_id, user_data);
  }

  async updateUser(data: DeepPartial<User>, userId?: string): Promise<void> {
    console.log("Updating user data:", data);
    const id = userId ?? this.getCurrentUserId();
    if (!id) {
      throw new Error("User not authenticated");
    }
    await this.firestore.update(id, data);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.firestore.delete(userId);
  }

  async addFriend(userId: string, friendId: string): Promise<void> {
    // implement later
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    // implement later
  }
}

const userService = new UserService();
export default userService;

// async function saveOnBoardingData(onboardingData: any) {
//   console.log(onboardingData);
//   const user = getAuth().currentUser;
//   if (!user) {
//     console.log("User not authenticated");
//     return;
//   }
//   console.log(user.uid);
//   const userRef = doc(db, "users", user.uid);
//   if (user) {
//     await setDoc(userRef, onboardingData, { merge: true });
//   } else {
//     console.log("User not found");
//   }
// }

// async function updateSearchRadius(radius: number) {
//   const user = getAuth().currentUser?.uid;
//   if (!user) {
//     console.log("User not authenticated");
//     return;
//   }
//   const userRef = doc(db, "users", user);
//   await updateDoc(userRef, {
//     "preferences.search_radius": radius,
//   });
// }

// async function getOnBoardingData() {
//   const user = getAuth().currentUser;
//   if (!user) {
//     console.log("User not authenticated");
//     return;
//   }
//   const userRef = doc(db, "users", user.uid);
//   const userDoc = await getDoc(userRef);
//   if (userDoc.exists()) {
//     return userDoc.data();
//   }
//   return null;
// }

// export { saveOnBoardingData };
