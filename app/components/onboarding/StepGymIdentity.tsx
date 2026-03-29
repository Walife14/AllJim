import { onboardingData } from "@/app/actions/onboarding/onboarding"

type Props = {
    onNext: () => void
    update: (fields: Partial<onboardingData>) => void
    gymName: string
    gymSlug: string
}

export default function StepGymIdentity({ onNext, update, gymName, gymSlug }: Props) {

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()

        // check if form inputs are correct then allow next

        onNext()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Gym Name</label>
                <input
                    type="text"
                    id="gymName"
                    name="gymName"
                    placeholder="Gym name"
                    value={gymName}
                    onChange={(e) => update({ gymName: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="slug">Gym Slug</label>
                {/* Add information box explaining what this is */}
                <input
                    type="text"
                    id="gymSlug"
                    name="gymSlug"
                    placeholder="Gym slug"
                    value={gymSlug}
                    onChange={(e) => update({ gymSlug: e.target.value })}
                />
            </div>


            <button type="submit">Continue</button>
        </form>
    )
}