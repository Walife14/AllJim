import Link from 'next/link'

type Props = {}

export default function ManagementNavbar({ }: Props) {
    return (
        <nav>
            <ul className='w-full h-full bg-neutral-200 flex flex-col gap-y-4 p-2'>
                <li>
                    <Link href="./dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link href="./revenue">Revenue</Link>
                </li>
                <li>
                    <Link href="./settings">Settings</Link>
                </li>
            </ul>
        </nav>
    )
}