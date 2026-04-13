type Props = {}

export default function MembershipStatus({ }: Props) {
    return (
        <div className="bg-neutral-200 rounded-lg p-4">
            <h2 className="text-center">Membership Status</h2>
            <div className="grid grid-cols-2 gap-2">
                <div className="text-center bg-white rounded-lg p-2">
                    <p>Membership Status</p>
                    <span>Active</span>
                </div>
                <div className="text-center bg-white rounded-lg p-2">
                    <p>Membership Expiration</p>
                    <span>01/07/2026</span>
                </div>
                <div className="col-span-2 bg-white rounded-lg p-2">
                    <p>Membership Quick Edits</p>
                    <ul className="flex gap-2">
                        <li>
                            <button className="bg-green-400 p-2 rounded-lg" disabled>+1 Month</button>
                        </li>
                        <li>
                            <button className="bg-green-400 p-2 rounded-lg" disabled>+3 Months</button>
                        </li>
                        <li>
                            <button className="bg-green-400 p-2 rounded-lg" disabled>+1 Year</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}