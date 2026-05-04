
import { UserData } from "@/app/actions/auth/get-user"
import Link from "next/link"
import SignOutButton from "../auth/signOutButton"
import Image from "next/image"


type Props = {
    user: UserData | null
}

export default async function Navbar({ user }: Props) {
    return (
        <header className="fixed z-50 w-5xl mt-4 left-1/2 -translate-x-1/2">
            <nav className="w-full p-2 md:px-8 flex justify-between items-center bg-zinc-900/70 backdrop-blur-lg text-zinc-50 rounded-lg shadow-sm">
                <Link href="/">
                    <Image
                        src="/assets/brand/logo.svg"
                        alt="AllJim Logo"
                        height={0}
                        width={0}
                        className="h-6 w-auto"
                        priority
                    />
                </Link>

                <div className="flex items-center gap-4 uppercase">
                    {user && (
                        <>
                            <SignOutButton mode="light" />
                        </>
                    )}
                    {!user && (
                        <>
                            <Link href="/login" className="hover:text-zinc-200 active:scale-95 transition-all duration-100">Sign In</Link>
                            <Link href="/signup" className="text-zinc-900 bg-zinc-50 py-2 px-4 rounded-lg hover:bg-zinc-200 active:scale-95 transition-all duration-100">Join Us</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}