import { object, string } from "zod";

export const SignInSchema = object({
  email: string().email("invalid email"),
  password: string(),
});

export const RegisterSchema = object({
    email: string().email("invalid email"),
    password: string().min(8,"password tidak boleh lebih dari 8 character")
})
