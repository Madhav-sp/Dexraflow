import { plans } from '../data/plans'

export default function Pricing() {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
      <p className="mt-2 text-slate-600 max-w-2xl">
        Start free. Upgrade when you’re ready.
      </p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.name} className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-soft transition">
            <div className="text-xs px-2 py-1 rounded-full border border-slate-200 inline-flex">{p.name}</div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold">{p.price}</span>
              <span className="text-slate-500">{p.period}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{p.highlight}</p>
            <ul className="mt-4 space-y-2 text-sm list-disc pl-5 text-slate-600">
              {p.features.map((f,i) => <li key={i}>{f}</li>)}
            </ul>
            <a href="#get-started" className="mt-6 btn-primary w-full text-center inline-flex">Choose {p.name}</a>
          </div>
        ))}
      </div>
    </div>
  )
}
