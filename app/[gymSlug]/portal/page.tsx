import Image from "next/image"

type Props = {}

export default function PortalPage({ }: Props) {
    return (
        <div>
            <h1>GYMNAME</h1>

            <section>
                <h2>Your QR code.</h2>
                {/* TODO: clicking qr code should give it focus ui wise */}
                <div className="relative w-64 h-64 mx-auto">
                    <Image
                        src="/sample-qrcode.png"
                        alt="Gym Access Pass"
                        fill
                        className="object-contain"
                    />
                </div>
            </section>

            <section>
                <h2>Your Stats</h2>
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <p>Visits this week</p>
                        <span className="font-mono">4</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>Visits this Month</p>
                        <span className="font-mono">17</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>Visits this year</p>
                        <span className="font-mono">52</span>
                    </div>
                </div>
            </section>

            <section>
                <h2>News</h2>
                <p>Are you interested in joining pilates class?</p>
                <p>Would you be interested in a new bench press machine? 
                    We have now added a poll to see what machine our visitors want!</p>
            </section>

            <section>
                <h2>Classes</h2>
                <p>No classes yet added for this gym.</p>
            </section>

            <section>
                <h2>Need help?</h2>
                <p>For now you would have to contact the front desk.</p>
            </section>
        </div>
    )
}