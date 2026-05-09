import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import { KeyRound, Trash2, UserRoundKey, UserRoundPen } from "lucide-react"

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
        <ul className="grid grid-cols-6 gap-4">
            {staffProfiles.length === 0 ? (
                <li>No staff profiles yet. Add one to see it here.</li>
            ) : staffProfiles.map((profile) => (
                <li key={profile.first_name + profile.last_name} className="flex flex-col gap-y-2 bg-zinc-50 p-4 rounded-lg">
                    <div className="flex gap-x-2">
                        <UserRoundKey />
                        <span>{profile.first_name} {profile.last_name}</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <KeyRound />
                        <span>{profile.pin}</span>
                    </div>
                    {/* for the created at perhaps create a button that reveals more metadata type of information and display it */}
                    {/* <span className="text-sm ml-auto">{formatdate(profile.created_at)}</span>  */}
                    <ul className="flex justify-end gap-2">
                        <li>
                            <Trash2 />
                        </li>
                        <li>
                            <UserRoundPen />
                        </li>
                    </ul>
                </li>
            ))}

        </ul>
    )
}