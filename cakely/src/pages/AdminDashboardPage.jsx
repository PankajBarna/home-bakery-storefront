import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'
import EntityForm from '../components/admin/EntityForm'
import EntityTable from '../components/admin/EntityTable'
import OrdersTable from '../components/admin/OrdersTable'
import AdminModal from '../components/admin/AdminModal'
import ConfirmModal from '../components/admin/ConfirmModal'
import ProductForm from '../components/admin/ProductForm'
import StatsCard from '../components/admin/StatsCard'
import Button from '../components/ui/Button'
import useAdminAuth from '../hooks/useAdminAuth'
import { getOrders, updateOrderStatus } from '../api/ordersApi'
import {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getHero,
  updateHero,
  getContact,
  updateContact,
  getSettings,
  updateSettings
} from '../api/contentApi'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../api/productsApi'

const initialProduct = {
  name: '',
  category: '',
  basePrice: '',
  image: '',
  description: '',
  weightPrices: [{ weight: '1/2 kg', price: '' }],
  flavours: ['Chocolate'],
  eggTypes: ['Eggless'],
  available: true,
  bestseller: false
}

const initialOffer = {
  title: '',
  badge: '',
  description: ''
}

const initialReview = {
  name: '',
  subtitle: '',
  location: '',
  rating: '',
  text: ''
}

const initialFaq = {
  question: '',
  answer: ''
}

const initialHero = {
  brandName: '',
  tagline: '',
  subtitle: '',
  image: '',
  whatsapp: ''
}

const initialContact = {
  location: '',
  whatsapp: '',
  phone: '',
  deliveryRadius: '',
  advanceNotice: ''
}

const initialSettings = {
  deliveryRadius: '',
  advanceNotice: '',
  whyChooseUs: ''
}

export default function AdminDashboardPage() {
  const { isLoggedIn } = useAdminAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('dashboard')

  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [ordersError, setOrdersError] = useState('')

  const [products, setProducts] = useState([])
  const [offers, setOffers] = useState([])
  const [reviews, setReviews] = useState([])
  const [faqs, setFaqs] = useState([])

  const [productForm, setProductForm] = useState(initialProduct)
  const [offerForm, setOfferForm] = useState(initialOffer)
  const [reviewForm, setReviewForm] = useState(initialReview)
  const [faqForm, setFaqForm] = useState(initialFaq)
  const [heroForm, setHeroForm] = useState(initialHero)
  const [contactForm, setContactForm] = useState(initialContact)
  const [settingsForm, setSettingsForm] = useState(initialSettings)

  const [contentLoading, setContentLoading] = useState(true)
  const [contentError, setContentError] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false)

  const [editingProductId, setEditingProductId] = useState(null)
  const [editingOfferId, setEditingOfferId] = useState(null)
  const [editingReviewId, setEditingReviewId] = useState(null)
  const [editingFaqId, setEditingFaqId] = useState(null)

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteConfig, setDeleteConfig] = useState({
    type: '',
    id: '',
    title: '',
    message: ''
  })

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setOrdersLoading(true)
        setOrdersError('')
        const data = await getOrders()
        setOrders(data)
      } catch (err) {
        setOrdersError(err?.response?.data?.message || 'Could not load orders')
      } finally {
        setOrdersLoading(false)
      }
    }

    if (isLoggedIn) {
      loadOrders()
    }
  }, [isLoggedIn])

  useEffect(() => {
    const loadContent = async () => {
      try {
        setContentLoading(true)
        setContentError('')

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
        setOffers(Array.isArray(offersData) ? offersData : [])
        setReviews(Array.isArray(reviewsData) ? reviewsData : [])
        setFaqs(Array.isArray(faqsData) ? faqsData : [])

        setHeroForm({
          brandName: heroData?.brandName || '',
          tagline: heroData?.tagline || '',
          subtitle: heroData?.subtitle || '',
          image: heroData?.image || '',
          whatsapp: heroData?.whatsapp || ''
        })

        setContactForm({
          location: contactData?.location || '',
          whatsapp: contactData?.whatsapp || '',
          phone: contactData?.phone || '',
          deliveryRadius: contactData?.deliveryRadius || '',
          advanceNotice: contactData?.advanceNotice || ''
        })

        setSettingsForm({
          deliveryRadius: settingsData?.deliveryRadius || '',
          advanceNotice: settingsData?.advanceNotice || '',
          whyChooseUs: Array.isArray(settingsData?.whyChooseUs)
            ? settingsData.whyChooseUs.join(', ')
            : ''
        })
      } catch (err) {
        setContentError(err?.response?.data?.message || 'Could not load content')
      } finally {
        setContentLoading(false)
      }
    }

    if (isLoggedIn) {
      loadContent()
    }
  }, [isLoggedIn])

  const todayDate = new Date().toISOString().slice(0, 10)

  const dashboardStats = useMemo(() => {
    const totalOrders = orders.length

    const getNumericTotal = (order) =>
      Number(String(order.total || '').replace(/[^\d.]/g, '')) || 0

    const totalEarnings = orders.reduce((sum, order) => sum + getNumericTotal(order), 0)

    const todaysOrdersList = orders.filter((order) => order.date === todayDate)
    const todaysOrders = todaysOrdersList.length
    const todaysEarnings = todaysOrdersList.reduce(
      (sum, order) => sum + getNumericTotal(order),
      0
    )

    const pendingOrders = orders.filter((order) => order.status === 'pending').length
    const confirmedOrders = orders.filter((order) => order.status === 'confirmed').length
    const preparingOrders = orders.filter((order) => order.status === 'preparing').length
    const completedOrders = orders.filter((order) => order.status === 'completed').length

    return {
      totalOrders,
      totalEarnings,
      todaysOrders,
      todaysEarnings,
      pendingOrders,
      confirmedOrders,
      preparingOrders,
      completedOrders
    }
  }, [orders, todayDate])

  const productColumns = useMemo(
    () => [
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category' },
      { key: 'basePrice', label: 'Price' },
      { key: 'available', label: 'Live / Sold Out' },
      { key: 'bestseller', label: 'Bestseller' }
    ],
    []
  )

  const offerColumns = useMemo(
    () => [
      { key: 'title', label: 'Title' },
      { key: 'badge', label: 'Badge' }
    ],
    []
  )

  const reviewColumns = useMemo(
    () => [
      { key: 'name', label: 'Name' },
      { key: 'location', label: 'Location' },
      { key: 'rating', label: 'Rating' }
    ],
    []
  )

  const faqColumns = useMemo(() => [{ key: 'question', label: 'Question' }], [])

  const resetProductForm = () => {
    setProductForm(initialProduct)
    setEditingProductId(null)
  }

  const resetOfferForm = () => {
    setOfferForm(initialOffer)
    setEditingOfferId(null)
  }

  const resetReviewForm = () => {
    setReviewForm(initialReview)
    setEditingReviewId(null)
  }

  const resetFaqForm = () => {
    setFaqForm(initialFaq)
    setEditingFaqId(null)
  }

  const openEditProduct = (product) => {
    setProductForm({
      name: product.name || '',
      category: product.category || '',
      basePrice: product.basePrice || '',
      image: product.image || '',
      description: product.description || '',
      weightPrices:
        Array.isArray(product.weightPrices) && product.weightPrices.length
          ? product.weightPrices
          : [{ weight: '1/2 kg', price: product.basePrice || '' }],
      flavours:
        Array.isArray(product.flavours) && product.flavours.length
          ? product.flavours
          : ['Chocolate'],
      eggTypes:
        Array.isArray(product.eggTypes) && product.eggTypes.length
          ? product.eggTypes
          : ['Eggless'],
      available: product.available !== false,
      bestseller: !!product.bestseller
    })
    setEditingProductId(product.id)
    setIsProductModalOpen(true)
  }

  const openEditOffer = (offer) => {
    setOfferForm({
      title: offer.title || '',
      badge: offer.badge || '',
      description: offer.description || ''
    })
    setEditingOfferId(offer.id)
    setIsOfferModalOpen(true)
  }

  const openEditReview = (review) => {
    setReviewForm({
      name: review.name || '',
      subtitle: review.subtitle || '',
      location: review.location || '',
      rating: review.rating || '',
      text: review.text || ''
    })
    setEditingReviewId(review.id)
    setIsReviewModalOpen(true)
  }

  const openEditFaq = (faq) => {
    setFaqForm({
      question: faq.question || '',
      answer: faq.answer || ''
    })
    setEditingFaqId(faq.id)
    setIsFaqModalOpen(true)
  }

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      const updatedOrder = await updateOrderStatus(id, status)
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      )
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not update order status')
    }
  }

  const handleCreateProduct = async () => {
    try {
      setSaveMessage('')

      const payload = {
        ...productForm,
        basePrice: String(productForm.basePrice).trim(),
        weightPrices: productForm.weightPrices.filter(
          (item) => item.weight.trim() && item.price.trim()
        ),
        flavours: productForm.flavours.map((item) => item.trim()).filter(Boolean),
        eggTypes: productForm.eggTypes.map((item) => item.trim()).filter(Boolean)
      }

      if (editingProductId) {
        const updated = await updateProduct(editingProductId, payload)
        setProducts((prev) =>
          prev.map((item) => (item.id === editingProductId ? updated : item))
        )
        setSaveMessage('Product updated successfully.')
      } else {
        const created = await createProduct(payload)
        setProducts((prev) => [created, ...prev])
        setSaveMessage('Product created successfully.')
      }

      resetProductForm()
      setIsProductModalOpen(false)
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not save product')
    }
  }

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id)
    setProducts((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCreateOffer = async () => {
    try {
      setSaveMessage('')

      if (editingOfferId) {
        const updated = await updateOffer(editingOfferId, offerForm)
        setOffers((prev) =>
          prev.map((item) => (item.id === editingOfferId ? updated : item))
        )
        setSaveMessage('Offer updated successfully.')
      } else {
        const created = await createOffer(offerForm)
        setOffers((prev) => [created, ...prev])
        setSaveMessage('Offer created successfully.')
      }

      resetOfferForm()
      setIsOfferModalOpen(false)
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not save offer')
    }
  }

  const handleDeleteOffer = async (id) => {
    await deleteOffer(id)
    setOffers((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCreateReview = async () => {
    try {
      setSaveMessage('')

      if (editingReviewId) {
        const updated = await updateReview(editingReviewId, reviewForm)
        setReviews((prev) =>
          prev.map((item) => (item.id === editingReviewId ? updated : item))
        )
        setSaveMessage('Review updated successfully.')
      } else {
        const created = await createReview(reviewForm)
        setReviews((prev) => [created, ...prev])
        setSaveMessage('Review created successfully.')
      }

      resetReviewForm()
      setIsReviewModalOpen(false)
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not save review')
    }
  }

  const handleDeleteReview = async (id) => {
    await deleteReview(id)
    setReviews((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCreateFaq = async () => {
    try {
      setSaveMessage('')

      if (editingFaqId) {
        const updated = await updateFaq(editingFaqId, faqForm)
        setFaqs((prev) =>
          prev.map((item) => (item.id === editingFaqId ? updated : item))
        )
        setSaveMessage('FAQ updated successfully.')
      } else {
        const created = await createFaq(faqForm)
        setFaqs((prev) => [created, ...prev])
        setSaveMessage('FAQ created successfully.')
      }

      resetFaqForm()
      setIsFaqModalOpen(false)
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not save FAQ')
    }
  }

  const handleDeleteFaq = async (id) => {
    await deleteFaq(id)
    setFaqs((prev) => prev.filter((item) => item.id !== id))
  }

  const handleSaveHero = async () => {
    try {
      setSaveMessage('')
      const updated = await updateHero(heroForm)
      setHeroForm({
        brandName: updated?.brandName || '',
        tagline: updated?.tagline || '',
        subtitle: updated?.subtitle || '',
        image: updated?.image || '',
        whatsapp: updated?.whatsapp || ''
      })
      setSaveMessage('Hero content saved successfully.')
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not save hero content')
    }
  }

  const handleSaveContact = async () => {
    try {
      setSaveMessage('')
      const updated = await updateContact(contactForm)
      setContactForm({
        location: updated?.location || '',
        whatsapp: updated?.whatsapp || '',
        phone: updated?.phone || '',
        deliveryRadius: updated?.deliveryRadius || '',
        advanceNotice: updated?.advanceNotice || ''
      })
      setSaveMessage('Contact details saved successfully.')
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not save contact details')
    }
  }

  const handleSaveSettings = async () => {
    try {
      setSaveMessage('')
      const payload = {
        deliveryRadius: settingsForm.deliveryRadius,
        advanceNotice: settingsForm.advanceNotice,
        whyChooseUs: settingsForm.whyChooseUs
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      }

      const updated = await updateSettings(payload)

      setSettingsForm({
        deliveryRadius: updated?.deliveryRadius || '',
        advanceNotice: updated?.advanceNotice || '',
        whyChooseUs: Array.isArray(updated?.whyChooseUs)
          ? updated.whyChooseUs.join(', ')
          : ''
      })

      setSaveMessage('Settings saved successfully.')
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not save settings')
    }
  }

  const openDeleteConfirm = ({ type, id, title, message }) => {
    setDeleteConfig({ type, id, title, message })
    setConfirmDeleteOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true)

      if (deleteConfig.type === 'product') {
        await handleDeleteProduct(deleteConfig.id)
        setSaveMessage('Product deleted successfully.')
      }

      if (deleteConfig.type === 'offer') {
        await handleDeleteOffer(deleteConfig.id)
        setSaveMessage('Offer deleted successfully.')
      }

      if (deleteConfig.type === 'review') {
        await handleDeleteReview(deleteConfig.id)
        setSaveMessage('Review deleted successfully.')
      }

      if (deleteConfig.type === 'faq') {
        await handleDeleteFaq(deleteConfig.id)
        setSaveMessage('FAQ deleted successfully.')
      }

      setConfirmDeleteOpen(false)
      setDeleteConfig({
        type: '',
        id: '',
        title: '',
        message: ''
      })
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not delete item')
    } finally {
      setDeleteLoading(false)
    }
  }

  if (!isLoggedIn) return null

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-8">
        {/* <section className="card p-5 md:p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-heading text-3xl text-slate-900">Admin Dashboard</h2>
              <p className="text-slate-500 mt-3">
                Manage daily orders and storefront content from one place.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`rounded-full px-5 py-3 text-sm font-medium transition ${activeTab === 'dashboard'
                    ? 'bg-brand-600 text-white'
                    : 'bg-white border border-rose-200 text-slate-700 hover:bg-rose-50'
                  }`}
              >
                Orders & Dashboard
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`rounded-full px-5 py-3 text-sm font-medium transition ${activeTab === 'content'
                    ? 'bg-brand-600 text-white'
                    : 'bg-white border border-rose-200 text-slate-700 hover:bg-rose-50'
                  }`}
              >
                Storefront Content
              </button>
            </div>
          </div>

          {saveMessage && (
            <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3">
              <p className="text-sm text-brand-700">{saveMessage}</p>
            </div>
          )}

          {contentError && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{contentError}</p>
            </div>
          )}
        </section> */}

        {activeTab === 'dashboard' && (
          <>
            <section id="dashboard" className="grid sm:grid-cols-2 xl:grid-cols-6 gap-6">
              <StatsCard
                label="Total Orders"
                value={dashboardStats.totalOrders}
                helper="All orders received"
              />
              <StatsCard
                label="Total Earnings"
                value={`₹${dashboardStats.totalEarnings.toLocaleString('en-IN')}`}
                helper="Based on saved orders"
                tone="success"
              />
              <StatsCard
                label="Today's Orders"
                value={dashboardStats.todaysOrders}
                helper={`For ${todayDate}`}
                tone="info"
              />
              <StatsCard
                label="Today's Earnings"
                value={`₹${dashboardStats.todaysEarnings.toLocaleString('en-IN')}`}
                helper="From today's orders"
                tone="success"
              />
              <StatsCard
                label="Pending Orders"
                value={dashboardStats.pendingOrders}
                helper="Need confirmation"
                tone="warning"
              />
              <StatsCard
                label="Preparing Orders"
                value={dashboardStats.preparingOrders}
                helper="Currently in kitchen"
                tone="warning"
              />
            </section>

            <div id="orders" className="space-y-4">
              {ordersLoading && (
                <div className="card p-6">
                  <p className="text-slate-500">Loading orders...</p>
                </div>
              )}

              {ordersError && (
                <div className="card p-6 border border-red-200 bg-red-50">
                  <p className="text-red-600">{ordersError}</p>
                </div>
              )}

              {!ordersLoading && !ordersError && (
                <OrdersTable orders={orders} onStatusChange={handleUpdateOrderStatus} />
              )}
            </div>
          </>
        )}

        {activeTab === 'content' && (
          <div id="content" className="space-y-8">
            {contentLoading ? (
              <div className="card p-6">
                <p className="text-slate-500">Loading content...</p>
              </div>
            ) : (
              <>
                <div id="products" className="space-y-6">
                  <section className="card p-5 md:p-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-heading text-3xl text-slate-900">Products</h3>
                        <p className="text-slate-500 mt-2">
                          Manage cakes, flavours, sizes, availability and bestseller items.
                        </p>
                      </div>

                      <Button
                        className="gap-2"
                        onClick={() => setIsProductModalOpen(true)}
                      >
                        <Plus size={18} />
                        Add Product
                      </Button>
                    </div>
                  </section>

                  <EntityTable
                    title="All Products"
                    items={products}
                    columns={productColumns}
                    onDelete={(id) =>
                      openDeleteConfirm({
                        type: 'product',
                        id,
                        title: 'Delete product?',
                        message:
                          'This product will be removed from the storefront. This action cannot be undone.'
                      })
                    }
                    onEdit={openEditProduct}
                  />

                  <AdminModal
                    open={isProductModalOpen}
                    onClose={() => {
                      setIsProductModalOpen(false)
                      resetProductForm()
                    }}
                    title={editingProductId ? 'Edit Product' : 'Add Product'}
                    subtitle={
                      editingProductId
                        ? 'Update this product for the storefront'
                        : 'Create a new cake product for the storefront'
                    }
                    size="lg"
                  >
                    <ProductForm
                      values={productForm}
                      setValues={setProductForm}
                      onSubmit={handleCreateProduct}
                    />
                  </AdminModal>
                </div>

                <div id="offers" className="space-y-6">
                  <section className="card p-5 md:p-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-heading text-3xl text-slate-900">Offers</h3>
                        <p className="text-slate-500 mt-2">
                          Manage active promotions and seasonal deals.
                        </p>
                      </div>

                      <Button
                        className="gap-2"
                        onClick={() => setIsOfferModalOpen(true)}
                      >
                        <Plus size={18} />
                        Add Offer
                      </Button>
                    </div>
                  </section>

                  <EntityTable
                    title="All Offers"
                    items={offers}
                    columns={offerColumns}
                    onDelete={(id) =>
                      openDeleteConfirm({
                        type: 'offer',
                        id,
                        title: 'Delete offer?',
                        message: 'This promotional offer will be removed from the storefront.'
                      })
                    }
                    onEdit={openEditOffer}
                  />

                  <AdminModal
                    open={isOfferModalOpen}
                    onClose={() => {
                      setIsOfferModalOpen(false)
                      resetOfferForm()
                    }}
                    title={editingOfferId ? 'Edit Offer' : 'Add Offer'}
                    subtitle={
                      editingOfferId
                        ? 'Update this promotional offer'
                        : 'Create a new promotional offer for the storefront'
                    }
                    size="md"
                  >
                    <EntityForm
                      title=""
                      fields={[
                        { name: 'title', label: 'Offer Title' },
                        { name: 'badge', label: 'Badge' },
                        { name: 'description', label: 'Description', type: 'textarea' }
                      ]}
                      values={offerForm}
                      onChange={(key, value) =>
                        setOfferForm((prev) => ({ ...prev, [key]: value }))
                      }
                      onSubmit={handleCreateOffer}
                    />
                  </AdminModal>
                </div>

                <div id="reviews" className="space-y-6">
                  <section className="card p-5 md:p-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-heading text-3xl text-slate-900">Reviews</h3>
                        <p className="text-slate-500 mt-2">
                          Manage customer feedback shown on the storefront.
                        </p>
                      </div>

                      <Button
                        className="gap-2"
                        onClick={() => setIsReviewModalOpen(true)}
                      >
                        <Plus size={18} />
                        Add Review
                      </Button>
                    </div>
                  </section>

                  <EntityTable
                    title="All Reviews"
                    items={reviews}
                    columns={reviewColumns}
                    onDelete={(id) =>
                      openDeleteConfirm({
                        type: 'review',
                        id,
                        title: 'Delete review?',
                        message: 'This customer review will be removed from the storefront.'
                      })
                    }
                    onEdit={openEditReview}
                  />

                  <AdminModal
                    open={isReviewModalOpen}
                    onClose={() => {
                      setIsReviewModalOpen(false)
                      resetReviewForm()
                    }}
                    title={editingReviewId ? 'Edit Review' : 'Add Review'}
                    subtitle={
                      editingReviewId
                        ? 'Update this customer review'
                        : 'Create a new customer review for the storefront'
                    }
                    size="md"
                  >
                    <EntityForm
                      title=""
                      fields={[
                        { name: 'name', label: 'Customer Name' },
                        { name: 'subtitle', label: 'Subtitle' },
                        { name: 'location', label: 'Location' },
                        { name: 'rating', label: 'Rating (1-5)' },
                        { name: 'text', label: 'Review Text', type: 'textarea' }
                      ]}
                      values={reviewForm}
                      onChange={(key, value) =>
                        setReviewForm((prev) => ({ ...prev, [key]: value }))
                      }
                      onSubmit={handleCreateReview}
                    />
                  </AdminModal>
                </div>

                <div id="faqs" className="space-y-6">
                  <section className="card p-5 md:p-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-heading text-3xl text-slate-900">FAQs</h3>
                        <p className="text-slate-500 mt-2">
                          Manage frequently asked questions shown on the storefront.
                        </p>
                      </div>

                      <Button
                        className="gap-2"
                        onClick={() => setIsFaqModalOpen(true)}
                      >
                        <Plus size={18} />
                        Add FAQ
                      </Button>
                    </div>
                  </section>

                  <EntityTable
                    title="All FAQs"
                    items={faqs}
                    columns={faqColumns}
                    onDelete={(id) =>
                      openDeleteConfirm({
                        type: 'faq',
                        id,
                        title: 'Delete FAQ?',
                        message: 'This FAQ entry will be removed from the storefront.'
                      })
                    }
                    onEdit={openEditFaq}
                  />

                  <AdminModal
                    open={isFaqModalOpen}
                    onClose={() => {
                      setIsFaqModalOpen(false)
                      resetFaqForm()
                    }}
                    title={editingFaqId ? 'Edit FAQ' : 'Add FAQ'}
                    subtitle={
                      editingFaqId
                        ? 'Update this FAQ'
                        : 'Create a new FAQ for the storefront'
                    }
                    size="md"
                  >
                    <EntityForm
                      title=""
                      fields={[
                        { name: 'question', label: 'Question' },
                        { name: 'answer', label: 'Answer', type: 'textarea' }
                      ]}
                      values={faqForm}
                      onChange={(key, value) =>
                        setFaqForm((prev) => ({ ...prev, [key]: value }))
                      }
                      onSubmit={handleCreateFaq}
                    />
                  </AdminModal>
                </div>

                <div id="hero">
                  <EntityForm
                    title="Hero Content"
                    fields={[
                      { name: 'brandName', label: 'Brand Name' },
                      { name: 'tagline', label: 'Tagline' },
                      { name: 'image', label: 'Hero Image URL' },
                      { name: 'whatsapp', label: 'WhatsApp Number' },
                      { name: 'subtitle', label: 'Hero Subtitle', type: 'textarea' }
                    ]}
                    values={heroForm}
                    onChange={(key, value) => setHeroForm((prev) => ({ ...prev, [key]: value }))}
                    onSubmit={handleSaveHero}
                  />
                </div>

                <div id="contact">
                  <EntityForm
                    title="Contact Details"
                    fields={[
                      { name: 'location', label: 'Location' },
                      { name: 'whatsapp', label: 'WhatsApp Number' },
                      { name: 'phone', label: 'Phone Number' },
                      { name: 'deliveryRadius', label: 'Delivery Radius' },
                      { name: 'advanceNotice', label: 'Advance Notice' }
                    ]}
                    values={contactForm}
                    onChange={(key, value) =>
                      setContactForm((prev) => ({ ...prev, [key]: value }))
                    }
                    onSubmit={handleSaveContact}
                  />
                </div>

                <div id="settings">
                  <EntityForm
                    title="Store Settings"
                    fields={[
                      { name: 'deliveryRadius', label: 'Delivery Radius' },
                      { name: 'advanceNotice', label: 'Advance Notice' },
                      {
                        name: 'whyChooseUs',
                        label: 'Why Choose Us Points (comma separated)',
                        type: 'textarea'
                      }
                    ]}
                    values={settingsForm}
                    onChange={(key, value) =>
                      setSettingsForm((prev) => ({ ...prev, [key]: value }))
                    }
                    onSubmit={handleSaveSettings}
                  />
                </div>
              </>
            )}
          </div>
        )}

        <ConfirmModal
          open={confirmDeleteOpen}
          onClose={() => {
            if (deleteLoading) return
            setConfirmDeleteOpen(false)
            setDeleteConfig({
              type: '',
              id: '',
              title: '',
              message: ''
            })
          }}
          onConfirm={handleConfirmDelete}
          title={deleteConfig.title}
          message={deleteConfig.message}
          confirmText="Yes, delete"
          cancelText="Keep it"
          loading={deleteLoading}
        />
      </div>
    </AdminLayout>
  )
}