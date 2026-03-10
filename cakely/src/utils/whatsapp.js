function cleanPhoneNumber(value) {
  const digits = String(value || '').replace(/\D/g, '')

  if (digits.startsWith('91') && digits.length === 12) {
    return digits
  }

  if (digits.length === 10) {
    return `91${digits}`
  }

  return digits
}

export function createWhatsAppMessage({ contact, formValues, cartItems, total }) {
  const phone = cleanPhoneNumber(contact.whatsapp)

  const itemsText = cartItems
    .map((item, index) => {
      const lineTotal = item.price * item.quantity
      return [
        `${index + 1}. ${item.name}`,
        `   Weight: ${item.weight}`,
        `   Flavour: ${item.flavour}`,
        `   Type: ${item.eggType}`,
        `   Qty: ${item.quantity}`,
        `   Price: ₹${lineTotal}`
      ].join('\n')
    })
    .join('\n\n')

  const message = [
    `Hello Cakely, I would like to place an order.`,
    ``,
    `Customer Details`,
    `Name: ${formValues.name}`,
    `Phone: ${formValues.phone}`,
    `Delivery/Pickup: ${formValues.fulfillmentType}`,
    `Date: ${formValues.date}`,
    `Address: ${formValues.address || 'N/A'}`,
    `Message on Cake: ${formValues.cakeMessage || 'N/A'}`,
    `Special Note: ${formValues.specialNote || 'N/A'}`,
    ``,
    `Order Items`,
    itemsText,
    ``,
    `Total Amount: ₹${total}`
  ].join('\n')

  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`
}