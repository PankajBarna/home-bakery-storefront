export const validateOrderForm = (values) => {
  const errors = {}

  if (!values.name?.trim()) errors.name = 'Name is required'
  if (!values.phone?.trim()) errors.phone = 'Phone is required'
  if (!/^[6-9]\d{9}$/.test(values.phone || '')) {
    errors.phone = 'Enter a valid 10-digit phone number'
  }
  if (!values.fulfillmentType) errors.fulfillmentType = 'Select delivery or pickup'
  if (!values.date) errors.date = 'Delivery/pickup date is required'

  if (values.fulfillmentType === 'delivery' && !values.address?.trim()) {
    errors.address = 'Address is required for delivery'
  }

  const selectedDate = new Date(values.date)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  if (values.date && selectedDate < tomorrow) {
    errors.date = 'Orders require at least 1 day advance notice'
  }

  return errors
}