import { createContext, useEffect, useState } from 'react'

export const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('cakely_admin_token') || '')

  useEffect(() => {
    if (token) {
      localStorage.setItem('cakely_admin_token', token)
    } else {
      localStorage.removeItem('cakely_admin_token')
    }
  }, [token])

  const logout = () => setToken('')

  return (
    <AdminAuthContext.Provider value={{ token, setToken, logout, isLoggedIn: !!token }}>
      {children}
    </AdminAuthContext.Provider>
  )
}