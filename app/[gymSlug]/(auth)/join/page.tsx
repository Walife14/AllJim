import SignUpForm from "@/app/components/auth/SignUpForm"

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

      <SignUpForm gymSlug={gymSlug} />
    </div>
  )
}