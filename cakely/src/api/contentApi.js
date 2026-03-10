import http from './http'

export const getOffers = async () => (await http.get('/offers')).data
export const createOffer = async (payload) => (await http.post('/offers', payload)).data
export const updateOffer = async (id, payload) => (await http.put(`/offers/${id}`, payload)).data
export const deleteOffer = async (id) => (await http.delete(`/offers/${id}`)).data

export const getReviews = async () => (await http.get('/reviews')).data
export const createReview = async (payload) => (await http.post('/reviews', payload)).data
export const updateReview = async (id, payload) => (await http.put(`/reviews/${id}`, payload)).data
export const deleteReview = async (id) => (await http.delete(`/reviews/${id}`)).data

export const getFaqs = async () => (await http.get('/faq')).data
export const createFaq = async (payload) => (await http.post('/faq', payload)).data
export const updateFaq = async (id, payload) => (await http.put(`/faq/${id}`, payload)).data
export const deleteFaq = async (id) => (await http.delete(`/faq/${id}`)).data

export const getHero = async () => (await http.get('/hero')).data
export const updateHero = async (payload) => (await http.put('/hero', payload)).data

export const getContact = async () => (await http.get('/contact')).data
export const updateContact = async (payload) => (await http.put('/contact', payload)).data

export const getSettings = async () => (await http.get('/settings')).data
export const updateSettings = async (payload) => (await http.put('/settings', payload)).data