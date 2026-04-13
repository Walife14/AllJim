type Props = {}

export default function Contact({ }: Props) {
    return (
        <div className="bg-neutral-200 rounded-lg p-4">
            <h2 className="text-center">Contact Details</h2>
            <div className="grid grid-cols-2 gap-2">
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 text-center bg-white rounded-lg p-2">
                        <p>Email address</p>
                        <span>email@email.com</span>
                    </div>
                    <div className="bg-neutral-600 text-white p-2 text-center rounded-lg">
                        <p>Copy</p>
                    </div>
                    <div className="bg-neutral-600 text-white p-2 text-center rounded-lg">
                        <p>Send email</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 text-center bg-white rounded-lg p-2">
                        <p>Phone number</p>
                        <span>01/07/2026</span>
                    </div>
                    <div className="col-span-2 bg-neutral-600 text-white p-2 text-center rounded-lg">
                        <p>Call</p>
                    </div>
                </div>
            </div>
        </div>
    )
}