import Link from 'next/link'

type Props = {}

export default function Home({ }: Props) {
  return (
    <div>
      <section>

        <div className='flex flex-col items-center'>
          <h1>Welcome to AllJim</h1>
          <p>Your all-in-one gym management platform.</p>

          <Link href="/onboarding">Manage my gym using AllJim</Link>
        </div>

      </section>

    </div>
  )
}