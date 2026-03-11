import { useMemo, useState } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import CategoryFilter from '../components/menu/CategoryFilter'
import SearchBar from '../components/menu/SearchBar'
import ProductCard from '../components/menu/ProductCard'
import { getUniqueCategories } from '../utils/helpers'

export default function MenuSection({ products, onSelect }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const categories = useMemo(() => getUniqueCategories(products), [products])

  const filtered = useMemo(() => {
    return products.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory
      const queryMatch = item.name.toLowerCase().includes(query.toLowerCase())
      return categoryMatch && queryMatch
    })
  }, [products, activeCategory, query])

  return (
    <section id="menu" className="py-16">
      <div className="section-wrap">
        <SectionTitle
          eyebrow="Menu"
          title="Choose your perfect cake"
          subtitle="Pick your favourite design, flavour and size. Default prices shown for 1/2 kg where applicable."
        />

        <div className="max-w-md mb-5">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* <div className="grid grid-cols-2 sm:grid-col-2 md:grid-col-1 xl:grid-cols-3 gap-8"> */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}