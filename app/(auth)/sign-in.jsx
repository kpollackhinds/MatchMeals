import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, useTheme, Text } from "react-native-paper";

// import { Colors } from "../../constants/colors";
import FormField from "../../components/FormField";
import SignInButton from "../../components/CustomButton";
import { handleNavigation } from "../../utils/naviagtionUtils";
import { signInUser } from "../../services/authService";

const SignIn = () => {
  const theme = useTheme();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const handleSignIn = () => {
    // Add your sign-in logic here
    setIsLoading(true);
    signInUser(form.email, form.password)
      .then(() => {
        setIsLoading(false);
        handleNavigation(router, "/home");
      })
      .catch((error) => {
        setIsLoading(false);
        setEmailError(error.message);
      });
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    // Add your forgot password logic here
    console.log("Forgot Password");
    // handleNavigation(router, "/forgot-password");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.formContainer}>
          {/* <Text style={styles.logoText}>Logo will be here</Text> */}
          <Text variant={"displayMedium"} style={styles.headerText}>
            Log in to Match Meals!
          </Text>

          <FormField
            title="Email"
            value={form.email}
            changeHandler={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            left={
              <TextInput.Icon
                icon="email"
                color={(isTextInputFocused) =>
                  isTextInputFocused
                    ? theme.colors.primary
                    : theme.colors.onSurfaceDisabled
                }
              />
            }
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}

          <View style={{ marginBottom: 30 }}>
            <FormField
              title="Password"
              value={form.password}
              changeHandler={(p) => setForm({ ...form, password: p })}
              secureTextEntry={showPassword}
              left={
                <TextInput.Icon
                  icon="lock"
                  color={(isTextInputFocused) =>
                    isTextInputFocused
                      ? theme.colors.primary
                      : theme.colors.onSurfaceDisabled
                  }
                />
              }
              right={
                <TextInput.Icon
                  onPress={() => setShowPassword(!showPassword)}
                  icon={showPassword ? "eye-off" : "eye"}
                  color={(isTextInputFocused) =>
                    isTextInputFocused
                      ? theme.colors.primary
                      : theme.colors.onSurfaceDisabled
                  }
                />
              }
            />
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            <SignInButton
              text="Sign In"
              onPress={handleSignIn}
              isLoading={isLoading}
              contentStyle={{ height: 60, width: 350 }}
            />
          </View>

          <View style={styles.signInContainer}>
            <Text>Don't have an account? </Text>
            <Link
              href="/sign-up"
              style={[styles.signInLink, { color: theme.colors.primary }]}
            >
              Sign up here!
            </Link>
          </View>
        </View>
        {/* <StatusBar style="auto" /> */}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // backgroundColor: Colors.light.background,
  },
  formContainer: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 16,
    flex: 1,
    marginVertical: 200,
    // alignItems: "center",
  },
  logoText: {
    textAlign: "center",
    marginBottom: 20,
  },
  headerText: {
    // fontFamily: "Montserrat-SemiBold",
    // fontSize: 24,
    // color: Colors.light.primary,
    marginBottom: 30,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  forgotPasswordText: {
    // color: Colors.light.primary,
    textAlign: "right",
    marginVertical: 8,
  },
  signInContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signInLink: {
    // color: Colors.light.primary,
    textDecorationLine: "underline",
  },
});

export default SignIn;
