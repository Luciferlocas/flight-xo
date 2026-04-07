import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spinner } from "@/components/ui/spinner";
import { AuthService } from "@/service";
import { Link, useRouter } from "expo-router";
import { CircleCheck, Plane } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function SignUpScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState({
    sent: false,
    value: "",
    verified: false,
    disabled: false,
    isVerifying: false,
  });

  const [loading, setLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
    signUp: false,
  });

  const [error, setError] = useState({
    name: false,
    mobile: false,
    email: false,
    password: false,
    confirmPassword: false,
    message: "Hello my name is rohit ",
  });

  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user.confirmPassword && user.password !== user.confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: true,
        message: "Passwords do not match",
      }));
    } else {
      setError((prev) => ({ ...prev, confirmPassword: false, message: "" }));
    }
  }, [user.confirmPassword, user.password]);

  const handleSendOtp = async () => {
    if (!user.mobile) {
      setError((prev) => ({
        ...prev,
        mobile: true,
        message: "Mobile number required",
      }));
      return;
    }

    setLoading((prev) => ({ ...prev, sendOtp: true }));
    try {
      await AuthService.sendOTP({ mobile: user.mobile });
      setOtp((prev) => ({ ...prev, sent: true, disabled: true }));
      setError((prev) => ({ ...prev, mobile: false, message: "" }));

      setTimeout(() => {
        setOtp((prev) => ({ ...prev, disabled: false }));
      }, 60000);
    } catch (err) {
      console.error(err);
      setError((prev) => ({
        ...prev,
        message: "Failed to send OTP. Try again.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, sendOtp: false }));
    }
  };

  useEffect(() => {
    if (otp.value.length === 6 && !otp.verified) {
      const verify = async () => {
        setOtp((prev) => ({ ...prev, isVerifying: true }));
        setLoading((prev) => ({ ...prev, verifyOtp: true }));

        try {
          const res = await AuthService.verifyOTP({
            mobile: user.mobile,
            otp: otp.value,
          });
          if (res.success) setOtp((prev) => ({ ...prev, verified: true }));
        } catch (err) {
          console.error(err);
          setError((prev) => ({ ...prev, message: "Invalid OTP" }));
          setOtp((prev) => ({ ...prev, value: "" }));
        } finally {
          setOtp((prev) => ({ ...prev, isVerifying: false }));
          setLoading((prev) => ({ ...prev, verifyOtp: false }));
        }
      };
      verify();
    }
  }, [otp.value, user.mobile, otp.verified]);

  const handleSignUp = async () => {
    const hasEmptyFields = Object.values(user).some((val) => val === "");
    if (hasEmptyFields) {
      setError({
        name: user.name === "",
        mobile: user.mobile === "",
        email: user.email === "",
        password: user.password === "",
        confirmPassword: user.confirmPassword === "",
        message: "All fields are required",
      });
      return;
    }
    setLoading((prev) => ({ ...prev, signUp: true }));
    try {
      const res = await AuthService.signup({
        fullName: user.name,
        mobile: user.mobile,
        email: user.email,
        password: user.password,
      });
      if (res.success) {
        router.replace("/");
      }
    } catch (error) {
      console.error(error);
      setError((prev) => ({
        ...prev,
        message: "Failed to sign up. Try again.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, signUp: false }));
    }
  };

  const getErrorStyle = (isError: boolean) => ({
    backgroundColor: isError ? "#f5bcbcff" : "transparent",
  });

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <ThemedView style={[styles.container, { height }]}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/airplane-flying-through-clouds.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.dividerContainer}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.dashLine} />
          ))}
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                styles.emailInput,
                getErrorStyle(error.name),
              ]}
              placeholder="john doe"
              value={user.name}
              onChangeText={(text) => setUser({ ...user, name: text })}
              placeholderTextColor="#aeaeaeff"
            />
            <View style={styles.dashLine} />

            <View style={styles.mobileRow}>
              <TextInput
                style={[
                  styles.mobileInput,
                  styles.input,
                  getErrorStyle(error.mobile),
                ]}
                placeholder="(+91) 9876543210"
                keyboardType="number-pad"
                value={user.mobile}
                onChangeText={(text) => setUser({ ...user, mobile: text })}
                placeholderTextColor="#aeaeaeff"
              />
              {otp.sent && !otp.verified && (
                <>
                  <View style={styles.dashLineVertical} />
                  <TextInput
                    style={[styles.otpInput, styles.input]}
                    placeholder="123456"
                    keyboardType="number-pad"
                    maxLength={6}
                    editable={!otp.isVerifying && !otp.verified}
                    value={otp.value}
                    onChangeText={(text) => setOtp({ ...otp, value: text })}
                    placeholderTextColor="#aeaeaeff"
                  />
                </>
              )}
              {otp.verified ? (
                <View style={{ paddingHorizontal: 12 }}>
                  <CircleCheck size={24} color="#000000" fill="#aae2a0ff" />
                </View>
              ) : (
                <>
                  <View style={styles.dashLineVertical} />
                  <TouchableOpacity
                    onPress={handleSendOtp}
                    disabled={loading.sendOtp || otp.disabled}
                    style={[
                      styles.verifyButton,
                      otp.disabled &&
                        !loading.sendOtp && { backgroundColor: "#ccc" },
                    ]}
                  >
                    {loading.sendOtp ? (
                      <Spinner color="black" />
                    ) : (
                      <ThemedText style={styles.verifyButtonText}>
                        {!otp.sent ? "Verify" : "Resend"}
                      </ThemedText>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.dashLine} />

            <TextInput
              style={[
                styles.emailInput,
                styles.input,
                getErrorStyle(error.email),
              ]}
              placeholder="johndoe@email.com"
              keyboardType="email-address"
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
              placeholderTextColor="#aeaeaeff"
            />
            <View style={styles.dashLine} />

            <View style={styles.passwordRow}>
              <View
                style={[
                  { paddingHorizontal: 12, flex: 1 },
                  getErrorStyle(error.password),
                ]}
              >
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  placeholder="password"
                  value={user.password}
                  onChangeText={(text) => setUser({ ...user, password: text })}
                  placeholderTextColor="#aeaeaeff"
                />
              </View>
              <View style={styles.dashLineVertical} />
              <View
                style={[
                  { paddingHorizontal: 12, flex: 1 },
                  getErrorStyle(error.confirmPassword),
                ]}
              >
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  value={user.confirmPassword}
                  onChangeText={(text) =>
                    setUser({ ...user, confirmPassword: text })
                  }
                  placeholder="confirm password"
                  placeholderTextColor="#aeaeaeff"
                />
              </View>
            </View>
            <View style={styles.dashLine} />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
              {loading.signUp ? (
                <Spinner color="black" />
              ) : (
                <>
                  <Plane size={20} color="#000" style={styles.buttonIcon} />
                  <ThemedText style={styles.loginText}>Sign Up</ThemedText>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.bottomGraphicContainer}>
            <View style={styles.dashedCircle} />
            <ThemedText style={styles.signUpText}>
              Already have an account?{" "}
              <Link href="/login" replace asChild>
                <ThemedText style={styles.signUpLink}>Login</ThemedText>
              </Link>
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAE2",
  },
  imageContainer: {
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  dividerContainer: {
    width: "100%",
    gap: 6,
    backgroundColor: "#FFD700",
  },
  dashLine: {
    width: width,
    borderBottomWidth: 2,
    borderStyle: "dashed",
  },
  dashLineVertical: {
    height: "100%",
    borderLeftWidth: 2,
    borderStyle: "dashed",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 30,
  },
  input: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    paddingVertical: 24,
  },
  mobileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mobileInput: {
    paddingHorizontal: 12,
    flex: 1,
  },
  otpInput: {
    paddingHorizontal: 12,
    width: width / 4,
  },
  verifyButton: {
    paddingVertical: 24,
    paddingHorizontal: 12,
    backgroundColor: "#aae2a0ff",
    alignItems: "center",
    justifyContent: "center",
    width: width / 5,
  },
  verifyButtonText: {
    color: "#000000",
  },
  emailInput: {
    paddingHorizontal: 12,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    gap: 16,
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  loginButton: {
    flex: 2.5,
    flexDirection: "row",
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  biometricButton: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonIcon: {
    marginRight: 8,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  bottomGraphicContainer: {
    position: "absolute",
    bottom: "-60%",
    width: width * 1.2,
    height: width * 1.2,
    alignItems: "center",
  },
  dashedCircle: {
    width: "100%",
    height: "100%",
    borderRadius: width,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "dashed",
    backgroundColor: "white",
  },
  signUpText: {
    position: "absolute",
    top: 80,
    fontSize: 16,
    color: "#000",
  },
  signUpLink: {
    color: "#000000",
    fontWeight: "900",
  },
});
