import { object, string } from "zod";
import { email } from "zod/v4";

export const SignInSchema = object({
  email: string().email("invalid email"),
  password: string().min(1, "password tidak boleh lebih dari 8 character"),
});

export const RegisterSchema = object({
  email: string().email("invalid email"),
  password: string().min(1, "password tidak boleh lebih dari 8 character"),
});
