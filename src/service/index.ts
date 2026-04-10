import AuthController from "@/service/controller/auth";
import FlightController from "@/service/controller/flight";
import TrackController from "@/service/controller/track";

const apiConfig = {
  auth: new AuthController(process.env.EXPO_PUBLIC_API_URL!),
  flight: new FlightController(process.env.EXPO_PUBLIC_API_URL!),
  track: new TrackController(process.env.EXPO_PUBLIC_API_URL!),
};

export const AuthService = apiConfig.auth;
export const FlightService = apiConfig.flight;
export const TrackService = apiConfig.track;
