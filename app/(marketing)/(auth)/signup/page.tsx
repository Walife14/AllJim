'use client'

import { useActionState } from "react"
import { signup } from "@/app/actions/owner/auth"
import { FormState } from "@/app/lib/definitions"

type Props = {}

const initialState: FormState = {}

export default function Signup({ }: Props) {
  const [state, action, pending] = useActionState(signup, initialState)

  return (
    <>
      <h1>Gym owner signup</h1>

      <form action={action}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email address" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" />
        </div>
        {state?.errors?.password && <p>{state.errors.password}</p>}
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirmPassword" />
        </div>
        {state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}
      
        <button type="submit" disabled={pending}>{pending ? 'Signing up...' : 'Sign up'}</button>
      </form>
    </>
  )
}