import { onboardingData } from "@/app/actions/onboarding/onboarding"

type Props = {
    onNext: () => void
    update: (fields: Partial<onboardingData>) => void
    addressLine1: string
    addressLine2: string
    addressPost_code: string
    addressCity: string
    addressCountry: string
}

export default function StepGymLocation({ onNext, update, addressLine1, addressLine2, addressPost_code, addressCity, addressCountry }: Props) {

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()

        // check if details are filled in then allow next

        onNext()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="line1">Address line 1</label>
                <input
                    type="text"
                    name="line1"
                    id="line1"
                    placeholder="Address line 1"
                    value={addressLine1}
                    onChange={(e) => update({ addressLine1: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="line2">Address line 2</label>
                <input
                    type="text"
                    name="line2"
                    id="line2"
                    placeholder="Address line 2"
                    value={addressLine2}
                    onChange={(e) => update({ addressLine2: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="postCode">Post code</label>
                <input
                    type="text"
                    name="postCode"
                    id="postCode"
                    placeholder="Post code"
                    value={addressPost_code}
                    onChange={(e) => update({ addressPost_code: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    value={addressCity}
                    onChange={(e) => update({ addressCity: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                    value={addressCountry}
                    onChange={(e) => update({ addressCountry: e.target.value })}
                />
            </div>

            <button type="submit">Finish Onboarding</button>
        </form>
    )
}