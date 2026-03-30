import {
  LoginRequest,
  LoginResponse,
  SendOTPRequest,
  SignupRequest,
  VerifyOTPRequest,
} from "@/schema/auth/index.types";
import { ClientResponse } from "@/schema/response/index.types";
import { APIClient } from "@/service/core/config";
import { parseResponse } from "../core/response-parser";

export default class AuthController {
  private apiClient: APIClient;

  constructor(private readonly backendURL: string) {
    this.apiClient = new APIClient(this.backendURL);
  }

  async sendOTP(
    request: SendOTPRequest,
    headers?: Record<string, string>
  ): Promise<ClientResponse<string>> {
    const response = await this.apiClient.post(
      `/api/auth/request-otp`,
      request,
      headers
    );
    return await parseResponse<string>(response);
  }

  async verifyOTP(
    request: VerifyOTPRequest,
    headers?: Record<string, string>
  ): Promise<ClientResponse<string>> {
    const response = await this.apiClient.post(
      `/api/auth/verify-otp`,
      request,
      headers
    );
    return await parseResponse<string>(response);
  }

  async signup(
    request: SignupRequest,
    headers?: Record<string, string>
  ): Promise<ClientResponse<string>> {
    const response = await this.apiClient.post(
      `/api/auth/register`,
      request,
      headers
    );
    return await parseResponse<string>(response);
  }

  async login(
    request: LoginRequest,
    headers?: Record<string, string>
  ): Promise<ClientResponse<LoginResponse>> {
    const response = await this.apiClient.post(
      `/api/auth/login`,
      request,
      headers
    );
    return await parseResponse<LoginResponse>(response);
  }
}
