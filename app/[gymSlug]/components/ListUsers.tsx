import Link from "next/link"

// components
import { ExternalLink } from "lucide-react"

interface UserData {
    role: string
    status: string
    profiles: {
        id: any
        first_name: any
        last_name: any
        email: any
        phone: any
    }[]
}

type Props = {
    users: UserData[]
    gymSlug: string
}

export default function ListUsers({ users, gymSlug }: Props) {
    return (
        <div className="bg-zinc-200 p-4 rounded-lg">
            {users ? (
                <>
                    <div className="flex items-center px-4 py-2 font-semibold border-b gap-x-1">
                        <span className="flex-1">ID</span>
                        <span className="flex-1">First Name</span>
                        <span className="flex-1">Last Name</span>
                        <span className="flex-1">Email address</span>
                        <span className="flex-1">Phone number</span>
                        <span className="flex-1">Role</span>
                        <span className="w-12">Link</span>
                    </div>
                    <ul className="flex flex-col gap-y-2">
                        {users.map((user: any) => (
                            <li key={user.profiles.id} className="flex items-center even:bg-zinc-50 px-4 py-2 rounded-lg overflow-hidden gap-x-1">
                                <span className="flex-1 overflow-hidden text-nowrap truncate">{user.profiles.id}</span>
                                <span className="flex-1 capitalize">{user.profiles.first_name}</span>
                                <span className="flex-1 capitalize">{user.profiles.last_name}</span>
                                <span className="flex-1">{user.profiles.email}</span>
                                <span className="flex-1">{user.profiles.phone}</span>
                                <span className="flex-1 capitalize">{user.role}</span>
                                <span className="w-12"><Link href={`/${gymSlug}/management/members/${user.profiles.id}`}><ExternalLink /></Link></span>
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