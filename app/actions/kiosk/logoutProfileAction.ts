'use server'

import { cookies } from "next/headers";

export async function logoutProfileAction() {
    const cookieStore = await cookies()

    cookieStore.delete('active_staff_id')
}