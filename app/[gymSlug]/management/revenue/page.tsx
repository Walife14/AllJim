type Props = {}

export default function Revenue({ }: Props) {
  return (
    <div>
      <h1>Revenue</h1>

      {/* filter component to toggle from graphical to compact text view */}

      <section>
        <h2>Monthly Revenue Overview &#40;April 2026&#41;</h2>

        <ul className="flex flex-col gap-y-3 divide-y-2">
          <li>
            Total Collected: <span className="font-mono">&pound;2,450.00</span>
          </li>
          <li>
            Expected Total: <span className="font-mono">&pound;3,100.00</span>
          </li>
          <li>
            Collection Progress: <span className="font-mono">79%</span>
          </li>
          <li>
            Outstanding/Failed: <span className="font-mono">&pound;650.00</span> &#40;12 members&#41;
          </li>
        </ul>
      </section>

      <section>
        <h2>Membership Breakdown</h2>

        <ul className="flex flex-col gap-y-3 divide-y-2">
          <li>
            Tier 1 &#40;&pound;2/mo&#41;: 184 Members &mdash; <span className="font-mono">&pound;368.00</span>
          </li>
          <li>
            Tier 2 &#40;&pound;10/mo&#41;: 45 Members &mdash; <span className="font-mono">&pound;450.00</span>
          </li>
        </ul>
      </section>

      <section>
        <h2>Till Revenue</h2>

        <ul className="flex flex-col gap-y-3 divide-y-2">
          <li>
            Water &#40;500ml&#41;: 112 sold &mdash; <span className="font-mono">&pound;168.00</span>
          </li>
          <li>
            Protein Shakes: 45 sold &mdash; <span className="font-mono">&pound;135.00</span>
          </li>
        </ul>
      </section>
    </div>
  )
}