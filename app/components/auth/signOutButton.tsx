
interface Props {
    gymSlug?: string;
    route?: 'owner' | 'member';
    mode: 'light' | 'dark'
}

export default function SignOutButton({ gymSlug, route, mode }: Props) {

    let logoutAction = `/auth/signout`

    // if owner concat the gymslug and route
    // const logoutAction = `/auth/signout?next=/${gymSlug}/${route}/login`

    return (
        <form action={logoutAction} method="POST">
            <button
                className={`cursor-pointer px-4 py-2 rounded-lg active:scale-95 transition-all duration-100 uppercase
                        ${mode === 'light' && 'bg-zinc-50 text-zinc-900 hover:bg-zinc-200'}
                        ${mode === 'dark' && 'bg-zinc-900 text-zinc-50 hover:bg-zinc-700'}
                    `}
                type="submit"
            >
                Sign out
            </button>
        </form>
    )
}