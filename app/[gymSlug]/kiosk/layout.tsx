import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

type Props = {
    children: React.ReactNode
    params: Promise<{
        gymSlug: string
    }>
}

export default async function layout({ children, params }: Props) {
    const { gymSlug } = await params
    const supabase = await createClient()

    // grab user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect(`/${gymSlug}/login`)
    }

    // grab the gym id
    const { data: gym, error: gymError } = await supabase
        .from('gyms')
        .select('id')
        .eq('slug', gymSlug)
        .single()
    if (!gym || gymError) {
        redirect('/')
    }

    // check for user+gym combination in memberships
    const { data: membership, error: membershipError } = await supabase
        .from('memberships')
        .select('role')
        .match({user_id: user.id, gym_id: gym.id})
        .single()
    
    // if the user does not have role of staff or owner reroute them back or if failed to get membership
    if (membershipError || (membership.role !== 'owner' && membership.role !== 'staff')) {
        console.log("this ran")
        redirect(`/${gymSlug}`)
    }

    return (
        <>
            {children}
        </>
    )
}