export default function Badge({ children, color = 'pink' }) {
  const map = {
    pink: 'bg-brand-100 text-brand-700',
    green: 'bg-emerald-100 text-emerald-700',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-700'
  }

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${map[color]}`}>
      {children}
    </span>
  )
}