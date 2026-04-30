'use client'

import { generateSecureQRToken } from "@/app/actions/members/qr-actions"
import { useEffect, useState } from "react"
import { QRCodeSVG } from 'qrcode.react'

type Props = {}

export default function PassDisplay({ }: Props) {
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const getNewPass = async () => {
        try {
            const newToken = await generateSecureQRToken()
            setToken(newToken)
            setError(null)
        } catch (err: any) {
            setError(err.message || "Failed to load pass.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // get token on loadup
        getNewPass()

        // refresh it every 45s
        const interval = setInterval(getNewPass, 45000)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {loading && !token ? (
                <span>Generating...</span>
            ) : error ? (
                <>
                    <p>Access Denied</p>
                    <p>{error}</p>
                </>
            ) : (
                <div className="bg-white p-8 rounded-lg">
                    <QRCodeSVG
                        value={token!}
                        size={220}
                        level="H"
                    />
                </div>
            )}
        </>
    )
}