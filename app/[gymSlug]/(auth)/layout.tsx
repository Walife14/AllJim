import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

type Props = {
    children: React.ReactNode
    params: Promise<{
        gymSlug: string
    }>
}

export default async function layout({ children, params }: Props) {
    const supabase = await createClient()
    const { gymSlug: slug } = await params

    const { data: gym, error } = await supabase
        .from('gyms')
        .select('name') // data we want from the gym
        .eq('slug', slug)
        .single()
    
    if (error) {
        // most likely the gym does not exist.
        console.error('Could not fetch the gym.', slug)
        return redirect('/')
    }

    return (
        <div>
            <header>
                {/* gym logo? */}

                {/* gym name */}
                <h1>{gym.name}</h1>

                {/* gym slogan? */}

            </header>
            <main>
                {children}
            </main>
            <footer>Powered by AllJim</footer>
        </div>
    )
}