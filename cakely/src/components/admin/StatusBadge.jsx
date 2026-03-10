const variants = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-purple-100 text-purple-700',
  out_for_delivery: 'bg-sky-100 text-sky-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',

  live: 'bg-emerald-100 text-emerald-700',
  sold_out: 'bg-red-100 text-red-700',

  yes: 'bg-brand-100 text-brand-700',
  no: 'bg-slate-100 text-slate-600'
}

function formatLabel(value) {
  return String(value)
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function StatusBadge({ value, label }) {
  const key = String(value || '').toLowerCase()
  const classes = variants[key] || 'bg-slate-100 text-slate-700'

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes}`}>
      {label || formatLabel(value)}
    </span>
  )
}