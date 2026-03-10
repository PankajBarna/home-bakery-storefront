export default function Input({ label, error, className = '', ...props }) {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <input className={`input ${className}`} {...props} />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}