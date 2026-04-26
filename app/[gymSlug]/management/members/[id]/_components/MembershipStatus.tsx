'use client'

import { format } from "date-fns"
import AddMembershipModal from "./AddMembershipModal"
import { useState } from "react"

type Props = {
    membershipId: string,
    status: string,
    expires_at: string
}

export default function MembershipStatus({ membershipId, status, expires_at }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const formattedDate = expires_at ? format(new Date(expires_at), 'dd/MM/yyyy') : 'No previous membership.'

    return (
        <div className="bg-neutral-200 rounded-lg p-4">
            <h2 className="text-center">Membership Status</h2>
            <div className="grid grid-cols-2 gap-2">
                <div className="text-center bg-white rounded-lg p-2">
                    <p>Membership Status</p>
                    <span>{status}</span>
                </div>
                <div className="text-center bg-white rounded-lg p-2">
                    <p>Membership Expiration</p>
                    <span>{formattedDate}</span>
                </div>
                <div className="col-span-2 rounded-lg p-2">
                    <button className="bg-neutral-600 text-white p-2 text-center rounded-lg cursor-pointer" onClick={() => setIsModalOpen(true)}>Extend Membership</button>
                </div>
            </div>
            {isModalOpen && (
                <AddMembershipModal membershipId={membershipId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}