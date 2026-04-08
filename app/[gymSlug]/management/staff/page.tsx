type Props = {}

export default function page({ }: Props) {
    return (
        <div>
            <h1>Staff List</h1>

            <section>
                <h2>Invite staff member to register as staff</h2>
                {/* add a role selector button? */}
                {/* perhaps add a timer to the url too, to make it so the url only works a limited time? */}
                <p>By inputting the person&apos;s email below, they will receive a custom
                    link by email to sign up as staff member for your gym.</p>

                <form>
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" name="email" placeholder="Email address" />
                    </div>
                </form>
            </section>

            <section>
                <h2>Staff Directory</h2>
                <ul>
                    <li>Lucas, Smith, Owner, Active</li>
                    <li>Daniel, Tyler, Manager, Active</li>
                    <li>Vincent, Hawkins, Employee, Active</li>
                </ul>
                <p>Dummy data for now*</p>
            </section>

        </div>
    )
}