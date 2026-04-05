'use server'

import { createClient } from "@/lib/supabase/server"

export type UserData = {
    id: string
    email: string
    first_name: string
    last_name: string
}

type UserProfileResponse = Promise<{
    error: string | null
    data: UserData | null
}>

export async function getUserProfileAction(): UserProfileResponse {
    const supabase = await createClient()

    // get the currently signed in user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: 'Not authenticated', data: null }
    }

    // grab their profile
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single()

    if (profileError) {
        console.error('Profile fetch error:', profileError)
        return { error: 'Could not fetch user profile', data: null }
    }

    // return an object containing the user profile details that we want.
    return {
        error: null,
        data: {
            id: user.id,
            email: user.email as string,
            first_name: profile.first_name as string,
            last_name: profile.last_name as string,
        }
    }

}