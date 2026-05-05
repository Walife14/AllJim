import SignUpForm from "@/app/components/auth/SignUpForm"
import Link from "next/link"

type Props = {}


export default function Signup({ }: Props) {

  return (
    <div className="mt-30 max-w-2xl mx-auto bg-neutral-200 p-2 rounded-lg">
      <h1 className="text-center">Sign Up</h1>

      <SignUpForm />

      <div className="py">
        <div className="py-2 flex flex-col gap-y-2">
          <p>Already have an account? <Link className="link" href="/login">Click here to sign in.</Link></p>
        </div>
      </div>
    </div>
  )
}