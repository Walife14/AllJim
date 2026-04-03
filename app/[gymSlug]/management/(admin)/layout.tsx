// components
import SignOutButton from "@/app/components/auth/signOutButton";
import ManagementNavbar from "@/app/components/management/ManagementNavbar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode;
    params: Promise<{ gymSlug: string }>
}

export default async function layout({ children }: Props) {

    return (
        <div className="flex gap-x-1 h-screen">
            <ManagementNavbar />
            {children}
        </div>
    )
}