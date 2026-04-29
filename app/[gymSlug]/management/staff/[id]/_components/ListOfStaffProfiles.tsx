import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"

type Props = {
    staffAccountId: string
    gymId: string
}

export default async function ListOfStaffProfiles({ staffAccountId, gymId }: Props) {
    const supabase = await createClient()

    const { data: staffProfiles, error: staffProfilesError } = await supabase
        .from('staff_profiles')
        .select('first_name, last_name, pin, created_at')
        .match({ user_id: staffAccountId, gym_id: gymId })

    if (staffProfilesError) {
        return (
            <p className="text-red-500">{staffProfilesError.message}</p>
        )
    }

    const formatdate = (date: string) => {
        return format(new Date(date), 'dd/MM/yyyy, p')
    }


    return (
        <ul className="flex flex-col gap-2 max-w-3xl">
            {staffProfiles.length === 0 ? (
                <li>No staff profiles yet. Add one to see it here.</li>
            ) : staffProfiles.map((profile) => (
                <li key={profile.first_name + profile.last_name} className="grid grid-cols-4 items-center bg-neutral-200 rounded-lg p-2">
                    <span>{profile.first_name}</span>
                    <span>{profile.last_name}</span>
                    <span>{profile.pin}</span>
                    <span>{formatdate(profile.created_at)}</span>
                </li>
            ))}

        </ul>
    )
}