'use client'

import { Boxes, ChartLine, House, Megaphone, Settings, ShieldUser, Store, UsersRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
    gymSlug: string
}


export default function ManagementNavbar({ gymSlug }: Props) {
    const pathname = usePathname()

    const navItems = [
        { href: `/${gymSlug}/management`, label: 'Dashboard', icon: <House /> },
        { href: `/${gymSlug}/management/members`, label: 'Members', icon: <UsersRound /> },
        { href: `/${gymSlug}/management/staff`, label: 'Staff', icon: <ShieldUser /> },
        { href: `/${gymSlug}/management/revenue`, label: 'Revenue', icon: <ChartLine /> },
        { href: `/${gymSlug}/management/equipment`, label: 'Equipment', icon: <Boxes /> },
        { href: `/${gymSlug}/management/marketing`, label: 'Marketing', icon: <Megaphone /> },
        { href: `/${gymSlug}/management/gym-profile`, label: 'Gym Profile', icon: <Store /> },
        { href: `/${gymSlug}/management/settings`, label: 'Settings', icon: <Settings /> },
    ]

    return (
        <nav className="fixed left-0 top-0 h-screen bg-zinc-200 z-50 transition-all duration-300 w-20 hover:w-64 group shadow-lg">
            <ul className="flex flex-col gap-y-4 pt-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <li key={item.href} className="relative flex items-center">
                            <Link
                                href={item.href}
                                className={`flex items-center w-full transition-all duration-200 ${isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'
                                    }`}
                            >
                                {/* ICON BOX: This stays exactly 80px wide (w-20) to match the sidebar */}
                                <div className="w-20 h-12 flex items-center justify-center shrink-0 relative">
                                    {/* The actual background "bubble" */}
                                    <div className={`absolute inset-y-0 w-12 rounded-lg transition-colors ${isActive ? 'bg-zinc-800' : 'group-hover:bg-zinc-300/50'
                                        }`} />

                                    {/* The Icon (Z-10 to stay above the bubble) */}
                                    <div className={`z-10 ${isActive ? 'text-white' : ''}`}>
                                        {item.icon}
                                    </div>
                                </div>

                                {/* LABEL: Hidden until hover */}
                                <span className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap font-semibold ml-2">
                                    {item.label}
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}