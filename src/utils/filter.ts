import { FlightResponse } from "@/schema/search/index.types";

type Airline = {
  name: string;
  code: string;
  price: number;
};

export const getAirlines = (flights: FlightResponse["flights"]) => {
  const map = new Map<string, Airline>();

  for (const flight of flights) {
    const existing = map.get(flight.airline);

    if (!existing || flight.price[0].totalfare < existing.price) {
      map.set(flight.airline, {
        name: flight.airline,
        code: flight.airlineCode,
        price: flight.price[0].totalfare,
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => a.price - b.price);
};

export const getFilteredFlights = (
  flights: FlightResponse["flights"],
  filter: {
    sortBy: string;
    stops: string;
    departureTime: string;
    arrivalTime: string;
    airlines: string[];
    flightClass?: string;
  }
) => {
  let filtered = [...flights];

  const getTimeCategory = (timeStr: string) => {
    if (!timeStr) return "";

    const hours = parseInt(timeStr.split(":")[0], 10);

    if (hours >= 6 && hours < 12) return "Morning";
    if (hours >= 12 && hours < 18) return "Afternoon";
    if (hours >= 18 && hours < 24) return "Evening";
    return "Night";
  };

  if (filter.stops !== "") {
    filtered = filtered.filter((flight) => {
      const stopsCount = flight.hops.length - 1;
      if (filter.stops === "Non stop") return stopsCount === 0;
      if (filter.stops === "1 Stop") return stopsCount === 1;
      if (filter.stops === "2+ Stops") return stopsCount >= 2;
      return true;
    });
  }

  if (filter.departureTime !== "") {
    filtered = filtered.filter(
      (flight) =>
        getTimeCategory(flight.departureTimeAirport) === filter.departureTime
    );
  }

  if (filter.arrivalTime !== "") {
    filtered = filtered.filter(
      (flight) =>
        getTimeCategory(flight.arrivalTimeAirport) === filter.arrivalTime
    );
  }

  if (filter.airlines.length > 0) {
    filtered = filtered.filter((flight) =>
      filter.airlines.includes(flight.airline)
    );
  }

  if (filter.flightClass && filter.flightClass !== "") {
    filtered = filtered.filter(
      (flight) => flight.bookingClass === filter.flightClass
    );
  }

  if (filter.sortBy === "price") {
    filtered.sort((a, b) => a.price[0].totalfare - b.price[0].totalfare);
  } else if (filter.sortBy === "duration") {
    filtered.sort((a, b) => {
      const timeA =
        new Date(a.arrivalTime).getTime() - new Date(a.departureTime).getTime();
      const timeB =
        new Date(b.arrivalTime).getTime() - new Date(b.departureTime).getTime();
      return timeA - timeB;
    });
  } else if (filter.sortBy === "stops") {
    filtered.sort((a, b) => a.hops.length - 1 - (b.hops.length - 1));
  }

  return filtered;
};
