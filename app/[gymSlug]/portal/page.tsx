import { createClient } from "@/lib/supabase/server"
import PassDisplay from "./_components/PassDisplay"
import Link from "next/link"
import Image from "next/image"

// components
import SignOutButton from "@/app/components/auth/signOutButton"

type Props = {
    params: Promise<{
        gymSlug: string
    }>
}

const exploreLinks = [
    { src: "/assets/portal/boxing-lesson.png", alt: "A boxing lesson", label: "Classes", href: "classes" },
    { src: "/assets/portal/trainer-helping-member.png", alt: "Trainer helping member", label: "Find a Trainer", href: "find-a-trainer" },
    { src: "/assets/portal/member-looking-at-phone.png", alt: "Gym member looking at phone", label: "My Membership", href: "membership" },
    { src: "/assets/portal/member-looking-at-gym-schedule.png", alt: "Member looking at gym schedule", label: "News", href: "news" },
    { src: "/assets/portal/gym-receptionist-and-member.png", alt: "Gym receptionist talking to member", label: "Help", href: "help" },

]

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
        <div className="flex flex-col gap-y-2 my-4">
            <h1 className="text-center">Your Portal</h1>
            <div className="my-2 flex justify-center">
                <SignOutButton mode="dark" />
            </div>

            <section className="flex flex-col items-center justify-center">
                <h2>QR CODE</h2>
                <PassDisplay />
            </section>

            <section className="bg-zinc-200 p-4 rounded-lg">
                <h2>Your Stats</h2>
                <p>Number of times you&apos;ve attended the gym.</p>
                <div className="grid grid-cols-3 gap-x-2 text-center">
                    <div className="flex flex-col items-center">
                        <p>Last 7 days</p>
                        <span className="font-mono text-2xl font-bold">4</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>Last 30 days</p>
                        <span className="font-mono text-2xl font-bold">17</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>This year</p>
                        <span className="font-mono text-2xl font-bold">52</span>
                    </div>
                </div>
            </section>

            <section>
                <h2>Explore</h2>
                {/* links: classes, news, help, find a trainer, my membership */}
                <ul className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-x-4 pb-6 w-full">
                    {exploreLinks.map((link) => (
                        <li
                            key={link.label}
                            className="relative w-[70%] sm:w-2/5 lg:w-1/4 flex-none snap-start"
                        >
                            <Link
                                href={`/${slug}/portal/${link.href}`}
                                className="group relative flex items-center justify-center aspect-square rounded-xl overflow-hidden shadow-md active:scale-95 transition-transform duration-200"
                            >
                                {/* Background Image with Hover Effect */}
                                <Image
                                    src={link.src}
                                    alt={link.alt}
                                    fill
                                    sizes="(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 25vw"
                                    className="object-cover grayscale-25 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                />

                                {/* overlay to dim image */}
                                <div className="absolute inset-0 bg-linear-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />

                                {/* label */}
                                <span className="absolute bottom-4 left-4 right-4 bg-zinc-900/60 backdrop-blur-md text-zinc-50 text-xs sm:text-sm font-bold uppercase tracking-wider py-2 px-3 rounded-md text-center border border-white/10">
                                    {link.label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}