import { z } from "zod";

export const SendOTPRequestSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
});

export const VerifyOTPRequestSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  otp: z.string().regex(/^\d{6}$/),
});

export const SignupRequestSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
});
