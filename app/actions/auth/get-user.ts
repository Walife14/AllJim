'use server'

import { createClient } from "@/lib/supabase/server"

export type UserData = {
    id: string
    email: string
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

    // return an object containing the user profile details that we want.
    return {
        error: null,
        data: {
            id: user.id,
            email: user.email as string,
        }
    }

}