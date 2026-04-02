import { ClientResponse } from "@/schema/response/index.types";
import { APIClient } from "../core/config";
import { parseResponse } from "../core/response-parser";
import {
  AirportSearchRequest,
  AirportResponse,
  FlightSearchRequest,
  FlightResponse,
} from "@/schema/search/index.types";
import { urlBuilder } from "@/utils/url-builder";

export default class FlightController {
  private apiClient: APIClient;

  constructor(private readonly backendURL: string) {
    this.apiClient = new APIClient(this.backendURL);
  }

  async searchAirports(
    request: AirportSearchRequest,
    headers?: Record<string, string>
  ): Promise<ClientResponse<AirportResponse>> {
    const response = await this.apiClient.get(
      `/api/flight/get-airports?query=${request.query}`,
      headers
    );
    return await parseResponse<AirportResponse>(response);
  }

  async searchFlights(
    request: FlightSearchRequest,
    headers?: Record<string, string>
  ): Promise<ClientResponse<FlightResponse>> {
    const url = urlBuilder("/api/flight/get-flights", request);
    const response = await this.apiClient.get(url, headers);
    return await parseResponse<FlightResponse>(response);
  }
}
