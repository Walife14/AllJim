"use server"

import { LoginFormSchema, SignUpFormSchema, FormState } from "@/app/lib/definitions";
import { checkGymMembership } from "@/app/lib/queries/memberships";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(state: FormState, formData: FormData): Promise<FormState> {
    const supabase = await createClient()

    // grab the gymSlug if exists for redirect
    const gymSlug = formData.get('gymSlug')

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

    const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError || !user) {
        return {
            message: signInError?.message || 'no user'
        }
    }

    if (gymSlug) {
        const adminRoles = ['owner']
        const membership = await checkGymMembership(user.id, gymSlug.toString())

        if (membership) {
            if (adminRoles.includes(membership.role)) { // send to management if they're management
                redirect(`/${gymSlug}/management`)
            }

            redirect(`/${gymSlug}/portal`)
        } else {
            redirect(`/${gymSlug}/join?reason=unregistered`)
        }
    }

    // fallback if there is no gymSlug (marketing page)
    revalidatePath('/', 'layout')
    redirect('/')
}

// this is to create a new user in the system, along with their profile.
export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    const supabase = await createClient()

    const gymSlug = formData.get("gymSlug")

    let gym_id: string | null = null;

    if (gymSlug) {
    // check if the gym exists - grab gym_id
        const { data: gym, error } = await supabase
            .from('gyms')
            .select('id')
            .eq('slug', gymSlug)
            .single()
        
        if (error || !gym) {
            return {
                message: 'We could not find the gym using the slug - user not signed up.'
            }
        }

        gym_id = gym.id
    }
    
    // validate form fields
    const validatedFields = SignUpFormSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
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
    const { firstName, lastName, email, password } = validatedFields.data

    const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName.trim(), // unsure there are no spaces before and after
                last_name: lastName.trim(), // unsure there are no spaces before and after
                gym_id: gym_id
            }
        }
    })

    if (signUpError) {
        return {
            message: signUpError.message
        }
    }

    revalidatePath('/', 'layout')

    if (gymSlug) {
        // redirect to that gymSlug location
        redirect(`/${gymSlug}`)
    }

    // fallback route - marketing signup
    redirect('/')
}