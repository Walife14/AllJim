import * as z from 'zod';

export type FormState = {
    fields?: {
        email?: string
    }
    message?: string;
    errors?: {
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        firstName?: string[];
        lastName?: string[];
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
    firstName: z
        .string()
        .regex(/^[a-zA-Z]+$/, { error: 'First name cannot contain numbers or special characters.' })
        .trim(),
    lastName: z
        .string()
        .regex(/^[a-zA-Z]+$/, { error: 'Last name cannot contain numbers or special characters.' })
        .trim(),
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