'use client'

import { useState } from 'react'
import { onboardGymAction, onboardingData } from '../actions/onboarding/onboarding'

// components
import StepGymIdentity from '../components/onboarding/StepGymIdentity'
import StepGymLocation from '../components/onboarding/StepGymLocation'

type Props = {}

export default function Onboarding({ }: Props) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<onboardingData>({
        gymName: '',
        gymSlug: '',
        addressLine1: '',
        addressLine2: '',
        addressPost_code: '',
        addressCity: '',
        addressCountry: ''
    })

    const nextStep = async (): Promise<void> => {

        // check what the step is to determine whether or not we need to send the request to the server already

        // current number of steps 2

        if (step !== 2) {
            setStep(step + 1)
        } else {
            // set loading to true

            const result = await onboardGymAction(formData)

            if (result?.error) {
                // set loading false
                console.log(result.error)
                // tell user theres an error
            }
        }
    }

    const updateFields = (fields: Partial<onboardingData>): void => {
        setFormData((prev) => ({
            ...prev,
            ...fields
        }))
    }

    const renderStep = (currentStep: number) => {
        switch (currentStep) {
            case 1:
                return <StepGymIdentity onNext={nextStep} update={updateFields} gymName={formData.gymName} gymSlug={formData.gymSlug} />
            case 2:
                return <StepGymLocation onNext={nextStep} update={updateFields} addressLine1={formData.addressLine1} addressLine2={formData.addressLine2} addressPost_code={formData.addressPost_code} addressCity={formData.addressCity} addressCountry={formData.addressCountry} />
            default:
                return null;
        }
    }

    return (
        <div>
            <h1>Gym Onboarding</h1>

            {/* Progress indicator */}

            {/* The current step rendering */}
            {renderStep(step)}

        </div>
    )
}