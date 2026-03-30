import AuthController from "@/service/controller/auth";

const apiConfig = {
  auth: new AuthController(process.env.EXPO_PUBLIC_API_URL!),
};

export const AuthService = apiConfig.auth;
