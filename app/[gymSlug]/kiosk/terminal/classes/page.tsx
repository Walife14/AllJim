import React from 'react'

type Props = {}

export default function ClassesPage({ }: Props) {
    return (
        <div>
            <h1>Classes</h1>
            <section>
                <h2>Create Class</h2>
                <p>Section to create a new class.</p>
            </section>

            <section>
                <h2>Classes Today</h2>
                <p>This will display all of the classes today and their schedule.</p>
            </section>

            <section>
                <h2>Future Classes</h2>
                <p>This will display all of the future classes.</p>
            </section>
        </div>
    )
}