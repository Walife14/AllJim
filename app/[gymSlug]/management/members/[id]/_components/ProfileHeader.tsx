'use client'

import { useState } from "react"
// components
import ManageRoleModal from "./ManageRoleModal"
import { Pencil, SquarePen, User, UserRound, UserRoundKey } from "lucide-react"

type Props = {
    first_name: string
    last_name: string
    dob: string
    user_id: string
    joined_at: string
    membershipId: string
    role: string
}

export default function ProfileHeader({ first_name, last_name, dob, user_id, joined_at, role, membershipId }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function formatDate(dateString: string) {
        const date = new Date(dateString)

        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date)
    }

    return (
        <div className="col-span-2 bg-zinc-200 p-4 rounded-lg flex flex-col gap-2">
            <div className="flex gap-2">
                <div className="aspect-square md:w-60 bg-zinc-50 rounded-lg flex justify-center items-center">
                    <User size={60} />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex flex-col">
                        <dt className="text-sm">Name</dt>
                        <dd className="font-bold">{first_name} {last_name}</dd>
                    </div>
                    <div className="flex flex-col">
                        <dt className="text-sm">Date of birth</dt>
                        <dd className="font-bold">{dob}</dd>
                    </div>
                    <div className="flex flex-col">
                        <dt className="text-sm">Joined on</dt>
                        <dd className="font-bold">{formatDate(joined_at)}</dd>
                    </div>
                    <div className="flex flex-col">
                        <dt className="text-sm">Role</dt>
                        <dd className="font-bold capitalize flex items-center gap-x-2">{role === 'member' ? <UserRound /> : <UserRoundKey />}{role}</dd>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-100 rounded-lg cursor-pointer bg-zinc-900 text-zinc-50 group hover:bg-zinc-50 hover:text-blue-500"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <SquarePen size={16} className="group-hover:text-blue-500" />
                            Manage Role
                        </button>
                    </div>
                </div>
            </div>
            <p className="font-mono bg-white rounded-lg py-1 px-2 text-sm">USER ID: <span>{user_id}</span></p>

            <ManageRoleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} membershipId={membershipId} />
        </div>
    )
}