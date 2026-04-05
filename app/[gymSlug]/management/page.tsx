import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

type Props = {
    params: Promise<{
        gymSlug: string
    }>
}

export default async function ManagementRootPage({ params }: Props) {
    const { gymSlug: slug } = await params

    const supabase = await createClient()

    // identity
    const { data: { user } } = await supabase.auth.getUser()

    // if there is no user maybe they're the owner and send to login of management
    if (!user) {
        redirect(`/${slug}/management/login`)
    }

    // we have a user check if they have a membership and what their role is
    const { data: membership, error } = await supabase
        .from('memberships')
        .select(`
            role,
            gyms!inner (
                slug
            )
        `)
        .eq('user_id', user.id)
        .eq('gyms.slug', slug)
        .maybeSingle()

    // if they arent a member of this gym redirect them out of here
    if (error || !membership) {
        return redirect(`/${slug}/member/join`)
    }

    // they are a member of this gym check role and route
    const role = membership.role

    if (role === 'owner') {
        return redirect(`/${slug}/management/dashboard`)
    }

    if (role === 'member') {
        return redirect(`/${slug}/member/portal`)
    }

}