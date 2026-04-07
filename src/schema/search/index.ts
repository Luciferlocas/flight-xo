import { z } from "zod";

export const AirportSearchRequestSchema = z.object({
  query: z.string(),
});

const LocationSchema = z.object({
  lon: z.number(),
  lat: z.number(),
});

const NearbyAirportPropSchema = z.object({
  iata: z.string(),
  distance: z.union([z.string(), z.number()]),
});

const GroupDataSchema = z.object({
  city: z.string(),
  id: z.string(),
  airport: z.string(),
  iata: z.string(),
  country: z.string(),
  countrycode: z.string(),
  state: z.string(),
  is_enabled: z.number(),
  weight: z.number(),
  weight_n: z.number(),
  other1: z.string(),
  other2: z.string(),
  other3: z.string(),
  other4: z.string(),
  tag: z.string(),
  time_zone: z.string().optional(),
  is_no_airport_city: z.number(),
  is_multi_airport_city: z.number(),
  has_nearby_airport: z.number(),
  nearby_airports_props: z.array(NearbyAirportPropSchema),
  nearby_airports: z.array(z.string()),
  location: LocationSchema.optional(),
  distanceFromPrimary: z.string().optional(),
  distance: z.number().optional(),
});

const AirportSchema = z.object({
  country: z.string(),
  id: z.string(),
  city: z.string(),
  countrycode: z.string(),
  is_multi_airport_city: z.number(),
  nearby_airports_props: z.array(NearbyAirportPropSchema),
  weight: z.number(),
  time_zone: z.string(),
  weight_n: z.number(),
  long: z.number().optional(),
  airport: z.string(),
  is_enabled: z.number(),
  nearby_airports: z.array(z.string()),
  has_nearby_airport: z.number(),
  iata: z.string(),
  is_no_airport_city: z.number(),
  other4: z.string(),
  location: LocationSchema.optional(),
  state: z.string(),
  tag: z.string(),
  other1: z.string(),
  other3: z.string(),
  other2: z.string(),
  lat: z.number().optional(),
  nearby_airport_count: z.number().optional(),
  nearby_airport_range: z.number().optional(),
  groupData: z.array(GroupDataSchema).optional(),
  nearby_text: z.string().optional(),
  nearby_airports_data: z.array(GroupDataSchema).optional(),
});

export const AirportResponseSchema = z.array(AirportSchema);

export const FlightSearchRequestSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  adults: z.number(),
  children: z.number(),
  infants: z.number(),
  deviceId: z.string(),
  flightClass: z.string(),
});

const DiscountSchema = z.object({
  promo_details: z.object({
    supporting_text: z.string(),
  }),
  discount_amount: z.number(),
  display_text: z.string(),
});

const PriceSchema = z.object({
  price: z.number(),
  totalfare: z.number(),
  provider: z.string(),
  partner: z.string(),
  refundable: z.boolean(),
  refundable_text: z.string(),
  hand_baggage_fare: z.boolean(),
  display_price: z.number(),
  onward_partner: z.string(),
  total_tax: z.number(),
  base_fare: z.number(),
  return_partner: z.string(),
  fare_sub_type: z.string(),
  fare_product: z.string(),
  flightid: z.string(),
  priceid: z.string(),
  solutionId: z.string(),
  discounts: DiscountSchema.optional(),
  fare_desc: z.string(),
});

const HopSchema = z.object({
  aircraftTypeDisplayName: z.string(),
  provider: z.string(),
  flightNumber: z.string(),
  origin: z.string(),
  destination: z.string(),
  departureTerminal: z.string(),
  arrivalTerminal: z.string(),
  departureTimeAirport: z.string(),
  departureDateAirport: z.string(),
  arrivalTimeAirport: z.string(),
  arrivalDateAirport: z.string(),
  airlineCode: z.string(),
  airline: z.string(),
  operatingAirlineCode: z.string(),
  operatingAirline: z.string(),
  origin_city: z.string(),
  origin_airport: z.string(),
  origin_timezone: z.string(),
  destination_city: z.string(),
  destination_airport: z.string(),
  destination_timezone: z.string(),
  arrivalTime: z.string().datetime(),
  departureTime: z.string().datetime(),
  departureTimeLocal: z.string().datetime(),
  arrivalTimeLocal: z.string().datetime(),
  duration: z.string(),
  class: z.string(),
  additional_info: z.record(z.string(), z.any()),
  layover: z.string().optional(),
  aircraftType: z.string(),
  serviceType: z.string(),
  aircraftTypeSuffix: z.string(),
});

const FlightItemSchema = z.object({
  origin: z.string(),
  originCity: z.string(),
  destination: z.string(),
  destinationCity: z.string(),
  bookingClass: z.string(),
  airline: z.string(),
  airlineCode: z.string(),
  validatingCarrier: z.string(),
  departureTimeAirport: z.string(),
  departureDateAirport: z.string(),
  arrivalTimeAirport: z.string(),
  arrivalDateAirport: z.string(),
  departureTime: z.string().datetime(),
  arrivalTime: z.string().datetime(),
  departureTimeLocal: z.string().datetime(),
  arrivalTimeLocal: z.string().datetime(),
  duration: z.string(),
  hops: z.array(HopSchema),
  refundable: z.boolean(),
  flightid: z.string(),
  solutionId: z.string(),
  airlinePriority: z.number(),
  refundable_text: z.string(),
  price: z.array(PriceSchema),
  has_multiple_fares: z.boolean(),
  isNearbyFlight: z.boolean(),
  is_provider_stitch: z.boolean(),
  suggestion_flight: z.boolean(),
  diff_day_flight: z.boolean(),
  fare_sub_type: z.string(),
  fare_sub_type_desc: z.string(),
  ttl: z.number(),
});

export const FlightResponseSchema = z.object({
  timestamp: z.string(),
  length: z.number(),
  flights: z.array(FlightItemSchema),
  meta: z
    .object({
      price: z.object({ min: z.number(), max: z.number() }),
      duration: z.object({ min: z.string(), max: z.string() }),
      stops: z.object({ min: z.number(), max: z.number() }),
      layover: z.object({ min: z.string(), max: z.string() }),
      airlines: z.array(z.string()),
      airlineNames: z.record(z.string(), z.string()),
      airports: z.object({
        origin: z.array(z.string()),
        destination: z.array(z.string()),
      }),
      airportNames: z.record(z.string(), z.string()),
      departure: z.object({
        timezone: z.string(),
        min_datetime: z.string(),
        max_datetime: z.string(),
        min_timestamp: z.number(),
        max_timestamp: z.number(),
      }),
      arrival: z.object({
        timezone: z.string(),
        min_datetime: z.string(),
        max_datetime: z.string(),
        min_timestamp: z.number(),
        max_timestamp: z.number(),
      }),
      airline_filter: z.record(
        z.string(),
        z.object({
          cnt: z.number(),
          stp: z.number(),
        })
      ),
      provider_order: z.array(z.string()),
      card_info: z
        .array(
          z.object({
            id: z.number(),
            text: z.string(),
            flights_length: z.number(),
          })
        )
        .optional(),
    })
    .passthrough(),
  requestid: z.string(),
});

export const FlightFareRequestSchema = z.object({
  id: z.string(),
  requestId: z.string(),
});

const ServiceEnum = z.enum([
  "CHECKIN_BAGGAGE",
  "HAND_BAGGAGE",
  "SEAT",
  "MEAL",
  "MODIFICATION",
  "CANCELLATION",
]);

export const FlightFareSchema = z.object({
  totalbase: z.number(),
  totaltax: z.number(),
  price: z.number(),
  fare_id: z.number(),
  fare_heading: z.string(),
  fare_sub_heading: z.string(),
  fare_name: z.string(),
  display_price: z.number(),
  price_id: z.string(),
  flight_id: z.string(),
  cabin_class: z.string().length(1),
  available_services: z.array(ServiceEnum),
});

export const FareServicesSchema = z.object({
  service_id: ServiceEnum,
  row_display_text: z.string(),
  available_col_display_text: z.string(),
  available_col_display_text_by_fare_product: z.record(z.string(), z.string()),
  display_image_by_fare_product: z.record(z.string(), z.boolean()),
  unavailable_col_display_text: z.string(),
  fare_service_icon: z.string(),
});

export const FlightFareResponseSchema = z.object({
  fares: z.array(FlightFareSchema),
  fare_services: z.array(FareServicesSchema),
});
