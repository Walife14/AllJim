
// components
import CheckInAnalytics from "./_components/CheckInAnalytics"

type Props = {}

export default function ManagementPage({ }: Props) {
    return (
        <div className="flex flex-col gap-y-2">
            <div className="bg-zinc-200 rounded-lg p-4">
                <h1>Dashboard</h1>
            </div>
            <div className="flex items-start gap-2 flex-wrap">

                <CheckInAnalytics />
            </div>
        </div>
    )
}