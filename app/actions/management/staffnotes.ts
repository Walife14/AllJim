'use server'

import { createClient } from "@/lib/supabase/server"

// types
import { EntryPoint } from "@/types/membership"
import { revalidatePath } from "next/cache"

export type StaffNoteCreationResponse = {
    error?: string | null
    success?: boolean
}

type NoteCategory = 'general' | 'billing' | 'conduct' | 'safety' | 'medical'

interface Note {
    gym_id: string
    membership_id: string
    performed_by?: string
    category: NoteCategory
    content: string
    metadata: {
        staff_name: string
        entry_point: EntryPoint
        [key: string]: any
    }
}

export async function addStaffNoteAction(state: StaffNoteCreationResponse, formData: FormData): Promise<StaffNoteCreationResponse> {
    try {
        const supabase = await createClient()

        const content = formData.get('content') as string
        const category = formData.get('category') as NoteCategory
        const membershipId = formData.get('membershipId')

        if (!content || !category) throw new Error('Must have some content or a category selected.')

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (!user || authError) throw new Error(authError?.message || 'Unauthorized')

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single()

        if (!profile || profileError) throw new Error(profileError?.message || 'Could not find a profile for current user.')

        const { data: membership, error: membershipError } = await supabase
            .from('memberships')
            .select()
            .eq('id', membershipId)
            .single()

        if (membershipError) throw new Error(membershipError.message)

        // create note to be inserted to db
        const note: Note = {
            gym_id: membership.gym_id,
            membership_id: membership.id,
            category,
            content,
            metadata: {
                staff_name: `${profile.first_name} ${profile.last_name}`,
                entry_point: 'management_portal'
            }
        }

        // insert note to db
        const { error: insertNoteError } = await supabase
            .from('membership_notes')
            .insert(note)

        if (insertNoteError) throw new Error(insertNoteError.message)

        // successfully added note lets revalidate path
        revalidatePath('/management', 'layout')

        return {
            error: null,
            success: true
        }

    } catch (err: any) {
        return {
            error: err.message || 'Failed to create a new note.',
            success: false
        }
    }
}