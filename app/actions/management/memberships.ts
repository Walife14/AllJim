'use server'

import { addDays, addMonths, addWeeks, addYears, isPast } from 'date-fns'

// NOTES:
// in a real world it would be best to just insert a membership_history in the backend
// and then have a function run on a membership_history entry happen causing the users membership
// at that specific gym to update on status and expires_at fields. But for this case and for now
// the use of actions will be used for simplicity of implementation.
// AKA The gym members status and expired_at will be altered here

import { createClient } from "@/lib/supabase/server"

// types
import { MembershipReceipt, MembershipUnit } from '@/types/membership'
import { revalidatePath } from 'next/cache'

export type MembershipUpdateResponse = {
    error?: string | null
    success?: boolean
}

export async function addMembershipTime(state: MembershipUpdateResponse, formData: FormData): Promise<MembershipUpdateResponse> {
    try {
        const supabase = await createClient()
        const membershipId = formData.get('membershipId')
        const unit = formData.get('unit') as MembershipUnit
        const amountStr = formData.get('amount')
        const amount = Number(amountStr)

        if (!amountStr || isNaN(amount) || amount <= 0) {
            return { error: "Please provide a valid amount." }
        }

        // grab the current auth
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (!user || authError) throw new Error(authError?.message || 'Unauthorized')

        // grab the current user for their first_name and last_name
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single()

        if (!profile || profileError) throw new Error('Staff profile not found.')

        // grab the current membership by its id for the user
        const { data: membership, error: membershipError } = await supabase
            .from('memberships')
            .select()
            .eq('id', membershipId)
            .single()

        if (membershipError) throw new Error(membershipError?.message || "Membership not found.")

        // calculate the new expiry
        const newExpiry = await calculateExpiry(membership.expires_at, unit, amount)

        // create the receipt

        // create receipt object
        const receipt: MembershipReceipt = {
            gym_id: membership.gym_id,
            membership_id: membership.id,
            amount_added: amount,
            unit,
            transaction_type: 'management',
            payment_method: 'none',
            // notes: notes to be added
            metadata: {
                staff_name: `${profile.first_name} ${profile.last_name}`,
                entry_point: 'management_portal',
                old_expiry: membership.expires_at,
                new_expiry: newExpiry.toISOString()
            }
        }

        const { error: createReceiptError } = await supabase
            .from('membership_history')
            .insert(receipt)

        if (createReceiptError) throw new Error(createReceiptError.message)

        // NOTE: for future check status of membership to check if user is banned, or something else
        // if banned or so then return an error notifying them that the user is a banned user
        // for code below this assume user is not banned or kicked out as status


        // membership_history receipt should be inserted now update membership record
        const { error: updateMembershipError } = await supabase
            .from('memberships')
            .update({ status: 'active', expires_at: newExpiry })
            .eq('id', membershipId)

        if (updateMembershipError) throw new Error(updateMembershipError.message)

        // UI refresh
        revalidatePath('/management', 'layout')

        return { error: null, success: true }
    } catch (err: any) {
        console.error("Critical membership error: ", err.message)
        return {
            error: err.message || "An unexpected error occurred while updating membership",
            success: false
        }
    }
}

async function calculateExpiry(oldExpiry: Date | null, unit: MembershipUnit, amount: number) {

    // set the expiresAt based on previous held value
    const expiresAt = oldExpiry ? new Date(oldExpiry) : null

    let membershipDateToBe: Date

    // check if expires is null or in the past
    if (expiresAt === null || isPast(expiresAt)) {
        // if expires is in the past user does not have current membership ->
        // use current date and add new unit and amount to membership
        membershipDateToBe = new Date()
    } else {
        // expires is in the future, grab the future date and append the unit and amount to the membership
        membershipDateToBe = expiresAt
    }

    // UNIT: days
    if (unit === 'days') {
        // add amount of days to a new membership
        membershipDateToBe = addDays(membershipDateToBe, amount)
    }
    // UNIT: weeks
    if (unit === 'weeks') {
        // add amount of eweks to a new membership
        membershipDateToBe = addWeeks(membershipDateToBe, amount)
    }
    // UNIT: months
    if (unit === 'months') {
        // add amount of months to a new membership
        membershipDateToBe = addMonths(membershipDateToBe, amount)
    }
    // UNIT: years
    if (unit === 'years') {
        // add amount of years to a new membership
        membershipDateToBe = addYears(membershipDateToBe, amount)
    }

    return membershipDateToBe
}