import { integrations } from '../data/integrations'

function Logo({ name }) {
  return (
    <div className="h-12 w-28 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:shadow-soft transition">
      <span className="font-semibold text-slate-700">{name}</span>
    </div>
  )
}

export default function Integrations() {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">Works with your stack</h2>
      <p className="mt-2 text-slate-600 max-w-2xl">
        Connect Dexraflow to the tools your team already uses.
      </p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {integrations.map((i) => <Logo key={i.key} name={i.name} />)}
      </div>

      <div className="mt-6 text-sm text-slate-500">
        More coming soon: Jira, Confluence, Zendesk, Asana.
      </div>
    </div>
  )
}
