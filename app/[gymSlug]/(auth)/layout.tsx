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
        <div className="flex flex-col min-h-dvh">
            <header className="my-12 flex justify-center">
                {/* gym logo? */}

                {/* gym name */}
                <span className="bg-zinc-900 text-zinc-50 text-2xl font-semibold p-4">{gym.name}</span>

                {/* gym slogan? */}

            </header>
            <main className="px-2">
                {children}
            </main>
            <footer className="mt-auto mx-auto p-2">Powered by AllJim</footer>
        </div>
    )
}