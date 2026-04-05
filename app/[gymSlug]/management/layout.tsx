import { redirect } from "next/navigation";

// components
import ManagementNavbar from "@/app/components/management/ManagementNavbar";
import { createClient } from "@/lib/supabase/server";

type Props = {
    children: React.ReactNode;
    params: Promise<{ gymSlug: string }>
}
export default async function ManagementLayout({ children, params }: Props) {
    const { gymSlug: slug } = await params

    const supabase = await createClient()

    // identity
    const { data: { user } } = await supabase.auth.getUser()

    // if there is no user maybe they're the owner and send to login of management
    if (!user) {
        redirect(`/${slug}/login`)
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

    // handle redirection based on role/ownership
    if (error || !membership) {
        return redirect(`/${slug}/member/join`)
    }

    if (membership.role === 'member') {
        return redirect(`/${slug}/member/portal`)
    }

    return (
        <div className="flex h-screen overflow-hidden gap-x-1">
            <ManagementNavbar />
            <main>
                {children}
            </main>
        </div>
    )
}