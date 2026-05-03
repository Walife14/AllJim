'use client'

import { logoutProfileAction } from "@/app/actions/kiosk/logoutProfileAction"

type Props = {}

export default function LogoutProfileButton({}: Props) {
  return (
    <button
        onClick={() => logoutProfileAction()}
    >
        Logout
    </button>
  )
}