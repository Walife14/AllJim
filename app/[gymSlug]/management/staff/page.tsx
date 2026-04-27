import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

type Props = {
    params: Promise<{
        gymSlug: string
    }>
}

type MembershipWithProfile = {
    id: string
    user_id: string
    profiles: {
        email: string
    }
}

export default async function StaffPage({ params }: Props) {
    const supabase = await createClient()
    const { gymSlug: slug } = await params

    // grab current gym
    const { data: gym, error: gymError } = await supabase
        .from('gyms')
        .select('id')
        .eq('slug', slug)
        .single()

    if (!gym || gymError) {
        return (
            <p>Failed to grab a gym.</p>
        )
    }

    // grab all members that have the role of staff in the memberships and are part of current gym
    const { data: memberships, error: membershipsError } = await supabase
        .from('memberships')
        .select(`id, user_id, profiles!inner (email)
            `)
        .match({ gym_id: gym.id, role: 'staff' })
        .overrideTypes<MembershipWithProfile[]>()

    if (membershipsError) {
        return (
            <p>Had a problem grabbing the memberships with role of staff.</p>
        )
    }
    return (
        <div>
            <h1>Staff Accounts</h1>

            <section className="flex">
                {memberships.length === 0 && (
                    <p>You do not have any accounts listed as staff yet! go to members to change the correct account to role of staff.</p>
                )}
                {memberships.length > 0 && memberships.map((membership: MembershipWithProfile) => (
                    <div key={membership.id} className="flex flex-col p-2 bg-neutral-200">
                        <p>Email: <span>{membership.profiles.email}</span></p>
                        <Link href={`/${slug}/management/staff/${membership.id}`}>Go to profile</Link>
                    </div>
                ))}
            </section>
        </div>
    )
}