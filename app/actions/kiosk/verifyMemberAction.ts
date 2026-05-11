'use server'

import { createClient } from "@/lib/supabase/server"
import { isAfter, parseISO } from "date-fns"
import { jwtVerify } from "jose"

interface User {
    membership_id: string
    first_name: string
    last_name: string
    status: string
    created_at: string
}

type MembershipWithProfile = {
    id: string
    expires_at: string
    status: string
    profiles: {
        first_name: string
        last_name: string
    }
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
            .select(`id, expires_at, status, legal_first_name, legal_last_name`)
            .match({ user_id: payload.sub, gym_id: gym.id })
            .single()
            .overrideTypes<MembershipWithProfile>()

        if (membershipError) throw new Error(membershipError.message)

        // check expiry of membership to see if they have an active membership
        const now = new Date()

        const expiryDate = parseISO(membership.expires_at)

        const isActive = isAfter(expiryDate, now)

        if (!isActive) throw new Error('Membership is expired.')

        // the membership is still active lets make a check-in record for the user

        const checkIn = {
            membership_id: membership.id,
            gym_id: gym.id
        }

        const { data: checkInData, error: checkInError } = await supabase
            .from('check_ins')
            .insert(checkIn)
            .select('created_at')
            .single()
        
        if (!checkInData || checkInError ) throw new Error(checkInError.message || 'Could not insert or grab check in.')

        return {
            success: true,
            data: {
                membership_id: membership.id,
                first_name: membership.legal_first_name,
                last_name: membership.legal_last_name,
                status: membership.status,
                created_at: checkInData.created_at
            }
        }
    } catch (err: any) {
        console.error('JWT VERIFICATION FAILED: ', err)
        return {
            error: 'Invalid or expired pass.',
            success: false
        }
    }
}