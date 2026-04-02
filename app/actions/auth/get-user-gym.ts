'use server'

import { createClient } from '@/lib/supabase/server'

export type GymData = {
    id: string
    name: string
    slug: string
    address_line_1: string
    address_line_2: string
    post_code: string
    city: string
    country: string
}

type GymResponse = Promise<{
    error: string | null
    data: GymData | null
}>

export async function getCurrentUserGymAction(): GymResponse {
    const supabase = await createClient()

    // get currently signed in user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (!user || authError) {
        return {
            error: 'Not authenticated.', data: null
        }
    }

    // get the currently signed in users profile and grab gym_id
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('gym_id')
        .eq('id', user.id)
        .single()

    if (profileError) {
        return {
            error: 'Could not fetch currently signed in user profile', data: null
        }
    }
    if (!profile.gym_id) {
        return {
            error: 'User does not have a gym associated with account', data: null
        }
    }

    // now we have a user with a profile and a gym_id

    // grab the gym they're associated with

    const { data: gym, error: gymError } = await supabase
        .from('gyms')
        .select('id, name, slug, address_line_1, address_line_2, post_code, city, country')
        .eq('id', profile.gym_id)
        .single()

    if (!gym || gymError) {
        return {
            error: 'Gym not found, or could not fetch the gym.', data: null
        }
    }

    // everything is good return the gym associated with currently signed in user
    return {
        error: null,
        data: {
            id: gym.id,
            name: gym.name,
            slug: gym.slug,
            address_line_1: gym.address_line_1,
            address_line_2: gym.address_line_2,
            post_code: gym.post_code,
            city: gym.city,
            country: gym.country
        }
    }
}