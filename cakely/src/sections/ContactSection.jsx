import SectionTitle from '../components/ui/SectionTitle'

export default function ContactSection({ contact }) {
  return (
    <section id="contact" className="py-16 bg-cream">
      <div className="section-wrap">
        <SectionTitle
          eyebrow="Contact"
          title="Order for birthdays, celebrations and special moments"
          subtitle="Pickup and delivery available within 10 km."
        />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-heading text-2xl mb-4">Get in touch</h3>

            <div className="space-y-3 text-slate-700">
              <p><strong>Location:</strong> {contact.location}</p>
              <p><strong>WhatsApp:</strong> {contact.whatsapp}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Delivery Radius:</strong> {contact.deliveryRadius}</p>
              <p><strong>Advance Notice:</strong> {contact.advanceNotice}</p>
              <p><strong>Fulfillment:</strong> {contact.fulfillmentOptions.join(', ')}</p>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-heading text-2xl mb-4">Ordering note</h3>
            <p className="text-slate-600 leading-7">
              Please place your order at least 1 day in advance. For custom theme cakes and
              detailed designs, earlier booking is always better. We’ll confirm flavour, design,
              date and delivery details on WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}