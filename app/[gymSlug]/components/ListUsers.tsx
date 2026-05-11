import Link from "next/link"

// components
import { ExternalLink } from "lucide-react"

// utils
import { formatDate } from "@/app/utils/formatDate/formatDate"

interface UserData {
    user_id: string
    role: string
    status: string
    legal_first_name: string
    legal_last_name: string
    dob: string
    expires_at: string
    profiles: {
        email: string
        phone: string
    }[]
}

type Props = {
    users: UserData[]
    gymSlug: string
    origin?: 'kiosk' | 'management'
}

export default function ListUsers({ users, gymSlug, origin }: Props) {

    const link = origin && (origin === 'kiosk') ? `/${gymSlug}/kiosk/terminal/members/` : `/${gymSlug}/management/members/`

    return (
        <div className="bg-zinc-200 p-4 rounded-lg">
            {users ? (
                <>
                    <div className="flex items-center px-4 py-2 font-semibold border-b gap-x-1">
                        <span className="flex-1">First Name</span>
                        <span className="flex-1">Last Name</span>
                        <span className="flex-1">Email address</span>
                        <span className="flex-1">Phone number</span>
                        <span className="flex-1">Role</span>
                        <span className="flex-1">Status</span>
                        <span className="flex-1">Membership</span>
                        <span className="w-12">Link</span>
                    </div>
                    <ul className="flex flex-col gap-y-2">
                        {users.map((user: any) => (
                            <li key={user.user_id} className="flex items-center even:bg-zinc-50 px-4 py-2 rounded-lg overflow-hidden gap-x-1">
                                <span className="flex-1 capitalize">{user.legal_first_name}</span>
                                <span className="flex-1 capitalize">{user.legal_last_name}</span>
                                <span className="flex-1">{user.profiles.email}</span>
                                <span className="flex-1">{user.profiles.phone}</span>
                                <span className="flex-1 capitalize">{user.role}</span>
                                <span className="flex-1 capitalize">{user.status}</span>
                                <span className="flex-1">{formatDate(user.expires_at) === 'N/A' ? 'No Membership' : formatDate(user.expires_at)}</span>
                                <span className="w-12"><Link href={`${link}${user.user_id}`}><ExternalLink /></Link></span>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div>
                    <p className="text-center py-2">No data.</p>
                </div >
            )}
        </div >
    )
}