import { createClient } from "@/lib/supabase/server"

// utils
import { formatDate } from "@/app/utils/formatDate/formatDate"
import Link from "next/link"
import { UserRound } from "lucide-react"

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
                user_id, legal_first_name, legal_last_name, dob,
                profiles!inner ( email, phone )
            )
        `)
        .eq('gym_id', gymData.id)

    if (checkInError) return (<p>{checkInError.message}</p>)

    return (
        <>
            <h1>Check-in History</h1>

            <section className="flex flex-col gap-2">
                <div className="bg-zinc-200 p-4 rounded-lg">
                    <h2>Filters</h2>

                    <div className="flex gap-2">
                        <button className="link-primary">All</button>
                        <button className="link-primary">Today</button>
                    </div>
                </div>

                <ul className="bg-zinc-200 p-4 rounded-lg">
                    {checkInData.map((checkIn: any, index: number) => (
                        <li key={index} className="px-4 py-2 even:bg-zinc-50 rounded-lg flex items-end gap-x-2">
                            <div className="flex-1">
                                <span className="font-semibold">
                                    {checkIn.memberships.legal_first_name} {checkIn.memberships.legal_last_name}
                                </span>
                                <p>
                                    Checked in at {formatDate(checkIn.created_at)}.
                                </p>
                            </div>
                            <Link className="link-primary" href={`/${gymSlug}/kiosk/terminal/members/${checkIn.memberships.profiles.id}`}>
                                <UserRound />
                                Open Profile
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}