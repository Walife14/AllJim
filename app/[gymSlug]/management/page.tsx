
// components
import AttendanceStats from "@/app/components/management/AttendanceStats"
import StaffOverview from "@/app/components/management/StaffOverview"

type Props = {}

export default function ManagementPage({ }: Props) {
    return (
        <>
            <h1>Dashboard</h1>

            <div className="flex gap-4">
                <AttendanceStats daily={50} weekly={200} monthly={850} />
                <StaffOverview />
            </div>
        </>
    )
}