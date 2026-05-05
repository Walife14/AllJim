import SignOutButton from "@/app/components/auth/signOutButton"

type Props = {}

export default function Settings({ }: Props) {
  return (
    <div>
      <h1>Settings</h1>

      <div className="flex flex-col items-start">
        <p>To log out of your account, click the button below:</p>

        <SignOutButton mode="light" />
      </div>

    </div>
  )
}