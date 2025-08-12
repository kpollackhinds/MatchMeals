import { GeoPoint } from "firebase/firestore";

interface Session {
  id: string;
  participants: string[];
  location: GeoPoint;
  status: "waiting" | "active" | "completed";
  restaurants: string[];
  likes: Record<string, string[]>;
  matches: any[];
  shareCode?: string;
}

export { Session };
