import { ShoppingBag } from 'lucide-react'
import Button from '../ui/Button'
import CartItem from './CartItem'
import formatCurrency from '../../utils/formatCurrency'
import useCart from '../../hooks/useCart'

export default function CartDrawer() {
  const {
    cartItems,
    removeCartItem,
    updateCartItem,
    total,
    isCartOpen,
    setIsCartOpen
  } = useCart()

  return (
    <div className={`fixed inset-0 z-[190] ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-rose-100 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-2xl font-heading text-slate-900">Your Cart</h3>
            <p className="text-sm text-slate-500">Review your selected cakes</p>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </div>

        <div className="p-5 space-y-4 h-[calc(100%-190px)] overflow-y-auto bg-rose-50">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-[28px] border border-rose-100 p-8 text-center shadow-sm">
              <div className="h-16 w-16 mx-auto rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mb-4">
                <ShoppingBag size={26} />
              </div>
              <p className="font-semibold text-slate-900 text-lg">Your cart is empty</p>
              <p className="text-slate-500 text-sm mt-2 leading-6">
                Add your favourite cakes from the menu and continue to order on WhatsApp.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.cartKey}
                item={item}
                onRemove={removeCartItem}
                onUpdate={updateCartItem}
              />
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-rose-100 bg-white">
          <div className="rounded-[24px] bg-brand-50 border border-brand-100 p-4 mb-4">
            <div className="flex items-center justify-between">
              <p className="text-slate-600">Total Amount</p>
              <p className="text-2xl font-bold text-brand-700">
                {formatCurrency(total)}
              </p>
            </div>
          </div>

          <Button
            className="w-full justify-center"
            onClick={() => {
              document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
              setIsCartOpen(false)
            }}
          >
            Continue to Order
          </Button>
        </div>
      </div>
    </div>
  )
}