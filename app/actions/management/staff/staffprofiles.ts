'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { boolean } from "zod"

export type staffProfileResponse = {
    error?: string | null
    success?: boolean
}

export async function createStaffProfileAction(state: staffProfileResponse, formData: FormData): Promise<staffProfileResponse> {
    try {
        const supabase = await createClient()
        const staffAccountId = formData.get('staffAccountId') // id of staff account to associate new staff profile with
        const gymId = formData.get('gymId')
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const staffPin = formData.get('staffPin') as string

        // check whether the formdata we got is right if not send error
        if (!firstName || !lastName) throw new Error('Please ensure you fill out a correct first AND last name.')
        if (!staffPin || staffPin.length !== 4 || !/^\d{4}$/.test(staffPin)) throw new Error('Ensure that staff pin is 4 NUMBERS.')

        // staff profile object
        const staffProfileToInsert = {
            user_id: staffAccountId, gym_id: gymId, first_name: firstName, last_name: lastName, pin: staffPin
        }

        // add a new staff profile associating staff account
        const { error: staffProfileCreationError } = await supabase
            .from('staff_profiles')
            .insert(staffProfileToInsert)

        if (staffProfileCreationError) throw new Error(staffProfileCreationError.message)

        revalidatePath('/management', 'layout')

        return {
            error: null,
            success: true
        }
    } catch (err: any) {
        return {
            error: err.message || 'Failed to create a new staff profile.',
            success: false
        }
    }
}