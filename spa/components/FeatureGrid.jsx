import { features } from '../data/features'
import * as Icons from 'lucide-react'

export default function FeatureGrid() {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">What Dexraflow does best</h2>
      <p className="mt-2 text-slate-600 max-w-2xl">
        Turn scattered files and tools into a single source of truth you can ask and automate.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => {
          const Icon = Icons[f.icon] ?? Icons["Sparkles"]
          return (
            <div key={f.title} className="rounded-2xl bg-white border border-slate-200 p-5 hover:shadow-soft transition">
              <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
