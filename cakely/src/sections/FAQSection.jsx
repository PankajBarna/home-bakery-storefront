import SectionTitle from '../components/ui/SectionTitle'

export default function FAQSection({ faqs }) {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="section-wrap">
        <SectionTitle
          eyebrow="FAQ"
          title="Questions customers usually ask"
          subtitle="Everything you need to know before placing your order."
        />

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.id} className="card p-5">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {faq.question}
                <span className="text-brand-600">+</span>
              </summary>
              <p className="text-slate-600 mt-3">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}