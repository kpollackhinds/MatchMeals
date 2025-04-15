import { Redirect, Slot } from "expo-router";
import { useAuth } from "../_layout";

export default function PublicLayout() {
  const user = useAuth();

  if (user) {
    console.log("User is logged in, redirecting to home page.");
    return <Redirect href="/home" />;
  }

  return <Slot />;
}
