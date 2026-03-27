'use client'

import { useState } from 'react'

type Props = {}

export default function Onboarding({ }: Props) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact: {
            phone: '',
            email: '',
        }
    })

    return (
        <div>
            <h1>Gym Onboarding</h1>

            {/* Progress indicator */}

            {/* The current step rendering */}

        </div>
    )
}