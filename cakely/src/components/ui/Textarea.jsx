export default function Textarea({ label, error, className = '', ...props }) {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <textarea className={`input min-h-[140px] ${className}`} {...props} />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}