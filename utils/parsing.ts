import { OpeningHours } from "@/interfaces/Place";

const getDomain = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", ""); // Remove 'www.' if present
  } catch (error) {
    console.error("Invalid URL:", url);
    return url; // Fallback to the full URL if parsing fails
  }
};

const parseRestaurantType = (type: string) => {
  return type
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatOpenHours = (openHours: OpeningHours) => {
  // Review later, just  a placeholder for now
  if (!openHours) return "No hours available";

  const { openNow, weekdayDescriptions } = openHours;

  return openNow
    ? `Open now - ${weekdayDescriptions?.join(", ") || "No details"}`
    : `Closed - ${weekdayDescriptions?.join(", ") || "No details"}`;
};
export { getDomain, parseRestaurantType, formatOpenHours };
