import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import useAdminAuth from '../hooks/useAdminAuth'
import { adminLogin } from '../api/adminApi'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { setToken, isLoggedIn } = useAdminAuth()

  const [values, setValues] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin/dashboard')
    }
  }, [isLoggedIn, navigate])

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      setError('')

      const data = await adminLogin(values)
      setToken(data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md card p-6 md:p-8">
        <div className="mb-6 text-center">
          <p className="text-brand-600 font-semibold uppercase tracking-wide text-sm">Admin</p>
          <h1 className="font-heading text-5xl text-slate-900 mt-2">Cakely</h1>
          <p className="text-slate-500 mt-3">Login to manage your storefront content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            value={values.username}
            onChange={(e) => handleChange('username', e.target.value)}
            placeholder="Enter username"
            className="h-14"
          />

          <Input
            label="Password"
            type="password"
            value={values.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Enter password"
            className="h-14"
          />

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full justify-center mt-2" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  )
}