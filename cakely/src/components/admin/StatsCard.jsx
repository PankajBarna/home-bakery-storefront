export default function StatsCard({
  label,
  value,
  helper = '',
  tone = 'default'
}) {
  const toneMap = {
    default: 'bg-white border-rose-100',
    warning: 'bg-amber-50 border-amber-200',
    info: 'bg-sky-50 border-sky-200',
    success: 'bg-emerald-50 border-emerald-200'
  }

  return (
    <div className={`card p-5 md:p-6 border ${toneMap[tone]}`}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 mt-3">
        {value}
      </h3>
      {helper ? <p className="text-sm text-slate-500 mt-2">{helper}</p> : null}
    </div>
  )
}