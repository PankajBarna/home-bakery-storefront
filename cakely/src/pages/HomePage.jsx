import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp'
import CartDrawer from '../components/cart/CartDrawer'
import StickyCartButton from '../components/cart/StickyCartButton'
import ProductModal from '../components/menu/ProductModal'
import useCart from '../hooks/useCart'
import HeroSection from '../sections/HeroSection'
import BestsellersSection from '../sections/BestsellerSection.jsx'
import MenuSection from '../sections/MenuSection'
import OffersSection from '../sections/OffersSection'
import WhyChooseUsSection from '../sections/WhyChooseUsSection'
import ReviewsSection from '../sections/ReviewsSection'
import FAQSection from '../sections/FAQSection'
import ContactSection from '../sections/ContactSection'
import OrderSection from '../sections/OrderSection'
import {
  getOffers,
  getReviews,
  getFaqs,
  getHero,
  getContact,
  getSettings
} from '../api/contentApi'
import { getProducts } from '../api/productsApi'

const fallbackHero = {
  brandName: 'Cakely',
  tagline: 'Sweet moments, baked beautifully.',
  subtitle:
    'Homemade cakes for birthdays, celebrations and special occasions — crafted with soft flavours, elegant finishes and lots of love.',
  whatsapp: '8879878493',
  image:
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80'
}

const fallbackOffers = []
const fallbackReviews = []
const fallbackFaqs = []

const fallbackContact = {
  location: 'Palava Phase 2',
  whatsapp: '8879878493',
  phone: '8879878493',
  deliveryRadius: '10 km',
  advanceNotice: 'Minimum 1 day',
  fulfillmentOptions: ['Pickup', 'Delivery']
}

const fallbackSettings = {
  deliveryRadius: '10 km',
  advanceNotice: 'Minimum 1 day',
  whyChooseUs: [
    'Freshly baked to order',
    'Elegant homemade finish',
    'Custom flavour options',
    'Local delivery convenience'
  ]
}

export default function HomePage() {
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [loading, setLoading] = useState(true)
  const [pageError, setPageError] = useState('')

  const [products, setProducts] = useState([])
  const [offers, setOffers] = useState(fallbackOffers)
  const [reviews, setReviews] = useState(fallbackReviews)
  const [faqs, setFaqs] = useState(fallbackFaqs)
  const [hero, setHero] = useState(fallbackHero)
  const [contact, setContact] = useState(fallbackContact)
  const [settings, setSettings] = useState(fallbackSettings)

  useEffect(() => {
    const loadPageData = async () => {
      try {
        setLoading(true)
        setPageError('')

        const [
          productsData,
          offersData,
          reviewsData,
          faqsData,
          heroData,
          contactData,
          settingsData
        ] = await Promise.all([
          getProducts(),
          getOffers(),
          getReviews(),
          getFaqs(),
          getHero(),
          getContact(),
          getSettings()
        ])

        setProducts(Array.isArray(productsData) ? productsData : [])
        setOffers(Array.isArray(offersData) ? offersData : fallbackOffers)
        setReviews(Array.isArray(reviewsData) ? reviewsData : fallbackReviews)
        setFaqs(Array.isArray(faqsData) ? faqsData : fallbackFaqs)
        setHero(heroData && Object.keys(heroData).length ? heroData : fallbackHero)
        setContact(contactData && Object.keys(contactData).length ? contactData : fallbackContact)
        setSettings(
          settingsData && Object.keys(settingsData).length ? settingsData : fallbackSettings
        )
      } catch (error) {
        setPageError('Could not load storefront data. Showing fallback content.')
        setProducts([])
        setOffers(fallbackOffers)
        setReviews(fallbackReviews)
        setFaqs(fallbackFaqs)
        setHero(fallbackHero)
        setContact(fallbackContact)
        setSettings(fallbackSettings)
      } finally {
        setLoading(false)
      }
    }

    loadPageData()
  }, [])

  const whyChooseUs = useMemo(() => {
    const points = Array.isArray(settings?.whyChooseUs) ? settings.whyChooseUs : []
    return points.map((point) => ({
      title: point,
      description: ''
    }))
  }, [settings])

  const visibleProducts = useMemo(() => products, [products])

  return (
    <div className="min-h-screen bg-rose-50">
      <Navbar />

      {pageError && (
        <div className="section-wrap pt-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-700">{pageError}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="section-wrap py-16">
          <div className="card p-8">
            <p className="text-slate-500">Loading storefront...</p>
          </div>
        </div>
      ) : (
        <>
          <HeroSection hero={{ ...hero, whatsapp: contact.whatsapp || hero.whatsapp }} />
          <BestsellersSection products={visibleProducts} onSelect={setSelectedProduct} />
          <MenuSection products={visibleProducts} onSelect={setSelectedProduct} />
          <OffersSection offers={offers} />
          <WhyChooseUsSection points={whyChooseUs} />
          <ReviewsSection reviews={reviews} />
          <FAQSection faqs={faqs} />
          <ContactSection
            contact={{
              ...contact,
              deliveryRadius: settings.deliveryRadius || contact.deliveryRadius,
              advanceNotice: settings.advanceNotice || contact.advanceNotice
            }}
          />
          <OrderSection
            contact={{
              ...contact,
              deliveryRadius: settings.deliveryRadius || contact.deliveryRadius,
              advanceNotice: settings.advanceNotice || contact.advanceNotice
            }}
          />
          <Footer />
          <FloatingWhatsApp number={contact.whatsapp} />
          <StickyCartButton />
          <CartDrawer />

          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAdd={addToCart}
            />
          )}
        </>
      )}
    </div>
  )
}