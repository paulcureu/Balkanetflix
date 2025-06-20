import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Not a valid email address"),

    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),

    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .optional(),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Not a valid email address"),

    password: z.string({ required_error: "Password is required" }),
  }),
});
