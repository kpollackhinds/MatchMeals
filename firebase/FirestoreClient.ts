import { DeepPartial } from "@/utils/types";
import { deleteDoc, doc, DocumentData, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export class FirestoreClient<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async get(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as T) : null;
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
