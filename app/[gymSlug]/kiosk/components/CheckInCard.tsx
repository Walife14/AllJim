import { format } from "date-fns"
import Link from "next/link"

type Props = {
    name: string
    status: string
    id: string
    created_at: string
}

export default function CheckInCard({ name, status, id, created_at }: Props) {

    const formattedDate = () => {
        return format(new Date(created_at), 'k:maaa dd/MM/yy')
    }

    return (
        <div className={`shadow-lg rounded-lg
            ${status === 'active' ? 'bg-green-200' : 'bg-red-200'}
        `}>
            <div className="flex justify-between items-center text-center p-2">
                <div>
                    <p>Name</p>
                    <strong>{name}</strong>
                </div>
                <div>
                    <p>Membership Status</p>
                    <strong className="text-green-500">{status}</strong>
                </div>
                <div>
                    <Link href="#">Open Profile</Link>
                </div>
            </div>
            <p className="bg-slate-300 rounded-b-lg p-2 text-right">Checked in {formattedDate()}</p>
        </div>
    )
}