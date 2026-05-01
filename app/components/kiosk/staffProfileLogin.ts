'use server'

import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export type staffProfileLoginResponse = {
    error?: string,
    success?: boolean
}

export async function staffProfileLoginAction(state: staffProfileLoginResponse, formData: FormData): Promise<staffProfileLoginResponse> {
    try {
        const supabase = await createClient()
        const cookieStore = await cookies()

        const pin = formData.get('pin')
        const gymSlug = formData.get('gymSlug')
        
        // get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Unauthorised')

        // grab the current gym
        const { data: gym, error: gymIdError } = await supabase
            .from('gyms')
            .select('id')
            .eq('slug', gymSlug)
            .single()

        if (!gym || gymIdError) throw new Error(gymIdError.message || 'No gym id found.')

        // check db for a staff profile using current user id, gym id and pin
        const { data: staffProfile, error: staffProfileLoginError } = await supabase
            .from('staff_profiles')
            .select('id, first_name, last_name')
            .match({pin: pin, user_id: user.id, gym_id: gym.id})
            .single()

        if (staffProfileLoginError) throw new Error(staffProfileLoginError.message || 'Could not grab a staff profile.')

        cookieStore.set('active_staff_id', staffProfile.id, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60*60 // 1 hr
        })

        return { success: true }
    } catch (err: any) {
        return {
            error: err.message || 'Failed to login.',
            success: false
        }
    }
}