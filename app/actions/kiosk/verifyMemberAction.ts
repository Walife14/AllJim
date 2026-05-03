'use server'

import { createClient } from "@/lib/supabase/server"
import { isAfter, parseISO } from "date-fns"
import { jwtVerify } from "jose"

interface User {
    user_id: string
}

export type checkInMemberResponse = {
    error?: string
    success?: boolean
    data?: User
}

const secret = new TextEncoder().encode(
    process.env.QR_SECRET_KEY
)


export async function verifyMember(state: checkInMemberResponse, formData: FormData): Promise<checkInMemberResponse> {
    try {
        const supabase = await createClient()

        const gymSlug = formData.get('gymSlug') as string
        const jwt = formData.get('jwt') as string

        if (!jwt) throw new Error('No JWT found.')

        const { payload } = await jwtVerify(jwt, secret)

        // we have the payload -- continue

        // grab the gym
        const { data: gym, error: gymError } = await supabase
            .from('gyms')
            .select('id')
            .eq('slug', gymSlug)
            .single()

        if (!gym || gymError) throw new Error(gymError.message || 'No gym found.')

        // check with backend the user_id from payload which is the payload.sub
        const { data: membership, error: membershipError } = await supabase
            .from('memberships')
            .select('expires_at, status')
            .match({ user_id: payload.sub, gym_id: gym.id })
            .single()

        if (membershipError) throw new Error(membershipError.message)

        // check expiry of membership to see if they have an active membership
        const now = new Date()

        const expiryDate = parseISO(membership.expires_at)

        const isActive = isAfter(expiryDate, now)

        if (!isActive) throw new Error('Membership is expired.')

        return { success: true, data: { user_id: payload.sub! } }
    } catch (err: any) {
        console.error('JWT VERIFICATION FAILED: ', err)
        return {
            error: 'Invalid or expired pass.',
            success: false
        }
    }
}