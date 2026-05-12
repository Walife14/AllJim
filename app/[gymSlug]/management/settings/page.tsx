import SignOutButton from "@/app/components/auth/signOutButton"

type Props = {}

export default function Settings({ }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-zinc-200 rounded-lg p-4">
        <h1>Settings</h1>
      </div>

      <section className="bg-zinc-200 rounded-lg p-4">
        <h2>FAQ</h2>
        <p className="text-red-500">TO BE IMPLEMENTED</p>
      </section>

      <section className="p-4 flex flex-col gap-2 bg-zinc-200 rounded-lg">
        <p className="text-sm">To sign out of your account, click the button below.</p>
        <SignOutButton mode="dark" />
      </section>

    </div>
  )
}