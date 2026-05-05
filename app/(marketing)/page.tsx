import Link from 'next/link'
import { getUserProfileAction } from '../actions/auth/get-user'
import { getCurrentUserGymAction } from '../actions/auth/get-user-gym'
import Image from 'next/image'

type Props = {}

export default async function Home({ }: Props) {
  const { data: user } = await getUserProfileAction()
  const { data: gyms } = await getCurrentUserGymAction()


  return (
    <div>
      <section>
        <div className='relative max-h-[70vh] overflow-hidden'>
          <Image
            src="/assets/marketing/receptionist.png"
            alt="Gym Receptionist"
            width={0}
            height={0}
            sizes="100vw"
            loading="eager"
            style={{ width: '100%', height: 'auto' }}
            className="object-center"
          />
        </div>
      </section>

      <section className='max-w-5xl mx-auto my-8'>
        <h1 className='text-center'>AllJim: Gym Management, Simplified.</h1>
        <p className='text-center text-2xl'>
          Focus on your athletes, not your paperwork.
          Effortlessly manage memberships, track finances,
          and run your front desk with our dedicated staff kiosk and admin panel.
        </p>
        {/* links */}
        <div className='flex justify-center items-center gap-4 mt-4'>
          <Link href="#" className='link-secondary'>Discover Our Features</Link>
          <Link href="#" className='link-primary'>Get Started Today</Link>
        </div>
      </section>

      {/* <section>
        <div className='flex flex-col items-center'>
          <h1>Welcome to AllJim</h1>
          {user && (
            <p>{user.first_name}</p>
          )}
          {gyms.length === 0 && (
            <>
              <p>Your all-in-one gym management platform.</p>
              
              <p>It doesn&apos;t seem like you are part of a gym yet.</p>
              <Link href="/onboarding">Manage my gym using AllJim</Link>
            </>
          )}
          {gyms.length > 0 && gyms.map((gym) => (
            <div key={gym.name}>
              <p>It seems like you're already a part of {gym.name}</p>

              <Link href={`/${gym.slug}/portal`}>Go to {gym.name}&apos;s portal</Link>
            </div>
          ))}
        </div>

      </section> */}

    </div>
  )
}