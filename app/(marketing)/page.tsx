import Link from 'next/link'
import Image from 'next/image'

// actions
import { getUserProfileAction } from '../actions/auth/get-user'
import { getCurrentUserGymAction } from '../actions/auth/get-user-gym'

// icons
import { Check } from 'lucide-react'

type Props = {}

const featuresList = {
  management: [
    'View and organize your entire staff directory.',
    'Update staff profiles and internal permissions.',
    'Access real-time business analytics and growth metrics.',
    'Monitor daily operational performance at a glance.'
  ],
  kiosk: [
    'Track gym entries with a real-time check-in feed.',
    'Instantly verify member plans and active status.',
    'Log point-of-sale transactions for drinks and supplements.',
    'Secure staff access via individual personalized PINs.'
  ],
  portal: [
    'Secure entry with dynamic, auto-refreshing QR codes.',
    'Browse and book upcoming fitness classes.',
    'Track monthly and yearly attendance trends.',
    'Check real-time gym hours and holiday schedules.'
  ]
}
export default async function Home({ }: Props) {
  const { data: user } = await getUserProfileAction()
  const { data: gyms } = await getCurrentUserGymAction()


  return (
    <div>
      <section>
        <div className='relative md:max-h-[70vh] overflow-hidden'>
          <Image
            src="/assets/marketing/receptionist.png"
            alt="Gym Receptionist"
            width={0}
            height={0}
            sizes="100vw"
            loading="eager"
            className="object-center w-full h-auto"
          />
        </div>
      </section>

      <div className='max-w-5xl mx-2 md:mx-auto flex flex-col gap-y-8'>

        {user && (
          <section className='mt-10'>
            <h1 className='text-center'>Your Gyms</h1>
            <p className='text-center'>Welcome back {user.first_name}.</p>
            <ul className='flex justify-center gap-x-8 my-10'>
              {gyms && gyms.map((gym: any, index: number) => (
                <li key={index}>
                  <Link className='link' href={`/${gym.slug}`}>Continue to {gym.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!user && (
          <section className='mt-8'>
            <h1 className='text-center'>AllJim: Gym Management, Simplified.</h1>
            <p className='text-center text-lg md:text-2xl'>
              Focus on your athletes, not your paperwork.
              Effortlessly manage memberships, track finances,
              and run your front desk with our dedicated staff kiosk and admin panel.
            </p>
            {/* links */}
            <div className='flex justify-center items-center gap-4 mt-4'>
              <Link href="/#features" className='link-secondary'>Discover Our Features</Link>
              <Link href="/signup" className='link-primary'>Get Started Today</Link>
            </div>
          </section>
        )}

        {/* features */}
        <section id="features">
          <h2 className='text-center'>Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-y-2">
              <h3>Management</h3>
              <p className='font-semibold text-sm'>Your Command Center</p>
              <ul className='grid grid-cols-2 gap-4'>
                {featuresList.management.map((feature: string, index: number) => (
                  <li key={index} className='feature-card'>
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <h3>Kiosk</h3>
              <p className='font-semibold text-sm'>The Front Desk Powerhouse</p>
              <ul className="grid grid-cols-2 gap-4">
                {featuresList.kiosk.map((feature: string, index: number) => (
                  <li key={index} className="feature-card">
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <h3>Portal</h3>
              <p className='font-semibold text-sm'>The Ultimate Member Hub</p>
              <ul className="grid grid-cols-2 gap-4">
                {featuresList.portal.map((feature: string, index: number) => (
                  <li key={index} className="feature-card">
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* pricing */}
        {!user && (
          <section>

            <h2 className='text-center'>Pricing</h2>
            <p className='mb-8 text-center'>
              From boutique startups to global franchises, choose the plan built to scale with your ambition.
            </p>

            <div className='grid md:grid-cols-3 gap-2'>

              {/* Launch Plan */}
              <div className='p-2 md:p-8 border md:border-r-0 md:border-b-0 rounded-lg md:rounded-b-none flex flex-col items-start md:items-stretch gap-y-2'>
                <h3>Launch</h3>
                <p>Perfect for boutique gyms and new startups.</p>
                <div>
                  <strong className='text-xl md:text-4xl'>&pound;49</strong> <span className='text-sm'>/month</span>
                </div>
                <Link href="/signup?plan=launch" className='link-primary'>Get started</Link>
                <ul className='flex flex-col gap-y-2'>
                  <li className='flex gap-x-1'>
                    <Check /><p>Up to 200 members</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>Core Management Panel</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>Digital Member Portal</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>Dedicated Kiosk</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>Attendance Tracking</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>Class Scheduling & Booking</p>
                  </li>
                </ul>
              </div>

              {/* Scale Plan */}
              <div className='p-2 md:p-8 border md:border-b-0 rounded-lg md:rounded-b-none bg-zinc-200 md:scale-105 flex flex-col items-start md:items-stretch gap-y-2'>
                <div className='flex items-start gap-x-2'>
                  <h3>Scale</h3>
                  <span className='text-xs bg-zinc-900 px-2 py-1 rounded-md text-zinc-50'>RECOMMENDED</span>
                </div>
                <p>For established gyms ready to automate operations.</p>
                <div>
                  <strong className='text-xl md:text-4xl'>&pound;79</strong> <span className='text-sm'>/month</span>
                </div>
                <Link href="/signup?plan=scale" className='link-primary'>Get started</Link>
                <ul className='flex flex-col gap-y-2'>
                  <li className='flex gap-x-1'>
                    <Check /><p>Everything in Launch</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>Unlimited Members</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>Unlimited Staff Accounts</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>Broadcast Announcements</p>
                  </li>
                </ul>
              </div>

              {/* Franchise Plan */}
              <div className='p-2 md:p-8 border md:border-l-0 md:border-b-0 rounded-lg md:rounded-b-none flex flex-col items-start md:items-stretch gap-y-2'>
                <h3>Franchise</h3>
                <p>Enterprise solutions for multi-location networks.</p>
                <span className="text-xl md:text-4xl font-bold">Custom</span>
                <Link href="/signup?plan=franchise" className='link-primary'>Get started</Link>
                <ul className='flex flex-col gap-y-2'>
                  <li className='flex gap-x-1'>
                    <Check /><p>Everything in Scale</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>Multi-location Dashboard</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>Advanced Financial Reporting</p>
                  </li>
                  <li className='flex gap-x-1'>
                    <Check /><p>24&#47;7 Priority Support</p>
                  </li>
                </ul>
              </div>
            </div>

          </section>
        )}

        {/* newsletter */}
        <section className='flex flex-col gap-y-4 my-20'>
          <h3 className='text-center'>Join the AllJim Community</h3>
          <p className='text-center'>From feature drops to success stories, subscribe to get the latest gym management insights and news.</p>
          <form className='md:max-w-xl mx-auto w-full'>
            <div className='flex border rounded-full'>
              <input className='flex-1 py-2 pl-4 pr-2 ring-0 rounded-l-full focus-visible:ring-0' type="text" placeholder="Email address" />
              <button className='bg-zinc-900 text-zinc-50 py-2 px-4 rounded-r-full cursor-pointer' type="submit" disabled>Subscribe</button>
            </div>
          </form>
        </section>


      </div>
    </div>
  )
}