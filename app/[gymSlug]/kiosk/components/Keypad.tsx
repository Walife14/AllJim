'use client'

import { staffProfileLoginAction, staffProfileLoginResponse } from "@/app/actions/kiosk/staffProfileLogin"
import { startTransition, useActionState, useEffect, useState } from "react"

type Props = {
  gymSlug: string
}

const initialState: staffProfileLoginResponse = {}

export default function keypad({ gymSlug }: Props) {
  const [pin, setPin] = useState<string>('')
  const [state, formAction, isPending] = useActionState(staffProfileLoginAction, initialState)

  const updatePin = (value: string) => {
    if (value === 'delete') {
      state.error = ''
      return setPin(pin.slice(0, -1))
    } else if (pin.length >= 4) {
      return
    } else {
      return setPin(pin.concat(value))
    }
  }

  useEffect(() => {
    if (pin.length === 4) {
      // run server action that checks for user and adds to cookies
      const formData = new FormData()
      formData.append('pin', pin)
      formData.append('gymSlug', gymSlug)

      startTransition(() => {
        formAction(formData)
      })
    }

  }, [pin, formAction])

  return (
    <div className="flex flex-col gap-y-2">
      <div className="p-4 bg-zinc-50 rounded-lg grid grid-cols-4 place-items-center">
        <strong>{pin.length >= 1 ? pin[0] : '-'}</strong>
        <strong>{pin.length >= 2 ? pin[1] : '-'}</strong>
        <strong>{pin.length >= 3 ? pin[2] : '-'}</strong>
        <strong>{pin.length === 4 ? pin[3] : '-'}</strong>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'delete'].map((keypad: string) => (
          <li key={keypad} className="aspect-video">
            <button
              className="h-full w-full bg-zinc-900 text-zinc-50 cursor-pointer rounded-lg select-none active:scale-95"
              onClick={() => updatePin(keypad)}
              disabled={isPending}
            >{keypad}</button>
          </li>
        ))}
      </ul>
      {state.error && <p className="text-red-500 text-center">{state.error}</p>}
    </div>
  )
}