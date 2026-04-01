
import { UserData } from "@/app/actions/auth/get-user"
import Link from "next/link"
import SignOutButton from "../auth/signOutButton"


type Props = {
    user: UserData | null
}

export default async function Navbar({ user }: Props) {
    return (
        <nav>
            <div className="w-full py-4 px-4 md:px-8 lg:px-16 xl:px-24 flex justify-between items-center">
                <Link href="/">AllJim</Link>

                <div className="flex gap-4">
                    {user && (
                        <>
                            <p>Hello, {user.first_name}!</p>
                            <Link href="#">My account</Link>
                            <SignOutButton />
                        </>
                    )}
                    {!user && (
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/signup">Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}