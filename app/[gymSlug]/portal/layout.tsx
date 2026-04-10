type Props = {
    children: React.ReactNode
    params: Promise<{
        gymSlug: string
    }>
}

export default async function layout({ children, params }: Props) {
    const { gymSlug: slug } = await params

    // TODO: grab user

    // TODO: no user redirect back to login

    // TODO: check whether they are part of the current gym route

    // TODO: not part of gym return and redirect to join

    return (
        <>
            {/* TODO: navbar */}
            <main>
                {children}
            </main>
        </>
    )
}