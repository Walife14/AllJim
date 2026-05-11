'use client'

import { addStaffNoteAction, StaffNoteCreationResponse } from '@/app/actions/management/staffnotes'
import { Modal } from '@/app/components/ui/Modal'
import { useActionState, useEffect, useState } from 'react'

type Props = {
    isOpen: boolean
    onClose: () => void
    membershipId: string
}

const initialState: StaffNoteCreationResponse = {}

export default function AddStaffNotesModal({ membershipId, isOpen, onClose }: Props) {
    const [state, formAction, isPending] = useActionState(addStaffNoteAction, initialState)

    useEffect(() => {

        if (state.success) {
            setTimeout(() => {
                onClose()
            }, 2000)
        }

    }, [state.success, onClose])

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create Note">
            <form action={formAction} className='form-basic'>
                <input type="hidden" name="membershipId" value={membershipId} />

                <label className='flex flex-col'>
                    Content
                    <textarea name="content" rows={4} cols={40} />
                </label>

                {/* radio for unit type */}
                <label>
                    Select category:
                    <select name="category" defaultValue="general">
                        <option value="general">General</option>
                        <option value="billing">Billing</option>
                        <option value="conduct">Conduct</option>
                        <option value="safety">Safety</option>
                        <option value="medical">Medical</option>
                    </select>
                </label>

                {state.error && <p className='text-red-500'>{state.error}</p>}
                {state.success && <p className='text-green-500'>Successfully added note!</p>}

                <button type="submit" disabled={isPending} >{isPending ? 'Adding Note...' : 'Add Note'}</button>
            </form>
        </Modal>
    )
}