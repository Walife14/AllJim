type Props = {
    email: string
    phone: string
}

export default function Contact({ email, phone }: Props) {
    return (
        <div className="bg-neutral-200 rounded-lg p-4">
            <h2 className="text-center">Contact Details</h2>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                    <div className="col-span-2 text-center bg-white rounded-lg p-2">
                        <dt className="text-sm">Email address</dt>
                        <dd className="font-bold">{email}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="open-btn" disabled>Copy</button>
                        <button className="open-btn" disabled>Send Email</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 text-center bg-white rounded-lg p-2">
                        <dt className="text-sm">Phone number</dt>
                        <dd className="font-bold">{phone ? phone : 'No phone number added'}</dd>
                    </div>
                    <button className="open-btn" disabled>Copy</button>
                    <button className="open-btn" disabled>Call</button>
                </div>
            </div>
        </div>
    )
}