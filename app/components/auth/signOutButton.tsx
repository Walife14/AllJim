
interface Props {
    gymSlug: string;
    route: 'owner' | 'member';
}

export default function SignOutButton({ gymSlug, route }: Props) {
    const logoutAction = `/auth/signout?next=/${gymSlug}/${route}/login`

    return (
        <form action={logoutAction} method="POST">
            <button
                className="underline text-blue-700 pointer"
                type="submit">
                Sign out
            </button>
        </form>
    )
}