'use client'

import { signup } from "@/app/actions/auth/auth"
import { FormState } from "@/app/lib/definitions"
import { useActionState } from "react"

type Props = {
    gymSlug?: string
}

const initialState: FormState = {}

export default function SignUpForm({ gymSlug }: Props) {
  const [state, formAction, pending] = useActionState(signup, initialState)

    return (
        <form action={formAction}>
            {gymSlug && (
                <input type="hidden" name="gymSlug" value={gymSlug} />
            )}

            <div>
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" name="firstName" placeholder="First name" required />
            </div>
            {state?.errors?.firstName && <p>{state.errors.firstName}</p>}
            <div>
                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Last name" required />
            </div>
            {state?.errors?.lastName && <p>{state.errors.lastName}</p>}
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email address" required />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" required />
            </div>
            {state?.errors?.password && <p>{state.errors.password}</p>}
            <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirmPassword" required />
            </div>
            {state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}

            <button type="submit" disabled={pending}>{pending ? 'Signing up...' : 'Sign up'}</button>
        </form>
    )
}