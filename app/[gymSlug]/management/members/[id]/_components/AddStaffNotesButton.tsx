'use client'

import { useState } from "react"
import AddStaffNotesModal from "./AddStaffNotesModal"

type Props = {
    membershipId: string
}

export default function AddStaffNotesButton({ membershipId }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <button className="open-btn" onClick={() => setIsModalOpen(true)}>Add Note</button>

            {isModalOpen && (
                <AddStaffNotesModal membershipId={membershipId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    )
}