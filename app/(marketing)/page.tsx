import Link from 'next/link'
import { getUserProfileAction } from '../actions/auth/get-user'
import { getCurrentUserGymAction } from '../actions/auth/get-user-gym'

type Props = {}

export default async function Home({ }: Props) {
  const { data: user } = await getUserProfileAction()
  const { data: gym } = await getCurrentUserGymAction()


  return (
    <div>
      <section>
        <div className='flex flex-col items-center'>
          <h1>Welcome to AllJim</h1>
          {user && (
            <p>{user.first_name}</p>
          )}
          {gym ? (
            <>
              <p>It seems like you're already a part of {gym.name}</p>

              <Link href={`/${gym.slug}/portal`}>Go to {gym.name}&apos;s portal</Link>
            </>
          ) : (
            <>
              <p>Your all-in-one gym management platform.</p>

              <Link href="/onboarding">Manage my gym using AllJim</Link>
            </>
          )}
        </div>

      </section>

    </div>
  )
}