import { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuthContext'

export default function useAdminAuth() {
  return useContext(AdminAuthContext)
}