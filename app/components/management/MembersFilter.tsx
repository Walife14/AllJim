'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

type Props = {}

const VALID_STATUSES = ['all', 'active', 'inactive']

export default function MembersFilter({ }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [status, setStatus] = useState(searchParams.get('status') || 'all')

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()

        const params = new URLSearchParams()

        if (search.trim()) {
            params.set('search', search.trim())
        }

        if (status !== 'all') {
            params.set('status', status)
        }

        router.push(`${pathname}?${params.toString()}`)
    }


    return (
        <div className="border p-2 rounded-lg">
            <span className="text-medium font-semibold">Filters</span>
            <form className="flex items-center gap-x-4" onSubmit={handleSubmit}>

                {/* search query input */}
                <div className="flex-1">
                    <input
                        className="bg-zinc-50 px-4 py-2 rounded-lg w-full"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search"
                        placeholder="Search..."
                    />
                </div>

                {/* status selector */}
                <div className="bg-zinc-200 p-1 rounded-xl flex gap-x-2 w-fit">
                    {VALID_STATUSES.map((s) => (
                        <label key={s} className="relative cursor-pointer">
                            {/* The hidden input with the 'peer' class */}
                            <input
                                type="radio"
                                name="status"
                                value={s}
                                checked={status === s}
                                onChange={(e) => setStatus(e.target.value)}
                                className="peer sr-only"
                            />

                            {/* The visible 'button' styled via peer-checked */}
                            <div className={`
                                px-4 py-2 rounded-lg capitalize transition-all duration-200 border border-zinc-300
                                bg-zinc-50 text-zinc-900 
                                peer-checked:bg-zinc-900 peer-checked:text-zinc-50 peer-checked:border-zinc-900
                                hover:bg-zinc-100 peer-checked:hover:bg-zinc-800
                            `}>
                                {s}
                            </div>
                        </label>
                    ))}
                </div>
                {/* submit */}
                <button className="ml-auto link-primary" type="submit">Apply Filters</button>

            </form>
        </div>
    )
}