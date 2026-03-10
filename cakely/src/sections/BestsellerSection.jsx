import SectionTitle from '../components/ui/SectionTitle'
import ProductCard from '../components/menu/ProductCard'

export default function BestsellersSection({ products, onSelect }) {
  const bestsellers = products
    .filter((item) => item.bestseller && item.available)
    .slice(0, 4)

  return (
    <section className="py-16 bg-cream">
      <div className="section-wrap">
        <SectionTitle
          eyebrow="Most Loved"
          title="Our bestselling cakes"
          subtitle="Popular picks customers keep coming back for."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {bestsellers.map((item) => (
            <ProductCard key={item.id} product={item} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  )
}