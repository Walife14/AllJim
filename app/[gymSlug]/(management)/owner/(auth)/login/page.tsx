"use client"

import { FormState } from "@/app/lib/definitions";
import { FormEvent, useActionState } from "react";

type Props = {
}

const initialState: FormState = {}

export default function OwnerLogin({}: Props) {
    const [state, action, pending] = useActionState(login, initialState)

    return (
        <>
            <h1>Owner Login</h1>

            <form action={action}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="Email" />
                </div>
                {state?.errors?.email && <p>{state.errors.email}</p>}

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="Password" />
                </div>
                {state?.errors?.password && <p>{state.errors.password}</p>}

                <button disabled={pending} type="submit">Login</button>
            </form>
        </>
    )
}