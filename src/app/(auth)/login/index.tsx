import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spinner } from "@/components/ui/spinner";
import { AuthService } from "@/service";
import { saveToken } from "@/utils/auth";
import { Link, useRouter } from "expo-router";
import { Key, Plane, ScanFace } from "lucide-react-native";
import React, { useState } from "react";
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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: false,
    password: false,
    message: "",
  });

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError({
        email: true,
        password: true,
        message: "All fields are required",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await AuthService.login({ email, password });
      if (response.success && response.data?.token) {
        await saveToken(response.data.token);
        router.replace("/");
      } else {
        setError({
          email: true,
          password: true,
          message: response.data?.message as string,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getErrorStyle = (isError: boolean) => ({
    backgroundColor: isError ? "#ff827bff" : "transparent",
  });

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <ThemedView style={[styles.container, { height }]}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/airplane-in-cloud.png")}
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
            <View style={[styles.row, getErrorStyle(error.email)]}>
              <TextInput
                style={[styles.input, getErrorStyle(error.email)]}
                placeholder="johndoe@email.com"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#aeaeaeff"
              />
            </View>
            <View style={styles.dashLine} />

            <View style={[styles.row, getErrorStyle(error.password)]}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="password"
                placeholderTextColor="#aeaeaeff"
              />
              <Key size={20} color="#000" strokeWidth={3} />
            </View>
            <View style={styles.dashLine} />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              disabled={loading}
              style={styles.loginButton}
              onPress={handleLogin}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <Plane size={20} color="#000" style={styles.buttonIcon} />
                  <ThemedText style={styles.loginText}>Login</ThemedText>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.biometricButton}>
              <ScanFace size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotBtn}>
            <ThemedText style={styles.forgotText}>Forgot Password?</ThemedText>
          </TouchableOpacity>

          <View style={styles.bottomGraphicContainer}>
            <View style={styles.dashedCircle} />
            <ThemedText style={styles.signUpText}>
              New to Flight-XO?{" "}
              <Link href="/sign-up" asChild>
                <ThemedText style={styles.signUpLink}>Sign Up</ThemedText>
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
  emailInput: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
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
  forgotBtn: {
    padding: 10,
  },
  forgotText: {
    fontSize: 16,
    fontWeight: "800",
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
