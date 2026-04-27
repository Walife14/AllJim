import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"

// components
import AddStaffNotesButton from "./AddStaffNotesButton"

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

    function formatDate(date: string) {
        return format(new Date(date), 'dd/MM/yyyy')
    }

    return (
        <div className="col-span-2 bg-neutral-200 p-4 rounded-lg">
            <h2 className="text-center">Staff Notes</h2>
            <ul className="flex flex-col gap-1">
                {staffNotes ? staffNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2 not-odd:bg-neutral-50/50 p-2">
                        <div className="text-end text-sm">
                            <p>Created by {note.metadata.staff_name}</p>
                            <p>On {note.metadata.entry_point}</p>
                            <p>{formatDate(note.created_at)}</p>
                        </div>
                        <p className="bg-orange-500 text-white p-2 flex rounded-lg">{note.category}</p>
                        <p className="bg-white p-2 rounded-lg">
                            {note.content}
                        </p>
                    </li>
                )) : (
                    <li>No notes added yet</li>
                )}
            </ul>
            <div className="mt-2 flex justify-center">
                <AddStaffNotesButton membershipId={membershipId} />
            </div>
        </div>
    )
}