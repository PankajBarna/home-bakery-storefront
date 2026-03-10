import formatCurrency from './formatCurrency'

export const createWhatsAppMessage = ({ contact, formValues, cartItems, total }) => {
  const itemsText = cartItems
    .map((item, index) => {
      return `${index + 1}. ${item.name}
- Weight: ${item.weight}
- Flavour: ${item.flavour}
- Type: ${item.eggType}
- Quantity: ${item.quantity}
- Price: ${formatCurrency(item.price * item.quantity)}`
    })
    .join('\n')

  const message = `Hello Cakely! I would like to place an order.

Customer Details
Name: ${formValues.name}
Phone: ${formValues.phone}
Mode: ${formValues.fulfillmentType}
Date: ${formValues.date}
Address: ${formValues.address || 'N/A'}
Message on Cake: ${formValues.cakeMessage || 'N/A'}
Special Note: ${formValues.specialNote || 'N/A'}

Order Items
${itemsText}

Total Amount: ${formatCurrency(total)}

Please confirm availability. Thank you!`

  return `https://wa.me/91${contact.whatsapp}?text=${encodeURIComponent(message)}`
}