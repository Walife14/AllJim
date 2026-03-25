
// components
import SignOutButton from "@/app/components/auth/signOutButton";


type Props = {
    children: React.ReactNode;
    params: Promise<{ gymSlug: string }>
}

export default async function layout({ children, params }: Props) {
    const { gymSlug } = await params;

    return (
        <>
            <div>
                {/* Sign out button to be moved to navbar component later? or dashboard? */}
                <SignOutButton gymSlug={gymSlug} route="owner" />
            </div>
            {children}
        </>
    )
}