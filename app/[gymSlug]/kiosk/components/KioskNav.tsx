import { cookies } from "next/headers"
import Link from "next/link"

// components
import LogoutProfileButton from "@/app/components/kiosk/LogoutProfileButton"

type Props = {
    gymSlug: string
}

export default async function KioskNav({ gymSlug }: Props) {
    const cookieStore = await cookies()

    const logout = () => {
        cookieStore.delete('active_staff_id')
    }

    return (
        <nav className="bg-neutral-200 rounded-lg p-2">
            <ul className="flex flex-col gap-2">
                <li>
                    <Link href={`/${gymSlug}/kiosk/terminal`}>Home</Link>
                </li>
                <li>
                    <Link href={`/${gymSlug}/kiosk/terminal/members`}>Members</Link>
                </li>
                <li>
                    <Link href={`/${gymSlug}/kiosk/terminal/transactions`}>Transactions</Link>
                </li>
                <li>
                    <Link href={`/${gymSlug}/kiosk/terminal/check-in-history`}>Check-in History</Link>
                </li>
                <li>
                    <LogoutProfileButton />
                </li>
            </ul>
        </nav>
    )
}