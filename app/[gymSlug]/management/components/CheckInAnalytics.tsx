'use client'

import { createClient } from "@/lib/supabase/client"
import { startOfDay, sub } from "date-fns"
import { useCallback, useEffect, useState } from "react"

type Props = {}

export default function CheckInAnalytics({ }: Props) {
    const supabase = createClient()
    const [counts, setCounts] = useState({ today: 0, last7: 0, last30: 0 })
    const [loading, setLoading] = useState(true)

    // memoize
    const fetchStats = useCallback(async () => {
        const now = new Date()

        const [today, week, month] = await Promise.all([
            supabase.from('check_ins').select('*', { count: 'exact', head: true })
                .gte('created_at', startOfDay(now).toISOString()),
            supabase.from('check_ins').select('*', { count: 'exact', head: true })
                .gte('created_at', sub(now, { days: 7 }).toISOString()),
            supabase.from('check_ins').select('*', { count: 'exact', head: true })
                .gte('created_at', sub(now, { days: 30 }).toISOString())
        ])

        setCounts({
            today: today.count || 0,
            last7: week.count || 0,
            last30: month.count || 0
        })
        setLoading(false)
    }, [supabase])

    useEffect(() => {
        fetchStats()

        const channel = supabase
            .channel('realtime-checkins')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'check_ins'},
                () => fetchStats()
            )
            .subscribe()

            return () => {
                supabase.removeChannel(channel)
            }
    }, [fetchStats, supabase])

    if (loading) return <div>Loading Activity...</div>

    return (
        <section className="bg-zinc-200 p-4 rounded-lg">
            <h2>Check-in Activity</h2>
            <div className="grid grid-cols-3 gap-4">
                {/* Today */}
                <div className="flex-1 bg-zinc-900 text-zinc-50 p-2 rounded-lg text-center">
                    <dt className="uppercase text-sm">Today</dt>
                    <dd className="font-bold text-2xl">{counts.today}</dd>
                </div>
                {/* This week */}
                <div className="flex-1 bg-zinc-900 text-zinc-50 p-2 rounded-lg text-center">
                    <dt className="uppercase text-sm text-nowrap">Last Week</dt>
                    <dd className="font-bold text-2xl">{counts.last7}</dd>
                </div>
                {/* This month */}
                <div className="flex-1 bg-zinc-900 text-zinc-50 p-2 rounded-lg text-center">
                    <dt className="uppercase text-sm text-nowrap">Last Month</dt>
                    <dd className="font-bold text-2xl">{counts.last30}</dd>
                </div>
            </div>
        </section>
    )
}