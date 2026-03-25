
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)

    // get the redirect path from the url, default to '/'
    const next = searchParams.get('next') ?? '/'

    // check if a user's logged in
    const { data: claimsData } = await supabase.auth.getClaims()

    if(claimsData?.claims) {
        await supabase.auth.signOut()
    }

    revalidatePath('/', 'layout')

    return NextResponse.redirect(new URL(next, req.url), {
        status: 302,
    })
}