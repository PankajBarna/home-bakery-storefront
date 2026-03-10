export const ORDERS_STORAGE_KEY = 'cakely_orders'

export function getStoredOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveStoredOrders(orders) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
}

export function addStoredOrder(order) {
  const existing = getStoredOrders()
  const updated = [order, ...existing]
  saveStoredOrders(updated)
  return updated
}

export function updateStoredOrderStatus(orderId, status) {
  const existing = getStoredOrders()
  const updated = existing.map((order) =>
    order.id === orderId ? { ...order, status } : order
  )
  saveStoredOrders(updated)
  return updated
}