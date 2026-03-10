import http from './http'

export const adminLogin = async (payload) => {
  return (await http.post('/auth/login', payload)).data
}