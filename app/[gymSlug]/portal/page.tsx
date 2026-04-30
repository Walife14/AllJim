import { createClient } from "@/lib/supabase/server"
import PassDisplay from "./_components/PassDisplay"
import Link from "next/link"

// components
import SignOutButton from "@/app/components/auth/signOutButton"

type Props = {
    params: Promise<{
        gymSlug: string
    }>
}

export default async function PortalPage({ params }: Props) {
    const supabase = await createClient()
    const { gymSlug: slug } = await params

    const { data: gym, error: gymError } = await supabase
        .from('gyms')
        .select('name')
        .eq('slug', slug)
        .single()

    if (gymError || !gym) {
        return (
            <>
                <h1>Failed to grab the gym.</h1>
                <p>{gymError?.message || 'No gym found'}</p>
            </>
        )
    }

    return (
        <div>
            <h1>{gym.name}</h1>

            {/* navigation and more */}
            <nav>
                <ul className="flex gap-2">
                    <li><Link href="#">Home</Link></li>
                    <li><Link href="#">Classes</Link></li>
                    <li><Link href="#">Help</Link></li>
                    <li><SignOutButton /></li>
                </ul>
            </nav>

            <div className="flex justify-center">
                <PassDisplay />
            </div>

            <section>
                <h2>Your Stats</h2>
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <p>Visits this week</p>
                        <span className="font-mono">4</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>Visits this Month</p>
                        <span className="font-mono">17</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>Visits this year</p>
                        <span className="font-mono">52</span>
                    </div>
                </div>
            </section>

            <section>
                <h2>News</h2>
                <p>Are you interested in joining pilates class?</p>
                <p>Would you be interested in a new bench press machine?
                    We have now added a poll to see what machine our visitors want!</p>
            </section>

            <section>
                <h2>Classes</h2>
                <p>No classes yet added for this gym.</p>
            </section>

            <section>
                <h2>Need help?</h2>
                <p>For now you would have to contact the front desk.</p>
            </section>
        </div>
    )
}