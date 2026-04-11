import { TrackFlightResponse } from "@/schema/track/index.types";
import { create } from "zustand";

interface TrackState {
  flightNumber: {
    flightId: number;
    airline: string;
    flightNumber: string;
    limit: string | null;
  };
  flightData: TrackFlightResponse | null;
  setFlightNumber: (flightNumber: TrackState["flightNumber"]) => void;
  setFlightData: (flightData: TrackFlightResponse | null) => void;
}

export const useTrackStore = create<TrackState>((set) => ({
  flightNumber: {
    flightId: 0,
    airline: "",
    flightNumber: "",
    limit: null,
  },
  flightData: null,
  setFlightNumber: (flightNumber: TrackState["flightNumber"]) =>
    set({ flightNumber }),
  setFlightData: (flightData: TrackFlightResponse | null) =>
    set({ flightData }),
}));

export const useTrack = () => {
  const { flightNumber, flightData, setFlightNumber, setFlightData } =
    useTrackStore();

  return { flightNumber, flightData, setFlightNumber, setFlightData };
};
