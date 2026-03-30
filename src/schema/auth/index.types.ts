import { z } from "zod";
import {
  SendOTPRequestSchema,
  VerifyOTPRequestSchema,
  SignupRequestSchema,
  LoginRequestSchema,
  LoginResponseSchema,
} from "./index";

export type SendOTPRequest = z.infer<typeof SendOTPRequestSchema>;
export type VerifyOTPRequest = z.infer<typeof VerifyOTPRequestSchema>;
export type SignupRequest = z.infer<typeof SignupRequestSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
