'use client'

import { useEffect, useState } from "react"

type Props = {}

export default function keypad({ }: Props) {
  const [pin, setPin] = useState<number[]>([])

  const updatePin = (value: string | number) => {
    if (value === 'delete') {
      return setPin(pin.slice(0, pin.length - 1))
    } else if (pin.length >= 4) {
      return
    } else {
      return setPin([...pin, value as number])
    }
  }

  useEffect(() => {
    if (pin.length === 4) {
      // run server action that checks for user and adds to cookies

    }
  }, [pin])

  return (
    <>
      <div>
        {pin.map((value: number, index: number) => (
          <span key={index}>{value}</span>
        ))}
      </div>
      <ul className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'delete'].map((keypad) => (
          <li key={keypad} className="aspect-video">
            <button
              className="h-full w-full bg-yellow-600 text-white cursor-pointer rounded-lg select-none active:scale-95"
              onClick={() => updatePin(keypad)}
            >{keypad}</button>
          </li>
        ))}
      </ul>
    </>
  )
}