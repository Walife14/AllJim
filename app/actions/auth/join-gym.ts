'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type joinGymState = {
    success?: boolean
    error?: string | null
}

export async function joinGymAction(state: joinGymState, formData: FormData): Promise<joinGymState> {
    const supabase = await createClient()
    const gymId = formData.get('gymId')
    const gymSlug = formData.get('gymSlug')

    // grab the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return {
            success: false,
            error: userError?.message || 'User not authenticated'
        }
    }

    // create their membership

    const { error: membershipError } = await supabase
        .from('memberships')
        .insert({ user_id: user.id, gym_id: gymId, role: 'member', status: 'inactive' })

    if (membershipError) {
        return {
            success: false,
            error: membershipError.message
        }
    }

    if (gymSlug) {
        revalidatePath(`/{gymSlug}`, 'layout')
    }

    return {
        success: true,
        error: null
    }
}