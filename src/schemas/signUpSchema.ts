import { z } from "zod"

export const usernameValidation = z
    .string()
    .min(5, "username must be atleast 5 characters long")
    .max(30, "username cannot be more than 30 characters long")
    .regex(/^[a-zA-Z0-9]/,"username must not contain any special character")

export const signUpSchema = z.object({
    username: usernameValidation,
    password: z.string().min(8, "password must be atleast 8 characters long"),
    email: z.string().email({message: "email must be a valid email"}),
})