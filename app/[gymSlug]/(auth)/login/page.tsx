
// components
import LoginForm from "@/app/components/auth/LoginForm"
import Link from "next/link"

type Props = {
    params: Promise<{
        gymSlug: string
    }>
}

export default async function LoginPage({ params }: Props) {
    const { gymSlug: slug } = await params

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="text-center">Login</h1>

            <LoginForm gymSlug={slug} />

            <p>Not yet a member? <Link className="link" href={`/${slug}/join`}>Sign up to join this gym</Link>.</p>
        </div>
    )
}