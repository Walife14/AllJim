// components
import SignOutButton from "@/app/components/auth/signOutButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode;
    params: Promise<{ gymSlug: string }>
}

export default async function layout({ children, params }: Props) {
    const { gymSlug } = await params;
    const supabase = await createClient()

    // validate jwt signature
    const { data, error } = await supabase.auth.getClaims()

    // bounce if token is invalid, expired or missing
    if (error || !data?.claims) {
        redirect(`/${gymSlug}/owner/login`)
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.claims.sub)
        .single()
    
    // to add route block based on the user role

    // if (profile?.role !== 'owner') {
    //     redirect(`/${gymSlug}/member/login`)
    // }

    return (
        <>
            <div>
                {/* Sign out button to be moved to navbar component later? or dashboard? */}
                <SignOutButton gymSlug={gymSlug} route="owner" />
                <p>Welcome back, {profile?.first_name || 'No name found'}</p>
            </div>
            {children}
        </>
    )
}