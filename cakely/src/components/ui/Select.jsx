export default function Select({ label, error, children, ...props }) {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <select className="input" {...props}>
        {children}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}