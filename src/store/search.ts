import { create } from "zustand";
import { FlightResponse } from "@/schema/search/index.types";
import { getDeviceId } from "@/utils/device";

interface SearchState {
  deviceId: string;
  tripType: "roundTrip" | "oneWay";
  from: {
    city: string;
    country: string;
    iata: string;
  };
  to: {
    city: string;
    country: string;
    iata: string;
  };
  date: {
    departure: Date;
    return: Date;
  };
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  flights: FlightResponse | null;
  setDeviceId: (deviceId: string) => void;
  setTripType: (tripType: "roundTrip" | "oneWay") => void;
  setFrom: (from: { city: string; country: string; iata: string }) => void;
  setTo: (to: { city: string; country: string; iata: string }) => void;
  setDate: (date: { departure: Date; return: Date }) => void;
  setPassengers: (passengers: {
    adults: number;
    children: number;
    infants: number;
  }) => void;
  setFlights: (flights: FlightResponse) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  deviceId: "",
  tripType: "oneWay",
  from: {
    city: "",
    country: "",
    iata: "",
  },
  to: {
    city: "",
    country: "",
    iata: "",
  },
  date: {
    departure: new Date(),
    return: new Date(),
  },
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  flights: null,
  setDeviceId: (deviceId: string) => set({ deviceId }),
  setTripType: (tripType: "roundTrip" | "oneWay") => set({ tripType }),
  setFrom: (from: { city: string; country: string; iata: string }) =>
    set({ from }),
  setTo: (to: { city: string; country: string; iata: string }) => set({ to }),
  setDate: (date: { departure: Date; return: Date }) => set({ date }),
  setPassengers: (passengers: {
    adults: number;
    children: number;
    infants: number;
  }) => set({ passengers }),
  setFlights: (flights: FlightResponse) => set({ flights }),
}));

export const useSearch = () => {
  const {
    tripType,
    from,
    to,
    date,
    passengers,
    flights,
    deviceId,
    setDeviceId,
    setTripType,
    setFrom,
    setTo,
    setDate,
    setPassengers,
    setFlights,
  } = useSearchStore();

  const initializeDeviceId = async () => {
    const deviceId = await getDeviceId();
    setDeviceId(deviceId);
  };

  return {
    tripType,
    from,
    to,
    date,
    passengers,
    flights,
    deviceId,
    setDeviceId,
    setTripType,
    setFrom,
    setTo,
    setDate,
    setPassengers,
    setFlights,
    initializeDeviceId,
  };
};
