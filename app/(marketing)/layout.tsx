import { getUserProfileAction } from "../actions/auth/get-user";

// components
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { createClient } from "@/lib/supabase/server";

type Props = {
    children: React.ReactNode;
}

export default async function MarketingLayout({ children }: Props) {
    const supabase = await createClient()

    // const { data: gym } = await getCurrentUserGymAction()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <>
            <Navbar hasUser={user ? true : false} /> 
            <main className="max-w-screen overflow-hidden">
                {children}
            </main>
            <Footer />
        </>
    )
}