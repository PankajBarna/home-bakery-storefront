import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import useAdminAuth from '../../hooks/useAdminAuth'

export default function AdminTopbar() {
  const { logout } = useAdminAuth()
  const navigate = useNavigate()

  return (
    <header className="h-[72px] px-4 md:px-8 flex items-center justify-between border-b border-rose-100 bg-white sticky top-0 z-40">
      <div>
        <p className="text-sm text-slate-500">Dashboard</p>
        <h1 className="text-xl font-semibold text-slate-900">Manage your storefront</h1>
      </div>

      <Button
        variant="secondary"
        onClick={() => {
          logout()
          navigate('/admin')
        }}
      >
        Logout
      </Button>
    </header>
  )
}