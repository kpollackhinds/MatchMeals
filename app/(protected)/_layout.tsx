// app/(protected)/_layout.tsx
import { Redirect, Slot } from "expo-router";
import { useAuth } from "../_layout";

export default function ProtectedLayout() {
  const user = useAuth();

  if (!user) {
    console.log("User is not logged in, redirecting to login page.");
    return <Redirect href="/index" />;
  }

  return <Slot />;
}
