import { CakeSlice, ShoppingBag } from 'lucide-react'
import { NAV_LINKS } from '../../constants/config'
import Button from '../ui/Button'
import useCart from '../../hooks/useCart'

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart()

  return (
    <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur border-b border-rose-100">
      <div className="section-wrap h-[72px] flex items-center justify-between gap-3">
        <a href="#hero" className="flex items-center gap-3 min-w-0">
          <div className="h-12 w-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
            <CakeSlice size={20} />
          </div>

          <div className="min-w-0">
            <p className="font-heading text-[1.9rem] leading-none text-slate-900 truncate">
              Cakely
            </p>
            <p className="text-sm text-slate-500 leading-none mt-1 truncate">
              Palava Phase 2
            </p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-brand-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          className="gap-2 shrink-0 px-4 py-3 sm:px-5"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingBag size={18} />
          <span>Cart ({cartCount})</span>
        </Button>
      </div>
    </header>
  )
}