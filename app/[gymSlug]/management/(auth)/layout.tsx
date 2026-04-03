import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

type Props = {
    children: React.ReactNode,
    params: Promise<{ gymSlug: string }>
}

export default async function layout({ children, params }: Props) {
    const { gymSlug } = await params
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getClaims()

    if (!(error || !data?.claims)) {
        redirect(`/${gymSlug}/owner/dashboard`)
    }

    return <>{children}</>
}