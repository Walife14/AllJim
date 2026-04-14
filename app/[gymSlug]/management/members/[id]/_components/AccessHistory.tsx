type Props = {}

export default function AccessHistory({ }: Props) {
    return (
        <div className="bg-neutral-200 p-4 rounded-lg">
            <h2 className="text-center">Access History</h2>
            <ul className="flex flex-col gap-2">
                <li className="flex gap-x-1 bg-white p-1 rounded-lg">
                    <p>12 April 2026, 08:22</p>
                    <p>&mdash; Tapped into the gym.</p>
                </li>
                <li className="flex gap-x-1 bg-white p-1 rounded-lg">
                    <p>11 April 2026, 08:30</p>
                    <p>&mdash; Tapped into the gym.</p>
                </li>
                <li className="flex gap-x-1 bg-white p-1 rounded-lg">
                    <p>09 April 2026, 08:14</p>
                    <p>&mdash; Tapped into the gym.</p>
                </li>
            </ul>
        </div>
    )
}