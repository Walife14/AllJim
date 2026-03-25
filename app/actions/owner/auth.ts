"use server"

import { LoginFormSchema, SignUpFormSchema, FormState } from "@/app/lib/definitions";

import { createClient } from "@/lib/supabase/server";

export async function login(state: FormState, formData: FormData): Promise<FormState> {
    const supabase = await createClient()

    // validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    // if any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // if all form fields are valid, proceed with login logic
    const { email, password } = validatedFields.data

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
        return {
            message:  signInError.message
        }
    }

    return {
        message: "success!"
    }
}

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    const supabase = await createClient()

    // validate form fields
    const validatedFields = SignUpFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    })

    // if any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // if all form fields are valid, proceed with registration logic
    const { email, password } = validatedFields.data

    const { error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError) {
        return {
            message: signUpError.message
        }
    }

    return {
        message: "success!"
    }
}