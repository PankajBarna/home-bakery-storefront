import http from './http'

export const getProducts = async () => (await http.get('/products')).data
export const createProduct = async (payload) => (await http.post('/products', payload)).data
export const updateProduct = async (id, payload) => (await http.put(`/products/${id}`, payload)).data
export const deleteProduct = async (id) => (await http.delete(`/products/${id}`)).data