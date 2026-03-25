"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";


type Props = {}

export default function page({ }: Props) {
    const { gymSlug } = useParams();
    const pathname = usePathname();

    return (
        <div>
            <h1>{ gymSlug }</h1>
            <Link href={`${pathname}/owner`}>Owner Login</Link>
        </div>
    )
}