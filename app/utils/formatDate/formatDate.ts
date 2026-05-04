

// format supabase date to "HH:mm dd/MM/yy"

import { format, parseISO } from "date-fns"

export const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "N/A"

    // get a date object
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString

    // format date
    return format(date, 'HH:mmaaa dd/MM/yy')
}