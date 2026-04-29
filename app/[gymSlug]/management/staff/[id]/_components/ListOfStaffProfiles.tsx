import { createClient } from "@/lib/supabase/server"

type Props = {
    id: string
}

export default async function ListOfStaffProfiles({ id }: Props) {
    const supabase = await createClient()

    

    return (
        <div>ListOfStaffProfiles</div>
    )
}