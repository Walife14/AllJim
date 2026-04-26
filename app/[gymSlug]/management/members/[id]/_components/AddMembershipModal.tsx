'use client'

import { useActionState, useEffect } from 'react'
import { addMembershipTime, MembershipUpdateResponse } from "@/app/actions/management/memberships"
import { Modal } from '@/app/components/ui/Modal'

type Props = {
    membershipId: string
    isOpen: boolean
    onClose: () => void
}

const initialState: MembershipUpdateResponse = {}

export default function AddMembershipModal({ membershipId, isOpen, onClose }: Props) {
    const [state, formAction, pending] = useActionState(addMembershipTime, initialState)

    useEffect(() => {
        if (state.success) {
            setTimeout(() => {
                onClose()
            }, 2000)
        }
    }, [state.success, onClose])

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Extend Membership">
            <form action={formAction}>
                <input type="hidden" name="membershipId" value={membershipId} />

                {/* radio for unit type */}
                <label>
                    Select unit type:
                    <select name="unit" defaultValue="months">
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                    </select>
                </label>

                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="text" id="amount" name="amount" placeholder="Amount" required />
                </div>

                {state.error && <p className='text-red-500'>{state.error}</p>}
                {state.success && <p className='text-green-500'>Successfully extended membership!</p>}

                <button type="submit" disabled={pending}>{pending ? 'Updating...' : 'Confirm Extension'}</button>
            </form>
        </Modal>
    )
}