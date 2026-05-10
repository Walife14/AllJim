import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import Keypad from "./components/Keypad"
import SignOutButton from "@/app/components/auth/signOutButton"

type Props = {
    params: Promise<{
        gymSlug: string
    }>
}

export default async function KioskPage({ params }: Props) {
    const { gymSlug } = await params
    const cookieStore = await cookies()

    // check if we have a cookie set
    const activeStaffId = cookieStore.get('active_staff_id')

    if (activeStaffId) {
        redirect(`/${gymSlug}/kiosk/terminal`)
    }


    return (
        <div className="h-screen w-screen absolute flex justify-center items-center">
            <div className="w-full mx-2 md:mx-0 md:min-w-lg md:w-auto p-4 rounded-lg bg-zinc-200">
                <h1 className="text-center">Terminal Login</h1>
                <Keypad gymSlug={gymSlug} />
                <ul className="mt-2">
                    <li className="text-center underline text-neutral-500 cursor-pointer">
                        <SignOutButton mode="dark" />
                    </li>
                </ul>
            </div>
        </div>
    )
}