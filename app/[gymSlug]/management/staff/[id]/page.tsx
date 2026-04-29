import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

// components
import ListOfStaffProfiles from "./_components/ListOfStaffProfiles"
import CreateStaffProfile from "./_components/CreateStaffProfile"

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
        <div>
            <Link href={`/${gymSlug}/management/staff`}>Back</Link>
            <h1>{id}</h1>

            <section>
                <h2>Information</h2>
                {/* display basic information about the staff account */}
            </section>

            <section>
                <h2>Create new profile</h2>
                <CreateStaffProfile id={staffAccount.user_id} gymId={gym.id} />
            </section>

            <section>
                <h2>List of Staff Profiles</h2>
                <ListOfStaffProfiles id={id} />
            </section>
        </div>
    )
}