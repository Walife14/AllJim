import * as z from 'zod';

export type FormState = {
    message?: string;
    errors?: {
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    }
}

export const LoginFormSchema = z.object({
    email: z.email({ error: "Please enter a valid email address." }).trim(),
    password: z
        .string()
        .min(8, { error: "Password must be at least 8 characters long." })
        .trim()
})

export const SignUpFormSchema = z.object({
    email: z.email({ error: "Please enter a valid email address." }).trim(),
    password: z
        .string()
        .min(8, { error: "Password must be at least 8 characters long." })
        .regex(/[a-zA-Z]/, { error: 'Password must contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Password must contain at least one special character.',
        })
        .trim(),
    confirmPassword: z
        .string()
        .min(8, { error: "Confirm Password must be at least 8 characters long." })
        .regex(/[a-zA-Z]/, { error: 'Password must contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Password must contain at least one special character.',
        })
        .trim(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})