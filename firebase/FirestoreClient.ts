import { DeepPartial } from "@/utils/types";
import { db } from "./firebaseConfig";
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc, DocumentData } from "firebase/firestore";

export class FirestoreClient<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async get(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  }

  async set(id: string, data: DocumentData): Promise<void> {
    await setDoc(doc(db, this.collectionName, id), data, { merge: true });
  }

  async update(id: string, data: DeepPartial<T>): Promise<void> {
    await updateDoc(doc(db, this.collectionName, id), data);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, this.collectionName, id));
  }
}
