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
        <form onSubmit={handleSubmit}>

            {/* search query input */}
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search"
                    placeholder="Search..."
                />
            </div>

            {/* status selector */}
            <div>
                {VALID_STATUSES.map((s) => (
                    <label key={s} className="capitalize">
                        <input type="radio" name="status" value={s} checked={status === s} onChange={(e) => setStatus(e.target.value)} />
                        {s}
                    </label>
                ))}
            </div>

            {/* submit */}
            <button type="submit">Apply Filters</button>

        </form>
    )
}