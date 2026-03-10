import SectionTitle from '../components/ui/SectionTitle'

export default function WhyChooseUsSection({ points }) {
  return (
    <section className="py-16 bg-cream">
      <div className="section-wrap">
        <SectionTitle
          eyebrow="Why Cakely"
          title="Baked with love, styled with care"
          subtitle="A warm homemade experience with a premium finish."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, index) => (
            <div key={index} className="card p-6">
              <div className="h-12 w-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-4">
                {index + 1}
              </div>

              <h3 className="font-semibold text-lg">{point.title}</h3>
              <p className="text-slate-600 mt-2">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}