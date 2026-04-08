import { createClient } from "@/lib/supabase/server"
import { routeModule } from "next/dist/build/templates/pages"
import { redirect } from "next/navigation"

type Props = {
    params: Promise<{ gymSlug: string }>
}

export default async function GymRootPage({ params }: Props) {
    const { gymSlug } = await params

    const supabase = await createClient()

    // identity
    const { data: { user } } = await supabase.auth.getUser()

    // if no user send to the login portal
    if (!user) {
        return redirect(`/${gymSlug}/login`)
    }

    // we have a user check if they have a gym membership
    const { data: membership, error } = await supabase
        .from('memberships')
        .select(`
            role,
            gyms!inner (
                slug
            )
        `)
        .eq('user_id', user.id)
        .eq('gyms.slug', gymSlug)
        .maybeSingle()
    
    // if they aren't a member of this gym, redirect to join the gym
    if (error || !membership) {
        return redirect(`/${gymSlug}/join`)
    }

    // they are a member of this gym -> check role and route
    const role = membership.role

    if (role === 'owner') { // in the future add role for staff members?
        return redirect(`/${gymSlug}/management`)
    }

    // default for regular members

    return redirect(`/${gymSlug}/member/portal`)

}