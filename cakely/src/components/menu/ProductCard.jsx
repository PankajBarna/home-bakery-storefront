import Badge from '../ui/Badge'
import Button from '../ui/Button'
import formatCurrency from '../../utils/formatCurrency'

export default function ProductCard({ product, onSelect }) {
  const isAvailable = product.available !== false
  const hasEggless = (product.eggTypes || ['Eggless']).includes('Eggless')

  return (
    <div
      className={`card overflow-hidden group transition duration-300 hover:-translate-y-1 ${
        !isAvailable ? 'opacity-75' : ''
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-52 sm:h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2 min-w-0">
            {product.bestseller && <Badge color="amber">Bestseller</Badge>}
            {!isAvailable && <Badge color="red">Sold Out</Badge>}
          </div>

          <div className="shrink-0">
            {hasEggless ? (
              <Badge color="green">Egg / Eggless</Badge>
            ) : (
              <Badge color="pink">Egg</Badge>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[1.9rem] sm:text-[1.55rem] font-semibold text-slate-900 leading-snug">
              {product.name}
            </h3>
            <p className="text-sm text-slate-500 mt-1">{product.category}</p>
          </div>

          <p className="font-bold text-brand-700 whitespace-nowrap text-lg shrink-0">
            {formatCurrency(Number(product.basePrice) || 0)}
          </p>
        </div>

        <p
          className="text-sm text-slate-600 mt-4 leading-6 min-h-[48px]"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </p>

        <Button
          className="w-full mt-5 justify-center"
          onClick={() => onSelect(product)}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Customize & Add' : 'Currently Sold Out'}
        </Button>
      </div>
    </div>
  )
}