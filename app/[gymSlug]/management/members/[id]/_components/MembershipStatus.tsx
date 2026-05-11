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

    const formattedDate = expires_at ? format(new Date(expires_at), 'dd/MM/yyyy') : 'No membership history'

    return (
        <div className="bg-neutral-200 rounded-lg p-4">
            <h2 className="text-center">Membership</h2>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                    <div className="text-center bg-white rounded-lg p-2">
                        <dt className="text-sm">Status</dt>
                        <dd className="font-bold capitalize">{status}</dd>
                    </div>
                    <div className="grid grid-cols-2">
                        <button className="open-btn" disabled>Manage</button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-center bg-white rounded-lg p-2">
                        <dt className="text-sm">Expiration</dt>
                        <dd className="font-bold">{formattedDate}</dd>
                    </div>
                    <div className="grid grid-cols-2">
                        <button className="open-btn" onClick={() => setIsModalOpen(true)}>Extend Membership</button>
                    </div>
                </div>

            </div>
            {isModalOpen && (
                <AddMembershipModal membershipId={membershipId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}