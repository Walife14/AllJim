'use client'

import { useState } from "react"
// components
import ManageRoleModal from "./ManageRoleModal"

type Props = {
    first_name: string
    last_name: string
    user_id: string
    joined_at: string
    membershipId: string
    role: string
}

export default function ProfileHeader({ first_name, last_name, user_id, joined_at, role, membershipId }: Props) {
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
        <div className="col-span-2 bg-neutral-200 p-4 rounded-lg flex flex-col items-start">
            <div className="flex gap-2">
                <h1>{first_name} {last_name}</h1>
                <div className="text-sm text-center">
                    <p>Joined on</p>
                    <span>{formatDate(joined_at)}</span>
                </div>
                <div className="text-sm text-center">
                    <p>Role</p>
                    <span>{role}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <p className="font-mono bg-white rounded-lg py-1 px-2 text-sm">USER ID: <span>{user_id}</span></p>
                <button className="bg-neutral-600 text-white p-2 rounded-lg cursor-pointer" onClick={() => setIsModalOpen(true)}>Manage Role</button>
            </div>

            <ManageRoleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} membershipId={membershipId} />
        </div>
    )
}