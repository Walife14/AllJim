// utils
import { formatDate } from "@/app/utils/formatDate/formatDate"

type Props = {
    checkInHistory: { created_at: string }[]
}

export default function AccessHistory({ checkInHistory }: Props) {
    return (
        <div className="bg-neutral-200 p-4 rounded-lg">
            <h2 className="text-center">Access History</h2>
            {checkInHistory.length > 0 ? (
                <ul className="flex flex-col gap-2">
                    {checkInHistory.map((checkIn: { created_at: string }, index: number) => (
                        <li key={index} className="flex gap-x-1 bg-white py-1 px-2 rounded-lg">
                            <p>{formatDate(checkIn.created_at)}</p>
                            <p>&mdash; Tapped into the gym.</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No check ins found for member.</p>
            )}

        </div>
    )
}