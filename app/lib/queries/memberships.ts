import { createClient } from "@/lib/supabase/server";

export async function checkGymMembership(userId: string, gymSlug: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('memberships')
        .select(`
            role,
            status,
            gyms!inner(slug)
            `)
        .eq('user_id', userId)
        .eq('gyms.slug', gymSlug)
        .single()
        
    if (error || !data) return null

    return data
}