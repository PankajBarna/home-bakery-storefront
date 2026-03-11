export default function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}) {
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-[0_10px_25px_rgba(223,62,116,0.22)]',
    secondary: 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50',
    dark: 'bg-slate-900 text-white hover:bg-slate-800'
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4.5 py-3 font-medium transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}