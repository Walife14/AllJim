'use server'

import { createClient } from '@/lib/supabase/server'

type MembershipRow = {
    gym_id: string;
    role: 'owner' | 'staff' | 'member'
    user_id: string
    status: 'active' | 'inactive' | 'banned'
}

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
    data: GymData[]
}>

export async function getCurrentUserGymAction(): GymResponse {
    const supabase = await createClient()

    // get currently signed in user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (!user || authError) {
        return {
            error: 'Not authenticated.', data: []
        }
    }

    // check memberships table to see if there is an entry with user id
    const { data: gymMemberships, error: membershipError } = await supabase
        .from('memberships')
        .select('gym_id, role, user_id, status')
        .eq('user_id', user.id)
    
    if (membershipError) {
        return {
            error: 'Could not access gym memberships table to find memberships', data: []
        }
    }

    // get the list of gym_ids the user is associated with
    const gymIds: string[] = gymMemberships?.map((m: MembershipRow) => m.gym_id) || []

    // grab the gym(s) they're associated with
    const { data: gyms, error: gymError } = await supabase
        .from('gyms')
        .select('id, name, slug, address_line_1, address_line_2, post_code, city, country')
        .eq('id', gymIds)

    if (!gyms || gymError) {
        return {
            error: 'Gym not found, or could not fetch the gym.', data: []
        }
    }

    const gymsList: GymData[] = gyms.map((g: GymData) => {
        return {
            id: g.id,
            name: g.name,
            slug: g.slug,
            address_line_1: g.address_line_1,
            address_line_2: g.address_line_2,
            post_code: g.post_code,
            city: g.city,
            country: g.country
        }
    })

    // everything is good return the gym associated with currently signed in user
    return {
        error: null,
        data: gymsList
    }
}