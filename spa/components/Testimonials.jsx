import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">Teams are moving faster</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <figure key={i} className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-soft transition">
            <blockquote className="text-slate-700">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-slate-600">{t.name} • {t.role}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
