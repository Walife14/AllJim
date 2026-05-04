'use client'

import { useActionState, useEffect, useRef, useState } from "react"

// components
import CheckInCard from "./CheckInCard"
import { verifyMember } from "@/app/actions/kiosk/verifyMemberAction"

type Props = {
    gymSlug: string
}

interface checkedInMember {
    id: string
    name: string
    status: string
    created_at: string
}

export default function CheckInManager({ gymSlug }: Props) {
    // const buffer = useRef('')
    // const lastKeyTime = useRef(Date.now())

    // useEffect(() => {
    //     const handleKeyDown = (e: KeyboardEvent) => {
    //         const now = Date.now()

    //         // check speed of typing if gap is > 50ms, it's a human
    //         if (now - lastKeyTime.current > 50) {
    //             buffer.current = ''
    //         }
    //         lastKeyTime.current = now

    //         if (e.key.length === 1) {
    //             buffer.current += e.key
    //         }

    //         if (e.key === 'Enter') {
    //             if (buffer.current.length > 20) {
    //                 console.log("qr detected: ", buffer.current)

    //                 // clear buffer after success
    //                 buffer.current = ''

    //                 // stop enter from triggering ui
    //                 e.preventDefault()
    //             }
    //         }
    //     }

    //     window.addEventListener('keydown', handleKeyDown)

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown)
    //     }
    // }, [])
    const [checkIns, setCheckIns] = useState<checkedInMember[]>([])
    const [state, formAction, isPending] = useActionState(verifyMember, {})

    useEffect(() => {

        // if we get a state of success then we add a new CheckInCard to the UI to display check-In
        if (state.success && state.data) {
            const newCheckIn = {
                id: state.data.membership_id,
                name: `${state.data.first_name} ${state.data.last_name}`,
                status: state.data.status,
                created_at: state.data.created_at
            }
            setCheckIns(prev => [newCheckIn, ...prev])
        }

    }, [state])

    return (
        <div>
            <h2 className="text-center">Check In Feed</h2>

            <form action={formAction}>
                <input type="hidden" name="gymSlug" value={gymSlug} />
                <div>
                    <label htmlFor="jwt">JWT</label>
                    <input type="text" name="jwt" id="jwt" placeholder="JWT" />
                </div>
                {state.error && <p>{state.error}</p>}
                {state.data && <p>{state.data.first_name}, {state.data.last_name} has checked in.</p>}
            </form>

            <div className="flex flex-col gap-y-2">
                {checkIns.map((user: checkedInMember, index: number) => (
                    <CheckInCard name={user.name} status={user.status} id={user.id} created_at={user.created_at} key={index} />
                ))}
            </div>
        </div>
    )
}