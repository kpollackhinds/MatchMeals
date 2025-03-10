import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, useTheme, Text } from "react-native-paper";

// import { Colors } from "../../constants/colors";
import FormField from "../../components/FormField";
import { AuthButton as SignInButton } from "../../components/CustomButton";
import { handleNavigation } from "../../utils/naviagtionUtils";
import { signUpUser } from "../../services/authService";

// Open items:
// 5. Error handling for insufficient credentials ✓
// 3. Input validation ✓
// 1. Add a logo to the login page
// 2. Add a forgot password link
// 4. Add a loading indicator
const SignUp = () => {
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    // Add your sign-up logic here
    if (!validateEmail(form.email)) {
      setEmailError("Invalid email address");
      return;
    }
    if (form.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    setIsLoading(true);
    signUpUser(form.email, form.password)
      .then((user) => {
        setIsLoading(false);
        handleNavigation(router, "/onboarding");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.code === "auth/email-already-in-use") {
          setEmailError(true);
          alert("Email already in use");
        }
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView>
        <View style={styles.formContainer}>
          {/* <Text style={styles.logoText}>Logo will be here</Text> */}
          <Text variant={"displayMedium"} style={styles.headerText}>
            Sign Up for Match Meals!
          </Text>

          <TouchableOpacity
            onPress={() => handleNavigation(router, "/onboarding")}
          >
            <Text>skip to onboarding</Text>
          </TouchableOpacity>

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
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
          </View>

          <View style={{ alignItems: "center" }}>
            <SignInButton
              text="Sign Up"
              onPress={handleSignUp}
              isLoading={isLoading}
              contentStyle={{ height: 60, width: 350 }}
            />
          </View>

          <View style={styles.signUpContainer}>
            <Text>Already have an account? </Text>
            <Link
              href="/sign-in"
              style={[styles.signUpLink, { color: theme.colors.primary }]}
            >
              Sign in here!
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
    alignItems: "center",
    // backgroundColor: Colors.light.background,
  },
  formContainer: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 16,
    flex: 1,
    marginVertical: 200,
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
  signUpContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpLink: {
    // color: Colors.light.primary,
    textDecorationLine: "underline",
  },
});

export default SignUp;
