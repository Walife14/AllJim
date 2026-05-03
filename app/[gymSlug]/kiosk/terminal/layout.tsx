import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import CheckInManager from "../components/CheckInManager"
import KioskNav from "../components/KioskNav"

type Props = {
    children: React.ReactNode
    params: Promise<{
        gymSlug: string
    }>
}

// so far this is generally just to check if the person has entered
// a pin and we have a staff profile connected if not back to kiosk

export default async function layout({ children, params }: Props) {
    const { gymSlug } = await params
    const cookieStore = await cookies()
    const supabase = await createClient()

    // get the staff id from cookie
    const activeStaffId = cookieStore.get('active_staff_id')?.value

    // if no cookie, back to PIN entry
    if (!activeStaffId) {
        return redirect(`/${gymSlug}/kiosk`)
    }

    // check whether the staff profile is real for THIS gymError
    const { data: staff, error } = await supabase
        .from('staff_profiles')
        .select('id, first_name')
        .eq('id', activeStaffId)
        .single()

    if (error || !staff) {
        // clear bad cookie in future here if messes with code
        return redirect(`/${gymSlug}/kiosk`)
    }

    return (
        <div className="grid grid-cols-10 h-dvh">
            <div className="col-span-7 overflow-y-auto p-2 flex">
                <KioskNav gymSlug={gymSlug} />
                <div className="pt-2 pl-2 pb-2 flex-1">
                    {children}
                </div>
            </div>
            <div className="col-span-3 bg-neutral-100 p-2 overflow-auto">
                <CheckInManager />
            </div>
        </div>
    )
}