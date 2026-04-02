export interface FlightHop {
  aircraftType: string;
  aircraftTypeDisplayName?: string;
}

export const getAircraftName = (hop: FlightHop): string => {
  if (
    hop.aircraftTypeDisplayName &&
    hop.aircraftTypeDisplayName.trim() !== ""
  ) {
    return hop.aircraftTypeDisplayName;
  }

  const manualMap: Record<string, string> = {
    "7YL": "Boeing 737 MAX 8",
    "320": "Airbus A320",
    "32N": "Airbus A320neo",
    "321": "Airbus A321",
    "73H": "Boeing 737-800",
    "738": "Boeing 737-800",
    AT7: "ATR 72",
  };

  return manualMap[hop.aircraftType] ?? `Aircraft (${hop.aircraftType})`;
};

const AIRLINE_LOGO_CONFIG = {
  base_url:
    "https://paytmtravel-images-akamai.paytm.com/flights/airlines+logo/",
  default_url:
    "https://paytm-travel-mum-akamai.paytm.com/travel_db/flights/airlines+logo/defaultcarrier.png",
};

export const getPaytmAirlineLogo = (
  airlineCode: string | undefined | null
): string => {
  if (!airlineCode || airlineCode.trim() === "") {
    return AIRLINE_LOGO_CONFIG.default_url;
  }

  return `${AIRLINE_LOGO_CONFIG.base_url}${airlineCode.toUpperCase()}.png`;
};

export const getStopsText = (hops: FlightHop[]): string => {
  const stops = hops.length - 1;
  if (stops === 0) {
    return "Non Stop";
  }
  return `${stops} Stop${stops > 1 ? "s" : ""}`;
};
