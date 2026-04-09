import SignUpForm from "@/app/components/auth/SignUpForm"
import Link from "next/link"

type Props = {
  params: Promise<{
    gymSlug: string
  }>
}

export default async function JoinPage({ params }: Props) {
  const { gymSlug } = await params

  return (
    <div>
      <h2>Join</h2>
      <p>Already have an account? <Link href={`/${gymSlug}/login`}>go to login</Link></p>
      

      <SignUpForm gymSlug={gymSlug} />
    </div>
  )
}