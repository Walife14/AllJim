
// components
import Keypad from "./components/Keypad"

type Props = {}

export default function KioskPage({ }: Props) {

    return (
        <div className="h-screen w-screen absolute flex justify-center items-center">
            <div className="md:min-w-lg bg-neutral-100 p-4 rounded-lg">
                <h1 className="text-center">Terminal Login</h1>
                <Keypad />
                <ul className="mt-2">
                    <li className="text-center underline text-neutral-500 cursor-pointer">Log out of account.</li>
                </ul>
            </div>
        </div>
    )
}