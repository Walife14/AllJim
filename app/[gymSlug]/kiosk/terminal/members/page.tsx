import ListUsers from "@/app/[gymSlug]/components/ListUsers"
import { createClient } from "@/lib/supabase/server"

type Props = {
    params: Promise<{
        gymSlug: string
    }>
}

export default async function MembersPage({ params }: Props) {
    const { gymSlug } = await params
    const supabase = await createClient()

    // grab the gym id
    const { data: gymData, error: gymError } = await supabase
        .from('gyms')
        .select('id')
        .eq('slug', gymSlug)
        .single()

    if (!gymData || gymError) {
        return (
            <p>No gym slug or gym found?</p>
        )
    }

    const { data: membersData, error: membersError } = await supabase
        .from('memberships')
        .select(`
            user_id, role, status, expires_at, joined_at, legal_first_name, legal_last_name, dob,
            profiles!inner (email, phone)
        `)
        .match({ gym_id: gymData.id, role: 'member' })

    if (membersError) {
        return (
            <p>{membersError.message}</p>
        )
    }

    return (
        <>
            <h1>Members List</h1>

            <ListUsers users={membersData} gymSlug={gymSlug} origin="kiosk" />
        </>
    )
}