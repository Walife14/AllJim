'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type onboardingData = {
    gymName: string
    gymSlug: string
    addressLine1: string
    addressLine2: string
    addressPost_code: string
    addressCity: string
    addressCountry: string
}

export async function onboardGymAction(formData: onboardingData): Promise<any> {
    // TODO: check whether data is valid before continuing

    // connect to the supabase
    const supabase = await createClient()

    // check whether we have a user currently signed in
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return {
            error: "Session expired or invalid. Please sign in again."
        }
    }

    // insert the gym
    const { data: gymData, error: gymError } = await supabase
        .from('gyms')
        .insert({
            name: formData.gymName,
            slug: formData.gymSlug,
            address_line_1: formData.addressLine1,
            address_line_2: formData.addressLine2 || null,
            post_code: formData.addressPost_code,
            city: formData.addressCity,
            country: formData.addressCountry
        })
        .select()
        .single()

    if (gymError) {
        if (gymError.code === '23505') return {
            error: "URL slug already taken"
        }
        return {
            error: gymError
        }
    }

    revalidatePath('/', 'layout')
    redirect(`${gymData.slug}/management/dashboard`)
}