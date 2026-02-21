import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required"),

  email: z
    .string()
    .nonempty("Email is required")
    .email("Email is not valid"),

  password: z
    .string({ invalid_type_error: "Password must be a string" })
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Email is not valid"),

  password: z
    .string()
    .nonempty("Password is required"),
});
