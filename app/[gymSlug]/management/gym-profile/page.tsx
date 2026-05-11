type Props = {}

export default function GymProfilePage({ }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-zinc-200 rounded-lg p-4">
        <h1>Gym Profile</h1>
        <p>Manage your gym&apos;s public profile, schedule, and how it appears to your members.</p>
      </div>

      <section className="bg-zinc-200 rounded-lg p-4">
        <h2>Branding</h2>
        {/* todo: add current icon and ability to edit it, it saves it to 'gyms' table */}
        <p className="text-red-500">TO BE IMPLEMENTED</p>
      </section>

      <section className="bg-zinc-200 rounded-lg p-4">
        <h2>Schedule</h2>
        {/* todo: allow the gym owner to manage the opening hours of the business */}
        <p className="text-red-500">TO BE IMPLEMENTED</p>
      </section>

    </div>
  )
}