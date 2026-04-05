import Link from 'next/link'

type Props = {
    gymSlug: string
}

export default function ManagementNavbar({ gymSlug }: Props) {
    return (
        <nav>
            <ul className='w-full h-full bg-neutral-200 flex flex-col gap-y-4 p-2'>
                <li>
                    <Link href={`/${gymSlug}/management`}>Dashboard</Link>
                </li>
                <li>
                    <Link href={`/${gymSlug}/management/revenue`}>Revenue</Link>
                </li>
                <li>
                    <Link href={`/${gymSlug}/management/settings`}>Settings</Link>
                </li>
            </ul>
        </nav>
    )
}