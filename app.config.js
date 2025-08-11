export default {
  expo: {
    name: "Match-Meals",
    slug: "Match_Meals",
    version: "1.0.0",
    scheme: "matchmeals", 
    extra: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
    plugins: ["expo-router"],
  },
};
