import Link from "next/link";

type Props = {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {
    return (
        <>
            <nav>
                <div>
                    <Link href="/">AllJim</Link>
                    <ul>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/signup">Sign up</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {children}
        </>
    )
}