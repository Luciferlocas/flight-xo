import { create } from "zustand";

interface TrackState {
  flightNumber: {
    flightId: number;
    airline: string;
    flightNumber: string;
    limit: string | null;
  };
  setFlightNumber: (flightNumber: TrackState["flightNumber"]) => void;
}

export const useTrackStore = create<TrackState>((set) => ({
  flightNumber: {
    flightId: 0,
    airline: "",
    flightNumber: "",
    limit: null,
  },
  setFlightNumber: (flightNumber: TrackState["flightNumber"]) =>
    set({ flightNumber }),
}));

export const useTrack = () => {
  const { flightNumber, setFlightNumber } = useTrackStore();

  return { flightNumber, setFlightNumber };
};
