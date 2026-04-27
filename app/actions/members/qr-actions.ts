'use server'

import { createClient } from "@/lib/supabase/server"
import { SignJWT } from "jose"

export async function generateSecureQRToken() {
    const supabase = await createClient()
    const secret = new TextEncoder().encode(process.env.QR_SECRET_KEY)

    // grab the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (!user || authError) throw new Error('Unauthorized')

    // check if user has a membership that is active anywhere
    const { data: membership, error: membershipError } = await supabase
        .from('memberships')
        .select('status')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single()
    
    if (membershipError) {
        throw new Error('no active membership found for signed in user. Please renew your memberships to get a pass.')
    }

    const token = await new SignJWT({
        version: '1.0'
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setSubject(user.id)
    .setExpirationTime('1m') // expires in 1 minute
    .sign(secret)

    return token
}