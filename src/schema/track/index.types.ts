import { z } from "zod";
import {
  FlightNumberRequestSchema,
  FlightNumberResponseSchema,
  FlightNumberResponseItem,
  TrackFlightRequestSchema,
  TrackFlightResponseSchema,
} from ".";

export type FlightNumberRequest = z.infer<typeof FlightNumberRequestSchema>;
export type FlightNumberResponse = z.infer<typeof FlightNumberResponseSchema>;
export type FlightNumber = z.infer<typeof FlightNumberResponseItem>;
export type TrackFlightRequest = z.infer<typeof TrackFlightRequestSchema>;
export type TrackFlightResponse = z.infer<typeof TrackFlightResponseSchema>;
