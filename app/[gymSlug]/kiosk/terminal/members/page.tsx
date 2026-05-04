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
            user_id, role, status, expires_at, joined_at,
            profiles!inner (first_name, last_name, email, phone)
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

            <ul>
                {membersData.map((member: any, index) => (
                    <li key={index}>
                        {member.profiles.first_name},
                        {member.profiles.last_name},
                        {member.profiles.email},
                        {member.profiles.phone},
                        {member.role},
                        {member.status},
                        {member.expires_at},
                        {member.joined_at}
                    </li>
                ))}
            </ul>
        </>
    )
}