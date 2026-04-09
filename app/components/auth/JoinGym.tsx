'use client'

import { joinGymAction, joinGymState } from "@/app/actions/auth/join-gym"
import { useActionState } from "react"

type Props = {
    gymId: string
    gymSlug: string
}

const initialState: joinGymState = { }

export default function JoinGym({ gymId, gymSlug }: Props) {
    const [state, formAction, isPending] = useActionState(joinGymAction, initialState)

    return (
        <form action={formAction}>
            <input type="hidden" name="gymId" value={gymId} />
            <input type="hidden" name="gymSlug" value={gymSlug} />
            <button type="submit" disabled={isPending}>{isPending ? 'Joining...' : 'Join Gym'}</button>
            {state.error && <p>{state.error}</p>}
        </form>
    )
}