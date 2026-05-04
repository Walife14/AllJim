import { createClient } from "@/lib/supabase/server"
import { endOfDay, startOfDay } from "date-fns"

type Props = {
  params: Promise<{
    gymSlug: string
  }>
}

const today = new Date()
const start = startOfDay(today).toISOString()
const end = endOfDay(today).toISOString()

export default async function TerminalPage({ params }: Props) {
  const { gymSlug } = await params
  const supabase = await createClient()

  // grab the gym id
  const { data: gymData, error: gymError } = await supabase
    .from('gyms').select('id').eq('slug', gymSlug).single()

  if (gymError) return (<p>{gymError.message}</p>)

  const { count, error: checkInCountError } = await supabase
    .from('check_ins')
    .select('', { count: 'exact', head: true })
    .match({ gym_id: gymData.id })
    .gte('created_at', start)
    .lte('created_at', end)

  if (checkInCountError) return (<p>{checkInCountError.message}</p>)

  return (
    <div className="flex flex-col items-start">
      <div className="bg-neutral-200 p-2 rounded-lg text-center">
        <h2>Check-ins today</h2>
        <span className="text-3xl font-semibold">{count}</span>
      </div>
    </div>
  )
}