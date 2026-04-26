'use client'

import { useActionState } from "react"

// actions
import { addMembershipTime, MembershipUpdateResponse } from "@/app/actions/management/memberships"
import { format } from "date-fns"

// types

type Props = {
    membershipId: string,
    status: string,
    expires_at: string
}

const initialState: MembershipUpdateResponse = {}

export default function MembershipStatus({ membershipId, status, expires_at }: Props) {
    const [state, formAction, pending] = useActionState(addMembershipTime, initialState)

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
                <div className="col-span-2 bg-white rounded-lg p-2">
                    <p>Membership Quick Edits</p>
                    <ul className="flex gap-2">
                        <li>
                            <button className="bg-green-400 p-2 rounded-lg" disabled>+1 Month</button>
                        </li>
                        <li>
                            <button className="bg-green-400 p-2 rounded-lg" disabled>+3 Months</button>
                        </li>
                        <li>
                            <button className="bg-green-400 p-2 rounded-lg" disabled>+1 Year</button>
                        </li>
                    </ul>
                </div>
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

                    <button type="submit" disabled={pending}>{pending ? 'Loading' : 'Test Func Button'}</button>
                </form>
            </div>
        </div>
    )
}