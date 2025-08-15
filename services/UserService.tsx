import { auth } from "@/firebase/firebaseConfig";
import { FirestoreClient } from "@/firebase/FirestoreClient";
import User from "@/models/User";
import { DeepPartial } from "@/utils/types";

class UserService {
  private firestore = new FirestoreClient<User>("users");

  private getCurrentUserId(): string | null {
    return auth.currentUser?.uid ?? null;
    // return getAuth().currentUser?.uid ?? null;
  }

  async getCurrentUser(): Promise<User | null> {
    const user = auth.currentUser;
    // const user = getAuth().currentUser;
    if (!user) {
      console.log("User not authenticated");
      return null;
    }

    const userDoc = await this.getUserById(user.uid);
    // return this.getUserById(user.uid);
    console.log("UserDoc from Firestore:", userDoc); // Debug line to see what's returned

    if (!userDoc) {
      // User authenticated but no Firestore document exists
      console.log("No Firestore document found for user");
      return {
        id: user.uid,
        email: user.email || "",
      } as User;
    }

    // Ensure the returned user has an id property
    return {
      ...userDoc,
      id: user.uid, // Always set id to the Firebase Auth UID
    };
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
