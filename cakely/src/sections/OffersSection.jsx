import SectionTitle from '../components/ui/SectionTitle'

export default function OffersSection({ offers }) {
  return (
    <section id="offers" className="py-16 bg-white">
      <div className="section-wrap">
        <SectionTitle
          eyebrow="Sweet Deals"
          title="Current offers"
          subtitle="Freshly baked goodness with special savings."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="card p-6 bg-gradient-to-br from-rose-50 to-pink-50"
            >
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
                {offer.badge}
              </p>
              <h3 className="font-heading text-2xl mt-2">{offer.title}</h3>
              <p className="text-slate-600 mt-3">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}