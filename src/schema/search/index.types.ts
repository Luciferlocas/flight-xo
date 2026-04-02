import { z } from "zod";
import {
  AirportSearchRequestSchema,
  FlightSearchRequestSchema,
  AirportResponseSchema,
  FlightResponseSchema,
} from "./index";

export type AirportSearchRequest = z.infer<typeof AirportSearchRequestSchema>;
export type FlightSearchRequest = z.infer<typeof FlightSearchRequestSchema>;
export type AirportResponse = z.infer<typeof AirportResponseSchema>;
export type FlightResponse = z.infer<typeof FlightResponseSchema>;
