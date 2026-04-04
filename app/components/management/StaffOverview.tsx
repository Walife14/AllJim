type Props = {}

const activeStaff = [
    {
        name: 'Lucas'
    },
    {
        name: 'Katie'
    },
    {
        name: 'Michael'
    },
    {
        name: 'Vince'
    }
]

export default function StaffOverview({ }: Props) {
    return (
        <section>
            <div className="bg-neutral-200 rounded-lg p-4">
                <h2 className="text-center">Active Staff</h2>
                <ul className="divide-y">
                    {activeStaff.map((staff, index) => (
                        <li className="even:bg-neutral-50 px-2 py-1" key={index}>
                            {staff.name}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}