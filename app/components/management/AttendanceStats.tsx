type Props = {
  daily: number
  weekly: number
  monthly: number
}

export default function AttendanceStats({ daily, weekly, monthly }: Props) {
  return (
    <div className="bg-neutral-200 rounded-lg p-4 grid grid-cols-2 gap-2">
      <div className="col-span-2 flex justify-center">
        <div className="flex flex-col items-center bg-neutral-50 p-4 rounded-lg">
          <span className="text-xl font-bold">{daily}</span>
          <span>Visitor&apos;s today</span>
        </div>
      </div>
      <div className="flex flex-col items-center bg-neutral-50 p-4 rounded-lg row-start-2">
        <span className="text-xl font-bold">{weekly}</span>
        <span>Visitor&apos;s this week</span>
      </div>
      <div className="flex flex-col items-center bg-neutral-50 p-4 rounded-lg row-start-2">
        <span className="text-xl font-bold">{monthly}</span>
        <span>Visitor&apos;s this month</span>
      </div>
    </div>
  )
}