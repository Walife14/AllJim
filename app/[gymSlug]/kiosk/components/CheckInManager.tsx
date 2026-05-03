'use client'

import { useActionState, useEffect, useRef } from "react"

// components
import CheckInCard from "./CheckInCard"
import { verifyMember } from "@/app/actions/kiosk/verifyMemberAction"

type Props = {
    gymSlug: string
}

const dummyUsers = [
    {
        name: 'Lucas Smith',
        status: 'active',
        id: '123'
    },
    {
        name: 'Eve Doe',
        status: 'inactive',
        id: '124'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Jack Smith',
        status: 'active',
        id: '125'
    },
    {
        name: 'Kian Daniels',
        status: 'active',
        id: '126'
    },
]

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

    const [state, formAction, isPending] = useActionState(verifyMember, {})

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
                {state.data && <p>{state.data.user_id}</p>}
            </form>

            <div className="flex flex-col gap-y-2">
                {/* {dummyUsers.map((user: any, index: number) => (
                    <CheckInCard name={user.name} status={user.status} id={user.id} key={index} />
                ))} */}
            </div>
        </div>
    )
}