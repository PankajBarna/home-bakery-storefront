import { useEffect } from 'react'
import Button from './Button'

export default function SuccessModal({
  open,
  onClose,
  title = 'Order saved successfully',
  message = 'Your order has been saved. Continue on WhatsApp to send it to the bakery.',
  actionHref = '',
  actionLabel = 'Continue on WhatsApp'
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

  return (
    <div className="fixed inset-0 z-[250]">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-[28px] bg-white border border-rose-100 shadow-2xl p-6 sm:p-7">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center mb-4">
              <span className="text-2xl">✓</span>
            </div>

            <h3 className="font-heading text-3xl text-slate-900">{title}</h3>
            <p className="text-slate-600 mt-3 leading-7">{message}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {actionHref && (
              <a
                href={actionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3.5 font-medium transition duration-200 bg-brand-600 text-white hover:bg-brand-700 shadow-[0_10px_25px_rgba(223,62,116,0.22)]"
              >
                {actionLabel}
              </a>
            )}

            <Button
              variant="secondary"
              className="w-full justify-center"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}