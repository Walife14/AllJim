import Link from "next/link"

type Props = {
    name: string
    status: string
    id: string
}

export default function CheckInCard({ name, status, id }: Props) {
    return (
        <div className={`flex justify-between items-center text-center shadow-lg rounded-lg p-2
            ${status === 'active' ? 'bg-green-200' : 'bg-red-200'}
        `}>
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
    )
}