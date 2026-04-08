
// components
import LoginForm from "@/app/components/auth/LoginForm"

type Props = {
    params: Promise<{
        gymSlug: string
    }>
}

export default async function LoginPage({ params }: Props) {
    const { gymSlug: slug } = await params

    return (
        <div>
            <h2>Login</h2>
            
            <LoginForm gymSlug={slug} />
        </div>
    )
}