import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

// components
import ProfileHeader from "./_components/ProfileHeader"
import MembershipStatus from "./_components/MembershipStatus"
import Contact from "./_components/Contact"
import StaffNotes from "./_components/StaffNotes"
import AccessHistory from "./_components/AccessHistory"
import BillingHistory from "./_components/BillingHistory"
import { ChevronLeft } from "lucide-react"

type Props = {
    params: Promise<{
        gymSlug: string
        id: string
    }>
}

interface MembershipWithContact {
    id: string
    legal_first_name: string
    legal_last_name: string
    dob: string
    role: string
    status: string
    joined_at: string
    expires_at: string
    profiles: {
        email: string
        phone: string
    }
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
        .select(`id, legal_first_name, legal_last_name, dob, role, status, joined_at, expires_at,
            profiles!inner ( email, phone )
        `)
        .match({ user_id: userId, gym_id: gym.id })
        .single()
        .overrideTypes<MembershipWithContact>()

    if (!membership) {
        return (
            <p>Could not find the membership.</p>
        )
    }

    // grab the check_ins associated with the member we are viewing for tap in history
    const { data: checkInHistory, error: checkInHistoryError } = await supabase
        .from('check_ins')
        .select('created_at')
        .match({ membership_id: membership.id, gym_id: gym.id })

    if (checkInHistoryError) {
        return (
            <p className="text-red-500">Could not fetch check in history.</p>
        )
    }

    return (
        <div>
            <Link href={`/${gymSlug}/management/members`} title="Back"><ChevronLeft /></Link>
            <div className="flex-1 grid grid-cols-2 gap-2">
                {/* member Identification  */}
                <ProfileHeader first_name={membership.legal_first_name} last_name={membership.legal_last_name} dob={membership.dob} user_id={userId} joined_at={membership.joined_at} membershipId={membership.id} role={membership.role} />

                {/* membership status */}
                <MembershipStatus membershipId={membership.id} status={membership.status} expires_at={membership.expires_at} />

                {/* contact information */}
                <Contact email={membership.profiles.email} phone={membership.profiles.phone} />

                {/* staff notes */}
                <StaffNotes membershipId={membership.id} />

                {/* access history: their list of tap-ins into the gym; average weekly visits */}
                <AccessHistory checkInHistory={checkInHistory} />

                {/* billing history: transation list: date of payment, amount paid, time added if gym membership, staff who processed */}
                <BillingHistory />
            </div>
        </div>
    )
}