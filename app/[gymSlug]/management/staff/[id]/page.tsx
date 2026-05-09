import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

// components
import ListOfStaffProfiles from "./_components/ListOfStaffProfiles"
import CreateStaffProfile from "./_components/CreateStaffProfile"
import { ChevronLeft, UserRoundPlus } from "lucide-react"

type Props = {
    params: Promise<{
        id: string
        gymSlug: string
    }>
}

export default async function StaffAccountPage({ params }: Props) {
    const supabase = await createClient()
    const { id, gymSlug } = await params // staff account id



    // grab current gym
    const { data: gym, error: gymError } = await supabase
        .from('gyms')
        .select('id')
        .eq('slug', gymSlug)
        .single()

    if (!gym || gymError) {
        return (
            <p>Failed to grab a gym.</p>
        )
    }

    // grab the staff account id
    const { data: staffAccount, error: staffAccountError } = await supabase
        .from('memberships')
        .select('user_id')
        .eq('id', id)
        .single()

    if (!staffAccount || staffAccountError) {
        return (
            <p>Failed to grab the staff account.</p>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <section className="flex flex-col items-start bg-zinc-200 p-4 rounded-lg">
                <Link href={`/${gymSlug}/management/staff`} title="Back">
                    <ChevronLeft />
                </Link>
                <h1>Staff Access Control</h1>

                <h2>Actions</h2>
                {/* Add new staff profile */}
                <CreateStaffProfile id={staffAccount.user_id} gymId={gym.id} />
            </section>

            <section className="bg-zinc-200 rounded-lg p-4">
                <h2>List of Staff Profiles</h2>
                <ListOfStaffProfiles staffAccountId={staffAccount.user_id} gymId={gym.id} />
            </section>
        </div >
    )
}