import { ShoppingBag } from 'lucide-react'
import useCart from '../../hooks/useCart'

export default function StickyCartButton() {
  const { cartCount, setIsCartOpen } = useCart()

  if (!cartCount) return null

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="md:hidden fixed bottom-5 left-4 z-[60] bg-slate-900 text-white rounded-full px-5 py-3 shadow-lg flex items-center gap-2"
    >
      <ShoppingBag size={18} />
      Cart ({cartCount})
    </button>
  )
}