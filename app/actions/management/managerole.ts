'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type RoleUpdateResponse = {
    error?: string | null
    success?: boolean
}

export async function manageRoleAction(state: RoleUpdateResponse, formData: FormData): Promise<RoleUpdateResponse> {
    const supabase = await createClient()
    const newRole = formData.get('newRole')
    const membershipId = formData.get('membershipId')

    const { error: updateRoleError } = await supabase
        .from('memberships')
        .update({role: newRole})
        .eq('id', membershipId)
    
    if (updateRoleError) {
        return {
            error: updateRoleError.message,
            success: false
        }
    }

    // refresh the management to reflect change to gym owner
    revalidatePath('/management', 'layout')
    
    return {
        error: null,
        success: true
    }
}