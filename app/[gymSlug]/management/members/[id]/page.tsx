import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

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
        .select('role, status')
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
        .select('first_name, last_name')
        .eq('id', userId)
        .single()

    if (!profile) {
        return (
            <p>Could not grab their profile.</p>
        )
    }

    return (
        <div>
            <h1>Member View</h1>
            <Link className="text-sm" href={`/${gymSlug}/management/members`}>Back</Link>
            <p>Viewing details of <span className="font-semibold">{profile.first_name} {profile.last_name}</span></p>

            <p>Role: <span className="font-semibold">{membership.role}</span></p>
            <p>Membership status: <span className="font-semibold">{membership.status}</span></p>
        </div>
    )
}