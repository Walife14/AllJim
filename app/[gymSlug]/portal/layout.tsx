import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import PortalNavbar from "./_components/PortalNavbar"

type Props = {
    children: React.ReactNode
    params: Promise<{
        gymSlug: string
    }>
}

export default async function layout({ children, params }: Props) {
    const { gymSlug: slug } = await params
    const supabase = await createClient()

    // grab user
    const { data: { user } } = await supabase.auth.getUser()

    // no user redirect back to login
    if (!user) {
        redirect(`/${slug}/login`)
    }
    
    // grab the gym id
    const { data: gym } = await supabase
        .from('gyms').select('id, name').eq('slug', slug).single()
    
    // if no gym redirect away from this page
    if (!gym) {
        redirect('/')
    }

    // check whether they are part of the current gym route
    const { data: membership } = await supabase
        .from('memberships')
        .select()
        .match({ user_id: user.id, gym_id: gym.id })
        .single()

    // not part of gym return and redirect to join
    if (!membership) {
        redirect(`/${slug}/join`)
    }

    return (
        <>
            <header>
                <PortalNavbar gymSlug={slug} gymName={gym.name} />
            </header>
            <main className="mx-2">
                {children}
            </main>
        </>
    )
}