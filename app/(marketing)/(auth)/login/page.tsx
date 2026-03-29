'use client'

import { login } from "@/app/actions/auth/auth"
import { FormState } from "@/app/lib/definitions"
import { useActionState } from "react"

type Props = {}

const initialState: FormState = {}

export default function Login({ }: Props) {
  const [state, action, pending] = useActionState(login, initialState)

  return (
    <>
      <h1>Login</h1>
      
      <form action={action}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email address" />
        </div>
        {state.errors?.email && <p>{state.errors.email}</p>}
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" />
        </div>
        {state.errors?.password && <p>{state.errors.password}</p>}
        
        <button type="submit" disabled={pending}>{pending ? 'Logging in...' : 'Login'}</button>
      </form>
    </>
  )
}