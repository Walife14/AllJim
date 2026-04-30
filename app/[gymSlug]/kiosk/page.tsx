type Props = {}

export default function KioskPage({ }: Props) {

    return (
        <div className="h-screen w-screen absolute flex justify-center items-center">
            <div className="min-w-lg bg-neutral-100 p-4 rounded-lg">
                <h1 className="text-center">Terminal Login</h1>
                <ul className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'delete'].map((keypad) => (
                        <li key={keypad} className="aspect-video">
                            <button className="h-full w-full bg-yellow-600 text-white cursor-pointer rounded-lg">{keypad}</button>
                        </li>
                    ))}
                </ul>
                <ul className="mt-2">
                    <li className="text-center underline text-neutral-500 cursor-pointer">Log out of account.</li>
                </ul>
            </div>
        </div>
    )
}