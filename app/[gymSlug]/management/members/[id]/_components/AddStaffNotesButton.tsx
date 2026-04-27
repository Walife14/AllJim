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
            <button className="bg-neutral-600 text-white p-2 text-center rounded-lg cursor-pointer" onClick={() => setIsModalOpen(true)}>Add Note</button>

            {isModalOpen && (
                <AddStaffNotesModal membershipId={membershipId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    )
}