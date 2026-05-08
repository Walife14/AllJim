type Props = {}

export default function MarketingPage({}: Props) {
  return (
    <>
        <h1>Marketing</h1>
        <p className="text-red-500 text-2xl">TO BE IMPLEMENTED</p>
        <h2>Features will include</h2>
        <ul>
            <li>Send out emails to active members.</li>
            <li>Send out emails to inactive members.</li>
            <li>Send out text messages to members about events or other news.</li>
            <li>Filter message sent to members by their activity. As an example members who have attended 50 days out of the last 70.</li>
        </ul>
    </>
  )
}