import Link from "next/link"

type Props = {}

interface FooterLink {
    name: string
    href: string
}

const footerLinks: FooterLink[] = [
    { name: 'Sign up', href: '/signup' },
    { name: 'Login', href: '/login' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms and Conditions', href: '/terms-and-conditions ' }
]

export default function Footer({ }: Props) {
    return (
        <footer className="bg-zinc-900 text-zinc-50 p-2 mt-10">
            <div className="max-w-5xl mx-auto divide-y divide-solid divide-zinc-50 flex flex-col">
                <div className="pb-4 grid grid-cols-2">
                    <div>
                        <h3 className="text-zinc-50">AllJim</h3>
                        <p>Gym management shouldn&apos;t be difficult.</p>
                    </div>
                    <div>
                        <h3 className="text-zinc-50">Quick Links</h3>
                        <ul className="grid grid-cols-2 gap-2">
                            {footerLinks.map((link: FooterLink, index: number) => (
                                <li key={index}>
                                    <Link href={link.href}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="text-xs p-2">&copy; Lucas Roncolato 2026 • Built with Next.js/Supabase</p>
            </div>
        </footer>
    )
}