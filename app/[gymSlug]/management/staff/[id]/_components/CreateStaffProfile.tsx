'use client'

import { useActionState, useState } from "react"

import { createStaffProfileAction, staffProfileResponse } from "@/app/actions/management/staff/staffprofiles"

// components
import { Modal } from "@/app/components/ui/Modal"
import { UserRoundPlus } from "lucide-react"

type Props = {
    id: string
    gymId: string
}

const initialState: staffProfileResponse = {}

export default function CreateStaffProfile({ id, gymId }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [state, formAction, isPending] = useActionState(createStaffProfileAction, initialState)

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="link-primary"><UserRoundPlus /> Add Profile</button>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Staff Profile">
                    <form action={formAction}>
                        <input type="hidden" name="staffAccountId" value={id} />
                        <input type="hidden" name="gymId" value={gymId} />

                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" placeholder="First Name" required />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" placeholder="Last Name" required />
                        </div>
                        <div>
                            <label htmlFor="staffPin">Staff PIN</label>
                            <input type="text" id="staffPin" name="staffPin" placeholder="Staff PIN" pattern="\d{4}" inputMode="numeric" maxLength={4} required />
                        </div>

                        {state.error && <p className="text-red-500">{state.error}</p>}
                        {state.success && <p className="text-green-500">Successfully added a new staff profile.</p>}

                        <button type="submit" disabled={isPending}>{isPending ? 'Creating Profile...' : 'Create Profile'}</button>
                    </form>
                </Modal>
            )}
        </>
    )
}