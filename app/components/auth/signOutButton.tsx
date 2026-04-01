
interface Props {
    gymSlug?: string;
    route?: 'owner' | 'member';
}

export default function SignOutButton({ gymSlug, route }: Props) {

    let logoutAction = `/auth/signout`

    // if owner concat the gymslug and route
    // const logoutAction = `/auth/signout?next=/${gymSlug}/${route}/login`

    return (
        <form action={logoutAction} method="POST">
            <button
                className="pointer"
                type="submit">
                Sign out
            </button>
        </form>
    )
}