'use client'

import { logoutProfileAction } from "@/app/actions/kiosk/logoutProfileAction"

type Props = {}

export default function LogoutProfileButton({ }: Props) {
  return (
    <button
      className="cursor-pointer"
      onClick={() => logoutProfileAction()}
    >
      Logout
    </button>
  )
}