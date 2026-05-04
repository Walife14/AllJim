import { createClient } from "@/lib/supabase/server"

// utils
import { formatDate } from "@/app/utils/formatDate/formatDate"

type Props = {
    params: Promise<{
        gymSlug: string
    }>
}

export default async function CheckInHistoryPage({ params }: Props) {
    const { gymSlug } = await params
    const supabase = await createClient()

    // grab the gym id
    const { data: gymData, error: gymError } = await supabase
        .from('gyms').select('id').eq('slug', gymSlug).single()

    if (gymError) return (<p>{gymError.message}</p>)

    // grab the checkins
    const { data: checkInData, error: checkInError } = await supabase
        .from('check_ins')
        .select(`id, membership_id, gym_id, created_at,
            memberships!inner (
                profiles!inner ( first_name, last_name, email, phone )
            )
        `)
        .eq('gym_id', gymData.id)

    if (checkInError) return (<p>{checkInError.message}</p>)

    return (
        <>
            <h1>Check-in History</h1>

            <ul>
                {checkInData.map((checkIn: any, index: number) => (
                    <li key={index}>
                        {checkIn.memberships.profiles.first_name}
                        {checkIn.memberships.profiles.last_name},
                        checked in at {formatDate(checkIn.created_at)}.
                    </li>
                ))}
            </ul>
        </>
    )
}