import { useCases } from '../data/usecases'

export default function UseCases() {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">Built for real work</h2>
      <p className="mt-2 text-slate-600 max-w-2xl">
        Practical workflows that save hours every week.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {useCases.map((u) => (
          <div key={u.name} className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-soft transition">
            <div className="text-xs px-2 py-1 rounded-full border border-slate-200 inline-flex">{u.name}</div>
            <h3 className="mt-3 font-semibold">{u.headline}</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5 text-slate-600">
              {u.bullets.map((b,i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
