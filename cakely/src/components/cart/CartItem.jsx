import { Minus, Plus, Trash2 } from 'lucide-react'
import formatCurrency from '../../utils/formatCurrency'

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="rounded-[24px] border border-rose-100 p-4 bg-white shadow-sm">
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-24 rounded-2xl object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 text-lg leading-snug">
                {item.name}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {item.weight} • {item.flavour} • {item.eggType}
              </p>
            </div>

            <button
              onClick={() => onRemove(item.cartKey)}
              className="text-red-500 hover:text-red-600 shrink-0"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 rounded-full border border-rose-200 px-2 py-2">
              <button
                type="button"
                onClick={() =>
                  onUpdate(item.cartKey, {
                    quantity: Math.max(1, item.quantity - 1)
                  })
                }
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-rose-50"
              >
                <Minus size={16} />
              </button>

              <span className="w-8 text-center font-semibold">{item.quantity}</span>

              <button
                type="button"
                onClick={() =>
                  onUpdate(item.cartKey, {
                    quantity: item.quantity + 1
                  })
                }
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-rose-50"
              >
                <Plus size={16} />
              </button>
            </div>

            <p className="font-bold text-brand-700 whitespace-nowrap text-lg">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}