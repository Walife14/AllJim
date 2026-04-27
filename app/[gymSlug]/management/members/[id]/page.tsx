import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

// components
import ProfileHeader from "./_components/ProfileHeader"
import MembershipStatus from "./_components/MembershipStatus"
import Contact from "./_components/Contact"
import StaffNotes from "./_components/StaffNotes"
import AccessHistory from "./_components/AccessHistory"
import BillingHistory from "./_components/BillingHistory"

type Props = {
    params: Promise<{
        gymSlug: string
        id: string
    }>
}

export default async function MemberPage({ params }: Props) {
    const { id: userId, gymSlug } = await params
    const supabase = await createClient()

    // TODO: grab the gym
    const { data: gym } = await supabase.from('gyms').select('id').eq('slug', gymSlug).single()

    if (!gym) {
        return (
            <p>Could not grab gym</p>
        )
    }

    // TODO: grab the user membership using id and gymslug
    const { data: membership } = await supabase
        .from('memberships')
        .select('id, role, status, joined_at, expires_at')
        .match({ user_id: userId, gym_id: gym.id })
        .single()

    if (!membership) {
        return (
            <p>Could not find the membership.</p>
        )
    }

    // TODO: grab the user profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, phone')
        .eq('id', userId)
        .single()

    if (!profile) {
        return (
            <p>Could not grab their profile.</p>
        )
    }

    return (
        <div>
            <Link className="text-sm" href={`/${gymSlug}/management/members`}>Back</Link>
            <div className="flex-1 grid grid-cols-2 gap-2">
                {/* member Identification  */}
                <ProfileHeader first_name={profile.first_name} last_name={profile.last_name} user_id={profile.id} joined_at={membership.joined_at} />

                {/* membership status */}
                <MembershipStatus membershipId={membership.id} status={membership.status} expires_at={membership.expires_at} />

                {/* contact information */}
                <Contact email={profile.email} phone={profile.phone} />

                {/* staff notes */}
                <StaffNotes membershipId={membership.id} />

                {/* access history: their list of tap-ins into the gym; average weekly visits */}
                <AccessHistory />

                {/* billing history: transation list: date of payment, amount paid, time added if gym membership, staff who processed */}
                <BillingHistory /> 
            </div>
        </div>
    )
}