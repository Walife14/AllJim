'use client'

import { login } from "@/app/actions/auth/auth"
import { FormState } from "@/app/lib/definitions"
import Image from "next/image"
import Link from "next/link"
import { useActionState } from "react"

type Props = {}

const initialState: FormState = {}

export default function Login({ }: Props) {
  const [state, action, pending] = useActionState(login, initialState)

  return (
    <div className="mt-30 max-w-5xl mx-auto p-2 grid grid-cols-2 gap-4 items-center">
      <div>
        <Image
          src="/assets/marketing/man-sitting-on-desk-working.png"
          alt="Man sitting on desk writing notes."
          width={600}
          height={900}
          priority
          className="w-full h-[70vh] object-cover rounded-lg"
        />
      </div>
      <div>
        <h1 className="text-center">Sign In</h1>

        <form action={action} className="form-basic">
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

        <div className="py-2 flex flex-col gap-y-2">
          <Link className="link" href="/forgot-password">Forgot password?</Link>
          <p>Don&apos;t have an account? <Link className="link" href="/signup">Click here to sign up.</Link></p>
        </div>
      </div>
    </div>
  )
}