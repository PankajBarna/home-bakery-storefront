import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function AdminModal({
  open,
  onClose,
  title,
  subtitle = '',
  children,
  size = 'md'
}) {
  useEffect(() => {
    if (!open) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const sizeMap = {
    sm: 'max-w-lg',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  }

  return (
    <div className="fixed inset-0 z-[220]">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="absolute inset-0 overflow-y-auto p-3 sm:p-5">
        <div className="min-h-full flex items-center justify-center">
          <div
            className={`relative w-full ${sizeMap[size]} rounded-[28px] bg-white shadow-2xl border border-rose-100 overflow-hidden`}
          >
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-rose-100 px-5 sm:px-6 py-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-heading text-3xl text-slate-900 leading-none">
                  {title}
                </h3>
                {subtitle ? (
                  <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="h-11 w-11 shrink-0 rounded-full border border-rose-200 bg-white text-slate-600 flex items-center justify-center hover:bg-rose-50 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(100vh-120px)] overflow-y-auto px-5 sm:px-6 py-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}