import { createClient } from "@/lib/supabase/server"

type Props = {
    params: Promise<{
        gymSlug: string
    }>
    searchParams: Promise<{
        status?: string
        search?: string
    }>
}

interface MemberWithProfile {
    status: string
    role: string
    profiles: {
        first_name: string
        last_name: string
    }
}

const VALID_STATUSES = ['active', 'inactive']

export default async function MembersPage({ params, searchParams }: Props) {
    const { gymSlug: slug } = await params
    const { status, search } = await searchParams

    // add status filter and search params
    const validatedStatus = VALID_STATUSES.includes(status as string) ? status : undefined

    const supabase = await createClient()

    const { data: gym, error: gymError } = await supabase
        .from('gyms')
        .select('id')
        .eq('slug', slug)
        .single()

    if (gymError) {
        return <div>Failed to get gym</div>
    }

    let query = supabase
        .from('memberships')
        .select(`
            status,
            role,
            profiles (
                first_name,
                last_name
            )
        `)
        .eq('gym_id', gym.id)
    
    if (validatedStatus) {
        query = query.eq('status', status)
    }

    const { data: members, error } = await query 

    if (error) {
        console.error("database error: ", error)
        return <div>Something went wrong!</div>
    }

    return (
        <>
            <h1>Members</h1>
            <p>This page shows a list of all the members currently attending your gym and their details.</p>

            <div>
                {members?.length === 0 ? (
                    <p>No members found.</p>
                ) : (
                    members?.map((m: any, index: number) => (
                        <div key={index} className="flex gap-4">
                            <span>{m.profiles.first_name}</span>
                            <span>{m.profiles.last_name}</span>
                            <span>{m.role}</span>
                            <span>{m.status}</span>
                        </div>
                    )
                    )
                )}
            </div >
        </>
    )
}