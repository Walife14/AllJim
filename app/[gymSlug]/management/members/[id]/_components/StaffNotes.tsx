type Props = {}

export default function StaffNotes({ }: Props) {
    return (
        <div className="col-span-2 bg-neutral-200 p-4 rounded-lg">
            <h2 className="text-center">Staff Notes</h2>
            <ul>
                <li className="flex gap-2">
                    <div className="text-end text-sm">
                        <p>Created by Lucas</p>
                        <p>12 April 2026</p>
                    </div>
                    <p className="bg-white p-2 rounded-lg">
                        John Doe has had a knee injury during a skiing trip to Austria and has had to freeze their
                        gym membership for the next 2 months. Approved upon their request.
                    </p>
                </li>
            </ul>
        </div>
    )
}