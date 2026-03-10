import { MessageCircle } from 'lucide-react'

export default function FloatingWhatsApp({ number }) {
  return (
    <a
      href={`https://wa.me/91${number}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center hover:scale-105 transition"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  )
}