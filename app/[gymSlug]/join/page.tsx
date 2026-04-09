import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

// components
import SignUpForm from "@/app/components/auth/SignUpForm"
import JoinGym from "@/app/components/auth/JoinGym"

type Props = {
  params: Promise<{
    gymSlug: string
  }>
}

export default async function JoinPage({ params }: Props) {
  const { gymSlug } = await params
  const supabase = await createClient()

  // check whether we have a user
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // grab profile to display name
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('first_name')
      .eq('id', user.id)
      .single()

    if (profileError) {
      // we couldn't fetch a profile!
      console.error(profileError.message)
      return redirect('/')
    }

    // grab the gym id
    const { data: gym, error: gymError } = await supabase
      .from('gyms')
      .select('id')
      .eq('slug', gymSlug)
      .single()

    if (!gym) {
      // we don't have a gym -> redirect
      return redirect('/')
    }

    // we have the gym id, check if user is part of this gym
    const { data: membership } = await supabase
      .from('memberships')
      .select()
      .match({ user_id: user.id, gym_id: gym.id })
      .maybeSingle()

    if (membership) {
      // user is part of gym redirect them
      return redirect(`/${gymSlug}`)
    }

    return (
      <div>
        <h2>Join</h2>
        <p>Hello {profile.first_name} this button will allow you to join their gym!</p>
        <JoinGym gymId={gym.id} gymSlug={gymSlug} />
      </div>
    )
  }

  return (
    <div>
      <h2>Join</h2>
      <p>Already have an account? <Link href={`/${gymSlug}/login`}>go to login</Link></p>

      <SignUpForm gymSlug={gymSlug} />
    </div>
  )
}