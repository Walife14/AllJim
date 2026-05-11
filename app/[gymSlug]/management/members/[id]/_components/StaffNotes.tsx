import { createClient } from "@/lib/supabase/server"

// components
import AddStaffNotesButton from "./AddStaffNotesButton"

// utils
import { formatDate } from "@/app/utils/formatDate/formatDate"

type Props = {
    membershipId: string
}

export default async function StaffNotes({ membershipId }: Props) {
    const supabase = await createClient()

    const { data: staffNotes, error: staffNotesError } = await supabase
        .from('membership_notes')
        .select('created_at, category, content, metadata')
        .eq('membership_id', membershipId)

    if (staffNotesError) {
        return (
            <p>had an error fetching the staff notes!</p>
        )
    }

    return (
        <div className="col-span-2 bg-zinc-200 p-4 rounded-lg">
            <h2 className="text-center">Staff Notes</h2>
            <ul className="flex flex-col gap-2">
                {staffNotes ? staffNotes.map((note, index) => (
                    <li key={index} className="flex flex-col p-2 bg-zinc-50 rounded-lg">
                        <p className="p-2 rounded-lg">
                            {note.content}
                        </p>
                        <div className="text-sm flex items-center gap-x-2 px-2 pt-2">
                            <dt>Created By</dt>
                            <dd>{note.metadata.staff_name}</dd>
                            <span>{formatDate(note.created_at)}</span>
                            <span className="bg-amber-500 px-2 py-1 rounded-lg ml-auto text-zinc-50">{note.category}</span>
                        </div>
                    </li>
                )) : (
                    <li>
                        <p>No notes added yet</p>
                    </li>
                )}
            </ul>
            <div className="mt-2 flex justify-center">
                <AddStaffNotesButton membershipId={membershipId} />
            </div>
        </div>
    )
}