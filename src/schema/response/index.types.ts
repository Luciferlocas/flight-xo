import { z } from "zod";
import { ResponseErrorSchema, ClientResponseSchema } from "./index";

export type ResponseError = z.infer<typeof ResponseErrorSchema>;

export type ClientResponse<T> = z.infer<
  ReturnType<typeof ClientResponseSchema<T>>
>;
