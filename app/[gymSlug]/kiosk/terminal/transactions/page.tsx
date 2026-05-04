import { createClient } from "@/lib/supabase/server"

// utils
import { formatDate } from "@/app/utils/formatDate/formatDate"

type Props = {
  params: Promise<{
    gymSlug: string
  }>
}



export default async function TransactionsPage({ params }: Props) {
  const { gymSlug } = await params
  const supabase = await createClient()

  // get the gym id
  const { data: gymData, error: gymError } = await supabase
    .from('gyms').select('id').eq('slug', gymSlug).single()

  if (gymError || !gymData.id) {
    return (<p>No gym found.</p>)
  }

  const { data: membershipHistoryData, error: membershipHistoryError } = await supabase
    .from('membership_history')
    .select(`id, gym_id, membership_id,
      performed_by, amount_added, unit,
      amount_paid, currency,
      transaction_type, payment_method,
      created_at, metadata,
      memberships!inner (
        user_id,
        profiles!inner (
          first_name, last_name, email
        )
      )
      `)
    .eq('gym_id', gymData.id)

  if (membershipHistoryError) {
    return (
      <p>{membershipHistoryError.message}</p>
    )
  }

  return (
    <>
      <h1>Transactions</h1>
      <div>
        {/* toggle between membership purchase history (day passes, etc.) and till transactions */}

      </div>

      <ul>
        {membershipHistoryData.map((transaction: any, index: number) => (
          <li key={index}>
            {transaction.memberships.profiles.first_name},
            {transaction.memberships.profiles.last_name},
            {transaction.amount_added},
            {transaction.unit},
            {transaction.metadata.staff_name},
            {transaction.amount_paid},
            {transaction.currency},
            {formatDate(transaction.created_at)}
          </li>
        ))}
      </ul>
    </>
  )
}