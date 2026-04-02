import AuthController from "@/service/controller/auth";
import FlightController from "@/service/controller/flight";

const apiConfig = {
  auth: new AuthController(process.env.EXPO_PUBLIC_API_URL!),
  flight: new FlightController(process.env.EXPO_PUBLIC_API_URL!),
};

export const AuthService = apiConfig.auth;
export const FlightService = apiConfig.flight;
