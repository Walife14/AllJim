import { createClient } from "@/lib/supabase/server"

// components
import MembersFilter from "@/app/components/management/MembersFilter"
import ListUsers from "../../components/ListUsers"

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

    // check whether the status they have in the url is a valid status
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
            profiles!inner (
                id,
                first_name,
                last_name,
                email,
                phone
            )
        `)
        .eq('gym_id', gym.id)


    if (search) {
        query = query.or(`first_name.ilike.%${search}%, last_name.ilike.%${search}%`, {
            referencedTable: 'profiles'
        })
    }

    if (validatedStatus) {
        query = query.eq('status', status)
    }

    const { data: members, error } = await query

    if (error) {
        console.error("database error: ", error)
        return <div>Something went wrong!</div>
    }

    return (
        <div className="flex flex-col gap-y-2">
            <div className="bg-zinc-200 rounded-lg p-4">
                <div>
                    <h1>Members</h1>
                    <p>This page shows a list of all the members currently attending your gym and their details.</p>
                </div>
                <div>
                    <MembersFilter />
                </div>
            </div>
            <ListUsers users={members} gymSlug={slug} />
        </div>
    )
}