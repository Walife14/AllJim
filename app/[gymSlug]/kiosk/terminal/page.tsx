type Props = {}

export default function TerminalPage({}: Props) {
  return (
    <div>
        {/* Navigation */}
        <ul>
            <li>Current user: User Name</li>
            <li>Home</li>
            <li>Transaction History</li>
            <li>Settings</li>
            <li>Log out</li>
        </ul>
        <div>
            Your terminal home page
        </div>
    </div>
  )
}