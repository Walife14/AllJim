"use client"

import { useActionState } from "react"
import { signup } from "@/app/actions/owner/auth"
import { FormState } from "@/app/lib/definitions"

type Props = {}

const initialState: FormState = {}

export default function page({ }: Props) {
    const [state, action, pending] = useActionState(signup, initialState)

    return (
        <>
            <h1>Gym Owner signup</h1>

            <form action={action}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="Email" />
                </div>
                {state?.errors?.email && <p>{state.errors.email}</p>}
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" placeholder="Password" />
                </div>
                {state?.errors?.password && <p>{state.errors.password}</p>}
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm password" />
                </div>
                {state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}

                <button type="submit" disabled={pending}>{pending ? 'Signing up...' : 'Sign up'}</button>
            </form>
        </>
    )
}