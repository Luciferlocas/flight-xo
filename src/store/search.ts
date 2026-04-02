import { create } from "zustand";
import { FlightResponse } from "@/schema/search/index.types";

interface SearchState {
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
    setTripType,
    setFrom,
    setTo,
    setDate,
    setPassengers,
    setFlights,
  } = useSearchStore();

  return {
    tripType,
    from,
    to,
    date,
    passengers,
    flights,
    setTripType,
    setFrom,
    setTo,
    setDate,
    setPassengers,
    setFlights,
  };
};
