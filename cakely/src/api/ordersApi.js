import http from './http'

export const createOrder = async (payload) => {
  return (await http.post('/orders', payload)).data
}

export const getOrders = async () => {
  return (await http.get('/orders')).data
}

export const updateOrderStatus = async (id, status) => {
  return (await http.put(`/orders/${id}/status`, { status })).data
}