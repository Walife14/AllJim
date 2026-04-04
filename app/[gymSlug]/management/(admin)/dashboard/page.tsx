import AttendanceStats from "@/app/components/management/AttendanceStats"

type Props = {}

export default function Dashboard({}: Props) {
  return (
    <div>
        <h1>Dashboard</h1>
        <AttendanceStats daily={50} weekly={200} monthly={850} />
    </div>
  )
}