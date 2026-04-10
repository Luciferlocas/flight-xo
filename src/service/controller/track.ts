import { ClientResponse } from "@/schema/response/index.types";
import { APIClient } from "../core/config";
import { parseResponse } from "../core/response-parser";
import {
  FlightNumberRequest,
  FlightNumberResponse,
  TrackFlightRequest,
  TrackFlightResponse,
} from "@/schema/track/index.types";
import { urlBuilder } from "@/utils/url-builder";

export default class FlightController {
  private apiClient: APIClient;

  constructor(private readonly backendURL: string) {
    this.apiClient = new APIClient(this.backendURL);
  }

  async searchFlightNumber(
    request: FlightNumberRequest,
    headers?: Record<string, string>
  ): Promise<ClientResponse<FlightNumberResponse>> {
    const response = await this.apiClient.get(
      `/api/track/flights?flightNumber=${request.query}`,
      headers
    );
    return await parseResponse<FlightNumberResponse>(response);
  }

  async trackFlight(
    request: TrackFlightRequest,
    headers?: Record<string, string>
  ): Promise<ClientResponse<TrackFlightResponse>> {
    const url = urlBuilder("/api/track", request);
    const response = await this.apiClient.get(url, headers);
    return await parseResponse<TrackFlightResponse>(response);
  }
}
