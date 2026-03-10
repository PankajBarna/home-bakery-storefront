import { useEffect, useMemo, useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import Button from '../ui/Button'
import Select from '../ui/Select'
import formatCurrency from '../../utils/formatCurrency'

export default function ProductModal({ product, onClose, onAdd }) {
  const weights = product.weights || ['1/2 kg', '1 kg']
  const flavours = product.flavours || ['Chocolate', 'Vanilla']
  const eggTypes = product.eggTypes || ['Eggless']

  const [weight, setWeight] = useState(weights[0] || '1/2 kg')
  const [flavour, setFlavour] = useState(flavours[0] || 'Chocolate')
  const [eggType, setEggType] = useState(eggTypes[0] || 'Eggless')
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(Number(product.basePrice) || 0)

  useEffect(() => {
    const found = product.weightPrices?.find((item) => item.weight === weight)
    setPrice(found ? Number(found.price) : Number(product.basePrice) || 0)
  }, [weight, product])

  const total = useMemo(() => price * quantity, [price, quantity])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[200] bg-black/55 backdrop-blur-[2px] p-3 sm:p-4 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-[28px] shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[280px] md:min-h-full">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/90 text-slate-700 flex items-center justify-center shadow-md hover:bg-white"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm uppercase tracking-[0.18em] text-rose-100">
                  {product.category}
                </p>
                <h3 className="font-heading text-4xl sm:text-5xl leading-[0.95] mt-2">
                  {product.name}
                </h3>
                <p className="mt-3 text-white/90 leading-7 max-w-md">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8 bg-white">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <p className="text-sm text-slate-500">Starting from</p>
                  <p className="text-3xl font-bold text-brand-700">
                    {formatCurrency(price)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(total)}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <Select label="Choose weight" value={weight} onChange={(e) => setWeight(e.target.value)}>
                  {weights.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>

                <Select label="Choose flavour" value={flavour} onChange={(e) => setFlavour(e.target.value)}>
                  {flavours.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>

                <Select label="Egg / Eggless" value={eggType} onChange={(e) => setEggType(e.target.value)}>
                  {eggTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>

                <div>
                  <label className="label">Quantity</label>
                  <div className="flex items-center justify-between rounded-2xl border border-rose-200 px-3 py-2 bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="h-11 w-11 rounded-full border border-rose-200 flex items-center justify-center text-slate-700 hover:bg-rose-50"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="text-xl font-semibold text-slate-900">{quantity}</span>

                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="h-11 w-11 rounded-full border border-rose-200 flex items-center justify-center text-slate-700 hover:bg-rose-50"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-brand-50 border border-brand-100 p-4">
                  <p className="text-sm text-slate-600 leading-6">
                    Freshly baked to order. Orders require a minimum of 1 day advance notice.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={onClose}
                >
                  Cancel
                </Button>

                <Button
                  className="w-full justify-center"
                  onClick={() => {
                    onAdd({
                      productId: product.id,
                      name: product.name,
                      weight,
                      flavour,
                      eggType,
                      quantity,
                      price,
                      image: product.image
                    })
                    onClose()
                  }}
                >
                  Add to Cart • {formatCurrency(total)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}