import { Menu } from "lucide-react"
import Link from "next/link"

type Props = {
    gymSlug: string
    gymName: string
}

export default function PortalNavbar({ gymSlug, gymName }: Props) {
    return (
        <nav className="bg-zinc-900 p-2">
            <div className=" flex justify-between items-center text-zinc-50">
                <Link className="text-2xl font-semibold" href={`/${gymSlug}/portal`}>{gymName}</Link>
                <Menu />
            </div>
        </nav>
    )
}