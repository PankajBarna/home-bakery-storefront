import { useMemo, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'
import useCart from '../hooks/useCart'
import { validateOrderForm } from '../utils/validation'
import { createWhatsAppMessage } from '../utils/whatsapp'
import formatCurrency from '../utils/formatCurrency'
import { createOrder } from '../api/ordersApi'

const initialState = {
  name: '',
  phone: '',
  fulfillmentType: 'delivery',
  date: '',
  cakeMessage: '',
  address: '',
  specialNote: ''
}

function ToggleOption({ active, onClick, title, subtitle }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[22px] border p-4 text-left transition ${
        active
          ? 'border-brand-600 bg-brand-50 shadow-[0_8px_20px_rgba(223,62,116,0.12)]'
          : 'border-rose-200 bg-white hover:bg-rose-50'
      }`}
    >
      <p className={`font-semibold ${active ? 'text-brand-700' : 'text-slate-900'}`}>
        {title}
      </p>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </button>
  )
}

export default function OrderSection({ contact }) {
  const { cartItems, total, clearCart } = useCart()
  const [formValues, setFormValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  )

  const onChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '', cart: '' }))
    setSubmitMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!cartItems.length) {
      setErrors({ cart: 'Please add at least one cake to your cart before placing an order.' })
      return
    }

    const formErrors = validateOrderForm(formValues)
    if (Object.keys(formErrors).length) {
      setErrors(formErrors)
      return
    }

    try {
      setIsSubmitting(true)
      setSubmitMessage('')

      const orderPayload = {
        name: formValues.name,
        phone: formValues.phone,
        fulfillmentType: formValues.fulfillmentType,
        date: formValues.date,
        address: formValues.address,
        cakeMessage: formValues.cakeMessage,
        specialNote: formValues.specialNote,
        total: formatCurrency(total),
        items: cartItems.map((item) => ({
          name: item.name,
          weight: item.weight,
          flavour: item.flavour,
          eggType: item.eggType,
          quantity: item.quantity,
          lineTotal: formatCurrency(item.price * item.quantity)
        }))
      }

      await createOrder(orderPayload)

      const url = createWhatsAppMessage({
        contact,
        formValues,
        cartItems,
        total
      })

      setSubmitMessage('Order saved successfully. Opening WhatsApp...')
      window.open(url, '_blank')

      clearCart()
      setFormValues(initialState)
      setErrors({})
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Could not save order. Please try again.'
      setSubmitMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="order" className="py-16 md:py-20 bg-white">
      <div className="section-wrap">
        <SectionTitle
          eyebrow="Place Order"
          title="Complete your details"
          subtitle="Your selected cakes will be added automatically to the WhatsApp order message."
        />

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
          <form onSubmit={handleSubmit} className="card p-5 sm:p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
              <div>
                <h3 className="font-heading text-3xl text-slate-900">Order details</h3>
                <p className="text-slate-500 mt-2">
                  Orders require at least 1 day advance notice.
                </p>
              </div>

              <div className="rounded-full bg-brand-50 border border-brand-100 px-4 py-2 text-sm font-medium text-brand-700">
                {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
              </div>
            </div>

            <div className="mb-6">
              <label className="label">
                Delivery or Pickup <span className="text-brand-600">*</span>
              </label>

              <div className="grid sm:grid-cols-2 gap-3">
                <ToggleOption
                  active={formValues.fulfillmentType === 'delivery'}
                  onClick={() => onChange('fulfillmentType', 'delivery')}
                  title="Delivery"
                  subtitle="Available within 10 km from Palava Phase 2"
                />

                <ToggleOption
                  active={formValues.fulfillmentType === 'pickup'}
                  onClick={() => onChange('fulfillmentType', 'pickup')}
                  title="Pickup"
                  subtitle="Collect your order directly from the shop"
                />
              </div>

              {errors.fulfillmentType && (
                <p className="text-sm text-red-500 mt-2">{errors.fulfillmentType}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label={
                  <>
                    Name <span className="text-brand-600">*</span>
                  </>
                }
                value={formValues.name}
                onChange={(e) => onChange('name', e.target.value)}
                error={errors.name}
                placeholder="Enter your full name"
                className="h-14"
              />

              <Input
                label={
                  <>
                    Phone <span className="text-brand-600">*</span>
                  </>
                }
                value={formValues.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                error={errors.phone}
                placeholder="10-digit mobile number"
                className="h-14"
              />

              <div>
                <label className="label">
                  Delivery / Pickup Date <span className="text-brand-600">*</span>
                </label>
                <input
                  type="date"
                  className="input h-14 w-full"
                  value={formValues.date}
                  onChange={(e) => onChange('date', e.target.value)}
                />
                {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
              </div>

              <div className="rounded-[22px] border border-rose-200 bg-rose-50 px-4 py-4 flex items-center">
                <p className="text-sm leading-6 text-slate-600">
                  <span className="font-semibold text-slate-900">Note:</span> Please choose a date
                  at least 1 day ahead for order confirmation.
                </p>
              </div>

              <Input
                label="Message on Cake"
                value={formValues.cakeMessage}
                onChange={(e) => onChange('cakeMessage', e.target.value)}
                placeholder="Example: Happy Birthday Aarav"
                className="h-14"
              />

              <div className="hidden md:block" />
            </div>

            <div className="mt-4">
              <Textarea
                label={
                  <>
                    Address{' '}
                    {formValues.fulfillmentType === 'delivery' && (
                      <span className="text-brand-600">*</span>
                    )}
                  </>
                }
                value={formValues.address}
                onChange={(e) => onChange('address', e.target.value)}
                error={errors.address}
                placeholder={
                  formValues.fulfillmentType === 'delivery'
                    ? 'Enter complete delivery address'
                    : 'Optional for pickup'
                }
                className="min-h-[140px]"
              />
            </div>

            <div className="mt-4">
              <Textarea
                label="Special Note"
                value={formValues.specialNote}
                onChange={(e) => onChange('specialNote', e.target.value)}
                placeholder="Mention colour preference, theme note, candles, topper request, etc."
                className="min-h-[140px]"
              />
            </div>

            {errors.cart && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">{errors.cart}</p>
              </div>
            )}

            {submitMessage && (
              <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3">
                <p className="text-sm text-brand-700">{submitMessage}</p>
              </div>
            )}

            <div className="mt-6 rounded-[24px] bg-brand-50 border border-brand-100 p-4 sm:p-5">
              <p className="text-sm sm:text-base text-slate-700 leading-7">
                Your selected flavours, weights and quantities from the cart will be included
                automatically in the WhatsApp order message.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-slate-500 leading-6">
                By continuing, your order details will open in WhatsApp for final confirmation.
              </p>

              <Button
                type="submit"
                className="w-full sm:w-auto min-w-[220px] justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving Order...' : 'Send Order on WhatsApp'}
              </Button>
            </div>
          </form>

          <aside className="card p-5 sm:p-6 md:p-7 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center">
                <ShoppingBag size={22} />
              </div>
              <div>
                <h3 className="font-heading text-3xl text-slate-900">Order summary</h3>
                <p className="text-slate-500 text-sm">A quick overview before checkout</p>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <div className="rounded-[24px] border border-rose-100 bg-rose-50 p-5 text-center">
                <p className="font-semibold text-slate-900">No cakes added yet</p>
                <p className="text-sm text-slate-500 mt-2 leading-6">
                  Browse the menu and add your favourites to continue.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.cartKey}
                    className="rounded-[22px] border border-rose-100 p-4 bg-rose-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 leading-snug">{item.name}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          {item.weight} • {item.flavour} • {item.eggType}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">Qty: {item.quantity}</p>
                      </div>

                      <p className="font-bold text-brand-700 whitespace-nowrap">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="rounded-[24px] bg-slate-900 text-white p-5 mt-2">
                  <div className="flex items-center justify-between">
                    <p className="text-white/80">Total Amount</p>
                    <p className="text-2xl font-bold">{formatCurrency(total)}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Location:</span> {contact.location}
              </p>
              <p>
                <span className="font-semibold text-slate-900">WhatsApp:</span> {contact.whatsapp}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Service Radius:</span>{' '}
                {contact.deliveryRadius}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Advance Notice:</span>{' '}
                {contact.advanceNotice}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}