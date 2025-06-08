import { Place } from "@/interfaces/Place";

const handleLike = async () => {
  console.log("Liked");
};

const hasValidDisplayName = (place: Place): place is Place & { displayName: { text: string } } => {
  return !!place.displayName?.text;
};

export { handleLike, hasValidDisplayName };
