const getDomain = (url) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", ""); // Remove 'www.' if present
  } catch (error) {
    console.error("Invalid URL:", url);
    return url; // Fallback to the full URL if parsing fails
  }
};

const parseRestaurantType = (type) => {
  return type
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export { getDomain, parseRestaurantType };
